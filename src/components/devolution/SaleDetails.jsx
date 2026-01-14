import ButtonGroup from "./Button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import SaleDetailsHeader from "./SaleDetailsHeader";
import { useDispatch, useSelector } from "react-redux";
import { getInvoiceItem, getSaleInvoiceItem, selectItem, setNewAmountToReceive, saleClean } from "../../slices/saleSlice";
import { useState } from "react";
import { clearSearchedProduct, searchingProduct, searchProduct } from "../../slices/productSlice";
import { openModal, showToast } from "../../slices/appSlice";
import { useTranslation } from "react-i18next";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { InvoiceStatus, SaleType } from "../../lib/Enums";
import SaleDevolutionItem from "./SaleDevolutionItem";


const SaleDevolutionDetails = () => {
    const dispatch = useDispatch();
    const selectedProducts = useSelector((state) => state.saleState.items);
    const saleState = useSelector((state) => state.saleState);
    const { invoiceSearchedItems } = saleState;
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const { t } = useTranslation();

    const dispatchSearchHandler = () => {
        dispatch(openModal());
        dispatch(clearSearchedProduct());
        dispatch(searchingProduct());
    };

    const dispatchSearchInvoiceHandler = () => {
        dispatch(getSaleInvoiceItem({ invoice_number: invoiceNumber }))
        .then((getSaleInvoiceItemState)=>{
            
            if(getSaleInvoiceItemState.payload.success){
                dispatch(showToast({success:true,message:firstCapitalize(t('invoice_found'))}));
            }

            if(getSaleInvoiceItemState.payload.error){
                dispatch(showToast({error:true,message:firstCapitalize(t('invoice_not_found'))}));
                dispatch(saleClean());
            }
        })
    };

    return (
        <div className={`h-[580px] bg-white rounded shadow-md p-3 flex flex-col gap-3 saleDetails`}>
            <h1 className="font-bold mt-1 text-end">* {firstCapitalize(t('sale_details'))}</h1>

            <div className="flex flex-col saleDetails relative h-[500px]">
                <div className="mt-[20px] p-3 bg-white transition-all duration-200 shadow-sm hover:shadow-md rounded">

                            <SaleDetailsHeader />
                            <div className="flex flex-col gap-2 h-[230px] mt-1" style={{ overflow: 'auto' }}>
                                {invoiceSearchedItems.map((product, index) => <SaleDevolutionItem index={index} product={product} key={product.id} />)}
                            </div>
                </div>

                <ButtonGroup saleState={saleState} />
            </div>
        </div>
    );
};

export default SaleDevolutionDetails;