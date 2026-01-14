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

export function GenericLineChart({width=400,height=300,info, dataLines, dispatcher=()=>{}}) {
  
  const graphContainerRef=useRef(null);

  useEffect(()=>{
    dispatcher();
  },[]);

  return(
    <div style={{width:width, height:height }} className={`grid grid-rows-[50px_auto] hidden sm:block bg-white rounded shadow-md`}>
    <CardTitle>
      <div className='flex justify-between items-center w-[100%] h-[100%]'>
         <h2 className="">{firstCapitalize(info)}</h2>
      </div>
    </CardTitle>
    <div ref={graphContainerRef} style={{padding:2}} className='h-[100%] transition-all duration-500 ease-in-out'>
    <Line
  datasetIdKey='lineGraph'
  data={dataLines}
/>
    </div>
  </div>
  )
}
