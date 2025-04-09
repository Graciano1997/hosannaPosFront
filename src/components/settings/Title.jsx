import {  EllipsisHorizontalIcon,ArrowUpTrayIcon,PresentationChartLineIcon, RectangleGroupIcon, TableCellsIcon, WrenchIcon, ArrowDownIcon, ArrowDownTrayIcon, ClockIcon, UserIcon, CurrencyBangladeshiIcon, CurrencyEuroIcon, CurrencyDollarIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import {  useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { activeTab } from "../../slices/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { ComputerDesktopIcon, ServerIcon } from "@heroicons/react/16/solid";
import { ArchiveBoxIcon } from "@heroicons/react/20/solid";
import { HomeIcon } from "@heroicons/react/24/solid";

const Title=({title,create})=>{
    const [showElipse,setShowElipse]=useState(true);
    const ref = useRef(null);
    const {t} = useTranslation();
    const appState= useSelector((state)=>state.appState);
    const dispatch = useDispatch();
    const {pathname}=useLocation();

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
                <h1 className="text-3xl">{firstCapitalize(title)}</h1>

                {/* {showElipse && (<EllipsisHorizontalIcon onClick={()=>{setShowElipse(!showElipse)}} className="w-7 y-7 text-[#323232] rounded cursor-pointer hover:shadow-sm"/>)}
                {!showElipse && (        
                <ul   className="flex flex-col gap-3 w-[150px] h-[35px] right-[20px] justify-center bg-white shadow rounded absolute z-2000" id="elipseMenu">
                <li className="m-0.5 flex gap-3 items-center justify-center hover:cursor-pointer"><span className="">{firstCapitalize(t('export'))}</span><ArrowUpTrayIcon className="w-4 h-4"/></li>
                </ul>
                )
            } */}
             </div>
    
            <nav className="mt-[20px]">
            <ul className="flex flex gap-5">
            <li>
                <Link to={"#"} onClick={()=>dispatch(activeTab('tab1'))} 
                className={`flex items-center gap-2 text-black transition-all duration-100 hover:rounded ${appState.activeTab=="tab1"?'activeTab':''}`} >
                <UserIcon className="w-4 y-4 text-[#323232] cursor-pointer hover:shadow"/>
                { firstCapitalize(t('acount'))}
                </Link>
            </li>
            <li>
                <Link to={""}
                onClick={()=>dispatch(activeTab('tab2'))} 
                className={`flex items-center gap-2 text-black transition-all duration-200 hover:rounded ${appState.activeTab=="tab2"?'activeTab':''} `} >
                <CurrencyDollarIcon className="w-4 y-4 text-[#323232] cursor-pointer hover:shadow"/>
                { firstCapitalize(t('currency'))}
                </Link>
            </li>

            <li>
                <Link to={"#"} onClick={()=>dispatch(activeTab('tab3'))} 
                className={`flex items-center gap-2 text-black transition-all duration-100 hover:rounded ${appState.activeTab=="tab3"?'activeTab':''}`} >
                <UserGroupIcon className="w-4 y-4 text-[#323232] cursor-pointer hover:shadow"/>
                { firstCapitalize(t('profile'))}
                </Link>
            </li>
            <li>
                <Link to={"#"} onClick={()=>dispatch(activeTab('tab4'))} 
                className={`flex items-center gap-2 text-black transition-all duration-100 hover:rounded ${appState.activeTab=="tab4"?'activeTab':''}`} >
                <HomeIcon className="w-4 y-4 text-[#323232] cursor-pointer hover:shadow"/>
                { firstCapitalize(t('company_details'))}
                </Link>
            </li>
        </ul>   
    </nav>
        </div>
            </>
    )
};

export default Title;
