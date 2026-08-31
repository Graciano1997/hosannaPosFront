import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../../slices/appSlice";
import React, { useEffect } from "react";

const Modal =React.memo(
   ({children, modalSize=null, helper = undefined })=>{
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(openModal());
  },[]);

    return(
        <>
      <div className=" z-[800] flex items-center justify-center">
        <div className={`fixed w-[100%] h-[100%]  top-[0] left-[0] blur-lg`}>
        </div>
        <div className='fixed  bg-black/50 w-[100%] h-[100%] top-[0] left-[0] flex justify-center items-center'>
         <button
         onClick={()=>{ 
          dispatch(closeModal());
          if(helper !=undefined){
            dispatch(helper());
          }
        }}
          className="absolute text-red-500 text-xl bg-white p-2 rounded shadow  right-[5px] top-[5px] transition-all duration-200 hover:bg-red-400 hover:text-white">X</button>
            <div className={`p-2 mt-[2rem] ${modalSize? modalSize :'w-[90%]  h-[90%]'}  rounded bg-white shadow`}>
              {children} 
            </div>
        </div>
        </div>
    </>
    )
}
)
;

export default Modal;
