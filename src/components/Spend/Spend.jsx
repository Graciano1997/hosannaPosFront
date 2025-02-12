import { useTranslation } from "react-i18next";
import Title from "../general/Title";
import { useState } from "react";
import Table from "../Table/Table";
import Create from "./Create";
import SpendDashboard from "./SpendDashboard";
import { useSelector } from "react-redux";
import CardWrapper from "../general/CardWrapper";
import TabWrapper from "../general/TabWrapper";

const Spend=()=>{
    const {t}=useTranslation();
    const appState=useSelector((state)=>state.appState);
    const [isShowing,setIsShowing]=useState(false);

    const [spendings,setSpendings]=useState([{
        destinatario:'Graciano Henrique',
        motivo:'Gastos para comprar agua dos pedreiros',
        amount:200,
        date:'2023-12-12'     
    },
    {
        destinatario:'Graciano Henrique',
        motivo:'Gastos para comprar agua dos pedreiros',
        amount:200,
        date:'2023-12-12'     
    }
]);

    return(
        <CardWrapper>
        <Title setIsShowing={setIsShowing} title={t('spends')}/>
        <TabWrapper>
        {appState.activeTab=="tab1" && (<Table collection={spendings}/>)}
        {appState.activeTab=="tab2"  && (<SpendDashboard/>)} 
        </TabWrapper> 
        {isShowing && (<Create/>)}
        </CardWrapper>
    )
};

export default Spend;