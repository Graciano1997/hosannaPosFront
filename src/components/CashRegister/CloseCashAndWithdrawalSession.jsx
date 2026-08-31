import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { firstCapitalize } from "../../lib/firstCapitalize";
import { Button } from "../general/Button";
import { closeCashSession, fetchCashSessions, ReinforcementCashSession, validateCurrentUserCashSession, WithdrawalCashSession } from "../../slices/cashRegisterSlice";
import { CurrentUser } from "../../lib/CurrentUser";
import Modal from "../general/Modal";
import { showToast } from "../../slices/appSlice";

export const CloseCashAndWithdrawalSession = ({ withdrawalOperation=false,cashreinforcement=false, modalSize=null,selectedSession, closePopup=()=>{} }) => {

    const dispatch = useDispatch();
    const {t} = useTranslation();

    const [cashSession, setCashSession] = useState({
        id:selectedSession?.id,
        closing_balance: 0
    });

    const [withdrawlCashSession, setWithdrawlCashSession] = useState({
        id:selectedSession?.id,
        withdrawal_amount: 0
    });

    const [cashReinforcementCashSession, setcashReinforcementCashSession] = useState({
        id:selectedSession?.id,
        reinforcement_amount: 0
    });

    const formHandler = (el) => {
        if(withdrawalOperation){
            setWithdrawlCashSession({
                ...withdrawlCashSession,
                [el.target.name]: el.target.value}
            )
        }else if(cashreinforcement){
              setcashReinforcementCashSession({
                ...cashReinforcementCashSession,
                [el.target.name]: el.target.value}
            )
        }
        else{
            setCashSession({
                ...cashSession,
                [el.target.name]: el.target.value
            })
        }
    }

    const handleFormSubmition = (el) => {
        el.preventDefault();

        let treatedCashSessionObject = {
            ...(cashreinforcement ? cashReinforcementCashSession : withdrawalOperation?withdrawlCashSession:cashSession),
            ...(cashreinforcement ? {cash_reinforcement_user_id: CurrentUser()?.id} : withdrawalOperation?({withdrawl_user_id: CurrentUser()?.id}):({user_id: CurrentUser()?.id}))
        }

        console.log("222200",treatedCashSessionObject)

        if(withdrawalOperation){
            dispatch(WithdrawalCashSession(treatedCashSessionObject))
            .then((respo)=>{;
                    if(respo.payload.success){
                        dispatch(showToast({ success: true, message: t('cash_session_withdrawal_successfully') })); 
                        dispatch(fetchCashSessions())
                        dispatch(validateCurrentUserCashSession())
                    }else{
                        dispatch(showToast({ error: true, message: t(respo.payload.message) })); 
                    }
                    closePopup()
            })
        }else if(cashreinforcement) {

            dispatch(ReinforcementCashSession(treatedCashSessionObject))
                    .then((respo)=>{;
                            if(respo.payload.success){
                                dispatch(showToast({ success: true, message: t('cash_session_reinforced_successfully') })); 
                                dispatch(fetchCashSessions())
                                dispatch(validateCurrentUserCashSession())
                            }else{
                                dispatch(showToast({ error: true, message: t(respo.payload.message) })); 
                            }
                            closePopup()
                    })
        }
        else {
            dispatch(closeCashSession(treatedCashSessionObject))
            .then((respo)=>{
                 if(respo.payload.success){
                     dispatch(showToast({ success: true, message: t('cash_session_closed_successfully') })); 
                        dispatch(fetchCashSessions())
                        dispatch(validateCurrentUserCashSession())
                    }else{
                        dispatch(showToast({ error: true, message: t(respo.payload.message) })); 
                    }
                    closePopup()
            })
        }
    }

    return (
        <Modal modalSize={modalSize} helper={closePopup}>
        <div className="flex flex-col justify-center items-center w-full h-full ">
            <h1 className="text-xl sm:text-2xl text-center">
                { cashreinforcement ? firstCapitalize(t('cash_reinforcement_session')) : withdrawalOperation ? firstCapitalize(t('withdrawal_cash_session')) : firstCapitalize(t('close_cash_session'))}
            </h1>

            <form className="flex flex-col justify-center gap-3 mt-7" onSubmit={handleFormSubmition}>
                <div className="flex gap-1 mt-5">
                    <label className="flex gap-4 items-center">
                        {firstCapitalize(t('amount'))}
                        <input
                            type="number"
                            name={`${ cashreinforcement ? 'reinforcement_amount' :  withdrawalOperation ? 'withdrawal_amount':'closing_balance'}`}
                            className="p-1 rounded outline-none"
                            min="0"
                            onChange={formHandler}
                            required
                        />
                    </label>
                </div>
                <Button type="submit" className={"p-2 rounded mt-10 transition-all duration-30 bg-green-200 hover:shadow-md "} content={firstCapitalize(t('confirm'))}/>
            </form>
        </div>
        </Modal>
    )
}