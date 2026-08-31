import { useTranslation } from "react-i18next";
import Card from "../general/Card";
import { useSelector } from "react-redux";
import Money from "../general/Money";

import React from "react";

const SaleDashboard= React.memo(
     ()=>{
    const {t}=useTranslation(); 
    const {kpis}=useSelector((state)=>state.saleState);
    return(
        <>
        <div className="flex flex-wrap justify-center gap-3 mt-4 p-1 ">
        <Card className="font-black" width={400} height={350} info={{title:t('today_balance'),description:<Money amount={kpis.today_sale_total} />}} />
        </div>
        </>
    )
}
)
;

export default SaleDashboard;