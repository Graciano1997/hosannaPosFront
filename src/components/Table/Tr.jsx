import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const Tr =({item,index})=>{
    const keys = Object.keys(item);
    return(
        <tr className={`${index%2==0?'bg-green-100':''}  cursor-pointer hover:sm:shadow`}>
            {keys.map((key)=><td className="text-center">{item[key]}</td>)}
            <td className="text-end"><div className="flex gap-3">
                <button><TrashIcon className="w-6 y-6 p-1 text-red-300 hover:shadow hover:rounded"/></button>
                <button><PencilIcon className="w-6 y-6 p-1 text-blue hover:shadow hover:rounded"/></button>
                </div></td>
        </tr>
    )
}

export default Tr;