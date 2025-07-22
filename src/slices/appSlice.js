import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteProduct, fetchProducts, productConfiguration, registerProduct, searchProduct, updateProduct } from "./productSlice";
import { addItem, fetchSales, order, removeItem, updateItem } from "./saleSlice";
import { createCategory, deleteCategory, fetchCategories, updateCategory } from "./categorySlice";
import { deleteCompany, registerCompany } from "./companySlice";
import { Ip } from "../lib/ip";


const initialState = {
    isOpen:false,
    isSearching:false,
    showToast:false,
    toastObject:undefined,
    activeTab:'tab1',
    loading:false,
    itemDetails:{},
    error:'',
    printingError:false,
    isExporting:false,
    exportingModel:{},
    isLogged:true,
    currentTableCollection:[]
}

 export const authenticate= createAsyncThunk("appState/authenticate",async (user)=>{
    try{
        const response = await fetch(`${Ip}/api/authentication/login`,
            { method:'POST',
              body:JSON.stringify(user),
              headers:{'Content-Type':'application/json'}
            });
            return response.json();
    }catch(error){
        console.log(error);
    }
 });

  export const getInvoiceItem= createAsyncThunk("appState/getInvoiceItem",async (saleId)=>{
    try{
        const response = await fetch(`${Ip}/api/sales/reprint/${saleId}`,
            { method:'GET',
              headers:{'Content-Type':'application/json'}
            });
            return response.json();
    }catch(error){
        console.log(error);
    }
 });

  export const printing = createAsyncThunk("appState/printing",async (invoiceItem)=>{
        const response = await fetch(`http://localhost:5000/print`,
            { method:'POST',
              body:JSON.stringify(invoiceItem),
              headers:{'Content-Type':'application/json'}
            });
            
            console.log(response.json());
            return response.json();
 });

 export const exporting= createAsyncThunk("appState/exporting",async (data)=>{
    try{
        const response = await fetch(`${Ip}/api/export/excel`,
            { 
                method:'POST',
                body:JSON.stringify(data),                
                headers:{"Content-Type":"Application/json"}
            });

            const url = window.URL.createObjectURL(await response.blob());
            const a = document.createElement('a');
            a.href = url;
            a.download = 'export_data.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);

    }catch(error){
        console.log(error);
    }
 });


const appSlice=createSlice({
    name:'appState',
    initialState,
    reducers:{
        itemDetails: (state,action)=>{
            state.itemDetails = action.payload;
        },
        logoutUser: ()=>{
        localStorage.removeItem("isLogged");
        localStorage.removeItem("currentUser");
        },

        cleanItemDetails: (state)=>{
            state.itemDetails = {};
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
        Exporting:(state,action)=>{
            state.isExporting = true;
            state.exportingModel = action.payload;
        },
        StopExporting:(state)=>{
            state.isExporting = false;
            state.exportingModel = [];
        },
        setTableCurrentCollection: (state,action)=>{
            state.currentTableCollection = action.payload;
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

        // builder.addCase(fetchCurrency.fulfilled,(state,action)=>{
        //     state.currency = action.payload.currency;            
        // });

        builder.addCase(updateItem,(state,action)=>{
            state.showToast=true;
            state.toastObject = {success:true,message:`Foi atualizada a quantidade do Produto ${action.payload.name} para ${action.payload.qty} `}
        })

        /* Fetch Products cases */
        builder.addCase(fetchProducts.pending,(state)=>{
            state.loading=true;
            state.error = '';
        });

        builder.addCase(fetchProducts.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
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
               state.currentTableCollection.push({...action.payload.product});
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
            state.currentTableCollection.push({...action.payload.category});       
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


        builder.addCase(registerCompany.fulfilled,(state,action)=>{
            state.showToast=true;
               state.toastObject = { success:true, message:`Empresa criada com sucesso`}       
       })

       builder.addCase(registerCompany.rejected,(state,action)=>{
        state.showToast=true;
           state.toastObject = { success:true, message:`Algum erro ao tentar criar a Empresa`}       
        })
       
        builder.addCase(deleteCompany.rejected,(state,action)=>{
        state.showToast=true;
           state.toastObject = { success:true, message:`Algum erro ao tentar eliminar a Empresa`}       
        })

        builder.addCase(deleteCompany.fulfilled,(state,action)=>{
            state.showToast=true;
           if(action.payload.id){
               state.toastObject = { success:true, message:`Empresa eliminada com sucesso`}       
           }else{
               state.toastObject = { error:true, message:`Nao pode eliminar esta empresa`}
           }
       })

        builder.addCase(authenticate.fulfilled,(state,action)=>{
            
            if(action.payload!=undefined && action.payload.error){
                state.error = action.payload.error;
            }else if(action.payload!=undefined && action.payload.user){
                localStorage.setItem("isLogged",true);
                localStorage.setItem("currentUser",JSON.stringify(action.payload.user));
            }
        });

        builder.addCase(authenticate.rejected,(state,action)=>{
            state.error = action.error.message;
         console.log(action.error);
        });

        builder.addCase(exporting.fulfilled,(state,action)=>{
           
        });
        builder.addCase(exporting.rejected,(state,action)=>{
            state.error = action.error.message;
        });


    /* Fetch Printing cases */
        // builder.addCase(fetchProducts.rejected,(state,action)=>{
        //     state.loading=false;
        //     state.error=action.error.message;
        // });
        
        builder.addCase(printing.pending,(state)=>{
            state.printingError=false;
        });

        builder.addCase(printing.fulfilled,(state)=>{
            state.printingError=false;
        });

        builder.addCase(printing.rejected,(state)=>{
            state.printingError=true;
        });

    }
});

export default appSlice.reducer;
export const {itemDetails, cleanItemDetails, showToast,closeToast,openModal,closeModal,Searching,StopSearching,activeTab,setLogged,Exporting,StopExporting,logoutUser,setTableCurrentCollection} = appSlice.actions;
