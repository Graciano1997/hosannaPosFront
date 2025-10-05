import { BackspaceIcon, ShoppingBagIcon } from "@heroicons/react/16/solid";
import { BanknotesIcon, Bars4Icon } from "@heroicons/react/24/solid";
import { EllipsisHorizontalIcon, QrCodeIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { PaymentType, SaleType } from "../../lib/Enums";
import { setInvoiceType, setPaymentType, setReceivedCash } from "../../slices/saleSlice";
import Money from "../general/Money";
import { useTranslation } from "react-i18next";
import { firstCapitalize } from "../../lib/firstCapitalize";

const SaleHeader=({title,setIsReadingQr,setReadValue})=>{
    const sale = useSelector((state)=>state.saleState);
    const dispatch = useDispatch();
    const {t}= useTranslation();

    return(
        <div className="mt-[3rem] flex flex-col sm:flex-row gap-5 sm:justify-between sm:items-center  w-[100%] sm:h-[100px] bg-white rounded p-4">  
            <div className="flex gap-3 items-center">
            <label className="text-xl">
            {t('invoice')}
            </label>
            <select defaultValue={sale.invoiceType} onChange={(el)=>{
                dispatch(setInvoiceType(el.target.value));
            }} 
            className="cursor-pointer p-2 rounded transition-all duration-200 bg-white shadow">
                <option value={SaleType.SALE} selected>{firstCapitalize(t('sale'))}</option>
                <option value={SaleType.PORFORM}>{firstCapitalize(t('proforma'))}</option>
            </select>
            </div>
           
           <div className="flex gap-4">

            <div className="flex gap-3 items-center">
                <label htmlFor="clienteType" className="sm:text-xl">{firstCapitalize(t('payment_way'))}</label>
                <select id="clienteType" onChange={(el)=>{
                    dispatch(setPaymentType(el.target.value));
                    if(el.target.value ==PaymentType.TPA){        
                    dispatch(setReceivedCash(0));
                    }
                }}
                 className="cursor-pointer text-black p-2 rounded transition-all duration-200 bg-white shadow">
                    <option value={PaymentType.CASH}>{ firstCapitalize(t('money'))}</option>
                    <option value={PaymentType.TPA}>{ firstCapitalize(t('tpa'))}</option>
                    <option value={PaymentType.MIXED}>{ firstCapitalize(t('mixed'))}</option>
                </select>
            </div>
            
            <div className="flex gap-3 items-center">   
            {/* {false &&
            <button onClick={()=>{
                setReadValue(null);
                setIsReadingQr(true);}} 
            className="flex h-[45px] text-black p-3 rounded transition-all duration-200 hover:shadow">
            <QrCodeIcon className="w-7 y-7 text-[#323232] rounded cursor-pointer hover:shadow-sm"/> Ler Qr
            </button>  
            }          */}
            {/* <button className="flex gap-[5px] h-[35px] items-center text-black p-1 text-xl rounded transition-all duration-200 hover:shadow">
            Ler barras
            <Bars4Icon style={{padding:0,margin:0}} className="w-7 y-7 p-0 text-[#323232] rounded cursor-pointer  rotate"/>
            <Bars4Icon style={{padding:0,margin:0}} className="barItem w-7 y-7 p-0 text-[#323232] rounded cursor-pointer rotate"/>
    
            </button> */}
            </div>
            </div>

            <div className="flex mt-[1rem] sm:mt-0 gap-5 sm:items-center">
            <p className="font-bold flex gap-1">
            <BanknotesIcon className="w-5 y-7 text-[#323232] rounded cursor-pointer hover:shadow-sm"/>
            {firstCapitalize('total')}:<Money amount={sale.total} /></p>
            <div className="flex flex-col" style={{position:'relative'}}>
             <p className="bg-green-200 p-1 text-black opacity-90" style={{position:'absolute',borderRadius:'50%', fontSize:'12px',top:'-22px',right:'-10px'}}>{sale.totalItems}</p>   
            <ShoppingCartIcon className="w-7 y-7 text-[#323232] rounded cursor-pointer hover:shadow-sm"/>
            </div>
            </div>
        </div>
    )
};

export default SaleHeader;
