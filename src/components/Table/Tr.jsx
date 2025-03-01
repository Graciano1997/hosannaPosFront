import { PencilIcon, PlusCircleIcon, PlusIcon, TrashIcon, UserIcon } from "@heroicons/react/24/solid";
import Money from "../general/Money";
import { useDispatch, useSelector } from "react-redux";
import { stateDisplay, textDisplay } from "../../lib/activeDisplay";
import { cleanItemDetails, itemDetails, openModal } from "../../slices/appSlice";
import Details from "./Details";

const Tr = ({ item, index, deleteItem, updateItem, filterRows, filterDetails }) => {
    
    const moneyFields = ['price', 'total', 'amount', 'cost_price','difference','received_cash'];
    const dispatch = useDispatch();

    let keys = Object.keys(item);
    keys = keys.filter((item) => !filterRows.includes(item))
    const itemDetail = useSelector((state)=>state.appState.itemDetails);
    return (
        <>
            <tr 
            className={`${index % 2 == 0 ? 'bg-green-100' : ''}  cursor-pointer hover:sm:shadow font-light`}>
                {keys.map((key) =>
                    <td onClick={()=>{ dispatch(itemDetails(item))}} className="p-1 text-center">
                        {moneyFields.includes(key) &&  <Money amount={item[key]} />}
                        {typeof (item[key]) == "boolean" && stateDisplay(item[key]) }
                        {key=="image" && item[key]!="none" && <div className="flex justify-center"><img src={item[key]} className="w-[40px] h-[40px] rounded-[20px] duration-200 transition-all hover:shadow" /></div>}
                        {key!=="image" && !moneyFields.includes(key) && typeof(item[key]) != "boolean" &&  textDisplay(item[key])}
                    </td>
                    )
                }
                <td className="text-end">
                    <div className="flex gap-3">
                        <button onClick={() => { dispatch(deleteItem(item.id)) }}><TrashIcon className="w-6 y-6 p-1 text-red-300 hover:shadow hover:rounded" /></button>
                        <button onClick={() => { dispatch(openModal()); dispatch(updateItem(item)); }}><PencilIcon className="w-6 y-6 p-1 text-green-800 hover:shadow hover:rounded" /></button>
                    </div>
                </td>
            </tr>
           { itemDetail.id!= undefined && <Details filterDetails={filterDetails} cleanItemDetails ={cleanItemDetails}  /> } 
        </>
    )
}

export default Tr;