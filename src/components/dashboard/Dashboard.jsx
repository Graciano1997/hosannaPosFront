import { useTranslation } from "react-i18next";
import Card from "../general/Card";
import { BarChart } from "./BarChart";
import LastSelling from "./LastSelling";
import Title from "../general/Title";
import LastExpired from "./LastExpired";
import { PieChart } from "./PieChart";
import currency from "currency.js";
import Money from "../general/Money";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { useDispatch, useSelector } from "react-redux";
import { totalToDay } from "../../lib/totalToDay";
import { useEffect, useState } from "react";
import { fetchAnualSpents, fetchSpents } from "../../slices/spentSlice";
import { fetchAnualSales, fetchSales } from "../../slices/saleSlice";
import { LineChart } from "./LineChart";
import { DoughnutChart } from "./DoughnutChart";
import { BanknotesIcon, CircleStackIcon, ClockIcon, ShoppingCartIcon, UserIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { Cog8ToothIcon } from "@heroicons/react/16/solid";
import { activeTab } from "../../slices/appSlice";
import { Profiles } from "../../lib/Enums";
import { fetchAnualExpiredProducts } from "../../slices/productSlice";

const Dashboard=()=>{
    const {t}=useTranslation();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchSpents());
        dispatch(fetchSales());
        dispatch(fetchAnualSpents());    
        dispatch(fetchAnualSales());    
        dispatch(fetchAnualExpiredProducts());    
    },[]);

    const navegate = useNavigate();
    const saleState=useSelector((state)=>state.saleState);
    const productState=useSelector((state)=>state.productState);
    const sales=saleState.sales;
    const spentState = useSelector(state=>state.spentState);
    const [master,setMaster]=useState(JSON.parse(localStorage.getItem("currentUser")).profileId==Profiles.MASTER);
   
    const anualSpents=spentState.anualSpends;
    const anualSales=saleState.anualSales;
    const anualExpired=productState.anualExpireds;
   
    const today_balance = totalToDay(sales,new Date());
    const today_spents = totalToDay(spentState.spents,new Date(),"amount");

    return(
        <>
        <div className="mt-[3%]">
    <div className="p-0 pt-5 ">
    <div className="flex gap-2 justify-end rounded">
        <div className="flex p-0 gap-5">
            <button onClick={()=>{
                navegate('/sale');
            }} className="bg-white rounded transition-all duration-200 hover:shadow p-3 gap-1 flex cursor-pointer">
            <ShoppingCartIcon className="w-5 y-5 text-[#323232] "/>
          
            <h4>{firstCapitalize(t('sale'))}</h4>
            
            </button>
            {master && 
            <>
            <button 
            onClick={()=>{
                navegate('/sales');
            }}
            className="bg-white rounded transition-all duration-200 hover:shadow p-3 gap-1 flex cursor-pointer">
            <CircleStackIcon className="w-5 y-5 text-[#323232] "/>
            <h4>{firstCapitalize(t('sales'))}</h4>
            </button>
            <button 
            onClick={()=>{
                dispatch(activeTab('tab4'));
                navegate('/products');
            }}
            className="bg-white rounded transition-all duration-200 hover:shadow p-3 gap-1 flex cursor-pointer">
            <ClockIcon className="w-5 y-5 text-red-600 "/>
            <h4>{firstCapitalize(t('expired'))}</h4>
            </button>
            </>}
            
        </div>
    </div>

    <div className="flex flex-col mt-[2rem] mb-[0rem] items-center sm:items-start sm:flex-row justify-end gap-4 sm:mt-[3%] w-full">

 <LastSelling width={400} height={350} info={{title:firstCapitalize(t('last_selling')), description:t('about')}}/>
<DoughnutChart width={350} height={400} data={[today_balance,today_spents]} info={firstCapitalize(t('today_status'))}/>
<LineChart width={500} height={350} data={{spents: anualSpents,sales:anualSales, expireds:anualExpired}} info={firstCapitalize(t('income_outcome_expiration'))}/>
</div>
    </div>
        </div>
        </>
    )
};

export default Dashboard;