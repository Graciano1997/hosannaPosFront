import { useState } from "react";
import Modal from "../general/Modal";

const Edit=({setIsShowing})=>{
   const [product,setProduct]=useState({
    name:'Banana',
    price:200,
    qty:20,
    state:'unvailable',
    expireDate:'2023-12-12',
    barCode:"dddfffffddddsss"
   });

    return(
        <>
        <Modal setIsShowing={setIsShowing}>
        <form className='flex flex-col h-[100%]  mt-[2%] rounded p-3'>
                <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                <div className="w-[50%]">
                <label>
                Nome
                <br />
                <input type='text' value={product.name?product.name:''} className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
               
                <div className="w-[50%]">
                <label>
                Preco
                <br />
                <input type='number' value={product.price?product.price:''} className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
                </div>
                <div className="flex gap-3">
                <div className="w-[50%]">
                <label>
                Quantidade
                <br />
                <input type='number' value={product.qty?product.qty:''} className='p-1 rounded w-[100%] outline-none' min={0}/>
                </label>
                </div>
               
                <div className="w-[50%]">
                <label>
                Estado
                <br />
                <select name="" id="" value={product.state?product.state:null} className='p-1 rounded w-[100%] outline-none'>
                    <option value="available">Available</option>
                    <option value="unvailable">Unvailable</option>
                </select>
                </label>
                </div>
                </div>

                <div className="flex gap-3">
                <div className="w-[50%]">
                <label>
                Issued Date
                <br />
                <input type='date' value={product.issueDate?product.issueDate:''} className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
               
                <div className="w-[50%]">
                <label>
                Expire Date
                <br />
                <input type='date' value={product.expireDate?product.expireDate:''} className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
                </div>


                <div className="flex gap-3">
                <div className="w-[50%]">
                <label>
                Bar Code
                <br />
                <input type='text' value={product.barCode?product.barCode:''} className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
                </div>
                </div>

                <div className="flex justify-end p-2 mt-auto"><button className="p-2 bg-green-100 rounded">Create</button></div>
                </form>
        </Modal>
    </>
    );
};

export default Edit;