import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIpTenant, Ip, } from "../lib/ip";

const initialState = {
    companies: [],
    loading: false,
    isCreating: false,
    isUpdating: false,
    companyToUpdate: {},
    error: '',
    companyFilterRows: ['created_at', 'updated_at'],
    filterRowsOp: [],
};

export const fetchCompanies = createAsyncThunk("companyState/fetchCompanies", async () => {
    const response = await fetch(`${getIpTenant()}companies/`, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
    return response.json();
});

export const fetchCompaniesFields = createAsyncThunk("companyState/fetchCompaniesFields", async () => {
    const response = await fetch(`${Ip}/api/companies/company_fields`, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
    return response.json();
});

export const deleteCompany = createAsyncThunk("companyState/deleteCompany", async (id) => {
    const response = await fetch(`${getIpTenant()}companies/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
    return response.json();
});

export const registerCompany = createAsyncThunk("companyState/registerCompany", async (companyForm) => {
    const response = await fetch(`${getIpTenant()}companies/`, { method: 'POST', body: companyForm});
    return response.json();
});

export const updateCompany = createAsyncThunk("companyState/updateCompany", async (companyForm) => {
    const response = await fetch(`${getIpTenant()}companies/${companyForm.get("company[id]")}`,
        {
            method: 'PUT',
            body: companyForm,
        });
    return response.json();
});

const companySlice = createSlice({
    name: 'companyState',
    initialState,
    reducers: {
        creatingCompany: (state) => {
            state.isCreating = true;
        },
        stopCreatingCompany: (state) => {
            state.isCreating = false;
        },
        setCompany: (state, action) => {
            state.companies = action.payload;
        },
        updatingCompany: (state, action) => {
            state.isUpdating = true;
            state.companyToUpdate = action.payload;
        },
        stopCreatingOrUpdateingCompany: (state) => {
            state.isCreating = false;
            state.isUpdating = false;
            state.companyToUpdate = {};
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchCompanies.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchCompanies.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload != undefined) {
                state.companies = action.payload.data;
                state.error = '';
            }
        });

        builder.addCase(fetchCompanies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.companies = [];
        });

        builder.addCase(deleteCompany.pending, (state) => { state.loading = true; });

        builder.addCase(deleteCompany.fulfilled, (state, action) => {
            state.loading = false;
            state.companies = state.companies.filter((company) => company.id !== action.payload.id);
            state.error = '';
        });

        builder.addCase(deleteCompany.rejected, (state, action) => {
            state.loading = false;
        })

        builder.addCase(registerCompany.pending, (state) => { state.loading = true; });

        builder.addCase(registerCompany.fulfilled, (state, action) => {
            state.loading = false;
            state.isCreating = false;
            if (action.payload.success) {
                state.companies = action.payload.data;
            }
        });

        builder.addCase(registerCompany.rejected, (state, action) => {
            state.loading = false;
        });

        builder.addCase(updateCompany.fulfilled, (state, action) => {
            state.isUpdating = false;
            state.companyToUpdate = {};
            if (action.payload.success && action.payload.company) {
                const atIndex = state.companies.findIndex(item => item.id === action.payload.company.id);
                if (atIndex !== -1) {
                    const updatedCompany = [...state.companies]; // Create a new array
                    updatedCompany[atIndex] = action.payload.company; // Update the specific item
                    state.companies = updatedCompany; // Assign the new array to state
                }
            }
        })
    }
});

export default companySlice.reducer;
export const { creatingCompany, updatingCompany, stopCreatingCompany, stopCreatingOrUpdateingCompany, setCompany } = companySlice.actions;