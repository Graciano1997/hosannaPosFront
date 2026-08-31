import { useTranslation } from "react-i18next";
import Card from "../general/Card";
import { BarChart } from "../dashboard/BarChart";
import Money from "../general/Money";
import { useDispatch, useSelector } from "react-redux";
import LastOuts from "../dashboard/LastOuts";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { annualMonths } from "../../lib/Months";
import React from "react";

const SpentDashboard= React.memo(
    ()=>{
    const {t}=useTranslation();
    const spentState = useSelector(state=>state.spentState);

    const data = {
        labels:annualMonths.map((month)=>firstCapitalize(t(month))),
    datasets: [
        {
        label:t('output'),
        data: spentState.anualSpends,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
    ],
    };

    return(
        <>
        <div className="grid grid-cols-1 lg:grid-cols-3 place-items-center items-center gap-[10px] mt-4 p-1">
        <LastOuts width={350} height={350} info={{title: firstCapitalize(t('last_outputs')), description:t('about')}} />
        <BarChart data={data}  info={firstCapitalize(t('annual_spends'))} />
        <Card className="font-black" width={350} height={350} info={{output:true,title: firstCapitalize(t('outputs')),description:<Money amount={spentState.total}/>}} />
        </div>
        </>
    )
}
)
;

export default SpentDashboard;