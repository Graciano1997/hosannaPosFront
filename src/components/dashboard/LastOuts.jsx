import { useTranslation } from "react-i18next";
import CardTitle from "../general/CardTitle";
import Money from "../general/Money";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLastSpents } from "../../slices/spentSlice";
import { firstCapitalize } from "../../lib/firstCapitalize";

const LastOuts =({width=200,height=300,info})=>{    
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchLastSpents());
    },[]);

    const {t}=useTranslation();
    
    const lastSpents= useSelector((state)=>state.spentState.lastSpents) || []; 

    return(
         <div style={{height:height,width:width}} className={`grid grid-rows-[50px_auto] bg-white rounded shadow-md`}>
             <CardTitle>
            <h2 className="text-center">{firstCapitalize(info.title)}</h2>
            </CardTitle>
             <div className="p-2">
                <ul className={`h-[100%] flex flex-col gap-5 p-1 ${lastSpents.length==0?'items-center justify-center':''}`}>
                {lastSpents.length==0 && <li>
                     <p className="text-center text-red-500 text-2xl p-2"> {t('no-spents')}</p>
                </li>
                }
                    {lastSpents.length > 0 &&
                    <>
                     <li className="h-[40px] bg-white  flex justify-between">
                        <p>{ firstCapitalize(t('destinatary'))}</p>
                        <p>{firstCapitalize(t('amount'))}</p>
                     </li>
                    </>
                    && lastSpents.map((el)=>
                    <li className="h-[40px] cursor-pointer bg-green-200 flex justify-between p-1 rounded sm:shadow items-center">
                    <p>{el.user}</p>
                    <Money amount={el.amount}/>
                    </li>)
                    }
                </ul>
             </div>
        </div>
    );
};

export default LastOuts;
