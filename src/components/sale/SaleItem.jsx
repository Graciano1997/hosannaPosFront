import { PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useDispatch } from "react-redux";
import { removeItem, selectItem } from "../../slices/saleSlice";

const SaleItem = ({product,index})=>{
    const dispatch = useDispatch();

    return(
        <div className={`grid grid-cols-[5fr_25fr_15fr_20fr_25fr_10fr] place-items-center text-md ${index%2==0?'bg-green-50':'bg-green-100'} p-3 cursor-pointer`}>
                <p>{product.id}</p>
                <p>{product.name}</p>
                <p>{product.price}</p>
                <p>{product.qty}</p>
                <p>{product.total}</p>
                <div className="flex justify-between items-center gap-6">
                    <PencilIcon onClick={(evt)=>{ dispatch(selectItem(product)); evt.stopPropagation();}} className="w-5 h-5 text-green-500 hover:shadow"/>
                    <XMarkIcon onClick={(evt)=>{ dispatch(removeItem(product)); evt.stopPropagation();}} className="w-7 h-7 text-red-400 hover:shadow" />
                </div>
        </div>
    );
};

export default SaleItem;