import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductField } from "../../slices/productSlice";

const ProductConfigurationFormItem = ({ field, index, active,mandatory }) => {
    
    const dispatch = useDispatch();
    const productFieldsControl = (fieldItem)=>{ 
        dispatch(addProductField(fieldItem));
    }

    const activeRef=useRef();
    const mandatoryRef=useRef();

    return ( <div key={index} className={`${index%2==0?'bg-green-100':''} grid grid-cols-3 gap-2 p-1`}>
                        <p>{field[0].toUpperCase().concat(field.slice(1))}</p>                        
                        
                        <select 
                        ref={activeRef}
                        className="bg-green-200 p-1 rounded cursor-pointer" 
                         defaultValue={active}
                        onChange={(el)=>{
                            productFieldsControl({
                                field:field,
                                active:el.target.value,
                                mandatory:mandatoryRef.current.value
                            });
                        }} 
                         name={'active'}               
                        >
                            <option value={true}>Active</option>
                            <option value={false}>Hide</option>
                        </select>
                    
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
                        // value={mandatory} 

                         name={'mandatory'}               
                        >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
    )
};

export default ProductConfigurationFormItem;