import {  EllipsisHorizontalIcon, HomeIcon, PlusCircleIcon,ArrowUpTrayIcon, PlusIcon } from "@heroicons/react/24/solid";
import {  useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { activeTab } from "../../slices/appSlice";
import { useDispatch, useSelector } from "react-redux";

const Title=({title,setIsShowing=()=>{}})=>{
    const [showElipse,setShowElipse]=useState(true);
    const ref = useRef(null);
    const {t} = useTranslation();
    const appState= useSelector((state)=>state.appState);
    const dispatch = useDispatch();
    
    return(
        <>
        <div
            className="flex flex-col w-[100%] h-[120px] bg-white rounded p-4" 
            onClick={(el)=>{
                if(ref.current.contains(el.target) && !showElipse ){
                    setShowElipse(!showElipse);
                }
            }}
            ref={ref}>
             <div className="flex justify-between mt-4">
                <h1 className="text-3xl">{title}</h1>

                {showElipse && (<EllipsisHorizontalIcon onClick={()=>{setShowElipse(!showElipse)}} className="w-7 y-7 text-[#323232] rounded cursor-pointer hover:shadow-sm"/>)}
                {!showElipse && (        
                <ul   className="flex flex-col gap-3 w-[150px] h-[75px] right-[20px] bg-white shadow rounded absolute z-2000" id="elipseMenu">
                <li onClick={()=>{setIsShowing(true);}} className="m-0.5 flex gap-3 items-center justify-center hover:sm:shadow transition-200 hover:cursor-pointer">
                <span className="">Criar</span><PlusIcon className="w-4 h-4"/></li>
                <li className="m-0.5 flex gap-3 items-center justify-center hover:sm:shadow hover:cursor-pointer"><span className="">Exportar</span><ArrowUpTrayIcon className="w-4 h-4"/></li>
                </ul>)
            }
             </div>
    
            <nav className="mt-[20px]">
            <ul className="flex flex gap-5">
            <li>
                <Link to={"#"} onClick={()=>dispatch(activeTab('tab1'))} 
                className={`flex items-center gap-2 text-black transition-all duration-100 hover:rounded ${appState.activeTab=="tab1"?'activeTab':''}`} >
                <HomeIcon className="w-4 y-4 text-[#323232] cursor-pointer hover:shadow"/>
                {t('main_table')}
                </Link>
            </li>
            <li>
                <Link to={""}
                onClick={()=>dispatch(activeTab('tab2'))} 
                className={`flex items-center gap-2 text-black transition-all duration-200 hover:rounded ${appState.activeTab=="tab2"?'activeTab':''} `} >
                {t('dashboard')}
                </Link>
            </li>
        </ul>   
    </nav>
        </div>
            </>
    )
};

export default Title;
