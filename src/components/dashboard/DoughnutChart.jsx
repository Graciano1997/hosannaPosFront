import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import { Doughnut } from 'react-chartjs-2';
import CardTitle from '../general/CardTitle';
import { useTranslation } from 'react-i18next';
import { firstCapitalize } from '../../lib/firstCapitalize';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnualSpents, fetchMinYearSpents } from '../../slices/spentSlice';

ChartJS.register(
  CategoryScale,
  LinearScale,
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

export function DoughnutChart({data = [],width=150,height=150,info}) {
  const {t}=useTranslation();
  const graphContainerRef=useRef(null);
  const dispatch = useDispatch();
  const spendState = useSelector((state)=>state.spentState);
  const years = [];

  const dataD = {
    labels: [
      firstCapitalize(t('income')),
      firstCapitalize(t('output'))
    ],
    datasets: [{
      label: firstCapitalize(t('amount')),
      data: data,
      backgroundColor: [
        'rgb(34, 197, 94)',
        'rgb(255, 99, 132)'
      ],
      hoverOffset: 4
    }]
  };;

  useEffect(()=>{
    // dispatch(fetchAnualSpents()); 
    dispatch(fetchMinYearSpents());
  },[]);

  for(let index = spendState.minYear ; index <= (new Date().getFullYear()); index++)
    years.push(index);

  return(
    <div className={`grid grid-rows-[50px_auto] w-[${width}px] h-[${height}px] bg-white rounded shadow-md`}>
    <CardTitle>
      <div className='flex justify-between items-center w-[100%] h-[100%]'>
         <h2 className="">{firstCapitalize(info)}</h2>
      </div>
    </CardTitle>
    <div ref={graphContainerRef} style={{padding:2}} className='h-[100%]'>

   <div className='w-full h-70 relative'>
    <Doughnut data={dataD}/>
    </div>   
    
      {/* <Line
      ref={graphContainerRef} 
      style={{
        height:graphContainerRef.innerHeight,
        width:graphContainerRef.innerWidth
      }}
      options={options} data={data} />
       */}
    </div>
  </div>
  )
}
