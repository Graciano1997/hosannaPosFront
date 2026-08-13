import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { order, saleClean, saleNotConfirm, setSaleObject } from "../../slices/saleSlice";
import { closeModal, openInvoiceView, showToast } from "../../slices/appSlice";
import { ClientType, PaymentType, PrinterMode, SaleType, SaleTypeTranslation } from "../../lib/Enums";
import {generateFromHtmlToPDF } from "../../lib/generatePrinterInvoicer";
import { clearSearchedProduct, fetchProducts } from "../../slices/productSlice";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { printing } from "../../slices/printerSlice";
import { CurrentUser } from "../../lib/CurrentUser";
import { FaSave, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PrinterIcon } from "@heroicons/react/16/solid";
import { BsPrinter } from "react-icons/bs";

const ManualPrinting = ({printerConfiguration, templateToPrint, item }) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    
    const shareToWhatsappHandler = () => {
        if(!templateToPrint){
            dispatch(showToast({ error: true, message: firstCapitalize(t('failed_to_fetch_template')) }));
            return;
        }
    /*
    const phone = "244936472003";
    const message = encodeURIComponent(
    "Olá! Segue a sua fatura: https://meusite.com/faturas/123.pdf"
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
    */
    }

    const saveHandler = () => {
        if(!templateToPrint){
            dispatch(showToast({ error: true, message: firstCapitalize(t('failed_to_fetch_template')) }));
            return;
        }

        if (generateFromHtmlToPDF(templateToPrint,printerConfiguration,`${t('invoice')} ${item.invoice_number} ${item.created_at}`))
            dispatch(saleNotConfirm());
    }

    const printingHandler = () => {      
        if(!templateToPrint){
            dispatch(showToast({ error: true, message: firstCapitalize(t('failed_to_fetch_template')) }));
            dispatch(saleNotConfirm());
            return;
        }

        if(!printerConfiguration?.printer) {
            dispatch(showToast({ error: true, message: firstCapitalize(t('printer_not_configured')) }));
            dispatch(saleNotConfirm());
            return;
        }

        dispatch(printing({ 
                            copyNumber: parseInt(printerConfiguration?.copyNumber) || 1,
                            template: templateToPrint,
                            printer: printerConfiguration?.printer,
                            printerType: printerConfiguration?.printerType || 'A4'
                        }))
                        .then((printingResultState) => {
                            if(printing.rejected.match(printingResultState)) dispatch(showToast({ error: true, message: firstCapitalize(t('error_reprinting'))}));                   
                            if(printing.fulfilled.match(printingResultState)) dispatch(showToast({ success: true, message: firstCapitalize(t('print_successful'))}));
                            dispatch(saleNotConfirm());
                        })
        }

    return (
        <div className="mt-[100px] flex flex-col items-center justify-center">
            <h1 className="text-5xl mt-4">{firstCapitalize(t('sale_completed_successfully'))}</h1>  
            <div className="mt-8 flex justify-center gap-8">
            {       
            false &&
            <>
            <button onClick={shareToWhatsappHandler}>
                <FaWhatsapp className="text-6xl text-green-600 hover:scale-110 transition" />
            </button>

            <button>
                <MdEmail className="text-6xl text-red-500 hover:scale-110 transition" />
            </button>
            </>
            }

            <button onClick={saveHandler}>
                <FaSave className="text-6xl text-gray-600 hover:scale-110 transition" />
            </button>

            <button onClick={printingHandler}>
                <BsPrinter className="text-6xl text-gray-700 hover:scale-110 transition" />
            </button>
            </div>

            {
                false 
                &&
                <div className="mt-[2rem]">
                <button onClick={(el) => {
                    dispatch(saleNotConfirm());
                }}
                className="bg-danger text-white rounded-[4px] m-[10px_20px] p-[10px_40px]">{firstCapitalize(t('not'))}</button>
                <button onClick={printingHandler} className=" bg-[rgba(0,50,0,0.3)] text-white rounded-[4px] m-[10px_20px] p-[10px_40px]"> {firstCapitalize(t('print'))}</button>
                </div>
            }
        </div>
    );
};


const AskForPrintingConfirmation = ({printerConfiguration, templateToPrint }) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    
    const printingHandler = () => {      
        if(!templateToPrint){
            dispatch(showToast({ error: true, message: firstCapitalize(t('failed_to_fetch_template')) }));
            dispatch(saleNotConfirm());
            return;
        }

        dispatch(printing({ 
                            copyNumber: parseInt(printerConfiguration.copyNumber),
                            template: templateToPrint,
                            printer: printerConfiguration.printer,
                            printerType: printerConfiguration.printertype
                        }))
                        .then((printingResultState) => {
                            if(printing.rejected.match(printingResultState)){
                                dispatch(showToast({ error: true, message: firstCapitalize(t('error_reprinting'))}));
                            } else {
                                dispatch(showToast({ success: true, message: firstCapitalize(t('print_successful'))}));
                            }
                              dispatch(saleNotConfirm());
                        })
    }

    return (
  <div className="mt-[100px] flex flex-col items-center justify-center">
          <h1 className="text-5xl mt-4">{firstCapitalize(t('sale_completed_successfully'))}</h1>  
          <h2 className="text-2xl mt-[5rem]">{firstCapitalize(t('confirm_printing'))}</h2>  

    
            <div className="mt-[1rem] flex justify-center gap-8">
                <button onClick={(el) => {
                    dispatch(saleNotConfirm());
                }}
                    className="bg-danger text-white rounded-[4px] m-[10px_20px] p-[10px_40px]">{firstCapitalize(t('not'))}</button>
                <button onClick={printingHandler} className=" bg-[rgba(0,50,0,0.3)] text-white rounded-[4px] m-[10px_20px] p-[10px_40px]">
                     <BsPrinter className="text-2xl text-gray-700 hover:scale-110 transition" />
                     </button>
            </div>
        </div>
    );
};



