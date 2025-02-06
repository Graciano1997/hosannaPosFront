import { useTranslation } from "react-i18next";
import { useState } from "react";
import Table from "../Table/Table";
import SaleDashboard from "./SaleDashboard";
import Title from "../general/Title";
import { useSelector } from "react-redux";

const Sales=()=>{
    const {t}=useTranslation();
    const [showDashboard,setShowDashboard]=useState(false);
    const appState=useSelector((state)=>state.appState);

    const [sales,setSale]=useState([
        {
            nº:1,
            qty:20,
            total:2000,
            Date:'2023-12-12'
        },
        {
            nº:2,
            qty:30,
            total:5000,
            Date:'2023-12-12'
        },
        {
            nº:3,
            qty:20,
            total:2000,
            Date:'2023-12-12'
        },   
]);

    return(
        <div className="bg-white rounded p-2 h-[500px] mt-[2rem]">
        <Title title={t('sales')}/>
        <div className="h-[350px] rounded p-2" style={{marginBottom:'2rem',paddingBottom:'2rem', overflowY:'scroll'}}>
        {appState.activeTab=="tab1" && (<Table collection={sales}/>)}
        {appState.activeTab=="tab2"  && (<SaleDashboard/>)} 
        </div>
        </div>
    )
};

export default Sales;