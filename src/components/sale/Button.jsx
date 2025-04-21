import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { saleConfirm, setSaleObject } from "../../slices/saleSlice";
import { PaymentType, SaleType } from "../../lib/Enums";
import { firstCapitalize } from "../../lib/firstCapitalize";

const ButtonGroup = ({saleState})=>{
    const {t}=useTranslation();

    const dispatch = useDispatch();
   
    return(
    <div className="absolute bottom-[-7px]  w-[100%] flex justify-end">
        {
        (saleState.items.length>0 && saleState.paymentType==PaymentType.CASH &&  saleState.receivedCash*1 >= saleState.total*1 
        || saleState.items.length>0 &&
            saleState.paymentType==PaymentType.TPA) 
        &&
         <button type="button"
        onClick={()=>{
            dispatch(saleConfirm());
        }}
         className="bg-green-200 rounded p-2 hover:shadow">{saleState.invoiceType==SaleType.SALE ?  firstCapitalize(t('order')) : firstCapitalize(t('confirm'))}</button>}
    </div>
    )
};

export default ButtonGroup;