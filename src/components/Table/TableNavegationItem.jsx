export const TableNavegationItem = ({currentPage, number,setCurrentPage})=>{
    return(
        <button onClick={()=>{setCurrentPage(number)}} className={`p-2 rounded-[100%] cursor-pointer ${currentPage===number?'bg-green-200 text-black':'bg-black/90 text-white' } flex items-center justify-center hover:border-2`}>{number}</button>
    );
};
