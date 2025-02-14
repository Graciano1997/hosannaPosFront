import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Table from "../Table/Table";
import Create from "./Create";
import Title from "../general/Title";
import ProductDashboard from "./ProductDashboard";
import { useDispatch, useSelector } from "react-redux";
import { creatingProduct, deleteProduct, fetchProducts } from "../../slices/productSlice";
import CardWrapper from "../general/CardWrapper";
import TabWrapper from "../general/TabWrapper";
import { creatingCategory, deleteCategory, fetchCategories } from "../../slices/categorySlice";
import CreateCategory from "./CreateCategory";

const Product=()=>{
    
    const appState=useSelector((state)=>state.appState);
    const {t}=useTranslation();
    const [isShowing,setIsShowing]=useState(false);
    const dispatch = useDispatch();
    
    const productState = useSelector((state)=>state.productState);
    const categoryState = useSelector((state)=>state.categoryState);

    useEffect(()=>{
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    },[])

    
    const products = productState.products;
    return(
        <CardWrapper>
        <Title create={creatingProduct} title={t('products')}/>
        <TabWrapper>
        {appState.activeTab=="tab1" && productState.loading && 
        <div className=" mt-[5rem] flex justify-center">
            <h4 className="text-3xl">Loading the Products...</h4>
        </div>
        }

        {appState.activeTab=="tab1" && !productState.loading && 
        productState.error &&
        <div className="mt-[5rem] flex justify-center">
            <h4 className="text-3xl text-red-700">{productState.error}</h4>
        </div>
        }
        {appState.activeTab=="tab1" && !productState.error && !productState.loading &&
        <Table filterRows={['created_at','updated_at']} create={creatingProduct} deleteItem={deleteProduct} collection={products}/>
        }
        
        {appState.activeTab=="tab2"  && (<ProductDashboard/>)}
        {appState.activeTab=="tab3" && !productState.error && !productState.loading && <Table create={creatingCategory} filterRows={['created_at','updated_at']} deleteItem={deleteCategory} collection={categoryState.categories}/>}
        </TabWrapper>
        {productState.isCreating && (<Create setIsShowing={setIsShowing}/>)}
        {categoryState.isCreating && (<CreateCategory setIsShowing={setIsShowing}/>)}
        </CardWrapper>
    )
};

export default Product;
