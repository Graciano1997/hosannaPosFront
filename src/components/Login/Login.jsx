import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Login = ()=>{

    const {t}=useTranslation();
    const navegate = useNavigate();
    
    return(
    <div className="w-100 h-screen flex justify-center items-center">
    <form className="bg-white w-[400px] sm:w-[500px] h-[300px] rounded shadow-md p-7 flex flex-col gap-3">
    <label className="dynamic">
    {t('Email')}
    <br />
    <input type='email'  name="email" className='mt-[0.5rem] p-1 rounded w-[100%] outline-none' min={0} />
    </label>
    <label>
    {t('Senha')}
    <br />
    <input type='password'  name="password" className='mt-[0.5rem] p-1 rounded w-[100%] outline-none' min={0} />
    </label>
    <div className="flex justify-center mt-[2rem] p-2">
        <button onClick={()=>{
            navegate("/dashboard")
        }} className="p-2 bg-green-100 rounded">Entrar</button>
    </div>
   </form>
    </div>
    );
};

export default Login;
