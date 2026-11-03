import { useEffect, useState } from "react";
import Modal from "../general/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchSpents, registerSpent, stopCreatingOrUpdateingSpent, updateSpent } from "../../slices/spentSlice";
import { fetchUsers } from "../../slices/userSlice";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { showToast } from "../../slices/appSlice";

const Create=()=>{
    
    const spentState = useSelector((state)=> state.spentState);
    const userState = useSelector((state)=> state.userState);
    const cashRegisterState = useSelector((state) => state.cashRegisterState);
    const {currentSession} = cashRegisterState;
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(fetchUsers());
    },[])
    
    const [spent,setSpent] = useState(spentState.spentToUpdate ||
        { user_id: userState.users.length === 1 ? userState.users[0].id : ""}
    );
    const {t}=useTranslation();

       const formHandler = (el) => {
            setSpent({
                ...spent,
                [el.target.name]: el.target.value
            })
        }
    
        const handleFormSubmition = (el) => {
            el.preventDefault();
            
            if(!currentSession){
                dispatch(showToast({error:true,message:firstCapitalize(t('please__open_cash_session'))}))
            }else{
            let treatedSpentObject = {
                ...spent,
                currentSession,
                cash_register_id: currentSession.cash_register_id,
                cash_session_id: currentSession.id,
                user_id: parseInt(spent.user_id),
            }
       
              if (treatedSpentObject.id) {
                  dispatch(updateSpent(treatedSpentObject))
                  .then(()=>{
                    dispatch(fetchSpents())
                  })
   
              } else {
                  dispatch(registerSpent(treatedSpentObject))
                  .then(()=>{
                    dispatch(fetchSpents())
                  })
              }
            }
        }
    return(
        <>
        <Modal helper={stopCreatingOrUpdateingSpent}>
        <form onSubmit={handleFormSubmition} className='flex flex-col h-[100%] rounded p-3'>
                <div className="flex flex-col gap-4">
                
                <div className="flex gap-3">
                <div className="w-[50%]">
                <label>
                {firstCapitalize(t('responsable'))}
                <br />
                <select
                name="user_id"
                onChange={formHandler}
                value={spent.user_id}
                className='p-1 rounded w-[100%] outline-none'>
                <option disabled>{firstCapitalize(t('select_the_responsabele'))}</option>
                    {userState.users.map((user)=><option value={user.id} >{user.name}</option>)}
                </select>
                </label>
                </div>
               
                <div className="w-[50%]">
                <label>
                { firstCapitalize(t('amount'))}
                <br />
                <input type="number" name="amount" onChange={formHandler} value={spent.amount} className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
                </div>

                <div className="flex gap-3">
                <div className="w-[100%]">
                <label>
                {firstCapitalize(t('motive'))}
                <br />
                <textarea name="motive" rows={5} style={{resize:"none"}} onChange={formHandler} value={spent.motive} maxLength={250} className="w-[100%] h-[100%] rounded p-2">
                </textarea>
                </label>

                </div>
                </div>
                </div>
                <div className="flex justify-end mt-auto p-2"><button className="p-2 bg-green-100 rounded">{spent.id ? firstCapitalize(t('update')) : firstCapitalize(t('create'))}</button></div>
             </form>
        </Modal>
        </>
    );
};

export default Create;
