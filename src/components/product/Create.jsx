import { useState } from "react";
import Modal from "../general/Modal";
import { useDispatch } from "react-redux";
import { registerProduct } from "../../slices/productSlice";

const Create=({setIsShowing})=>{
   const [product,setProduct]=useState({});
   const dispatch = useDispatch();

   const formHandler = (el)=>{
    setProduct({
        ...product,
        [el.target.name]:el.target.value
    })
   }

   const handleFormSubmition = (el)=>{
    el.preventDefault();
    dispatch(registerProduct(product));
   }

    return(
        <>
        <Modal setIsShowing={setIsShowing}>
        <form onSubmit={handleFormSubmition} action="POST" className='flex flex-col h-[100%]  mt-[1rem] rounded p-3'>
                <div className="flex flex-col gap-4">
                <div className="flex gap-5">
                <div className="w-[50%]">
                <label>
                Nome
                <br />
                <input type='text' onChange={formHandler} name="name" value={product.name} className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
               
                <div className="w-[50%]">
                <label>
                Preco
                <br />
                <input type='number' onChange={formHandler} name="price" value={product.price} className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
                </div>
                <div className="flex gap-5">
                <div className="w-[50%]">
                <label>
                Quantidade
                <br />
                <input type='number' onChange={formHandler} name="qty" value={product.qty} className='p-1 rounded w-[100%] outline-none' min={0}/>
                </label>
                </div>
               
                <div className="w-[50%]">
                <label>
                Bar Code
                <br />
                <input type='text' name="code" onChange={formHandler} value={product.barCode} className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
                </div>

                <div className="flex gap-5">
                <div className="w-[50%]">
                <label>
                Issued Date
                <br />
                <input type='date' name="creation" onChange={formHandler} value={product.issueDate} className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
               
                <div className="w-[50%]">
                <label>
                Expire Date
                <br />
                <input type='date' name="expiration" onChange={formHandler} value={product.expireDate} className='p-1 rounded w-[100%] outline-none'/>
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

export default Create;