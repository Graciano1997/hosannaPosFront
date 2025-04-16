import { useDispatch, useSelector } from "react-redux";
import { order, saleClean, saleNotConfirm, setSaleObject } from "../../slices/saleSlice";
import { closeModal, showToast } from "../../slices/appSlice";
import { PaymentType } from "../../lib/Enums";
import { useTranslation } from "react-i18next";
import { clearSearchedProduct } from "../../slices/productSlice";

const SaleConfirmation = ()=>{
    const {t}=useTranslation();

        const dispatch = useDispatch();
        const saleState = useSelector((state)=>state.saleState);
        const orderHandler = ()=>{
    
            const treatedSaleObject = {
                client:{
                    ...saleState.clientDetails
                },
                sale:{
                    invoiceType:saleState.invoiceType*1,
                    qty:saleState.totalItems,
                    payment_way:saleState.paymentType,
                    received_cash:saleState.paymentType== PaymentType.CASH ? saleState.receivedCash:null,
                    received_tpa:saleState.paymentType== PaymentType.TPA ? saleState.total : 0,
                    descount:0,
                    difference:saleState.paymentType == PaymentType.TPA ? 0 : (saleState.receivedCash*1 - saleState.total*1),
                    total: saleState.total,
                    user_id:JSON.parse(localStorage.getItem('currentUser')).id             
                },
                items : saleState.items
            }
            
            console.log(treatedSaleObject);
            
            dispatch(order(treatedSaleObject))
            .then(()=>{
            dispatch(showToast({ success:true, message:t('order_sucessfuly')}));
            dispatch(saleClean());
            dispatch(clearSearchedProduct());
            });

            dispatch(closeModal());
        };
    return(
    <div className="mt-[100px] text-center">
            <h1 style={{
                "fontSize":"20pt",
                "fontFamily":"Arial,Helvetica,SansSerif",
                "marginBottom":"30px"
            }}>Confirmar a venda</h1>
            <h2 className="text-2xl">Confirmar a venda e gerar a fatura da compra</h2>
            <div className="mt-[2rem]">
                <button onClick={(el)=>{
                        dispatch(saleNotConfirm());
                        dispatch(closeModal());
                    el.stopPropagation();
                }} 
                className="bg-blue-600 text-white rounded-[4px] m-[10px_20px] p-[10px_40px]">Cancelar</button>
                <button onClick={orderHandler} className=" bg-[rgba(0,50,0,0.3)] text-white rounded-[4px] m-[10px_20px] p-[10px_40px]"  >Confirmar</button>
            </div>
        </div>
    );
};

export default SaleConfirmation;