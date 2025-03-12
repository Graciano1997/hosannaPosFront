import { useTranslation } from "react-i18next";
import Card from "../general/Card";
import { BarChart } from "./BarChart";
import LastSelling from "./LastSelling";
import Title from "../general/Title";
import LastExpired from "./LastExpired";
import { PieChart } from "./PieChart";
import currency from "currency.js";
import Money from "../general/Money";

const Dashboard=()=>{
    const {t}=useTranslation();
    return(
        <>
        <div className="mt-[3rem]">
        <div className="flex flex-wrap justify-center gap-7 mt-4 p-1 ">
        <Card className="font-black" width={400} height={350} info={{title:t('today_balance'),description:<Money amount={3000}/>}} />
        <Card className="font-black" width={400} height={350}   info={{output:true,title:t('outputs'),description:<Money amount={4000}/>}} />
        <LastSelling width={400} height={350} info={{title:t('last_selling'), description:t('about')}}/>
        {/* <BarChart width={450} height={350} info={'Gráfico Semestral'} /> */}
         <PieChart width={350} height={350} info={'Categoria dos Produtos vendidos'}/>
        <LastExpired width={400} height={350} info={{title:t('expireds'),description:t('about')}}/>
        </div>
        </div>
        </>
    )
};

export default Dashboard;