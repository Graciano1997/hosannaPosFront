import { createSlice } from "@reduxjs/toolkit";
import { sum } from "../lib/sumSale";
import { PaymentType } from "../lib/Enums";

const initialState = {
    loading:false,
    error:'',
    items:[],
    totalItems:0,
    
    selectedItem:undefined,
    paymentType:PaymentType.CASH,
    total:0,
}

const saleSlice = createSlice({
    name:'saleState',
    initialState,

    reducers:
    {
        addProduct:(state,action)=>{
            if(!state.products.includes(item=>item.id===action.payload.id)){
                state.products.push(action.payload);
            }
        },

        addItem:(state,action)=>{
            const itemAtIndex = state.items.findIndex(item=>item.id==action.payload.id);
          
            if(itemAtIndex!==-1){
                state.items[itemAtIndex]={
                    ...state.items[itemAtIndex],
                    qty:(action.payload.qty*1 + state.items[itemAtIndex].qty*1),
                    total:action.payload.total + state.items[itemAtIndex].total,
                }
            }else{
                state.items.push(action.payload);
            }

            state.total = sum(state.items).total;
            state.totalItems = sum(state.items).totalItems;
        },

        removeItem:(state,action)=>{
            state.items=state.items.filter((item)=>item.id!==action.payload.id);
            state.total = sum(state.items).total;
            state.totalItems = sum(state.items).totalItems;
        },

        updateItem: (state,action)=>{
            const atIndex = state.items.findIndex(item=>item.id===action.payload.id);

            if(atIndex!=-1){
                state.items[atIndex] = {
                    ...state.items[atIndex],
                    qty:action.payload.qty,
                    total:action.payload.total,
                }
            }
            state.total = sum(state.items).total;
            state.totalItems = sum(state.items).totalItems;
            state.selectedItem = undefined;
        },
        selectItem: (state,action)=>{
            state.selectedItem = action.payload;            
        },
        setPaymentType:(state,action)=>{
            state.paymentType = action.payload
        }
    },
});


export default saleSlice.reducer;
export const {addItem,updateItem,removeItem,selectItem,addProduct,setPaymentType} = saleSlice.actions;
