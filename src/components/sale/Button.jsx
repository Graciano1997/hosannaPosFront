import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { order, saleClean } from "../../slices/saleSlice";
import { showToast } from "../../slices/appSlice";
import { PaymentType } from "../../lib/Enums";
import { firstCapitalize } from "../../lib/firstCapitalize";

const ButtonGroup = ()=>{
    const {t}=useTranslation();

    const dispatch = useDispatch();

    const saleState = useSelector((state)=>state.saleState);
    
    const orderHandler = ()=>{

        const treatedSaleObject = {
            client:{
                ...saleState.clientDetails
            },
            sale:{
                qty:saleState.totalItems,
                payment_way:saleState.paymentType,
                received_cash:saleState.paymentType!== PaymentType.CASH ? saleState.total : saleState.receivedCash,
                descount:0,
                total: saleState.total,
                client_id:1,
                user_id:1                
            },
            items : saleState.items
        }

        console.log(treatedSaleObject);

        dispatch(order(treatedSaleObject))
        .then(()=>{
        dispatch(showToast({ success:true, message:t('order_sucessfuly')}))
        })
        .then(()=>{
            dispatch(saleClean());
        })        
    };

    return(
    <div className="absolute bottom-[-7px]  w-[100%] flex justify-end">
        <button type="button"
        onClick={orderHandler}
         className="font-bold bg-green-200 rounded p-2 hover:shadow">{firstCapitalize(t('order'))}</button>
    </div>
    )
};

export default ButtonGroup;