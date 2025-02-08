import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading:false,
    error:'',
    items:[],
    selectedItem:undefined,
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
            state.items.push(action.payload);
            state.total+=action.payload.total;
        },

        removeItem:(state,action)=>{
            state.items=state.items.filter((item)=>item.id!=action.payload.id);
            state.total-=action.payload.total;
        },

        updateItem: (state,action)=>{
            const atIndex = state.items.findIndex(item=>item.id===action.payload.id);

            state.items[atIndex] = {
                ...state.items[atIndex],
                qty:action.payload.qty,
                total:action.payload.total,
            }
        },
        selectItem: (state,action)=>{
            state.selectedItem = action.payload;            
        }
    },
});


export default saleSlice.reducer;
export const {addItem,updateItem,removeItem,selectItem,addProduct} = saleSlice.actions;
