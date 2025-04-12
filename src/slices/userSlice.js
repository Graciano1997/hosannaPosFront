import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Ip } from "../lib/ip";

const initialState = {
    isCreating : false,
    isUpdating:false,
    userToUpdate:{},
    users: [],
};

export const fetchUsers = createAsyncThunk("userState/fetchUsers", async () => {
    const response = await fetch(`${Ip}/api/users/`);
    return response.json();
})

 export const deleteUser = createAsyncThunk("userState/deleteUser", async (id) => {
     const response = await fetch(`${Ip}/api/users/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
     return response.json();
 });

 export const registerUser = createAsyncThunk("userState/registerUser", async (formData) => {
     
     const response = await fetch(`${Ip}/api/users/`, { method: 'POST', body: formData });
     return response.json();
 });

export const updateUser = createAsyncThunk("userState/updateUser", async (formData) => {

    const response = await fetch(`${Ip}/api/users/${formData.get("user[id]")}`,
          {
              method: 'PUT',
              body: formData,
          });
      return response.json();
 });

const userSlice = createSlice({
    name: 'userState',
    initialState: initialState,
    reducers: {
        creatingUser: (state)=>{
            state.isCreating = true;
        },
        stopCreatingOrUpdateingUser : (state)=>{
            state.isCreating = false;
            state.isUpdating = false;
            state.userToUpdate = {};
        },
        setUser:(state,action)=>{
            state.users=action.payload;
        },
        
        updatingUser: (state,action)=>{
            state.isUpdating = true;
            state.userToUpdate=action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload.data;
        });

        builder.addCase(registerUser.fulfilled, (state, action) => {
             state.isCreating = false;
             if (!action.payload.error) {
                 state.users.push({ ...action.payload.user });
             }
         });

        builder.addCase(updateUser.fulfilled,(state,action)=>{
                    state.isUpdating = false;
                    state.userToUpdate = {};
                    if (action.payload.success && action.payload.user) {
                        const atIndex = state.users.findIndex(item => item.id === action.payload.user.id);
                        if (atIndex !== -1) {
                        const updatedUsers = [...state.users]; 
                        updatedUsers[atIndex] = action.payload.user;
                        state.users = updatedUsers;
                        }
                    }            
                })

        // builder.addCase(updateUser.fulfilled, (state, action) => {
        //     //  state.isCreating = false;
        //     //  if (!action.payload.error) {
        //     //      state.users.push({ ...action.payload.user });
        //     //  }
        //     console.log(action.payload);
        //  });

        builder.addCase(deleteUser.fulfilled, (state, action) => {
             state.users = state.users.filter((user) => user.id !== action.payload.id);
         });

        // builder.addCase(updateSpent.fulfilled, (state, action) => {
        //     state.isUpdating = false;
        //     state.spentToUpdate = {};
        //     if (action.payload.success && action.payload.spent) {
        //         const atIndex = state.spents.findIndex(item => item.id === action.payload.spent.id);
        //         if (atIndex !== -1) {
        //             const updatedSpents = [...state.spents]; // Create a new array
        //             updatedSpents[atIndex] = action.payload.spent; // Update the specific item
        //             state.spents = updatedSpents; // Assign the new array to state
        //         }
        //     }
        // })
    }
});

export default userSlice.reducer;
export const { creatingUser, stopCreatingOrUpdateingUser, updatingUser,setUser } = userSlice.actions;
