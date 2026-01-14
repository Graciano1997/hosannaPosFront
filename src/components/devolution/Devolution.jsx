import { useTranslation } from "react-i18next";
import SaleHeader from "./SaleHeader";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import ClientDetails from "../sale/ClientDetails";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../general/Modal";
import { clearSearchedProduct, fetchProducts } from "../../slices/productSlice";
import SaleConfirmation from "../sale/SaleConfirmation";
import { saleNotConfirm, setInvoiceType } from "../../slices/saleSlice";
import SaleDevolutionDetails from "./SaleDetails";
import { SaleType } from "../../lib/Enums";

const Devolution=({setToastObject})=>{
    const dispatch=useDispatch();
    const productState = useSelector((state)=>state.productState);
    
      useEffect(()=>{
        dispatch(setInvoiceType(SaleType.CREDIT_NOTE_NC));
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
        <div className={`flex flex-col gap-3 sm:grid sm:grid-cols-[20fr_80fr] p-1`}>
        <ClientDetails/>
        <SaleDevolutionDetails/>
        {saleConfirmationIsOpen && <Modal helper={saleNotConfirm}><SaleConfirmation/></Modal> }
        </div>
        </>
    )
};

export default Devolution;