import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIpTenant } from "../lib/ip";
import { CurrentUser } from "../lib/CurrentUser";

const initialState = {
    cashregisters: [],
    cashSessions: [],
    cashMovements: [],
    hasCurrentUserStartSession:null,
    selectedSession:null,
    currentSession:null,
    isCreating: false,
    isUpdating: false,
    cashregisterToUpdate: {},
    cashSessionMovements:[]
};

export const fetchCashRegisters = createAsyncThunk("cashregisterState/fetchCashRegisters", async () => {
    const response = await fetch(`${getIpTenant()}cash_registers/`);
    return response.json();
})

export const fetchCashSessions = createAsyncThunk("cashregisterState/fetchCashSessions", async () => {
    const response = await fetch(`${getIpTenant()}cash_sessions/`);
    return response.json();
})

export const fetchCashSessionsMovements = createAsyncThunk("cashregisterState/fetchCashSessionsMovements", async (cash_session) => {
    const response = await fetch(`${getIpTenant()}cash_registers/${cash_session.cash_register_id}/cash_sessions/${cash_session.id}/cash_movements`);
    return response.json();
})

export const deleteCashRegister = createAsyncThunk("CashRegisterState/deleteCashRegister", async (id) => {
    const response = await fetch(`${getIpTenant()}cash_registers/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
    return response.json();
});

export const registerCashRegisters = createAsyncThunk("CashRegisterState/registerCashRegister", async (CashRegister) => {
    const response = await fetch(`${getIpTenant()}cash_registers/`, { method: 'POST', body: JSON.stringify(CashRegister), headers: { 'Content-Type': 'application/json' } });
    return response.json();
});

export const validateCurrentUserCashSession = createAsyncThunk("CashRegisterState/validateCurrentUserCashSession", async () => {
    const response = await fetch(`${getIpTenant()}cash_sessions/validate_cash_session_by_user`, { method: 'POST', body: JSON.stringify({user_id:CurrentUser().id}), headers: { 'Content-Type': 'application/json' } });
    return response.json();
});

export const updateCashRegisters = createAsyncThunk("CashRegisterState/updateCashRegister", async (CashRegister) => {
    const response = await fetch(`${getIpTenant()}cash_registers/${CashRegister.id}`,
        {
            method: 'PUT',
            body: JSON.stringify(CashRegister),
            headers: { 'Content-Type': 'application/json' }
        });
    return response.json();
});

export const registerSessionCashRegister = createAsyncThunk("CashRegisterState/registerSessionCashRegister", async (CashRegisterSession) => {
    const response = await fetch(`${getIpTenant()}cash_registers/${CashRegisterSession.cash_register_id}/cash_sessions`, { method: 'POST', body: JSON.stringify({user_id:CashRegisterSession.user_id,opening_balance:CashRegisterSession.opening_balance}), headers: { 'Content-Type': 'application/json' } });
    return response.json();
});

export const closeCashSession = createAsyncThunk("cashregisterState/closeCashSession", async (cashSession) => {
    const response = await fetch(`${getIpTenant()}cash_sessions/close`,{ method: 'POST', body: JSON.stringify(cashSession), headers: { 'Content-Type': 'application/json' } });
    return response.json();
})

export const WithdrawalCashSession = createAsyncThunk("cashregisterState/WithdrawalCashSession", async (cashSession) => {
    const response = await fetch(`${getIpTenant()}cash_sessions/withdrawal`,{ method: 'POST', body: JSON.stringify(cashSession), headers: { 'Content-Type': 'application/json' } });
    return response.json();
})

export const ReinforcementCashSession = createAsyncThunk("cashregisterState/ReinforcementCashSession", async (cashSession) => {
    const response = await fetch(`${getIpTenant()}cash_sessions/cash_reinforcement`,{ method: 'POST', body: JSON.stringify(cashSession), headers: { 'Content-Type': 'application/json' } });
    return response.json();
})


export const CashSessionReport = createAsyncThunk("cashregisterState/CashSessionReport", async (cashSession) => {
    const response = await fetch(`${getIpTenant()}cash_sessions/report`,{ method: 'POST', body: JSON.stringify(cashSession), headers: { 'Content-Type': 'application/json' } });
    return response.json();
})

const cashRegisterSlice = createSlice({
    name: 'cashregisterState',
    initialState: initialState,
    reducers: {
        creatingCashRegister: (state) => {
            state.isCreating = true;
        },
        
        updatingCashRegister: (state,action)=>{
            state.isUpdating = true;
            state.cashregisterToUpdate=action.payload;
        },
        setCashRegisters:(state,action)=>{
            state.cashregisters=action.payload;
        },
        setSelectedCashSession:(state,action)=>{
            state.selectedSession=action.payload;
        },
        stopCreatingOrUpdateingCashRegister : (state)=>{
            state.isCreating = false;
            state.isUpdating = false;
            state.cashregisterToUpdate = {};
        },

        setCashSessionMovements:(state,action)=>{
            state.cashSessionMovements=action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCashRegisters.fulfilled, (state, action) => {
            state.cashregisters = action.payload.data;
        });

        builder.addCase(registerSessionCashRegister.fulfilled, (state, action) => {
            if (!action.payload.error) {
                state.cashSessions.push({ ...action.payload.data });
                state.isCreating = false;
            }
        });

        builder.addCase(registerCashRegisters.fulfilled, (state, action) => {
            if (!action.payload.error) {
                state.cashregisters.push({ ...action.payload.CashRegister });
                state.isCreating = false;
            }
        });
        
        builder.addCase(fetchCashSessions.fulfilled, (state, action) => {
            state.cashSessions = action.payload.data;
        });

        builder.addCase(fetchCashSessionsMovements.fulfilled, (state, action) => {
            state.cashSessionMovements = action.payload.data;
        });

        builder.addCase(validateCurrentUserCashSession.fulfilled, (state, action) => {
            state.hasCurrentUserStartSession = action.payload.data
            state.currentSession = action.payload.session
        });

        builder.addCase(deleteCashRegister.fulfilled, (state, action) => {
            state.cashregisters = state.cashregisters.map((CashRegister) =>{
                if(CashRegister.id== action.payload.id){
                    CashRegister.status='inactive';
                }           
                return CashRegister;
            } );
            state.error = '';
        });

        builder.addCase(updateCashRegisters.fulfilled, (state, action) => {
            state.cashregisterToUpdate = {};
            if (action.payload.success && action.payload.cash_register) {
                const atIndex = state.cashregisters.findIndex(item => item.id === action.payload.cash_register.id);
                if (atIndex !== -1) {
                    const updatedCashRegisters = [...state.cashregisters]; // Create a new array
                    updatedCashRegisters[atIndex] = action.payload.cash_register; // Update the specific item
                    state.cashregisters = updatedCashRegisters; // Assign the new array to state
                }
                state.isUpdating = false;
            }
        })
    }
});

export default cashRegisterSlice.reducer;
export const { creatingCashRegister, updatingCashRegister, stopCreatingOrUpdateingCashRegister, setCashRegisters,setCashSessionMovements,setSelectedCashSession  } = cashRegisterSlice.actions;
