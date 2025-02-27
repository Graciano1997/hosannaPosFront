import { useTranslation } from "react-i18next";
import Card from "../general/Card";
import Title from "../general/Title";

const Setting=()=>{
    const {t}=useTranslation();
    return(
        <>
        <Title title={t('settings')}/>
        <div className="flex flex-wrap justify-center gap-7 mt-20 p-1">
        <h1 className="text-black font-bold">Loading...</h1>
        </div>
        </>
    )
};

export default Setting;