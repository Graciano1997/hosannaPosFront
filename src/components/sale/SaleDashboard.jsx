import { useTranslation } from "react-i18next";
import Card from "../general/Card";
import { BarChart } from "../dashboard/BarChart";
import LastSelling from "../dashboard/LastSelling";
import currency from "currency.js";
import { useSelector } from "react-redux";
import Money from "../general/Money";
import { totalToDay } from "../../lib/totalToDay";

const SaleDashboard=()=>{
    const {t}=useTranslation(); 
    const {sales}=useSelector((state)=>state.saleState);

    const today_balance = totalToDay(sales,new Date());
    return(
        <>
        <div className="flex flex-wrap justify-center gap-3 mt-4 p-1 ">
        <Card className="font-black" width={400} height={350} info={{title:t('today_balance'),description:<Money amount={today_balance} />}} />
        {/* <LastSelling width={400} height={350} info={{title:t('last_selling'), description:t('about')}}/> */}
        {/* <BarChart /> */}
        </div>
        </>
    )
};

export default SaleDashboard;