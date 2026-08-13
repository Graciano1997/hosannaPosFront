import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import CardTitle from '../general/CardTitle';
import { useTranslation } from 'react-i18next';
import { firstCapitalize } from '../../lib/firstCapitalize';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: '',
    },
  },
};

export const GenericLineChart =  React.memo(
  function GenericLineChart({respo=false, width=350,height=350,info, dataLines, dispatcher=()=>{}}) {
  
  const graphContainerRef=useRef(null);

  useEffect(()=>{
    dispatcher();
  },[]);

  return(
    <div className={`grid grid-rows-[50px_1fr] bg-white rounded shadow-md w-full h-full  min-w-0`}
    >
    <CardTitle>
         <h2 className="truncate">{firstCapitalize(info)}</h2>
    </CardTitle>
    <div className="transition-all duration-500 ease-in-out relative min-h-0 w-full ">
    <Line datasetIdKey='lineGraph' data={dataLines}/>
    </div>
  </div>
  )
}

)



