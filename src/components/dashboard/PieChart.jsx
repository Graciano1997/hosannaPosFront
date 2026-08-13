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

export const PieChart= React.memo(
   function PieChart({width=350,height=350,info,data}) {
  const graphContainerRef=useRef(null);

  return(
     <div className={`grid grid-rows-[50px_1fr] bg-white rounded shadow-md w-full  min-w-0`}>
    <CardTitle>
      <div className='flex justify-between items-center'>
         <h2 className="">{firstCapitalize(info)}</h2>
      </div>
    </CardTitle>
      <div ref={graphContainerRef} className={`flex justify-center transition-all duration-500 ease-in-out w-full min-w-0 relative `}
      style={{ height: `${height}px` }}
      >
     <Pie options={options} data={data} />  
    </div>
  </div>
  
    
  )
}
)
