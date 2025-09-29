import { formattedMoney } from "../formatedMoney";

const invoiceA4Item = (products)=>{
    let items = ''
    products.forEach((item)=>{
        items+=`<tr>
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td class="right">${item.qty}</td>
            <td class="right">${item.price}</td>
            <td class="right">${item.tax}</td>
            <td class="right">${item.total_taxes}</td>
            <td class="right">${item.total}</td>
        </tr>
        `
    })
    return items;
}

export const A4Invoice=(invoice)=>{
return `
<!DOCTYPE html>
      <html lang="pt-PT">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Fatura ${invoice.invoice_number}</title>
        <style>
          :root {
            --text:#111; --muted:#555; --line:#ddd; --accent:#3b82f6;
            --font: "Inter", system-ui, -apple-system, "Segoe UI", "Roboto", "Ubuntu", "Cantarell", "Helvetica Neue", "Arial", "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji";
          }
          * { box-sizing:border-box; }
          html,body { margin:0; padding:0; color:var(--text); font-family:var(--font); }

          /* ========================= A4 ========================= */
          .a4 {
            width: 210mm; min-height: 297mm; margin: 0 auto; background:#fff; padding: 6mm; color:var(--text);
          }
          .doc-header { display:flex; align-items:flex-start; justify-content:space-between; gap:12mm; }
          .brand { max-width:60%; }
          .brand h1 { margin:0 0 4px; font-size:20pt; letter-spacing:0.3px; }
          .brand .meta { font-size:12px; color:var(--muted); line-height:1.4; }
          .doc-id { text-align:right; }
          .doc-id .title { font-size:20pt; font-weight:700; margin:0; }
          .doc-id .number { font-size:14px; color:var(--muted); }

          .grid { display:flex; justify-content: space-between; gap:10mm; margin-top:10mm; }
          .card { border:1px solid var(--line); border-radius:10px; padding:8mm; }
          .card h3 { margin:0 0 6px; font-size:13px; text-transform:uppercase; letter-spacing:0.6px; color:var(--muted); }
          .card p { margin:2px 0; font-size:13px; }

          table { width:100%; border-collapse:collapse; margin-top:10mm; }
          thead th { font-size:12px; text-align:left; color:#333; border-bottom:1px solid var(--line); padding:6px 8px; text-transform:uppercase; letter-spacing:0.4px; }
          tbody td { font-size:13px; padding:8px; border-bottom:1px solid var(--line); }
          tfoot td { font-size:13px; padding:6px 8px; }
          .right { text-align:right; }
          .totals { margin-top:6mm; display:flex; justify-content:space-between; gap:8mm; align-items:flex-start; }
          .note { font-size:12px; color:var(--muted); line-height:1.5; }
          .summary { border:1px solid var(--line); border-radius:10px; padding:6mm; }
          .summary table { margin:0; }
          .summary tr td { border-bottom:none; }
          .summary .grand { font-size:16px; font-weight:700; }
          .footer { margin-top:12mm; font-size:15pt; display:flex; justify-content:space-between; align-items:flex-end; gap:8mm; }
          .hash { font-size:12px; color:var(--muted); word-break:break-all; }
          .footer .sign { text-align:right; font-size:12px; color:var(--muted); }

          @page { size: A4; margin: 12mm; }
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .no-print { display:none !important; }
          }
        </style>
      </head>
      <body>
        <!-- ========================= TEMPLATE A4 ========================= -->
        <section id="tpl-a4" class="a4">
          <header class="doc-header">
            <div class="brand">
              <h1>${invoice.company_name}</h1>
              <div class="meta">
                NIF: ${invoice.company_nif}<br/>
                Morada: ${invoice.company_address}<br/>
                Contacto: ${invoice.company_phone}<br/>
                Email: ${invoice.company_email}
              </div>
            </div>

            <div class="doc-id">
              <p class="title">Fatura</p>
              <p class="number">Nº ${invoice.invoice_number}</p>
              <p class="number">Data: ${invoice.sale_date}</p>
            </div>
          </header>
          <div class="grid">
            <div class="card">
              <h3>Cliente</h3>
              <p>Nome: ${invoice.client_name}</p>
              <p>NIF: ${invoice.client_nif}</p>
              <p>Morada: ${invoice.client_address}</p>
              <p>Telefone: ${invoice.client_phone}</p>
            </div>
            <div class="card">
              <h3>Condições</h3>
              <p>Forma de pagamento: ${invoice.payment_way}</p>
              <p>Validade: {{validade}}</p>
              <p>Vendedor: ${invoice.operator}</p>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Cód.</th>
                <th>Descrição</th>
                <th class="right">Qtd</th>
                <th class="right">Preço (Kz)</th>
                <th class="right">IVA %</th>
                <th class="right">IVA (Kz)</th>
                <th class="right">Total (Kz)</th>
              </tr>
            </thead>
            <tbody>
              <!-- Repita este <tr> por item -->
              ${
                invoiceA4Item(invoice.products)
              }
              <!-- /item -->
            </tbody>
          </table>

          <div class="totals">
            <div class="note">
              <p><strong>Observações:</strong> ${invoice.observations}</p>
              <p>Processado por programa validado n.º {{validacao_agt}}.</p>
              <p>Documento inalterável após emissão. Correções por Nota de Crédito/Débito.</p>
            </div>
            <div class="summary">
              <table>
                <tr>
                  <td>IVA</td>
                  <td class="right">{{iva_total}}</td>
                </tr>
                <tr>
                  <td><strong>Total</strong></td>
                  <td class="right grand">${ formattedMoney(invoice.total)}</td>
                </tr>
                <tr>
                  <td>Pago</td>
                  <td class="right">${ formattedMoney(invoice.total) }</td>
                </tr>
                <tr>
                  <td>Troco</td>
                  <td class="right">${ formattedMoney(invoice.remain)}</td>
                </tr>
              </table>
            </div>
          </div>

          <div class="footer">
            <div class="hash">
              Hash: {{hash_documento}}
            </div>
            <div class="sign">
              <div>Emitido em: #{invoice[:dataEmissao]}</div>
              <div>Assinatura: ____________________</div>
            </div>
          </div>
        </section>
      </body>
      </html>
`
};