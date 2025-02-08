import { useSelector } from "react-redux";
import KeyButton from "./KeyButton";

const ProductDetails = ()=>{

    const selectedProduct = useSelector((state)=>state.saleState.selectedItem);

    return(
        <div className={`h-[500px] bg-white rounded shadow-md p-3 flex flex-col  gap-2 productDetails`}>
       <h1 className="font-bold text-end">* Product Details</h1>
            <div className="flex flex-col gap-1 mt-4">
            <label for="productName">Product</label>
                <input type="text" id="productName" value={selectedProduct!=undefined?selectedProduct[0].name:''} readOnly className="bg-green-100 rounded p-2"></input>
            </div>

            <div className="grid grid-cols-2 w-[100%] gap-x-3 mt-1">
            <div className="flex flex-col gap-3">
                <label for="productQty">Available Qty</label>
                <input readOnly type="number" value={selectedProduct!=undefined?selectedProduct[0].available:''} min={1} id="productQty" className="bg-green-100 rounded p-2"></input>
            </div>

            <div className="flex flex-col gap-3">
                <label for="productQty">Qty</label>
                <input type="number" min={1} id="productQty" className="bg-green-100 rounded p-2"></input>
            </div>
            </div>

            <div className="grid grid-cols-[90fr_10fr] mt-[1.3rem] gap-2">
            <div className="grid grid-cols-3 gap-x-1 gap-y-3">
                {[1,2,3,4,5,6,7,8,9,0,].map((btn)=><KeyButton number={btn}/>)}
            </div>
            <div className="flex justify-center">
            <button className="w-[100%] h-[100%] bg-green-200 p-2 text-black text-3xl rounded text-bold hover:shadow">
                Ok
            </button>
            </div>
            </div>
        </div>
    );
};

export default ProductDetails;