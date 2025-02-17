import { useRef, useState } from "react";
import { useSelector } from "react-redux";

const ProductConfiguration = ()=>{
    const filterRows = ['id','created_at','updated_at','name','qty','price','category_id','code'];
    const [productFields,setProductFields]=useState([]);

    const [productFieldItem,setProductFieldItem]=useState({field:'', active:false, mandatory:false});

    const product=useSelector((state)=>state.productState.products[0]);
    const keys=Object.keys(product).filter((item)=>!filterRows.includes(item));

    const handleFormSubmition = (el)=>{
        el.preventDefault();
        console.log(productFieldItem);
        console.log(productFields);
    }

    const productFieldsControl = (fieldItem)=>{
        const isIncluded = productFields.filter((item)=>item.field == fieldItem.field)
        
        
        if(isIncluded.length === 0){
            productFields.push(fieldItem)
       }else{
          const atIndex = productFields.findIndex(item => item.field == fieldItem.field );
          const productFieldsCopy = [...productFields];
          console.log("to update",fieldItem);
          productFieldsCopy[atIndex]={...fieldItem};
          setProductFields(productFieldsCopy);
        }

    }

    

    return(
        <div className="mt-[2rem] h-[100%]">
            <h1 className="pl-2 font-light text-3xl text-start">Product Configurations Fields</h1>
            <form onSubmit={handleFormSubmition} className="w-[100%] mt-[2rem] shadow p-2">
                <div className="grid grid-cols-3">
                <p className="">Name</p>
                <p className="text-center">Active</p>
                <p className="text-center">Mandatory</p>
                </div>
                <div className="mt-[1rem] h-[230px] w-[100%]  overflow-scroll">
                {true && keys.map((field,index)=>
                <div className={`${index%2==0?'bg-green-100':''} grid grid-cols-3 p-1`}>
                    <p>{field[0].toUpperCase().concat(field.slice(1))}</p>                        
                    <input 
                    onChange={(el)=>{
                        productFieldsControl({
                            field:field,
                            active:el.target.checked,
                            mandatory:el.target.nextElementSibling.checked
                        });

                        setProductFieldItem({
                            field:field,
                            active:el.target.checked,
                            mandatory:el.target.nextElementSibling.checked
                        });
                    }} 

                    type="checkbox"  name={'active'}/>

                    <input 
                    onChange={(el)=>{
                        productFieldsControl({
                            field:field,
                            active:el.target.previousElementSibling.checked,
                            mandatory:el.target.checked
                        });

                        setProductFieldItem({
                            field:field,
                            active:el.target.previousElementSibling.checked,
                            mandatory:el.target.checked
                        });
                    }}
                    type="checkbox" name={'mandatory'}/>
                </div>
            )}
            </div>
                <div className="flex justify-end mt-[1rem]"><button className="p-2 bg-green-100 rounded">{'Salvar'}</button></div>
            </form>
        </div>
    )
};

export default ProductConfiguration;