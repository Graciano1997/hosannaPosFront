import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { annualMonths } from "../../lib/Months";
import { GenericLineChart } from "../dashboard/GenericLineChart";
import React from "react";

const StockDashboard= React.memo(
    ()=>{
    const {t}=useTranslation();
    const dispatch = useDispatch();
    const stockState = useSelector(state=>state.stockState);
    
    const dataLines = {
    labels: annualMonths.map((month)=>firstCapitalize(t(month))),
    datasets: [
      {
      label: firstCapitalize(t('entry')),
      data: stockState.anualStockMovement !=null ? stockState.anualStockMovement.entry : [],
      fill: false,
      borderColor: '#22C55E',
      tension: 0.5
      },
    {
      label: firstCapitalize(t('exit')),
      data: stockState.anualStockMovement != null ? stockState.anualStockMovement.exit : [],
      fill: false,
      borderColor: '#EF4444',
      tension: 0.5
    },
    {
      label: firstCapitalize(t('adjustment')),
      data: stockState.anualStockMovement != null  ? stockState.anualStockMovement.adjustment : [],
      fill: false,
      borderColor: '#3B82F6',
      tension: 0.5
    },
    {
      label: firstCapitalize(t('expired')),
      data: stockState.anualStockMovement != null ? stockState.anualStockMovement.expired : [],
      fill: false,
      borderColor: '#FACC15',
      tension: 0.5
    },
    {
      label: firstCapitalize(t('return')),
      data: stockState.anualStockMovement!=null ? stockState.anualStockMovement.return : [],
      fill: false,
      borderColor: '#8B5CF6',
      tension: 0.5
    }
    ],
  };

    return(
        <>
        <div 
        className="flex justify-center  mt-5 sm:gap-18 
        sm:mt-[50px] p-1"
        style={{
            // width: `${350}px`,
            height: `${350}px`,
          }}
        >
        <GenericLineChart    dataLines={dataLines} info={firstCapitalize(t('stock_movements_graph_header'))}/>
          </div>
        </>
    )
}

)


export default StockDashboard;