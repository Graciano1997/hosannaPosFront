export const InvoiceTest = (size = '80mm') => `
<!DOCTYPE html>
<html>
<head>
<meta charset='UTF-8'/>
<style>
  body {
    font-family: "Courier New", monospace;
    font-weight: bold;
    color: #000;
    margin: 0;
    padding: 5px;
  }

  .container {
    width: ${size === '58mm' ? '58mm' : '80mm'};
    margin: 0 auto;
  }

  h1 {
    text-align: center;
    font-size: 14px;
    margin: 5px 0;
  }

  .line {
    border-top: 1px dashed #000;
    margin: 6px 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 11px;
  }

  td {
    padding: 3px 0;
  }

  .label {
    text-align: left;
  }

  .value {
    text-align: right;
  }

  .center {
    text-align: center;
    font-size: 11px;
    margin-top: 10px;
  }
</style>
</head>

<body>
  <div class="container">
    
    <h1>HOSANA POS</h1>
    <div class="center">TESTE DE IMPRESSÃO</div>

    <div class="line"></div>

    <table>
      <tr>
        <td class="label">Status</td>
        <td class="value">FUNCIONANDO</td>
      </tr>
      <tr>
        <td class="label">Servidor</td>
        <td class="value">localhost:5000</td>
      </tr>
      <tr>
        <td class="label">Data</td>
        <td class="value">${new Date().toLocaleString()}</td>
      </tr>
    </table>

    <div class="line"></div>

    <p class="center">
      Se você está vendo isto,<br/>
      a impressora está OK ✔
    </p>

    <div class="line"></div>

    <p class="center">Obrigado!</p>

  </div>
</body>
</html>
`;