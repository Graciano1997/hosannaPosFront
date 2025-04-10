import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isCreating : false,
    isUpdating:false,
    userToUpdate:{},
    users: [],
};

export const fetchUsers = createAsyncThunk("userState/fetchUsers", async () => {
    const response = await fetch('http://localhost:3000/api/users/');
    return response.json();
})

 export const deleteUser = createAsyncThunk("userState/deleteUser", async (id) => {
     const response = await fetch(`http://localhost:3000/api/users/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
     return response.json();
 });

 export const registerUser = createAsyncThunk("userState/registerUser", async (formData) => {
     
     console.log(formData);
     const response = await fetch(`http://localhost:3000/api/users/`, { method: 'POST', body: formData });
     return response.json();
 });

export const updateUser = createAsyncThunk("userState/updateUser", async (userId,formData) => {
    console.log(formData);
     const response = await fetch(`http://localhost:3000/api/users/${userId}`,
         {
             method: 'PUT',
             body: formData,
         });
         console.log(response.json());
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
export const { creatingUser, stopCreatingOrUpdateingUser, updatingUser } = userSlice.actions;
