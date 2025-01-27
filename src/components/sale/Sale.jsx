import { useTranslation } from "react-i18next";
import SaleHeader from "./SaleHeader";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ClientDetails from "./ClientDetails";
import SaleDetails from "./SaleDetails";
import QrCodeReader from "../QrCode/QrCodeReader";

const Sale=({setToastObject})=>{

    const {t}=useTranslation();
    const [isReadingQr,setIsReadingQr]=useState(false);
    const [readValue,setReadValue]= useState(null);
    
        return(
        <>
        <SaleHeader title={t('sales')} setIsReadingQr={setIsReadingQr} setReadValue={setReadValue} />
        <div className="xs:grid xs:grid-cols-[25fr_75fr] xs:gap-4 xs:mt-4 p-1 sm:gap-4">
        <ClientDetails/>
        <SaleDetails readValue={readValue}/> 
        </div>
        {isReadingQr && (<QrCodeReader 
        setToastObject={setToastObject}
        readValue={readValue}
         setReadValue={setReadValue}
          setIsReadingQr={setIsReadingQr}
          />)}
        </>
    )
};

export default Sale;