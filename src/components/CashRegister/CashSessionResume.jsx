import {  EllipsisHorizontalIcon,ArrowUpTrayIcon, BanknotesIcon, ArrowDownTrayIcon, LockClosedIcon } from "@heroicons/react/16/solid";

import { useEffect, useState } from "react";
import { firstCapitalize } from "../../lib/firstCapitalize";
import Money from "../general/Money";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "../../slices/appSlice";
import { CashSessionReport, fetchCashSessionsMovements, setSelectedCashSession } from "../../slices/cashRegisterSlice";
import { DocumentChartBarIcon } from "@heroicons/react/24/solid";
import { CurrentUser } from "../../lib/CurrentUser";
import { Profiles } from "../../lib/Enums";
import { htmlToPDFGenerator } from "../../lib/generatePrinterInvoicer";
import { ExportCashSessionReport } from "../Report/ExportCashSessionReport";

export const CashSessionResume = ({session,t,currentSessionStyle,currentSession=false,handlerOpenCashClosing=()=>{}, handlerOpenCashReinforcement = ()=>{}, handlerOpenCashWithdrawal=()=>{}, company=[]})=>{
    const [showElipse,setShowElipse]=useState(true);
    const menuRef=useRef(null);
    const dispatch = useDispatch();
    const [master,setMaster]=useState(CurrentUser().profileId==Profiles.MASTER);

    useEffect(()=>{
        const handlerClick=(el)=>{
           if(menuRef.current && !menuRef.current.contains(el.target)){
            setShowElipse(true);
           } 
        }
        document.addEventListener('mousedown',handlerClick)

        return(()=>document.removeEventListener('mousedown',handlerClick))
    },[])

    return (
    <div
    key={session.id}
    className={`w-full rounded-lg border  ${currentSessionStyle} p-4 shadow-sm transition hover:shadow-md `}
  >
    {/* Header */}
    <div className="mb-4 flex items-center justify-between">
      <div>
        <p className="text-xs text-gray-500">{firstCapitalize(t('session'))} #{session.id}</p>
        <h3 className="text-base font-semibold text-gray-800">
          {firstCapitalize(t('cash_register'))} {session.cash_register}
        </h3>
      </div>

      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
          session.status === "open"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-600"
        }`}
      >
        {session.status === "open" ?  firstCapitalize(t('open')): firstCapitalize(t('close'))}
      </span>
    {
      <div className="relative">
        {showElipse && (<EllipsisHorizontalIcon onClick={()=>{setShowElipse(!showElipse)}} className="w-7 y-7 text-[#323232]  rounded cursor-pointer hover:shadow-sm"/>)}
               
        {!showElipse && 
        (        
        <ul ref={menuRef} className="absolute right-0 top-0  flex flex-col items-end gap-2 absolute  bg-white h-hull w-[200px] shadow-sm p-3">
        {
                master &&
                session.status === "open" &&
                <>
                    <li onClick={()=>{
                        handlerOpenCashReinforcement()
                        dispatch(setSelectedCashSession(session))
                    }} className="flex gap-2 items-center justify-center transition-all p-1 hover:shadow-md hover:cursor-pointer">
                    <span className="">{firstCapitalize(t('cash_reinforcement'))}</span><BanknotesIcon className="w-4 h-4"/>
                    </li>
                    <li onClick={()=>{
                        handlerOpenCashWithdrawal();
                        dispatch(setSelectedCashSession(session))
                    }} className="flex gap-2 items-center justify-center transition-all p-1 hover:shadow-md hover:cursor-pointer">
                        <span className="">{firstCapitalize(t('withdrawal'))}</span><ArrowUpTrayIcon className="w-4 h-4"/>
                    </li>
                </>     
        }
        {
          master &&
          session.status === "closed" &&  
        <li onClick={()=>{
                dispatch(CashSessionReport(session))
                .then((result)=>{
                    console.log(result)
                    if( result.payload.success){
                        const data =result.payload.data
                        const reportHTMLTemplate = ExportCashSessionReport(data,company);
                        console.log(reportHTMLTemplate)
                        htmlToPDFGenerator(reportHTMLTemplate,'',{orientation:'portrait',size:'A4'}, "session_report");
                    }
                })
            
                
        }} 
        className="flex gap-2 items-center justify-center  transition-all p-1 hover:shadow-md hover:cursor-pointer">
        <span className="">{firstCapitalize(t('cash_reporting'))}</span><DocumentChartBarIcon className="w-4 h-4"/>
        </li>
        }
          {
          session.status === "open" &&
        <li onClick={()=>{
            // dispatch(setSelectedCashSession(session))
            if(currentSession){
                if(session.status=="open"){
                    handlerOpenCashClosing();
                }else{
                    dispatch(showToast({warning:true, message:firstCapitalize(t('cash_session_already_closed')) }))
                }
            }else{
                dispatch(showToast({error:true, message:firstCapitalize(t('can_not_close_cash_session')) }))
            }
            }} className="flex gap-2 items-center justify-center  transition-all p-1 hover:shadow-md hover:cursor-pointer">
            <span className="text-red-600">{firstCapitalize(t('close_action'))}</span><LockClosedIcon className="text-red-600 w-4 h-4"/>
        </li>}
        </ul>
        )}

      </div>
    }
    </div>

    {/* Values */}
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      <div className="rounded-md bg-gray-50 p-3">
        <p className="text-xs text-gray-500">{firstCapitalize(t('opening_balance'))}</p>
        <p className="mt-1 text-sm font-bold text-gray-800">
          {<Money amount={session.opening_balance}/>}         </p>
      </div>

      <div className="rounded-md bg-gray-50 p-3">
        <p className="text-xs text-gray-500">{firstCapitalize(t('expected_balance'))}</p>
        <p className="mt-1 text-sm font-bold text-gray-800">
          {<Money amount={session.expected_balance}/> }
        </p>
      </div>

      <div className="rounded-md bg-gray-50 p-3">
        <p className="text-xs text-gray-500">{firstCapitalize(t('operator'))}</p>
        <p className="mt-1 text-sm font-medium text-gray-800">
          {session.user}
        </p>
      </div>
    </div>

    {/* Details */}
    <div className="mt-4 grid grid-cols-1 gap-2 border-t pt-3 text-sm sm:grid-cols-2">
      <div>
        <span className="text-gray-500">{firstCapitalize(t('opening'))}:</span>{" "}
        <span className="font-medium text-gray-700">
          {new Date(session.opened_at).toLocaleString("pt-AO")}
        </span>
      </div>

      <div>
        <span className="text-gray-500">{firstCapitalize(t('closing'))}:</span>{" "}
        <span className="font-medium text-gray-700">
          {session.closed_at
            ? new Date(session.closed_at).toLocaleString("pt-AO")
            : "—"}
        </span>
      </div>
    </div>
  </div>
    )
}

