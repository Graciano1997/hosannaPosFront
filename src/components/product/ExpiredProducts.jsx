import { useDispatch, useSelector } from "react-redux";
import { expiredProductJob, fetchAnualExpiredProducts, fetchExpiredProducts, setExpireds } from "../../slices/productSlice";
import { showToast } from "../../slices/appSlice";
import { useEffect } from "react";
import Table from "../Table/Table";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { useTranslation } from "react-i18next";

const ExpiredProducts=()=>{
    const dispatch = useDispatch();
    const {t}=useTranslation();
    useEffect(()=>{
        dispatch(fetchExpiredProducts());
    },[]);
    const productState = useSelector((state)=>state.productState);
   

    return(
        <>
        <Table filterDetails={[]} create={null} update={null} fetcher={fetchAnualExpiredProducts} dispatcher={setExpireds} deleteItem={null} collection={productState.expireds || []}/>
        <div className="flex justify-end p-2 mt-auto"><button type="button" onClick={()=>{
            dispatch(expiredProductJob())
            .then(()=>{
               dispatch(showToast({success:true,message:firstCapitalize(t('product_verification_runing'))}));
            })
        }}className="p-2 bg-green-300 rounded">{firstCapitalize(t('run_expired_verification'))}</button></div>
        </>
    )
};

export default ExpiredProducts;