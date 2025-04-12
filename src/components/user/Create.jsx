import { useEffect, useRef, useState } from "react";
import Modal from "../general/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfiles } from "../../slices/profileSlice";
import { useTranslation } from "react-i18next";
import { registerUser, stopCreatingOrUpdateingUser, updateUser } from "../../slices/userSlice";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { showToast } from "../../slices/appSlice";

const Create=()=>{

    const image = useRef();
    const dispatch = useDispatch();
    const {t}=useTranslation();

    useEffect(()=>{
        dispatch(fetchProfiles());
    },[]);


   const userState = useSelector((state)=>state.userState);
   const profileState = useSelector((state)=>state.profileState);
   const profiles = profileState.profiles;
   const [user,setUser]=useState(userState.userToUpdate);

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
    formData.append(`user[password]`,user.password);

    if(image.current.files[0]) {
        formData.append('user[image]', image.current.files[0]);   
      }
    
    let treatedUserObject = { ...user }

       if(treatedUserObject.id){
        formData.append("user[id]",treatedUserObject.id);
         dispatch(updateUser(formData))
         .then(()=>{
            dispatch(showToast({success:true,message:firstCapitalize(t('updated_succeed'))}));
         });
       }else{
           dispatch(registerUser(formData))
           .then(()=>{
            dispatch(showToast({success:true,message:firstCapitalize(t('created_succeed'))}));
         });
       }
   }

    return(
        <>
        <Modal helper={stopCreatingOrUpdateingUser}>
        <form onSubmit={handleFormSubmition} className='flex flex-col h-[100%]  mt-[1rem] rounded p-3'>
                <div className="flex flex-col gap-4">
                <div className="flex gap-5">
                <div className="w-[50%]">
                <label>
                {firstCapitalize(t('name'))}
                <br />
                <input type='text' onChange={formHandler} name="name" value={user.name}  className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div>
               
                <div className="w-[50%]">
                <label>
                {firstCapitalize(t('email'))}
                <br />
                <input type='email' onChange={formHandler} name="email" value={user.email}  className='p-1 rounded w-[100%] outline-none'/>
                </label>
                </div> 
                </div>
                <div className="flex gap-5">
                <div className="w-[50%]">
                <label>
                {firstCapitalize(t('status'))}
                <br />
                <select name="active" value={user.active}  className='p-2 rounded w-[100%] outline-none' onChange={formHandler}>
                <option value="" disabled selected>{t('select_status')}</option>
                    <option value={true}>{t('active')}</option>
                    <option value={false}>{t('disative')}</option>
                </select>
                </label>
                </div>

                <div className="w-[50%]">
                <label>
                {firstCapitalize(t('profile'))}
                <br />
                <select name="profile_id" value={user.profile_id}  className='p-2 rounded w-[100%] outline-none' onChange={formHandler}>
                <option value="" disabled selected>{firstCapitalize(t('select_profile'))}</option>
                {profiles.map((profile,index)=><option key={index} value={profile.id}>{profile.name}</option>)}
                </select>
                </label>
                </div>
                </div>

                <div className="flex gap-5">
                {(user.id == JSON.parse(localStorage.getItem("currentUser")).id || user.id == undefined ) &&
                    <div className="w-[50%]">
                    <label>
                    {firstCapitalize(t('password'))}
                    <br />
                    <input type='password' onChange={formHandler} name="password"   className='p-1 rounded w-[100%] outline-none'/>
                    </label>
                    </div>
                }


                <div className="w-[50%]">
                <label>
                {firstCapitalize(t('image'))}
                <br />
                <input type="file" name="image" ref={image}/>
                </label>
                </div>
                </div>
                </div>
                <div className="flex justify-end p-2 mt-auto"><button className="p-2 bg-green-100 rounded">{ user.id? 'Update':'Create'}</button></div>
                </form>
        </Modal>
    </>
    );
};

export default Create;
