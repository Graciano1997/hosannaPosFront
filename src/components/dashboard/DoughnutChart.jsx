import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
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
  Legend,
  ArcElement
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

export const GaugeChart = React.memo(
  function GaugeChart({
    value = 50,
    width = 300,
    height = 300,
    info
  }) {

    const gaugeData = {
      datasets: [
        {
          data: [value, 100 - value],
          backgroundColor: [
            '#18CA80',
            '#E5E7EB'
          ],
          borderWidth: 0,
          circumference: 180,
          rotation: -90,
          cutout: '70%',
        }
      ]
    };

    const gaugeOptions = {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        }
      }
    };

    return (      
    <div className={`grid grid-rows-[50px_1fr] bg-white rounded shadow-md w-full  min-w-0 `}>
        <CardTitle>
      <div className='flex justify-between items-center w-[100%] h-[100%]'>
         <h2 className="">{firstCapitalize(info)}</h2>
      </div>
    </CardTitle>

             <div className={`flex justify-center transition-all duration-500 ease-in-out p-2 w-full h-full min-w-0 relative `}
      style={{ height: `${height}px` }}
      >   <Doughnut
            data={gaugeData}
            options={gaugeOptions}
          />

          <div className="absolute inset-0 flex items-center justify-center translate-y-6">
            <span className="text-3xl text-gray-500">
              {value}%
            </span>
          </div>
        </div>

      </div>
    );
  }
);


// export const GaugeChart = React.memo(
//   function GaugeChart({data,width=300,height=300,info}){
  

//   const options = {
//     rotation: -90,
//     circumference: 180,
//     plugins: {
//       legend: {
//         display: false
//       }
//     }
//   };

  
//   return(
//     <DoughnutChart options={options} data={data} width={width} height={height} info={info} /> 
//   )
//   }
// )

export const DoughnutChart = React.memo(
    function DoughnutChart({data = [],width=300,height=300,info, options}) {
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
        '#18CA80',
        'rgb(255, 99, 132)'
      ],
      hoverOffset: 4
    }]
  };;

  useEffect(()=>{
    Promise.all([
     dispatch(fetchAnualSpents()),
     dispatch(fetchMinYearSpents())])
     
  },[]);

  for(let index = spendState.minYear ; index <= (new Date().getFullYear()); index++)
    years.push(index);

  return(
    <div className={`grid grid-rows-[50px_1fr] bg-white rounded shadow-md w-full  min-w-0`}>
    <CardTitle>
      <div className='flex justify-between items-center w-[100%] h-[100%]'>
         <h2 className="">{firstCapitalize(info)}</h2>
      </div>
    </CardTitle>
    <div  style={{padding:2}} className='h-[100%]'>

      <div className={`flex justify-center transition-all duration-500 ease-in-out w-full h-full min-w-0 relative `}
      style={{ height: `${height}px` }}
      >
    <Doughnut options={options} data={dataD}/>
    </div>   
    </div>
  </div>
  )
}
)

