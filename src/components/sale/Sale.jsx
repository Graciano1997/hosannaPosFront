import { useTranslation } from "react-i18next";
import SaleHeader from "./SaleHeader";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import ClientDetails from "./ClientDetails";
import SaleDetails from "./SaleDetails";
import QrCodeReader from "../QrCode/QrCodeReader";
import ProductDetails from "./ProductDetails";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../general/Modal";
import SearchedProducts from "./SearchedProducts";

const Sale=({setToastObject})=>{

    const {t}=useTranslation();
    const [isReadingQr,setIsReadingQr]=useState(false);
    const [readValue,setReadValue]= useState(null);
    
    const globalState = useSelector((state)=>state.appState);
    
    const isSelectedProduct = useSelector((state)=>state.saleState.selectedItem);
    
    const dispatch=useDispatch();

        return(
        <>
        <SaleHeader title={t('sales')} setIsReadingQr={setIsReadingQr} setReadValue={setReadValue} />
        <div className={` xs:grid ${isSelectedProduct?'xs:grid-cols-[20fr_60fr_20fr]':'xs:grid-cols-[20fr_80fr]'}  xs:gap-4 xs:mt-4 p-1 sm:gap-4 `}>
        <ClientDetails/>
        <SaleDetails/>

        {isSelectedProduct && <ProductDetails/>}

        {globalState.isOpen && <Modal><SearchedProducts/></Modal>}
  
        </div>
        {isReadingQr && (<QrCodeReader 
        setToastObject={setToastObject}
        readValue={readValue}
         setReadValue={setReadValue}
          setIsReadingQr={setIsReadingQr}
          />)}
        </>
    )
};

export default Sale;