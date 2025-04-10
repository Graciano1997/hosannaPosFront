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

const Dashboard=()=>{
    const {t}=useTranslation();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchSpents());
        dispatch(fetchSales());    
    },[]);
    const {sales}=useSelector((state)=>state.saleState);
    const spentState = useSelector(state=>state.spentState);

    const today_balance = totalDayIncome(sales,new Date());
    return(
        <>
        <div className="mt-[3rem]">
        <div className="flex flex-wrap justify-center gap-7 mt-4 p-1 ">
        <Card className="font-black" width={400} height={350} info={{title: firstCapitalize(t('today_balance')),description:<Money amount={today_balance}/>}} />
        <Card className="font-black" width={400} height={350}   info={{output:true,title:firstCapitalize(t('spents')),description:<Money amount={spentState.total}/>}} />
        {/* <LastSelling width={400} height={350} info={{title:firstCapitalize(t('last_selling')), description:t('about')}}/> */}
        {/* <BarChart width={450} height={350} info={'Gráfico Semestral'} /> */}
         {/* <PieChart width={350} height={350} info={'Categoria dos Produtos vendidos'}/> */}
        {/* <LastExpired width={400} height={350} info={{title:t('expireds'),description:t('about')}}/> */}
        </div>
        </div>
        </>
    )
};

export default Dashboard;