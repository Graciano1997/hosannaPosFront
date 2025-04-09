import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFetcher, useLocation, useNavigate } from "react-router-dom";
import { authenticate,logoutUser, showToast } from "../../slices/appSlice";
import { useEffect, useState } from "react";
import { firstCapitalize } from "../../lib/firstCapitalize";

const Login = ()=>{
    
    const dispatch = useDispatch();
    const {pathname}=useLocation();
    const appState = useSelector((state)=>state.appState);
    const {t}=useTranslation();
    const navegate = useNavigate();
    const [user,setUser]=useState({});
    
    useEffect(()=>{        
     if(pathname=="/logout"){
         dispatch(logoutUser());
     }
     
     if(pathname=="/" && localStorage.getItem("isLogged")){ navegate('/dashboard'); }
     },[]);

    const handleInputChange=(el)=>{
        setUser({
            ...user,
            [el.target.name]:el.target.value
        });
    }

    const formHandler= (el)=>{
        el.preventDefault();
        dispatch(authenticate(user));       
    }

    return(
    <div className="w-100 h-screen flex justify-center items-center">
    <form method="POST" onSubmit={formHandler} className="bg-white w-[400px] sm:w-[500px] h-[300px] rounded shadow-md p-7 flex flex-col gap-3">
    <label>
    {firstCapitalize(t('email'))}
    <br />
    <input type='email' onChange={handleInputChange}  name="email" className='mt-[0.5rem] p-1 rounded w-[100%] outline-none' min={0} />
    </label>
    <label>
    {firstCapitalize(t('password'))}
    <br />
    <input type='password' onChange={handleInputChange}  name="password" className='mt-[0.5rem] p-1 rounded w-[100%] outline-none' min={0} />
    </label>
    {appState.error &&
    <span>
        {t('invalid_email_or_password')}
    </span>

    }


    <div className="flex justify-center mt-[2rem] p-2">
        <button type="submit" className="p-2 bg-green-100 rounded">Entrar</button>
    </div>
   </form>
    </div>
    );
};

export default Login;
