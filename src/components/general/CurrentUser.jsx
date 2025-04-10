import { useState } from "react";
import Footer from "./Footer";
import { firstCapitalize } from "../../lib/firstCapitalize";

const CurrentUser=()=>{
    
    const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));

    return(
                <div className="flex justify-start items-center gap-2 mt-1 w-[100%]">
                <div className="w-[40px] h-[40px]">
                    <img src={currentUser.image} className="w-[100%] h-[100%] rounded-full cursor-pointer shadow-lg"/>
                </div>
                <p className="text-[20px]">{firstCapitalize(currentUser.name)}</p>
                </div>
    );

};

export default CurrentUser;