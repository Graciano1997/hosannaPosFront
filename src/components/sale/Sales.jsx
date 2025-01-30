import { useTranslation } from "react-i18next";
import Title from "../general/Title";
import { useState } from "react";
import Table from "../Table/Table";

const Sales=()=>{
    const {t}=useTranslation();
    const [sales,setSale]=useState([
        {
        product:'Banana',
        price:200,
        quantity:20,
        data:'2023-12-12',
        total:5000,
    },
    {
        product:'Banana',
        price:200,
        quantity:20,
        data:'2023-12-12',
        total:5000,
    },
    {
        product:'Banana',
        price:200,
        quantity:20,
        data:'2023-12-12',
        total:5000,
    },{
        product:'Banana',
        price:200,
        quantity:20,
        data:'2023-12-12',
        total:5000,
    },{
        product:'Banana',
        price:200,
        quantity:20,
        data:'2023-12-12',
        total:5000,
    },{
        product:'Banana',
        price:200,
        quantity:20,
        data:'2023-12-12',
        total:5000,
    },
]);

    return(
        <>
        <Title title={t('sales')}/>
        <Table collection={sales}/>
        </>
    )
};

export default Sales;