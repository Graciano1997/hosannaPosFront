import { PlusIcon } from "@heroicons/react/24/solid";
import Tbody from "./Tbody";
import Thead from "./Thead";
import { useDispatch } from "react-redux";
import { openModal } from "../../slices/appSlice";
import { useTranslation } from "react-i18next";

const Table = ({collection, deleteItem=()=>{},update=()=>{},create=()=>{},filterRows=[], filterDetails=[]})=>{
    const dispatch = useDispatch();
    const {t}=useTranslation();

    return(
        <>
        <div className="w-[100%]">
         <div className="flex justify-end">
        <button onClick={()=>{ dispatch(create()); dispatch(openModal()); }} className="p-2"><PlusIcon className="rounded-[30%] w-10 h-10 text-green-700 shadow hover:shadow-md"/></button>
        </div>
        {!collection.length &&
        <div className="rounded text-center w-[100%] mt-[5rem]">
            <div className=" mt-[5rem] flex justify-center">
            <p className="text-2xl font-light p-1"> {t('no_registry')}</p>
        </div>
   
        </div>
        }

        {collection.length>0 &&
        <div className="w-[100%] overflow-auto p-1">
        <table className="rounded shadow-md mt-[2rem] w-[100%]">
        <Thead filterRows={filterRows} object={collection[0]}/>
        <Tbody filterDetails={filterDetails} filterRows={filterRows} updateItem={update} deleteItem={deleteItem} items={collection} />
        </table>
        </div>
        }
        </div>
        </>
    );
};

export default Table;