import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductField } from "../../slices/productSlice";
import { useTranslation } from "react-i18next";

const ProductConfigurationFormItem = ({ field, index, active,mandatory }) => {
    
    const dispatch = useDispatch();
    const productFieldsControl = (fieldItem)=>{ 
        dispatch(addProductField(fieldItem));
    }
    const {t}=useTranslation();

    const activeRef=useRef();
    const mandatoryRef=useRef();

    return ( <div key={index} className={`${index%2==0?'bg-green-100':''} grid grid-cols-2 gap-2 p-1`}>
                        <p>{t(field)[0].toUpperCase().concat(t(field).slice(1))}</p>                        
                        
                        <select 
                        ref={activeRef}
                        className="bg-green-200 p-1 rounded cursor-pointer" 
                         defaultValue={active}
                        onChange={(el)=>{
                            productFieldsControl({
                                field:field,
                                active:el.target.value,
                                mandatory:false
                            });
                        }} 
                         name={'active'}               
                        >
                            <option value={true}>{t('visible')}</option>
                            <option value={false}>{t('hide')}</option>
                        </select>
                    
                     { false && 
                        <select 
                        ref={mandatoryRef}
                        className="bg-green-200 p-1 rounded cursor-pointer"
                        onChange={(el)=>{
                            productFieldsControl({
                                field:field,
                                active:activeRef.current.value,
                                mandatory:el.target.value
                            });
                        }} 
                        defaultValue={mandatory}
                         name={'mandatory'}               
                        >
                            <option value={true}>{t('yes')}</option>
                            <option value={false}>{t('not')}</option>
                        </select>
                        }
                    </div>
    )
};

export default ProductConfigurationFormItem;