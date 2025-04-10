import { useEffect, useRef} from "react";
import image from "../../assets/Img/gra.jpeg";
import CurrentUser from "./CurrentUser";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftStartOnRectangleIcon, ArrowTrendingUpIcon, ArrowUpIcon, BellAlertIcon, ChartPieIcon, CircleStackIcon, ClipboardDocumentListIcon, Cog8ToothIcon, CubeIcon, HomeIcon,ShoppingCartIcon, TruckIcon, UserGroupIcon, UsersIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../slices/appSlice";

const Navegation =({visible,setVisibility})=>{
    const {t} = useTranslation();
    const {pathname}=useLocation();
    const dispatch = useDispatch();
    const navegate = useNavigate();

    const navegationRef = useRef(null);
    const adm=true;

    useEffect(()=>{

        const handlerClick=(event)=>{
            if(!((navegationRef.current).contains(event.target))){ 
                setVisibility(false); }
        }
        
        window.addEventListener("click",handlerClick)

        return()=>{
            window.removeEventListener("click",handlerClick)
        }

    },[]);

    return(
        <nav ref={navegationRef} className={`flex flex-col p-3 items-center justify-between rounded  fixed h-[100%]  md:w-[30%] lg:w-[18%] bg-white top-[0] shadow-md left-[-50%] transition-all duration-700 navegation ${visible ? 'visible':''} navegation z-10`}>
        <div className="w-[100%]">
        <ul className="flex flex-col gap-3 w-[100%]">
            <li>
                <Link to={"/dashboard"} 
                className={`flex gap-2 w-[100%] h-[45px] text-black p-3 transition-all duration-200 hover:rounded hover:bg-green-100 ${pathname=='/dashboard'?'rounded bg-green-100':''}`} >
                <HomeIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                {firstCapitalize(t('dashboard'))}
                </Link>
            </li>
            <li>
                <Link to={"/sale"} className={`flex gap-3 w-[100%] h-[45px]  text-black p-3 transition-all duration-200 hover:rounded hover:bg-green-100 ${pathname=='/sale'?'rounded bg-green-100':''}`} >
                <ShoppingCartIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                {firstCapitalize(t('sale'))}
                </Link>
            </li>
            <li>
                <Link to={"/products"} className={`flex gap-3 w-[100%] h-[45px]  text-black p-3 transition-all duration-200 hover:rounded hover:bg-green-100 ${pathname=='/products'?'rounded bg-green-100':''}`} >
                <CubeIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                {firstCapitalize(t('products'))}
                </Link>
            </li>           
            <li>
                <Link to={"/spents"} className={`flex gap-3 w-[100%] h-[45px]  text-black p-3 transition-all duration-200 hover:rounded hover:bg-green-100 ${pathname=='/spends'?'rounded bg-green-100':''}`} >
                <ArrowTrendingUpIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                {firstCapitalize(t('spents'))}
                </Link>
            </li>           
                   <li>
                <Link to={"/sales"} className={`flex gap-3 w-[100%] h-[45px]  text-black p-3 transition-all duration-200 hover:rounded hover:bg-green-100 ${pathname=='/sales'?'rounded bg-green-100':''}`} >
                <CircleStackIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                { firstCapitalize(t('sales'))}
                </Link>
            </li>      
                  {/* <li>
                <Link to={"/notifications"} className={`flex gap-3 w-[100%] h-[45px]  text-black p-3 transition-all duration-200 hover:rounded hover:bg-green-100 ${pathname=='/notifications'?'rounded bg-green-100':''}`} >
                <BellAlertIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                {t('notifications')}
                </Link>
            </li> */}
            <li>
                <Link to={"/users"} className={`flex gap-3 w-[100%] h-[45px]  text-black p-3 transition-all duration-200 hover:rounded hover:bg-green-100 ${pathname=='/requests'?'rounded bg-green-100':''}`} >
                <UserGroupIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                { firstCapitalize(t('users'))}
                </Link>
            </li>
            <li>
                <Link to={"/setting"} className={`flex gap-3 w-[100%] h-[45px]  text-black p-3 transition-all duration-200 hover:rounded hover:bg-green-100 ${pathname=='/setting'?'rounded bg-green-100':''}`} >
                <Cog8ToothIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                { firstCapitalize(t('settings'))}
                </Link>
            </li>
            <li>
                <button onClick={()=>{
                    dispatch(logoutUser())
                    navegate('/logout');
                    
                }} className="flex gap-3 w-[100%] h-[45px]  text-black p-3 transition-all duration-200 hover:rounded hover:bg-red-300" >
                <ArrowLeftStartOnRectangleIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                { firstCapitalize(t('logout'))}
                </button>
            </li>
        </ul>  
        </div>
        
        <CurrentUser/>
        <div><span className="text-[15px]">{t('slogan')}</span></div>
        </nav>
    )
};

export default Navegation;
