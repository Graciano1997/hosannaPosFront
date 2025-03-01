import { useTranslation } from "react-i18next";

const ElipseMenu=()=>{
    const {t}= useTranslation();

    return(
        <>
        <ul className="flex flex-col gap-1 w-[150px] h-[100%] bg-white shadow rounded" id="elipseMenu">
                <li className="m-0.5 text-center hover:sm:shadow hover:cursor-pointer">{t('export')}</li>
            </ul>
        </>
    );
};

export default ElipseMenu;
