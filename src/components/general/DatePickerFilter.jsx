import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { parseISO } from "date-fns";
import "react-day-picker/style.css";
import { format } from "date-fns";
import { pt,enUS, fr } from "react-day-picker/locale";
import { useTranslation } from "react-i18next";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { XMarkIcon } from "@heroicons/react/24/solid";


export const DatePickerFilter = ({ visibility,setVisibility, setRangeDate=()=>{}})=>{
    const [selected,setSelected]=useState(null);
    const inputRef = useRef(null);
    const {t,i18n}=useTranslation();
    const calendarPickerRef = useRef();

    useEffect(()=>{
        // const handlerClickOutSide = (event)=>{
        //       if (calendarPickerRef.current && !calendarPickerRef.current.contains(event.target)) {
        //          setVisibility(false);
        //         }
        // };

        // document.addEventListener("mousedown",handlerClickOutSide);
        // return ()=>document.removeEventListener("mousedown",handlerClickOutSide);
    },[]);


    let locale;

    switch (i18n.language) {
    case "pt":
        locale = pt;
        break;
    case "en":
        locale = enUS;
        break;
    case "fr":
        locale = fr;
        break;
    default:
        locale = enUS; 
    }

    return(
        <>        
        {visibility &&
        <div style={{zIndex:5000}} ref={calendarPickerRef} className="bg-white p-3 absolute rounded shadow  text-sm max-w-full">
    <DayPicker
        captionLayout="dropdown"
        animate
        mode="range"
        selected={selected}
        onSelect={(date)=>{
            setSelected(date);
            setRangeDate({from:format(date.from,"yyyy-MM-dd"),to:format(date.to,"yyyy-MM-dd")})
         }}     
        classNames={{
            today:`bg-green-800 text-white rounded`,
            selected: `bg-[#333] rounded shadow text-white`,
            range: "bg-green-300 text-green-900",
            range_start: "rounded-l-lg bg-green-600 text-white",
            range_middle:"bg-black text-white",
            range_end: "rounded-r-lg bg-green-600 text-white",
            chevron: `fill-green-500`,
        }}
        
        locale={locale }
        labels={{
            labelDayButton: (date, { today, selected }) => {
            let label = format(date, "PPPP", { locale: locale });
            if (today) label = `Oggi, ${label}`;
            if (selected) label = `${label}, selecionado`;
            return label;
            },
            labelWeekNumber: (weekNumber) => ` ${t('week')} ${weekNumber}`,
            labelNext: () => t('label_next'),
            labelPrevious: () => t('label_previous') ,
            labelMonthDropdown: () => t('label_month_dropdown'),
            labelYearDropdown: () => t('label_year_dropdown'),
        }}
        footer={
            <div className="flex gap-3 mt-[5px]">
      
            {                
                selected?.from && selected?.to &&
                <>
                <button  onClick={()=>{
               setVisibility(false)
            }} className="p-1 rounded bg-green-200" >{t('confirm')} </button>
                      
                <button  onClick={()=>{
                    setRangeDate({from:null, to:null});
                setSelected(null);
                setVisibility(false);
            }} className="p-1 shadow rounded" ><XMarkIcon className="w-6 h-6 text-red-500" /></button>
            </>
            }
            </div>
        }
        />
        </div>       
        }
    </>
        )
}