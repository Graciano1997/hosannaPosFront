import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { parseISO } from "date-fns";
import "react-day-picker/style.css";
import { format } from "date-fns";
import { pt,enUS, fr } from "react-day-picker/locale";
import { useTranslation } from "react-i18next";


export const DatePicker = ({name, value, mode, dataSetHandler=(el)=>{}})=>{
    const [selected,setSelected]=useState(value ? parseISO(value) : null);
    const [visibility,setVisibility]=useState(false);
    const inputRef = useRef(null);
    const {t,i18n}=useTranslation();
    const calendarPickerRef = useRef();

    useEffect(()=>{
        const handlerClickOutSide = (event)=>{
              if (calendarPickerRef.current && !calendarPickerRef.current.contains(event.target)) {
                setVisibility(false);
                }
        };

        document.addEventListener("mousedown",handlerClickOutSide);
        return ()=>document.removeEventListener("mousedown",handlerClickOutSide);
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
        <input type='date'  ref={inputRef} 
        name={name}
         onClick={()=>{
            setVisibility(true);
        }}  value={ value ? value : null} readOnly className='p-1 rounded w-[100%] outline-none' />
        {visibility &&
        <div ref={calendarPickerRef} className="absolute bg-white p-3 rounded shadow mt-[-12%] text-sm max-w-full">
    <DayPicker
        captionLayout="dropdown"
        animate
        mode={mode}
        selected={selected}
        onSelect={(date)=>{
            setSelected(date);
            setVisibility(false);
             if (inputRef.current && date) {
                inputRef.current.value = format(date, "yyyy-MM-dd");
            }
            const datapicker=true;

            dataSetHandler(inputRef.current,datapicker);
         }}
        classNames={{
            today:`bg-[#333] text-white rounded`,
            selected: `bg-green-500 rounded shadow text-white`,
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
        />
        </div>       
        }
    </>
        )
}