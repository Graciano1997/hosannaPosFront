
import React, { useEffect, useState } from "react";
import Table from "../Table/Table";

import { useDispatch, useSelector } from "react-redux";

import { fetchCashSessionsMovements, setCashSessionMovements} from "../../slices/cashRegisterSlice";
import { Button } from "../general/Button";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { DateTime } from "../../lib/auxiliar";

const filterDetails =['id','user_id','company_id','created_at','updated_at'];

export const CashSessionMovements = ({cashSessions, dispatch,t})=>{
    const [activeCashRegisterIndex,setActiveCashRegisterIndex]=useState(0);
    const [fetchParam,setFetchParam]=useState();
    
    useEffect(()=>{
        if(cashSessions.length>0){
            const firstCashSession = cashSessions[0];
            dispatch(fetchCashSessionsMovements(firstCashSession));
        }
    },[])

    const {cashSessionMovements} =useSelector((state) => state.cashRegisterState);

    return(
        <div className="flex flex-col">

                        <div className="mt-3 mb-3 w-full sm:w-1/1 overflow-x-auto self-center sm:self-end  ">
                          <p className="mb-2 text-end text-sm font-medium text-gray-600">{firstCapitalize(t('select_register'))}</p>
                        <div className="overflow-x-auto mt-3">
                        {cashSessions.length>0
                        &&
                        <div className="flex w-max min-w-full justify-end gap-5 p-2">

                        {
                        cashSessions.
                        filter((session)=>session.status=='open').
                        map((session,index)=>(
                                                        <>
                         <Button content={<span className="font-medium">{`${firstCapitalize(t('session'))} #${session.cash_register} - ${DateTime(session.opened_at)} ▼`}</span>} onClickHandler={()=>{
                             setFetchParam(session)
                             setActiveCashRegisterIndex(index)
                             dispatch(fetchCashSessionsMovements(session));
                            }} className={`h-[50px]  rounded transition-all shadow hover:shadow-md flex justify-center p-2 ${activeCashRegisterIndex==index?'border border-green-200':''}  items-center bg-white`} type="button" />
                            </>
                        )

                       ) 
                        }
                        </div>
   
                        }
                        </div>
                        </div>

                    <Table rangeDataSelection={false} filterDetails={filterDetails}  setCollection={setCashSessionMovements} filterRows={['user_id','image']} collection={cashSessionMovements} update={null} deleteItem={null} fetcher={fetchCashSessionsMovements} fetcherParam={fetchParam} dispatcher={fetchCashSessionsMovements}  create={null} />
                    </div>
    )
}