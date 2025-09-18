import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Ip, IpTenant } from "../lib/ip";
import { removeDuplicate } from "../lib/removeDuplicate";

const initialState = {
    categories: [],
    isCreating:false,
    isUpdating:false,
    categoryToUpdate:{}
};

export const fetchCategories = createAsyncThunk("categoryState/fetchCategories",async (last_created_at=null)=>{
    const response = await fetch(`${IpTenant}categories/${last_created_at?`last/${last_created_at}/`:''}`,{method:'GET', headers:{'Content-Type':'application/json'}});
    return response.json();
});

export const createCategory = createAsyncThunk("categoryState/createCategory",async (category)=>{
    const response = await fetch(`${IpTenant}categories/`,{method:'POST',
        body:JSON.stringify(category),
     headers:{'Content-Type':'application/json'}});
    return response.json();
});

export const updateCategory = createAsyncThunk("categoryState/updateCategory",async (category)=>{
    const response = await fetch(`${IpTenant}categories/${category.id}`,
    {method:'PUT',
        body:JSON.stringify(category),
     headers:{'Content-Type':'application/json'}});
    return response.json();
});

export const deleteCategory = createAsyncThunk("categoryState/deleteCategory",async (id)=>{
    const response = await fetch(`${IpTenant}categories/${id}`,{ method:'DELETE' });
    return response.json();
});

export const categorySlice = createSlice({
    name:'categoryState',
    initialState,
    reducers:{
        creatingCategory: (state)=>{
            state.isCreating = true;
        },
        updatingCategory: (state,action)=>{
            state.isUpdating = true;
            state.categoryToUpdate=action.payload;
        },

        setCategories:(state,action)=>{
            state.categories = action.payload;
        },
        stopCreatingOrUpdateingCategory : (state)=>{
            state.isCreating = false;
            state.isUpdating = false;
            state.categoryToUpdate = {};
        },

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCategories.fulfilled,(state,action)=>{
                state.last_created_at=action.payload.last_created_at;
                if(action.payload.last_created_at && (action.payload.data).length){
                    if((state.categories).length==0){
                        state.categories = action.payload.data;
                    }else{
                        state.categories = removeDuplicate([...state.categories,...action.payload.data],'id');                     
                    }
                }
        })

        builder.addCase(createCategory.fulfilled,(state,action)=>{
            state.isCreating =false;
            if(action.payload.success){
                state.categories.push(action.payload.category)
            }
        })

        builder.addCase(updateCategory.fulfilled,(state,action)=>{
            state.isUpdating = false;
            state.categoryToUpdate = {};
            if (action.payload.success && action.payload.category) {
                const atIndex = state.categories.findIndex(item => item.id === action.payload.category.id);
                if (atIndex !== -1) {
                  const updatedCategories = [...state.categories]; // Create a new array
                  updatedCategories[atIndex] = action.payload.category; // Update the specific item
                  state.categories = updatedCategories; // Assign the new array to state
                }
              }            
        })

        builder.addCase(deleteCategory.fulfilled,(state,action)=>{
            state.categories = state.categories.filter((category)=>category.id!==action.payload.id);  
        })
    }
})

export default categorySlice.reducer;
export const { creatingCategory, updatingCategory, stopCreatingOrUpdateingCategory, setCategories } = categorySlice.actions;