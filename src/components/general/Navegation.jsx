import React, { Children, useEffect, useRef, useState} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArchiveBoxIcon, ArrowLeftStartOnRectangleIcon, ArrowTrendingUpIcon, ArrowUpIcon, BellAlertIcon, ChartPieIcon, CircleStackIcon, ClipboardDocumentListIcon, Cog8ToothIcon, CreditCardIcon, CubeIcon, GlobeAltIcon, HomeIcon,ShoppingCartIcon, TagIcon, TruckIcon, UserGroupIcon, UsersIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { useDispatch } from "react-redux";
import { logoutUser, showToast } from "../../slices/appSlice";
import { Profiles } from "../../lib/Enums";
import { activeTab } from "../../slices/appSlice";
import { CubeTransparentIcon, ServerStackIcon, ShoppingBagIcon, Square3Stack3DIcon } from "@heroicons/react/16/solid";
import { Square2StackIcon } from "@heroicons/react/20/solid";
import { CurrentUser } from "../../lib/CurrentUser";
import { rootpath } from "../../lib/ip";

const Li = ({path,content,icon, className=''})=>{
        const {pathname}=useLocation();
return(
    <li>
                <Link to={path} 
                className={`flex gap-2 w-[100%] h-[45px] text-black p-3 transition-all duration-200 hover:rounded hover:bg-emerald-50 ${className} ${pathname == `${path}` ? "rounded bg-emerald-50" : ""}`}>
                {icon}
                {firstCapitalize(content)}
                </Link>
            </li>
)
} 


export const Ul= React.memo(({children})=>
         <ul className="flex flex-col gap-3 w-[100%]">
            {children}
        </ul>)


