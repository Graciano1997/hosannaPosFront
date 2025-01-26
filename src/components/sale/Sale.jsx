import { useTranslation } from "react-i18next";
import SaleHeader from "./SaleHeader";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ClientDetails from "./ClientDetails";
import SaleDetails from "./SaleDetails";

const Sale=()=>{

    const {t}=useTranslation();
    
        return(
        <>
        <SaleHeader title={t('sales')} />
        <div className="xs:grid xs:grid-cols-[25fr_75fr] xs:gap-4 xs:mt-4 p-1 sm:gap-4">
        <ClientDetails/>
        <SaleDetails/> 
        </div>
        </>
    )
};

export default Sale;