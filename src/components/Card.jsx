import { useTranslation } from "react-i18next";

const Card =({width=200,height=300,info})=>{    

    const {t}=useTranslation();

    return(
         <div className={`block bg-white rounded shadow-md w-[${width}px] h-[${height}px]`}>
             <header className="shadow bg-white-500 h-[50px] pl-4 flex justify-begin items-center rounded-t"><h2 className="text-center">{t('month_balance')}</h2></header>
             <main>
                <p>{info.description}</p> 
             </main>
        </div>
    );
};

export default Card;
