
import React, { useEffect, useState } from "react";
import Table from "../Table/Table";

import { useDispatch, useSelector } from "react-redux";

import { fetchCashSessionsMovements, setCashSessionMovements} from "../../slices/cashRegisterSlice";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { Button } from "../general/Button";
import { Exporting } from "../../slices/appSlice";
import { DateTime } from "../../lib/auxiliar";

const filterDetails =['id','user_id','company_id','created_at','updated_at'];

export const CashSessionHistoricMovements = ({cashSession, dispatch,t})=>{
    const [fetchParam,setFetchParam]=useState();

    useEffect(()=>{
            dispatch(fetchCashSessionsMovements(cashSession));
    },[])

    const {cashSessionMovements} =useSelector((state) => state.cashRegisterState);
    
    return(
        <div className="flex flex-col">
                        <div className="mt-3 mb-3 w-full flex justify-between  ">
                            {
                                cashSessionMovements.length>0 &&
                                <>
                                <p className="mb-2 text-start text-sm hover:shadow-md font-medium">{firstCapitalize(t('cash_movements'))}</p>
                            <Button className="bg-green-200 p-3 rounded" content={firstCapitalize(t('export'))} onClickHandler={()=>{
                                
                                const collectionToExport= {
                                    exportName:`${firstCapitalize(t('session'))} #${cashSession.cash_register} - ${DateTime(cashSession.opened_at)} ${cashSession.closed_at ? `${firstCapitalize(t('until'))} ${DateTime(cashSession.closed_at)}`:`_`}   ▼`,
                                    model:`${firstCapitalize(t('session'))} #${cashSession.id} - ${cashSession.cash_register}`,
                                    data:cashSessionMovements}
                                    
                                    dispatch(Exporting(collectionToExport)); 
                                }} />
                            </>
                            }
                         
                        </div>

                    <Table rangeDataSelection={false} filterDetails={filterDetails}  setCollection={setCashSessionMovements} filterRows={['user_id','image']} collection={cashSessionMovements} update={null} deleteItem={null} fetcher={fetchCashSessionsMovements} fetcherParam={cashSession} dispatcher={fetchCashSessionsMovements} disableShowDetails={true}  create={null} />
                    </div>
    )
}