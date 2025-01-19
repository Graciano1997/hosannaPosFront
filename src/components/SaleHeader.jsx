import { BackspaceIcon, ShoppingBagIcon } from "@heroicons/react/16/solid";
import { EllipsisHorizontalIcon, QrCodeIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";

const SaleHeader=({title})=>{
    return(
        <div className="mt-[2rem] flex justify-between items-center w-[100%] h-[100px] bg-white rounded p-4">
            <h1 className="text-3xl">{title}</h1>
            <div className="flex items-center">   
            <QrCodeIcon className="w-7 y-7 text-[#323232] rounded cursor-pointer hover:shadow-sm"/> Ler
            </div>
            <div className="flex gap-5 items-center">
            <div className="flex flex-col" style={{position:'relative'}}>
             <p className="bg-green-200 p-1 text-black" style={{position:'absolute',borderRadius:'50%', fontSize:'12px',top:'-15px',right:'-10px'}}>2</p>   
            <ShoppingCartIcon className="w-7 y-7 text-[#323232] rounded cursor-pointer hover:shadow-sm"/>
            </div>
            <p className="font-bold">Total: 1000$</p>
            </div>
        </div>
    )
};

export default SaleHeader;
