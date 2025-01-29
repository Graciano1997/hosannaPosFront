const ElipseMenu=()=>{
    return(
        <>
        <ul className="flex flex-col gap-1 w-[150px] h-[100%] bg-white shadow rounded" id="elipseMenu">
                <li className="m-0.5 text-center hover:sm:shadow transition-200 hover:cursor-pointer">Criar</li>
                <li className="m-0.5 text-center hover:sm:shadow hover:cursor-pointer">Exportar</li>
            </ul>
        </>
    );
};

export default ElipseMenu;
