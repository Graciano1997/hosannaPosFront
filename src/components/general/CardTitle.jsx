const CardTitle=({children})=>{
    return(
    <div className="shadow bg-white p-3 rounded-t flex flex-wrap items-center justify-between gap-3 truncate">
            {children}
     </div>
    );
};

export default CardTitle;