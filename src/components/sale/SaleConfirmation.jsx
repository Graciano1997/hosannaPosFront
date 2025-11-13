import { useDispatch, useSelector } from "react-redux";
import { order, saleClean, saleNotConfirm, setSaleObject } from "../../slices/saleSlice";
import { closeModal, openInvoiceView, showToast } from "../../slices/appSlice";
import { ClientType, PaymentType, SaleType, SaleTypeTranslation } from "../../lib/Enums";
import { useTranslation } from "react-i18next";
import { clearSearchedProduct, fetchProducts } from "../../slices/productSlice";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { printing } from "../../slices/printerSlice";
import { CurrentUser } from "../../lib/CurrentUser";

const SaleConfirmation = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const saleState = useSelector((state) => state.saleState);
    const appState = useSelector((state) => state.appState);
    const { printerConfiguration } = useSelector((state) => state.printerState);
    
    const orderHandler = () => {
        const treatedSaleObject = {
            client: {
                ...saleState.clientDetails
            },
            sale: {
                invoiceType: saleState.invoiceType,
                qty: saleState.totalItems,
                payment_way: saleState.paymentType,
                received_cash:saleState.invoiceType == SaleType.PROFORM_PF ? 0 : (((saleState.paymentType==PaymentType.CASH || saleState.paymentType == PaymentType.MIXED)) ? saleState.receivedCash : 0),
                received_tpa: saleState.paymentType == SaleType.PROFORM_PF ? 0 : (( PaymentType.TPA == saleState.paymentType? saleState.total : (saleState.paymentType==PaymentType.MIXED ? saleState.receivedTpa:0))),
                descount: saleState.invoiceType == SaleType.PROFORM_PF ? 0 : 0,
                difference: saleState.invoiceType == SaleType.PROFORM_PF ? 0 : (saleState.paymentType == PaymentType.TPA ? 0 : (saleState.difference)),
                total: saleState.total,
                user_id: CurrentUser().id,
                reference_sale:saleState.referenceSale,
                new_amount_to_receive_for_FT_invoice:saleState.newAmountToReceiveForTheFTInvoice
            },
            items: saleState.invoiceType == SaleType.RECEIPT_RC ? saleState.invoiceSearchedItems : saleState.items
        }

        dispatch(order(treatedSaleObject))
            .then((orderResultState) => {
                if (saleState.invoiceType == SaleType.SALE) {
                    dispatch(showToast({ success: true, message: t('order_sucessfuly') }));
                } else {
                    dispatch(showToast({ success: true, message: t('success') }));
                }

                //THis action ensure to print in the Java print server App
                if (order.fulfilled.match(orderResultState)) {
                    //prints only if the user printerConfiguration is set to finish and print.
                    if (printerConfiguration.finishAndprint == "true") {
                        dispatch(printing({ 
                            copyNumber: parseInt(printerConfiguration.copyNumber),
                            template: orderResultState.payload.invoice_template,
                            printer: printerConfiguration.printer,
                            printerType: printerConfiguration.printertype
                        }))

                            .then((printingResultState) => {
                                if (printing.rejected.match(printingResultState)) {
                                    dispatch(showToast({ warning: true, message: firstCapitalize(t('ordered_without_printing')) }));
                                }
                            })
                    }else{
                         dispatch(showToast({ warning:true, message:firstCapitalize(t('ordered_without_printing'))}));
                    }
                }

                dispatch(saleClean());
                dispatch(clearSearchedProduct());
                dispatch(fetchProducts());
            });

        dispatch(closeModal());
    };
    return (
        <div className="mt-[100px] text-center">
            
            <h2 className="text-2xl">{`${firstCapitalize((t('confirm_generation')).replace('[X]',t(SaleTypeTranslation[saleState.invoiceType])))}`}</h2>
            
            <div className="mt-[2rem]">
                <button onClick={(el) => {
                    dispatch(saleNotConfirm());
                    dispatch(closeModal());
                    el.stopPropagation();
                }}
                    className="bg-blue-600 text-white rounded-[4px] m-[10px_20px] p-[10px_40px]">{firstCapitalize(t('cancel'))}</button>
                <button onClick={orderHandler} className=" bg-[rgba(0,50,0,0.3)] text-white rounded-[4px] m-[10px_20px] p-[10px_40px]"> {firstCapitalize(t('confirm'))}</button>
            </div>
        </div>
    );
};

export default SaleConfirmation;