import { useTranslation } from "react-i18next";
import Card from "./Card";
import Title from "./Title";

const Dashboard=()=>{
    const {t}=useTranslation();
    return(
        <>
        <Title/>
        <div className="flex flex-wrap justify-center gap-7 mt-4 p-1 ">
        <Card className="font-black" width={400} height={350}  info={{title:t('month_balance'),description:t('about')}}/>
        <Card width={400} height={350}  info={{title:t('month_balance'),description:t('about')}}/>
        <Card width={400} height={350} info={{title:t('medicines_status'),description:t('about')}}/>
        <Card width={600} height={350} info={{title:t('month_balance'),description:t('about')}}/>
        <Card width={600} height={350} info={{title:t('month_balance'),description:t('about')}}/>
        </div>
        </>
    )
};

export default Dashboard;