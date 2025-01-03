import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const Search=()=>{

    return(
        <>
        <div className="fixed w-[100%] h-[100%] top-[0] left-[0] blur-sm">
        </div>
        <div className='fixed backdrop-blur-sm bg-black/10 w-[100%] h-[100%] top-[0] left-[0] flex justify-center'>
            <div className='p-3 mt-[10%] h-[20%] w-[50%] rounded'>
                <div className='bg-white  flex justify-between items-center rounded p-2 shadow'>
                <input type='text' className='p-2 rounded w-[95%] outline-none'/>
                <MagnifyingGlassIcon className="w-7 y-7 text-[#323232] cursor-pointer"/>
                </div>
            </div>
        </div>

    </>
    );
};

export default Search;