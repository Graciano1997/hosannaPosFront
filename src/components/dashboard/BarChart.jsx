import React, { useEffect, useRef } from 'react';
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
import { firstCapitalize } from '../../lib/firstCapitalize';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnualSpents, fetchMinYearSpents } from '../../slices/spentSlice';

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
  const dispatch = useDispatch();
  const spendState = useSelector((state)=>state.spentState);
  const years = [];

  useEffect(()=>{
    dispatch(fetchAnualSpents()); 
    dispatch(fetchMinYearSpents());
  },[]);

  for(let index = spendState.minYear ; index <= (new Date().getFullYear()); index++)
    years.push(index);

  return(
    <div style={{height:height,width:width}} className={`grid grid-rows-[50px_auto] bg-white rounded shadow-md`}>
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
