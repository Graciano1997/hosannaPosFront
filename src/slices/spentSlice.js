import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sum } from "../lib/sumCollection";
import { Ip } from "../lib/ip";

const initialState = {
    spents: [],
    isCreating: false,
    isUpdating: false,
    spentToUpdate: {},
    lastSpents:[],
    anualSpends:[],
    minYear:0,
    total:0
};

export const fetchSpents = createAsyncThunk("spentState/fetchSpents", async () => {
    const response = await fetch(`${Ip}/api/spents/`);
    return response.json();
})

export const fetchLastSpents = createAsyncThunk("spentState/lastSpents", async (number=3) => {
    const response = await fetch(`${Ip}/api/spents/last_spents/${number}/`);
    return response.json();
})

export const fetchAnualSpents = createAsyncThunk("spentState/fetchAnualSpents", async (year=new Date().getFullYear()) => {
    const response = await fetch(`${Ip}/api/spents/anual_spents/${year}`);
    return response.json();
})

export const fetchMinYearSpents = createAsyncThunk("spentState/fetchMinYearSpents", async (year=new Date().getFullYear()) => {
    const response = await fetch(`${Ip}/api/spents/min_year_spends`);
    return response.json();
})

export const deleteSpent = createAsyncThunk("spentState/deleteSpent", async (id) => {
    const response = await fetch(`${Ip}/api/spents/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
    return response.json();
});

export const registerSpent = createAsyncThunk("spentState/registerSpent", async (spent) => {
    const response = await fetch(`${Ip}/api/spents/`, { method: 'POST', body: JSON.stringify(spent), headers: { 'Content-Type': 'application/json' } });
    return response.json();
});

export const updateSpent = createAsyncThunk("spentState/updateSpent", async (spent) => {
    const response = await fetch(`${Ip}/api/spents/${spent.id}`,
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
        setSpents:(state,action)=>{
            state.spents=action.payload;
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
            state.total = sum(state.spents,'amount').total;
        });

        builder.addCase(fetchLastSpents.fulfilled, (state, action) => {
            state.lastSpents = action.payload.data;                     
        });

        builder.addCase(registerSpent.fulfilled, (state, action) => {
            state.isCreating = false;
            if (!action.payload.error) {
                state.spents.push({ ...action.payload.spent });
                state.total = sum(state.spents,'amount').total;
            }
        });

        builder.addCase(deleteSpent.fulfilled, (state, action) => {
            state.spents = state.spents.filter((spent) => spent.id !== action.payload.id);
            state.total = sum(state.spents,'amount').total;
            state.error = '';
        });

        builder.addCase(fetchAnualSpents.fulfilled,(state,action)=>{
            state.anualSpends = action.payload.data;
        });

        builder.addCase(fetchMinYearSpents.fulfilled,(state,action)=>{
            state.minYear = action.payload.year;
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
                    state.total = sum(updateSpent,'amount').total;
                }
            }
        })
    }
});

export default spentSlice.reducer;
export const { calcTotalSpents,creatingSpent, updatingSpent, stopCreatingOrUpdateingSpent, setSpents  } = spentSlice.actions;
