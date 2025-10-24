import {  EllipsisHorizontalIcon,ArrowUpTrayIcon,PresentationChartLineIcon, RectangleGroupIcon, TableCellsIcon, WrenchIcon, ArrowDownIcon, ArrowDownTrayIcon, ClockIcon, BellAlertIcon } from "@heroicons/react/24/solid";
import {  useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { activeTab, Exporting } from "../../slices/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { firstCapitalize } from "../../lib/firstCapitalize";

const Title=({title,create,collectionToExport})=>{
    const [showElipse,setShowElipse]=useState(true);
    const ref = useRef(null);
    const {t} = useTranslation();
    const appState= useSelector((state)=>state.appState);
    const dispatch = useDispatch();
    const {pathname}=useLocation();
    const productState = useSelector((state)=>state.productState);

    return(
        <>
        <div
            className="flex flex-col w-full h-[120px] bg-white rounded-t p-4 overflow-x-hidden overflow-y-hidden" 
            onClick={(el)=>{
                if(ref.current.contains(el.target) && !showElipse ){
                    setShowElipse(!showElipse);
                }
            }}
            ref={ref}>
             <div className="flex justify-between mt-4">
                <h1 className="text-3xl">{firstCapitalize(title)}</h1>
                {
                (['/products'].includes(pathname) && ['tab1','tab3','tab4','tab5'].includes(appState.activeTab) || 
                ['/sales','/users','/spents','/stock_movements'].includes(pathname) && ['tab1'].includes(appState.activeTab))
                &&
                <>
                {showElipse && (<EllipsisHorizontalIcon onClick={()=>{setShowElipse(!showElipse)}} className="w-7 y-7 text-[#323232] rounded cursor-pointer hover:shadow-sm"/>)}
                {!showElipse && 
                (        
                <ul   className="flex flex-col gap-3 w-[150px] h-[35px] right-[20px] justify-center bg-white shadow rounded absolute z-2000" id="elipseMenu">
                <li onClick={()=>{
                    dispatch(Exporting(collectionToExport)); 
                }} className="m-0.5 flex gap-3 items-center justify-center hover:cursor-pointer"><span className="">{firstCapitalize(t('export'))}</span><ArrowUpTrayIcon className="w-4 h-4"/>
                </li>
                </ul>
                )
                }
                </>
                }
             </div>
    
            <nav className="mt-[20px]">
            <ul className="flex flex gap-5">
            <li>
                <Link to={"#"} onClick={()=>dispatch(activeTab('tab1'))} 
                className={`flex items-center gap-2 text-black transition-all duration-100 hover:rounded ${appState.activeTab=="tab1"?'activeTab':''}`} >
                <TableCellsIcon className="w-4 y-4 text-[#323232] cursor-pointer hover:shadow"/>
                { firstCapitalize(t('main_table'))}
                </Link>
            </li>
            <li>
                <Link to={""}
                onClick={()=>dispatch(activeTab('tab2'))} 
                className={`flex items-center gap-2 text-black transition-all duration-200 hover:rounded ${appState.activeTab=="tab2"?'activeTab':''} `} >
                <PresentationChartLineIcon className="w-4 y-4 text-[#323232] cursor-pointer hover:shadow"/>
                { firstCapitalize(t('dashboard'))}
                </Link>
            </li>
            {
                pathname == '/products'
                 &&
                <>
                <li>
                <Link to={""}
                onClick={()=>dispatch(activeTab('tab3'))} 
                className={`flex items-center gap-2 text-black transition-all duration-200 hover:rounded ${appState.activeTab=="tab3"?'activeTab':''} `} >
                <RectangleGroupIcon className="w-4 y-4 text-[#323232] cursor-pointer hover:shadow"/>
                {firstCapitalize(t('product_categories'))}
                </Link>
            </li>

                       <li>
                <Link to={""}
                onClick={()=>dispatch(activeTab('tab4'))} 
                className={`flex items-center gap-2 transition-all duration-300 text-yellow-700 hover:rounded ${appState.activeTab=="tab4"?'activeTab':''} `} >
                {
                    productState.alertProducts &&
                <BellAlertIcon className={`w-4 y-4 cursor-pointer hover:shadow ${productState.alertProducts.length > 0 ? 'alert':'' } `}/>
                }
                {firstCapitalize(t('alert'))}
                </Link>
            </li>

            <li>
                <Link to={""}
                onClick={()=>dispatch(activeTab('tab5'))} 
                className={`flex items-center gap-2 transition-all duration-300 text-red-700 hover:rounded ${appState.activeTab=="tab5"?'activeTab':''} `} >
                <ClockIcon className="w-4 y-4 cursor-pointer hover:shadow"/>
                {firstCapitalize(t('expired_product'))}
                </Link>
            </li>

            <li>
                <Link to={""}
                onClick={()=>dispatch(activeTab('tab6'))} 
                className={`flex items-center gap-2 text-black transition-all duration-200 hover:rounded ${appState.activeTab=="tab6"?'activeTab':''} `} >
                <WrenchIcon className="w-4 y-4 text-[#323232] cursor-pointer hover:shadow"/>
                { firstCapitalize(t('configuration'))}
                </Link>
            </li>
                </>
            }
            
        </ul>   
    </nav>
        </div>
            </>
    )
};

export default Title;
