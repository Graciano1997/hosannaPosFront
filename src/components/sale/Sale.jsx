import { useTranslation } from "react-i18next";
import SaleHeader from "./SaleHeader";
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
import { fetchCashRegisters, setSelectedCashSession, validateCurrentUserCashSession } from "../../slices/cashRegisterSlice";
import { OpenCashSession } from "../CashRegister/OpenSession";
import { closeModal, openModal } from "../../slices/appSlice";
import { CloseCashAndWithdrawalSession } from "../CashRegister/CloseCashAndWithdrawalSession";

const Sale= React.memo(
     ({setToastObject})=>{
    const dispatch=useDispatch();
    const {t}=useTranslation();
    const [isReadingQr,setIsReadingQr]=useState(false);
    const [readValue,setReadValue]= useState(null);    
    const globalState = useSelector((state)=>state.appState);
    const isSelectedProduct = useSelector((state)=>state.saleState.selectedItem);
    const {saleConfirmationIsOpen} = useSelector((state)=>state.saleState);
    const {isSearching} = useSelector((state)=>state.productState);
    const { printerConfiguration } = useSelector((state) => state.printerState);
    const finishAndPrint = printerConfiguration?.finishAndprint === "true" ? true : false;
    const cashRegisterState = useSelector((state) => state.cashRegisterState);
    const {cashregisters,hasCurrentUserStartSession,currentSession} = cashRegisterState;
    const appState = useSelector((state) => state.appState);
    const [closingCashSession,setClosingCashSession] = useState(false);

      useEffect(()=>{
        dispatch(fetchProducts());
        dispatch(fetchCashRegisters());
        dispatch(validateCurrentUserCashSession()).then((response)=>{
            if(!response.payload.data){
                dispatch(openModal());
            }
        })
      },[]);

        return(
        <>
        <SaleHeader closingCashHandler={()=>{
            setClosingCashSession(true)
            dispatch(openModal())
        }} 
        title={t('sales')} 
        setReadValue={setReadValue}
        />
        
        <div className={`flex flex-col gap-3 sm:grid sm:grid-cols-[20fr_80fr] p-1`}>
        <ClientDetails/>
        <SaleDetails/>

        {isSelectedProduct && <ProductDetails/>}

        {globalState.isOpen && isSearching && <Modal helper={clearSearchedProduct}><SearchedProducts/></Modal>}  
        
        {saleConfirmationIsOpen && appState.isOpen && <Modal helper={saleNotConfirm}><SaleConfirmation printerConfiguration={printerConfiguration} finishAndPrint={finishAndPrint}/></Modal> }
 
        {
        !hasCurrentUserStartSession && appState.isOpen
        &&
            <OpenCashSession cashregisters={cashregisters}/>
         }

         {closingCashSession
         &&
                             <CloseCashAndWithdrawalSession  
                             selectedSession={currentSession}
                                 closePopup={()=>{
                                    dispatch(setSelectedCashSession(null)); 
                                    setClosingCashSession(false)
                                    dispatch(closeModal());
                                }
                                }
                                     />
                             }
        </div>
        </>
    )});

export default Sale;