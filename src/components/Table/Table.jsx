import Tbody from "./Tbody";
import Thead from "./Thead";

const Table = ({collection,deleteItem})=>{

    return(
        <>
        
        {!collection.length &&
        <div className="rounded shadow-md text-center w-[100%] mt-[5rem]">
            <div className=" mt-[5rem] flex justify-center">
            <h4 className="text-3xl p-3">Sem Registros a apresentar</h4>
        </div>
   
        </div>
        }

        {collection.length>0 &&
        <table className="rounded shadow-md  w-[100%] mt-[3rem]">
        <Thead object={collection[0]} />
        <Tbody deleteItem={deleteItem} items={collection} />
        </table>
        }
        
        </>
    );
};

export default Table;