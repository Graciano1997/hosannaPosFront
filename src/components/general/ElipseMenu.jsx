import { useTranslation } from "react-i18next";
import { firstCapitalize } from "../../lib/firstCapitalize";

const ElipseMenu=()=>{
    const {t}= useTranslation();

    return(
        <>
<ul   className="flex flex-col gap-3 w-[150px] h-[35px] right-[20px] justify-center bg-white shadow rounded absolute z-2000" id="elipseMenu">
                <li className="m-0.5 flex gap-3 items-center justify-center hover:cursor-pointer"><span className="">{ firstCapitalize(t('export'))}</span><ArrowUpTrayIcon className="w-4 h-4"/></li>
                </ul>
        </>
    );
};

export default ElipseMenu;
