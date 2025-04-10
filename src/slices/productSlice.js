import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { removeDiacritics } from "../lib/removeDiacritic";

const initialState = {
    products:[],
    loading:false,
    isCreating:false,
    isUpdating:false,
    productToUpdate:{},
    error:'',
    productsSearched:[],
    productConfigurationFields:[],
    productAllFields:[],
    productFilterRows:[],
    filterRowsOp:[],
    expireds:[],
    anualExpireds:[],
    isSearching:false
};

export const fetchProducts = createAsyncThunk("productState/fetchProducts", async ()=>{
    const response = await fetch('http://localhost:3000/api/products/',{ method:'GET', headers:{'Content-Type':'application/json' }});
    return response.json();
});

export const expiredProductJob = createAsyncThunk("productState/expiredProductJob", async ()=>{
    const response = await fetch('http://localhost:3000/api/products/expired_product_job',{ method:'GET', headers:{'Content-Type':'application/json' }});
    return response.json();
});

export const fetchExpiredProducts = createAsyncThunk("productState/fetchExpiredProducts", async ()=>{
    const response = await fetch('http://localhost:3000/api/products/expireds',{ method:'GET', headers:{'Content-Type':'application/json' }});
    return response.json();
});

export const fetchAnualExpiredProducts = createAsyncThunk("productState/fetchAnualExpiredProducts", async (year=new Date().getFullYear())=>{
    const response = await fetch(`http://localhost:3000/api/products/anual_expireds/${year}`,{ method:'GET', headers:{'Content-Type':'application/json' }});
    return response.json();
});

export const fetchProductsFields = createAsyncThunk("productState/fetchProductsFields", async ()=>{
    const response = await fetch('http://localhost:3000/api/products/product_fields',{ method:'GET', headers:{'Content-Type':'application/json' }});
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

export const updateProduct = createAsyncThunk("productState/updateProduct",async (product)=>{
    const response = await fetch(`http://localhost:3000/api/products/${product.id}`,
    {method:'PUT',
        body:JSON.stringify(product),
     headers:{'Content-Type':'application/json'}});
    return response.json();
});

export const fetchProductConfiguration = createAsyncThunk("productState/fetchProductConfiguration", async ()=>{
    const response = await fetch('http://localhost:3000/api/product_configurations/',{ method:'GET', headers:{'Content-Type':'application/json' }});
    return response.json();
});

export const productConfiguration = createAsyncThunk("productState/productConfiguration", async (products)=>{
    const response = await fetch(`http://localhost:3000/api/product_configurations/`,{ method:'POST', body:JSON.stringify(products), headers:{'Content-Type':'application/json' }});
    return response.json();
});


const productSlice = createSlice({
  name:'productState',
  initialState,
  reducers:{
    searchProduct:(state,action)=>{
        state.productsSearched = state.products.filter((product)=>product.status && ((removeDiacritics(product.name)).includes(removeDiacritics(action.payload)) || product.code==action.payload || product.lote==action.payload));
    },
    clearSearchedProduct:(state)=>{
        state.productsSearched = [];
        state.isSearching =false;
    },
    creatingProduct: (state)=>{
        state.isCreating = true;
    },

    searchingProduct: (state)=>{
        state.isSearching = true;
    },
    stopSearchingProduct: (state)=>{
        state.isSearching = false;
    }
    ,
    updatingProduct: (state,action)=>{
        state.isUpdating = true;
        state.productToUpdate=action.payload;
    },

    addProductField:(state,action)=>{
            const atIndex = state.filterRowsOp.findIndex(item => item.field == action.payload.field);
            if (atIndex !== -1) {
              const updatedProducts = [...state.filterRowsOp];
              updatedProducts[atIndex] = action.payload; 
              state.filterRowsOp = updatedProducts; 
            }else{
                state.filterRowsOp.push(action.payload)
            }
    }

  },

  extraReducers:(builder)=>{
    builder.addCase(fetchProducts.pending,(state)=>{
        state.loading=true;
    });

    builder.addCase(fetchExpiredProducts.fulfilled,(state,action)=>{
        state.loading=false;
         if(action.payload!=undefined){
             state.expireds = action.payload.data;
             state.error='';
         }
    });

    builder.addCase(fetchProducts.fulfilled,(state,action)=>{
        state.loading=false;
        if(action.payload!=undefined){
            state.products = action.payload.data;
            state.error='';
        }
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
        if(!action.payload.error){
            state.products.push({...action.payload.product});
        }
    });

    builder.addCase(fetchAnualExpiredProducts.fulfilled,(state,action)=>{
        state.anualExpireds = action.payload.data;
    });

    builder.addCase(fetchProductConfiguration.fulfilled,(state,action)=>{
       if(action.payload.data != undefined){
           state.productConfigurationFields = (action.payload.data);
           let filterRows = [];           
           action.payload.data.map((item)=>{
               if(!item.active){
                   filterRows.push(item.field);
                }
            });
            
            state.productFilterRows = filterRows;
        }
            
      });

    builder.addCase(registerProduct.rejected,(state,action)=>{
        state.loading =false;
    });

    builder.addCase(fetchProductsFields.fulfilled,(state,action)=>{
        if(action.payload !=undefined){
            state.productAllFields = action.payload.data;
        }
    })

    builder.addCase(fetchProductsFields.rejected,(state,action)=>{
        console.log(action.payload);
    })

     builder.addCase(updateProduct.fulfilled,(state,action)=>{
                state.isUpdating = false;
                state.productToUpdate = {};
                if (action.payload.success && action.payload.product) {
                    const atIndex = state.products.findIndex(item => item.id === action.payload.product.id);
                    if (atIndex !== -1) {
                      const updatedProducts = [...state.products]; // Create a new array
                      updatedProducts[atIndex] = action.payload.product; // Update the specific item
                      state.products = updatedProducts; // Assign the new array to state
                    }
                  }            
            })
}
});

export default productSlice.reducer;
export const {searchProduct,clearSearchedProduct, creatingProduct,updatingProduct, addProductField, stopCreatingProduct,searchingProduct} = productSlice.actions;