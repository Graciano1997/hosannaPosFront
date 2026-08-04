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

export const GenericLineChart = 
  function GenericLineChart({width=350,height=350,info, dataLines, dispatcher=()=>{}}) {
  
  const graphContainerRef=useRef(null);

  useEffect(()=>{
    dispatcher();
  },[]);

  return(
    <div className={`grid grid-rows-[50px_1fr] bg-white rounded shadow-md`}>
    <CardTitle>
      <div className='flex justify-between items-center'>
         <h2 className="">{firstCapitalize(info)}</h2>
      </div>
    </CardTitle>
      <div ref={graphContainerRef} className={`transition-all duration-500 ease-in-out flex justify-center w-[${width}] h-[${height}px] relative`}>
    <Line datasetIdKey='lineGraph' data={dataLines}/>
    </div>
  </div>
  )
}



