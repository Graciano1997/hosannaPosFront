import { configureStore } from "@reduxjs/toolkit";
import appSlice from "../slices/appSlice";
import saleSlice from "../slices/saleSlice";
import productSlice from "../slices/productSlice";
import categorySlice from "../slices/categorySlice";
import spentSlice from "../slices/spentSlice";
import userSlice from "../slices/userSlice";
import profileSlice from "../slices/profileSlice";
import companySlice from "../slices/companySlice";

const store = configureStore({
    reducer:{
       appState:appSlice,
       saleState:saleSlice,
       productState:productSlice,
       categoryState:categorySlice,
       spentState:spentSlice,
       userState:userSlice,
       profileState:profileSlice,
       companyState:companySlice
    }
});

export default store;
