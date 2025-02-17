import { PlusIcon } from "@heroicons/react/24/solid";
import Tbody from "./Tbody";
import Thead from "./Thead";
import { useDispatch } from "react-redux";

const Table = ({collection, deleteItem=()=>{},update=()=>{},create=()=>{},filterRows=[]})=>{
    const dispatch = useDispatch();

    return(
        <>
        <div className="w-[100%]">
         <div className="flex justify-end">
        <button onClick={()=>{dispatch(create())}} className="p-2"><PlusIcon className="rounded-[30%] w-10 h-10 text-green-700 shadow hover:shadow-md"/></button>
        </div>
        {!collection.length &&
        <div className="rounded text-center w-[100%] mt-[5rem]">
            <div className=" mt-[5rem] flex justify-center">
            <p className="text-2xl font-light p-1">Sem Registros a apresentar</p>
        </div>
   
        </div>
        }

        {collection.length>0 &&
        <div className="w-[100%] overflow-auto p-1">
        <table className="rounded shadow-md mt-[3rem] w-[100%] gap-5">
        <Thead filterRows={filterRows} object={collection[0]}/>
        <Tbody filterRows={filterRows} updateItem={update} deleteItem={deleteItem} items={collection} />
        </table>
        </div>
        }
        </div>
        </>
    );
};

export default Table;