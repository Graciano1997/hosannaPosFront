import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIpTenant, Ip, } from "../lib/ip";

const initialState = {
    bankAccounts:[],
    loading: false,
    isCreating: false,
    isUpdating: false,
    bankAccountToUpdate: {},
    error: '',
    bankAccountFilterRows: ['created_at','updated_at'],
    filterRowsOp: [],
};

export const deleteBankAccount = createAsyncThunk("bankAccountState/deleteBankAccount", async (id) => {
    const response = await fetch(`${getIpTenant()}bank_accounts/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
    return response.json();
});

export const registerBankAccount = createAsyncThunk("bankAccountState/registerBankAccount", async (bankForm) => {
    const response = await fetch(`${getIpTenant()}bank_accounts/`, 
    { 
      method: 'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(bankForm)
    });
    return response.json();
});

export const updateBankAccount = createAsyncThunk("bankAccountState/updateBankAccount", async (bankForm) => {
const response = await fetch(`${getIpTenant()}bank_accounts/${bankForm.id}")}`,
    {
        method: 'PUT',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(bankForm),
    });
    return response.json();
});

export const fetchBankAccounts = createAsyncThunk("bankAccountState/fetchBankAccounts", async () => {
    const response = await fetch(`${getIpTenant()}bank_accounts/`, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
    return response.json();
});


const bankAccountSlice = createSlice({
    name: 'bankAccountState',
    initialState,
    reducers: {
        creatingBankAccount: (state) => {
            state.isCreating = true;
        },
        stopCreatingBankAccount: (state) => {
            state.isCreating = false;
        },
        setBankAccount: (state, action) => {
            state.bankAccounts = action.payload;
        },
        updatingBankAccount: (state, action) => {
            state.isUpdating = true;
            state.bankAccountToUpdate = action.payload;
        },
        stopCreatingOrUpdateingBankAccount: (state) => {
            state.isCreating = false;
            state.isUpdating = false;
            state.bankAccountToUpdate = {};
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchBankAccounts.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchBankAccounts.fulfilled, (state, action) => {
            state.loading = false;
            
            console.log(action.payload);

            if (action.payload != undefined) {
                state.bankAccounts = action.payload.data;
                state.error = '';
            }
        });

        builder.addCase(deleteBankAccount.pending, (state) => { state.loading = true; });

        builder.addCase(deleteBankAccount.fulfilled, (state, action) => {
            state.loading = false;
            state.bankAccounts = state.bankAccounts.filter((bank) => bank.id !== action.payload.id);
            state.error = '';
        });

        builder.addCase(deleteBankAccount.rejected, (state, action) => {
            state.loading = false;
        })

        builder.addCase(registerBankAccount.pending, (state) => { state.loading = true; });

        builder.addCase(registerBankAccount.fulfilled, (state, action) => {
            state.loading = false;
            state.isCreating = false;
            if (action.payload.success) {
                state.bankAccounts.push({...action.payload.data});
            }
        });

        builder.addCase(registerBankAccount.rejected, (state, action) => {
            state.loading = false;
        });

        builder.addCase(updateBankAccount.fulfilled, (state, action) => {
            state.isUpdating = false;
            state.bankAccountToUpdate = {};
            if (action.payload.success && action.payload.bank_account) {
                const atIndex = state.bankAccounts.findIndex(item => item.id === action.payload.bank_account.id);
                if (atIndex !== -1) {
                    const updatedBankAccount = [...state.bankAccounts]; // Create a new array
                    updatedBankAccount[atIndex] = action.payload.bank_account; // Update the specific item
                    state.bankAccounts = updatedBankAccount; // Assign the new array to state
                }
            }
        })
    }
});

export default bankAccountSlice.reducer;
export const { creatingBankAccount, updatingBankAccount, stopCreatingBankAccount, stopCreatingOrUpdateingBankAccount, setBankAccount } = bankAccountSlice.actions;