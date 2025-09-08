import { useState } from "react";

export const Thermal = () => {

    const [invoice, setInvoice] = useState({});



    return (
        <section id="tpl-receipt" class="#{@printer_type == '80mm' ? 'receipt-80' : 'receipt-58'}" style="">

            <div style={{textAlign:center}}>
                <h2>{invoice.company_name}</h2>
                <b>Endereço: {invoice.company_address}</b>
                <b>Nif: {invoice.company_nif} {' Tel:'} {invoice.company_phone}</b>
                <b>Email:{invoice.company_email}</b>
                <br/>
                <p><strong>Fatura</strong> Nº {invoice.invoice_number}</p>
                <p>Data: {invoice.sale_date}</p>
            </div>

            <div class="rc-meta">
                <p>Cliente: {invoice.client_name}</p>
                <p>NIF: {invoice.client_nif}</p>
                <p>Tel: {invoice.client_phone}</p>
            </div>

            <div class="rc-items">
                <table>
                    <thead>
                        <tr>
                            <th>Desc.</th>
                            <th class="rc-right">Qtd</th>
                            <th class="rc-right">Prec.</th>
                            <th class="rc-right">Iva%</th>
                            <th class="rc-right">Tot.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.produtos.map((item)=>{
                            return(
                            <tr>
                                <td>{item.name}</td>
                                <td class="rc-right">#{item.qty}</td>
                                <td class="rc-right">#{item.preco}</td>
                                <td class="rc-right">#{item.taxe} %</td>
                                <td class="rc-right">#{item.subtotal}</td>
                            </tr>
                            )
                        })
                        
                        }

                    </tbody>
                </table>
            </div>

            <div class="rc-line"></div>

            <div class="rc-totals">
                <div class="row"><span>Subtotal</span><span>{invoice.subtotal}</span></div>
                <div class="row"><span>IVA</span><span>{invoice.ivatotal}</span></div>
                <div class="row" style="font-weight:700;"><span>Total</span><span>{invoice.total}</span></div>
                <div class="row"><span>Pago</span><span>{valor_pago}</span></div>
                <div class="row"><span>Troco</span><span>{invoice.troco}</span></div>
            </div>

            <div class="rc-line"></div>
            <div class="rc-footer">
                <p>Atendido Por: {invoice.vendedor}</p>
                <p>Processado por programa validado n.º {validacao_agt}.</p>
                <p>Hash: {hash_documento_curto}</p>
                <hr />
                <small>{invoice.observacoes}</small>
                <br />
                <strong style={text - center}>Obrigado pela preferência!</strong>
            </div>
        </section>);
};