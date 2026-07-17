import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { order, saleClean, saleNotConfirm, setSaleObject } from "../../slices/saleSlice";
import { closeModal, openInvoiceView, showToast } from "../../slices/appSlice";
import { ClientType, PaymentType, PrinterMode, SaleType, SaleTypeTranslation } from "../../lib/Enums";
import { useTranslation } from "react-i18next";
import { clearSearchedProduct, fetchProducts } from "../../slices/productSlice";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { printing } from "../../slices/printerSlice";
import { CurrentUser } from "../../lib/CurrentUser";

const AskForPrintingConfirmation = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const saleState = useSelector((state) => state.saleState);
    const { printerConfiguration } = useSelector((state) => state.printerState);
    
    const printingHandler = () => {
        dispatch(closeModal());
    };

    return (
        <div className="mt-[100px] text-center">
            <h1 className="text-2xl">{firstCapitalize(t('sale_completed_successfully'))}</h1>  
            <h2 className="text-2xl mt-[2rem]">{firstCapitalize(t('confirm_printing'))}</h2>  
            <div className="mt-[2rem]">
                <button onClick={(el) => {
                    el.stopPropagation();
                }}
                    className="bg-blue-600 text-white rounded-[4px] m-[10px_20px] p-[10px_40px]">{firstCapitalize(t('not'))}</button>
                <button onClick={printingHandler} className=" bg-[rgba(0,50,0,0.3)] text-white rounded-[4px] m-[10px_20px] p-[10px_40px]"> {firstCapitalize(t('yes'))}</button>
            </div>
        </div>
    );
};

export default AskForPrintingConfirmation;