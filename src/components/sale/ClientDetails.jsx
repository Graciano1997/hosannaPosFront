import { useState } from "react";
import { ClientType, DefaultClientePhone, PaymentType } from "../../lib/Enums";
import { useDispatch, useSelector } from "react-redux";
import Money from "../general/Money";
import { useTranslation } from "react-i18next";
import { setClientDetails, setReceivedCash } from "../../slices/saleSlice";

const ClientDetails = ()=>{
    const [clientType,setClientType]=useState(ClientType.SINGULAR);
    const sale= useSelector((state)=>state.saleState);
    const [remain,setRemain]=useState(null);
    const [received,setReceived]=useState(null);
    const dispatch = useDispatch();
    
    const formHandler = (el)=>{
          dispatch(setClientDetails({[el.target.name]:el.target.value}))
       }

       const {t}= useTranslation();

    return(
        <div className={`h-[100%] bg-white rounded shadow-md p-3 flex flex-col  gap-2`}>
            <h1 className="font-bold mt-1 text-end">* Client Details</h1>
            <div className="flex flex-col gap-3 mt-1">
                <label for="clienteNome">{t('name')}</label>
                <input type="text" name="name" onChange={formHandler} className="bg-green-100 rounded p-2"></input>
            </div>

            <div className="flex flex-col gap-3 mt-1">
                <label for="clienteEmail">{t('email')}</label>
                <input type="email" onChange={formHandler} name="email" id="clienteEmail" className="bg-green-100 rounded p-2"></input>
            </div>

            <div className="flex flex-col gap-3">
                <label for="clienteContact">Tel.Numero</label>
                <input type="number" name="phone" onChange={formHandler} id="clienteContact" defaultValue={DefaultClientePhone} className="bg-green-100 rounded p-2"></input>
            </div>

            <div className="flex flex-col gap-3">
                <label for="clienteType">Tipo de Cliente</label>
                <select id="clienteType" defaultValue={ClientType.SINGULAR} name="client_type" className="bg-green-100 rounded p-2" onChange={(el)=>{
                    formHandler(el);
                    setClientType(el.target.value);
                }}>
                    <option value={ClientType.SINGULAR}>Singular</option>
                    <option value={ClientType.COMPANY}>Empresa</option>
                </select>
            </div>
            
            {clientType==ClientType.COMPANY &&
            <div className="flex flex-col gap-3">
                <label for="clienteContact">NIF</label>
                <input type="number" name="nif" onChange={formHandler} id="clienteContact" className="bg-green-100 rounded p-2"></input>
            </div>
            
            }
            
            {sale.paymentType==PaymentType.CASH &&
            <div className="flex flex-col gap-3">
                <label for="cashReceived">Dinheiro Recebido</label>
                <input type="number" id="cashReceived" name="received_cash"  value={received?received:''}  onChange={(el)=>{
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
                <label for="cashRemain">Troco</label>
                <div className="bg-green-100 rounded p-2">
                <Money amount={sale.difference} />
                </div>
            </div>
            }
        </div>
    );
};

export default ClientDetails;