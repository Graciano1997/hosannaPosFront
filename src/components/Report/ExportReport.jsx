import { useTranslation } from "react-i18next";
import { firstCapitalize } from "../../lib/firstCapitalize";

const getSvgIcon = (iconName, className) => {
    let svgPath = '';

    switch (iconName) {
        case 'phone':
            // SVG do PhoneIcon (24/solid)

            svgPath = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                        `;
            break;
        case 'map-pin':
            // SVG do MapPinIcon (24/solid)
            svgPath = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
</svg>
`;
            break;
        case 'envelope':
            // SVG do EnvelopeIcon (24/solid)
            svgPath = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
</svg>
`;
            break;
        case 'identification':
            svgPath = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
</svg>
`;
break;
        default:
            return '';
    }

    // Retorna a tag SVG completa
    return `${svgPath}`;
};

const thead = (columns) => {
    let rowData = ``;

    columns.forEach((col) => {
        rowData += `<th>${col}</th>`;
    });
    return rowData;
}


const tRow = (item, columns) => {
    let rowData = ``;

    columns.forEach((col) => {
        
        const typeColItem = typeof item[col];

        if(typeColItem=="boolean"){
            rowData+=`<td class="p-1 text-center">${item[col] ? 'active':'no'}</td>`;
        }else{
            rowData+=`<td class="p-1 text-center">${( item[col] == "null" || item[col] == null || item[col] == undefined || item[col] == "undefined" ) ? ' ':item[col]}</td>`;
        }

    });
    return rowData;
}


const tdata = (data, columns) => {
    let rowData = ``;

    data.forEach((item, index) => {
        rowData += `<tr class="${index % 2 == 0 ? "bg-green-100" : ''} font-light"> ${tRow(item, columns)}</tr>`;
    });

    return rowData;
}

const datatempo = new Date();

export const ExportReport = (data, columnsToExport, model, headersTranslated, companyDetails) => {

    const iconClass = 'w-3 h-3 text-green-600 inline-block mr-1';

    // Insere o SVG diretamente na string
    const phoneIcon = getSvgIcon('phone', iconClass);
    const mapPinIcon = getSvgIcon('map-pin', iconClass);
    const envelopeIcon = getSvgIcon('envelope', iconClass);
    const identificationIcon = getSvgIcon('identification', iconClass);

    const template = `
        
    <div class="p-4 m-3 grid h-[95%]">
            
  <div class="flex items-start px-3 py-2">

    <div class="flex flex-col gap-4 mb-[3rem]">
      <div class="w-[100%] h-[100%]">
        <img class="w-[100px] h-[100px] rounded" src="${companyDetails.image}" alt="${companyDetails.name}" />
      </div>
      <h1 class="text-[30px] font-bold">${companyDetails.name}</h1>
      <div class="flex flex-col gap-2 mt-2 text-[13pt]">
      <span class="flex gap-2"><span>${phoneIcon}</span> <p class="mt-[-8px]">${companyDetails.phone} || ${companyDetails.alternative_phone}</p></span>  
      <span class="flex gap-2"><span>${mapPinIcon}</span> <p class="mt-[-8px]">${companyDetails.address}</p></span> 
      <span class="flex gap-2"><span>${envelopeIcon}</span> <p class="mt-[-8px]">${companyDetails.email}</p></span>
      <span class="flex gap-2"><span>${identificationIcon}</span> <p class="mt-[-8px]">${companyDetails.nif}</p></span>
      </div>
    </div>
  </div>

      <p class="text-[20px] mb-[1rem] text-end font-medium">${firstCapitalize(model)}</p>
            <table className="rounded shadow-md  w-full  table-auto mt-[15rem]">
                <thead className="bg-white" >
            <tr class="p-2 shadow h-[45px]">
            ${data.length == 0 ? '' : thead(headersTranslated)}
            </tr>
            </thead>
            <tbody>
             <tr>
                ${data.length == 0 ? `<h1 class="mt-[10rem] text-center text-[20pt]">Sem Dados a Apresentar!</h1>` : tdata(data, columnsToExport)}
            </tr>
            </tbody>
            </table>

            <div class="mt-[2rem]">
            <p>Documento gerado pelo Software Hosanna POS</p>
            <p>Data : ${datatempo.getDate()}/${datatempo.getMonth() + 1}/${datatempo.getFullYear()} ${datatempo.getHours()}:${datatempo.getMinutes()}  </p>
            </div>
        </div>
    `
    return template;
}