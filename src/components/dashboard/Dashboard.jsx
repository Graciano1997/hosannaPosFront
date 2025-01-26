import { useTranslation } from "react-i18next";
import Card from "../general/Card";
import { BarChart } from "./BarChart";
import LastSelling from "./LastSelling";
import Title from "../general/Title";
import LastExpired from "./LastExpired";
import { PieChart } from "./PieChart";
import currency from "currency.js";

const Dashboard=()=>{
    const {t}=useTranslation();
    return(
        <>
        <Title title={t('dashboard')}/>
        <div className="flex flex-wrap justify-center gap-7 mt-4 p-1 ">
        <Card className="font-black" width={400} height={350} info={{title:t('today_balance'),description:currency(1000,{separator:'.', decimal:',', symbol:'kz',precision:2}).add(200).format()}} />
        <BarChart width={450} height={350} info={'Gráfico Semestral'} />
        <LastSelling width={400} height={350} info={{title:t('last_selling'), description:t('about')}}/>
         <PieChart width={400} height={450} info={'Produtos vendidos'}/>
        <LastExpired width={650} height={450} info={{title:t('expireds'),description:t('about')}}/>
        </div>
        </>
    )
};

export default Dashboard;