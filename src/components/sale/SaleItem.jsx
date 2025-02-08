import { PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/16/solid";

const SaleItem = ()=>{
    return(
        <div className="grid grid-cols-[25fr_20fr_20fr_25fr_10fr] place-items-center text-md bg-green-50 p-3 cursor-pointer">
                <p>Banana Pao</p>
                <p>100kz</p>
                <p>2</p>
                <p>5000kz</p>
                <div className="flex justify-between items-center gap-6">
                    <PencilIcon className="w-5 h-5 text-green-500 hover:shadow"/>
                    <XMarkIcon className="w-7 h-7 text-red-400 hover:shadow" />
                </div>
        </div>
    );
};

export default SaleItem;