import { BriefcaseIcon, UserIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { useDispatch, useSelector } from "react-redux";
import { selectProfile, unselectProfile } from "../../slices/profileSlice";
import { Profiles } from "../../lib/Enums";
import Modal from "../general/Modal";
import Roles from "./Roles";

const Profile = ()=>{
    const {t}= useTranslation();
    const dispatch = useDispatch();
    const {selectedProfile} = useSelector((state)=>state.profileState);


    return(
        <>
        <div className="w-100 h-[400px] flex justify-around items-center ">
            <div onClick={()=>{
                dispatch(selectProfile(Profiles.OPERATOR))            
            }} className={`flex flex-col justify-center items-center cursor-pointer transition-2s  hover:shadow h-[180px] w-[180px] p-3 ${selectedProfile==Profiles.OPERATOR?'bg-green-200 rounded-[8px]':''}`}>
                <UserIcon className="h-100 w-100" />
                <h3 className="p-2 text-2xl">{firstCapitalize(t('operator'))}</h3>
            </div>

            <div
            onClick={()=>{
                dispatch(selectProfile(Profiles.MASTER))            
            }}  className={`flex flex-col justify-center items-center cursor-pointer hover:shadow h-[180px] w-[180px] p-3 ${selectedProfile==Profiles.MASTER?'bg-green-200 rounded-[8px]':''}`}>
                <BriefcaseIcon className="h-100 w-100"/>
                <h3 className="p-2 text-2xl">{firstCapitalize(t('admin'))}</h3>
            </div>
        </div>
        {/* pendente..... */}
        {/* {selectedProfile && <Modal helper={unselectProfile}><Roles/></Modal>} */}
    </>
    )
};

export default Profile;