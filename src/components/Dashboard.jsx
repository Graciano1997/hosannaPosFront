import { useTranslation } from "react-i18next";
import Card from "./Card";
import { BarChart } from "./BarChart";
import LastSelling from "./LastSelling";
import Title from "./Title";
import LastExpired from "./LastExpired";

const Dashboard=()=>{
    const {t}=useTranslation();
    return(
        <>
        <Title title={t('dashboard')}/>
        <div className="flex flex-wrap justify-center gap-7 mt-4 p-1 ">
        <Card className="font-black" width={400} height={350}  info={{title:t('month_balance'),description:t('about')}}/>
        <BarChart width={450} height={350} info={'Gráfico Semestral'} />
        <LastSelling width={400} height={350} info={{title:t('last_selling'), description:t('about')}}/>
        <LastExpired width={650} height={360} info={{title:t('expireds'),description:t('about')}}/>
        <Card width={600} height={350} info={{title:t('month_balance'),description:t('about')}}/>
        </div>
        </>
    )
};

export default Dashboard;