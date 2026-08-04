import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../general/Modal";
import Money from "../general/Money";
import { stateDisplay, textDisplay } from "../../lib/activeDisplay";
import { useTranslation } from "react-i18next";
import { UserIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { useLocation, useNavigate } from "react-router-dom";
import { getSaleInvoiceItem, setRefenceSale } from "../../slices/saleSlice";
import { fetchProductSaleHistory, fetchProductStockHistory} from "../../slices/productSlice";
import { rootpath } from "../../lib/ip";
import { GenericLineChart } from "../dashboard/GenericLineChart";
import { CurrentMonthIntervalDays,annualMonths, DayInterval } from "../../lib/Months";
import { format } from "date-fns";
import { pt,enUS, fr } from "react-day-picker/locale";
import { Button } from "../general/Button";
import { DayPicker } from "react-day-picker";
import i18n from "../../i18n";

const movementTypeColor ={entry:"bg-green-500",exit:"bg-red-500",return:"bg-purple-500",adjustment:"bg-blue-500",expired:"bg-yellow-400"}
const moneyFields = ['price','total', 'amount', 'cost_price','discount','difference','received_cash'];

/*
Generic pendent
const GenericGraphDetails =React.memo(({title, itemId,dataLines,dataHistory, fetcherData=()=>{}})=>{

        const {t}= useTranslation();
        const [selected,setSelected]=useState()
        const [selectedInterval,setSelectedInterval]=useState(CurrentMonthIntervalDays())
        const currentDate = new Date();
        const [dayRange,setDayRange]=useState({from:new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),to:new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)})
        const dispatch=useDispatch()
        
        // const productSaleHistory = useSelector((state)=>state.productState.productSaleHistory);

        useEffect(()=>{
            dispatch(fetcherData({id:itemId,from:format(dayRange.from,"yyyy-MM-dd"),to:format(dayRange.to,"yyyy-MM-dd")}))
            // dispatch(fetchProductSaleHistory({id:itemId,from:format(dayRange.from,"yyyy-MM-dd"),to:format(dayRange.to,"yyyy-MM-dd")}))
        },[dispatch,itemId,dayRange])
        
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
        <div>
            <h1 className="text-xl font-bold mt-[70px] text-center">{title}</h1>
            <div className="flex justify-around items-center flex-wrap mt-[30px] gap-5">
            <DayPicker
                captionLayout="dropdown"
                animate
                mode="range"
                disabled={{ before: new Date(2020, 0, 1), after: new Date() }}
                
                selected={selected}
                onMonthChange={(month)=>{
                    // this will ensure never get the selected range outside the current month
                    if(month.getMonth()!==startDate.getMonth() && month.getMonth()!==endDate.getMonth()){
                        setSelected({from:null,to:null});
                    }
                    }}
                
                onSelect={(date)=>{ setSelected(date); }}     
                classNames={{
                    today:`bg-green-800 text-white rounded`,
                    selected: `bg-[#333] rounded shadow text-white`,
                    range: "bg-green-300 text-green-900",
                    range_start: "rounded-l-lg bg-green-500 text-white",
                    range_middle:"bg-[#333] text-white",
                    range_end: "rounded-r-lg bg-green-500 text-white",
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

                        if(selected.from!=undefined && selected.to!=undefined ){
                            const dateInterval = {from:format(selected.from,"yyyy-MM-dd"),to:format(selected.to,"yyyy-MM-dd")}
                            const interval = DayInterval(dateInterval);
                            setSelectedInterval(interval);
                            setDayRange({from:selected.from,to:selected.to})
                        }
                    // setSearching(false);
                    }} className="p-1 rounded bg-green-200 text-black" >{t('confirm')} </button>

                        <button  onClick={()=>{
                        setSelected(null);
                        setDayRange({from:new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),to:new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)})
                        setSelectedInterval(CurrentMonthIntervalDays())
                    }} className="p-1 shadow rounded" ><XMarkIcon className="w-6 h-6 text-red-500" /></button>
                    </>
                    }
                    </div>
                    }
            />
            <div className="mt-8 flex justify-around flex-wrap  gap-10">
                <GenericLineChart width={300} height={300} dataLines={dataLines} info={title}  />
            </div>
        </div>
        </div>
    )
}) 
*/

const GraphDetails =React.memo(
    ({title, itemId})=>{

        const {t}= useTranslation();
        const [query,setQuery]=useState()
        const [selected,setSelected]=useState()
        const [selectedInterval,setSelectedInterval]=useState(CurrentMonthIntervalDays())
        const currentDate = new Date();
        const [dayRange,setDayRange]=useState({from:new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),to:new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)})
        const dispatch=useDispatch()
        
        const productSaleHistory = useSelector((state)=>state.productState.productSaleHistory);

        useEffect(()=>{
            dispatch(fetchProductSaleHistory({id:itemId,from:format(dayRange.from,"yyyy-MM-dd"),to:format(dayRange.to,"yyyy-MM-dd")}))

        },[itemId,dayRange])
        

        const dataLines = useMemo(() => ({
        labels: selectedInterval,
        datasets: [
            {
                label: firstCapitalize(t("day_vs_quantity")),
                data: selectedInterval.map((day) => productSaleHistory?.[day] ?? 0),
                fill: false,
                borderColor: "#18CA80",
                tension: 0.5
            },
        ]
        }), [selectedInterval,productSaleHistory,t]);
        
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
        <div>
            <h1 className="text-xl font-bold mt-[70px] text-center">{title}</h1>
            <div className="flex justify-around items-center flex-wrap mt-[30px] gap-5">
            <DayPicker
                captionLayout="dropdown"
                animate
                mode="range"
                disabled={{ before: new Date(2020, 0, 1) }}
                
                selected={selected}
                onMonthChange={(month)=>{
                    // this will ensure never get the selected range outside the current month
                    // if(month.getMonth()!==startDate.getMonth() && month.getMonth()!==endDate.getMonth()){
                    //     setSelected({from:null,to:null});
                    // }
                    }}
                
                onSelect={(date)=>{ setSelected(date); }}     
                classNames={{
                    today:`bg-green-800 text-white rounded`,
                    selected: `bg-[#333] rounded shadow text-white`,
                    range: "bg-green-300 text-green-900",
                    range_start: "rounded-l-lg bg-green-500 text-white",
                    range_middle:"bg-[#333] text-white",
                    range_end: "rounded-r-lg bg-green-500 text-white",
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

                        if(selected.from!=undefined && selected.to!=undefined ){
                            const dateInterval = {from:format(selected.from,"yyyy-MM-dd"),to:format(selected.to,"yyyy-MM-dd")}
                            const interval = DayInterval(dateInterval);
                            setSelectedInterval(interval);
                            setDayRange({from:selected.from,to:selected.to})
                        }
                    // setSearching(false);
                    }} className="p-1 rounded bg-green-200 text-black" >{t('confirm')} </button>

                        <button  onClick={()=>{
                            setQuery((prev)=>({ 
                                ...prev,    
                                rangeDate:{from:null,to:null},
                            }))
                        setSelected(null);
                        setDayRange({from:new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),to:new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)})
                        setSelectedInterval(CurrentMonthIntervalDays())
                    }} className="p-1 shadow rounded" ><XMarkIcon className="w-6 h-6 text-red-500" /></button>
                    </>
                    }
                    </div>
                    }
            />
            <div className="mt-8 flex justify-around flex-wrap  gap-10">
                <GenericLineChart width={300} height={300} dataLines={dataLines} info={title}  />
                
                {/* <GenericLineChart width={300} height={300} dataLines={dataLines} info={firstCapitalize(t('product_stock_movements'))}  /> */}
            </div>
        </div>
        </div>
    )
}) 

