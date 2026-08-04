import { useTranslation } from "react-i18next";
import CardWrapper from "./CardWrapper";
import TabWrapper from "./TabWrapper";
import { firstCapitalize } from "../../lib/firstCapitalize";
import React from "react";

export const ErrorPage = React.memo(({content,errorCode})=>{
    return(

                    <div className="flex items-center justify-center h-[400px] mt-5">
                        <div className="flex flex-col items-center">
                        <h1 className="text-[5rem]">{errorCode}</h1>
                        <h3 className="text-4xl sm:text-[4rem] text-primar text-center">{content}</h3>
                        </div>
                    </div>
    );
})

