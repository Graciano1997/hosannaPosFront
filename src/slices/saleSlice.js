import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ClientType, DefaultClientePhone, PaymentType, SaleType } from "../lib/Enums";
import { getIpTenant, Ip } from "../lib/ip";
import { totalWithTaxesAndDiscounts } from "../lib/totalWithTaxes";
import { removeDuplicate } from "../lib/removeDuplicate";
import { sum } from "../lib/sumSale";

const initialState = {
    loading: false,
    error: '',
    items: [],
    totalItems: 0,
    selectedItem: undefined,
    paymentType: PaymentType.CASH,
    clientDetails: { client_type: ClientType.SINGULAR, phone: DefaultClientePhone },
    invoiceType: SaleType.SALE,
    receivedCash: 0,
    receivedTpa: 0,
    total: 0,
    sales: [],
    difference: 0,
    saleConfirmationIsOpen: false,
    saleObject: {},
    anualSales: [],
    last_created_at: null
}


export const fetchAnualSales = createAsyncThunk("saleState/fetchAnualSales", async (year = new Date().getFullYear()) => {
    const response = await fetch(`${getIpTenant()}sales/anual_sales/${year}`);
    return response.json();
})

export const order = createAsyncThunk('saleState/order', async (sale) => {
    const response = await fetch(`${getIpTenant()}sales/`, {
        method: 'POST',
        body: JSON.stringify(sale),
        headers: { 'Content-Type': 'application/json' }
    });
    return response.json();
});

export const fetchSales = createAsyncThunk('saleState/fetchSales', async (last_created_at = null) => {
    const response = await fetch(`${getIpTenant()}sales/${last_created_at ? `last/${last_created_at}/` : ''}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    return response.json();
});

export const getInvoiceItem = createAsyncThunk("saleState/getInvoiceItem", async (saleId) => {
    try {
        const response = await fetch(`${getIpTenant()}sales/reprint/${saleId}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
        return response.json();
    } catch (error) {
        console.log(error);
    }
});


