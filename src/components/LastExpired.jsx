import { useTranslation } from "react-i18next";
import CardTitle from "./CardTitle";

const LastExpired =({width=200,height=300,info})=>{    

    const {t}=useTranslation();
    
    const expireds= [{name:"Amoxi",qty:5,total:1000,data:{expire:'12-12-2024',issue:'11-11-2020'}},{name:"Neurobion",qty:5,total:1000,data:{expire:'12-12-2024',issue:'11-11-2020'}},
        {name:"Vitamina C",qty:5,total:1000,data:{expire:'12-12-2024',issue:'11-11-2020'}}
        ,{name:"Neurobion",qty:5,total:1000,data:{expire:'12-12-2024',issue:'11-11-2020'}}
    ];

    return(
         <div style={{height:height,width:width}} className={`grid grid-rows-[50px_auto] bg-white rounded shadow-md`}>
             <CardTitle title={info.title} />
             <div className="p-2">
                <ul className="h-[100%] flex flex-col justify-around">
                <li className="h-[40px] bg-white  grid grid-cols-4 items-center justify-center">
                    <p>{'Nome'}</p>
                    <p>{'Qty'}</p>
                    <p>{'Total'}</p>
                    <p>{'Exp.Date'}</p>
                    </li>
                    {expireds.map((el)=><li className="h-[40px] bg-red-100 cursor-pointer justify-center p-1 rounded sm:shadow grid grid-cols-4 items-center">
                    <p>{el.name}</p>
                    <p>{el.qty}</p>
                    <p>{el.total} {'kz'}</p>
                    <p>{el.data.expire}</p>
                    </li>)}
                </ul>
             </div>
        </div>
    );
};

export default LastExpired;
