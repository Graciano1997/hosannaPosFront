import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    profiles: [],
};

export const fetchProfiles = createAsyncThunk("profileState/fetchProfiles", async () => {
    const response = await fetch('http://localhost:3000/api/profiles/');
    return response.json();
})

//  export const deleteUser = createAsyncThunk("userState/deleteUser", async (id) => {
//      const response = await fetch(`http://localhost:3000/api/users/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
//      return response.json();
//  });

//  export const registerUser = createAsyncThunk("spentState/registerSpent", async (user) => {
//      const response = await fetch(`http://localhost:3000/api/profiles/`, { method: 'POST', body: JSON.stringify(user), headers: { 'Content-Type': 'application/json' } });
//      return response.json();
//  });

// export const updateSpent = createAsyncThunk("spentState/updateSpent", async (spent) => {
//     const response = await fetch(`http://localhost:3000/api/products/${spent.id}`,
//         {
//             method: 'PUT',
//             body: JSON.stringify(spent),
//             headers: { 'Content-Type': 'application/json' }
//         });
//     return response.json();
// });

const profileSlice = createSlice({
    name: 'profileState',
    initialState: initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProfiles.fulfilled, (state, action) => {
            state.profiles = action.payload.data;
        });

        //  builder.addCase(registerUser.fulfilled, (state, action) => {
        //      state.isCreating = false;
        //      if (!action.payload.error) {
        //          state.spents.push({ ...action.payload.spent });
        //      }
        //  });

        // builder.addCase(deleteUser.fulfilled, (state, action) => {
        //      state.users = state.users.filter((user) => user.id !== action.payload.id);
        //  });

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

export default profileSlice.reducer;
export const {  } = profileSlice.actions;
