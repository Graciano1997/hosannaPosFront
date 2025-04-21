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
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnualSpents, fetchMinYearSpents } from '../../slices/spentSlice';
import { annualMonths } from '../../lib/Months';

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

export function LineChart({data = [],width=200,height=300,info}) {
  
  const {t}=useTranslation();
  const graphContainerRef=useRef(null);
  const dispatch = useDispatch();
  const spendState = useSelector((state)=>state.spentState);
  const years = [];


  const dataLines = {
    labels: annualMonths.map((month)=>firstCapitalize(t(month))),
    datasets: [{
      label: firstCapitalize(t('income')),
      data: [10, 59, 80],
      fill: false,
      borderColor: 'rgb(54, 235, 108)',
      tension: 0.5
    },
    {
      label: firstCapitalize(t('spents')),
      data: [65, 10, 90, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.5
    },
    {
      label: firstCapitalize(t('expired')),
      data: [20, 59, 80, 60, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(255, 205, 86)',
      tension: 0.5
    }
    ],
  };

  useEffect(()=>{
    dispatch(fetchAnualSpents()); 
    dispatch(fetchMinYearSpents());
  },[]);

  for(let index = spendState.minYear ; index <= (new Date().getFullYear()); index++)
    years.push(index);

  return(
    <div className={`grid grid-rows-[50px_auto] hidden sm:block w-[${width}px] h-[${height}px] bg-white rounded shadow-md`}>
    <CardTitle>
      <div className='flex justify-between items-center w-[100%] h-[100%]'>
         <h2 className="">{firstCapitalize(info)}</h2>
         {years.length >0 && 
         <select onChange={(el)=>{
          dispatch(fetchAnualSpents(el.target.value));
         }} name="" id="" className='cursor-pointer p-1 rounded bg-white w-[20%] shadow outline-none'>
          {
            years.map((year)=>
              <option value={year}>{year}</option>
            )
          }
         </select>
         }
      </div>
    </CardTitle>
    <div ref={graphContainerRef} style={{padding:2}} className='h-[100%] transition-all duration-500 ease-in-out'>
      
    <Line
  datasetIdKey='lineesGraph'
  data={dataLines}
/>
      
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
