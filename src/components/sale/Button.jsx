import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { saleConfirm, setSaleObject } from "../../slices/saleSlice";
import { PaymentType, SaleType } from "../../lib/Enums";
import { firstCapitalize } from "../../lib/firstCapitalize";

const ButtonGroup = ({ saleState }) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    return (
        <div className="absolute bottom-[-7px]  w-[100%] flex justify-end">
            { 
            saleState.items.length > 0 && 
            (
            saleState.invoiceType == SaleType.PROFORM_PF 
            ||
            ( saleState.paymentType == PaymentType.CASH
            && saleState.receivedCash * 1 >= saleState.total * 1 || saleState.paymentType == PaymentType.MIXED && ((saleState.receivedCash * 1 + saleState.receivedTpa * 1) >= saleState.total * 1) 
            || saleState.paymentType == PaymentType.TPA)
            ) ||
            saleState.invoiceType==SaleType.RECEIPT_RC &&
            saleState.invoiceSearchedItems.length > 0
            && saleState.newAmountToReceiveForTheFTInvoice == saleState.total
            &&
            <button type="button" onClick={() => { dispatch(saleConfirm());}} className="bg-green-200 rounded p-2 hover:shadow">{firstCapitalize(t('confirm'))}</button>}
        </div>
    )
};

export default ButtonGroup;