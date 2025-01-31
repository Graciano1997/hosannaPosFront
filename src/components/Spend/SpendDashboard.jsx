import { useTranslation } from "react-i18next";
import Card from "../general/Card";
import { BarChart } from "../dashboard/BarChart";
import LastSelling from "../dashboard/LastSelling";
import currency from "currency.js";

const SpendDashboard=()=>{
    const {t}=useTranslation();
    return(
        <>
        <div className="flex flex-wrap justify-center gap-3 mt-4 p-1 ">
        <Card className="font-black" width={400} height={350} info={{output:true,title:t('output'),description:currency(1000,{separator:'.', decimal:',',precision:2}).add(200).format()}} />
        <LastSelling width={400} height={350} info={{title:t('last_selling'), description:t('about')}}/>
        <BarChart width={450} height={350} info={'Gráfico Semestral'} />
        </div>
        </>
    )
};

export default SpendDashboard;