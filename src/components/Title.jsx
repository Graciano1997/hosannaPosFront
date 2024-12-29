import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

const Title=()=>{
    return(
        <div className="flex justify-between items-center w-[100%] h-[100px] bg-white rounded p-4">
            <h1 className="font-bold text-3xl">Estado do Stock</h1>
            <EllipsisHorizontalIcon className="w-10 y-10 text-[#323232] cursor-pointer"/>
        </div>
    )
};

export default Title;
