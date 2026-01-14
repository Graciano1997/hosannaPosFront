import {useRef, useState } from "react";
import Modal from "../general/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { fetchCompanies, registerCompany, stopCreatingOrUpdateingCompany, updateCompany } from "../../slices/companySlice";
import { registerBankAccount, stopCreatingOrUpdateingBankAccount, updateBankAccount } from "../../slices/bankAccountSlice";

const CreateBank=()=>{

    const bankAccountState = useSelector((state)=> state.bankAccountState);
    const companyState = useSelector((state)=>state.companyState);
    
    const dispatch = useDispatch();
    const [bankAccount,setBankAccount] = useState(bankAccountState.bankAccountToUpdate);
    const {t}=useTranslation();

    const formHandler = (el) => {
        setBankAccount({
            ...bankAccount,
            [el.target.name]: el.target.value
        })
    }

    const handleFormSubmition = (el)=>{
    el.preventDefault();
    
    let treatedBankAccountObject = {
        ...bankAccount
    }

    if(treatedBankAccountObject.id){
        dispatch(updateBankAccount(treatedBankAccountObject));
        
    }else{
        dispatch(registerBankAccount(treatedBankAccountObject));
    }
    }
 
    return(
        <>
        <Modal helper={stopCreatingOrUpdateingBankAccount}>
            <form onSubmit={handleFormSubmition} className='flex flex-col mt-[2%] h-[100%] rounded p-3'>
                    <div className="flex flex-col gap-4">
                    <div className="flex gap-3">
                    <div className="w-[50%]">
                    <label>
                    { firstCapitalize(t('iban'))}
                    <br />
                    <input type="text" name="iban" onChange={formHandler} value={bankAccount.iban} className='p-1 rounded w-[100%] outline-none'/>
                    </label>
                    </div>

                    <div className="w-[50%]">
                    <label>
                    { firstCapitalize(t('bank'))}
                    <br />
                    <input type="text" name="bank" onChange={formHandler} value={bankAccount.bank} className='p-1 rounded w-[100%] outline-none'/>
                    </label>
                    </div>
                    </div>

                    <div className="flex gap-3">
                     <div className="w-[50%] h-[100%]">
                    <label>
                    {firstCapitalize(t('account_number'))}
                    <input type="number" name="account_number" onChange={formHandler} value={bankAccount.account_number} className='p-1 rounded w-[100%] outline-none'/>
                    <br />
                    </label>
                    </div>

                    <div className="w-[50%] h-[100%]">
                    <label>
                    {firstCapitalize(t('description'))}
                    <textarea name="description" onChange={formHandler} value={bankAccount.description} className='p-1 rounded w-[100%] outline-none '/>
                    <br />
                    </label>
                    </div>
                    </div>
                    </div>

                    {
                    companyState.companies.length > 0 &&
                    <div className="flex justify-end mt-auto p-2"><button className="p-2 bg-green-100 rounded">{bankAccount.id ? firstCapitalize(t('update')) : firstCapitalize(t('create'))}</button></div>
                    }
            </form>
        </Modal>
        </>
    );
};

export default CreateBank;
