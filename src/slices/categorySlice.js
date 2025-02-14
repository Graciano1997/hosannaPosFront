import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    isCreating:false,
};

export const fetchCategories = createAsyncThunk("categoryState/fetchCategories",async ()=>{
    const response = await fetch('http://localhost:3000/api/categories/',{method:'GET', headers:{'Content-Type':'application/json'}});
    return response.json();
});

export const createCategory = createAsyncThunk("categoryState/createCategory",async (category)=>{
    const response = await fetch('http://localhost:3000/api/categories/',{method:'POST',
        body:JSON.stringify(category),
     headers:{'Content-Type':'application/json'}});
    return response.json();
});

export const updateCategory = createAsyncThunk("categoryState/updateCategory",async (category)=>{
    const response = await fetch(`http://localhost:3000/api/categories/${category.id}`,
    {method:'PUT',
        body:JSON.stringify(category),
     headers:{'Content-Type':'application/json'}});
    return response.json();
});

export const deleteCategory = createAsyncThunk("categoryState/deleteCategory",async (id)=>{
    const response = await fetch(`http://localhost:3000/api/categories/${id}`,{ method:'DELETE' });
    return response.json();
});

export const categorySlice = createSlice({
    name:'categoryState',
    initialState,
    reducers:{
        creatingCategory: (state)=>{
            state.isCreating = true;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCategories.fulfilled,(state,action)=>{
            state.categories = action.payload.data;
        })

        builder.addCase(createCategory.fulfilled,(state,action)=>{
            state.isCreating =false;
            if(action.payload.success){
                state.categories.push(action.payload.category)
            }
        })

        builder.addCase(deleteCategory.fulfilled,(state,action)=>{
            state.categories = state.categories.filter((category)=>category.id!==action.payload.id);  
        })
    }
})

export default categorySlice.reducer;
export const { creatingCategory } = categorySlice.actions;