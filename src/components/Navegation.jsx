import { useEffect, useRef} from "react";
import image from "../Img/gra.jpeg";
import CurrentUser from "./CurrentUser";
import { Link } from "react-router-dom";
import { ArrowLeftStartOnRectangleIcon, BellAlertIcon, ChartPieIcon, CircleStackIcon, ClipboardDocumentListIcon, Cog8ToothIcon, HomeIcon,ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";

const Navegation =({visible,setVisibility})=>{
    const {t} = useTranslation();

    const navegationRef = useRef(null);

    useEffect(()=>{

        const handlerClick=(event)=>{
            if(!((event.target).contains(navegationRef.current))){
                setVisibility(false);
            }
        }
        
        window.addEventListener("click",handlerClick)

        return()=>{
            window.removeEventListener("click",handlerClick)
        }

    },[]);

    return(
        <nav ref={navegationRef} className={`flex flex-col p-5 items-center justify-between rounded opacity-95 fixed h-[100%] w-[50%] lg:w-[18%] bg-white top-[0] shadow-md left-[-50%] transition-all duration-700 navegation ${visible ? 'visible':''}`}>
        <div>
        <ul className="flex flex-col gap-2">
            <li>
                <Link to={"/dashboard"} className="flex gap-3 w-[230px] h-[45px]  text-black p-3 transition-all duration-200 hover:rounded hover:bg-green-100" >
                <HomeIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                {t('dashboard')}
                </Link>
            </li>
            <li>
                <Link to={"/dashboard"} className="flex gap-3 w-[230px] h-[45px]  text-black p-3 transition-all duration-200 hover:rounded hover:bg-green-100" >
                <ShoppingCartIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                {t('sales')}
                </Link>
            </li>
            <li>
                <Link to={"/dashboard"} className="flex gap-3 w-[230px] h-[45px]  text-black p-3 transition-all duration-200 hover:rounded hover:bg-green-100" >
                <ClipboardDocumentListIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                {t('requests')}
                </Link>
            </li>
            <li>
                <Link to={"/dashboard"} className="flex gap-3 w-[230px] h-[45px]  text-black p-3 transition-all duration-200 hover:rounded hover:bg-green-100" >
                <CircleStackIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                {t('stock')}
                </Link>
            </li>           
                   <li>
                <Link to={"/dashboard"} className="flex gap-3 w-[230px] h-[45px]  text-black p-3 transition-all duration-200 hover:rounded hover:bg-green-100" >
                <ChartPieIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                {t('reports')}
                </Link>
            </li>      
                  <li>
                <Link to={"/dashboard"} className="flex gap-3 w-[230px] h-[45px]  text-black p-3 transition-all duration-200 hover:rounded hover:bg-green-100" >
                <BellAlertIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                {t('notifications')}
                </Link>
            </li>
            <li>
                <Link to={"/dashboard"} className="flex gap-3 w-[230px] h-[45px]  text-black p-3 transition-all duration-200 hover:rounded hover:bg-green-100" >
                <Cog8ToothIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                {t('settings')}
                </Link>
            </li>
            <li>
                <Link to={"/dashboard"} className="flex gap-3 w-[230px] h-[45px]  text-black p-3 transition-all duration-200 hover:rounded hover:bg-green-100" >
                <ArrowLeftStartOnRectangleIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                {t('logout')}
                </Link>
            </li>
        </ul>  
        </div>
        
        <CurrentUser username="Graciano Henrique" image={image} />
        </nav>
    )
};

export default Navegation;
