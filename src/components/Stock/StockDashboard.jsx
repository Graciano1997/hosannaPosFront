import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { annualMonths } from "../../lib/Months";
import { GenericLineChart } from "../dashboard/GenericLineChart";

const StockDashboard=()=>{
    const {t}=useTranslation();
    const dispatch = useDispatch();

    const stockState = useSelector(state=>state.stockState);
    

    const dataLines = {
    
    labels: annualMonths.map((month)=>firstCapitalize(t(month))),
    datasets: [{
      label: firstCapitalize(t('entry')),
      data: stockState.anualStockMovement!=null ? stockState.anualStockMovement.entry : [],
      fill: false,
      borderColor: 'rgb(54, 235, 108)',
      tension: 0.5
    },
    {
      label: firstCapitalize(t('exit')),
      data: stockState.anualStockMovement!=null ? stockState.anualStockMovement.exit : [],
      fill: false,
      borderColor: 'rgb(255, 95, 132)',
      tension: 0.5
    },
    {
      label: firstCapitalize(t('adjustment')),
      data: stockState.anualStockMovement!=null  ? stockState.anualStockMovement.adjustment : [],
      fill: false,
      borderColor: 'rgba(163, 140, 145, 1)',
      tension: 0.5
    },
    {
      label: firstCapitalize(t('expired')),
      data: stockState.anualStockMovement!=null ? stockState.anualStockMovement.expired : [],
      fill: false,
      borderColor: 'rgb(255, 205, 86)',
      tension: 0.5
    },
    {
      label: firstCapitalize(t('return')),
      data: stockState.anualStockMovement!=null ? stockState.anualStockMovement.return : [],
      fill: false,
      borderColor: 'rgba(255, 106, 86, 0.93)',
      tension: 0.5
    }
    ],
  };

    return(
        <>
        <div className="flex flex-wrap justify-center items-center gap-[20px] mt-4 p-1">
        <GenericLineChart  height={350} width={550} dataLines={dataLines} info={firstCapitalize(t('stock_movements_graph_header'))}/>
        </div>
        </>
    )
};

export default StockDashboard;