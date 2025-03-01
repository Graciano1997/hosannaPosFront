import React, { useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import CardTitle from '../general/CardTitle';
import { useTranslation } from 'react-i18next';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
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

export function BarChart({data,width=200,height=300,info}) {
  const {t}=useTranslation();
  const graphContainerRef=useRef(null);
  
  return(
    <div style={{height:height,width:width}} className={`grid grid-rows-[50px_auto] bg-white rounded shadow-md`}>
    <CardTitle title={info} />
    <div ref={graphContainerRef} style={{padding:2}} className='h-[100%]'>
      <Bar 
      style={{
        height:graphContainerRef.innerHeight,
        width:graphContainerRef.innerWidth
      }}
      options={options} data={data} />
      
    </div>
  </div>
  )
}
