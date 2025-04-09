import ButtonGroup from "./Button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import SaleDetailsHeader from "./SaleDetailsHeader";
import SaleItem from "./SaleItem";
import { useDispatch, useSelector } from "react-redux";
import { selectItem } from "../../slices/saleSlice";
import { useState } from "react";
import { clearSearchedProduct, searchProduct } from "../../slices/productSlice";
import { openModal } from "../../slices/appSlice";
import { useTranslation } from "react-i18next";
import { firstCapitalize } from "../../lib/firstCapitalize";


const SaleDetails = ()=>{
    const dispatch = useDispatch();
    const products = useSelector((state)=>state.productState.products);
    const selectedProducts = useSelector ((state)=>state.saleState.items);
    const saleState = useSelector ((state)=>state.saleState);

    const {t}=useTranslation();
    
    const dispatchSearchHandler = ()=>{
        dispatch(openModal());
        dispatch(clearSearchedProduct());
    }
    
    return(
        <div className={`h-[560px] bg-white rounded shadow-md p-3 flex flex-col gap-3 saleDetails`}>
        <h1 className="font-bold mt-1 text-end">* { firstCapitalize(t('sale_details'))}</h1>
       
        <div className="flex flex-col saleDetails relative h-[500px]">
        
        <div className="flex flex-col gap-3">
                <label htmlFor="searchProduct">{ firstCapitalize(t('search'))}</label>
                <div className="flex flex-col bg-green-100 rounded">
                <div className='bg-green-100  flex justify-between items-center rounded p-1 shadow'>
                <input type='text' readOnly id="searchProduct" onClick={dispatchSearchHandler}

                className='p-1 rounded outline-none  bg-green-100 w-[100%]'/>
                <MagnifyingGlassIcon
                onClick={dispatchSearchHandler}
                 className="w-7 y-7 text-[#323232] cursor-pointer"/>
                </div>
            </div>
            </div>
               
            <div className="mt-[20px] p-3 bg-white transition-all duration-200 shadow-sm hover:shadow-md rounded">
                
                {selectedProducts.length > 0 &&
                <>
                <SaleDetailsHeader/>
                 <div className="flex flex-col gap-2 h-[230px] mt-1" style={{overflow:'auto'}}>
                 {selectedProducts.map((product,index)=><SaleItem index={index} product={product} key={product.id}/>)}   
                 </div>
                </>
                }

                {!(selectedProducts.length > 0) && 
                    <h2 className="text-center font-light text-xl">{firstCapitalize(t('no_product_add_to_sale'))}</h2>
                }
            </div>
            
        <ButtonGroup saleState={saleState}/>
        </div>
        </div> 
    );
};

export default SaleDetails;