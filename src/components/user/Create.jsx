import { useEffect, useRef, useState } from "react";
import Modal from "../general/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfiles } from "../../slices/profileSlice";
import { useTranslation } from "react-i18next";
import { registerUser } from "../../slices/userSlice";

const Create=({stopCreating})=>{

    const image = useRef();
    const dispatch = useDispatch();
    const {t}=useTranslation();

    useEffect(()=>{
        dispatch(fetchProfiles());
    },[]);


   const profileState = useSelector((state)=>state.profileState);
   const profiles = profileState.profiles;
   const [user,setUser]=useState();


   const formHandler = (el)=>{
    setUser({
        ...user,
        [el.target.name]:el.target.value
    })
   }

   const handleFormSubmition =async (el)=>{
    el.preventDefault();
    
    const formData = new FormData();
    
    formData.append("user[name]",user.name);
    formData.append(`user[email]`,user.email);
    formData.append(`user[profile_id]`,parseInt(user.profile_id));
    formData.append(`user[active]`,user.active);
    formData.append('user[image]', image.current.files[0]);   
   
    let treatedUserObject = { ...user }

      if(treatedUserObject.id){
          dispatch(updateUser(formData));
      }else{
          dispatch(registerUser(formData));
      }
   }

    return(
        <>
        <Modal stopCreating={stopCreating}>
        <form onSubmit={handleFormSubmition} className='flex flex-col h-[100%]  mt-[1rem] rounded p-3'>
                <div className="flex flex-col gap-4">
                <div className="flex gap-5">
                <div className="w-[50%]">
                <label>
                {t('name')}
                <br />
                <input type='text' onChange={formHandler} name="name"  className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
               
                <div className="w-[50%]">
                <label>
                {t('email')}
                <br />
                <input type='email' onChange={formHandler} name="email"  className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div> 
                </div>
                <div className="flex gap-5">
                <div className="w-[50%]">
                <label>
                {t('status')}
                <br />
                <select name="active"  className='p-2 rounded w-[100%] outline-none' onChange={formHandler}>
                <option value="" disabled selected>Selecione o estado</option>
                    <option value={true}>{t('active')}</option>
                    <option value={false}>{t('disative')}</option>
                </select>
                </label>
                </div>

                <div className="w-[50%]">
                <label>
                {t('profile')}
                <br />
                <select name="profile_id"  className='p-2 rounded w-[100%] outline-none' onChange={formHandler}>
                <option value="" disabled selected>Selecione o perfil</option>
                {profiles.map((profile,index)=><option key={index} value={profile.id}>{profile.name}</option>)}
                </select>
                </label>
                </div>
                <input type="file" name="image" ref={image}/>
                </div>

                </div>
                <div className="flex justify-end p-2 mt-auto"><button className="p-2 bg-green-100 rounded"> {'Create'}</button></div>
                </form>
        </Modal>
    </>
    );
};

export default Create;
