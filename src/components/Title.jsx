import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

const Title=({title})=>{
    return(
        <div className="mt-[2rem] flex justify-between items-center w-[100%] h-[100px] bg-white rounded p-4">
            <h1 className="text-3xl">{title}</h1>
            <EllipsisHorizontalIcon className="w-7 y-7 text-[#323232] rounded cursor-pointer hover:shadow-sm"/>
        </div>
    )
};

export default Title;
