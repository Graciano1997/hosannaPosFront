import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIpTenant, Ip } from "../lib/ip";
import { removeDuplicate } from "../lib/removeDuplicate";
import { CurrentUser } from "../lib/CurrentUser";

const initialState = {
    isCreating : false,
    isUpdating:false,
    clientToUpdate:{},
    clients: [],
    last_created_at:null
};

    export const fetchClients = createAsyncThunk("clientState/fetchClients", async (last_created_at=null) => {
        const response = await fetch(`${getIpTenant()}clients/`,
            {
            headers: { "Content-Type": "application/json", Accept: "application/json" }
        });
        return response.json();
    })

    export const searchClients = createAsyncThunk("clientState/searchClients", async (query) => {
        const response = await fetch(`${getIpTenant()}clients/search/${query}/`, 
            { headers: { "Content-Type": "application/json", Accept: "application/json" }});
        return response.json();
    })

 export const deleteClient = createAsyncThunk("clientState/deleteClient", async (id) => {
     const response = await fetch(`${getIpTenant()}clients/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
     return response.json();
 });

 export const registerClient = createAsyncThunk("clientState/registerClient", async (formData) => {
     
     const response = await fetch(`${getIpTenant()}clients/`, { method: 'POST', body: formData });
     return response.json();
 });

export const updateClient = createAsyncThunk("clientState/updateClient", async (formData) => {

    const response = await fetch(`${getIpTenant()}clients/${formData.get("client[id]")}`,
          {
              method: 'PUT',
              body: formData,
          });
      return response.json();
 });

const clientSlice = createSlice({
    name: 'clientState',
    initialState: initialState,
    reducers: {
        creatingClient: (state)=>{
            state.isCreating = true;
        },
        stopCreatingOrUpdateingClient : (state)=>{
            state.isCreating = false;
            state.isUpdating = false;
            state.clientToUpdate = {};
        },
        setClient:(state,action)=>{
            state.clients=action.payload;
        },
        
        updatingClient: (state,action)=>{
            state.isUpdating = true;
            state.clientToUpdate=action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchClients.fulfilled, (state, action) => {
            state.clients = action.payload.data;
          });

        builder.addCase(registerClient.fulfilled, (state, action) => {
            if (!action.payload.error) {
                 state.isCreating = false;
                 state.clients.push({ ...action.payload.client });
             }
         });

        builder.addCase(updateClient.fulfilled,(state,action)=>{
            state.clientToUpdate = {};
            if (action.payload.success && action.payload.client) {
                const atIndex = state.clients.findIndex(item => item.id === action.payload.client.id);
                if (atIndex !== -1) {
                    const updatedClients = [...state.clients]; 
                        updatedClients[atIndex] = action.payload.client;
                        state.clients = updatedClients;
                        let currentUser = CurrentUser();
                        currentUser={...currentUser,
                            image:action.payload.client.image 
                        }
                        localStorage.setItem("currentUser",JSON.stringify(currentUser));
                        state.isUpdating = false;
                        }
                    }            
                })

        builder.addCase(deleteClient.fulfilled, (state, action) => {
             state.clients = state.clients.filter((client) => client.id !== action.payload.id);
         });
    }
});

export default clientSlice.reducer;
export const { creatingClient, stopCreatingOrUpdateingClient, updatingClient,setClient } = clientSlice.actions;
