import { useTranslation } from "react-i18next";
import Title from "../general/Title";
import { useEffect, useState } from "react";
import Table from "../Table/Table";
import Create from "./Create";
import SpendDashboard from "./SpentDashboard";
import { useDispatch, useSelector } from "react-redux";
import CardWrapper from "../general/CardWrapper";
import TabWrapper from "../general/TabWrapper";
import { creatingSpent, deleteSpent, fetchSpents, updatingSpent } from "../../slices/spentSlice";

const Spent = () => {
    const { t } = useTranslation();
    const appState = useSelector((state) => state.appState);
    const [isShowing, setIsShowing] = useState(false);
    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(fetchSpents());
    },[])

    const spentState = useSelector((state) => state.spentState);
    const spents = spentState.spents;

    return (
        <CardWrapper>
            <Title setIsShowing={setIsShowing} title={t('spends')} />
            <TabWrapper>
                {appState.activeTab == "tab1" && (<Table filterRows={['user_id']} collection={spents} update={updatingSpent} deleteItem={deleteSpent}  create={creatingSpent} />)}
                {appState.activeTab == "tab2" && (<SpendDashboard />)}
            </TabWrapper>
            {(spentState.isCreating || spentState.isUpdating) && (<Create />)}
        </CardWrapper>
    )
};

export default Spent;