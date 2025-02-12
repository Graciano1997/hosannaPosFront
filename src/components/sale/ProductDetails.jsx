import { useDispatch, useSelector } from "react-redux";
import KeyButton from "./KeyButton";
import { useState } from "react";
import { updateItem } from "../../slices/saleSlice";

const ProductDetails = ()=>{

    const selectedProduct = useSelector((state)=>state.saleState.selectedItem);
    const [qtyToUpdate,setQtyToUpdate]= useState(selectedProduct!=undefined?selectedProduct.qty:1);
    const dispatch = useDispatch();

    return(
        <div className={`h-[560px] bg-white rounded shadow-md p-3 flex flex-col  gap-2 productDetails`}>
       <h1 className="font-bold text-end">* Product Details</h1>
            <div className="flex flex-col gap-1 mt-4">
            <label for="productName">Product</label>
                <input type="text" id="productName" value={selectedProduct.name} readOnly className="bg-green-100 rounded p-2"></input>
            </div>

            <div className="grid grid-cols-2 w-[100%] gap-x-3 mt-1">
            <div className="flex flex-col gap-3">
                <label for="productQty">Stock</label>
                <input readOnly type="number" value={selectedProduct!=undefined?selectedProduct.stock:''} min={1} id="productQty" className="bg-green-100 rounded p-2"></input>
            </div>

            <div className="flex flex-col gap-3">
                <label for="productQty">Qty</label>
                <input type="number"
                onKeyDown={(evt)=>{
                    if(evt.key == 'Enter'){            
                        if(qtyToUpdate>0){
                            dispatch(updateItem({
                                ...selectedProduct,
                                qty:qtyToUpdate,
                                total:qtyToUpdate*selectedProduct.price
                            }))
                        }
                    }
                }}
                onChange={(el)=>{
                    if(el.target.value > 0){ setQtyToUpdate(el.target.value);}
                }} min={1} id="productQty"
                 defaultValue={selectedProduct.qty}
                  className="bg-green-100 rounded p-2"></input>
            </div>
            </div>

            <div className="grid grid-cols-[90fr_10fr] mt-[1.3rem] gap-2">
            <div className="grid grid-cols-3 gap-x-1 gap-y-3">
                {[1,2,3,4,5,6,7,8,9,0,].map((btn)=><KeyButton number={btn}/>)}
            </div>
            <div className="flex justify-center">
            <button onClick={()=>{
                if(qtyToUpdate>0){
                    dispatch(updateItem({
                        ...selectedProduct,
                        qty:qtyToUpdate,
                        total:qtyToUpdate*selectedProduct.price
                    }))
                }
               }} className="w-[100%] h-[100%] bg-green-200 p-2 text-black text-3xl rounded text-bold hover:shadow">
                Ok
            </button>
            </div>
            </div>
        </div>
    );
};

export default ProductDetails;