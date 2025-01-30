const Create=()=>{
   
    return(
        <>
        <div>
        <div className="fixed w-[100%] h-[100%] top-[0] left-[0] blur-sm">
        </div>
        <div className='fixed backdrop-blur bg-black/10 w-[100%] h-[100%] top-[0] left-[0] flex justify-center'>
            <div className='p-3 mt-[10%] h-[20%] w-[50%]  rounded '>
                <form className='flex flex-col gap-2 rounded p-2 shadow'>
                <div className="flex gap-3">
                <div className="w-[50%]">
                <label>
                Nome
                <br />
                <input type='text' className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
               
                <div className="w-[50%]">
                <label>
                Preco
                <br />
                <input type='text' className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
                </div>
                <div className="flex gap-3">
                <div className="w-[50%]">
                <label>
                Nome
                <br />
                <input type='text' className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
               
                <div className="w-[50%]">
                <label>
                Preco
                <br />
                <input type='text' className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
                </div>

                <div className="flex gap-3">
                <div className="w-[50%]">
                <label>
                Nome
                <br />
                <input type='text' className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
               
                <div className="w-[50%]">
                <label>
                Preco
                <br />
                <input type='text' className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
                </div>

                <div><button className="p-2 bg-white rounded">Create</button></div>
                </form>
            </div>
        </div>
        </div>
    </>
    );
};

export default Create;