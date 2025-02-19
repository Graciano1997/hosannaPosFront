import { useEffect, useState } from "react";
import Modal from "../general/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { registerSpent, updateSpent } from "../../slices/spentSlice";
import { fetchUsers } from "../../slices/userSlice";

const Create=({setIsShowing})=>{
    
    const spentState = useSelector((state)=> state.spentState );
    const userState = useSelector((state)=> state.userState);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(fetchUsers());
    },[])
    
    const [spent,setSpent] = useState(spentState.spentToUpdate);
    const {t}=useTranslation();

       const formHandler = (el) => {
            setSpent({
                ...spent,
                [el.target.name]: el.target.value
            })
        }
    
        const handleFormSubmition = (el) => {
            el.preventDefault();
    
            let treatedSpentObject = {
                ...spent,
                user_id: parseInt(spent.user_id),
            }
       
              if (treatedSpentObject.id) {
                  dispatch(updateSpent(treatedSpentObject));
              } else {
                  dispatch(registerSpent(treatedSpentObject));
              }
        }

    return(
        <>
        <Modal setIsShowing={setIsShowing}>
        <form onSubmit={handleFormSubmition} className='flex flex-col mt-[2%] h-[100%] rounded p-3'>
                <div className="flex flex-col gap-4">
                
                <div className="flex gap-3">
                <div className="w-[50%]">
                <label>
                {t('responsable')}
                <br />
                <select name="user_id" onChange={formHandler} value={spent.user_id} className='bg-green-100 p-1 rounded w-[100%] outline-none'>
                <option value="" disabled selected>Selecione uma Responsavel</option>
                    {userState.users.map((user)=>
                    <option value={user.id}>{user.name}</option>
                    )}
                </select>
                </label>
                </div>
               
                <div className="w-[50%]">
                <label>
                {t('amount')}
                <br />
                <input type="number" name="amount" onChange={formHandler} value={spent.amount} className='bg-green-100 p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
                </div>

                <div className="flex gap-3">
                <div className="w-[100%]">
                <label>
                {t('motive')}
                <br />
                <textarea name="motive" rows={5} style={{resize:"none"}} onChange={formHandler} value={spent.motive} maxLength={250} className="bg-green-100 w-[100%] h-[100%] rounded p-2">
                </textarea>
                </label>

                </div>
                </div>
                </div>

                <div className="flex justify-end mt-auto p-2"><button className="p-2 bg-green-100 rounded">{spent.id ? 'Update' : 'Create'}</button></div>
             </form>
        </Modal>
        </>
    );
};

export default Create;
