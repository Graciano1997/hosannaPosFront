import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../slices/saleSlice";
import { useRef, useState } from "react";
import { searchProduct } from "../../slices/productSlice";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import SearchedItem from "./SearchedItem";


const SearchedProducts = ()=>{
    
    const dispatch = useDispatch();
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
                placeholder="Nome do produto ou Codigo de barra"
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
            <div className="h-[200px] flex flex-col gap-1" style={{overflowY:'scroll'}}>
            {searchedProducts.map((product,index) => <SearchedItem index={index} product={product}/>)
            }
            </div>
            </>
                )
            }
            {/* {searchedProducts.length==0 && query!='' && <h4 className="text-md mt-[2rem] font-light">Nenhum Producto foi encontrado</h4>} */}
        </div>
    )
};

export default SearchedProducts;