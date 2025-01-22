import { BackspaceIcon, ShoppingBagIcon } from "@heroicons/react/16/solid";
import { Bars4Icon } from "@heroicons/react/24/solid";
import { EllipsisHorizontalIcon, QrCodeIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";

const SaleHeader=({title})=>{
    return(
        <div className="mt-[2rem] flex justify-between items-center w-[100%] h-[100px] bg-white rounded p-4">
            
            <div className="flex gap-3">
            <label>
            <h1 className="text-3xl">Fatura</h1>
            </label>
            <select className="h-[35px] text-black p-3 rounded transition-all duration-200 bg-white shadow">
                <option value="">Venda</option>
                <option value="">Credido</option>
                <option value="">Porforma</option>
            </select>
            </div>
            
            <div className="flex gap-3 items-center">   
            <button className="flex h-[45px] text-black p-3 rounded transition-all duration-200 hover:shadow">
            <QrCodeIcon className="w-7 y-7 text-[#323232] rounded cursor-pointer hover:shadow-sm"/> Ler
            </button>           
            <button className="flex h-[45px] text-black p-3 rounded transition-all duration-200 hover:shadow">
            <div className="flex barcode">
            <Bars4Icon style={{padding:0,margin:0}} className="w-7 y-7 p-0 text-[#323232] rounded cursor-pointer  rotate"/>
            <Bars4Icon style={{padding:0,margin:0}} className="barItem w-7 y-7 p-0 text-[#323232] rounded cursor-pointer rotate"/>
            </div>
             Ler código de barra
            </button>
            </div>

            <div className="flex gap-5 items-center">
            <div className="flex flex-col" style={{position:'relative'}}>
             <p className="bg-green-200 p-1 text-black opacity-90" style={{position:'absolute',borderRadius:'50%', fontSize:'12px',top:'-15px',right:'-10px'}}>900</p>   
            <ShoppingCartIcon className="w-7 y-7 text-[#323232] rounded cursor-pointer hover:shadow-sm"/>
            </div>
            <p className="font-bold">Total: 1000$</p>
            </div>
        </div>
    )
};

export default SaleHeader;
