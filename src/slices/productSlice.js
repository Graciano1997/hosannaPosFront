import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { removeDiacritics } from "../lib/removeDiacritic";

const initialState = {
    products:[],
    loading:false,
    isCreating:false,
    error:'',
    productsSearched:[]
};

export const fetchProducts = createAsyncThunk("productState/fetchProducts", async ()=>{
    const response = await fetch('http://localhost:3000/api/products/',{ method:'GET', headers:{'Content-Type':'application/json' }});
    return response.json();
});

export const deleteProduct = createAsyncThunk("productState/deleteProduct", async (id)=>{
    const response = await fetch(`http://localhost:3000/api/products/${id}`,{ method:'DELETE', headers:{'Content-Type':'application/json' }});
    return response.json();
});

export const registerProduct = createAsyncThunk("productState/registerProduct", async (product)=>{
    const response = await fetch(`http://localhost:3000/api/products/`,{ method:'POST', body:JSON.stringify(product), headers:{'Content-Type':'application/json' }});
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
    },
    creatingProduct: (state)=>{
        state.isCreating = true;
    }
  },

  extraReducers:(builder)=>{
    builder.addCase(fetchProducts.pending,(state)=>{
        state.loading=true;
    });

    builder.addCase(fetchProducts.fulfilled,(state,action)=>{
        state.loading=false;
        state.products = action.payload.data;
        // for(let i =0; i<state.products.length;i++){
        //     for(let j=0;j<state.products.length-1;j++){
        //         if(state.products[j+1].name < state.products[j].name){
        //             const auxiliar = state.products[j+1];
        //             state.products[j+1] = state.products[j];
        //             state.products[j]=auxiliar; 
        //         }
        //     }
        // }
        state.error='';
    });

    builder.addCase(fetchProducts.rejected,(state,action)=>{
        state.loading =false;
        state.error=action.error.message;
        state.products = [];
    })

    builder.addCase(deleteProduct.pending,(state)=>{ state.loading=true;});

    builder.addCase(deleteProduct.fulfilled,(state,action)=>{
        state.loading=false;
        state.products = state.products.filter((product)=>product.id!==action.payload.id);
        state.error='';
    });

    builder.addCase(deleteProduct.rejected,(state,action)=>{
        state.loading =false;
    })

    builder.addCase(registerProduct.pending,(state)=>{ state.loading=true;});

    builder.addCase(registerProduct.fulfilled,(state,action)=>{
        state.loading=false;
        state.isCreating=false;
        state.products.push({...action.payload.product});
        state.error='';
    });

    builder.addCase(registerProduct.rejected,(state,action)=>{
        state.loading =false;
    })
}
});

export default productSlice.reducer;
export const {searchProduct,clearSearchedProduct, creatingProduct} = productSlice.actions;