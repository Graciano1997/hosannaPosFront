import { createSlice } from "@reduxjs/toolkit";
import { deleteProduct, registerProduct, searchProduct } from "./productSlice";
import { addItem, removeItem, updateItem } from "./saleSlice";

const initialState = {
    isOpen:false,
    isSearching:false,
    showToast:false,
    toastObject:undefined,
    activeTab:'tab1',
    isLogged:true
}

const appSlice=createSlice({
    name:'appState',
    initialState,
    reducers:{
        showToast:(state,action)=>{
            state.showToast=true;
            state.toastObject=action.payload
        },
        closeToast:(state)=>{
            state.showToast=false;
            state.toastObject=undefined;
        }
        ,
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
            state.toastObject = {success:true,message:`Produto ${action.payload.product.name} criado com sucesso`}
        })
    }
});

export default appSlice.reducer;
export const {showToast,closeToast,openModal,closeModal,Searching,StopSearching,activeTab,setLogged} = appSlice.actions;
