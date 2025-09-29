import { useDispatch, useSelector } from "react-redux";
import { order, saleClean, saleNotConfirm, setSaleObject } from "../../slices/saleSlice";
import { closeModal, openInvoiceView, showToast } from "../../slices/appSlice";
import { ClientType, PaymentType, SaleType } from "../../lib/Enums";
import { useTranslation } from "react-i18next";
import { clearSearchedProduct, fetchProducts } from "../../slices/productSlice";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { printing } from "../../slices/printerSlice";
import { A4Invoice } from "../../lib/invoices/A4Invoice";
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
                ...saleState.clientDetails,
                nif:saleState.clientDetails.client_type??999999999
            },
            sale: {
                invoiceType: saleState.invoiceType * 1,
                qty: saleState.totalItems,
                payment_way: saleState.paymentType,
                received_cash: saleState.paymentType == PaymentType.CASH ? saleState.receivedCash : null,
                received_tpa: saleState.paymentType == PaymentType.TPA ? saleState.total : 0,
                descount: 0,
                difference: saleState.paymentType == PaymentType.TPA ? 0 : (saleState.receivedCash * 1 - saleState.total * 1),
                total: saleState.total,
                user_id: CurrentUser().id
            },
            items: saleState.items
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
                        if (printerConfiguration.print_from_browser == "true") {
                            dispatch(openInvoiceView(orderResultState.payload.invoice_pdf));
                        } else {
                            console.log(A4Invoice(orderResultState.payload.invoice_item));
                            dispatch(printing({ 
                                copyNumber: parseInt(printerConfiguration.copyNumber),
                                invoiceTemplate: A4Invoice(orderResultState.payload.invoice_item),
                                printer: printerConfiguration.printer,
                            }))

                                .then((printingResultState) => {
                                    if (printing.rejected.match(printingResultState)) {
                                        dispatch(showToast({ warning: true, message: firstCapitalize(t('ordered_without_printing')) }));
                                    }
                                })
                        }
                    }else{
                        console.log("aqui...");
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
            {
                saleState.invoiceType == SaleType.SALE &&
                <h2 className="text-2xl">{firstCapitalize(t('confirm_sale'))}</h2>
            }

            {
                saleState.invoiceType == SaleType.PORFORM &&
                <h2 className="text-2xl">{firstCapitalize(t('confirm_proform'))}</h2>
            }
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