import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function generatePDFInvoice(invoiceHtml, paperSize='A4') {
  try {
    // Criar elemento temporário com o HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = invoiceHtml;
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.width = paperSize === 'A4' ? '100%' : paperSize === '80mm' ? '80mm' : '58mm';
    document.body.appendChild(tempDiv);
    
    // IMPORTANTE: Aguardar o DOM renderizar
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Renderizar HTML para canvas
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
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
      backgroundColor: '#ffffff'
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