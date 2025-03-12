import { useTranslation } from "react-i18next";
import CardTitle from "../general/CardTitle";
import { BellAlertIcon } from "@heroicons/react/24/solid";
import Money from "../general/Money";
import { firstCapitalize } from "../../lib/firstCapitalize";

const LastExpired =({width=200,height=300,info,data})=>{    

    const {t}=useTranslation();
    
    return(
         <div style={{height:height,width:width}} className={`grid grid-rows-[50px_auto] bg-white rounded shadow-md`}>
             <CardTitle>
                <p className="text-center">{firstCapitalize(info)}</p>
             </CardTitle>
             
             <div className="p-2">
                <ul className={`h-[100%] flex flex-col gap-5 p-1 ${data.length==0?'items-center justify-center':''}`}>
                
                    {data.length==0 && <li> <p className="text-center text-red-500 text-2xl p-2"> {firstCapitalize(t('no-expireds'))}</p></li>}
                    
                    {
                    data.length >0 &&
                    <li className="h-[40px] bg-white  grid grid-cols-4 items-center justify-center">
                    <p>{firstCapitalize(t('name'))}</p>
                    <p>{firstCapitalize(t('qty'))}</p>
                    <p>{firstCapitalize(t('exp_date'))}</p>
                    <p>{firstCapitalize(t('total'))}</p>
                    </li> &&
                    data.slice(0,3).map((el)=>
                    <li className=" bg-red-100 cursor-pointer justify-center p-1 rounded sm:shadow grid grid-cols-4 items-center">
                    <p>{el.name}</p>
                    <p>{el.qty}</p>
                    <p>{el.data.expire}</p>
                    <Money amount={el.total} />
                    </li>)}
                </ul>
             </div>
        </div>
    );
};

export default LastExpired;
