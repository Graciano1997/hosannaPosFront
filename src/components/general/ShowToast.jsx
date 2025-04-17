import { XMarkIcon } from "@heroicons/react/16/solid";
import { useDispatch } from "react-redux";
import { closeToast } from "../../slices/appSlice";

const ShowToast = ({object})=>{
  const dispatch = useDispatch();

  setTimeout(()=>{
    dispatch(closeToast())
  },4000);

    return(
       <div className={`bg-black opacity-75 w-[400px]
        z-[1000]
        ${object.success?'text-green-500':''}
        ${object.error?'text-red-500':''}
        ${object.warning?'text-yellow-500':''}
        flex justify-center items-center
        p-4 fixed bottom-[10px] right-[10px]
        rounded-[16px] flex-wrap`}>
        <XMarkIcon onClick={()=>{dispatch(closeToast())}} className={`w-8 h-8 ${object.success?'text-green-300':''} ${object.erro?'text-red-300':''} ${object.warning?'text-yellow-300':''}  absolute right-0 top-[5px] cursor-pointer `}/>
        <p>{object.message}</p>
      </div>
    );
}

export default ShowToast;
