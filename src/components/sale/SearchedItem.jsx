import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../slices/saleSlice";
import { showToast } from "../../slices/appSlice";
import Money from "../general/Money";

const SearchedItem = ({product,index})=>{
    const [qtyTobuy,setQtyTobuy]=useState(1);
    const [added,setAdded]=useState(false);
    const dispatch = useDispatch();
    return(
        <div className={`grid grid-cols-5  p-1 ${index%2==0?'bg-green-50':'bg-green-100'}`}>
                        <p>
                        {product.name}
                        </p>
                        <p>
                        <Money amount={product.price}/>
                        </p>
                        <p>
                         {(product.qty - product.output)}
                        </p>
                        <div className="">
                            <input className="w-[70%] text-center p-1 rounded" onChange={
                                (el)=>{
                                    setQtyTobuy(el.target.value)
                                }
                            } type="number" min={1} max={(product.qty - product.output)} defaultValue={qtyTobuy} />
                        </div>
                        { (product.qty - product.output)>= qtyTobuy && qtyTobuy > 0 &&
                        <button  onClick={()=>{
                            if(qtyTobuy > product.stock){
                                dispatch(showToast({error:true,message:`Existem apenas ${product.stock} quantidades de ${product.name} disponiveis pra venda`}))
                            }else{
                                if(qtyTobuy){
                                    dispatch(addItem({
                                        id:product.id,
                                        code:product.code,
                                        name:product.name,
                                        price:product.price,
                                        stock:product.qty,
                                        output:product.output,
                                        qty:qtyTobuy,
                                        total:qtyTobuy * product.price
                                    }));
                                    if(!added){
                                        setAdded(true);
                                    }
                                }
                            }

                            
                        }}  className={`bg-green-400 text-white font-bold rounded`}>Add</button>
                    } 
                    </div>
);
};

export default SearchedItem;