const GraphDetailsStock =React.memo(
    ({title, itemId})=>{

        const {t}= useTranslation();
        const [query,setQuery]=useState()
        const [selected,setSelected]=useState()
        const [selectedInterval,setSelectedInterval]=useState(CurrentMonthIntervalDays())
        const currentDate = new Date();
        const [dayRange,setDayRange]=useState({from:new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),to:new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)})
        const dispatch=useDispatch()
        
        const productStockHistory = useSelector((state)=>state.productState.productStockHistory);

        useEffect(()=>{
            dispatch(fetchProductStockHistory({id:itemId,from:format(dayRange.from,"yyyy-MM-dd"),to:format(dayRange.to,"yyyy-MM-dd")}))
        },[itemId,dayRange])
        

        const dataLines = useMemo(() => ({
        labels: selectedInterval,
        datasets: [
            {
                label: firstCapitalize(t("day_vs_quantity")),
                data: selectedInterval.map((day) => productStockHistory?.[day] ?? 0),
                fill: false,
                borderColor: "#18CA80",
                tension: 0.5
            },
        ]
        }), [selectedInterval,productStockHistory,t]);
        
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
        <div>
            <h1 className="text-xl font-bold mt-[70px] text-center">{title}</h1>
            <div className="flex justify-around items-center flex-wrap mt-[30px] gap-5">
            <DayPicker
                captionLayout="dropdown"
                animate
                mode="range"
                disabled={{ before: new Date(2020, 0, 1), after: new Date() }}
                
                selected={selected}
                onMonthChange={(month)=>{
                    // this will ensure never get the selected range outside the current month
                    if(month.getMonth()!==startDate.getMonth() && month.getMonth()!==endDate.getMonth()){
                        setSelected({from:null,to:null});
                    }
                    }}
                
                onSelect={(date)=>{ setSelected(date); }}     
                classNames={{
                    today:`bg-green-800 text-white rounded`,
                    selected: `bg-[#333] rounded shadow text-white`,
                    range: "bg-green-300 text-green-900",
                    range_start: "rounded-l-lg bg-green-500 text-white",
                    range_middle:"bg-[#333] text-white",
                    range_end: "rounded-r-lg bg-green-500 text-white",
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

                        if(selected.from!=undefined && selected.to!=undefined ){
                            const dateInterval = {from:format(selected.from,"yyyy-MM-dd"),to:format(selected.to,"yyyy-MM-dd")}
                            const interval = DayInterval(dateInterval);
                            setSelectedInterval(interval);
                            setDayRange({from:selected.from,to:selected.to})
                        }
                    // setSearching(false);
                    }} className="p-1 rounded bg-green-200 text-black" >{t('confirm')} </button>

                        <button  onClick={()=>{
                            setQuery((prev)=>({ 
                                ...prev,    
                                rangeDate:{from:null,to:null},
                            }))
                        setSelected(null);
                        setDayRange({from:new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),to:new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)})
                        setSelectedInterval(CurrentMonthIntervalDays())
                    }} className="p-1 shadow rounded" ><XMarkIcon className="w-6 h-6 text-red-500" /></button>
                    </>
                    }
                    </div>
                    }
            />
            <div className="mt-8 flex justify-around flex-wrap  gap-10">
                <GenericLineChart width={300} height={300} dataLines={dataLines} info={title}  />
            </div>
        </div>
        </div>
    )
}) 

