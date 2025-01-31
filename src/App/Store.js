import { configureStore } from "@reduxjs/toolkit";
import appSlice from "../slices/appSlice";

const store = configureStore({
    reducer:{
       appState:appSlice
    }
});

export default store;
