import { useTranslation } from "react-i18next";
import Title from "../general/Title";
import { useEffect, useState } from "react";
import Table from "../Table/Table";
import { useDispatch, useSelector } from "react-redux";
import CardWrapper from "../general/CardWrapper";
import TabWrapper from "../general/TabWrapper";
import { activeTab } from "../../slices/appSlice";
import { fetchStockAnualMovements, fetchStockMovements, setStockMovement } from "../../slices/stockSlice";
import StockDashboard from "./StockDashboard";

const StockMovements = () => {
    const { t } = useTranslation();
    const appState = useSelector((state) => state.appState);
    const [isShowing, setIsShowing] = useState(false);
    const dispatch = useDispatch();
    const filterStockDetails =[];

    useEffect(()=>{
        dispatch(fetchStockMovements());
        dispatch(fetchStockAnualMovements(2025));  
        dispatch(activeTab('tab1'));
    },[]);

    const stockState = useSelector((state) => state.stockState);
    const stockMovements = stockState.stockMovements;

    return (
        <CardWrapper>
            <Title setIsShowing={setIsShowing} title={t('stock_movements')}
                   collectionToExport={{
                    model:t('stock_movements'),
                    data:stockMovements}}
            />
            <TabWrapper>
                {appState.activeTab == "tab1" && (<Table filterDetails={filterStockDetails} setCollection={setStockMovement} filterRows={[]} collection={stockMovements} update={null} deleteItem={null} fetcher={fetchStockMovements} dispatcher={setStockMovement}  create={null} />)}
                {appState.activeTab == "tab2" && (<StockDashboard />)}
            </TabWrapper>
        </CardWrapper>
    )
};

export default StockMovements;