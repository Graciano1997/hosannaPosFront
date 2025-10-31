import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Table from "../Table/Table";
import Create from "./Create";
import Title from "../general/Title";
import ProductDashboard from "./ProductDashboard";
import { useDispatch, useSelector } from "react-redux";
import { creatingProduct, deleteProduct,  fetchAlertProducts, fetchExpiredProducts, fetchProductConfiguration, fetchProducts, loadingMore, setProducts, stopCreatingOrUpdateingProduct, stopCreatingProduct, updatingProduct } from "../../slices/productSlice";
import CardWrapper from "../general/CardWrapper";
import TabWrapper from "../general/TabWrapper";
import { creatingCategory, deleteCategory, fetchCategories, setCategories, updateCategory, updatingCategory } from "../../slices/categorySlice";
import CreateCategory from "./CreateCategory";
import ProductConfiguration from "./ProductConfiguration";
import ExpiredProducts from "./ExpiredProducts";
import AlertProducts from "./AlertProducts";

const Product=()=>{
    
    const appState=useSelector((state)=>state.appState);
    const {t}=useTranslation();
    const [isShowing,setIsShowing]=useState(false);
    const dispatch = useDispatch();
    const productState = useSelector((state)=>state.productState);

    useEffect(()=>{
        dispatch(fetchProducts(productState.last_created_at));
        dispatch(fetchExpiredProducts());
        dispatch(fetchProductConfiguration());
        dispatch(fetchAlertProducts());
    },[]);
    

    const categoryState = useSelector((state)=>state.categoryState);
    const filterProductDetails =['id','category_id','image'];
    const filterCategoryDetails =['id','parent_category_id'];
    const products = productState.products || [];
    
    const [collectionToExport,setColumnsToExport]=useState({
        model:t('products'),
        data:products
    });

    useEffect(()=>{
        if(appState.activeTab=="tab1"){
            setColumnsToExport({
                model:t('products'),
                data:products              
        })}

        if(appState.activeTab=="tab3"){
            setColumnsToExport({
                model:t('category'),
                data:categoryState.categories              
        })}

        if(appState.activeTab=="tab4"){
            setColumnsToExport({
                model:t('alert_product'),
                data:productState.alertProducts              
        })}

        if(appState.activeTab=="tab5"){
            setColumnsToExport({
            model:t('expired_product'),
            data:productState.expireds              
    })}
    },[appState.activeTab]);


    return(
        <CardWrapper>
        <Title create={creatingProduct} title={t('products')}
        collectionToExport={collectionToExport}
        />
        <TabWrapper>
        
        {appState.activeTab=="tab1" &&
            <Table addItem={true} filterDetails={filterProductDetails} setCollection={setProducts} filterRows={(productState.productFilterRows).concat('category_id')} update={updatingProduct} create={creatingProduct} deleteItem={deleteProduct} dispatcher={setProducts} fetcher={fetchProducts} collection={products || []} loadingMore={loadingMore} fetcherParam={productState.last_created_at}/>
        }
        
        {appState.activeTab=="tab2"  && (<ProductDashboard/>)}
        {appState.activeTab=="tab3"  && <Table filterDetails={filterCategoryDetails} update={updatingCategory} create={creatingCategory} deleteItem={deleteCategory}  filterRows={['parent_category_id','created_at','updated_at']} setCollection={setCategories} fetcher={fetchCategories} dispatcher={setCategories}  collection={categoryState.categories || []} fetcherParam={categoryState.last_created_at} />}
        {appState.activeTab=="tab4"  && 
        <AlertProducts/>
        }
        {appState.activeTab=="tab5" &&  
        <ExpiredProducts/>
        }
        {appState.activeTab=="tab6"  && <ProductConfiguration />}

        </TabWrapper>
        {(categoryState.isCreating || categoryState.isUpdating) && appState.isOpen && (<CreateCategory/>)}
        {(productState.isCreating  || productState.isUpdating ) && appState.isOpen && (<Create stopCreating={stopCreatingOrUpdateingProduct} setIsShowing={setIsShowing}/>)}
        </CardWrapper>
    )
};

export default Product;
