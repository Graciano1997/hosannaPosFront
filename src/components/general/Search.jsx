import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { StopSearching } from "../../slices/appSlice";

const Search=()=>{
    const searchRef=useRef(null);
    const dispatch= useDispatch();

    useEffect(()=>{
        const handleSearchClick=(event)=>{
            event.stopPropagation();
             if(!(searchRef.current!=null && searchRef.current==event.target || searchRef.current.contains(event.target)) ){
                dispatch(StopSearching());
             }    
        }

        const handleType=(event)=>{
            event.stopPropagation();
             if(event.key=="Escape"){
                dispatch(StopSearching());
             }    
        }
        window.addEventListener("click",handleSearchClick);
        window.addEventListener("keydown",handleType);

        return()=>{
            window.removeEventListener("click",handleSearchClick);
            window.removeEventListener("keydown",handleType);
        }
    },[]);

    return(
        <>
        <div>
        <div className="fixed w-[100%] h-[100%] top-[0] left-[0] blur-sm">
        </div>
        <div className='fixed backdrop-blur bg-black/10 w-[100%] h-[100%] top-[0] left-[0] flex justify-center'>
            <div ref={searchRef} className='p-3 mt-[10%] h-[20%] w-[50%] rounded'>
                <div className='bg-white  flex justify-between items-center rounded p-2 shadow'>
                <input type='text' className='p-2 rounded w-[95%] outline-none'/>
                <MagnifyingGlassIcon className="w-7 y-7 text-[#323232] cursor-pointer"/>
                </div>
            </div>
        </div>
        </div>
    </>
    );
};

export default Search;
