import { useTranslation } from "react-i18next";
import Title from "../general/Title";
import { useEffect, useState } from "react";
import Table from "../Table/Table";
import Create from "./Create";
import SpendDashboard from "./SpentDashboard";
import { useDispatch, useSelector } from "react-redux";
import CardWrapper from "../general/CardWrapper";
import TabWrapper from "../general/TabWrapper";
import { creatingSpent, deleteSpent, fetchAnualSpents, fetchSpents, updatingSpent } from "../../slices/spentSlice";
import { activeTab } from "../../slices/appSlice";

const Spent = () => {
    const { t } = useTranslation();
    const appState = useSelector((state) => state.appState);
    const [isShowing, setIsShowing] = useState(false);
    const dispatch = useDispatch();
    const filterSpentDetails =['id','user_id','image','updated_at'];

    useEffect(()=>{
        dispatch(fetchSpents());
        dispatch(fetchAnualSpents());
        dispatch(activeTab('tab1'));
    },[]);

    const spentState = useSelector((state) => state.spentState);
    const spents = spentState.spents;

    return (
        <CardWrapper>
            <Title setIsShowing={setIsShowing} title={t('spents')} />
            <TabWrapper>
                {appState.activeTab == "tab1" && (<Table filterDetails={filterSpentDetails} filterRows={['user_id','image']} collection={spents} update={updatingSpent} deleteItem={deleteSpent}  create={creatingSpent} />)}
                {appState.activeTab == "tab2" && (<SpendDashboard />)}
            </TabWrapper>
            {(spentState.isCreating || spentState.isUpdating) && appState.isOpen &&  (<Create />)}
        </CardWrapper>
    )
};

export default Spent;