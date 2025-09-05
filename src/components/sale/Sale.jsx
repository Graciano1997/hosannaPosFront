import { useTranslation } from "react-i18next";
import SaleHeader from "./SaleHeader";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import ClientDetails from "./ClientDetails";
import SaleDetails from "./SaleDetails";
import ProductDetails from "./ProductDetails";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../general/Modal";
import SearchedProducts from "./SearchedProducts";
import { clearSearchedProduct, fetchProducts } from "../../slices/productSlice";
import SaleConfirmation from "./SaleConfirmation";
import { saleNotConfirm } from "../../slices/saleSlice";

const Sale=({setToastObject})=>{
    const dispatch=useDispatch();
    const productState = useSelector((state)=>state.productState);
    
      useEffect(()=>{
          dispatch(fetchProducts(productState.last_created_at));
      },[]);

    const {t}=useTranslation();
    const [isReadingQr,setIsReadingQr]=useState(false);
    const [readValue,setReadValue]= useState(null);    
    const globalState = useSelector((state)=>state.appState);
    const isSelectedProduct = useSelector((state)=>state.saleState.selectedItem);
    const {saleConfirmationIsOpen} = useSelector((state)=>state.saleState);
    const {isSearching} = useSelector((state)=>state.productState);
    
        return(
        <>
        <SaleHeader title={t('sales')} setIsReadingQr={setIsReadingQr} setReadValue={setReadValue} />
        <div className={` xs:grid ${isSelectedProduct?'xs:grid-cols-[20fr_60fr_20fr]':'xs:grid-cols-[20fr_80fr]'}  xs:gap-4 xs:mt-4 p-1 sm:gap-4 `}>
        <ClientDetails/>
        <SaleDetails/>

        {isSelectedProduct && <ProductDetails/>}

        {globalState.isOpen && isSearching && <Modal helper={clearSearchedProduct}><SearchedProducts/></Modal>}  
        {saleConfirmationIsOpen && <Modal helper={saleNotConfirm}><SaleConfirmation/></Modal> }
        </div>
        </>
    )
};

export default Sale;