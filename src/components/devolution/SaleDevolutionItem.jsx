import { PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useDispatch } from "react-redux";
import { decreaseOne, increaseOne, removeItem, selectItem, setItemToReturn } from "../../slices/saleSlice";
import Money from "../general/Money";
import { showToast } from "../../slices/appSlice";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const SaleDevolutionItem = ({product,index})=>{
    const dispatch = useDispatch();
    const {t}=useTranslation();
    const [qtyToReturn,setQtyToReturn] = useState(0);
    
    return(
        <div className={`grid grid-cols-7 gap-5  place-items-center text-md ${index%2==0?'bg-green-50':'bg-green-100'} p-3 cursor-pointer`}>
                <p>{product.name}</p>
                <p><Money amount={product.price}/></p>
                <p>{product.qty}</p>
                <p>{product.taxes}</p>
                <p>{product.discount}</p>
                <p><Money amount={product.subtotal}/></p>
                <div className="flex justify-between items-center gap-4">
                  <input
                  onChange={(el)=>{
                    if(el.target.value <= product.qty){
                  
                    dispatch(setItemToReturn({
                        ...product,
                        qtyToReturn:el.target.value*1,
                    }));
                    }
                  }}
                  className="bg-red-100 rounded" type="number" max={product.qty} min={0} />
                </div>
        </div>
    );
};

export default SaleDevolutionItem;