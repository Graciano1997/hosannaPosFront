import React, { useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PieController
} from 'chart.js';
import { Bar,Pie } from 'react-chartjs-2';
import CardTitle from './CardTitle';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PieController,
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
      data:20,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Entrada',
      data: 50,
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function PieChart({width=200,height=300,info}) {
  const graphContainerRef=useRef(null);

  return(
    <div style={{height:height,width:width}} className={`grid grid-rows-[50px_auto] bg-white rounded shadow-md`}>
    <CardTitle title={info} />
    <div ref={graphContainerRef} style={{padding:2}} className='h-[100%]'>
      <Pie 
      style={{
        height:graphContainerRef.innerHeight,
        width:graphContainerRef.innerWidth
      }}
      options={options} data={data} />      
    </div>
  </div>
  )
}
