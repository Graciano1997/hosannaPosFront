import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    spents: [],
    isCreating: false,
    isUpdating: false,
    spentToUpdate: {},
    lastSpents:[],
    anualSpends:[],
    total:0
};

export const fetchSpents = createAsyncThunk("spentState/fetchSpents", async () => {
    const response = await fetch('http://localhost:3000/api/spents/');
    return response.json();
})

export const fetchLastSpents = createAsyncThunk("spentState/lastSpents", async (number=3) => {
    const response = await fetch(`http://localhost:3000/api/spents/last_spents/${number}/`);
    return response.json();
})

export const fetchAnualSpents = createAsyncThunk("spentState/fetchAnualSpents", async () => {
    const response = await fetch(`http://localhost:3000/api/spents/anual_spents/`);
    return response.json();
})

export const deleteSpent = createAsyncThunk("spentState/deleteSpent", async (id) => {
    const response = await fetch(`http://localhost:3000/api/spents/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
    return response.json();
});

export const registerSpent = createAsyncThunk("spentState/registerSpent", async (spent) => {
    const response = await fetch(`http://localhost:3000/api/spents/`, { method: 'POST', body: JSON.stringify(spent), headers: { 'Content-Type': 'application/json' } });
    return response.json();
});

export const updateSpent = createAsyncThunk("spentState/updateSpent", async (spent) => {
    const response = await fetch(`http://localhost:3000/api/spents/${spent.id}`,
        {
            method: 'PUT',
            body: JSON.stringify(spent),
            headers: { 'Content-Type': 'application/json' }
        });
    return response.json();
});

const spentSlice = createSlice({
    name: 'spentState',
    initialState: initialState,
    reducers: {
        creatingSpent: (state) => {
            state.isCreating = true;
        },
        
        updatingSpent: (state,action)=>{
            state.isUpdating = true;
            state.spentToUpdate=action.payload;
        },
        stopCreatingOrUpdateingSpent : (state)=>{
            state.isCreating = false;
            state.isUpdating = false;
            state.spentToUpdate = {};
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSpents.fulfilled, (state, action) => {
            state.spents = action.payload.data;
            
            let total=0;
             if(action.payload.data.length > 0 ){
                
            action.payload.data.map((spent)=>{
                    total += spent.amount*1
                 })
                 state.total = total;
             }                     
        });

        builder.addCase(fetchLastSpents.fulfilled, (state, action) => {
            state.lastSpents = action.payload.data;                     
        });

        builder.addCase(registerSpent.fulfilled, (state, action) => {
            state.isCreating = false;
            if (!action.payload.error) {
                state.spents.push({ ...action.payload.spent });
            }
        });

        builder.addCase(deleteSpent.fulfilled, (state, action) => {
            state.spents = state.spents.filter((spent) => spent.id !== action.payload.id);
            state.error = '';
        });

        builder.addCase(fetchAnualSpents.fulfilled,(state,action)=>{
            state.anualSpends = action.payload.data;
        });

        builder.addCase(updateSpent.fulfilled, (state, action) => {
            state.isUpdating = false;
            state.spentToUpdate = {};
            if (action.payload.success && action.payload.spent) {
                const atIndex = state.spents.findIndex(item => item.id === action.payload.spent.id);
                if (atIndex !== -1) {
                    const updatedSpents = [...state.spents]; // Create a new array
                    updatedSpents[atIndex] = action.payload.spent; // Update the specific item
                    state.spents = updatedSpents; // Assign the new array to state
                }
            }
        })
    }
});

export default spentSlice.reducer;
export const { calcTotalSpents,creatingSpent, updatingSpent, stopCreatingOrUpdateingSpent  } = spentSlice.actions;
