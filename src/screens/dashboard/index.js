import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import {
    NgDashboardContainer,
    NgDashboardOverview,
    NgDashboardCardWrapper,
    NgDashboardOverviewWrapper,
    NgDashboardTableCard,
} from "./dashboardElements";

import Greetings from "./greetings";
import DashboardCards from "./dashBoardCards";
import { NgDivider } from "../../components/sidebar/sidebarElements";
import { GetCountContext } from "../../context";
import { List } from "../../components/display/elements";
import withRouter from "../../auth/with.router";
import { InvoiceChartSummary, InvoiceSummary } from "../invoice/summary";
import {
    readInvoicesAction,
    readInvoicesSummaryAction,
} from "../invoice/actions";
import { readProfileAction } from "../profile/actions";
import InvoiceTable from "../invoice/invoice_table";
import {
    config,
    getInvoiceFilterValues,
    TabTitle,
} from "../../utils/globalFunc";
import { getDate } from "date-fns";
import { LineChart } from "../../components/charts/line_chart";
import TenantDashboard from "./tenant_dashboard";
import LandlordDashboard from "./landlord";

import { accountDetailsAction } from "../account/actions";

const Dashboard = () => {
    TabTitle("Welcome Home");
    const dispatch = useDispatch();
    const readInvoiceSummary = useSelector((state) => state.readInvoiceSummary);
    const { invoiceSummary } = readInvoiceSummary;

    const readProperties = useSelector((state) => state.readProperties);
    const {
        loading: readLoading,
        error: readError,
        success: readSuccess,
        properties,
    } = readProperties;

    const [status, setStatus] = useState(() => {
        return getInvoiceFilterValues("status");
    });

    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [property, setProperty] = useState("");

    const [error, setError] = useState();
    const [count, setCount] = useState();

    const getCount = async () => {
        await axios
            .get(`/api/v1/get_count/`, config)
            .then((res) => {
                setCount(res.data.data.payload);
            })
            .catch((err) => {
                setError(
                    err.response && err.response.data.detail ? (
                        <>
                            {Object.keys(err.response.data.detail).map(
                                function (s) {
                                    return (
                                        <List>
                                            {err.response.data.detail[s]}
                                        </List>
                                    );
                                }
                            )}
                        </>
                    ) : (
                        err.message
                    )
                );
            });
    };
    const readInvoice = useSelector((state) => state.readInvoice);
    const {
        loading: invoiceLoading,
        error: invoiceError,
        invoices,
        count: invoiceCount,
    } = readInvoice;

    const readProfile = useSelector((state) => state.readProfile);
    const { error: readProfileError, loading, profile } = readProfile;

    const roles = profile?.groups;

    useEffect(() => {
        dispatch(readInvoicesSummaryAction(month, year, property));
    }, [month, year, property]);

    useEffect(() => {
        dispatch(readInvoicesAction());
        getCount();
    }, []);

    return (
        <NgDashboardContainer>
            <Greetings />

            {roles?.includes("REALTOR") ? (
                <>
                    <NgDashboardCardWrapper>
                        <GetCountContext.Provider
                            value={{ count, setCount, error, setError }}
                        >
                            <DashboardCards />
                        </GetCountContext.Provider>
                    </NgDashboardCardWrapper>

                    <NgDivider />

                    <NgDashboardOverviewWrapper>
                        <NgDashboardTableCard>
                            <LineChart />
                        </NgDashboardTableCard>

                        <NgDashboardTableCard>
                            <InvoiceSummary
                                invoiceSummary={invoiceSummary}
                                status={status}
                                properties={properties}
                                readError={readError}
                                setStatus={setStatus}
                                month={month}
                                setMonth={setMonth}
                                year={year}
                                setYear={setYear}
                                property={property}
                                setProperty={setProperty}
                            />
                        </NgDashboardTableCard>
                    </NgDashboardOverviewWrapper>
                </>
            ) : roles?.includes("LANDLORD") ? (
                <LandlordDashboard />
            ) : (
                ""
            )}
        </NgDashboardContainer>
    );
};

export default Dashboard;

{
    /* <InvoiceChartSummary 
                        properties={properties}
                        readError={readError}
                        invoiceSummary={invoiceSummary}
                        month={month}
                        setMonth={setMonth}
                        year={year}
                        setYear={setYear}
                        property={property}
                        setProperty={setProperty}
                    /> */
}
