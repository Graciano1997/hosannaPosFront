import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIpTenant } from "../lib/ip";

const initialState = {
    stockMovements : [],
    anualStockMovement:null
};

export const fetchStockMovements = createAsyncThunk("stockState/fetchStockMovements",async ()=>{
     const response = await fetch(`${getIpTenant()}stock_movements`);
        return response.json();
});

export const fetchStockAnualMovements = createAsyncThunk("stockState/fetchStockAnualMovements",async (year = new Date().getFullYear())=>{
     const response = await fetch(`${getIpTenant()}stock_movements/anual_movements/${year}/`);
        return response.json();
})

const stockSlice = createSlice({
    name:'stockState',
    initialState,
    reducers:{
        cleanStockMovements: (state)=>{
            state.stockMovements = [];
        },
        setStockMovement: (state,action)=>{
            state.stockMovements=action.payload;
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchStockMovements.fulfilled,(state,action)=>{
            state.stockMovements=action.payload.data
         });
        
         builder.addCase(fetchStockAnualMovements.fulfilled,(state,action)=>{
            state.anualStockMovement=action.payload.data
         });
    }
});

export default stockSlice.reducer;
export const  { cleanStockMovements, setStockMovement } = stockSlice.actions;
