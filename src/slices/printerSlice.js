import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Ip, printerIp } from "../lib/ip";
import { CurrentUser } from "../lib/CurrentUser";

const initialState = {
    availablePrinters: [],
    printerConfiguration:{},
    loading:false,
    error:null
};

export const printing = createAsyncThunk("printerState/printing", async (data) => {
    const response = await fetch(`${printerIp}/print`,{
          headers: { "Content-Type": "application/json", Accept: "application/json",
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify({data})
         }
    });
    return response.json();
});

export const fetchPrinterConfig = createAsyncThunk("printerState/fetchPrinterConfig", async () => {
    
     if(localStorage.getItem(`user-${CurrentUser.id}-printerConfiguration`)){
        return JSON.parse(localStorage.getItem(`user-${CurrentUser.id}-printerConfiguration`));
     }

    const response = await fetch(`${Ip}/api/printer_configurations/user-${CurrentUser.id}-printerConfiguration/`,{
        headers: { "Content-Type": "application/json", Accept: "application/json" }
    });
    return response.json();
});

export const setPrinterConfig = createAsyncThunk("printerState/setPrinterConfig", async (printerConfiguration) => {
    const response = await fetch(`${Ip}/api/printer_configurations`,{
        headers: { 'Content-Type': 'application/json'},
        method: 'POST',
        body:JSON.stringify({user:`user-${CurrentUser.id}-printerConfiguration`,value:printerConfiguration})
    });

    console.log({user:`user-${CurrentUser.id}-printerConfiguration`,value:printerConfiguration});
    return response.json();
});

export const fetchPrinters = createAsyncThunk("printerState/fetchPrinters", async () => {
    const response = await fetch(`${printerIp}/printers`,{
        headers: { "Content-Type": "application/json", Accept: "application/json" }
    });
    return response.json();
});

 export const printTest = createAsyncThunk("printerState/printTest", async () => {
     const response = await fetch(`${printerIp}/printtest`, 
        { method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body:JSON.stringify({})
        });
     return response.json();
 });


const printerSlice = createSlice({
    name: 'printerState',
    initialState: initialState,
    reducers: {
        },
    extraReducers: (builder) => {
        builder.addCase(fetchPrinters.pending, (state) => {
            state.loading=true;
            state.error=null;
        });

        builder.addCase(fetchPrinters.fulfilled, (state, action) => {
            state.loading=false;
            state.error=null;
            state.availablePrinters = action.payload;
        });

        builder.addCase(fetchPrinterConfig.fulfilled, (state, action) => {
            state.loading=false;
            state.error=null;

            if(!localStorage.hasOwnProperty(`user-${CurrentUser.id}-printerConfiguration`) && action.payload.data){
                localStorage.setItem(action.payload.data.user,JSON.stringify(action.payload.data.value));
                state.printerConfiguration=action.payload.data.value;
            }

            if(localStorage.hasOwnProperty(`user-${CurrentUser.id}-printerConfiguration`)){
                state.printerConfiguration=JSON.parse(localStorage.getItem(`user-${CurrentUser.id}-printerConfiguration`));
            }
        });

        builder.addCase(setPrinterConfig.fulfilled, (state, action) => {
            state.loading=false;
            state.error=null;
            localStorage.setItem(action.payload.data.user,JSON.stringify(action.payload.data.value));
        });
    }
});

export default printerSlice.reducer;
export const {  } = printerSlice.actions;
