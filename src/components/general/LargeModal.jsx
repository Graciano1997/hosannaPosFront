import { useDispatch } from "react-redux";
import { closeModal } from "../../slices/appSlice";

const LargeModal = ({children,stopCreating,helper = undefined})=>{
  const dispatch = useDispatch();
    return(
        <>
        <div className="flex items-center">
        <div className="fixed w-[100%] h-[100%] top-[0] left-[0] blur-sm">
        </div>
        <div className='fixed  bg-black/10 w-[100%] h-[100%] top-[0] left-[0] flex justify-center'>
         <button
         onClick={()=>{
          if(typeof(stopCreating)=="function"){ dispatch(stopCreating());}
          dispatch(closeModal())
          dispatch(helper());
        }}
        className="absolute text-red-500 text-2xl bg-white p-2 rounded shadow  right-[15px] top-[20px] transition-all duration-200 hover:bg-green-100">X</button>
            <div className='p-3 mt-[5rem]  w-[97%] h-[80%]  rounded bg-white shadow overflow-auto' style={{zIndex:2000}}>
              {children} 
            </div>
        </div>
        </div>
    </>
    );
};

export default LargeModal;
