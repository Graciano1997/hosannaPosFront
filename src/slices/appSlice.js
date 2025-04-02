import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteProduct, fetchProducts, productConfiguration, registerProduct, searchProduct, updateProduct } from "./productSlice";
import { addItem, fetchSales, order, removeItem, updateItem } from "./saleSlice";
import { createCategory, deleteCategory, fetchCategories, updateCategory } from "./categorySlice";
import currency from "currency.js";

const initialState = {
    isOpen:false,
    isSearching:false,
    showToast:false,
    toastObject:undefined,
    activeTab:'tab1',
    isLogged:true,
    loading:false,
    itemDetails:{},
    error:'',
    currency:{},
    isExporting:false
}

export const fetchCurrency= createAsyncThunk("appState/fetchCurrency",async ()=>{
    const response = await fetch('http://localhost:3000/api/currencies/active');
    return response.json();
});

const appSlice=createSlice({
    name:'appState',
    initialState,
    reducers:{
        itemDetails: (state,action)=>{
            state.itemDetails = action.payload
        },
        cleanItemDetails: (state)=>{
            state.itemDetails = {}
        },

        showToast:(state,action)=>{
            state.showToast=true;
            state.toastObject=action.payload
        },
        closeToast:(state)=>{
            state.showToast=false;
            state.toastObject=undefined;
        },
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
        Exporting:(state)=>{
            state.isExporting = true;
        },
        StopExporting:(state)=>{
            state.isExporting = false;
        },
        activeTab:(state,action)=>{
            state.activeTab=action.payload;
        },
        setLogged:(state)=>{state.isLogged=true;}
    },
    extraReducers: (builder)=>{
        builder.addCase(searchProduct,(state)=>{
            state.isOpen=true;            
        });

        builder.addCase(fetchCurrency.fulfilled,(state,action)=>{
            state.currency = action.payload.currency;            
        });

        builder.addCase(addItem,(state,action)=>{
            state.showToast=true;
            state.toastObject = {success:true,message:`Produto ${action.payload.name} Adicionado a compra`}
        });
        builder.addCase(removeItem,(state,action)=>{
            state.showToast=true;
            state.toastObject = {success:true,message:`Produto ${action.payload.name} Removido da compra`}
        })

        builder.addCase(updateItem,(state,action)=>{
            state.showToast=true;
            state.toastObject = {success:true,message:`Foi atualizada a quantidade do Produto ${action.payload.name} para ${action.payload.qty} `}
        })

        /* Fetch Products cases */
        builder.addCase(fetchProducts.pending,(state)=>{
            state.loading=true;
            state.error = '';
        });

        builder.addCase(fetchProducts.rejected,(state)=>{
            state.loading=false;
            state.error = '';
        });

        builder.addCase(fetchProducts.fulfilled,(state)=>{
            state.loading=false;
            state.error = '';
        });

        /* Fetch Categories cases */
                builder.addCase(fetchCategories.pending,(state)=>{
                    state.loading=true;
                    state.error = '';
                });
        
                builder.addCase(fetchCategories.rejected,(state)=>{
                    state.loading=false;
                    state.error = '';
                });
        
                builder.addCase(fetchCategories.fulfilled,(state)=>{
                    state.loading=false;
                    state.error = '';
                });

        /* Fetch Categories cases */
     
        
        /* Fetch sales cases */
                builder.addCase(fetchSales.pending,(state)=>{
                    state.loading=true;
                    state.error = '';
                });
        
                builder.addCase(fetchSales.rejected,(state)=>{
                    state.loading=false;
                    state.error = '';
                });
        
                builder.addCase(fetchSales.fulfilled,(state)=>{
                    state.loading=false;
                    state.error = '';
                });

        /* Fetch Sales cases */
      

        builder.addCase(registerProduct.pending,(state)=>{
            state.loading=true;
            state.error = '';
        });

        builder.addCase(registerProduct.fulfilled,(state,action)=>{
            state.showToast=true;
            state.loading=false;
            state.error = '';
           if(action.payload.error){
                state.toastObject = { error:true, message:action.payload.message[0] }
           }else{
               state.toastObject = { success:true, message:`Produto ${action.payload.product.name} criado com sucesso`}       
           }
        });



        builder.addCase(deleteProduct.fulfilled,(state)=>{
            state.showToast=true;
            state.toastObject = {success:true,message:`Produto eliminado com sucesso`}
        })

         builder.addCase(updateProduct.fulfilled,(state,action)=>{
            state.showToast=true;
            state.loading=false;
            state.error = '';
               state.toastObject = { success:true, message:`Produto ${action.payload.product.name} atualizado com sucesso`}       
        })

         builder.addCase(createCategory.fulfilled,(state,action)=>{
            state.loading=false;
            state.error = '';
            state.showToast=true;
            
            state.toastObject = { success:true, message:`Categoria ${action.payload.category.name} criada com sucesso`}       
        //    if(action.payload.error){
        //         state.toastObject = { error:true, message:action.payload.message[0] }
        //    }else{
        //    }
        })

        builder.addCase(updateCategory.fulfilled,(state,action)=>{
            state.loading=false;
            state.error = '';
            state.showToast=true;
            state.toastObject = { success:true, message:`Categoria ${action.payload.category.name} atualizada com sucesso`}       
        })

        builder.addCase(productConfiguration.rejected,(state,action)=>{
            state.showToast=true;
            state.toastObject = { error:true, message:`Algum erro a configuracao nao foi salva`};

        })

         builder.addCase(deleteCategory.fulfilled,(state,action)=>{
             state.showToast=true;
            if(action.payload.id){
                state.toastObject = { success:true, message:`Categoria eliminada com sucesso`}       
            }else{
                state.toastObject = { error:true, message:`Nao pode eliminar categoria ja associada a um produto`}
            }
        })
    }
});

export default appSlice.reducer;
export const {itemDetails, cleanItemDetails, showToast,closeToast,openModal,closeModal,Searching,StopSearching,activeTab,setLogged,Exporting,StopExporting} = appSlice.actions;
