import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductConfiguration, fetchProductsFields, productConfiguration } from "../../slices/productSlice";
import ProductConfigurationFormItem from "./ProductConfigurationFormItem";

const ProductConfiguration = ()=>{

    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(fetchProductConfiguration());
        dispatch(fetchProductsFields());
    },[]);


    const filterRows = ['id','name','qty','price','category_id','code'];
    const [productFields,setProductFields]=useState([]);

    const product=useSelector((state)=>state.productState.productAllFields);
    const keys=product.filter((item)=>!filterRows.includes(item));
     
    const productConfigurationElements = useSelector((state)=>state.productState.productConfigurationFields);
         
    const productConfigurationFilterElements = useSelector((state)=>state.productState.filterRowsOp);


    const handleFormSubmition = (el)=>{
        el.preventDefault();
        dispatch(productConfiguration(productConfigurationFilterElements))    
    }


    return(
        <div className="mt-[2rem] h-[100%]">
            <h1 className="pl-2 font-light text-3xl text-start">Product Configurations Fields</h1>
            <form onSubmit={handleFormSubmition} className="w-[100%] mt-[2rem] shadow p-2">
                <div className="grid grid-cols-3">
                <p className="">Name</p>
                <p className="text-center">Status</p>
                <p className="text-center">Mandatory</p>
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