const Navegation = React.memo(
    ({visible,setVisibility})=>{
    const {t} = useTranslation();
    const {pathname}=useLocation();
    const dispatch = useDispatch();
    const navegate = useNavigate();
    const [master,setMaster]=useState(CurrentUser().profileId==Profiles.MASTER);
    const navegationRef = useRef(null);
    
    const handleMasterMessage = ()=>{
        if(!master){
            dispatch(showToast({error:true,message:firstCapitalize(t('withoutpermition'))}));
        }
    };

    useEffect(()=>{
        const handlerClick=(event)=>{
            if(navegationRef.current && !navegationRef.current.contains(event.target)){ 
                setVisibility(false); }
                event.stopPropagation();
        }
        
        document.addEventListener("mousedown",handlerClick)

        return()=>{
            document.removeEventListener("mousedown",handlerClick)
        }

    },[]);

    return(
        <nav ref={navegationRef} className={`flex flex-col p-3 items-center justify-between rounded  fixed h-full w-[200px] bg-white top-[0] shadow-md left-[-100%] transition-all duration-700 navegation ${visible ? 'visible':''} navegation z-10`}>
        <div className="w-[100%]">
        <Ul>

            <Li
            path={rootpath + "dashboard"}
            icon={<HomeIcon className="w-5 h-5 text-[#323232] cursor-pointer hover:shadow" />}
            content={firstCapitalize(t("dashboard"))}
            className={``}
            />


            <Li
            path={rootpath + "sale"}
            icon={<ShoppingCartIcon className="w-5 h-5 text-[#323232] cursor-pointer hover:shadow" />}
            content={firstCapitalize(t("sale"))}
            className={``}
            />

            <Li
            path={master ? rootpath + "products" : "#"}
            onClick={handleMasterMessage}
            icon={<CubeIcon className="w-5 h-5 text-[#323232] cursor-pointer hover:shadow" />}
            content={firstCapitalize(t("products"))}
            className={``}
            />

            <Li
            path={master ? rootpath + "spents" : "#"}
            onClick={handleMasterMessage}
            icon={<CreditCardIcon className="w-5 h-5 text-[#323232] cursor-pointer hover:shadow" />}
            content={firstCapitalize(t("spents"))}
            className={``}
            />

            <Li
            path={rootpath + "sales"}
            icon={<TagIcon className="w-5 h-5 text-[#323232] cursor-pointer hover:shadow" />}
            content={firstCapitalize(t("sales"))}
            className={``}
            />

            <Li
            path={master ? rootpath + "stock_movements" : "#"}
            onClick={handleMasterMessage}
            icon={<ArchiveBoxIcon className="w-5 h-5 text-[#323232] cursor-pointer hover:shadow" />}
            content={firstCapitalize(t("stock"))}
            className={``}
            />

            <Li
            path={master ? rootpath + "users" : "#"}
            onClick={handleMasterMessage}
            icon={<UserGroupIcon className="w-5 h-5 text-[#323232] cursor-pointer hover:shadow" />}
            content={firstCapitalize(t("users"))}
            className={``}
            />

            {false && (
            <Li
                path={rootpath + "mystore"}
                icon={<GlobeAltIcon className="w-5 h-5 text-[#323232] cursor-pointer hover:shadow" />}
                content={firstCapitalize(t("My store"))}
            className={``}
            />
            )}

            <Li
            path={rootpath + "setting"}
            onClick={() => {
                if (!master) {
                dispatch(activeTab("tab4"));
                }
            }}
            icon={<Cog8ToothIcon className="w-5 h-5 text-[#323232] cursor-pointer hover:shadow" />}
            content={firstCapitalize(t("settings"))}
            className={``}
            />

            <li>
            <button onClick={()=>{
                dispatch(logoutUser())
                navegate(`${rootpath}logout`);
                
            }} className="flex gap-3 w-[100%] h-[45px]  text-black p-3 transition-all duration-200 hover:rounded hover:bg-red-200 hover:tex-black" >
            <ArrowLeftStartOnRectangleIcon className="w-5 y-5  cursor-pointer hover:shadow"/>
            { firstCapitalize(t('logout'))}
            </button>
            </li>

            
          {/* <li>
                <Link to={rootpath + "sale"} className={`flex gap-3 w-[100%] h-[45px]  text-black p-3 transition-all duration-200 hover:rounded hover:bg-green-100 ${pathname=='/sale'?'rounded bg-green-100':''}`} >
                <ShoppingCartIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                {firstCapitalize(t('sale'))}
                </Link>
            </li>
            <li>
                <Link
                onClick={handleMasterMessage}
                to={master ? rootpath + "products":'#'} className={`flex gap-3 w-[100%] h-[45px]  text-black p-3 transition-all duration-200 hover:rounded hover:bg-green-100 ${pathname==rootpath + '/products'?'rounded bg-green-100':''}`} >
                <CubeIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                {firstCapitalize(t('products'))}
                </Link>
            </li> 
            <li>
                <Link
                onClick={handleMasterMessage}
                to={ master ? rootpath + "spents":"#"} className={`flex gap-3 w-[100%] h-[45px]  text-black p-3 transition-all duration-200 hover:rounded hover:bg-green-100 ${pathname==rootpath + '/spents'?'rounded bg-green-100':''}`} >
                <CreditCardIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                {firstCapitalize(t('spents'))}
                </Link>
            </li>           
                   <li>
                <Link 
                to={ rootpath + "sales"} className={`flex gap-3 w-[100%] h-[45px]  text-black p-3 transition-all duration-200 hover:rounded hover:bg-green-100 ${pathname==rootpath + '/sales'?'rounded bg-green-100':''}`} >
                <TagIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                { firstCapitalize(t('sales'))}
                </Link>
            </li>
                       <li>
                <Link 
                onClick={handleMasterMessage}
                to={ master ? rootpath + "stock_movements":'#'} 
                className={`flex gap-2 w-[100%] h-[45px] text-black p-3 transition-all duration-200 hover:rounded hover:bg-green-100 ${pathname==rootpath + '/stock_movements'?'rounded bg-green-100':''}`} >
                <ArchiveBoxIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                {firstCapitalize(t('stock'))}
                </Link>
            </li>      
            <li>
                <Link
                onClick={handleMasterMessage}
                to={  master ? rootpath + "users":"#"} className={`flex gap-3 w-[100%] h-[45px]  text-black p-3 transition-all duration-200 hover:rounded hover:bg-green-100 ${pathname==rootpath + '/users'?'rounded bg-green-100':''}`} >
                <UserGroupIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                { firstCapitalize(t('users'))}
                </Link>
            </li>
           {false &&
            <li>
                <Link 
                to={rootpath + "mystore"} className={`flex gap-3 w-[100%] h-[45px]  text-black p-3 transition-all duration-200 hover:rounded hover:bg-green-100 ${pathname==rootpath + '/mystore'?'rounded bg-green-100':''}`} >
                <GlobeAltIcon className="w-5 h-5 text-[#323232] cursor-pointer hover:shadow"/>
                { firstCapitalize(t('My store'))}
                </Link>
            </li>
            } 
            <li>
                <Link 
                onClick={()=>{
                    if(!master){
                        dispatch(activeTab('tab4'))
                    }
                }}
                to={rootpath + "setting"} className={`flex gap-3 w-[100%] h-[45px]  text-black p-3 transition-all duration-200 hover:rounded hover:bg-green-100 ${pathname==rootpath + '/setting'?'rounded bg-green-100':''}`} >
                <Cog8ToothIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                { firstCapitalize(t('settings'))}
                </Link>
            </li>
            <li>
                <button onClick={()=>{
                    dispatch(logoutUser())
                    navegate(`${rootpath}logout`);
                    
                }} className="flex gap-3 w-[100%] h-[45px]  text-black p-3 transition-all duration-200 hover:rounded hover:bg-red-300 hover:text-white" >
                <ArrowLeftStartOnRectangleIcon className="w-5 y-5  cursor-pointer hover:shadow"/>
                { firstCapitalize(t('logout'))}
                </button>
            </li> */}
    </Ul>
        </div>
        
        {/* <CurrentUser size={{w:40,y:40}}/> */}
        <div><span className="text-[17px] text-light text-red-400">{firstCapitalize(t('slogan'))}</span></div>
        </nav>
    )});

export default Navegation;
