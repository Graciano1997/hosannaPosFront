import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../slices/saleSlice";
import { useRef, useState } from "react";
import { searchProduct } from "../../slices/productSlice";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";


const SearchedProducts = ()=>{
    
    const dispatch = useDispatch();
    const [qtyTobuy,setQtyTobuy]=useState(1);
    const [added,setAdded] = useState(false);
    const [query,setQuery]=useState('');
    let searchedProducts = useSelector((state)=>state.productState.productsSearched);
    
    return(
        <div className="flex flex-col gap-3 mt-[2rem] p-3">

        <div className="flex flex-col gap-3">
                <div className="flex flex-col bg-green-100 rounded">
                <div className='bg-green-100  flex justify-between items-center rounded p-1 shadow'>
                <input type='text' id="searchProduct"
                onChange={(el)=>{
                    setQuery(el.target.value)
                }}
                
                onKeyDown={
                    (evt)=>{
                        if(evt.key=="Enter" && evt.target.value!='' ){
                            setQuery(evt.target.value)
                            dispatch(searchProduct(evt.target.value));
                        }
                }}
                placeholder="Busque pelo nome do produto"
                className='p-1 rounded outline-none  bg-green-100 w-[100%]'/>
                <MagnifyingGlassIcon
                onClick={()=>{
                    if(query!=''){
                        dispatch(searchProduct(query));
                    }
                }}
                 className="w-7 y-7 text-[#323232] cursor-pointer"/>
                </div>
            </div>
            </div>

            {searchedProducts.length>0 &&(
            <>
             <div className="grid grid-cols-5 p-1 text-black font-bold">
                    <p>Name</p>
                    <p>Price</p>
                    <p>Stock</p>
                    <p>Quantity</p>
                    <p></p>
            </div>
            <div className="h-[200px] flex flex-col gap-1" style={{overflow:'scroll'}}>
            {searchedProducts.map((product,index) =>
                <div className={`grid grid-cols-5  p-1 ${index%2==0?'bg-green-50':'bg-green-100'}`}>
                    <p>
                    {product.name}
                    </p>
                    <p>
                     {product.price}
                    </p>
                    <p>
                     {product.stock}
                    </p>
                    <div className="">
                        <input className="w-[70%] text-center p-1 rounded" onChange={(el)=>setQtyTobuy(el.target.value)} type="number" min={1} defaultValue={1} />
                    </div>
                     <button onClick={()=>{
                        if(qtyTobuy){
                            dispatch(addItem({
                                id:product.id,
                                name:product.name,
                                price:product.price,
                                qty:qtyTobuy,
                                total:qtyTobuy * product.price
                             }))
                        }
                     }} className="bg-green-500 text-white font-bold rounded">Add</button>
                </div>
            )
            }
            </div>
            </>
                )
            }
            {searchedProducts.length==0 && query!='' && <h4 className="text-md mt-[2rem] font-light">Nenhum Producto foi encontrado</h4>}
        </div>
    )
};

export default SearchedProducts;