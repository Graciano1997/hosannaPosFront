import { useEffect, useState } from "react";
import Modal from "../general/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { fetchCashRegisters, registerCashRegisters, stopCreatingOrUpdateingCashRegister, updateCashRegisters } from "../../slices/cashRegisterSlice";

const Create=()=>{
    
    const cashRegisterState = useSelector((state) => state.cashRegisterState);
    const dispatch = useDispatch();
    
    
    const [cashRegister,setCashRegister] = useState(cashRegisterState.cashregisterToUpdate);
    const {t}=useTranslation();

       const formHandler = (el) => {
            setCashRegister({
                ...cashRegister,
                [el.target.name]: el.target.value
            })
        }
    
        const handleFormSubmition = (el) => {
            el.preventDefault();
    
            let treatedSpentObject = {
                id:cashRegister.id,
                name:cashRegister.name,
                code:cashRegister.code,
                location:cashRegister.location,
                status:cashRegister.status
            }
       
              if (treatedSpentObject.id) {
                  dispatch(updateCashRegisters(treatedSpentObject))
                  .then(()=>{
                    dispatch(fetchCashRegisters())
                  })
   
              } else {
                  dispatch(registerCashRegisters(treatedSpentObject))
                  .then(()=>{
                    dispatch(fetchCashRegisters())
                  })
              }
        }
    return(
        <>
        <Modal helper={stopCreatingOrUpdateingCashRegister}>
        <form onSubmit={handleFormSubmition} className='flex flex-col h-[100%] rounded p-3'>
                <div className="flex flex-col gap-4">
                
                <div className="flex gap-3">
                <div className="w-[50%]">
                <label>
                {firstCapitalize(t('name'))}
                <br />
                <input type="text" name="name" onChange={formHandler} value={cashRegister.name} className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
               
                <div className="w-[50%]">
                <label>
                { firstCapitalize(t('code'))}
                <br />
                <input type="text" name="code" onChange={formHandler} value={cashRegister.code} className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
                </div>

                <div className="flex gap-3">
               <div className="w-[50%]">
                <label>
                {firstCapitalize(t('location'))}
                <br />
                <input type="text" name="location" onChange={formHandler} value={cashRegister.location} className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
               <div className="w-[50%]">
                <label>
                {firstCapitalize(t('status'))}
                <br />
                <select name="status" onChange={formHandler} value={cashRegister.status} className='p-1 rounded w-[100%] outline-none'>
                <option disabled>{firstCapitalize(t('pick_status'))}</option>
                     <option value={"active"}>{firstCapitalize(t('active'))}</option>
                     <option value={"inactive"}>{firstCapitalize(t('inactive'))}</option>
                </select>
                </label>
                </div>
               
                </div>
                </div>
                <div className="flex justify-end mt-auto p-2"><button className="p-2 bg-green-100 rounded">{cashRegister.id ? firstCapitalize(t('update')) : firstCapitalize(t('create'))}</button></div>
             </form>
        </Modal>
        </>
    );
};

export default Create;
