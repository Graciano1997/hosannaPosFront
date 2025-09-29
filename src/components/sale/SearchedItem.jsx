import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../slices/saleSlice";
import { showToast } from "../../slices/appSlice";
import Money from "../general/Money";
import { useTranslation } from "react-i18next";
import { totalWithTaxesAndDiscounts } from "../../lib/totalWithTaxes";
import { firstCapitalize } from "../../lib/firstCapitalize";

const SearchedItem = ({product,index,setQuery})=>{
    const [qtyTobuy,setQtyTobuy]=useState(1);
    const [added,setAdded]=useState(false);
    const dispatch = useDispatch();
    const {t}=useTranslation();
    return(
        <div className={`grid grid-cols-7  p-1 ${index%2==0?'bg-green-50':'bg-green-100'}`}>
                        <p>
                        {product.name}
                        </p>
                        <p>
                        <Money amount={product.price}/>
                        </p>
                        <p>
                         {product.qty}
                        </p>
                        <p>
                         {(product.discount ? product.discount : 0 )}
                        </p>
                        <p>
                         {(product.taxes ? product.taxes : 0 )}
                        </p>
                        <div className="">
                            <input className="w-[70%] text-center p-1 rounded" onChange={
                                (el)=>{
                                    setQtyTobuy(el.target.value)
                                }
                            } type="number" min={1} max={(product.qty)} defaultValue={qtyTobuy} />
                        </div>
                        { (product.qty)>= qtyTobuy && qtyTobuy > 0 &&
                        <button  onClick={()=>{
                            if(qtyTobuy > product.stock){
                                dispatch(showToast({error:true,message:`${firstCapitalize(t('exist_only'))} ${product.stock} ${t('units')}`}));
                            }else{
                                if(qtyTobuy){
                                   dispatch(addItem({
                                        id:product.id,
                                        code:product.code,
                                        name:product.name,
                                        price:product.price,
                                        stock:product.qty,
                                        discount:product.discount ? product.discount * 1 : 0,
                                        taxes:product.taxes ? product.taxes * 1 : 0,
                                        qty:qtyTobuy,
                                        total:totalWithTaxesAndDiscounts(product,qtyTobuy)
                                    }))
                                        dispatch(showToast({success:true,message:`${firstCapitalize(t('added'))} ${product.name}`}));
                                    setQuery('');
                                    if(!added){
                                        setAdded(true);
                                    }
                                }
                            }

                            
                        }}  className={`bg-green-400 text-white font-bold rounded`}>{t('add')}</button>
                    } 
                    {(product.qty)==0 &&
                    <div className="bg-red-300 text-white font-bold text-center p-1 rounded">{t('outofStock')}</div>
                    }
                     
                    </div>
);
};

export default SearchedItem;