import { useTranslation } from "react-i18next";
import CardTitle from "../general/CardTitle";
import Money from "../general/Money";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeDropperIcon, EyeIcon } from "@heroicons/react/24/solid";

const LastSelling = React.memo(
     ({width=200,height=300,info})=>{    
    const {t}=useTranslation();
    const {sales} = useSelector((state)=>state.saleState);
    const [lastSales,setLastSales] = useState([]);

    useEffect(()=>{
        if(sales.length>0){
            setLastSales(sales.slice(0,3));
        }
    },[sales]);

    const navegate = useNavigate();

    return(
         <div  className={`grid grid-rows-[50px_auto_50px] bg-white rounded shadow-md h-full`}>
             <CardTitle>
             {info.title}
            </CardTitle>

            {lastSales.length == 0 &&
            <div className="p-2 flex items-center justify-center">
                <h3 className="text-center text-2xl">{firstCapitalize(t('without_items'))}</h3>
            </div>
            }
            {lastSales.length > 0 &&
            <>
            <div className="p-2">
                <ul className="h-[100%] flex flex-col justify-around gap-2">
                <li key="lastsalesheader"
                 className="h-[40px] bg-white  grid grid-cols-4 items-center justify-center">
                    <p>{firstCapitalize(t('client'))}</p>
                    <p className="text-center">{firstCapitalize(t('qty'))}</p>
                    <p>{firstCapitalize(t('total'))}</p>
                    <p className="text-center">{firstCapitalize(t('date'))}</p>
                </li>
                    {lastSales.map((el)=>
                    <li
                    key={el.id}
                     className="bg-primary cursor-pointer text-light text-sm justify-center p-1 rounded sm:shadow grid grid-cols-4 h-[50px] items-center">
                    <p className="truncate">{el?.client}</p>
                    <p className="text-center">{el?.qty}</p>
                    <Money amount={el?.total}/>
                    <p className=" truncate text-center">{el?.created_at}</p>
                    </li>)}
                </ul>
             </div>
            </>
            }
        </div>
    )
}
);

export default LastSelling;
