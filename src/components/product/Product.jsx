import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Table from "../Table/Table";
import Create from "./Create";
import Title from "../general/Title";
import ProductDashboard from "./ProductDashboard";
import { useDispatch, useSelector } from "react-redux";
import { creatingProduct, deleteProduct,  fetchAlertProducts, fetchExpiredProducts, fetchProductConfiguration, fetchProducts, loadingMore, setProducts, stopCreatingOrUpdateingProduct, stopCreatingProduct, updatingProduct, fetchTopSellingProducts } from "../../slices/productSlice";
import CardWrapper from "../general/CardWrapper";
import TabWrapper from "../general/TabWrapper";
import { creatingCategory, deleteCategory, fetchCategories, setCategories, updateCategory, updatingCategory } from "../../slices/categorySlice";
import CreateCategory from "./CreateCategory";
import ProductConfiguration from "./ProductConfiguration";
import ExpiredProducts from "./ExpiredProducts";
import AlertProducts from "./AlertProducts";

const TopSellingProducts = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const productState = useSelector((state)=>state.productState);
    const [topNumber,setTopNumber] = useState(5);

    useEffect(()=>{
        dispatch(fetchTopSellingProducts({from:'',to:'',qty:topNumber}))
    },[topNumber])
    
    return(
        <>
        <div className="card-header flex justify-end mb-5 sm:mb-2"><h1> 
            <input 
            onChange={(el)=>{
                if(el.target.value===0)
                    setTopNumber(5)
                else
                    setTopNumber(el.target.value)
            }}
            className="border-none outline outline-1 text-center outline-green-300 border border-gray-300 rounded px-2 py-1"
          type="number" min={3} defaultValue={topNumber} placeholder={t('top_selling_products_count')} />  </h1></div>
      <Table 
       addItem={false}
       filterDetails={[]} 
       setCollection={null}
       filterRows={[]}
       update={null}
       create={null}
       deleteItem={null}
       dispatcher={null}
       fetcher={null} 
       rangeDataSelection={false}
       collection={productState.topSellingProducts || []}
       loadingMore={null}
       fetcherParam={null}
       />
       </>
    )
};

const Product=()=>{
    const appState=useSelector((state)=>state.appState);
    const {t}=useTranslation();
    const [isShowing,setIsShowing]=useState(false);
    const dispatch = useDispatch();
    const productState = useSelector((state)=>state.productState);

    useEffect(()=>{
        const loadData = async () => {
            await Promise.all([
                dispatch(fetchProducts()),
                dispatch(fetchExpiredProducts()),
                dispatch(fetchProductConfiguration()),
                dispatch(fetchAlertProducts()),
                dispatch(fetchTopSellingProducts({from:'',to:'',qty:5}))
            ])
        }
        loadData();
    },[dispatch]);

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

        if(appState.activeTab=="tab7"){
            setColumnsToExport({
            model:t('top_selling_products'),
            data:productState.topSellingProducts
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

        {appState.activeTab=="tab7" &&  
        <TopSellingProducts />
        }
        </TabWrapper>
        {(categoryState.isCreating || categoryState.isUpdating) && appState.isOpen && (<CreateCategory/>)}
        {(productState.isCreating  || productState.isUpdating ) && appState.isOpen && (<Create stopCreating={stopCreatingOrUpdateingProduct} setIsShowing={setIsShowing}/>)}
        </CardWrapper>
    )
};

export default Product;
