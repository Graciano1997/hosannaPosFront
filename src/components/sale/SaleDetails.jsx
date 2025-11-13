import ButtonGroup from "./Button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import SaleDetailsHeader from "./SaleDetailsHeader";
import SaleItem from "./SaleItem";
import { useDispatch, useSelector } from "react-redux";
import { getInvoiceItem, getSaleInvoiceItem, selectItem, setNewAmountToReceive } from "../../slices/saleSlice";
import { useState } from "react";
import { clearSearchedProduct, searchingProduct, searchProduct } from "../../slices/productSlice";
import { openModal } from "../../slices/appSlice";
import { useTranslation } from "react-i18next";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { SaleType } from "../../lib/Enums";
import SaleInvoiceSearchedtem from "./SaleInvoiceSearchedtem";


const SaleDetails = ()=>{
    const dispatch = useDispatch();
    const products = useSelector((state)=>state.productState.products);
    const selectedProducts = useSelector ((state)=>state.saleState.items);
    const saleState = useSelector ((state)=>state.saleState);
    const {invoiceSearchedItems} = saleState;
    const [invoiceNumber,setInvoiceNumber]=useState('');

    const {t}=useTranslation();
    
    const dispatchSearchHandler = ()=>{
        dispatch(openModal());
        dispatch(clearSearchedProduct());
        dispatch(searchingProduct());
    };

    const dispatchSearchInvoiceHandler = ()=>{
        dispatch(getSaleInvoiceItem({invoice_number:invoiceNumber}));
    };
    
    return(
        <div className={`h-[560px] bg-white rounded shadow-md p-3 flex flex-col gap-3 saleDetails`}>
        <h1 className="font-bold mt-1 text-end">* { firstCapitalize(t('sale_details'))}</h1>
       
        <div className="flex flex-col saleDetails relative h-[500px]">
        {
        saleState.invoiceType == SaleType.RECEIPT_RC
        &&   
        <div className="flex flex-col gap-3">
        <label htmlFor="searchProduct">{ firstCapitalize(t('search_for_invoice_id'))}</label>
        <div className='bg-green-100  flex justify-between items-center rounded p-1 shadow'>
               
                <input type='text' onChange={(el)=>{setInvoiceNumber(el.target.value)}} placeholder={`${t('example')} FT-006/2025`} 

                className='p-1 rounded outline-none  bg-green-100 w-[100%]'/>
                <MagnifyingGlassIcon
                onClick={dispatchSearchInvoiceHandler}
                 className="w-7 y-7 text-[#323232] cursor-pointer"/>
                </div>
            </div>
        }
        {
        saleState.invoiceType != SaleType.RECEIPT_RC
        &&
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
        }        
            <div className="mt-[20px] p-3 bg-white transition-all duration-200 shadow-sm hover:shadow-md rounded">

                {
                saleState.invoiceType != SaleType.RECEIPT_RC
                    && !(selectedProducts.length > 0) && 
                    <h2 className="text-center font-light text-xl">{firstCapitalize(t('no_product_add_to_sale'))}</h2>
                }
                                
                {saleState.invoiceType != SaleType.RECEIPT_RC && selectedProducts.length > 0 &&
                <>
                <SaleDetailsHeader/>
                 <div className="flex flex-col gap-2 h-[230px] mt-1" style={{overflow:'auto'}}>
                 {selectedProducts.map((product,index)=><SaleItem index={index} product={product} key={product.id}/>)}   
                 </div>
                </>
                }

            {saleState.invoiceType == SaleType.RECEIPT_RC && invoiceSearchedItems.length > 0 &&
                <>
                <SaleDetailsHeader/>
                 <div className="flex flex-col gap-2 h-[230px] mt-1" style={{overflow:'auto'}}>
                 {invoiceSearchedItems.map((item,index)=><SaleInvoiceSearchedtem index={index} product={item} key={item.code}/>)}   
                 </div>
                 <p className="text-end"><span className="font-bold">{firstCapitalize(t('invoice_status'))}{':'}</span> <span className="text-xl">{firstCapitalize(t('pending'))}</span> </p>
                

                 <div className="flex gap-3 flex-col mt-3">
                                <label for="newAmountToReceive">{firstCapitalize(t('new_amount_to_receive'))}</label>
                                <input 
                                type="number" id="newAmountToReceive" name="newAmountToReceive"  onChange={(el)=>{                
                                    dispatch(setNewAmountToReceive(el.target.value*1));   
                                }} className="bg-green-100 rounded w-[40%] p-2"/>
                </div>
                </>
                }

            </div>
            
        <ButtonGroup saleState={saleState}/>
        </div>
        </div> 
    );
};

export default SaleDetails;