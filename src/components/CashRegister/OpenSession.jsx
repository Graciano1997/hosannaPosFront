import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { Button } from "../general/Button";
import { registerSessionCashRegister, validateCurrentUserCashSession } from "../../slices/cashRegisterSlice";
import { CurrentUser } from "../../lib/CurrentUser";
import Modal from "../general/Modal";
import { closeModal, showToast } from "../../slices/appSlice";


export const OpenCashSession = ({ cashregisters,modalSize=null }) => {

    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [cashSession, setCashSession] = useState({
        cash_register_id: cashregisters.length === 1 ? cashregisters[0].id : "",
        opening_balance: 0
    });

    const formHandler = (el) => {
        setCashSession({
            ...cashSession,
            [el.target.name]: el.target.value
        })
    }

    const handleFormSubmition = (el) => {
        el.preventDefault();

        let treatedCashSessionObject = {
            ...cashSession,
            user_id: CurrentUser()?.id,
        }
        dispatch(registerSessionCashRegister(treatedCashSessionObject))
        .then((respo)=>{
            if(respo.payload.success){
                dispatch(showToast({ success: true, message: t('cash_session_created_successfully') })); 
                dispatch(validateCurrentUserCashSession())
                dispatch(closeModal());
            }
            if(respo.payload.cash_register_already_has_session){
                dispatch(showToast({ error: true, message: t('cash_register_already_started_session') })); 
            }
            if(!respo.payload.success){
                dispatch(showToast({ error: true, message: firstCapitalize(t(`cash_register_already_has_an_open_session`))})); 
            }
        })
    }

    return (
        <Modal modalSize={modalSize} helper={()=>dispatch(closeModal())}>
        <div className="flex flex-col justify-center items-center w-full h-full">
            <h1 className="text-xl sm:text-2xl text-center">
                {firstCapitalize(t('open_cash_session'))}
            </h1>

            <form className="flex flex-col justify-center gap-3 mt-7" onSubmit={handleFormSubmition}>
                <div className="flex items-center justify-between gap-1 mt-5">
                    <label htmlFor="cash_register_id" className="flex gap-4 justify-around items-center">
                        {firstCapitalize(t('cash_register'))}
                    </label>

                    <select
                        id="cash_register_id"
                        name="cash_register_id"
                        value={cashSession.cash_register_id}
                        onChange={formHandler}
                        required
                        className="p-1 rounded outline-none"
                    >

                        <option value="" selected disabled>
                            {firstCapitalize(t('select_register'))}
                        </option>

                        {cashregisters.length > 0 && cashregisters.filter((item)=>item.status=='active')
                        .map((cashRegister) => (
                            <option
                                key={cashRegister.id}
                                value={cashRegister.id}
                            >
                                {cashRegister.name}
                            </option>
                        ))}
                    </select>

                </div>
                <div className="flex gap-1 mt-5">
                    <label className="flex gap-4 items-center">
                        {firstCapitalize(t('opening_balance'))}
                        <input
                            type="number"
                            name="opening_balance"
                            className="p-1 rounded outline-none"
                            min="0"
                            onChange={formHandler}
                            required
                        />
                    </label>
                </div>

                <Button type="submit" className={"p-2 rounded mt-10 "} content={firstCapitalize(t('confirm'))} onClickHandler={() => { }} />
            </form>
        </div>
        </Modal>
    )
}