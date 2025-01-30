const Create=()=>{
   
    return(
        <>
        <div className="flex items-center">
        <div className="fixed w-[100%] h-[100%] top-[0] left-[0] blur-sm">
        </div>
        <div className='fixed  bg-black/20 w-[100%] h-[100%] top-[0] left-[0] flex justify-center'>
         <button className="absolute text-black text-lg bg-white p-2 rounded shadow  right-[15px] top-[20px]">X</button>
            <div className='p-3 mt-[5rem]  w-[80%]  h-[420px]  rounded bg-white shadow' style={{zIndex:2000}}>
                <form className='flex flex-col gap-10 mt-[2%] rounded p-3'>
                <div className="flex flex-col gap-4">
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
                Quantidade
                <br />
                <input type='number' className='p-1 rounded w-[100%] outline-none' min={0}/>
                </label>
                </div>
               
                <div className="w-[50%]">
                <label>
                Estado
                <br />
                <select name="" id="" className='p-1 rounded w-[100%] outline-none'>
                    <option value="">Available</option>
                    <option value="">Unvailable</option>
                </select>
                </label>
                </div>
                </div>

                <div className="flex gap-3">
                <div className="w-[50%]">
                <label>
                Issued Date
                <br />
                <input type='date' className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
               
                <div className="w-[50%]">
                <label>
                Expire Date
                <br />
                <input type='date' className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
                </div>


                <div className="flex gap-3">
                <div className="w-[50%]">
                <label>
                Bar Code
                <br />
                <input type='text' className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
                </div>
                </div>

                <div className="flex justify-self-end justify-end"><button className="p-2 bg-green-100 rounded">Create</button></div>
                </form>
            </div>
        </div>
        </div>
    </>
    );
};

export default Create;