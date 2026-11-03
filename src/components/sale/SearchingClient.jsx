import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { searchProduct } from "../../slices/productSlice";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import SearchedItem from "./SearchedItem";
import { useTranslation } from "react-i18next";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { fetchClients, searchClient, searchClients, setSearching } from "../../slices/clientSlice";
import { setClientDetails } from "../../slices/saleSlice";


const SearchedClientItem = React.memo(
     ({client,index,setQuery})=>{
    const dispatch = useDispatch();

    const {t}=useTranslation();
    return(
        <div className={`grid grid-cols-4 sm:grid-cols-7  p-1 ${index%2==0?'bg-primary':'bg-green-50'}`}>
                        <p className="truncate">
                        {client.name}
                        </p>
                        <p className="truncate">
                        {client.email}
                        </p>
                        <p className="truncate">
                        {client.phone}
                        </p>
                        <p className="hidden sm:block truncate">
                        {client.nif}
                        </p>
                        <p className="hidden sm:block truncate">
                        {client.address}
                        </p>
                        <p className="truncate" >
                        {client.client_type}
                        </p>
                        <button  onClick={()=>{
                            dispatch(setClientDetails({ name: client.name,email:client.email,client_type:client.client_type, nif: client.nif, phone: client.phone, address:client.address })) 
                            dispatch(setSearching(false))
                        }}  className={`bg-green-300 text-white font-bold rounded`}>{t('select')}</button>
                    </div>
);
}
);

const SearchingClient = React.memo(
     ()=>{    
        
    const dispatch = useDispatch();
    const [query,setQuery]=useState('');
    const [search,setSearch] = useState(false);
    
    const {t}=useTranslation();
    const inputRef= useRef(null);
    let searchedClients = useSelector((state)=>state.clientState.searchedClients);


    return(
        <div className="flex flex-col gap-3 mt-[2rem] p-3">
        <div className="flex flex-col gap-3">
            <div className="flex flex-col bg-primary rounded">
            <div className='bg-primary  flex justify-between items-center rounded p-1 shadow'>
            <input type='text' id="searchClient"
            value={query}
            ref={inputRef}
            onChange={(el)=>{
                setQuery(el.target.value)
            }}

                onKeyDown={
                    (evt)=>{
                        if(evt.key=="Enter" && evt.target.value!='' ){
                            setQuery(evt.target.value)
                            dispatch(searchClient(evt.target.value));
                            setSearch(true);
                        }
                }}
                placeholder={firstCapitalize(t('client_name_or_email'))}
                className='p-1 rounded outline-none  bg-primary w-[100%]'/>
                <MagnifyingGlassIcon
                onClick={()=>{
                    if(query!=''){
                        dispatch(searchClient(query));
                        setSearch(true);
                    }
                }}
                 className="w-7 y-7 text-[#323232] cursor-pointer"/>
                </div>
            </div>
            </div>

            { searchedClients.length==0 && search && <p className="text-center mt-[1rem] p-2 font-light">{firstCapitalize(t('no_founded_client'))}</p>}
            
            {
            searchedClients.length>0 && 
            (
            <>
             <div className="grid grid-cols-4 sm:grid-cols-7 p-1 text-black font-bold overflow-x-scroll ">
                    <p>{firstCapitalize(t('name'))}</p>
                    <p>{firstCapitalize(t('email'))}</p>
                    <p>{firstCapitalize(t('phone'))}</p>
                    <p className="hidden sm:block">{firstCapitalize(t('nif'))}</p>
                    <p className="hidden sm:block truncate">{firstCapitalize(t('address'))}</p>
                    <p>{firstCapitalize(t('client_type'))}</p>
                    <p></p>
            </div>
            <div className="h-[200px] flex flex-col gap-1 overflow-y-auto">
                {searchedClients.map((client,index) =><SearchedClientItem index={index} setQuery={setQuery} client={client} />)}   
            </div>
            </>)

            }
         </div>
    )
});

export default SearchingClient;