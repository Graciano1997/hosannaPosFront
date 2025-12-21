import { useTranslation } from "react-i18next";

const Footer=()=>{
    const {t}=useTranslation();
return(
<footer className="fixed bootom-[0] w-[100%] flex justify-center mt-2 items-center h-[30px]  border-t border-solid border-white">
    <p className="pt-2">{t('footer_description')}</p>
</footer>
);    
}

export default Footer;


