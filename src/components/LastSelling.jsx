import { useTranslation } from "react-i18next";
import CardTitle from "./CardTitle";

const LastSelling =({width=200,height=300,info})=>{    

    const {t}=useTranslation();
    
    const lastSellings= [{name:"Amoxi",qty:5,total:1000},{name:"Amoxi",qty:5,total:1000},{name:"Amoxi",qty:5,total:1000}];

    return(
         <div style={{height:height,width:width}} className={`grid grid-rows-[50px_auto] bg-white rounded shadow-md`}>
             <CardTitle title={info.title} />
             <div className="p-2">
                <ul className="h-[100%] flex flex-col justify-around">
                <li className="h-[40px] bg-white  grid grid-cols-3 items-center justify-center">
                    <p>{'Nome'}</p>
                    <p>{'Qty'}</p>
                    <p>{'Preco'}</p>
                    </li>
                    {lastSellings.map((el)=><li className="h-[40px] bg-white cursor-pointer justify-center p-1 rounded sm:shadow grid grid-cols-3 items-center">
                    <p>{el.name}</p>
                    <p>{el.qty}</p>
                    <p>{el.total} {'kz'}</p>
                    </li>)}
                </ul>
             </div>
        </div>
    );
};

export default LastSelling;
