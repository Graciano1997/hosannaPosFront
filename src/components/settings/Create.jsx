import {useState } from "react";
import Modal from "../general/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { fetchCompanies, registerCompany, stopCreatingOrUpdateingCompany, updateCompany } from "../../slices/companySlice";

const Create=()=>{
    
    const companyState = useSelector((state)=> state.companyState );
    const dispatch = useDispatch();
    
    const [company,setCompany] = useState(companyState.companyToUpdate);
    const {t}=useTranslation();

       const formHandler = (el) => {
            setCompany({
                ...company,
                [el.target.name]: el.target.value
            })
        }
    
        const handleFormSubmition = (el) => {
            el.preventDefault();
       
              if (company.id) {
                  dispatch(updateCompany(company))
                  .then(()=>{
                    dispatch(fetchCompanies())
                  })
   
              } else {
                  dispatch(registerCompany(company))
                  .then(()=>{
                    dispatch(fetchCompanies())
                  })
              }
        }

    return(
        <>
        <Modal helper={stopCreatingOrUpdateingCompany}>
        <form onSubmit={handleFormSubmition} className='flex flex-col mt-[2%] h-[100%] rounded p-3'>
                <div className="flex flex-col gap-4">
                
                <div className="flex gap-3">
                <div className="w-[50%]">
                <label>
                { firstCapitalize(t('name'))}
                <br />
                <input type="text" name="name" onChange={formHandler} value={company.name} className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>

                <div className="w-[50%]">
                <label>
                { firstCapitalize(t('email'))}
                <br />
                <input type="email" name="email" onChange={formHandler} value={company.email} className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
                </div>

                <div className="flex gap-3">
                <div className="w-[50%]">
                <label>
                { firstCapitalize(t('phone'))}
                <br />
                <input type="tel" name="phone" onChange={formHandler} value={company.phone} className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>

                <div className="w-[50%]">
                <label>
                { firstCapitalize(t('alternative_phone'))}
                <br />
                <input type="text" name="alternative_phone" onChange={formHandler} value={company.alternative_phone} className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
                </div>

                <div className="flex gap-3">
                <div className="w-[50%]">
                <label>
                {firstCapitalize(t('nif'))}
                <input type="text" name="nif" onChange={formHandler} value={company.nif} className='p-1 rounded w-[100%] outline-none'/>
                <br />
                </label>

                </div>
                <div className="w-[50%]">
                <label>
                {firstCapitalize(t('website'))}
                <input type="text" name="website" onChange={formHandler} value={company.website} className='p-1 rounded w-[100%] outline-none'/>
                <br />
                </label>
                </div>
                </div>
                
                <div className="flex gap-3">
                <div className="w-[100%]">
                <label>
                { firstCapitalize(t('address'))}
                <br />
                <input type="text" name="address" onChange={formHandler} value={company.address} className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div> 
                </div>
                </div>
                <div className="flex justify-end mt-auto p-2"><button className="p-2 bg-green-100 rounded">{company.id ? firstCapitalize(t('update')) : firstCapitalize(t('create'))}</button></div>
             </form>
        </Modal>
        </>
    );
};

export default Create;
