import { useDispatch, useSelector } from "react-redux";
import { order, saleClean, saleNotConfirm, setSaleObject } from "../../slices/saleSlice";
import { closeModal, showToast } from "../../slices/appSlice";
import { PaymentType } from "../../lib/Enums";
import { useTranslation } from "react-i18next";
import { clearSearchedProduct } from "../../slices/productSlice";
import Pdf from "./Pdf";
import { useState } from "react";

const SaleConfirmation = ()=>{
    const {t}=useTranslation();
    const [isOrding,setIsOrding]= useState(false);

        const dispatch = useDispatch();
        const saleState = useSelector((state)=>state.saleState);
        const saleObject = saleState.saleObject;

        console.log(saleState);

        async function exportarParaPDF() {
            const { jsPDF } = window.jspdf;
            const itens = document.getElementById("itens");
            
            let conteud = '';

             { 
                saleState.items.forEach(item =>
                conteud +=`
                <p class="p001">
                <label class="p001-label" id="lb01">${item.name}</label>
                <label class="p001-label">${item.price}</label>
                <label class="p001-label">${item.qty}</label>
                <label class="p001-label">Un.</label>
                <label class="p001-label">0.0%.</label>
                <label class="p001-label">0.0%</label>
                <label class="p001-label">0.0%</label>
                <label class="p001-label">${item.total}.00</label>
              </p>`
            );
        } 


        // {
        //     "client": {
        //       "client_type": "SINGULAR",
        //       "phone": 911111111
        //     },
        //     "sale": {
        //       "invoiceType": 1,
        //       "qty": 3,
        //       "payment_way": "TPA",
        //       "received_cash": null,
        //       "received_tpa": 3000,
        //       "descount": 0,
        //       "difference": 0,
        //       "total": 3000,
        //       "user_id": 1
        //     }
        //   }

  document.getElementById("detalhes").innerHTML= `
                 <label class="p001-label plabel001">Total da Fatura: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${saleObject.sale.total},00</label>
             <label class="p001-label plabel001">Desconto: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             &nbsp;&nbsp;&nbsp; 0,00</label>
             <label class="p001-label plabel001">IVA: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 0,00</label>
             <label class="p001-label plabel001">Retenção na fonte: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 000000</label>
             <label class="p001-label plabel001">Total: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 0,00</label>
             <label class="p001-label plabel001">Total Pago: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${saleObject.sale.total},00</label>
             <label class="p001-label plabel001">Troco: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${saleObject.sale.difference},00</label>
             `;

            itens.innerHTML=conteud;

            const conteudo = document.getElementById("conteudo");
            
            const canvas = await html2canvas(conteudo);
            console.log(canvas);
            const imgData = canvas.toDataURL("image/png");
    
            const pdf = new jsPDF({
              orientation: "portrait",
              unit: "mm",
              format: "a4"
            });
      
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("documento.pdf");
          }

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
            setIsOrding(true);
            dispatch(setSaleObject(treatedSaleObject));
            dispatch(order(treatedSaleObject))
            .then(()=>{
            dispatch(showToast({ success:true, message:t('order_sucessfuly')}));
            dispatch(saleClean());
            dispatch(clearSearchedProduct());
            });

            exportarParaPDF();
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
            {true && <Pdf/>}
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