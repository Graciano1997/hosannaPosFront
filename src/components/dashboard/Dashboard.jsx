import { useTranslation } from "react-i18next";
import LastSelling from "./LastSelling";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { useDispatch, useSelector } from "react-redux";
import { totalToDay } from "../../lib/totalToDay";
import { useEffect, useState } from "react";
import { fetchAnualSpents, fetchSpents } from "../../slices/spentSlice";
import { fetchAnualSales, fetchSales } from "../../slices/saleSlice";
import { LineChart } from "./LineChart";
import { DoughnutChart } from "./DoughnutChart";
import { BanknotesIcon, BellAlertIcon, CircleStackIcon, ClockIcon, ShoppingCartIcon, TagIcon, UserIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { activeTab } from "../../slices/appSlice";
import { Profiles } from "../../lib/Enums";
import { fetchAlertProducts, fetchAnualExpiredProducts } from "../../slices/productSlice";
import { fetchStockMovements } from "../../slices/stockSlice";
import { annualMonths } from "../../lib/Months";
import { GenericLineChart } from "./GenericLineChart";

const Dashboard=()=>{
    const {t}=useTranslation();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchSpents());
        dispatch(fetchSales());
        dispatch(fetchAnualSpents());    
        dispatch(fetchAnualSales());    
        dispatch(fetchAnualExpiredProducts());    
        dispatch(fetchAlertProducts());
        dispatch(fetchStockMovements());
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

     const dataLines = {
    labels: annualMonths.map((month)=>firstCapitalize(t(month))),
    datasets: [{
      label: firstCapitalize(t('income')),
      data: anualSales,
      fill: false,
      borderColor: 'rgb(54, 235, 108)',
      tension: 0.5
    },
    {
      label: firstCapitalize(t('spents')),
      data: anualSpents,
      fill: false,
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.5
    },
    {
      label: firstCapitalize(t('expired')),
      data: anualExpired,
      fill: false,
      borderColor: 'rgb(255, 205, 86)',
      tension: 0.5
    }
    ],
  };

    return(
        <>
        <div className="mt-[3%]">
    <div className="p-0 pt-5 ">
    <div className="flex gap-2 justify-end rounded">
        <div className="flex p-0 gap-3">
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
            <TagIcon className="w-5 y-5 text-[#323232] "/>
            <h4>{firstCapitalize(t('sales'))}</h4>
            </button>
            {productState.alertProducts!=undefined && productState.alertProducts.length>0 &&
            
                        <button 
            onClick={()=>{
                dispatch(activeTab('tab4'));
                navegate('/products');
            }}
            className="bg-white rounded transition-all duration-200 hover:shadow p-3 gap-1 flex cursor-pointer">
            <BellAlertIcon className="w-5 y-5 text-yellow-600 alert"/>
            <h4>{firstCapitalize(t('alert'))}</h4>
            </button>
            }

            <button 
            onClick={()=>{
                dispatch(activeTab('tab5'));
                navegate('/products');
            }}
            className="bg-white rounded transition-all duration-200 hover:shadow p-3 gap-1 flex cursor-pointer">
            <ClockIcon className="w-5 y-5 text-red-600 "/>
            <h4>{firstCapitalize(t('expired'))}</h4>
            </button>
            </>}
            
        </div>
    </div>
    
    <div className="flex flex-col mt-[3rem] mb-[0rem] items-center sm:items-start sm:flex-row justify-end gap-4 sm:mt-[3%] w-full">

<LastSelling width={350} height={350} info={{title:firstCapitalize(t('last_selling')), description:t('about')}}/>
<DoughnutChart width={300} height={390} data={[today_balance,today_spents]} info={firstCapitalize(t('today_status'))}/>
{/* <LineChart width={450} height={350} data={{spents: anualSpents,sales:anualSales, expireds:anualExpired}} info={firstCapitalize(t('income_outcome_expiration'))}/> */}
<GenericLineChart width={450} height={350} dataLines={dataLines} info={firstCapitalize(t('income_outcome_expiration'))}/>
</div>
    </div>
        </div>
        </>
    )
};

export default Dashboard;