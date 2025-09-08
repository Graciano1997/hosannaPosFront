const A4Invoice = () => {

    const [invoice, setInvoice] = useState({});

    return (
        <section id="tpl-a4" class="a4">
            <header class="doc-header">
                <div class="brand">
                    <h1>{invoice.empresa}</h1>
                    <div class="meta">
                        NIF: {invoice.nif}<br />
                        Morada: {invoice.local}<br />
                        Contacto: {invoice.empresaPhone} · {invoice.email}<br />
                        Alvará: {{ empresa_alvara }}
                    </div>
                </div>

                <div class="doc-id">
                    <p class="title">Fatura</p>
                    <p class="number">Nº {invoice.numeroRecibo} · Série {serie}</p>
                    <p class="number">Data: {invoice.dataEmissao}</p>
                </div>
            </header>

            <div class="grid">
                <div class="card">
                    <h3>Cliente</h3>
                    <p>Nome: {invoice.cliente}</p>
                    <p>NIF: {cliente_nif_ou_consumidor_final}</p>
                    <p>Morada: {cliente_morada}</p>
                    <p>Telefone: {invoice.telefone}</p>
                </div>
                <div class="card">
                    <h3>Condições</h3>
                    <p>Forma de pagamento: {invoice.formaPagamento}</p>
                    <p>Validade: {validade}</p>
                    <p>Vendedor: {invoice.vendedor}</p>
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
                    <tr>
                        <td>{artigo_codigo}</td>
                        <td>{artigo_descricao}</td>
                        <td class="right">{qtd}</td>
                        <td class="right">{preco_unitario}</td>
                        <td class="right">{iva_percent}</td>
                        <td class="right">{iva_valor}</td>
                        <td class="right">{total_linha}</td>
                    </tr>
                </tbody>
            </table>

            <div class="totals">
                <div class="note">
                    <p><strong>Observações:</strong> {invoice.observacoes}</p>
                    <p>Processado por programa validado n.º {validacao_agt}.</p>
                    <p>Documento inalterável após emissão. Correções por Nota de Crédito/Débito.</p>
                </div>
                <div class="summary">
                    <table>
                        <tr>
                            <td>Subtotal</td>
                            <td class="right">{subtotal}</td>
                        </tr>
                        <tr>
                            <td>IVA</td>
                            <td class="right">{iva_total}</td>
                        </tr>
                        <tr>
                            <td><strong>Total</strong></td>
                            <td class="right grand">{invoice.total}</td>
                        </tr>
                        <tr>
                            <td>Pago</td>
                            <td class="right">{valor_pago}</td>
                        </tr>
                        <tr>
                            <td>Troco</td>
                            <td class="right">{invoice.troco}</td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="footer">
                <div class="hash">
                    Hash: {hash_documento}
                </div>
                <div class="sign">
                    <div>Emitido em: {invoice.dataEmissao}</div>
                    <div>Assinatura: ____________________</div>
                </div>
            </div>
        </section>
    )
}