import { createSlice } from "@reduxjs/toolkit";
import { deleteProduct, productConfiguration, registerProduct, searchProduct, updateProduct } from "./productSlice";
import { addItem, order, removeItem, updateItem } from "./saleSlice";
import { createCategory, deleteCategory, updateCategory } from "./categorySlice";

const initialState = {
    isOpen:false,
    isSearching:false,
    showToast:false,
    toastObject:undefined,
    activeTab:'tab1',
    isLogged:true,
    loading:false,
    itemDetails:{},
    error:''
}

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
        activeTab:(state,action)=>{
            state.activeTab=action.payload;
        },
        setLogged:(state)=>{state.isLogged=true;}
    },
    extraReducers: (builder)=>{
        builder.addCase(searchProduct,(state)=>{
            state.isOpen=true;            
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

        builder.addCase(deleteProduct.fulfilled,(state)=>{
            state.showToast=true;
            state.toastObject = {success:true,message:`Produto eliminado com sucesso`}
        })

         builder.addCase(registerProduct.fulfilled,(state,action)=>{
             state.showToast=true;

            if(action.payload.error){
                 state.toastObject = { error:true, message:action.payload.message[0] }
            }else{
                state.toastObject = { success:true, message:`Produto ${action.payload.product.name} criado com sucesso`}       
            }
         })

         builder.addCase(updateProduct.fulfilled,(state,action)=>{
            state.showToast=true;
               state.toastObject = { success:true, message:`Produto ${action.payload.product.name} atualizado com sucesso`}       
        })

         builder.addCase(createCategory.fulfilled,(state,action)=>{
            console.log(action.payload);
            state.showToast=true;
            
            state.toastObject = { success:true, message:`Categoria ${action.payload.category.name} criada com sucesso`}       
        //    if(action.payload.error){
        //         state.toastObject = { error:true, message:action.payload.message[0] }
        //    }else{
        //    }
        })

        builder.addCase(updateCategory.fulfilled,(state,action)=>{
            state.showToast=true;
               state.toastObject = { success:true, message:`Categoria ${action.payload.category.name} atualizada com sucesso`}       
        })

        builder.addCase(productConfiguration.rejected,(state,action)=>{
            state.showToast=true;
               state.toastObject = { error:true, message:`Algum erro a configuracao nao foi salva`}
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
export const {itemDetails, cleanItemDetails, showToast,closeToast,openModal,closeModal,Searching,StopSearching,activeTab,setLogged} = appSlice.actions;
