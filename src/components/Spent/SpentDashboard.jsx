import { useTranslation } from "react-i18next";
import Card from "../general/Card";
import { BarChart } from "../dashboard/BarChart";
import Money from "../general/Money";
import { useDispatch, useSelector } from "react-redux";
import LastOuts from "../dashboard/LastOuts";
import { firstCapitalize } from "../../lib/firstCapitalize";

const SpentDashboard=()=>{
    const {t}=useTranslation();
    const spentState = useSelector(state=>state.spentState);

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Ago','Set','Oct','Nov'];

    const data = {
        labels,
    datasets: [
        {
        label:t('output'),
        data: labels.map(() => Math.random()*100),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
    ],
    };

    return(
        <>
        <div className="flex flex-wrap justify-center gap-3 mt-4 p-1">
        <Card className="font-black" width={400} height={350} info={{output:true,title: firstCapitalize(t('output')),description:<Money amount={spentState.total}/>}} />
        <LastOuts width={400} height={350} info={{title: firstCapitalize(t('last_outputs')), description:t('about')}} />
        <BarChart data={data} width={450} height={350} info={firstCapitalize(t('anual_graph'))} />
        </div>
        </>
    )
};

export default SpentDashboard;