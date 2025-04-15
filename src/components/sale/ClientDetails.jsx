import { useState } from "react";
import { ClientType, DefaultClientePhone, PaymentType } from "../../lib/Enums";
import { useDispatch, useSelector } from "react-redux";
import Money from "../general/Money";
import { useTranslation } from "react-i18next";
import { setClientDetails, setReceivedCash } from "../../slices/saleSlice";
import { firstCapitalize } from "../../lib/firstCapitalize";

const ClientDetails = ()=>{
    const [clientType,setClientType]=useState(ClientType.SINGULAR);
    const sale= useSelector((state)=>state.saleState);
    const [remain,setRemain]=useState(null);
    const [received,setReceived]=useState(null);
    const dispatch = useDispatch();

    const saleDetails = useSelector((state)=>state.saleState);
    const clientDetails = saleDetails.clientDetails;
    
    const formHandler = (el)=>{
          dispatch(setClientDetails({[el.target.name]:el.target.value}))
       }

       const {t}= useTranslation();

    return(
        <div className={`h-[100%] bg-white rounded shadow-md p-3 flex flex-col  gap-2`}>
            <h1 className="font-bold mt-1 text-end"> * {firstCapitalize(t('client_details'))}</h1>
            <div className="flex flex-col gap-3 mt-1">
                <label for="clienteNome">{firstCapitalize(t('name'))}</label>
                <input type="text" name="name" onChange={formHandler} value={clientDetails.name} className="bg-green-100 rounded p-2"></input>
            </div>

            <div className="flex flex-col gap-3 mt-1">
                <label for="clienteEmail">{firstCapitalize(t('email'))}</label>
                <input type="email" onChange={formHandler} name="email" value={clientDetails.email} id="clienteEmail" className="bg-green-100 rounded p-2"></input>
            </div>

            <div className="flex flex-col gap-3">
                <label for="clienteContact">{firstCapitalize(t('phone'))}</label>
                <input type="number" name="phone" onChange={formHandler} value={clientDetails.phone} id="clienteContact" defaultValue={DefaultClientePhone} className="bg-green-100 rounded p-2"></input>
            </div>

            <div className="flex flex-col gap-3">
                <label for="clienteType">{ firstCapitalize(t('client_type'))}</label>
                <select id="clienteType" value={clientDetails.client_type } defaultValue={ClientType.SINGULAR} name="client_type" className="bg-green-100 rounded p-2" onChange={(el)=>{
                    formHandler(el);
                    setClientType(el.target.value);
                }}>
                    <option value={ClientType.SINGULAR}>{firstCapitalize(t('singular'))}</option>
                    <option value={ClientType.COMPANY}>{firstCapitalize(t('company'))}</option>
                </select>
            </div>
            
            {clientType==ClientType.COMPANY &&
            <div className="flex flex-col gap-3">
                <label for="clienteNif">{firstCapitalize(t('nif'))}</label>
                <input type="text" name="nif" value={clientDetails.nif}  onChange={formHandler} id="clienteNif" className="bg-green-100 rounded p-2"></input>
            </div>
            }
            
            {sale.paymentType==PaymentType.CASH &&
            <div className="flex flex-col gap-3">
                <label for="cashReceived">{firstCapitalize(t('received_cash'))}</label>
                <input type="number" id="cashReceived" name="received_cash"  value={received}  onChange={(el)=>{
                    setReceived(el.target.value);
                    
                    if(el.target.value*1 > sale.total && sale.total > 0 ){
                        setRemain(el.target.value*1 - sale.total);
                    }else{
                        setRemain(null)
                    }

                    dispatch(setReceivedCash(el.target.value*1));
                    
                }} className="bg-green-100 rounded p-2"></input>
            </div>
            }

        {sale.paymentType==PaymentType.CASH && sale.difference > 0 &&
            <div className="flex flex-col gap-3">
                <label for="cashRemain">{firstCapitalize(t('difference'))}</label>
                <div className="bg-green-100 rounded p-2">
                <Money amount={sale.difference} />
                </div>
            </div>
            }
        </div>
    );
};

export default ClientDetails;