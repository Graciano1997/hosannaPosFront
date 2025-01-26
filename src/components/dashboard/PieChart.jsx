import React, { useRef } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  plugins,
} from 'chart.js';

import { Pie } from 'react-chartjs-2';
import CardTitle from '../general/CardTitle';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);


const labels = ['Analgesicos', 'outros', 'Antibiotio', 'Antipiretico', 'Purple', 'Orange'];

export const options = {
  responsive:true,
  plugins:{legend:false},
  title: {
    display: false,
    text: '',
  }
}
export const data = {
  labels,
  datasets: [
    {
      label: 'total',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export function PieChart({width=400,height=420,info}) {
  const graphContainerRef=useRef(null);

  return(
    <div style={{width:`${width}px`,height:`${height}px`}}  className={`grid grid-rows-[50px_auto] bg-white rounded shadow-md`}>
    <CardTitle title={info} />
    <div ref={graphContainerRef} style={{padding:2,height:`${400}px`,width:`${400}px`}} className='flex items-center justify-center'>
      <Pie 
      options={options}

       data={data} />      
    </div>
  </div>
  )
}
