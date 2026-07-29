import { useTranslation } from "react-i18next";
import { PrinterMode } from "../../lib/Enums";
import SaleHeader from "./SaleHeader";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import ClientDetails from "./ClientDetails";
import SaleDetails from "./SaleDetails";
import ProductDetails from "./ProductDetails";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../general/Modal";
import SearchedProducts from "./SearchedProducts";
import { clearSearchedProduct, fetchProducts } from "../../slices/productSlice";
import SaleConfirmation from "./SaleConfirmation";
import { saleNotConfirm } from "../../slices/saleSlice";

const Sale= React.memo(
     ({setToastObject})=>{
    const dispatch=useDispatch();
    const productState = useSelector((state)=>state.productState);
    const {t}=useTranslation();
    const [isReadingQr,setIsReadingQr]=useState(false);
    const [readValue,setReadValue]= useState(null);    
    const globalState = useSelector((state)=>state.appState);
    const isSelectedProduct = useSelector((state)=>state.saleState.selectedItem);
    const {saleConfirmationIsOpen} = useSelector((state)=>state.saleState);
    const {isSearching} = useSelector((state)=>state.productState);
    const { printerConfiguration } = useSelector((state) => state.printerState);
    const finishAndPrint = printerConfiguration?.finishAndprint === "true" ? true : false;
    
      useEffect(()=>{
          dispatch(fetchProducts(productState.last_created_at));
      },[]);

        return(
        <>
        <SaleHeader title={t('sales')} setIsReadingQr={setIsReadingQr} setReadValue={setReadValue} />
        <div className={`flex flex-col gap-3 sm:grid sm:grid-cols-[20fr_80fr] p-1`}>
        <ClientDetails/>
        <SaleDetails/>

        {isSelectedProduct && <ProductDetails/>}

        {globalState.isOpen && isSearching && <Modal helper={clearSearchedProduct}><SearchedProducts/></Modal>}  
        
        {saleConfirmationIsOpen && 
        <Modal helper={saleNotConfirm}>
        <SaleConfirmation  printerConfiguration={printerConfiguration} finishAndPrint={finishAndPrint}/>
        </Modal>
         }
        </div>
        </>
    )});

export default Sale;