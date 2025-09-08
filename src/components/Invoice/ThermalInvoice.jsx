import { useState } from "react";

export const Thermal = () => {

    const [invoice, setInvoice] = useState({});

    return (
        <section id="tpl-receipt"
            class="#{@printer_type == '80mm' ? 'receipt-80' : 'receipt-58'}"
            style="#{(@printer_type == '80mm' || @printer_type == '58mm') ? '':'display:none;'}">

            <div class="rc-header">
                <h2>{invoice.empresa}</h2>
                <p>NIF {invoice.nif}</p>
                <p>{invoice.local}</p>
                <p>Tel: {invoice.empresaPhone}</p>
                <div class="rc-line"></div>
                <p><strong>Fatura</strong> Nº {invoice.numeroRecibo} · Série { serie }</p>
                <p>{invoice.dataEmissao}</p>
                <div class="rc-line"></div>
            </div>

            <div class="rc-meta">
                <p>Cliente: {invoice.cliente}</p>
                <p>NIF: {0}</p>
                <p>Tel: {invoice.telefone}</p>
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
                        {invoice.produtos}
                    </tbody>
                </table>
            </div>

            <div class="rc-line"></div>

            <div class="rc-totals">
                <div class="row"><span>Subtotal</span><span>{subtotal}</span></div>
                <div class="row"><span>IVA</span><span>{iva_total}</span></div>
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