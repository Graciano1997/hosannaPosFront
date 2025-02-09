import { BackspaceIcon, ShoppingBagIcon } from "@heroicons/react/16/solid";
import { Bars4Icon } from "@heroicons/react/24/solid";
import { EllipsisHorizontalIcon, QrCodeIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { PaymentType, SaleType } from "../../lib/Enums";
import { setPaymentType } from "../../slices/saleSlice";

const SaleHeader=({title,setIsReadingQr,setReadValue})=>{
    const sale = useSelector((state)=>state.saleState);
    const dispatch = useDispatch();
    return(
        <div className="mt-[3rem] flex justify-between items-center w-[100%] h-[100px] bg-white rounded p-4">  
            <div className="flex gap-3 items-center">
            <label className="text-xl">
            Fatura
            </label>
            <select className="cursor-pointer h-[35px] text-black p-3 rounded transition-all duration-200 bg-white shadow">
                <option value={SaleType.SALE}>Venda</option>
                <option value={SaleType.CREDIT}>Credido</option>
                <option value={SaleType.PORFORM}>Porforma</option>
            </select>
            </div>
           
           <div className="flex gap-4">

            <div className="flex gap-3 items-center">
                <label for="clienteType" className="text-xl">Pagamento</label>
                <select id="clienteType" onChange={(el)=>{
                    dispatch(setPaymentType(el.target.value));
                }}
                 className="cursor-pointer h-[35px] text-black p-3 rounded transition-all duration-200 bg-white shadow">
                    <option value={PaymentType.CASH}>Dinheiro</option>
                    <option value={PaymentType.TPA}>Tpa</option>
                    <option value={PaymentType.TRANSFER}>Transferencia</option>
                </select>
            </div>
           
            <div className="flex gap-3 items-center">   
            {/* {false &&
            <button onClick={()=>{
                setReadValue(null);
                setIsReadingQr(true);}} 
            className="flex h-[45px] text-black p-3 rounded transition-all duration-200 hover:shadow">
            <QrCodeIcon className="w-7 y-7 text-[#323232] rounded cursor-pointer hover:shadow-sm"/> Ler Qr
            </button>  
            }          */}
            {/* <button className="flex gap-[5px] h-[35px] items-center text-black p-1 text-xl rounded transition-all duration-200 hover:shadow">
            Ler barras
            <Bars4Icon style={{padding:0,margin:0}} className="w-7 y-7 p-0 text-[#323232] rounded cursor-pointer  rotate"/>
            <Bars4Icon style={{padding:0,margin:0}} className="barItem w-7 y-7 p-0 text-[#323232] rounded cursor-pointer rotate"/>
    
            </button> */}
            </div>
            </div>

            <div className="flex gap-5 items-center">
            <p className="font-bold">Total: {sale.total}</p>
            <div className="flex flex-col" style={{position:'relative'}}>
             <p className="bg-green-200 p-1 text-black opacity-90" style={{position:'absolute',borderRadius:'50%', fontSize:'12px',top:'-22px',right:'-10px'}}>{sale.totalItems}</p>   
            <ShoppingCartIcon className="w-7 y-7 text-[#323232] rounded cursor-pointer hover:shadow-sm"/>
            </div>
            </div>
        </div>
    )
};

export default SaleHeader;
