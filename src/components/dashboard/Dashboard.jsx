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
import { totalDayIncome } from "../../lib/totalDayIncome";
import { useEffect } from "react";
import { fetchSpents } from "../../slices/spentSlice";
import { fetchSales } from "../../slices/saleSlice";
import { LineChart } from "./LineChart";
import { DoughnutChart } from "./DoughnutChart";
import { BanknotesIcon, CircleStackIcon, ClockIcon, ShoppingCartIcon, UserIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { Cog8ToothIcon } from "@heroicons/react/16/solid";
import { activeTab } from "../../slices/appSlice";

const Dashboard=()=>{
    const {t}=useTranslation();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchSpents());
        dispatch(fetchSales());    
    },[]);

    const navegate = useNavigate();
    const {sales}=useSelector((state)=>state.saleState);
    const spentState = useSelector(state=>state.spentState);

    const today_balance = totalDayIncome(sales,new Date());
    return(
        <>
        <div className="mt-[3%]">
    <div className="p-0 pt-5 mt-[5%]">
    <div className="flex gap-2 justify-end rounded">
        <div className="flex p-0 gap-5">
            <button onClick={()=>{
                navegate('/sale');
            }} className="bg-white rounded transition-all duration-200 hover:shadow p-3 gap-1 flex cursor-pointer">
            <ShoppingCartIcon className="w-5 y-5 text-[#323232] "/>
            
            <h4>{firstCapitalize(t('sale'))}</h4>
            
            </button>
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
            {/* <button 
            onClick={()=>{
                navegate('/setting');
            }}
            className="bg-white rounded transition-all duration-200 hover:shadow p-3 gap-1 flex cursor-pointer">
            <Cog8ToothIcon className="w-5 y-5 text-[#323232] "/>
            <h4>{firstCapitalize(t('settings'))}</h4>
            </button> */}
        </div>
        {/* <Card className="font-black" width={290} height={200}   info={{output:true,title:firstCapitalize(t('spents')),description:<Money amount={spentState.total}/>}} /> */}
    </div>

    <div className="flex flex-col mt-[2rem] items-center sm:items-start sm:flex-row justify-end gap-4 sm:mt-[3%] w-full">

 <LastSelling width={400} height={350} info={{title:firstCapitalize(t('last_selling')), description:t('about')}}/>
{/* <BarChart width={450} height={350} info={'Gráfico Semestral'} /> */}
 {/* <PieChart width={350} height={350} info={'Categoria dos Produtos vendidos'}/> */}
{/* <LastExpired width={400} height={350} info={{title:t('expireds'),description:t('about')}}/> */}
<DoughnutChart width={350} height={400} data={[today_balance,spentState.total]} info={firstCapitalize(t('today_status'))}/>
<LineChart width={600} height={400} info={firstCapitalize(t('income_outcome_expiration'))}/>
</div>
    </div>
        </div>
        </>
    )
};

export default Dashboard;