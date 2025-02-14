import { PlusIcon } from "@heroicons/react/24/solid";
import Tbody from "./Tbody";
import Thead from "./Thead";
import { useDispatch } from "react-redux";

const Table = ({collection, deleteItem,filterRows=[],create=()=>{}})=>{
    const dispatch = useDispatch();

    return(
        <>
        <div>
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
        <table className="rounded shadow-md  w-[100%] mt-[3rem]">
        <Thead filterRows={filterRows} object={collection[0]} />
        <Tbody filterRows={filterRows} deleteItem={deleteItem} items={collection} />
        </table>
        }
        </div>
        </>
    );
};

export default Table;