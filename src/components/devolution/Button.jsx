import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { saleConfirm, setSaleObject } from "../../slices/saleSlice";
import { InvoiceStatus, PaymentType, SaleType } from "../../lib/Enums";
import { firstCapitalize } from "../../lib/firstCapitalize";

const ButtonGroup = ({ saleState }) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    return (
        <div className="absolute bottom-[20px] pr-3  w-[100%] flex justify-end">
            {
               saleState.totalToReturn > 0
            //    &&
            //     (
            //     (saleState.invoiceType == SaleType.CREDIT_NOTE_NC 
            //     )
            //     )
             &&
             <button type="button" onClick={() => { dispatch(saleConfirm());}} className="bg-green-200 rounded p-2 hover:shadow">{firstCapitalize(t('confirm_devolution'))}</button>
            }
        </div>
    )
};

export default ButtonGroup;