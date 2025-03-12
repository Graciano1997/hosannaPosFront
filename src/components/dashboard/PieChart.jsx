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
import { firstCapitalize } from '../../lib/firstCapitalize';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export const options = {
  responsive:true,
  plugins:{legend:false},
  title: {
    display: false,
    text: '',
  }
}

export function PieChart({width=350,height=350,info,data}) {
  const graphContainerRef=useRef(null);

  return(
    <div className={` w-[${width}px] h-[${height}px] grid grid-rows-[50px_auto] bg-white rounded shadow-md`}>
    <CardTitle>
      <p className='text-center'>{firstCapitalize(info)}</p>
    </CardTitle>
    <div ref={graphContainerRef} className='cursor-pointer flex items-center p-2 justify-center w-[350px] h-[350px]'>
      <Pie options={options} data={data} />      
    </div>
  </div>
  )
}
