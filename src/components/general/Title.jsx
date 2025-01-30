import { ArrowUpTrayIcon, DocumentArrowUpIcon, EllipsisHorizontalIcon, PlusCircleIcon, PlusIcon } from "@heroicons/react/24/solid";
import {  useRef, useState } from "react";

const Title=({title,setIscreating=()=>{}})=>{
    const [showElipse,setShowElipse]=useState(true);
    const ref = useRef(null);
    
    return(
        <>
        <div 
            onClick={(el)=>{
                if(ref.current.contains(el.target) && !showElipse ){
                    setShowElipse(!showElipse);
                }
            }}
            ref={ref} 
            className="mt-[2rem] flex justify-between items-center w-[100%] h-[100px] bg-white rounded p-4">
            <h1 className="text-3xl">{title}</h1>
            
            {showElipse && (<EllipsisHorizontalIcon onClick={()=>{setShowElipse(!showElipse)}} className="w-7 y-7 text-[#323232] rounded cursor-pointer hover:shadow-sm"/>)}
            {!showElipse && (        
                <ul 

                 className="flex flex-col gap-1 w-[150px] h-[100%] bg-white shadow rounded" id="elipseMenu">
                <li onClick={()=>{setIscreating(true);}} className="m-0.5 flex gap-3 items-center justify-center hover:sm:shadow transition-200 hover:cursor-pointer"><span className="">Criar</span><PlusIcon className="w-4 h-4"/></li>
                <li className="m-0.5 flex gap-3 items-center justify-center hover:sm:shadow hover:cursor-pointer"><span className="">Exportar</span><ArrowUpTrayIcon className="w-4 h-4"/></li>
                </ul>)
            }
        </div>
            </>
    )
};

export default Title;
