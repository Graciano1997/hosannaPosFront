import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen:false,
    isSearching:false,
    showToast:false,
    activeTab:'tab1',
    isLogged:true
}

const appSlice=createSlice({
    name:'appState',
    initialState,
    reducers:{
        openModal:(state)=>{
            state.isOpen = true;
        },
        closeModal:(state)=>{
            state.isOpen = false;
        },
        Searching:(state)=>{
            state.isSearching = true;
        },
        StopSearching:(state)=>{
            state.isSearching = false;
        },
        activeTab:(state,action)=>{
            state.activeTab=action.payload;
        },
        setLogged:(state)=>{state.isLogged=true;}
    }
});

export default appSlice.reducer;
export const {openModal,closeModal,Searching,StopSearching,activeTab,setLogged} = appSlice.actions;
