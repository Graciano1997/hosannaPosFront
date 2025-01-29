import Tbody from "./Tbody";
import Thead from "./Thead";

const Table = ({collection})=>{
    return(
        <>
        <table className={`bg-white rounded shadow-md w-[100%] mt-5`}>
            <Thead object={collection[0]} />
            <Tbody items={collection} />
        </table>
        </>
    );
};

export default Table;