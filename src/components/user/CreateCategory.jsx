import { useState } from "react";
import Modal from "../general/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, updateCategory } from "../../slices/categorySlice";

const CreateCategory=({stopCreating})=>{

   const categoriesState = useSelector((state)=>state.categoryState);

   const [category,setCategory]=useState(categoriesState.categoryToUpdate);
   const dispatch = useDispatch();
   const categories = categoriesState.categories;


   const formHandler = (el)=>{
    setCategory({
        ...category,
        [el.target.name]:el.target.value
    })
   }

   const handleFormSubmition = (el)=>{
    el.preventDefault();
    
    setCategory({
        ...category,
        parent_category_id:category.parent_category_id*1
    })

    let treatedCategoryObject = {
        ...category,
        parent_category_id:category.parent_category_id==0? null: parseInt(category.parent_category_id)
    }

    if(treatedCategoryObject.id){
        dispatch(updateCategory(treatedCategoryObject));
    }else{
        dispatch(createCategory(treatedCategoryObject));
    }
   }

    return(
        <>
        <Modal stopCreating={stopCreating}>
        <form onSubmit={handleFormSubmition} action="POST" className='flex flex-col h-[100%]  mt-[1rem] rounded p-3'>
                <div className="flex flex-col gap-4">
                <div className="flex gap-5">
                <div className="w-[50%]">
                <label>
                Nome
                <br />
                <input type='text' onChange={formHandler} name="name" value={category.name} className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
               
                <div className="w-[50%]">
                <label>
                Parent Category
                <br />
                <select name="parent_category_id" value={category.parent_category_id?category.parent_category_id:""} onChange={formHandler} className='p-2 rounded w-[100%] outline-none'>
                <option value="" disabled>Selecione uma categoria Parente</option>
                <option value={0}>Nenhuma</option>
                {categories.map((category)=><option value={category.id*1}>{category.name}</option>)}
                </select>
                </label>
                </div> 
                </div>
                <div className="flex gap-5">
                <div className="w-[50%]">
                <label>
                Status
                <br />
                <select name="status" value={category.status} className='p-2 rounded w-[100%] outline-none' onChange={formHandler}>
                <option value="" disabled selected>Selecione o estado</option>
                    <option value={true}>Ativo</option>
                    <option value={false}>Desativo</option>
                </select>
                </label>
                </div>
                </div>

                <div className="flex gap-5">
                <div className="w-[50%]">
                <label>
                    Description
                <br />
                <textarea name="description" value={category.description} onChange={formHandler} className='p-2 rounded w-[100%] outline-none'></textarea>
                </label>
                </div>
                </div>
                </div>
                <div className="flex justify-end p-2 mt-auto"><button className="p-2 bg-green-100 rounded"> {category.id?'Update':'Create'}</button></div>
                </form>
        </Modal>
    </>
    );
};

export default CreateCategory;