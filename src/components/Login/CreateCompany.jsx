import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFetcher, useLocation, useNavigate } from "react-router-dom";
import { authenticate, logoutUser, showToast } from "../../slices/appSlice";
import { useEffect, useState } from "react";
import { firstCapitalize } from "../../lib/firstCapitalize";
import logo from '../../../src/assets/Img/Logo.svg'
import CompanyLand from "./CompanyLand";
import { registerStore } from "../../slices/companySlice";
import {rootpath} from "../../lib/ip";
import { Button } from "../general/Button";

const CreateCompany = () => {

    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const appState = useSelector((state) => state.appState);
    const { t } = useTranslation();
    const navegate = useNavigate();
    const [store, setStore] = useState({});

    const [passwordConfirmation, setPasswordConfirmation] = useState({
        password:'',
        confirmation:'',
        passwordMatching:false
    });

    const handleInputChange = (el) => {
        setStore({
            ...store,
            [el.target.name]: el.target.value
        });
        
    switch (el.target.name) {
        case 'password':
            setPasswordConfirmation(
                {
                    ...passwordConfirmation, 
                    password:el.target.value,
                    passwordMatching: el.target.value === passwordConfirmation.confirmation
                }
            )
            break;

        case 'password_confirmation':
            setPasswordConfirmation(
                {
                    ...passwordConfirmation, 
                    confirmation:el.target.value,
                    passwordMatching: el.target.value === passwordConfirmation.password
                }
            )
            break;
    }
    }

    const formHandler = (el) => {
        el.preventDefault();

        dispatch(registerStore(store)).then((res) => {
            if (res.error) {
                dispatch(showToast({ message: t(`${res.error.message}`.toLowerCase().replaceAll(" ","_")), error: true }));
            } else {
                dispatch(showToast({ message: t('company_created_successfully'), success: true }));
                navegate( rootpath + 'login');
            }
        });
    }

    return (
            <div className="w-100 -m-3 lg:h-screen flex flex-col  justify-center  lg:grid lg:grid-cols-7">
                <CompanyLand/>
                <div className="flex items-center justify-center col-span-3 lg:bg-white">
                <form method="POST" onSubmit={formHandler} className="bg-white w-[400px] sm:w-[500px] rounded shadow-2xl shadow-black/2 p-5 flex flex-col gap-3">
                    <label>
                        {firstCapitalize(t('proprietary_name'))}
                        <br />
                        <input type='text' onChange={handleInputChange} name="ownername" className='mt-[0.5rem] p-1 rounded w-[100%] outline-none'  required />
                    </label>
                    <div className="flex md:justify-between gap-1">
                    <label>
                        {firstCapitalize(t('proprietary_address'))}
                        <br />
                        <input type='text' onChange={handleInputChange} name="owneraddress" className='mt-[0.5rem] p-1 rounded w-[100%] outline-none'required />
                    </label>
                    <label>
                        {firstCapitalize(t('proprietary_phone'))}
                        <br />
                        <input type='tel' onChange={handleInputChange} name="ownerphone" className='mt-[0.5rem] p-1 rounded w-[100%] outline-none' required />
                    </label>
                    </div>
                    <label>
                        {firstCapitalize(t('company_name'))}
                        <br />
                        <input type='text' onChange={handleInputChange} name="companyname" className='mt-[0.5rem] p-1 rounded w-[100%] outline-none' required />
                    </label>
                    <div className="flex md:justify-between gap-1">
                    <label>
                        {firstCapitalize(t('company_nif'))}
                        <br />
                        <input type='text' onChange={handleInputChange} name="companynif" className='mt-[0.5rem] p-1 rounded w-[100%] outline-none'/>
                    </label>
                    <label>
                        {firstCapitalize(t('company_phone'))}
                        <br />
                        <input type='tel' onChange={handleInputChange} name="companyphone" className='mt-[0.5rem] p-1 rounded w-[100%] outline-none' required />
                    </label>
                    </div>

                    <label>
                        {firstCapitalize(t('email'))}
                        <br />
                        <input type='email' onChange={handleInputChange} name="email" className='mt-[0.5rem] p-1 rounded w-[100%] outline-none' required />
                    </label>
                    <label>
                        {firstCapitalize(t('password'))}
                        <br />
                        <input type='password' onChange={handleInputChange} name="password" className='mt-[0.5rem] p-1 rounded w-[100%] outline-none' required />
                    </label>
                    <label>
                        {firstCapitalize(t('password_confirmation'))}
                        <br />
                        <input type='password' onChange={handleInputChange} name="password_confirmation" className='mt-[0.5rem] p-1 rounded w-[100%] outline-none' required />
                    </label>

                    {
                    passwordConfirmation.password!=='' 
                    && passwordConfirmation.confirmation!=='' 
                    && !passwordConfirmation.passwordMatching && (
                        <p className="text-red-500">{t('password_not_match')}</p>
                    )}
               
                    <div className="flex flex-col gap-5 justify-center mt-[0.5rem] p-2">
                    
                         <Button type={"submit"} className={"p-2 bg-secondary text-white rounded "} content={firstCapitalize(t('create_company'))} />
                         <Button onClickHandler={()=>{navegate(`${rootpath}login`)}} className={"p-2 rounded self-center w-[80%]"} content={firstCapitalize(t('sign_in'))} />
                    </div>
                    
                    {appState.error &&
                        <span className="text-red-500">
                            {firstCapitalize(t(`${appState.error}`.toLowerCase().replaceAll(" ","_")))}
                        </span>
                    }
                </form>

                </div>
                <div className="flex flex-col justify-center sm:mt-[2rem] gap-[8px] py-5 lg:hidden">
                <p className="text-center text-light text-red-900">{t('author')}</p>
                </div>
            </div>
    );
};

export default CreateCompany;
