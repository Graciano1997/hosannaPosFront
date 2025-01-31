import { Bars3Icon,BellIcon,InboxIcon, LanguageIcon, MagnifyingGlassIcon, QuestionMarkCircleIcon, ServerStackIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Searching } from "../../slices/appSlice";

const Header=({setVisibility})=>{
    const {i18n,t} = useTranslation();
    const dispatch = useDispatch();

    return(
        <header className="flex justify-between">
            <Bars3Icon className="w-7 y-7 cursor-pointer" onClick={(el)=>{ el.stopPropagation(); setVisibility(true)}} />
            <div className="flex gap-5">
                <BellIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                <InboxIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                <MagnifyingGlassIcon onClick={(e)=>{e.stopPropagation(); dispatch(Searching())}} className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                <QuestionMarkCircleIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                <div className="flex gap-0">
                <LanguageIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow" />
                    <select value={i18n.language} className="bg-transparent rounded p-1" onChange={(el)=>{
                        i18n.changeLanguage(el.target.value)
                    }}>
                        <option value="en">{t('english')}</option>
                        <option value="pt">{t('portuguese')}</option>
                    </select>
                </div>
            </div>          
        </header>
    );
};

export default Header;