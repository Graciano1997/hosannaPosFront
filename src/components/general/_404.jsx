import { useTranslation } from "react-i18next";
import CardWrapper from "./CardWrapper";
import TabWrapper from "./TabWrapper";
import { firstCapitalize } from "../../lib/firstCapitalize";

const _404= ()=>{
    const {t} = useTranslation();

    return(
                <CardWrapper>
                <TabWrapper>
                    <div className="flex items-center justify-center h-[400px]">
                        <div className="flex flex-col items-center">
                        <h1 className="text-[5rem] text-green-300">{404}</h1>
                        <h3 className="text-4xl sm:text-[4rem] text-green-400 text-center">{firstCapitalize(t('not_found_url'))}</h3>
                        </div>
                    </div>
                </TabWrapper>
                </CardWrapper>
    );
};

export default _404;
