export const A4InvoiceTest = () => `
            <!DOCTYPE html>
            <html>
            <head>
            <meta charset='UTF-8'/>
            <style>
            @page { size: A4; margin: 15mm; }
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; color: #333; }
            .info { border: 1px solid #ccc; padding: 10px; margin: 20px 0; }
            table { width: 100%; border-collapse: collapse; }
            td { padding: 8px; border: 1px solid #ddd; }
            .header { font-weight: bold; background-color: #f0f0f0; }
            </style>
            </head>
            <body>
            <h1>HOSANA POS - TESTE DE IMPRESSAOSSSSSS</h1>
            <div class='info'>
            <table>
            <tr><td class='header'>Status</td><td>FUNCIONANDO</td></tr>
            <tr><td class='header'>Servidor</td><td>localhost:5000</td></tr>
            </table>
            </div>
            <p style='text-align: center; margin-top: 30px;'>
            Se voce visualiza este documento, o sistema esta operacional.
            </p>
            </body>
            </html>
          `;