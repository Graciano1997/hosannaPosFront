import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Ip, printerIp } from "../lib/ip";
import { CurrentUser } from "../lib/CurrentUser";
import { generatePDFInvoice } from "../lib/generatePrinterInvoicer";
import { A4InvoiceTest } from "../lib/invoices/A4InvoiceTest";
import { Thermal58InvoiceTest } from "../lib/invoices/Thermal58InvoiceTest";
import { Thermal80InvoiceTest } from "../lib/invoices/Thermal80InvoiceTest";

const printerHandlerRequest =  async (data)=>{
      
      const { printerType } = data;      
      let apiPoint = '';
      let invoiceItem = '';

      let payload = {
        printer: data.printer,
        copyNumber: 1
      }


      if (data.printer.toLowerCase().includes("pdf")) {
        invoiceItem = await generatePDFInvoice(data.template ? data.template : A4InvoiceTest(), printerType);
        apiPoint = "/print_pdf";
        payload = { ...payload, pdfBase64: invoiceItem };
      } else {

        switch (printerType) {
          case "A4":
            invoiceItem = await generatePDFInvoice(data.template ? data.template : A4InvoiceTest(), printerType);
            apiPoint = "/print_pdf";
            payload = { ...payload, pdfBase64: invoiceItem };

            // Validação crítica
            if (!invoiceItem || typeof invoiceItem !== 'string' || invoiceItem.length === 0) {
              throw new Error('PDF não foi gerado corretamente');
            }
            break
          case "58mm":
            invoiceItem = data.template ? data.template  : Thermal58InvoiceTest();
            payload = { ...payload, invoiceHtml: invoiceItem };
            apiPoint = "/print_thermal";

            break
          case "80mm":
            invoiceItem = data.template ? data.template  : Thermal80InvoiceTest();
            payload = { ...payload, invoiceHtml: invoiceItem };
            apiPoint = "/print_thermal";
            break
          default:
            invoiceItem = await generatePDFInvoice(data.template ? data.template : A4InvoiceTest());
            payload = { ...payload, pdfBase64: invoiceItem };
            apiPoint = "/print_pdf";

            // Validação crítica
            if (!invoiceItem || typeof invoiceItem !== 'string' || invoiceItem.length === 0) {
              throw new Error('PDF não foi gerado corretamente');
            }
        }
      }

      return {apiPoint,payload};
}

const initialState = {
  availablePrinters: [],
  printerConfiguration: CurrentUser() ? JSON.parse(localStorage.getItem(`user-${CurrentUser().id}-printerConfiguration`)) : '',
  loading: false,
  error: null
};

export const printing = createAsyncThunk("printerState/printing", async (data) => {

  
  const { apiPoint,payload } = await printerHandlerRequest(data);
  
  console.log({apiPoint,payload});

  const response = await fetch(`${printerIp.concat(apiPoint)}`, {
    headers: { "Content-Type": "application/json", Accept: "application/json", },
    method: 'POST',
    body: JSON.stringify(payload)
  });
  return response.json();
});

export const fetchPrinterConfig = createAsyncThunk("printerState/fetchPrinterConfig", async () => {

  if (localStorage.getItem(`user-${CurrentUser().id}-printerConfiguration`)) {
    return JSON.parse(localStorage.getItem(`user-${CurrentUser().id}-printerConfiguration`));
  }

  const response = await fetch(`${Ip}/printer_configurations/user-${CurrentUser().id}-printerConfiguration/`, {
    headers: { "Content-Type": "application/json", Accept: "application/json" }
  });
  return response.json();
});

export const setPrinterConfig = createAsyncThunk("printerState/setPrinterConfig", async (printerConfiguration) => {
  const response = await fetch(`${Ip}/printer_configurations`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ user: `user-${CurrentUser().id}-printerConfiguration`, value: printerConfiguration })
  });

  return response.json();
});

export const fetchPrinters = createAsyncThunk(
  "printerState/fetchPrinters",
  async () => {
    const response = await fetch(`${printerIp}/printers`);
    return response.json();
  }
);

export const printTest = createAsyncThunk("printerState/printTest",
  async (data, { rejectWithValue }) => {

    try {
      const { apiPoint,payload } = await printerHandlerRequest(data);
          
      const response = await fetch(`${printerIp.concat(apiPoint)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        // captura erro HTTP do backend
        const errorData = await response.json().catch(() => ({}));

        return rejectWithValue({
          status: response.status,
          message: errorData?.message || "Erro ao imprimir teste",
        });
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

const printerSlice = createSlice({
  name: 'printerState',
  initialState: initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPrinters.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchPrinters.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.availablePrinters = action.payload;
    });

    builder.addCase(fetchPrinterConfig.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;

      if (!localStorage.hasOwnProperty(`user-${CurrentUser.id}-printerConfiguration`) && action.payload.data) {
        localStorage.setItem(action.payload.data.user, JSON.stringify(action.payload.data.value));
        state.printerConfiguration = action.payload.data.value;
      }

      if (localStorage.hasOwnProperty(`user-${CurrentUser.id}-printerConfiguration`)) {
        state.printerConfiguration = JSON.parse(localStorage.getItem(`user-${CurrentUser.id}-printerConfiguration`));
      }
    });

    builder.addCase(setPrinterConfig.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      localStorage.setItem(action.payload.data.user, JSON.stringify(action.payload.data.value));
      state.printerConfiguration = action.payload.data.value;
    });

    builder.addCase(printing.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
    });

    builder.addCase(printing.rejected, (state, action) => {
      state.loading = false;
      state.error = null;
    });
  }
});

export default printerSlice.reducer;
export const { } = printerSlice.actions;