const Details = React.memo(({closeDetails,filterDetails=[],rowStyle, itemDetails}) =>{
 
    let keys = Object.keys(itemDetails);
    const {pathname}=useLocation();  
    const hasImage = itemDetails.image_url ? true : false;

    keys = keys.filter((item) => !filterDetails.includes(item));
    const {t}= useTranslation();
    const navegate = useNavigate();
    const dispatch = useDispatch();


    return(
        <Modal helper={closeDetails}>
            <div className="flex p-2">
            <div className="w-[100%]">
                <h4 className="text-3xl font-light text-end">{ firstCapitalize(t('details'))}</h4>
                
                <div className={`mt-[2rem] p-1 ${hasImage?'grid gap-[2rem] justify-center':'flex'}`} style={{gridTemplateColumns:`${ hasImage ?'10fr 90fr':'100fr'}`}}>      
                
                { 
                hasImage &&
                 <div className="h-[100%]">
                <div className="w-[250px] h-[300px] sm:shadow-lg rounded-[16px]">
                    {itemDetails.image==="none" && <UserIcon className="w-[100%] h-[100%] rounded-[16px]"/> }
                    {itemDetails.image!=="none" &&  <img src={itemDetails.image_url} className="w-[100%] h-[100%] rounded-[16px]" />}
                </div>
                </div>
                }
                
                <div className="flex flex-col w-[100%] h-[400px] p-3 rounded sm:shadow overflow-y-scroll">
                <div className="flex flex-wrap mt-2 gap-5 justify-center">
                {keys.map((item)=>
                <div className="flex flex-col gap-1 shadow-lg p-2 bg-white rounded m-1 cursor-pointer" style={{width:`${hasImage?'45%':'30%'}`, height:'fit-content'}}>
                    <p className={`p-1 bg-white font-bold`}>{ firstCapitalize(t(item))}</p>
                    <p className="font-light truncate">

                    {item=="movement_type" &&  
                        (<span className="flex items-center gap-2"><span className={`w-3 h-3 rounded ${movementTypeColor[itemDetails[item]]}`}></span>{t(itemDetails[item])}
                        </span>)
                    }
                    {moneyFields.includes(item) &&  <Money amount={itemDetails[item]} />}
                    {typeof (itemDetails[item]) == "boolean" && stateDisplay(itemDetails[item]) }
                    
                    {!moneyFields.includes(item) && typeof(itemDetails[item]) != "boolean" && item!="movement_type" &&  itemDetails[item] ? itemDetails[item]: ''}
                    </p>
                </div>
                )}

                {
                    itemDetails.payment_way	&&
                    itemDetails.sale_products.length>0 
                    && !itemDetails.invoice_number.includes('NC')
                    &&
                    <div className="flex flex-col gap-1 shadow-lg p-2 bg-white rounded m-1 cursor-pointer w-[100%]">
                    <h2 className="text-end text-xl p-1">{firstCapitalize(t('sold_products'))}</h2>
                    <div className="shadow p-2 overflow-x-auto">
                    <div className="min-w-max">
                        {/* Header */}
                        <div className="grid grid-cols-8 gap-8 p-4 font-bold border-b">
                        {Object.keys(itemDetails.sale_products[0]).map((item) => (
                            <p key={item}>{firstCapitalize(t(item))}</p>
                        ))}
                        </div>

                        {/* Rows */}
                        {itemDetails.sale_products.map((item, index) => (
                        <div
                            key={item.id}
                            className={`grid grid-cols-8 gap-8 p-2 hover:shadow ${
                            index % 2 === 0 ? "bg-green-50" : ""
                            }`}
                        >
                            <p>{item.id}</p>
                            <p>{item.code}</p>
                            <p>{item.name}</p>
                            <p>{item.qty}</p>
                            <p>{item.discount}</p>
                            <p>{item.taxes}</p>
                            <p><Money amount={item.price} /></p>
                            <p><Money amount={item.subtotal} /></p>
                        </div>
                ))}
                

            </div>
            </div>
            </div>
            }

                </div>
                {pathname==`${rootpath}products` && itemDetails.id &&
                <GraphDetails  itemId={itemDetails.id} title={`${itemDetails.name} - ${firstCapitalize(t('product_sales_history'))}`}/>
                }
                {/* <GraphDetailsStock  itemId={itemDetails.id} title={`${itemDetails.name} - ${firstCapitalize(t('product_stock_movements'))}`}/> */}
                
                </div>
                </div>


                <div className="mt-[2rem] gap-3 flex justify-end">
                    {
                    pathname==`${rootpath}sales`  && itemDetails.sale_products.length>0 
                    && !itemDetails.invoice_number.includes('NC') 
                    && 
                    <button
                    onClick={()=>{
                        dispatch(setRefenceSale(itemDetails.invoice_number));
                        dispatch(getSaleInvoiceItem({devolution:true, invoice_number: itemDetails.invoice_number }))
                        navegate(`${rootpath}sale/devolution`)}}
                    className="bg-red-300 p-2 rounded hover:shadow"> {firstCapitalize(t('returning'))}</button>}
                </div>

            </div>
            </div>
        </Modal>
    )
}
);

export default Details;
