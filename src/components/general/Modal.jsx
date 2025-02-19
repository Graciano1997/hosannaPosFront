import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../../slices/appSlice";
import { useEffect } from "react";

const Modal = ({children})=>{
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(openModal());
  },[]);

    return(
        <>
        <div className="flex items-center">
        <div className="fixed w-[100%] h-[100%] top-[0] left-[0] blur-sm">
        </div>
        <div className='fixed  bg-black/20 w-[100%] h-[100%] top-[0] left-[0] flex justify-center'>
         <button
         onClick={()=>{ dispatch(closeModal())}}
          className="absolute text-black text-lg bg-white p-2 rounded shadow  right-[15px] top-[20px] transition-all duration-200 hover:bg-green-100">X</button>
            <div className='p-3 mt-[5rem]  w-[80%]  h-[450px]  rounded bg-white shadow' style={{zIndex:2000}}>
              {children} 
            </div>
        </div>
        </div>
    </>
    );
};

export default Modal;
