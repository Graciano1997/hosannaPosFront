import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sum } from "../lib/sumSale";
import { ClientType, DefaultClientePhone, PaymentType, SaleType } from "../lib/Enums";

const initialState = {
    loading:false,
    error:'',
    items:[],
    totalItems:0,
    selectedItem:undefined,
    paymentType:PaymentType.CASH,
    clientDetails : {client_type:ClientType.SINGULAR, phone:DefaultClientePhone},
    invoiceType:SaleType.SALE,
    receivedCash:0,
    total:0,
    sales:[],
    difference:0
}

export const order=createAsyncThunk('saleState/order',async (sale)=>{
    const response = await fetch('http://localhost:3000/api/sales/',{
        method:'POST',
        body:JSON.stringify(sale),
        headers:{ 'Content-Type':'application/json'}
    });
    return response.json();
});

export const fetchSales=createAsyncThunk('saleState/fetchSales',async ()=>{
    const response = await fetch('http://localhost:3000/api/sales/',{
        method:'GET',
        headers:{ 'Content-Type':'application/json'}
    });
    return response.json();
});

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
                if((state.items[atIndex].stock - state.items[atIndex].output) >= (parseInt(action.payload.qty))){
                state.items[atIndex] = {
                    ...state.items[atIndex],
                    qty:action.payload.qty,
                    total:action.payload.total,
                }
            }
            }
            state.total = sum(state.items).total;
            state.totalItems = sum(state.items).totalItems;
            state.selectedItem = undefined;
        },

        increaseOne: (state,action)=>{
            const atIndex = state.items.findIndex(item=>item.id===action.payload.id);

            if(atIndex!=-1){
            if((state.items[atIndex].stock - state.items[atIndex].output) >= (parseInt(action.payload.qty) + 1)){
                state.items[atIndex] = {
                    ...state.items[atIndex],
                    qty: (parseInt(action.payload.qty) + 1 ),
                    total:(parseInt(state.items[atIndex].qty) + 1)*state.items[atIndex].price,
                }
            }
            }
            state.total = sum(state.items).total;
            state.totalItems = sum(state.items).totalItems;

            if((state.paymentType == PaymentType.CASH) && (state.receivedCash - state.total) >=0 ){
                state.difference =  state.receivedCash - state.total;
            }else{
                state.difference = 0;
            }
        },

        decreaseOne: (state,action)=>{
            const atIndex = state.items.findIndex(item=>item.id===action.payload.id);

            if(atIndex!=-1){

                if(state.items[atIndex].qty > 1){

                    state.items[atIndex] = {
                        ...state.items[atIndex],
                        qty:action.payload.qty-1,
                        total:(state.items[atIndex].qty - 1 )*state.items[atIndex].price,
                    }
                }
            }

            state.total = sum(state.items).total;
            state.totalItems = sum(state.items).totalItems;

            if((state.paymentType == PaymentType.CASH) && (state.receivedCash - state.total) >=0 ){
                state.difference =  state.receivedCash - state.total;
            }else{
                state.difference = 0;
            }
        },

        selectItem: (state,action)=>{
            state.selectedItem = action.payload;            
        },
        setPaymentType:(state,action)=>{
            state.paymentType = action.payload
        },
        setInvoiceType:(state,action)=>{
            state.invoiceType = action.payload
        },
        setClientDetails: (state,action)=>{
            
            const clientDetailsDraft = {
                ...state.clientDetails,
                ...action.payload
            }

            state.clientDetails = clientDetailsDraft;
        },
        setSaleDetails: (state,action)=>{
            
            const saleDetailsDraft = {
                ...state.saleDetails,
                ...action.payload
            }

            state.saleDetails = saleDetailsDraft;
        },
        setReceivedCash:(state,action)=>{
            state.receivedCash = action.payload;
            if(state.paymentType == PaymentType.CASH && (action.payload - state.total) > 0 ){
                state.difference =  state.receivedCash - state.total;
            }else{
                state.difference = 0;
            }
            
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchSales.fulfilled,(state,action)=>{
            state.sales = action.payload.data
        })
    }
});


export default saleSlice.reducer;
export const {setReceivedCash,increaseOne,decreaseOne,addItem,updateItem,removeItem,selectItem,addProduct,setPaymentType,setInvoiceType, setClientDetails} = saleSlice.actions;
