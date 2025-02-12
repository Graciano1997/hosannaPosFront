import { PencilIcon, PlusCircleIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import Money from "../general/Money";
import { useDispatch } from "react-redux";

const Tr =({item,index,deleteItem})=>{
    const moneyFields = ['price','total','amount'];
    const dispatch = useDispatch();
    const keys = Object.keys(item);
    
    return(
        <tr className={`${index%2==0?'bg-green-100':''}  cursor-pointer hover:sm:shadow`}>
            {keys.map((key)=>
            <td className="text-center">{ moneyFields.includes(key)? <Money amount={item[key]}/> : item[key]??'-----------'}</td>)}
            <td className="text-end"><div className="flex gap-3">
                <button
                    onClick={()=>{
                        dispatch(deleteItem(item.id))
                    }}
                ><TrashIcon className="w-6 y-6 p-1 text-red-300 hover:shadow hover:rounded"/></button>
                <button><PencilIcon className="w-6 y-6 p-1 text-green-800 hover:shadow hover:rounded"/></button>
                </div></td>
        </tr>
    )
}

export default Tr;