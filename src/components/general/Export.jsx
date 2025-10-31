import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { firstCapitalize } from "../../lib/firstCapitalize";
import ExportButton from "../ExportButton";
import { DatePickerFilter } from "./DatePickerFilter";
import searchCollection from "../../lib/seach";
import { useLocation } from "react-router-dom";

const Export = ({ stopExporting}) => {
 
    const {t}=useTranslation();
    const [columnsToExport,setColumnsToExport]=useState([]);
    const [selectedAll,setSelectedAll] = useState(false);
    const [visibility,setVisibility]= useState(false);
    const [rangeDate,setRangeDate]=useState(null);
    const dispatch = useDispatch();
    const [updateModelToExport,setUpdatedModelToExport] =useState(null);
    const [exportOption,setExportOption]=useState('excel');
    const [fieldsToShow,setFieldsToShow] = useState([]);
    const {pathname} = useLocation();
    const {productConfigurationFields} = useSelector((state)=>state.productState);
    const exportingModel = useSelector((state) =>state.appState.exportingModel);
 
    console.log(productConfigurationFields);
    


    const filterFilter = ['image','profile_id','sale_products','user_id','client_id','category_id','parent_category_id','output'];
    const fieldRef = useRef(null);

    const productUserSelectedFields = productConfigurationFields.filter((item)=>item.active).map((item)=>item.field);

    useEffect(()=>{
        if(pathname=="/products"){
            const mandatoryFields = ['name','qty','price','category','code','min_qty'];
            setFieldsToShow([...mandatoryFields,...productUserSelectedFields]);
        }else{
            if(exportingModel.data.length!=0){
                setFieldsToShow(Object.keys(exportingModel.data[0]));
            }
        }
    },[]);

    useEffect(()=>{
        if(rangeDate?.from && rangeDate?.to){
            const result = searchCollection(exportingModel.data,'',rangeDate);
            const filteredModelToExport = {...exportingModel,
                data:result
            }
            setUpdatedModelToExport(filteredModelToExport);
        }
    },[rangeDate]);
    
    const formHandler = (el) => {
        if(columnsToExport.includes(el.target.name)){
            setColumnsToExport(columnsToExport.filter((item)=>item!=el.target.name))    
        }else{
            setColumnsToExport([...columnsToExport,el.target.name])
        }
    }

    return (
        <>
            <Modal helper={stopExporting}>
                <form className='flex flex-col h-[100%]  mt-[1rem] rounded p-3 overflow-y-auto'>
                <label>
                    {firstCapitalize(t('whichformatToExport'))}
                     <br />
                        <select name="product_type" value={exportOption} onChange={(el)=>{
                            setExportOption(el.target.value);
                        }} className='p-2 rounded w-[100%] outline-none'>
                        <option value="excel">{firstCapitalize(t('excel'))}</option>
                        <option value="pdf">{firstCapitalize(t('pdf'))}</option>
                        </select>
                </label>

                <label className="mt-8">
                    {firstCapitalize(t('fieldsToExport'))}
                    <br /> 
                    </label>
                <div className="flex flex-wrap gap-3 mt-3" ref={fieldRef}>
                    {fieldsToShow.length>0 && fieldsToShow.map((key, index) => {
                        if(filterFilter.includes(key)){
                            return null;
                        }
                        return (

                            <div key={index}  className="flex gap-2 p-2 rounded-[20px] items-center bg-green-100">
                            <input type="checkbox" onChange={formHandler} name={key} id={key} onClick={(el)=>{el.stopPropagation()}} className="check-input cursor-pointer w-[18px] h-[18px]"/>
                            <label className="cursor-pointer" for={key}>{firstCapitalize(t(key))}</label>
                            </div>
                        );  
                    })}

                </div>
            <div>
            <div className="mt-4 flex gap-2 p-2 rounded-[20px] justify-center items-center bg-green-100 w-[25%]">
                <p>{t('date_interval')}</p>
                <input type="search"  onKeyDown={(el)=>{
                    if(el.key=="Backspace"){
                        setRangeDate(null);
                        setVisibility(false);
                    }
                }} value={rangeDate?.from != null && rangeDate?.to != null ? `${rangeDate?.from} - ${rangeDate?.to}` : ''} onClick={() => { setVisibility(true) }}
                    className="bg-transparent text-red-600" id="search" placeholder={firstCapitalize(t('data_interval_example'))} />
            </div>          
            <DatePickerFilter style={"absolute mt-[-10rem]"} setRangeDate={setRangeDate} visibility={visibility} setVisibility={setVisibility} />
        </div>
                {fieldsToShow.length>0 &&
                    <div className="flex justify-end p-2 mt-auto gap-5">
                        <button type="button" onClick={()=>{
                            const inputs = fieldRef.current.querySelectorAll(".check-input");
                            let inputNames = [];

                            if(selectedAll){
                                inputs.forEach(element => element.checked=false);
                                inputNames=[];
                                setColumnsToExport(inputNames);
                                setSelectedAll(false);
                            }else{
                                inputs.forEach(element => {
                                element.checked=true;
                                inputNames.push(element.name);
                                });
                                setColumnsToExport(inputNames);
                                setSelectedAll(true);
                            }


                        }} className="p-2 bg-green-100 rounded">{ selectedAll ? firstCapitalize(t('unselect_all_field')) : firstCapitalize(t('select_all_field'))}</button>
                        <ExportButton exportOption={exportOption} data={ updateModelToExport ? updateModelToExport.data : exportingModel.data} columnsToExport={columnsToExport} model={exportingModel.model}/>
                    </div>
                    }
                </form>                     
            </Modal>
        </>
    );
};

export default Export;