const SaleConfirmation = ({printerConfiguration}) => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const saleState = useSelector((state) => state.saleState);
    const [sold, setSold] = useState(false);
    const [ordering, setOrdering] = useState(false);
    const [templateToPrint, setTemplateToPrint] = useState(null);
    const [soldItem,setSoldItem] = useState(null);

    const orderHandler = () => {
        const treatedSaleObject = {
            client: {
                ...saleState.clientDetails
            },
            sale: {
                invoiceType: saleState.invoiceType,
                qty: saleState.invoiceType == SaleType.CREDIT_NOTE_NC ? saleState.totalItemsToReturn : saleState.totalItems,
                payment_way: saleState.paymentType,
                received_cash:saleState.invoiceType == SaleType.PROFORM_PF ? 0 : (((saleState.paymentType==PaymentType.CASH || saleState.paymentType == PaymentType.MIXED)) ? saleState.receivedCash : 0),
                received_tpa: saleState.paymentType == SaleType.PROFORM_PF ? 0 : (( PaymentType.TPA == saleState.paymentType? saleState.total : (saleState.paymentType==PaymentType.MIXED ? saleState.receivedTpa:0))),
                descount: saleState.invoiceType == SaleType.PROFORM_PF ? 0 : 0,
                difference: saleState.invoiceType == SaleType.PROFORM_PF ? 0 : (saleState.paymentType == PaymentType.TPA ? 0 : (saleState.difference)),
                total:saleState.invoiceType == SaleType.CREDIT_NOTE_NC ? saleState.totalToReturn :  saleState.total,
                user_id: CurrentUser()?.id,
                reference_sale:saleState.referenceSale,
                new_amount_to_receive_for_FT_invoice:saleState.newAmountToReceiveForTheFTInvoice
            },
            items: saleState.invoiceType == SaleType.CREDIT_NOTE_NC ? saleState.itemsToReturn : (saleState.invoiceType == SaleType.RECEIPT_RC ? saleState.invoiceSearchedItems : saleState.items)
        }
        // return console.log('treatedSaleObject',treatedSaleObject);
        
         if(!sold){
            setOrdering(true);
            dispatch(order(treatedSaleObject))
               .then((orderResultState) => {
                    if(order.fulfilled.match(orderResultState)) {
                       setSold((prev) => !prev);
                       setSoldItem(orderResultState?.payload?.sale_item);

                       setTemplateToPrint(orderResultState?.payload?.invoice_template);
                     
                       if ([SaleType.INVOICE_RECIBO_FR, SaleType.NORMAL_INVOICE_FT, SaleType.SIMPLIFYED_INVOICE_FS].includes(saleState.invoiceType)) {
                        dispatch(showToast({ success: true, message: t('sale_completed_successfully') }));
                        } else {
                        dispatch(showToast({ success: true, message: t('success') }));
                        }

                        if(!printerConfiguration?.printermode || printerConfiguration?.printermode === PrinterMode.AUTOMATIC) {
                           
                            dispatch(printing({ 
                                copyNumber: parseInt(printerConfiguration.copyNumber),
                                template: orderResultState.payload.invoice_template,
                                printer: printerConfiguration.printer,
                                printerType: printerConfiguration.printertype
                            }))
                            .then((printingResultState) => {
                                if (printing.rejected.match(printingResultState)) {
                                    dispatch(showToast({ warning: true, message: firstCapitalize(t('ordered_without_printing'))}));
                                }

                                if (printing.fulfilled.match(printingResultState)) {
                                    dispatch(showToast({ success: true, message: firstCapitalize(t('print_successful'))}));
                                }
                            })
                            dispatch(saleNotConfirm());
                        }
                        dispatch(saleClean());
                        dispatch(clearSearchedProduct());
                        dispatch(fetchProducts());
                    }
                    if(order.rejected.match(orderResultState)) {
                        dispatch(showToast({ error: true, message: firstCapitalize(t('sale_failed')) }));
                        dispatch(saleNotConfirm());
                    }
                });

         }else{
            dispatch(showToast({ warning:true, message:firstCapitalize(t('sale_already_ordered'))}));
            dispatch(saleNotConfirm());
        }
    };
    return (
        <div className="mt-[100px] flex flex-col items-center justify-center">
            {
            !sold && 
            <>
            <h2 className="text-2xl">{firstCapitalize(t('confirm_generation'))}</h2>
            <div className="mt-[2rem]">
                <button onClick={(el) => {
                    dispatch(saleNotConfirm());
                    dispatch(closeModal());
                    el.stopPropagation();
                }}
                className="bg-danger text-white rounded-[4px] m-[10px_20px] p-[10px_40px]">{firstCapitalize(t('cancel'))}</button>
                <button onClick={orderHandler} disabled={ordering} className={`${ordering ? 'bg-[rgba(0,50,0,0.3)]' : 'bg-[rgba(0,128,0,0.3)]'} text-white rounded-[4px] m-[10px_20px] p-[10px_40px]`}> {ordering ? firstCapitalize(t('ordering')) : firstCapitalize(t('confirm'))}</button>
            </div>
           </> 
            }
            {
            sold 
            && printerConfiguration?.printermode === PrinterMode.ASK 
            &&<AskForPrintingConfirmation printerConfiguration={printerConfiguration} templateToPrint={templateToPrint}/>
            }   
            {
            sold 
            && printerConfiguration?.printermode === PrinterMode.MANUAL 
            &&<ManualPrinting printerConfiguration={printerConfiguration} templateToPrint={templateToPrint}
            item={soldItem}
            />
            }   
        </div>
    );
};

export default SaleConfirmation;