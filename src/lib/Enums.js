
export const ClientType = {
    SINGULAR:'SINGULAR',
    COMPANY:'COMPANY'
};

export const PaymentType = {
    CASH:'CASH',
    TPA:'TPA',
    MIXED:'MIXED',
}

export const DefaultClientePhone = 911111111;
export const defaultClientName = 'Consumidor Final';
export const FinalClientDefaultNIF = '00000000000000';

export const SaleType = {
    NORMAL_INVOICE_FT:'FT',
    SIMPLIFYED_INVOICE_FS:'FS',
    INVOICE_RECIBO_FR:'FR',
    PROFORM_PF:'PF',
    DEBIT_NOTE_ND:'ND',
    CREDIT_NOTE_NC:'NC',
    RECEIPT_RC:'RC'
}

  export const SaleTypeTranslation =  { 
    FT:'invoice',
    FR:'invoice_FR',
    PF:'proforma',
    FS:'invoice_FS',
    NC:'credit_note',
    ND:'',
    RC:'invoice_RC'
  }

export const ProductState = {
    AVAILABLE:1,
    EXPIRED:2,
    FINISHED:3
}

export const Profiles = {
    MASTER:1,
    OPERATOR:2
}

export const InvoiceStatus = {
    PAID:"paid",
    PENDING:"pending",
    PARTIAL:"partial"
}

export const PrinterMode = {
    AUTOMATIC:"automatic",
    MANUAL:"manual",
    ASK:"ask"
}

export const moneyFields = ['price', 'total', 'amount', 'cost_price', 'difference', 'received_cash', 'received_tpa','opening_balance','expected_balance','closing_balance'];
export const movementTypeColor ={entry:"bg-green-500",exit:"bg-red-500",return:"bg-purple-500",adjustment:"bg-blue-500",expired:"bg-yellow-400",open:"bg-green-500",closed:"bg-red-500"}
 