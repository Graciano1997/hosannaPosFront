import { useTranslation } from "react-i18next";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {  fetchPrinters, setPrinterConfig } from "../../slices/printerSlice";
import { showToast } from "../../slices/appSlice";
import { CurrentUser } from "../../lib/CurrentUser";

const Print = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const formHandler = (el)=>{
        setPrinterSetting({
            ...printerSetting,
            [el.target.name]: typeof el.target.value*1 == "number"? el.target.value*1:el.target.value
        });
    };

    const printerState = useSelector((state)=>state.printerState);
    const [printerSetting,setPrinterSetting]=useState({...JSON.parse(localStorage.getItem(`user-${CurrentUser.id}-printerConfiguration`))});


    return (
        <>
            <div className="w-100 h-[400px] grid grid-cols-2 gap-10  md:flex md:flex-row md:justify-between overflow-auto p-5">
                <div className="flex flex-col gap-5">
                    <label for="printertype" className="font-medium"> {firstCapitalize(t('printer_type'))}
                    </label>
                        <select name="printertype" defaultValue={printerState?.printerConfiguration.printertype} onChange={formHandler} id="printertype" className="p-1 rounded">
                            <option value="thermal80mm">{firstCapitalize(t('thermal_80mm'))}</option>
                            <option value="thermal58mm">{firstCapitalize(t('thermal_58mm'))}</option>
                            <option value="a4">{firstCapitalize(t('a4_office'))}</option>
                        </select>

                    <div className="flex flex-col gap-2">
                    <h3 className="font-medium">{firstCapitalize(t('connected_printers'))}</h3>
                    <select name="printer" onChange={formHandler} className="p-1 rounded" defaultValue={printerState.printerConfiguration?.printer}>
                    {
                        printerState.availablePrinters.length > 0 ? 
                        printerState.availablePrinters.map((printer)=>
                        <option value={printer}>{printer}</option>
                        ):(
                        <option disabled className="text-red-500">{firstCapitalize(t('no_printers'))}</option>
                        )
                    }
                    </select>

                    </div>

                <div className="flex flex-col gap-3">
                    <h3 className="font-medium">{firstCapitalize(t('finish_and_print'))}</h3>
                        <select name="finishAndprint" defaultValue={printerState.printerConfiguration?.finishAndprint} className="p-1 rounded" onChange={formHandler}>
                            <option value={true}>{firstCapitalize(t('yes'))}</option>
                            <option value={false}>{firstCapitalize(t('not'))}</option>
                        </select>
                </div>
                 </div>
                <div className="flex flex-col gap-3">
                    <label for="fontSelect" className="font-medium">{firstCapitalize(t('font_type'))}
                    </label>
                        <select name="fontFamily" id="fontSelect" defaultValue={printerState.printerConfiguration?.fontFamily} className="p-1 rounded" onChange={formHandler}>
                            <option value="Arial">Arial</option>
                            <option value="Helvetica">Helvetica</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Courier New">Courier New</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Verdana">Verdana</option>
                            <option value="Trebuchet MS">Trebuchet MS</option>
                            <option value="Lucida Console">Lucida Console</option>
                        </select>
                        <h3 className="font-medium">{firstCapitalize(t('size'))}</h3>
                    <label  className="flex justify-between gap-2">
                        {firstCapitalize(t('header'))}
                        <input type="number" name="headerSize" className="text-center" defaultValue={printerState.printerConfiguration?.headerSize}  onChange={formHandler} placeholder={`${firstCapitalize(t('header'))} (px)`}/>
                    </label>
                    <label  className="flex justify-between gap-2">
                        {firstCapitalize(t('body'))}
                        <input type="number" name="bodySize" className="text-center" defaultValue={printerState.printerConfiguration?.bodySize} onChange={formHandler} placeholder={`${firstCapitalize(t('body'))} (px)`} />
                    </label>
                    <label className="flex justify-between gap-2">
                        {firstCapitalize(t('note'))}
                        <input type="number" name="noteSize" className="text-center" defaultValue={printerState.printerConfiguration?.noteSize} onChange={formHandler} placeholder={`${firstCapitalize(t('note'))} (px)`} />
                    </label>

                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="font-medium">{firstCapitalize(t('print_from_browser'))}</h3>
                     <select name="print_from_browser" defaultValue={printerState.printerConfiguration?.print_from_browser} className="p-1 rounded" onChange={formHandler}>
                            <option value={true}>{firstCapitalize(t('yes'))}</option>
                            <option value={false}>{firstCapitalize(t('not'))}</option>
                    </select>
                    <h3 className="font-medium">{firstCapitalize(t('preview_before_printing'))}</h3>
                     <select name="previewBeforePrint" defaultValue={printerState.printerConfiguration?.previewBeforePrint} className="p-1 rounded" onChange={formHandler}>
                            <option value={true}>{firstCapitalize(t('yes'))}</option>
                            <option value={false}>{firstCapitalize(t('not'))}</option>
                    </select>

                                    </div>
                

                <div className="flex flex-col gap-1">
                    <label className="font-medium" htmlFor="">{firstCapitalize(t('copy_numbers'))}</label>
                    <input type="number" name="copyNumber" className="text-center" defaultValue={printerState.printerConfiguration?.copyNumber} onChange={formHandler} placeholder={firstCapitalize(t('copy_numbers'))} />
                </div>
                <div className="absolute bottom-[-40px] right-7  text-white flex gap-5">
                {/* <button onClick={()=>{console.log(printerSetting)}} className="rounded bg-emerald-500 p-2">{firstCapitalize(t('rescan_printers'))}</button> */}
                <button 
               onClick={() => {
                        dispatch(fetchPrinters()).then((resultAction) => {
                            if (fetchPrinters.fulfilled.match(resultAction)) {
                                dispatch(showToast({ success: true, message: firstCapitalize(t('printers_found')) }));
                            }
                            if(fetchPrinters.rejected.match(resultAction)) {
                                dispatch(showToast({ error:true, message: firstCapitalize(t('printers_server_error')) }));
                            }
                        });
                        }}
                className="rounded bg-gray-500 p-2">{firstCapitalize(t('rescan_printers'))}</button>
                <button onClick={()=>{console.log(printerSetting)}} className="rounded bg-blue-500 p-2">{firstCapitalize(t('print_test'))}</button>
                <button onClick={()=>{
                    dispatch(setPrinterConfig(printerSetting));
                }} className="rounded bg-green-200 p-2 text-black">{firstCapitalize(t('save'))}</button>
                </div>
            </div>
        </>
    )
};

export default Print;