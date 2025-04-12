import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { searchProduct } from "../../slices/productSlice";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import SearchedItem from "./SearchedItem";
import { useTranslation } from "react-i18next";
import { firstCapitalize } from "../../lib/firstCapitalize";

const SearchedProducts = ()=>{    
    const dispatch = useDispatch();
    const [added,setAdded] = useState(false);
    const [query,setQuery]=useState('');
    const [search,setSearch] = useState(false);
    const {t}=useTranslation();
    const inputRef= useRef(null);

    useEffect(()=>{
        inputRef.current.focus();
    },[]);

    let searchedProducts = useSelector((state)=>state.productState.productsSearched);

    return(
        <div className="flex flex-col gap-3 mt-[2rem] p-3">
        <div className="flex flex-col gap-3">
                <div className="flex flex-col bg-green-100 rounded">
                <div className='bg-green-100  flex justify-between items-center rounded p-1 shadow'>
                <input type='text' id="searchProduct"
                value={query}
                ref={inputRef}
                onChange={(el)=>{
                    setQuery(el.target.value)
                }}

                onKeyDown={
                    (evt)=>{
                        if(evt.key=="Enter" && evt.target.value!='' ){
                            setQuery(evt.target.value)
                            dispatch(searchProduct(evt.target.value));
                            setSearch(true);
                        }
                }}
                placeholder={firstCapitalize(t('product_name_or_code'))}
                className='p-1 rounded outline-none  bg-green-100 w-[100%]'/>
                <MagnifyingGlassIcon
                onClick={()=>{
                    if(query!=''){
                        dispatch(searchProduct(query));
                        setSearch(true);
                    }
                }}
                 className="w-7 y-7 text-[#323232] cursor-pointer"/>
                </div>
            </div>
            </div>

            { searchedProducts.length==0 && search &&  
            <p className="text-center mt-[1rem] p-2 font-light">{firstCapitalize(t('no_founded_item'))}</p>}

            {searchedProducts.length>0 &&(
            <>
             <div className="grid grid-cols-5 p-1 text-black font-bold">
                    <p>{firstCapitalize(t('name'))}</p>
                    <p>{firstCapitalize(t('price'))}</p>
                    <p>{firstCapitalize(t('stock'))}</p>
                    <p>{firstCapitalize(t('quantity'))}</p>
                    <p></p>
            </div>
            <div className="h-[200px] flex flex-col gap-1" style={{overflowY:'scroll'}}>
            {searchedProducts.map((product,index) => <SearchedItem index={index} setQuery={setQuery} product={product}/>)
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