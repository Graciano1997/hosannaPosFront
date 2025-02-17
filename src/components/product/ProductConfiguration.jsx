import { useSelector } from "react-redux";

const ProductConfiguration = ()=>{
    const filterRows = ['id','created_at','updated_at','name','qty','price','category_id','code'];

    const product=useSelector((state)=>state.productState.products[0]);
    const keys=Object.keys(product).filter((item)=>!filterRows.includes(item));

    return(
        <div className="mt-[2rem] h-[100%]">
            <h1 className="pl-2 font-light text-3xl text-start">Product Configurations Fields</h1>
            <form action="" className="w-[100%] mt-[2rem] shadow p-2">
                <div className="grid grid-cols-3">
                <p className="">Name</p>
                <p className="text-center">Active</p>
                <p className="text-center">Mandatory</p>
                </div>
                <div className="mt-[1rem] h-[230px] w-[100%]  overflow-scroll">
                {true && keys.map((field,index)=>
                <div className={`${index%2==0?'bg-green-100':''} grid grid-cols-3 p-1`}>
                    <p>{field[0].toUpperCase().concat(field.slice(1))}</p>                        
                    <input className="cursor-pointer" type="checkbox" id={field} name={field}/>
                    <input className="cursor-pointer" type="checkbox" id={"mandatory"} name={'mandatory'}/>
                </div>
            )}
            </div>
                <div className="flex justify-end mt-[1rem]"><button className="p-2 bg-green-100 rounded">{'Salvar'}</button></div>
            </form>
        </div>
    )
};

export default ProductConfiguration;