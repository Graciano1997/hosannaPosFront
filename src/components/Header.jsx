import { Bars3Icon,BellIcon,InboxIcon, LanguageIcon, MagnifyingGlassIcon, QuestionMarkCircleIcon, ServerStackIcon, UserPlusIcon } from "@heroicons/react/24/solid";

const Header=({setVisibility})=>{
    
    return(
        <header className="flex justify-between p-4">
            <Bars3Icon className="w-5 y-5 cursor-pointer" onClick={(el)=>{ el.stopPropagation(); setVisibility(true)}} />
            <div className="flex gap-5">
                <BellIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                <InboxIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                <UserPlusIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                <MagnifyingGlassIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                <QuestionMarkCircleIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow"/>
                <LanguageIcon className="w-5 y-5 text-[#323232] cursor-pointer hover:shadow" />
            </div>          
        </header>
    );
};

export default Header;