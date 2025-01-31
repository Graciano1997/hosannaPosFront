import { useTranslation } from "react-i18next";
import { useState } from "react";
import Table from "../Table/Table";
import Title from "./Title";
import SaleDashboard from "./SaleDashboard";

const Sales=()=>{
    const {t}=useTranslation();
    const [showDashboard,setShowDashboard]=useState(false);

    const [sales,setSale]=useState([
        {
            nº:1,
            qty:20,
            total:2000,
            responsavel:'Adilson Henrique',
            Date:'2023-12-12'
        },
        {
            nº:2,
            qty:30,
            total:5000,
            responsavel:'Graciano Henrique',
            Date:'2023-12-12'
        },
        {
            nº:3,
            qty:20,
            total:2000,
            responsavel:'Adilson Henrique',
            Date:'2023-12-12'
        },
        {
            nº:4,
            qty:30,
            total:5000,
            responsavel:'Graciano Henrique',
            Date:'2023-12-12'
        },
        {
            nº:5,
            qty:20,
            total:2000,
            responsavel:'Adilson Henrique',
            Date:'2023-12-12'
        },
        {
            nº:6,
            qty:30,
            total:5000,
            responsavel:'Graciano Henrique',
            Date:'2023-12-12'
        },
        {
            nº:6,
            qty:30,
            total:5000,
            responsavel:'Graciano Henrique',
            Date:'2023-12-12'
        },
        {
            nº:6,
            qty:30,
            total:5000,
            responsavel:'Graciano Henrique',
            Date:'2023-12-12'
        },
        {
            nº:6,
            qty:30,
            total:5000,
            responsavel:'Graciano Henrique',
            Date:'2023-12-12'
        },
        {
            nº:6,
            qty:30,
            total:5000,
            responsavel:'Graciano Henrique',
            Date:'2023-12-12'
        },
        {
            nº:6,
            qty:30,
            total:5000,
            responsavel:'Graciano Henrique',
            Date:'2023-12-12'
        },
        {
            nº:6,
            qty:30,
            total:5000,
            responsavel:'Graciano Henrique',
            Date:'2023-12-12'
        },
        {
            nº:6,
            qty:30,
            total:5000,
            responsavel:'Graciano Henrique',
            Date:'2023-12-12'
        },
        {
            nº:6,
            qty:30,
            total:5000,
            responsavel:'Graciano Henrique',
            Date:'2023-12-12'
        }       
]);

    return(
        <div className="bg-white rounded p-2 h-[500px] mt-[2rem]">
        <Title title={t('sales')}/>
        <div className="h-[350px] rounded p-2" style={{marginBottom:'2rem',paddingBottom:'2rem', overflowY:'scroll'}}>
        {!showDashboard && (<Table collection={sales}/>)}
        {showDashboard && (<SaleDashboard/>)} 
        </div>
        </div>
    )
};

export default Sales;