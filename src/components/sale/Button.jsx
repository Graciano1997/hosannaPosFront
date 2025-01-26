const ButtonGroup = ()=>{
    return(
    <div className="h-[30px] absolute bottom-0  w-[100%] flex gap-3 justify-end">
    <button type="button" className="bg-red-300 rounded p-1 hover:shadow">Cancelar</button>
        <button type="button" className="bg-green-200 rounded p-1 hover:shadow">Confirmar</button>
    </div>
    )
};

export default ButtonGroup;