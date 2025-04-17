import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Table from "../Table/Table";
import SaleDashboard from "./SaleDashboard";
import Title from "../general/Title";
import { useDispatch, useSelector } from "react-redux";
import CardWrapper from "../general/CardWrapper";
import TabWrapper from "../general/TabWrapper";
import { fetchSales, setSales } from "../../slices/saleSlice";
import { activeTab } from "../../slices/appSlice";

const Sales=()=>{
    const {t}=useTranslation();
    const [showDashboard,setShowDashboard]=useState(false);
    const appState=useSelector((state)=>state.appState);
    const filterRows = ['client_id','user_id','sale_products'];

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(activeTab("tab1"));
        dispatch(fetchSales());
    },[])

    const sales= useSelector((state)=>state.saleState.sales);

    return(
        <CardWrapper>
        <Title title={t('sales')}
        collectionToExport={{
            model:t('sales'),
            data:sales}}
        />
        <TabWrapper>    
        {appState.activeTab=="tab1" && (<Table filterRows={filterRows} filterDetails={filterRows} create={null} fetcher={fetchSales} dispatcher={setSales} collection={sales}/>)}
        {appState.activeTab=="tab2"  && (<SaleDashboard/>)} 
        </TabWrapper>
        </CardWrapper>
    )
};

export default Sales;