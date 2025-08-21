import { useTranslation } from "react-i18next";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const Print = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [printerSetting,setPrinterSetting]=useState({});

    const formHandler = (el)=>{
        setPrinterSetting({
            ...printerSetting,
            [el.target.name]: typeof el.target.value*1 == "number"? el.target.value*1:el.target.value
        });
    };

    return (
        <>
            <div className="w-100 h-[400px] grid grid-cols-2 gap-10  md:flex md:flex-row md:justify-between overflow-auto p-5">
                <div className="flex flex-col gap-5">
                    <label for="printertype" className="font-medium"> {firstCapitalize(t('printer_type'))}
                    </label>
                        <select name="printertype" onChange={formHandler} id="printertype" className="p-1 rounded">
                            <option value="thermal80mm">{firstCapitalize(t('thermal_80mm'))}</option>
                            <option value="thermal58mm">{firstCapitalize(t('thermal_58mm'))}</option>
                            <option value="a4">{firstCapitalize(t('a4_office'))}</option>
                        </select>

                    <div className="flex flex-col gap-2">
                    <h3 className="font-medium">{firstCapitalize(t('connected_printers'))}</h3>
                    <label className="flex gap-1">
                    <input type="radio" name="printer" onChange={formHandler} value="A4"/>
                    A4 
                    </label>
                    <label className="flex gap-1">
                    <input type="radio" name="printer" onChange={formHandler} value="Epsolom" />
                    Epsolom
                    </label>
                    </div>

                <div className="flex flex-col gap-5">
                    <h3 className="font-medium">{firstCapitalize(t('finish_and_print'))}</h3>
                        <select name="finishAndprint" className="p-1 rounded" onChange={formHandler}>
                            <option value={true}>{firstCapitalize(t('yes'))}</option>
                            <option value={false}>{firstCapitalize(t('not'))}</option>
                        </select>
                </div>
                 </div>
                <div className="flex flex-col gap-5">
                <h3 className="font-medium">{firstCapitalize(t('margins'))}</h3>
                        <div className="flex flex-col gap-2">
                        <label  className="flex justify-between gap-2">
                        {firstCapitalize(t('margin_top'))}
                        <input type="number" name="marginTop" onChange={formHandler} placeholder={`${firstCapitalize(t('margin_top'))} (px)`} />
                    </label>
                     <label className="flex justify-between gap-2">
                        {firstCapitalize(t('margin_bottom'))}
                        <input type="number" name="marginBottom" onChange={formHandler} placeholder={`${firstCapitalize(t('margin_bottom'))} (px)`} />
                    </label>
                        </div>

                    <label for="fontSelect" className="font-medium">{firstCapitalize(t('font_type'))}
                    </label>
                        <select name="fontFamily" id="fontSelect" className="p-1 rounded" onChange={formHandler}>
                            <option value="Arial">Arial</option>
                            <option value="Helvetica">Helvetica</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Courier New">Courier New</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Verdana">Verdana</option>
                            <option value="Trebuchet MS">Trebuchet MS</option>
                            <option value="Lucida Console">Lucida Console</option>
                        </select>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="font-medium">{firstCapitalize(t('size'))}</h3>
                    <label  className="flex justify-between gap-2">
                        {firstCapitalize(t('header'))}
                        <input type="number" name="headerSize" onChange={formHandler} placeholder={`${firstCapitalize(t('header'))} (px)`}/>
                    </label>
                    <label  className="flex justify-between gap-2">
                        {firstCapitalize(t('body'))}
                        <input type="number" name="bodySize" onChange={formHandler} placeholder={`${firstCapitalize(t('body'))} (px)`} />
                    </label>
                    <label className="flex justify-between gap-2">
                        {firstCapitalize(t('note'))}
                        <input type="number" name="noteSize" onChange={formHandler} placeholder={`${firstCapitalize(t('note'))} (px)`} />
                    </label>
                </div>

                <div className="flex flex-col gap-1">
                        <label className="font-medium" htmlFor="">{firstCapitalize(t('copy_numbers'))}</label>
                        <input type="number" name="copyNumber" onChange={formHandler} placeholder="Quantidades de vias" defaultValue={2} />
                </div>
                <div className="absolute bottom-[-40px] right-7  text-white flex gap-5">
                <button onClick={()=>{console.log(printerSetting)}} className="rounded bg-blue-500 p-2">{firstCapitalize(t('print_test'))}</button>
                <button className="rounded bg-green-200 p-2 text-black">{firstCapitalize(t('save'))}</button>
                </div>
            </div>
        </>
    )
};

export default Print;