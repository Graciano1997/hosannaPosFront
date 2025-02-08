import { configureStore } from "@reduxjs/toolkit";
import appSlice from "../slices/appSlice";
import saleSlice from "../slices/saleSlice";
import productSlice from "../slices/productSlice";

const store = configureStore({
    reducer:{
       appState:appSlice,
       saleState:saleSlice,
       productState:productSlice
    }
});

export default store;
