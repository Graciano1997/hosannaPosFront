import { useTranslation } from "react-i18next";
import Card from "../general/Card";
import { BarChart } from "../dashboard/BarChart";
import LastSelling from "../dashboard/LastSelling";
import Money from "../general/Money";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { calcTotalSpents } from "../../slices/spentSlice";
import LastOuts from "../dashboard/LastOuts";
import { firstCapitalize } from "../../lib/firstCapitalize";

const SpentDashboard=()=>{
    const {t}=useTranslation();
    const spentState = useSelector(state=>state.spentState);

    return(
        <>
        <div className="flex flex-wrap justify-center gap-3 mt-4 p-1 ">
        <Card className="font-black" width={400} height={350} info={{output:true,title: firstCapitalize(t('output')),description:<Money amount={spentState.total}/>}} />
        <LastOuts width={400} height={350} info={{title: firstCapitalize(t('last_outputs')), description:t('about')}} />
        <BarChart width={450} height={350} info={'Gráfico Semestral'} />
        </div>
        </>
    )
};

export default SpentDashboard;