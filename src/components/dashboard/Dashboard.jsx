import { useTranslation } from "react-i18next";
import LastSelling from "./LastSelling";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";
import { fetchAnualSpents, fetchSpents } from "../../slices/spentSlice";
import { fetchAnualSales, fetchDashboard, fetchSales } from "../../slices/saleSlice";
import { DoughnutChart, GaugeChart } from "./DoughnutChart";
import { BellAlertIcon, BellIcon, ClockIcon, ShoppingCartIcon, TagIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { activeTab, openModal } from "../../slices/appSlice";
import { fetchAlertProducts, fetchAnualExpiredProducts, fetchExpiredProductsDashboard } from "../../slices/productSlice";
import { fetchStockDashboard, fetchStockMovements } from "../../slices/stockSlice";
import { annualMonths } from "../../lib/Months";
import { GenericLineChart } from "./GenericLineChart";
import { rootpath } from "../../lib/ip";
import { CurrentUser } from "../../lib/CurrentUser";
import { Button } from "../general/Button";
import { PieChart } from "./PieChart";
import { BarChart } from "./BarChart";
import { fetchClientDashboard } from "../../slices/clientSlice";
import { Profiles } from "../../lib/Enums";
import { fetchCashRegisters, validateCurrentUserCashSession } from "../../slices/cashRegisterSlice";
import { OpenCashSession } from "../CashRegister/OpenSession";

export const OpenAndCloseSession = ({t,startingCashSessionHandler=()=>{},closingCashSessionHandler=()=>{} })=>{
    
    const cashRegisterState = useSelector((state) => state.cashRegisterState);
    const {hasCurrentUserStartSession} = cashRegisterState;

    return(
        <div>
                {
                    hasCurrentUserStartSession && !hasCurrentUserStartSession &&
                    <Button 
                    content={<p className="truncate">{firstCapitalize(t('open_cash'))}</p>}
                    className={"bg-white text-green-500 rounded p-3 transition-all duration-200 shadow-sm hover:shadow"}
                    onClickHandler={()=>startingCashSessionHandler()}
                    />
                }    
                {
                    hasCurrentUserStartSession &&
                    <Button 
                    content={<p className="truncate">{firstCapitalize(t('close_cash'))}</p>}
                    className={"bg-white text-red-500 rounded p-3 transition-all duration-200 shadow-sm hover:shadow"}
                    onClickHandler={()=>{closingCashSessionHandler()}}
                    />
                }    
            </div>
    )
}
const NavegateItem = ({ number = 0, title, icon, onClickHandler }) => {
    return (
        <Button
            content={
                <div className="flex flex-row-reverse justify-between sm:flex-col ">
                    <p className="font-bold text-lg">{number}</p>
                    <div className="gap-1 flex" >
                        {icon}
                        <h4>{title}</h4>
                    </div>
                </div>
            }
            className={"bg-white rounded transition-all duration-200 hover:shadow p-3 gap-1 flex flex-col cursor-pointer "}
            onClickHandler={onClickHandler}
        />
    )
}

const DashboardNavegateOption = React.memo(({ navegate, dispatch, kpis, productState, startingCashSessionHandler=()=>{} }) => {
    const { t } = useTranslation()
    const master = CurrentUser()?.profileId == Profiles?.MASTER
    const alertProductsNumber = productState.alertProducts.length;
    const expiredProductsNumber = productState.expiredsTotal;


    return (
     
        <div className="flex flex-col sm:flex-row  gap-2 sm:gap-4 justify-end rounded">
            <Button
                className="bg-white rounded transition-all duration-200 hover:shadow p-3 gap-1 flex items-center cursor-pointer"
                onClickHandler={
                    () => { navegate(rootpath + 'sale'); }
                }
                content={
                    <>
                        <ShoppingCartIcon className="w-5 y-5 text-[#323232] " />
                        <h4>{firstCapitalize(t('sale'))}</h4>
                    </>
                } />

            <NavegateItem
                number={kpis.today_sales_count ?? 0}
                icon={<TagIcon className="w-5 y-5 text-[#323232]" />}
                title={firstCapitalize(t('sales'))}
                onClickHandler={() => { navegate(rootpath + 'sales') }}
            />

            {
                false
                &&
                <NavegateItem
                    number={10}
                    icon={<BellIcon className="w-5 y-5 text-[#323232] " />}
                    title={firstCapitalize(t('notifications'))}
                    onClickHandler={() => { navegate(rootpath + 'sale') }}
                />
            }

            {master &&
                <>
                    {productState.alertProducts != undefined && productState.alertProducts.length > 0 &&
                        <NavegateItem
                            number={alertProductsNumber ?? 0}
                            icon={<BellAlertIcon className="w-5 y-5 text-yellow-600 alert" />}
                            title={firstCapitalize(t('alert'))}
                            onClickHandler={() => {
                                dispatch(activeTab('tab4'));
                                navegate(rootpath + 'products')
                            }}
                        />
                    }
                    <NavegateItem
                        number={expiredProductsNumber ?? 0}
                        icon={<ClockIcon className="w-5 y-5 text-red-600 " />}
                        title={firstCapitalize(t('expired'))}
                        onClickHandler={() => {
                            dispatch(activeTab('tab5'));
                            navegate(rootpath + 'products')
                        }}
                    />
                </>}
        </div>
    )
})

const Dashboard = React.memo(
    () => {
        const { t } = useTranslation();
        const dispatch = useDispatch();
        const master = CurrentUser()?.profileId == Profiles.MASTER;

        useEffect(() => {
            const loadData = async () => {
                await Promise.all([
                    dispatch(fetchSpents()),
                    dispatch(fetchSales()),
                    dispatch(fetchAnualSpents()),
                    dispatch(fetchAnualSales()),
                    dispatch(fetchAnualExpiredProducts()),
                    dispatch(fetchAlertProducts()),
                    dispatch(fetchStockMovements()),
                    dispatch(fetchStockDashboard()),
                    dispatch(fetchClientDashboard()),
                    dispatch(fetchExpiredProductsDashboard()),
                    dispatch(fetchDashboard()),
                    dispatch(fetchCashRegisters()),
                    dispatch(validateCurrentUserCashSession())
                ])
            }
            loadData();
        }, [dispatch]);

        const navegate = useNavigate();
        const saleState = useSelector((state) => state.saleState);
        const productState = useSelector((state) => state.productState);
        const sales = saleState.sales;
        const spentState = useSelector(state => state.spentState);
        const stockState = useSelector((state) => state.stockState);
        const clientState = useSelector((state) => state.clientState);
        const [startingCashSession,setStartingCashSession]=useState(false);
        const appState = useSelector((state) => state.appState);
    
        const cashRegisterState = useSelector((state) => state.cashRegisterState);
        const {cashregisters} = cashRegisterState;

        const anualSpents = spentState.anualSpends || [];
        const anualSales = saleState.anualSales || [];
        const anualExpired = productState.anualExpireds || [];
        const anualClients = clientState.clientsDashboard || [];
        const kpis = saleState.kpis;

        const dataLinesClient = useMemo(() => ({
            labels: annualMonths.map(month => firstCapitalize(t(month))),
            datasets: [
                {
                    label: firstCapitalize(t("clients")),
                    data: anualClients,
                    fill: true,
                    borderColor: "#3B82F6",
                    tension: 0.5
                }
            ]
        }), [dispatch, anualSales, anualSpents, anualExpired, t]);

        const dataLines = useMemo(() => ({
            labels: annualMonths.map(month => firstCapitalize(t(month))),
            datasets: [
                {
                    label: firstCapitalize(t("sales")),
                    data: anualSales,
                    fill: false,
                    borderColor: "#18CA80",
                    tension: 0.5
                },
                {
                    label: firstCapitalize(t("spents")),
                    data: anualSpents,
                    fill: false,
                    borderColor: "rgb(255, 99, 132)",
                    tension: 0.5
                },
                {
                    label: firstCapitalize(t("expired")),
                    data: anualExpired,
                    fill: false,
                    borderColor: "rgb(255, 205, 86)",
                    tension: 0.5
                }
            ]
        }), [dispatch, anualSales, anualSpents, anualExpired, t]);

        const stockData = stockState.dashboard;

        const stockDataCollection = [
            stockData?.entry,
            stockData?.exit,
            stockData?.adjustment,
            stockData?.expired,
            stockData?.return ? stockData?.return : 0
        ]

        const barChartData = {
            labels: [
                `${firstCapitalize(t('entry'))}`,
                `${firstCapitalize(t('exit'))}`,
                `${firstCapitalize(t('adjustment'))}`,
                `${firstCapitalize(t('expired'))}`,
                `${firstCapitalize(t('return'))}`
            ],
            datasets: [
                {
                    label: firstCapitalize(t('moviments')),
                    data: stockDataCollection,
                    backgroundColor: [
                        '#18CA80', // Entradas
                        '#FF6384', // Saídas
                        '#F59E0B', // Ajustes
                        '#6B7280', // Vencidos
                        '#8B5CF6', // Devoluções
                    ]
                }
            ],
        };

        const datagauge = {
            datasets: [
                {
                    data: [90, 10],
                    borderWidth: 0,
                    cutout: '70%',
                }
            ]
        };

        const labels = [firstCapitalize(t('money')), firstCapitalize(t('transfer')), firstCapitalize(t('mixed'))];
        const dataPie = {
            labels,
            datasets: [
                {

                    data: [kpis?.sales_type?.cash, kpis?.sales_type?.tpa, kpis?.sales_type?.mixed],
                    backgroundColor: ['#22C55E', '#3B82F6', '#F59E0B'],
                    borderWidth: 1,
                },
            ],
        };
        return (
            <>
                <div className="mt-[3%]">
                    <div className="p-0 pt-5 p-5 ">
                        <DashboardNavegateOption
                            startingCashSessionHandler={()=>{dispatch(openModal()); setStartingCashSession(true)}}
                            kpis={kpis}
                            productState={productState}
                            navegate={navegate}
                            dispatch={dispatch} />

                        <div className="grid    
                        grid-cols-1
                        sm:grid-cols-2
                        md:grid-cols-2
                        lg:grid-cols-12
                        xl:grid-cols-12
                        justify-center gap-10 mt-5 sm:gap-18 sm:mt-[50px] p-1
                         ">

                            {master &&
                                <>
                                    <div className="lg:col-span-4">
                                        <BarChart data={barChartData} indexAxis={'y'} width={300} height={300} info={firstCapitalize(t('stock_movements'))} />
                                    </div>
                                    <div className="
                                    sm:col-span-1
                                    md:col-span-1
                                    lg:col-span-4
                                    xl:col-span-4
                                    ">
                                        <GenericLineChart width={300} height={300} dataLines={dataLinesClient} info={firstCapitalize(t('client_growth'))} />
                                    </div>
                                    <div className="
                            sm:col-span-1
                                    md:col-span-1
                                    lg:col-span-4
                                    xl:col-span-4
                        ">
                                        <GenericLineChart width={300} height={300} dataLines={dataLines} info={firstCapitalize(t('income_outcome_expiration'))} />
                                    </div>
                                </>

                            }

                            <div className="
                            sm:col-span-1
                                    md:col-span-1
                                    lg:col-span-4
                                    xl:col-span-4
                        ">
                                <DoughnutChart data={[kpis.today_sale_total, kpis.today_spents_total]} info={firstCapitalize(t('today_status'))} />
                            </div>

                            <div className="
                            sm:col-span-1
                                    md:col-span-1
                                    lg:col-span-4
                                    xl:col-span-4
                        ">
                                <PieChart data={dataPie} width={300} height={300} info={firstCapitalize(t('payment_method'))} />

                            </div>
                            <div className="lg:col-span-4 ">
                                <GaugeChart data={datagauge} width={300} height={300} info={`${firstCapitalize(t('monthly_target'))} - ${firstCapitalize(t('building'))}`} />

                            </div>
                            <div className="
                        sm:col-span-2
                        md:col-span-2
                        lg:col-span-12
                        xl:col-span-12
                        ">
                                <LastSelling info={{ title: firstCapitalize(t('last_selling')), description: t('about') }} />
                            </div>
                        </div>
                    </div>
                    {
                    startingCashSession && 
                    appState.isOpen
                    &&
                    <OpenCashSession
                    modalSize={"h-[80%] w-[80%] sm:h-[60%] sm:w-[60%] md:h-[600px] md:w-[600px] "}
                    cashregisters={cashregisters}
                    />
                    }
                </div>
            </>
        )
    });

export default Dashboard;