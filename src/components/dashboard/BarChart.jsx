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



export const BarChart =React.memo(
     function BarChart({data,width=300,height=300,info,indexAxis='x'}) {
  const {t}=useTranslation();
  const graphContainerRef=useRef(null);
  const dispatch = useDispatch();
  const spendState = useSelector((state)=>state.spentState);
  const years = [];

  const options = {
  responsive: true,
  indexAxis: indexAxis,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '',
    },
  },
};

  useEffect(()=>{
    dispatch(fetchAnualSpents()); 
    dispatch(fetchMinYearSpents());
  },[]);


  if(spendState.minYear!=0){
    for(let index = spendState.minYear ; index <= (new Date().getFullYear()); index++)
      years.push(index);
  }else{
    years.push((new Date()).getFullYear());
  }

  return(
    <div className={`grid grid-rows-[50px_1fr] bg-white rounded shadow-md w-full  min-w-0`}>
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
    <div ref={graphContainerRef} style={{height:`${height}px`}} className={`transition-all duration-500 ease-in-out w-full h-full min-w-0 relative`}>
      <Bar 
      options={options}
      data={data} />
      
    </div>
  </div>
  )
}
)
