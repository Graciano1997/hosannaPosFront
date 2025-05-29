import { useState } from "react";

import { firstCapitalize } from "../../lib/firstCapitalize";
import { useNavigate } from "react-router-dom";

const CurrentUser=()=>{
    
    const navegate = useNavigate();

    const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));

    return(
                <div className="flex justify-start items-center gap-2 mt-1 w-[100%] cursor-pointer" onClick={()=>{navegate('/profile')}}>
                <div className="w-[40px] h-[40px]">
                    <img src={currentUser.image} className="w-[100%] h-[100%] rounded-full cursor-pointer shadow-lg"/>
                </div>
                <p className="text-[20px]">{firstCapitalize(currentUser.name)}</p>
                </div>
    );

};

export default CurrentUser;