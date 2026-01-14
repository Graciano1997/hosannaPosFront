import { useTranslation } from "react-i18next";
import CardTitle from "../general/CardTitle";
import Money from "../general/Money";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeDropperIcon, EyeIcon } from "@heroicons/react/24/solid";

const LastSelling =({width=200,height=300,info})=>{    
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
         <div style={{height:height,width:width}} className={`grid grid-rows-[50px_auto_50px] bg-white rounded shadow-md`}>
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
                <ul className="h-[100%] flex flex-col justify-around">
                <li className="h-[40px] bg-white  grid grid-cols-3 items-center justify-center">
                    <p>{firstCapitalize(t('client'))}</p>
                    <p className="text-center">{firstCapitalize(t('qty'))}</p>
                    <p>{firstCapitalize(t('total'))}</p>
                    </li>
                    {lastSales.map((el)=>
                    <li className="h-[40px] bg-green-100 cursor-pointer text-light text-sm justify-center p-1 rounded sm:shadow grid grid-cols-3 items-center">
                    <p>{el.client.split(' ')[0]}</p>
                    <p className="text-center">{el.qty}</p>
                    <Money amount={el.total}/>
                    </li>)}
                </ul>
             </div>
            </>
            }

        </div>
    );
};

export default LastSelling;
