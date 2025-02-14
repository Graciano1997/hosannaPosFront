import { configureStore } from "@reduxjs/toolkit";
import appSlice from "../slices/appSlice";
import saleSlice from "../slices/saleSlice";
import productSlice from "../slices/productSlice";
import categorySlice from "../slices/categorySlice";

const store = configureStore({
    reducer:{
       appState:appSlice,
       saleState:saleSlice,
       productState:productSlice,
       categoryState:categorySlice
    }
});

export default store;
