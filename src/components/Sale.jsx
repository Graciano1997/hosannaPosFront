import { useTranslation } from "react-i18next";
import Card from "./Card";
import Title from "./Title";
import SaleHeader from "./SaleHeader";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const Sale=()=>{

    const {t}=useTranslation();
    
    const [historic,setHistoric]=useState('');
    
    let typingTimer;

        return(
        <>
        <SaleHeader title={t('sales')} />
        <div className="xs:grid xs:grid-cols-[25fr_75fr] xs:gap-4 xs:mt-4 p-1 sm:gap-4">
        <form className={`h-[500px] bg-white rounded shadow-md p-3 flex flex-col  gap-2`}>
            <h1 className="font-bold mt-5">* Client Details</h1>
            <div className="flex flex-col gap-3">
                <label for="clienteNome">Nome</label>
                <input type="text" id="clienteNome" className="bg-green-100 rounded p-2"></input>
            </div>

            <div className="flex flex-col gap-3">
                <label for="clienteContact">Tel.Numero</label>
                <input type="number" id="clienteContact" className="bg-green-100 rounded p-2"></input>
            </div>

            <div className="flex flex-col gap-3">
                <label for="clienteType">Metodo de pagamento</label>
                <select id="clienteType" className="bg-green-100 rounded p-2">
                    <option value="1">Dinheiro</option>
                    <option value="2">Tpa</option>
                    <option value="2">Transferencia</option>
                    <option value="2">Misto</option>
                </select>
            </div>

            <div className="flex flex-col gap-3">
                <label for="clienteType">Tipo de Cliente</label>
                <select id="clienteType" className="bg-green-100 rounded p-2">
                    <option value="1">Empresa</option>
                    <option value="2">Singular</option>
                </select>
            </div>
            <div className="flex flex-col gap-3">
                <label for="clienteContact">NIF</label>
                <input type="number" id="clienteContact" className="bg-green-100 rounded p-2"></input>
            </div>
            
        </form>

        <form className={`h-[500px] bg-white rounded shadow-md p-3 flex flex-col gap-3`}>
        <h1 className="font-bold mt-5 text-end">* Sales Details</h1>
       
        <div className="flex flex-col saleDetails relative h-[600px]">
            <div className="flex flex-col bg-green-100">
                <div className='bg-green-100  flex justify-between items-center rounded p-1 shadow'>
                <input type='text' className='p-2 rounded outline-none  bg-green-100 w-[100%]' onInput={(el)=>{
                    
                    clearInterval(typingTimer);
                    typingTimer = setTimeout(()=>{
                        setHistoric(el.target.value);
                        
                    },1500);

                }
                }  placeholder="Procurar produto"/>
                <MagnifyingGlassIcon className="w-5 y-5 text-[#323232] cursor-pointer"/>
                </div>
            </div>

            <div className="mt-[40px] p-3 bg-white transition-all duration-200 shadow-sm hover:shadow-md rounded">
                
                <div className="grid grid-cols-[25fr_25fr_25fr_25fr] shadow-sm">
                <p className="text-red-500">Produto</p>
                <p className="text-red-500">Preco</p>
                <p className="text-red-500">qty</p>
                <p className="text-red-500">total</p>
                </div>

                <div className="flex flex-col gap-2 h-[230px] mt-2" style={{overflow:'auto'}}>
                <div className="grid grid-cols-[25fr_25fr_25fr_25fr] bg-green-50">
                <p>Banana</p>
                <p>100kz</p>
                <p>2</p>
                <p>5000kz</p>
                </div>
                <div className="grid grid-cols-[25fr_25fr_25fr_25fr]">
                <p>Banana</p>
                <p>100kz</p>
                <p>2</p>
                <p>5000kz</p>
                </div>
                
                </div>
               
            </div>
            

            <div className="h-[30px] absolute bottom-0  w-[100%] flex gap-3 justify-end">
            <button type="button" className="bg-red-300 rounded p-1 hover:shadow">Cancelar</button>
                <button type="button" className="bg-green-200 rounded p-1 hover:shadow">Confirmar</button>
            </div>
        </div>
        </form>       
        </div>
        </>
    )
};

export default Sale;