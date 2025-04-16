import { PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useDispatch } from "react-redux";
import { decreaseOne, increaseOne, removeItem, selectItem } from "../../slices/saleSlice";
import Money from "../general/Money";

const SaleItem = ({product,index})=>{
    const dispatch = useDispatch();
    return(
        <div className={`grid grid-cols-[10fr_10fr_10fr_10fr_10fr_25fr_10fr] place-items-center text-md ${index%2==0?'bg-green-50':'bg-green-100'} p-3 cursor-pointer`}>
                {/* <p>{product.code}</p> */}
                <p>{product.name}</p>
                <p><Money amount={product.price}/></p>
                <p>{product.discount}</p>
                <p>{product.taxes}</p>
                <div className="flex gap-4 items-center"> 
                <button
                onClick={()=>{
                    if( product.qty >1){
                        dispatch(decreaseOne(product));
                    }
                }} 
                 className={`${product.qty===1?'bg-red-100':'bg-red-300'}  w-[20px] rounded-[50%] hover:shadow`}
                 >-</button> <p>{product.qty}</p>
                 <button onClick={()=>{
                    if((product.stock - product.output) >= product.qty){
                        dispatch(increaseOne(product));
                    }
                 }}  
                 className={`${(product.stock - product.output) === product.qty ? 'bg-green-200':'bg-green-300'}  w-[20px] hover:shadow rounded-[50%]`}>+</button></div>
                <p><Money amount={product.total }/></p>
                <div className="flex justify-between items-center gap-6">
                    <PencilIcon onClick={(evt)=>{ dispatch(selectItem(product)); evt.stopPropagation();}} className="w-5 h-5 text-green-500 hover:shadow"/>
                    <XMarkIcon onClick={(evt)=>{ dispatch(removeItem(product)); evt.stopPropagation();}} className="w-7 h-7 text-red-400 hover:shadow" />
                </div>
        </div>
    );
};

export default SaleItem;