import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Table from "../Table/Table";
import SaleDashboard from "./SaleDashboard";
import Title from "../general/Title";
import { useDispatch, useSelector } from "react-redux";
import CardWrapper from "../general/CardWrapper";
import TabWrapper from "../general/TabWrapper";
import { fetchSales } from "../../slices/saleSlice";

const Sales=()=>{
    const {t}=useTranslation();
    const [showDashboard,setShowDashboard]=useState(false);
    const appState=useSelector((state)=>state.appState);
    const filterRows = ['client_id','user_id','sale_products'];

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchSales());
    },[])

    const sales= useSelector((state)=>state.saleState.sales) || [];

    return(
        <CardWrapper>
        <Title title={t('sales')}/>
        <TabWrapper>    
        {appState.activeTab=="tab1" && (<Table filterRows={filterRows} filterDetails={filterRows} collection={sales}/>)}
        {appState.activeTab=="tab2"  && (<SaleDashboard/>)} 
        </TabWrapper>
        </CardWrapper>
    )
};

export default Sales;