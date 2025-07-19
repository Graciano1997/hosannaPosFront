import { useState } from "react";
import Modal from "../general/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, stopCreatingOrUpdateingCategory, updateCategory } from "../../slices/categorySlice";
import { useTranslation } from "react-i18next";
import { firstCapitalize } from "../../lib/firstCapitalize";

const CreateCategory=()=>{

   const categoriesState = useSelector((state)=>state.categoryState);

   const [category,setCategory]=useState(categoriesState.categoryToUpdate);
   const dispatch = useDispatch();
   const categories = categoriesState.categories;
   const {t} = useTranslation();

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
        <Modal helper={stopCreatingOrUpdateingCategory}>
        <form onSubmit={handleFormSubmition} action="POST" className='flex flex-col h-[100%]  mt-[1rem] rounded p-3'>
                <div className="flex flex-col gap-4">
                <div className="flex gap-5">
                <div className="w-[50%]">
                <label>
                {firstCapitalize(t('name'))}
                <br />
                <input type='text' onChange={formHandler} name="name" value={category.name} className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
               
                <div className="w-[50%]">
                <label>
                {firstCapitalize(t('parent_category'))}
                <br />
                <select name="parent_category_id" value={category.parent_category_id?category.parent_category_id:""} onChange={formHandler} className='p-2 rounded w-[100%] outline-none'>
                <option value="" disabled>{firstCapitalize(t('select_parent_category'))}</option>
                <option value={0}>{firstCapitalize(t('none'))}</option>
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
                <option value="" disabled selected>{firstCapitalize(t('select_status'))}</option>
                    <option value={true}>{firstCapitalize(t('active'))}</option>
                    <option value={false}>{firstCapitalize(t('disative'))}</option>
                </select>
                </label>
                </div>
                </div>

                <div className="flex gap-5">
                <div className="w-[50%]">
                <label>
                    {firstCapitalize(t('description'))}
                <br />
                <textarea name="description" value={category.description} onChange={formHandler} className='p-2 rounded w-[100%] outline-none'></textarea>
                </label>
                </div>
                </div>
                </div>
                <div className="flex justify-end p-2 mt-auto"><button className="p-2 bg-green-100 rounded"> {category.id ? firstCapitalize(t('update')) : firstCapitalize(t('create'))}</button></div>
                </form>
        </Modal>
    </>
    );
};

export default CreateCategory;