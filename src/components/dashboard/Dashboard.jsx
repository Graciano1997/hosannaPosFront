import { useTranslation } from "react-i18next";
import LastSelling from "./LastSelling";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { useDispatch, useSelector } from "react-redux";
import { totalToDay } from "../../lib/totalToDay";
import React, { useEffect, useMemo, useState } from "react";
import { fetchAnualSpents, fetchSpents } from "../../slices/spentSlice";
import { fetchAnualSales, fetchSales } from "../../slices/saleSlice";
import { LineChart } from "./LineChart";
import { DoughnutChart } from "./DoughnutChart";
import { BanknotesIcon, BellAlertIcon, CircleStackIcon, ClockIcon, ShoppingCartIcon, TagIcon, UserIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { activeTab } from "../../slices/appSlice";
import { Profiles } from "../../lib/Enums";
import { fetchAlertProducts, fetchAnualExpiredProducts } from "../../slices/productSlice";
import { fetchStockMovements } from "../../slices/stockSlice";
import { annualMonths } from "../../lib/Months";
import { GenericLineChart } from "./GenericLineChart";
import { rootpath } from "../../lib/ip";
import { CurrentUser } from "../../lib/CurrentUser";


const DashboardNavegateOption = React.memo(({productState, navegate, dispatch}) => {
        const { t } = useTranslation()
        const master = CurrentUser()?.profileId == Profiles?.MASTER;

        return (
            <div className="flex gap-2 justify-end rounded">
                <div className="flex p-0 gap-3">
                    <button onClick={() => {
                        navegate(rootpath + 'sale');
                    }} className="bg-white rounded transition-all duration-200 hover:shadow p-3 gap-1 flex cursor-pointer">
                        <ShoppingCartIcon className="w-5 y-5 text-[#323232] " />
                        <h4>{firstCapitalize(t('sale'))}</h4>

                    </button>
                    {master &&
                        <>
                            <button
                                onClick={() => {
                                    navegate(rootpath + 'sales');
                                }}
                                className="bg-white rounded transition-all duration-200 hover:shadow p-3 gap-1 flex cursor-pointer">
                                <TagIcon className="w-5 y-5 text-[#323232] " />
                                <h4>{firstCapitalize(t('sales'))}</h4>
                            </button>
                            {productState.alertProducts != undefined && productState.alertProducts.length > 0 &&

                                <button
                                    onClick={() => {
                                        dispatch(activeTab('tab4'));
                                        navegate(rootpath + 'products');
                                    }}
                                    className="bg-white rounded transition-all duration-200 hover:shadow p-3 gap-1 flex cursor-pointer">
                                    <BellAlertIcon className="w-5 y-5 text-yellow-600 alert" />
                                    <h4>{firstCapitalize(t('alert'))}</h4>
                                </button>
                            }

                            <button
                                onClick={() => {
                                    dispatch(activeTab('tab5'));
                                    navegate(rootpath + 'products');
                                }}
                                className="bg-white rounded transition-all duration-200 hover:shadow p-3 gap-1 flex cursor-pointer">
                                <ClockIcon className="w-5 y-5 text-red-600 " />
                                <h4>{firstCapitalize(t('expired'))}</h4>
                            </button>
                        </>}

                </div>
            </div>
        )
    })
    
const Dashboard = React.memo(
    () => {
        const { t } = useTranslation();
        const dispatch = useDispatch();
        const master = CurrentUser()?.profileId == Profiles?.MASTER;

        useEffect(() => {
            const loadData = async () => {
                await Promise.all([
                    dispatch(fetchSpents()),
                    dispatch(fetchSales()),
                    dispatch(fetchAnualSpents()),
                    dispatch(fetchAnualSales()),
                    dispatch(fetchAnualExpiredProducts()),
                    dispatch(fetchAlertProducts()),
                    dispatch(fetchStockMovements())
                ])
            }
            loadData();
        }, [dispatch]);

        const navegate = useNavigate();
        const saleState = useSelector((state) => state.saleState);
        const productState = useSelector((state) => state.productState);
        const sales = saleState.sales;
        const spentState = useSelector(state => state.spentState);

        const anualSpents = spentState.anualSpends || [];
        const anualSales = saleState.anualSales || [];
        const anualExpired = productState.anualExpireds || [];

        const today_balance = useMemo(() => { return sales.length > 0 ? totalToDay(sales, new Date()) : 0 }, [sales]);
        const today_spents = useMemo(() => { return spentState.spents && spentState.spents.length > 0 ? totalToDay(spentState.spents, new Date(), "amount") : 0 }, [spentState.spents]);

        const dataLines = useMemo(() => ({
            labels: annualMonths.map(month => firstCapitalize(t(month))),
            datasets: [
                {
                    label: firstCapitalize(t("income")),
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
        }), [dispatch,anualSales, anualSpents, anualExpired, t]);

        return (
            <>
                <div className="mt-[3%]">
                    <div className="p-0 pt-5 ">
                        <DashboardNavegateOption navegate={navegate}
                         productState={productState}
                         dispatch={dispatch} />
                        
                        <div className="grid grid-cols-1 lg:flex lg:flex-wrap  lg:justify-center gap-6 mt-20">

                        <div className="lg:col-span-3">
                            <LastSelling info={{ title: firstCapitalize(t('last_selling')), description: t('about') }} />
                        </div>

                        <div className="lg:col-span-3">
                            <DoughnutChart data={[today_balance, today_spents]} info={firstCapitalize(t('today_status'))} />
                        </div>

                        <div className="lg:col-span-6">
                            <GenericLineChart dataLines={dataLines} info={firstCapitalize(t('income_outcome_expiration'))}  />
                        </div>

                        </div>
                    </div>
                </div>
            </>
        )
    });

export default Dashboard;