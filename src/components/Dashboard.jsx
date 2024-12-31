import { useTranslation } from "react-i18next";
import Card from "./Card";
import Title from "./Title";

const Dashboard=()=>{
    const {t}=useTranslation();
    return(
        <>
        <Title/>
        <div className="flex flex-wrap justify-center  gap-4 mt-4 p-5 ">
        <Card width={500} height={400}  info={{title:t('month_balance'),description:t('about')}}/>
        <Card width={500}  info={{title:t('month_balance'),description:t('about')}}/>
        <Card width={500}  info={{title:t('month_balance'),description:t('about')}}/>
        <Card info={{title:t('month_balance'),description:t('about')}}/>
        <Card info={{title:t('month_balance'),description:t('about')}}/>
        <Card info={{title:t('month_balance'),description:t('about')}}/>
        </div>
        </>
    )
};

export default Dashboard;