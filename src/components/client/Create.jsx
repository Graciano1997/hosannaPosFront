import { useEffect, useRef, useState } from "react";
import Modal from "../general/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfiles } from "../../slices/profileSlice";
import { useTranslation } from "react-i18next";
import { stopCreatingOrUpdateingClient, updateClient } from "../../slices/clientSlice";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { showToast } from "../../slices/appSlice";

const Create=()=>{

    const image = useRef();
    const dispatch = useDispatch();
    const {t}=useTranslation();

    useEffect(()=>{
        dispatch(fetchProfiles());
    },[]);


   const clientState = useSelector((state)=>state.clientState);
   const profileState = useSelector((state)=>state.profileState);
   const profiles = profileState.profiles;
   const [client,setClient]=useState(clientState.clientToUpdate);

   const formHandler = (el)=>{
    setClient({
        ...client,
        [el.target.name]:el.target.value
    })
   }

   const handleFormSubmition =async (el)=>{
    el.preventDefault();
    
    const formData = new FormData();
    
    formData.append("client[name]",client.name);
    formData.append(`client[email]`,client.email);
    formData.append(`client[phone]`,client.phone);
    formData.append(`client[address]`,client.address);
    formData.append(`client[nif]`,client.nif);
    formData.append(`client[client_type]`,client.client_type);

    let treatedClientObject = { ...client }

       if(treatedClientObject.id){
        formData.append("client[id]",treatedClientObject.id);
         dispatch(updateClient(formData))
         .then(()=>{
            dispatch(showToast({success:true,message:firstCapitalize(t('updated_succeed'))}));
         });
       }else{
           dispatch(registerClient(formData))
           .then(()=>{
            dispatch(showToast({success:true,message:firstCapitalize(t('created_succeed'))}));
         });
       }
   }

    return(
        <>
        <Modal helper={stopCreatingOrUpdateingClient} title={client.id? firstCapitalize(t('update_client')): firstCapitalize(t('create_client'))}>
        <form onSubmit={handleFormSubmition} className='flex flex-col h-[100%]  mt-[1rem] rounded p-3'>
                <div className="flex flex-col gap-4">
                <div className="flex gap-5">
                <div className="w-[50%]">
                <label>
                {firstCapitalize(t('name'))}
                <br />
                <input type='text' onChange={formHandler} name="name" value={client.name}  className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
               
                <div className="w-[50%]">
                <label>
                {firstCapitalize(t('phone'))}
                <br />
                <input type='tel' onChange={formHandler} name="phone" value={client.phone}  className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div> 
                </div>

                <div className="flex gap-5">
                <div className="w-[50%]">
                <label>
                {firstCapitalize(t('address'))}
                <br />
                <input type='text' onChange={formHandler} name="address" value={client.address}  className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
               
                <div className="w-[50%]">
                <label>
                {firstCapitalize(t('email'))}
                <br />
                <input type='email' onChange={formHandler} name="email" value={client.email}  className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div> 

                
                </div>
           
                 <div className="flex gap-5">
                <div className="w-[50%]">
                <label>
                {firstCapitalize(t('nif'))}
                <br />
                <input type='text' onChange={formHandler} name="nif" value={client.nif}  className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
               
                <div className="w-[50%]">
                <label>
                {firstCapitalize(t('client_type'))}
                <br />
                <input type='text' onChange={formHandler} name="client_type" value={client.client_type}  className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div> 
                </div>
                </div>
                <div className="flex justify-end p-2 mt-auto"><button className="p-2 bg-green-100 rounded">{ firstCapitalize(t('update'))}</button></div>
                </form>
        </Modal>
    </>
    );
};

export default Create;