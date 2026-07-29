import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../general/Modal";
import Money from "../general/Money";
import { stateDisplay, textDisplay } from "../../lib/activeDisplay";
import { useTranslation } from "react-i18next";
import { UserIcon } from "@heroicons/react/24/solid";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { useLocation, useNavigate } from "react-router-dom";
import { getSaleInvoiceItem, setRefenceSale } from "../../slices/saleSlice";
import { rootpath } from "../../lib/ip";

const movementTypeColor ={entry:"bg-green-500",exit:"bg-red-500",return:"bg-purple-500",adjustment:"bg-blue-500",expired:"bg-yellow-400"}
const moneyFields = ['price','total', 'amount', 'cost_price','discount','difference','received_cash'];

const Details = React.memo(({closeDetails,filterDetails=[],rowStyle, itemDetails}) =>{
 
    let keys = Object.keys(itemDetails);
    const {pathname}=useLocation();  
    const hasImage = itemDetails.image_url ? true : false;

    keys = keys.filter((item) => !filterDetails.includes(item));
    const {t}= useTranslation();
    const navegate = useNavigate();
    const dispatch = useDispatch();
    
    return(
        <Modal helper={closeDetails}>
            <div className="flex p-2">
            <div className="w-[100%]">
                <h4 className="text-3xl font-light text-end">{ firstCapitalize(t('details'))}</h4>
                <div className={`mt-[2rem] p-1 ${hasImage?'grid gap-[2rem] justify-center':'flex'}`} style={{gridTemplateColumns:`${ hasImage ?'10fr 90fr':'100fr'}`}}>      
                
                { hasImage && <div className="h-[100%]">
                <div className="w-[250px] h-[300px] sm:shadow rounded-[16px]">
                    {itemDetails.image==="none" && <UserIcon className="w-[100%] h-[100%] rounded-[16px]"/> }
                    {itemDetails.image!=="none" &&  <img src={itemDetails.image_url} className="w-[100%] h-[100%] rounded-[16px]" />}
                </div>
                </div>}
                
                <div className="flex flex-col w-[100%] h-[300px] p-3 rounded sm:shadow overflow-y-scroll">
                <div className="mt-2">
                {keys.map((item)=>
                <div className="flex flex-col gap-1 hover:shadow p-2">
                    <p className={`${rowStyle} p-1`}>{ firstCapitalize(t(item))}</p>
                    <p className="font-light">

                    {item=="movement_type" &&  
                        (<span className="flex items-center gap-2"><span className={`w-3 h-3 rounded ${movementTypeColor[itemDetails[item]]}`}></span>{t(itemDetails[item])}
                        </span>)
                    }
                    {moneyFields.includes(item) &&  <Money amount={itemDetails[item]} />}
                    {typeof (itemDetails[item]) == "boolean" && stateDisplay(itemDetails[item]) }
                    
                    {!moneyFields.includes(item) && typeof(itemDetails[item]) != "boolean" && item!="movement_type" &&  itemDetails[item]}
                    </p>
                </div>
                )}

                {
                    itemDetails.payment_way	&&
                    itemDetails.sale_products.length>0 
                    && !itemDetails.invoice_number.includes('NC')
                    &&
                    <>
                    <h2 className="text-end text-xl p-1">{firstCapitalize(t('products'))}</h2>
                 <div className="shadow p-2" >
                    <div className="grid grid-cols-8 gap-8 p-4">
                    { Object.keys(itemDetails.sale_products[0]).map((item)=><p className="font-bold">{firstCapitalize(t(item))}</p>)}
                    </div>

                    {itemDetails.sale_products.map((item,index)=>
                    <div className={`${index % 2 == 0 ? 'bg-green-200' : ''} hover:shadow grid grid-cols-8 gap-8 p-2 font-light`}>
                        <p>{item.id}</p>
                        <p>{item.code}</p>
                        <p>{item.name}</p>
                        <p>{item.qty}</p>
                        <p>{item.discount}</p>
                        <p>{item.taxes}</p>
                        <p><Money amount={item.price}/></p>
                        <p><Money amount={item.subtotal}/></p>
                    </div>
                    )}
                </div>
                    </>}

                </div>
                </div>
                </div>
                <div className="mt-[2rem] gap-3 flex justify-end">
                    {
                    pathname==`${rootpath}sales`  && itemDetails.sale_products.length>0 
                    && !itemDetails.invoice_number.includes('NC') 
                    && 
                    <button
                    onClick={()=>{
                        dispatch(setRefenceSale(itemDetails.invoice_number));
                        dispatch(getSaleInvoiceItem({devolution:true, invoice_number: itemDetails.invoice_number }))
                        navegate(`${rootpath}sale/devolution`)}}
                    className="bg-red-300 p-2 rounded hover:shadow"> {firstCapitalize(t('returning'))}</button>}
                {/* <button className="bg-green-200 p-2 rounded hover:shadow"> {firstCapitalize(t('export'))}</button> */}
                </div>
            </div>
            </div>
        </Modal>
    )
}
);

export default Details;
