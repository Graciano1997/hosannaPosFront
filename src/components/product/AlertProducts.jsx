import { useDispatch, useSelector } from "react-redux";
import { expiredProductJob, fetchAlertProducts, fetchAnualExpiredProducts, fetchExpiredProducts, setAlertProducts, setExpireds } from "../../slices/productSlice";
import { showToast } from "../../slices/appSlice";
import { useEffect } from "react";
import Table from "../Table/Table";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { useTranslation } from "react-i18next";

const AlertProducts=()=>{
    const dispatch = useDispatch();
    const {t}=useTranslation();
    
    const productState = useSelector((state)=>state.productState);
  
    return(
        <>
        <Table filterDetails={[]} create={null} update={null} fetcher={fetchAlertProducts} setCollection={setAlertProducts}  deleteItem={null} collection={productState.alertProducts || []}/>
        </>
    )
};

export default AlertProducts;