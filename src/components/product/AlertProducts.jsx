import { useSelector } from "react-redux";
import { fetchAlertProducts, setAlertProducts } from "../../slices/productSlice";
import Table from "../Table/Table";

const AlertProducts=()=>{
    
    const productState = useSelector((state)=>state.productState);
  
    return(
        <>
        <Table filterDetails={[]} create={null} update={null} fetcher={fetchAlertProducts} setCollection={setAlertProducts}  deleteItem={null} rowStyle="bg-yellow-100" collection={productState.alertProducts || []} />
        </>
    )
};

export default AlertProducts;