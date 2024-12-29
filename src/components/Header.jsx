import { Bars3Icon,BellIcon,InboxIcon, MagnifyingGlassIcon, QuestionMarkCircleIcon, ServerStackIcon, UserPlusIcon } from "@heroicons/react/24/solid";

const Header=()=>{
    return(
        <header className="flex justify-between p-4">
            <Bars3Icon className="w-5 y-5 cursor-pointer"/>
            <div className="flex gap-5">
                <BellIcon className="w-5 y-5 text-[#323232] cursor-pointer"/>
                <InboxIcon className="w-5 y-5 text-[#323232] cursor-pointer"/>
                <UserPlusIcon className="w-5 y-5 text-[#323232] cursor-pointer"/>
                <MagnifyingGlassIcon className="w-5 y-5 text-[#323232] cursor-pointer"/>
                <QuestionMarkCircleIcon className="w-5 y-5 text-[#323232] cursor-pointer"/>
            </div>          
        </header>
    );
};

export default Header;