import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { removeDiacritics } from "../lib/removeDiacritic";

const initialState = {
    products:[],
    loading:false,
    error:'',
    productsSearched:[]
};

export const fetchProducts = createAsyncThunk("productState/fetchProducts", async ()=>{
    const response = await fetch('/Mockdb/products.json');
    return response.json();
});

const productSlice = createSlice({
  name:'productState',
  initialState,
  reducers:{
    searchProduct:(state,action)=>{
        state.productsSearched = state.products.filter((product)=>(removeDiacritics(product.name)).includes(removeDiacritics(action.payload)));
    },
    clearSearchedProduct:(state)=>{
        state.productsSearched = [];
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchProducts.pending,(state)=>{
        state.loading=true;
    });

    builder.addCase(fetchProducts.fulfilled,(state,action)=>{
        state.loading=false;
        state.products = action.payload;
        state.error='';
    });

    builder.addCase(fetchProducts.rejected,(state,action)=>{
        state.loading =false;
        state.error=action.error.message;
        state.products = [];
    })
}
});

export default productSlice.reducer;
export const {searchProduct,clearSearchedProduct} = productSlice.actions;