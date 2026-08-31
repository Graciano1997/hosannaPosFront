import { useTranslation } from "react-i18next";
import Title from "./Title";
import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import Create from "./Create";
import { useDispatch, useSelector } from "react-redux";
import CardWrapper from "../general/CardWrapper";
import TabWrapper from "../general/TabWrapper";
import { activeTab, closeModal } from "../../slices/appSlice";
import { creatingCashRegister, deleteCashRegister, fetchCashRegisters, fetchCashSessions, fetchCashSessionsMovements, setCashRegisters, setCashSessionMovements, setSelectedCashSession, updateCashRegisters, updatingCashRegister, validateCurrentUserCashSession } from "../../slices/cashRegisterSlice";
import { CashSessionResume } from "./CashSessionResume";
import { CloseCashAndWithdrawalSession } from "./CloseCashAndWithdrawalSession";
import { CashSessionMovements } from "./CashMoviments";
import { fetchCompanies } from "../../slices/companySlice";

const filterDetails =['id','user_id','company_id','created_at','updated_at'];

const CashRegister = React.memo(
     () => {
    const { t } = useTranslation();
    const appState = useSelector((state) => state.appState);
    const [isShowing, setIsShowing] = useState(false);
    const [isShowingWithdrawal, setIsShowingWithdrawal] = useState(false);
    const [isShowingCloseCash, setIsShowingCloseCash] = useState(false);
    const [isShowingCashReinforcement, setIsShowingCashReinforcement] = useState(false);
    const dispatch = useDispatch();
    const saleState = useSelector((state) => state.saleState);

    useEffect(()=>{
        
        const loadData = async () => {
            await Promise.all([
                dispatch(validateCurrentUserCashSession()),
                dispatch(fetchCashRegisters()),
                dispatch(fetchCashSessions()),
                dispatch(fetchCompanies()),
            ])
        }
        loadData();
    },[dispatch]);
    
    const cashRegisterState = useSelector((state) => state.cashRegisterState);
    const {companies} = useSelector((state) => state.companyState);
    const {cashregisters,cashSessions,currentSession,selectedSession} = cashRegisterState;

    return (
        <CardWrapper>
            <Title setIsShowing={setIsShowing} title={t('cash_register')}
                   collectionToExport={{
                    model:t('cashRegisters'),
                    data:cashregisters}}
            />
            <TabWrapper>
                {appState.activeTab == "tab1" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3   gap-8 p-4 mt-5 overflow-y-auto">
                    {
                    isShowingCloseCash &&
                    <CloseCashAndWithdrawalSession  
                        selectedSession={currentSession}
                        closePopup={()=>{dispatch(setSelectedCashSession(null)); 
                        dispatch(closeModal());
                        setIsShowingCloseCash(false)}} />
                    } 

                    {isShowingWithdrawal && 
                    <CloseCashAndWithdrawalSession  
                        withdrawalOperation={true}
                        selectedSession={selectedSession}
                        closePopup={()=>{
                        dispatch(setSelectedCashSession(null)); 
                        setIsShowingWithdrawal(false)
                        dispatch(closeModal());
                    }} />
                    }

                    {isShowingCashReinforcement && 
                    <CloseCashAndWithdrawalSession  
                        cashreinforcement={true}
                        selectedSession={selectedSession}
                        closePopup={()=>{
                        dispatch(setSelectedCashSession(null)); 
                        setIsShowingCashReinforcement(false)
                        dispatch(closeModal());
                    }} />
                    } 
                        {
                           cashSessions.length >0 && cashSessions.map((session)=>
                                <CashSessionResume
                                t={t}
                                handlerOpenCashClosing={()=>{setIsShowingCloseCash(true)}}
                                handlerOpenCashWithdrawal={()=>{setIsShowingWithdrawal(true)}}
                                handlerOpenCashReinforcement={()=>{setIsShowingCashReinforcement(true)}}
                                session={session}
                                company={companies[0]}
                                currentSession={session.id === currentSession?.id}
                                currentSessionStyle={session.id === currentSession?.id ? 'border-md border-green-400':''}
                                />
                            )
                        }

                    </div>
                )}
                
                {appState.activeTab == "tab2" && (<Table filterDetails={filterDetails} setCollection={setCashRegisters} filterRows={['created_at','updated_at','user_id','image','cash_register_id']} collection={cashSessions} update={null} deleteItem={null} fetcher={fetchCashSessions} dispatcher={setCashRegisters}  create={null} />)}
                {appState.activeTab == "tab3" && (
                    <CashSessionMovements cashSessions={cashSessions} dispatch={dispatch} t={t} />
                    )}
                    
                {appState.activeTab == "tab4" && (<Table filterDetails={filterDetails} setCollection={setCashRegisters} filterRows={['user_id','image']} collection={cashregisters} update={updatingCashRegister} deleteItem={deleteCashRegister} fetcher={fetchCashRegisters} dispatcher={setCashRegisters}  create={creatingCashRegister} />)}
            </TabWrapper>
            {(cashRegisterState.isCreating || cashRegisterState.isUpdating) && appState.isOpen &&  (<Create />)}
        </CardWrapper>
    )
});

export default CashRegister;