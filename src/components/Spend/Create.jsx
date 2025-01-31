import Modal from "../general/Modal";

const Create=({setIsShowing})=>{
   
    return(
        <>
        <Modal setIsShowing={setIsShowing}>
        <form className='flex flex-col mt-[2%] h-[100%] rounded p-3'>
                <div className="flex flex-col gap-4">
                
                <div className="flex gap-3">
                <div className="w-[50%]">
                <label>
                Destinatario
                <br />
                <input list="userlist" className='p-1 rounded w-[100%] outline-none'/>
                <datalist id="userlist">
                    <option value="Graciano">Graciano</option>
                    <option value="Graciano">Graciano</option>
                </datalist>
                </label>
                </div>
               
                <div className="w-[50%]">
                <label>
                Valor
                <br />
                <input type="number" className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
                </div>

                <div className="flex gap-3">
                <div className="w-[100%]">
                <label>
                Motivo
                <br />
                <textarea rows={5} style={{resize:"none"}} maxLength={250} className="w-[100%] h-[100%] rounded p-2">

                </textarea>
                </label>

                </div>
                </div>
                </div>

                <div className="flex justify-end mt-auto p-2"><button className="p-2 bg-green-100 rounded">Create</button></div>
                </form>
        </Modal>
        </>
    );
};

export default Create;