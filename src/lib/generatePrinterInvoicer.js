import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

export async function generatePDFInvoice(invoiceHtml, paperSize='A4') {
  try {
    // Criar elemento temporário com o HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = invoiceHtml;
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.width = paperSize === 'A4' ? '270mm' : paperSize === '80mm' ? '80mm' : '58mm';
    document.body.appendChild(tempDiv);
    
    // IMPORTANTE: Aguardar o DOM renderizar
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Renderizar HTML para canvas
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#fff'
    });
    
    // REMOVER o elemento ANTES de processar
    document.body.removeChild(tempDiv);
    
    // Converter para PDF
    let pdf;
    if (paperSize === '80mm') {
      pdf = new jsPDF('p', 'mm', [80, 297]);
    } else if (paperSize === '58mm') {
      pdf = new jsPDF('p', 'mm', [58, 297]);
    } else {
      pdf = new jsPDF('p', 'mm', 'a4');
    }
    
    const imgData = canvas.toDataURL('image/png');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
    // Converter para base64
    const pdfBase64 = pdf.output('datauristring').split(',')[1];
    
    console.log('✓ PDF gerado:', {
      tamanho: pdfBase64.length,
      comecaCerto: pdfBase64.startsWith('JVB'),
      primeiros10: pdfBase64.substring(0, 10)
    });
    
    return pdfBase64;
    
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw error;
  }
}

export async function generatePDF(templateHtml) {
  try {
    // Criar elemento temporário com o HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = templateHtml;
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    // tempDiv.style.width = paperSize === 'A4' ? '100%' : paperSize === '80mm' ? '80mm' : '58mm';
    document.body.appendChild(tempDiv);
    
    // IMPORTANTE: Aguardar o DOM renderizar
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Renderizar HTML para canvas
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#fff'
    });
    
    // REMOVER o elemento ANTES de processar
    document.body.removeChild(tempDiv);
    // Converter para PDF
    let pdf = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
    // Converter para base64
    const pdfBase64 = pdf.output('datauristring').split(',')[1];
    return pdfBase64;
    
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw error;
  }
}


export function htmlToPDFGenerator(htmlTemplate,model,pageSetting) {
  
  const content = htmlToPdfmake(htmlTemplate.body);
  const head = htmlToPdfmake(htmlTemplate.head);
  
  const docDefinition = {
    pageSize: pageSetting?.size ? pageSetting?.size :"A4",
    pageOrientation: pageSetting?.orientation ? pageSetting?.orientation : "portrait", 
    pageMargins: [40, 60, 40, 60],

    header:()=> {
      return {
        margin: [40, 6, 40, 0],
        stack: head
      }
    },
    footer: ((currentPage, pageCount) => {
      return {
        text: `Página ${currentPage} de ${pageCount}`,
        alignment: "center",
        margin: [0, 10, 0, 0],
      };
    }),
    content,
  };
  const today = new Date();
  pdfMake.createPdf(docDefinition).download(`Export_${model}_${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}.pdf`);
}

export async function generateFromHtmlToPDF(templateHtml,printerConfiguration,name='invoice') {
 
  try {
    // Criar elemento temporário com o HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = templateHtml;
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    document.body.appendChild(tempDiv);
   
    await new Promise(resolve => setTimeout(resolve, 100));

    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#fff'
    });
    
    document.body.removeChild(tempDiv);

  const width = printerConfiguration?.printertype == '80mm' ? '80' : '58';
  const height = (canvas.height * width) / canvas.width;
  let pdf;

if (printerConfiguration?.printertype === 'A4') {

  pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

} else {

  pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [
      width,
      height
    ]
  });

}
  
    const imgData = canvas.toDataURL('image/png');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    return pdf.save(`${name}.pdf`);
  
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw error;
  }
}