const saleSlice = createSlice({
    name: 'saleState',
    initialState,

    reducers:
    {
        addProduct: (state, action) => {
            if (!state.products.includes(item => item.id === action.payload.id)) {
                state.products.push(action.payload);
            }
        },

        addItem: (state, action) => {
            const itemAtIndex = state.items.findIndex(item => item.id == action.payload.id);
            if (itemAtIndex !== -1) {
                state.items[itemAtIndex] = {
                    ...state.items[itemAtIndex],
                    qty: (action.payload.qty * 1 + state.items[itemAtIndex].qty * 1),
                    total: action.payload.total + state.items[itemAtIndex].total,
                }
            } else {
                state.items.push(action.payload);
            }
            console.log(state.items);

            state.total = sum(state.items).total;
            state.totalItems = sum(state.items).totalItems;
        },

        saleConfirm: (state) => {
            state.saleConfirmationIsOpen = true;
        },
        setSales: (state, action) => {
            state.sales = action.payload;
        }
        ,
        saleNotConfirm: (state) => {
            state.saleConfirmationIsOpen = false;
        },
        removeItem: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload.id);
            state.total = sum(state.items).total;
            state.totalItems = sum(state.items).totalItems;
            if (state.total == 0) {
                state.receivedCash = 0;
                state.difference = 0;
            } else {
                if ((state.paymentType == PaymentType.CASH) && (state.receivedCash - state.total) >= 0) {
                    state.difference = state.receivedCash - state.total;
                } else {
                    state.difference = 0;
                }
            }
        },
        setSaleObject: (state, action) => {
            state.saleObject = action.payload;
        },

        updateItem: (state, action) => {
            const atIndex = state.items.findIndex(item => item.id === action.payload.id);

            if (atIndex != -1) {
                if ((state.items[atIndex].qty) >= (parseInt(action.payload.qty))) {
                    state.items[atIndex] = {
                        ...state.items[atIndex],
                        qty: action.payload.qty,
                        total: action.payload.total,
                    }
                }
            }

            state.total = sum(state.items).total;
            state.totalItems = sum(state.items).totalItems;
            state.selectedItem = undefined;
        },

        increaseOne: (state, action) => {

            const atIndex = state.items.findIndex(item => item.id == action.payload.id);

            if (atIndex != -1) {

                if ((state.items[atIndex].stock) >= (parseInt(action.payload.qty) * 1 + 1)) {

                    state.items[atIndex] = {
                        ...state.items[atIndex],
                        qty: (parseInt(action.payload.qty) + 1),
                        total: totalWithTaxesAndDiscounts(state.items[atIndex], (parseInt(action.payload.qty) + 1)),
                    }
                }
            }

            state.total = sum(state.items).total;
            state.totalItems = sum(state.items).totalItems;

            if ((state.paymentType == PaymentType.CASH) && (state.receivedCash - state.total) >= 0) {
                state.difference = state.receivedCash - state.total;
            } else {
                state.difference = 0;
            }
        },

        decreaseOne: (state, action) => {
            const atIndex = state.items.findIndex(item => item.id === action.payload.id);

            if (atIndex != -1) {

                if (state.items[atIndex].qty > 1) {

                    state.items[atIndex] = {
                        ...state.items[atIndex],
                        qty: action.payload.qty - 1,
                        total: totalWithTaxesAndDiscounts(state.items[atIndex], (action.payload.qty - 1)),
                    }
                }
            }

            state.total = sum(state.items).total;
            state.totalItems = sum(state.items).totalItems;

            if ((state.paymentType == PaymentType.CASH) && (state.receivedCash - state.total) >= 0) {
                state.difference = state.receivedCash - state.total;
            } else {
                state.difference = 0;
            }
        },

        selectItem: (state, action) => {
            state.selectedItem = action.payload;
        },
        setPaymentType: (state, action) => {
            state.paymentType = action.payload
        },
        setInvoiceType: (state, action) => {
            state.invoiceType = action.payload
        },
        setClientDetails: (state, action) => {

            const clientDetailsDraft = {
                ...state.clientDetails,
                ...action.payload
            }

            state.clientDetails = clientDetailsDraft;
        },
        setSaleDetails: (state, action) => {

            const saleDetailsDraft = {
                ...state.saleDetails,
                ...action.payload
            }

            state.saleDetails = saleDetailsDraft;
        },
        setReceivedCash: (state, action) => {
            state.receivedCash = action.payload * 1;

            if (state.paymentType == PaymentType.CASH && (action.payload - state.total) > 0) {
                state.difference = state.receivedCash - state.total;
            } else if (state.paymentType == PaymentType.MIXED) {
                const moneyToReceive = state.total - state.receivedTpa;
                const receivedCash = action.payload * 1;
                if (receivedCash > moneyToReceive) {
                    state.difference = receivedCash - moneyToReceive;
                }else{
                    state.difference = 0;                    
                }
            } else {
                state.difference = 0;
            }

        },
        setReceivedTpa: (state, action) => {
            state.receivedTpa = action.payload * 1;
            // if(state.paymentType == PaymentType.CASH && (action.payload - state.total) > 0 ){
            //     state.difference =  state.receivedCash - state.total;
            // }else{
            //     state.difference = 0;
            // }

        },
        saleClean: (state) => {
            state.items = [];
            state.receivedCash = 0;
            state.difference = 0;
            state.totalItems = 0;
            state.receivedTpa = 0;
            state.total = 0;
            state.invoiceType = SaleType.SALE;
            state.paymentType = PaymentType.CASH;
            state.saleConfirmationIsOpen = false;
            state.clientDetails = { client_type: ClientType.SINGULAR, phone: DefaultClientePhone };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSales.fulfilled, (state, action) => {

            state.last_created_at = action.payload.last_created_at;
            if (action.payload.last_created_at && (action.payload.data).length) {
                if ((state.sales).length == 0) {
                    state.sales = action.payload.data;
                } else {
                    state.sales = removeDuplicate([...state.sales, ...action.payload.data], 'id');
                }
            }

        });

        builder.addCase(fetchAnualSales.fulfilled, (state, action) => {
            state.anualSales = action.payload.data;
        });

        builder.addCase(order.fulfilled, (state, action) => {
            state.sales.unshift(action.payload.sale_item);
            state.saleConfirmationIsOpen = false;
            console.log(action.payload);
        });

        builder.addCase(order.rejected, (state, action) => {
            console.log(action.payload);
        });

        builder.addCase(getInvoiceItem.fulfilled, (state, action) => {
            console.log(action.payload);
        });
        builder.addCase(getInvoiceItem.rejected, (state, action) => {
            console.log(action.payload);
        });
    }
});


export default saleSlice.reducer;
export const { saleClean, setReceivedCash, setReceivedTpa, increaseOne, decreaseOne, addItem, updateItem, removeItem, selectItem, addProduct, setPaymentType, setInvoiceType, setClientDetails, saleConfirm, saleNotConfirm, setSales, setSaleObject } = saleSlice.actions;
