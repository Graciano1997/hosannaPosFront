import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIpTenant, Ip } from "../lib/ip";
import { removeDuplicate } from "../lib/removeDuplicate";
import { CurrentUser } from "../lib/CurrentUser";
import { removeDiacritics } from "../lib/removeDiacritic";

const initialState = {
    isCreating : false,
    isUpdating:false,
    clientToUpdate:{},
    clients: [],
    clientsDashboard:[],
    searchedClients:[],
    last_created_at:null,
    isSearching:false
};

export const fetchClientDashboard = createAsyncThunk("clientState/fetchClientDashboard",async ()=>{
     const response = await fetch(`${getIpTenant()}clients/dashboard`);
        return response.json();
});
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
        },
        searchClient:(state,action)=>{
            console.log(state.clients)
            state.searchedClients = state.clients.filter((client)=>(
            (removeDiacritics(client.name)).includes(removeDiacritics(action.payload)) 
            || client.email? (client.email).includes(action.payload):false 
            || client.nif?(client.nif).includes(action.payload) : false
            || client.phone? (client.phone).includes(action.payload):false 
            || client.address? (client.address).includes(action.payload):false));
            
        },
        clearSearchedClient:(state)=>{
            state.searchedClients = [];
        },
        setSearching:(state,action)=>{
            state.isSearching = action.payload;
            if(action.payload){
                state.searchedClients=state.clients
            }
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
        
         builder.addCase(fetchClientDashboard.fulfilled, (state, action) => {
            state.clientsDashboard = action.payload.data;
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
export const { creatingClient, stopCreatingOrUpdateingClient, updatingClient,setClient,searchClient,clearSearchedClient,setSearching} = clientSlice.actions;
