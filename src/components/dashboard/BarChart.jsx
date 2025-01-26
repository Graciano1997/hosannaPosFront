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

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Saida',
      data: labels.map(() => Math.random()*100),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Entrada',
      data: labels.map(() => Math.random()*100),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function BarChart({width=200,height=300,info}) {
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
