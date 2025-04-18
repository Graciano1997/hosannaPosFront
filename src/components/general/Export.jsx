import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { firstCapitalize } from "../../lib/firstCapitalize";
import ExportButton from "../ExportButton";

const Export = ({ stopExporting}) => {
    const {t}=useTranslation();
    const [columnsToExport,setColumnsToExport]=useState([]);
    const filterFilter = ['image','profile_id','sale_products','user_id','client_id','category_id','parent_category_id'];
    
    const exportingModel = useSelector((state) =>state.appState.exportingModel);
    let exportingModelKeys=[];

    if(exportingModel.data.length!=0){
        exportingModelKeys = Object.keys(exportingModel.data[0]);
    }

    
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
                <form className='flex flex-col h-[100%]  mt-[1rem] rounded p-3'>
                <label>
                    {firstCapitalize(t('whichformatToExport'))}
                     <br />
                        <select name="product_type" value={true} onChange={formHandler} className='p-2 rounded w-[100%] outline-none'>
                        <option value="" disabled selected>Selecione o tipo de formato </option>
                        <option value="service">{firstCapitalize(t('excel'))}</option>
                        {/* <option value="good">{firstCapitalize(t('word'))}</option> */}
                        <option value="service">{firstCapitalize(t('pdf'))}</option>
                        </select>
                </label>

                <label className="mt-8">
                    {firstCapitalize(t('fieldsToExport'))}
                    <br /> 
                    </label>
                <div className="flex flex-wrap gap-3 mt-3">
                    {exportingModelKeys.length>0 && exportingModelKeys.map((key, index) => {
                        if(filterFilter.includes(key)){
                            return null;
                        }
                        return (

                            <div key={index} className="flex gap-2 p-2 rounded-[20px] items-center bg-green-100">
                            <input type="checkbox" onChange={formHandler} name={key} id={key} onClick={(el)=>{el.stopPropagation()}} className="cursor-pointer w-[18px] h-[18px]"  />
                            <label className="cursor-pointer" for={key}>{firstCapitalize(t(key))}</label>
                            </div>
                        );  
                    })}
                </div>
                    
                    <div className="flex justify-end p-2 mt-auto">
                        <ExportButton data={exportingModel.data} columnsToExport={columnsToExport} model={exportingModel.model}/>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default Export;