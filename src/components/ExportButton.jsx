import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { firstCapitalize } from '../lib/firstCapitalize';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../slices/appSlice';
import { generatePDF, generatePDFInvoice } from '../lib/generatePrinterInvoicer';
import { ExportReport } from './Report/ExportReport';



const ExportButton = ({ data,columnsToExport,model,exportOption }) => {
  const {t}=useTranslation();
  const dispatch = useDispatch();
  const filteredHeader = columnsToExport;
  
  const {companies} = useSelector((state)=>state.companyState);

  const headers = filteredHeader.map((key) => firstCapitalize(t(key)));
  
  const exportToExcel = () => {
      const worksheetData = [headers];
      const dataRows = data.map((item) =>
        filteredHeader.map((key) => item[key])
      );

        worksheetData.push([]);
        worksheetData.push(...dataRows);
  
          // 4. Create worksheet from array of arrays (aoa)
          const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

          // 🔥 Apply styles to the header cells (row 1)
          const headerStyle = {
            font: { bold: true, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: "4F81BD" } }, // blue background
            alignment: { horizontal: "center", vertical: "center" }
          };

          filteredHeader.forEach((_, colIndex) => {
            const cellAddress = XLSX.utils.encode_cell({ r: 0, c: colIndex }); // r = row, c = column
            if (!worksheet[cellAddress]) return;
            worksheet[cellAddress].s = headerStyle;
          });
      
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, firstCapitalize(model));
      
          // 3. Write the workbook and export it
          const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      
          const fileData = new Blob([excelBuffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
      
          const today = new Date();
          saveAs(fileData, `Export_${model}_${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}.xlsx`);
  
  };
  
  const exportToPDF = async (htmlData)=>{
    const pdfItem = await generatePDF(htmlData);
    const byteChars = atob(pdfItem);
    const byteNumbers = new Array(byteChars.length);

    for(let i =0; i < byteChars.length; i++){
      byteNumbers[i]=byteChars.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const fileData = new Blob([byteArray], {type: 'application/pdf'});
    
    const today = new Date();
    saveAs(fileData, `Export_${model}_${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}.pdf`);
  };


  return (
    <button 
    type="button" 
    onClick={ ()=>{
      if(columnsToExport.length == 0){
        dispatch(showToast({warning:true, message:firstCapitalize(t('select_at_least_one_field'))}));
        }else{ 
          const currentCompanyDetails = companies[0];
          const reportHTMLTemplate = ExportReport(data,columnsToExport,model, headers,currentCompanyDetails);
          
          if(exportOption=="excel"){
            exportToExcel();
          }else{
            exportToPDF(reportHTMLTemplate);
          }
        }
        }}
     className="p-2 bg-green-100 rounded">
      {firstCapitalize(t('export'))}
    </button>
  );
};

export default ExportButton;
