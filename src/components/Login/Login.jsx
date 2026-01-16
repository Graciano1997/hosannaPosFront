import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFetcher, useLocation, useNavigate } from "react-router-dom";
import { authenticate, logoutUser, showToast } from "../../slices/appSlice";
import { useEffect, useState } from "react";
import { firstCapitalize } from "../../lib/firstCapitalize";
import CompanyLand from "./CompanyLand";

const Login = () => {

    const dispatch = useDispatch();
    const appState = useSelector((state) => state.appState);
    const { t } = useTranslation();
    const navegate = useNavigate();
    const [user, setUser] = useState({});


    const handleInputChange = (el) => {
        setUser({
            ...user,
            [el.target.name]: el.target.value
        });
    }

    const formHandler = (el) => {
        el.preventDefault();
        dispatch(authenticate(user)).
        then((loginState)=>{
            if(authenticate.fulfilled.match(loginState) && loginState.payload.user.id){
                navegate('/dashboard')
            }
        })
    }

    return (
        <>
            <div className="w-100 -m-3 lg:h-screen flex flex-col  justify-center  lg:grid lg:grid-cols-7 ">
                <CompanyLand/>
                <div className="flex items-center justify-center col-span-3 lg:bg-white">
                <form method="POST" onSubmit={formHandler} className="bg-white w-[400px] sm:w-[500px] rounded shadow-2xl shadow-black/2 p-5 flex flex-col gap-3">
                    <label>
                        {firstCapitalize(t('email'))}
                        <br />
                        <input type='email' onChange={handleInputChange} name="email" className='mt-[0.5rem] p-1 rounded w-[100%] outline-none' min={0} />
                    </label>
                    <label>
                        {firstCapitalize(t('password'))}
                        <br />
                        <input type='password' onChange={handleInputChange} name="password" className='mt-[0.5rem] p-1 rounded w-[100%] outline-none' min={0} />
                    </label>
                    {appState.error &&
                        <span className="text-red-500">
                            {firstCapitalize(t('invalid_email_or_password'))}
                        </span>

                    }

                    <div className="flex flex-col gap-5 justify-center mt-[0.5rem] p-2">
                        <button type="submit" className="p-2 bg-green-200 rounded">{firstCapitalize(t('sign_in'))}</button>
                        <button type="button"
                        onClick={()=>{
                            navegate('/create_company')
                        }}
                        className="p-2 bg-green-900 text-white rounded self-center w-[80%]">{firstCapitalize(t('create_company'))}</button>
                    </div>
                </form>

                </div>
                <div className="flex flex-col justify-center sm:mt-[2rem] gap-[8px] py-5 lg:hidden">
                <p className="text-center text-light text-red-900">{t('author')}</p>
                </div>
            </div>

        </>
    );
};

export default Login;
