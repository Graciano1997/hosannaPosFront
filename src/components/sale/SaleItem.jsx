import { PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useDispatch } from "react-redux";
import { decreaseOne, increaseOne, removeItem, selectItem } from "../../slices/saleSlice";
import Money from "../general/Money";
import { showToast } from "../../slices/appSlice";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { useTranslation } from "react-i18next";

const SaleItem = ({product,index})=>{
    const dispatch = useDispatch();
    const {t}=useTranslation();

    return(
        <div className={`grid grid-cols-[20fr_20fr_20fr_20fr_20fr] md:grid-cols-[10fr_10fr_10fr_10fr_10fr_25fr_10fr] place-items-center text-md ${index%2==0?'bg-green-50':'bg-green-100'} p-3 cursor-pointer`}>
                <p>{product.name}</p>
                <p><Money amount={product.price}/></p>
                <p className="hidden md:block">{product.discount}</p>
                <p className="hidden md:block">{product.taxes}</p>
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
                    if((product.stock) >= product.qty){
                        dispatch(increaseOne(product));
                    }
                 }}  
                 className={`${(product.stock) === product.qty ? 'bg-green-100':'bg-green-300'}  w-[20px] hover:shadow rounded-[50%]`}>+</button></div>
                <p><Money amount={product.total }/></p>
                <div className="flex justify-between items-center gap-4">
                    <PencilIcon onClick={(evt)=>{ dispatch(selectItem(product)); evt.stopPropagation();}} className="w-5 h-5 text-green-500 hover:shadow"/>
                    <XMarkIcon onClick={(evt)=>{ 
                       if(dispatch(removeItem(product))){
                           dispatch(showToast({success:true,message:`${firstCapitalize(t('removed'))} ${product.name}`}));
                       }
                        evt.stopPropagation();}} className="w-7 h-7 text-red-400 hover:shadow" />
                </div>
        </div>
    );
};

export default SaleItem;