import { BackspaceIcon, ShoppingBagIcon } from "@heroicons/react/16/solid";
import { BanknotesIcon, Bars4Icon } from "@heroicons/react/24/solid";
import { EllipsisHorizontalIcon, QrCodeIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { PaymentType, SaleType } from "../../lib/Enums";
import { saleClean, setInvoiceType, setPaymentType, setReceivedCash, setReceivedTpa } from "../../slices/saleSlice";
import Money from "../general/Money";
import { useTranslation } from "react-i18next";
import { firstCapitalize } from "../../lib/firstCapitalize";

const SaleHeader=({title,setIsReadingQr,setReadValue})=>{
    const sale = useSelector((state)=>state.saleState);
    const dispatch = useDispatch();
    const {t}= useTranslation();
    // console.log(sale.invoiceType);
    
    return(
        <div className="mt-[3rem] flex flex-col sm:flex-row gap-5 sm:justify-between sm:items-center  w-[100%] sm:h-[100px] bg-white rounded p-4">  
            <div className="flex gap-3 items-center">
            <select defaultValue={sale.invoiceType} onChange={(el)=>{
                if(sale.invoiceType==SaleType.RECEIPT_RC && el.target.value != SaleType.RECEIPT_RC) 
                    dispatch(saleClean());
                
                dispatch(setInvoiceType(el.target.value));
            }} 
            className="cursor-pointer p-2 rounded transition-all duration-200 bg-white shadow">
                <option value={SaleType.CREDIT_NOTE_NC}>{firstCapitalize(t('credit_note'))}</option>
            </select>
            </div>
            
            <div className="flex gap-5">
                            <div className="flex mt-[1rem] sm:mt-0 gap-5 sm:items-center">
            <p className="font-bold flex gap-1">
            <BanknotesIcon className="w-5 y-7 text-[#323232] rounded cursor-pointer hover:shadow-sm"/>
            {firstCapitalize('total')}:<Money amount={sale.total} /></p>
            <div className="flex flex-col" style={{position:'relative'}}>
             <p className="bg-green-200 p-1 text-black opacity-90" style={{position:'absolute',borderRadius:'50%', fontSize:'12px',top:'-22px',right:'-10px'}}>{sale.totalItems}</p>   
            <ShoppingCartIcon className="w-7 y-7 text-[#323232] rounded cursor-pointer hover:shadow-sm"/>
            </div>
            </div>
            <div  style={{borderRight:"2px solid"}}>

            </div>

                        <div className="flex mt-[1rem] sm:mt-0 gap-5 sm:items-center">
            <p className="font-bold flex gap-1 text-red-400">
            <BanknotesIcon className="w-5 y-7 text-red-400 rounded cursor-pointer hover:shadow-sm"/>
            {firstCapitalize('total')}:<Money amount={sale.totalToReturn} /></p>
            <div className="flex flex-col" style={{position:'relative'}}>
             <p className="bg-red-200 p-1 text-black opacity-90" style={{position:'absolute',borderRadius:'50%', fontSize:'12px',top:'-22px',right:'-10px'}}>{sale.totalItemsToReturn}</p>   
            <ShoppingCartIcon className="w-7 y-7 text-[#323232] rounded cursor-pointer hover:shadow-sm"/>
            </div>
            </div>

            </div>



        </div>
    )
};

export default SaleHeader;
