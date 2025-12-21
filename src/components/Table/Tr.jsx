import { PencilIcon, PlusCircleIcon, PlusIcon, PrinterIcon, TrashIcon, UserIcon } from "@heroicons/react/24/solid";
import Money from "../general/Money";
import { useDispatch, useSelector } from "react-redux";
import { stateDisplay, textDisplay } from "../../lib/activeDisplay";
import { cleanItemDetails, itemDetails, openInvoiceView, openModal, showToast } from "../../slices/appSlice";
import Details from "./Details";
import { useState } from "react";
import { updateProduct } from "../../slices/productSlice";
import { useTranslation } from "react-i18next";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { getInvoiceItem } from "../../slices/saleSlice";
import { productFormHandler } from "../product/Create";
import { printing } from "../../slices/printerSlice";

const Tr = ({ item, index, deleteItem, updateItem, filterRows, filterDetails, addItem, printItem = null, rowStyle }) => {

    const { t } = useTranslation();
    const { printerConfiguration } = useSelector((state) => state.printerState);

    const moneyFields = ['price', 'total', 'amount', 'cost_price', 'difference', 'received_cash', 'received_tpa'];
    const movementTypeColor ={entry:"bg-green-500",exit:"bg-red-500",return:"bg-purple-500",adjustment:"bg-blue-500",expired:"bg-yellow-400"}
    
    const dispatch = useDispatch();
    const [checkNumber, setCheckNumber] = useState(false);
    const [qty, setQty] = useState(0);

    let keys = Object.keys(item);
    keys = keys.filter((item) => !filterRows.includes(item))
    const itemDetail = useSelector((state) => state.appState.itemDetails);
    return (
        <>
            <tr
                className={`${index % 2 == 0 ? rowStyle : ''}  cursor-pointer hover:sm:shadow font-light `}>
                {keys.map((key) =>
                    <td onClick={() => { dispatch(itemDetails(item)) }} className="p-1 text-center">
                        {key=="movement_type" &&  
                        (<span className="flex items-center gap-2"><span className={`w-3 h-3 rounded ${movementTypeColor[item[key]]}`}></span>{t(item[key])}
                        </span>)
                        }
                        {moneyFields.includes(key) && <Money amount={item[key]} />}
                        {typeof (item[key]) == "boolean" && (item[key] ? firstCapitalize(t('yes')) : firstCapitalize(t('not')))}
                        {item[key] == null && ('')}
                        {key == "image" && item[key] != "none" && <div className="flex justify-center"><img src={item[key]} className="w-[40px] h-[40px] rounded-[20px] duration-200 transition-all hover:shadow" /></div>}
                        {key !== "image" && !moneyFields.includes(key) && typeof (item[key]) != "boolean" && key!="movement_type"  && textDisplay(item[key])}
                    </td>
                )
                }
                <td className="flex justify-end  gap-[5px] pr-3">
                    <div className="flex gap-3 ">

                        {item.status && addItem &&
                            <div className="flex gap-2 items-center rounded-[16px]  bg-green-100 p-1">
                                <button onClick={() => {
                                    if (qty*1 > 0 && item.qty - qty >= 0) {
                                        let updatedItem = {
                                            ...item,
                                            qty: item.qty - qty * 1
                                        }
                                     
                                    const productForm = productFormHandler(updatedItem);

                                    dispatch(updateProduct(productForm));
                                    }
                                }} className={`${checkNumber ? 'bg-red-300' : 'bg-red-100'}  w-[20px] rounded-[50%] hover:shadow`}>-</button>
                                <input type="text"
                                    onChange={(el) => {
                                        if (isNaN(parseFloat(el.target.value)) || parseFloat(el.target.value) == 0) {
                                            setCheckNumber(false);
                                            setQty(0);
                                        } else {
                                            setQty(el.target.value);
                                            setCheckNumber(true);
                                        }
                                    }}
                                    className="p-[2px] w-[100px] text-center rounded-[16px]" placeholder="qty" />
                                <button onClick={() => {
                                    if (qty > 0) {
                                        const updatedItem = {
                                            ...item,
                                            qty: item.qty + qty * 1
                                        }
                                    const productForm = productFormHandler(updatedItem);
                                    dispatch(updateProduct(productForm));
                                    }
                                }} className={`${checkNumber ? 'bg-green-300' : 'bg-green-200'}  w-[20px] hover:shadow rounded-[50%]`}>+</button>
                            </div>
                        }

                        <div className={`flex item-center gap-3 ${item?.image ? 'mt-1':''}`}>
                        {updateItem && <button onClick={() => { dispatch(openModal()); dispatch(updateItem(item)); }}><PencilIcon className="w-6 y-6 p-1 text-green-800 hover:shadow hover:rounded" /></button>}
                        {printItem && <button onClick={() => {
                            dispatch(getInvoiceItem({id:item.id,printerType:printerConfiguration.printertype}))
                            .then((invoiceResultState) => {
                                    if (getInvoiceItem.fulfilled.match(invoiceResultState)) {
                                             
                                                dispatch(printing({
                                                    copyNumber: parseInt(printerConfiguration.copyNumber),
                                                    template: invoiceResultState.payload.invoice_template,
                                                    printer: printerConfiguration.printer,
                                                    printerType: printerConfiguration.printertype
                                                }))
                                                .then((printingResultState) => {
                                                    if (printing.rejected.match(printingResultState)) {
                                                        dispatch(showToast({ warning: true, message: firstCapitalize(t('could_not_reprint')) }));
                                                    }
        
                                                     if (printing.fulfilled.match(printingResultState)) {
                                                        dispatch(showToast({ success: true, message: firstCapitalize(t('reprinting')) }));
                                                    }
                                                })
                                         
                                        
                                        
                                        
                                        //     dispatch(printing(invoiceResultState.payload.invoice_item))
                                        //     .then((printingStateResult)=>{
                                            //             dispatch(showToast({success:true,message:firstCapitalize(t('reprinting'))}))
                                            //           if(printing.rejected.match(printingStateResult)){
                                                //               dispatch(showToast({error:true,message:firstCapitalize(t('error_reprinting'))}))
                                                //               }
                                                //     })
                                            }
                                            if(getInvoiceItem.rejected.match(invoiceResultState)){
                                                dispatch(showToast({error:true, message:firstCapitalize(t('could_not_get_the_invoice'))}));
                                    }
                                })

                            }}><PrinterIcon className="w-6 y-6 p-1 text-black hover:shadow hover:rounded" /></button>}
                        {deleteItem && <button onClick={() => { dispatch(deleteItem(item.id)) }}><TrashIcon className="w-6 y-6 p-1 text-red-300 hover:shadow hover:rounded" /></button>}
                            </div>
                    </div>
                </td>
            </tr>
            {itemDetail.id != undefined && <Details filterDetails={filterDetails} rowStyle={rowStyle} cleanItemDetails={cleanItemDetails} />}
        </>
    )
}

export default Tr;