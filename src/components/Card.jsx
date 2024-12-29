const Card =({width=350,height=300})=>{
    return(
        <div className={`bg-white rounded shadow-md w-[${width}px] h-[${height}px]`}>
            <header className="shadow bg-white-500 h-[50px] pl-4 flex justify-begin items-center rounded-t"><h2 className="text-center">Montly Bugdes</h2></header>
            <main>

            </main>
        </div>
    );
};

export default Card;
