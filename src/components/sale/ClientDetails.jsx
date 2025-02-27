import { useState } from "react";
import { ClientType, DefaultClientePhone, PaymentType } from "../../lib/Enums";
import { useSelector } from "react-redux";

const ClientDetails = ()=>{
    const [clientType,setClientType]=useState(ClientType.SINGULAR);
    const sale= useSelector((state)=>state.saleState);
    const [remain,setRemain]=useState(null);
    const [received,setReceived]=useState(null);

    return(
        <div className={`h-[100%] bg-white rounded shadow-md p-3 flex flex-col  gap-2`}>
            <h1 className="font-bold mt-1 text-end">* Client Details</h1>
            <div className="flex flex-col gap-3 mt-1">
                <label for="clienteNome">Nome</label>
                <input type="text" id="clienteNome" className="bg-green-100 rounded p-2"></input>
            </div>

            <div className="flex flex-col gap-3 mt-1">
                <label for="clienteNome">Email</label>
                <input type="email" id="clienteEmail" className="bg-green-100 rounded p-2"></input>
            </div>

            <div className="flex flex-col gap-3">
                <label for="clienteContact">Tel.Numero</label>
                <input type="number" id="clienteContact" defaultValue={DefaultClientePhone} className="bg-green-100 rounded p-2"></input>
            </div>

            <div className="flex flex-col gap-3">
                <label for="clienteType">Tipo de Cliente</label>
                <select id="clienteType" className="bg-green-100 rounded p-2" onChange={(el)=>{
                    setClientType(el.target.value);
                }}>
                    <option value={ClientType.SINGULAR}>Singular</option>
                    <option value={ClientType.COMPANY}>Empresa</option>
                </select>
            </div>
            
            {clientType==ClientType.COMPANY &&
            <div className="flex flex-col gap-3">
                <label for="clienteContact">NIF</label>
                <input type="number" id="clienteContact" className="bg-green-100 rounded p-2"></input>
            </div>
            
            }
            
            {sale.paymentType==PaymentType.CASH &&
            <div className="flex flex-col gap-3">
                <label for="cashReceived">Dinheiro Recebido</label>
                <input type="number" id="cashReceived" value={received?received:''}  onChange={(el)=>{
                    setReceived(el.target.value);

                    if(el.target.value*1 > sale.total && sale.total > 0 ){
                        setRemain(el.target.value*1 - sale.total);
                    }else{
                        setRemain(null)
                    }
                }} className="bg-green-100 rounded p-2"></input>
            </div>
            }

        {sale.paymentType==PaymentType.CASH && remain>0 &&
            <div className="flex flex-col gap-3">
                <label for="cashRemain">Troco</label>
                <input type="number" id="cashRemain" value={remain} className="bg-green-100 rounded p-2" />
            </div>
            }
        </div>
    );
};

export default ClientDetails;