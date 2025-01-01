import { useTranslation } from "react-i18next";
import CardTitle from "./CardTitle";

const Card =({width=200,height=300,info})=>{    

    const {t}=useTranslation();

    return(
         <div style={{height:height,width:width}} className={`grid grid-rows-[50px_auto] bg-white rounded shadow-md`}>
             <CardTitle title={info.title} />
             <div className="flex justify-center items-center">
                <p className="font-bold">{info.description}</p> 
             </div>
        </div>
    );
};

export default Card;
