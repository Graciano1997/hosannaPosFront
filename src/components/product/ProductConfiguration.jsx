import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductConfiguration, fetchProducts, fetchProductsFields, productConfiguration } from "../../slices/productSlice";
import ProductConfigurationFormItem from "./ProductConfigurationFormItem";
import { useTranslation } from "react-i18next";
import { activeTab, showToast } from "../../slices/appSlice";
import { firstCapitalize } from "../../lib/firstCapitalize";

const ProductConfiguration = ()=>{

    const { t } = useTranslation();

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchProductsFields());
        dispatch(fetchProductConfiguration());
    },[]);


    const filterRows = ['id','name','qty','price','category_id','code','mesure_unit','product_type'];
    const [productFields,setProductFields]=useState([]);

    const product=useSelector((state)=>state.productState.productAllFields) || [];
    const keys=product.filter((item)=>!filterRows.includes(item));
    const productConfigurationElements = useSelector((state)=>state.productState.productConfigurationFields);
         
    const productConfigurationFilterElements = useSelector((state)=>state.productState.filterRowsOp);


    const handleFormSubmition = (el)=>{
        el.preventDefault();
        dispatch(productConfiguration(productConfigurationFilterElements))
        .then(()=>{
            dispatch(showToast({ success:true, message:t('saved_sucessfuly')}))
            dispatch(fetchProducts());
            dispatch(fetchProductsFields());
            dispatch(fetchProductConfiguration());
            dispatch(activeTab('tab1'));
        })    
    }


    return(
        <div className="mt-[2rem] h-[100%]">
            <h1 className="pl-2 font-light text-3xl text-start">Product Configurations Fields</h1>
            <form onSubmit={handleFormSubmition} className="w-[100%] mt-[2rem] shadow p-2">
                <div className="grid grid-cols-2">
                <p className="">{firstCapitalize(t('name'))}</p>
                <p className="">{ firstCapitalize(t('status'))}</p>
                {/* <p className="text-center">{t('mandatory')[0].toUpperCase().concat(t('mandatory').slice(1))}</p> */}
                </div>
                <div className="mt-[1rem] h-[230px] w-[100%]  overflow-scroll">
                
                {keys.map((field,index)=>{
                      const item = productConfigurationElements.find((item)=>item.field==field);
                    return <ProductConfigurationFormItem active={item!=undefined?item.active:true}
                    mandatory={item!=undefined?item.mandatory:false}
                    key={index} field={field} index={index}/>
                }
            )}
            </div>
                <div className="flex justify-end mt-[1rem]"><button className="p-2 bg-green-100 rounded">{'Salvar'}</button></div>
            </form>
        </div>
    )
};

export default ProductConfiguration;