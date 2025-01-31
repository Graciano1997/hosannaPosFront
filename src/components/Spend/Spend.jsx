import { useTranslation } from "react-i18next";
import Title from "../general/Title";
import { useState } from "react";
import Table from "../Table/Table";
import Create from "./Create";

const Spend=()=>{
    const {t}=useTranslation();
    const [isShowing,setIsShowing]=useState(false);

    const [spendings,setSpendings]=useState([{
        destinatario:'Graciano Henrique',
        motivo:'Gastos para comprar agua dos pedreiros',
        valor:200,
        date:'2023-12-12'     
    },
    {
        destinatario:'Graciano Henrique',
        motivo:'Gastos para comprar agua dos pedreiros',
        valor:200,
        date:'2023-12-12'     
    }
]);

    return(
        <>
        <div className="bg-white rounded p-2 h-[500px] mt-[2rem]">
        <Title setIsShowing={setIsShowing} title={t('spends')}/>
        <div className="h-[350px] rounded p-2" style={{marginBottom:'2rem',paddingBottom:'2rem', overflowY:'scroll'}}>
        <Table collection={spendings}/>
        </div>
        {isShowing && (<Create/>)}
        </div>
        </>
    )
};

export default Spend;