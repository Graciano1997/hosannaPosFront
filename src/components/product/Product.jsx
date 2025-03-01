import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Table from "../Table/Table";
import Create from "./Create";
import Title from "../general/Title";
import ProductDashboard from "./ProductDashboard";
import { useDispatch, useSelector } from "react-redux";
import { creatingProduct, deleteProduct, fetchProductConfiguration, fetchProducts, stopCreatingProduct, updatingProduct } from "../../slices/productSlice";
import CardWrapper from "../general/CardWrapper";
import TabWrapper from "../general/TabWrapper";
import { creatingCategory, deleteCategory, fetchCategories, updateCategory, updatingCategory } from "../../slices/categorySlice";
import CreateCategory from "./CreateCategory";
import ProductConfiguration from "./ProductConfiguration";

const Product=()=>{
    
    const appState=useSelector((state)=>state.appState);
    const {t}=useTranslation();
    const [isShowing,setIsShowing]=useState(false);
    const dispatch = useDispatch();
    const productState = useSelector((state)=>state.productState);
    const categoryState = useSelector((state)=>state.categoryState);
    const filterProductDetails =['id','category_id'];
    const filterCategoryDetails =['id','parent_category_id'];

    useEffect(()=>{
        dispatch(fetchProductConfiguration());
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    },[dispatch])
    
    const products = productState.products || [];
    return(
        <CardWrapper>
        <Title create={creatingProduct} title={t('products')}/>
        <TabWrapper>
        
        {appState.activeTab=="tab1" && !productState.error && !productState.loading &&
        <Table filterDetails={filterProductDetails} filterRows={(productState.productFilterRows).concat('category_id')} update={updatingProduct} create={creatingProduct} deleteItem={deleteProduct} collection={products}/>
        }
        
        {appState.activeTab=="tab2"  && (<ProductDashboard/>)}
        {appState.activeTab=="tab3" && !productState.error && !productState.loading && <Table filterDetails={filterCategoryDetails} update={updatingCategory} create={creatingCategory} deleteItem={deleteCategory}  filterRows={['parent_category_id','created_at','updated_at']}  collection={categoryState.categories || []}/>}
        {appState.activeTab=="tab4" && !productState.error && !productState.loading && <ProductConfiguration />}
        </TabWrapper>
        {(categoryState.isCreating || categoryState.isUpdating) && appState.isOpen && (<CreateCategory/>)}
        {(productState.isCreating  || productState.isUpdating ) && appState.isOpen && (<Create stopCreating={stopCreatingProduct} setIsShowing={setIsShowing}/>)}
        </CardWrapper>
    )
};

export default Product;
