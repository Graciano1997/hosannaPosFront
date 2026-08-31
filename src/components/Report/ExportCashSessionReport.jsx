import { firstCapitalize } from "../../lib/firstCapitalize";

const formatMoney = (value) => {
    return new Intl.NumberFormat("pt-AO", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Number(value || 0)) + " Kz";
};

const formatDate = (date) => {
    if (!date) return "-";

    const d = new Date(date);

    return `${String(d.getDate()).padStart(2, "0")}/${String(
        d.getMonth() + 1
    ).padStart(2, "0")}/${d.getFullYear()} ${String(
        d.getHours()
    ).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};

const getMovementClass = (direction) => {
    return direction === "in"
        ? "color:#16a34a;"
        : "color:#dc2626;";
};

const movementType = (direction) => {
    return direction === "in" ? "Entrada" : "Saída";
};

const movementsTable = (movements) => {

    if (!movements || movements.length === 0) {
        return `
            <tr>
                <td
                    colspan="5"
                    style="
                        padding:20px;
                        text-align:center;
                    "
                >
                    Sem movimentos registados
                </td>
            </tr>
        `;
    }

    let rowData = ``;

    movements.forEach((movement) => {

        rowData += `
            <tr>

                <td style="padding:6px;">
                    ${formatDate(movement.created_at)}
                </td>

                <td style="padding:6px;">
                    ${movementType(movement.direction)}
                </td>

                <td style="padding:6px;">
                    ${firstCapitalize(movement.category || "-")}
                </td>

                <td style="padding:6px;">
                    ${movement.description || "-"}
                </td>

                <td
                    style="
                        padding:6px;
                        text-align:right;
                        font-weight:500;
                        ${getMovementClass(movement.direction)}
                    "
                >
                    ${movement.direction === "in" ? "+" : "-"}
                    ${formatMoney(movement.amount)}
                </td>

            </tr>
        `;
    });

    return rowData;
};

const financialRow = (label, value, className = "") => {

    return `
        <tr>

            <td style="padding:6px;">
                ${label}
            </td>

            <td
                style="
                    padding:6px;
                    text-align:right;
                    ${className}
                "
            >
                ${formatMoney(value)}
            </td>

        </tr>
    `;
};

export const ExportCashSessionReport = (
    data,
    companyDetails
) => {
    console.log("company",companyDetails)

    const datatempo = new Date();

    const difference = Number(
        data?.cash_difference || 0
    );

    const headTemplate = `
        <div class="headerReporting">
            <h1>
                ${companyDetails?.name || ""}
            </h1>
            <p class="">
                ${companyDetails?.nif || ""}
            </p>
        </div>
    `;

    const template = `

        <div style="margin-top:0.5rem;">
            <!-- CABEÇALHO DO RELATÓRIO -->
            <div
                style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    margin-bottom:1rem;
                "
            >

                <div>
                    <h2 style="
                        margin:0;
                        font-size:16px;
                    ">
                        Relatório de Fecho de Caixa
                    </h2>

                    <p style="
                        margin:4px 0;
                    ">
                        Sessão #${data?.id || "-"}
                    </p>

                </div>

                <div
                    style="
                        padding:5px 10px;
                        border:1px solid #dc2626;
                        color:#dc2626;
                        font-weight:bold;
                        font-size:10px;
                    "
                >
                    ENCERRADO
                </div>

            </div>


            <!-- INFORMAÇÕES DA SESSÃO -->

            <h3 style="
                margin-top:20px;
                border-bottom:1px solid #ddd;
                padding-bottom:6px;
            ">
                Informações da Sessão
            </h3>

            <table style="
                width:100%;
                border-collapse:collapse;
            ">

                <tbody>

                    <tr>

                        <td style="padding:6px;">
                            <strong>Caixa:</strong>
                            ${data?.cash_register || "-"}
                        </td>

                        <td style="padding:6px;">
                            <strong>Sessão:</strong>
                            #${data?.id || "-"}
                        </td>

                        <td style="padding:6px;">
                            <strong>Operador:</strong>
                            ${data?.user || "-"}
                        </td>

                    </tr>

                    <tr>

                        <td style="padding:6px;">
                            <strong>Abertura:</strong>
                            ${formatDate(data?.opened_at)}
                        </td>

                        <td style="padding:6px;">
                            <strong>Encerramento:</strong>
                            ${formatDate(data?.closed_at)}
                        </td>

                        <td style="padding:6px;">
                            <strong>Estado:</strong>
                            Encerrado
                        </td>

                    </tr>

                </tbody>

            </table>


            <!-- RESUMO FINANCEIRO -->

            <h3 style="
                margin-top:20px;
                border-bottom:1px solid #ddd;
                padding-bottom:6px;
            ">
                Resumo Financeiro
            </h3>

            <table style="
                width:100%;
                border-collapse:collapse;
            ">

                <tbody>

                    ${financialRow(
                        "Saldo inicial",
                        data?.opening_balance,
                        "font-weight:bold;"
                    )}

                    ${financialRow(
                        "Vendas em dinheiro",
                        data?.cash_sales,
                        "color:#16a34a;"
                    )}

                    ${financialRow(
                        "Reforços",
                        data?.cash_reinforcement,
                        "color:#16a34a;"
                    )}

                    ${financialRow(
                        "Levantamentos",
                        data?.withdrawal,
                        "color:#dc2626;"
                    )}

                    ${financialRow(
                        "Despesas",
                        data?.expense,
                        "color:#dc2626;"
                    )}

                    <tr style="
                        border-top:2px solid #222;
                    ">

                        <td style="
                            padding:8px;
                            font-weight:bold;
                        ">
                            Saldo esperado
                        </td>

                        <td style="
                            padding:8px;
                            text-align:right;
                            font-weight:bold;
                        ">
                            ${formatMoney(
                                data?.expected_balance
                            )}
                        </td>

                    </tr>

                    <tr>

                        <td style="
                            padding:8px;
                            font-weight:bold;
                        ">
                            Saldo contado
                        </td>

                        <td style="
                            padding:8px;
                            text-align:right;
                            font-weight:bold;
                        ">
                            ${formatMoney(
                                data?.closing_balance
                            )}
                        </td>

                    </tr>

                    <tr style="
                        border-top:2px solid #222;
                    ">

                        <td style="
                            padding:8px;
                            font-weight:bold;
                        ">
                            Diferença
                        </td>

                        <td style="
                            padding:8px;
                            text-align:right;
                            font-weight:bold;
                            ${
                                difference === 0
                                    ? "color:#16a34a;"
                                    : "color:#dc2626;"
                            }
                        ">
                            ${formatMoney(difference)}
                        </td>

                    </tr>

                </tbody>

            </table>


            <!-- RESUMO DAS VENDAS -->

            <h3 style="
                margin-top:25px;
                border-bottom:1px solid #ddd;
                padding-bottom:6px;
            ">
                Resumo das Vendas
            </h3>

            <table style="
                width:100%;
                border-collapse:collapse;
            ">

                <tbody>

                    <tr>

                        <td style="padding:6px;">
                            <strong>Nº de vendas</strong>
                        </td>

                        <td style="
                            padding:6px;
                            text-align:right;
                        ">
                            ${data?.sales_count || 0}
                        </td>

                    </tr>

                    <tr>

                        <td style="padding:6px;">
                            Total vendido
                        </td>

                        <td style="
                            padding:6px;
                            text-align:right;
                            font-weight:bold;
                        ">
                            ${formatMoney(
                                data?.total_sales
                            )}
                        </td>

                    </tr>

                    <tr>

                        <td style="padding:6px;">
                            Dinheiro
                        </td>

                        <td style="
                            padding:6px;
                            text-align:right;
                        ">
                            ${formatMoney(
                                data?.cash_sales
                            )}
                        </td>

                    </tr>

                    <tr>

                        <td style="padding:6px;">
                            TPA
                        </td>

                        <td style="
                            padding:6px;
                            text-align:right;
                        ">
                            ${formatMoney(
                                data?.tpa_sales
                            )}
                        </td>

                    </tr>
                </tbody>

            </table>


            <!-- MOVIMENTOS -->

            <h3 style="
                margin-top:25px;
                border-bottom:1px solid #ddd;
                padding-bottom:6px;
            ">
                Movimentos do Caixa
            </h3>

            <table style="
                width:100%;
                border-collapse:collapse;
            ">

                <thead>

                    <tr style="
                        background:#f3f4f6;
                        border-bottom:1px solid #aaa;
                    ">

                        <th style="
                            padding:6px;
                            text-align:left;
                        ">
                            Data/Hora
                        </th>

                        <th style="
                            padding:6px;
                            text-align:left;
                        ">
                            Tipo
                        </th>

                        <th style="
                            padding:6px;
                            text-align:left;
                        ">
                            Categoria
                        </th>

                        <th style="
                            padding:6px;
                            text-align:left;
                        ">
                            Descrição
                        </th>

                        <th style="
                            padding:6px;
                            text-align:right;
                        ">
                            Valor
                        </th>

                    </tr>

                </thead>

                <tbody>

                    ${movementsTable(data.movements)}

                </tbody>

            </table>


            <!-- RESULTADO DO ENCERRAMENTO -->

            <div style="
                margin-top:25px;
                padding:12px;
                border:1px solid #ddd;
                text-align:center;
            ">

                <strong style="font-size:12px;">
                    Resultado do Encerramento
                </strong>

                <p style="
                    margin:6px 0 0;
                    font-size:10px;
                ">

                    ${
                        difference === 0
                            ? "Caixa conferido. Não foi identificada qualquer diferença."
                            : `Foi identificada uma diferença de ${formatMoney(
                                  difference
                              )}.`
                    }

                </p>

            </div>


            <!-- FOOTER -->

            <div style="
                margin-top:2rem;
            ">

                <span>
                    Documento gerado pelo Software Hosanna POS
                </span>

                <br/>

                <span>
                    Data :
                    ${datatempo.getDate()}/${datatempo.getMonth() + 1}/${datatempo.getFullYear()}
                    ${String(datatempo.getHours()).padStart(2, "0")}:
                    ${String(datatempo.getMinutes()).padStart(2, "0")}
                </span>

            </div>

        </div>
    `;

    return {
        head: headTemplate,
        body: template
    };
};
