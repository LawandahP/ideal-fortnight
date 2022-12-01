import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { Grid } from "@mui/material";

import "chart.js/auto";
import { Chart } from "react-chartjs-2";
// import { Chart } from "chart.js";
import Controls from "../../components/controls/Controls";

import {
    InvoiceChart,
    InvoiceInlineContainer,
    InvoiceSummaryContainer,
    NgDivider,
    TotalInvoice,
    TextInvoiceSummary,
    InvoiceFilterContainer,
    InvoiceListFilterContainer,
    InvoiceStatusFilter,
    ClearFilterBtn,
} from "./elements";
import { commafy, config, months } from "../../utils/globalFunc";
import { List } from "../../components/display/elements";
import { readInvoicesSummaryAction } from "./actions";
import { readPropertiesAction } from "../properties/actions";
import { MdFilterList } from "react-icons/md";
import { FcClearFilters } from "react-icons/fc";
import TooltipAlert from "../../components/display/tooltipAlert";
import { FiAlertCircle } from "react-icons/fi";

// export const FilterForm = (status, setStatus, month, setMonth, year, setYear, property, setProperty) => {

//     const dispatch = useDispatch()

//     const readProperties = useSelector(state => state.readProperties)
//     const { loading: readLoading, error: readError, success: readSuccess, properties, count } = readProperties

//     useEffect(() => {
//         dispatch(readPropertiesAction())
//     },[property])

//     return (
//         <InvoiceListFilterContainer>

//                 <Controls.SelectInput
//                     name="date_month"
//                     value={month}
//                     onChange={(e) => setMonth(e.target.value)}
//                     options={months}
//                 />

//                 <Controls.TextInputField
//                     type="number"
//                     label="Year"
//                     name="date_year"
//                     value={year}
//                     onChange={(e) => setYear(e.target.value)}
//                 />

//                 <Controls.SelectInput
//                     name="property"
//                     value={property}
//                     onChange={(e) => setProperty(e.target.value)}
//                     options={properties}
//                 />

//         </InvoiceListFilterContainer>
//     )
// }

export const InvoiceChartSummary = (props) => {
    const {
        invoiceSummary,
        month,
        setMonth,
        year,
        setYear,
        property,
        setProperty,
        properties,
        readError,
    } = props;
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(readPropertiesAction())
    // },[property])

    return (
        <InvoiceFilterContainer>
            <InvoiceListFilterContainer>
                <Controls.SelectInput
                    name="date_month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    options={months}
                />

                <Controls.TextInputField
                    type="number"
                    label="Year"
                    name="date_year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />

                {readError ? (
                    <Controls.ActionButton
                        title={`Failed to fetch properties! ${readError}`}
                    >
                        <FiAlertCircle />
                    </Controls.ActionButton>
                ) : (
                    <Controls.SelectInput
                        name="property"
                        value={property}
                        onChange={(e) => setProperty(e.target.value)}
                        options={properties}
                    />
                )}
            </InvoiceListFilterContainer>

            <InvoiceChart>
                <Chart
                    type="doughnut"
                    data={{
                        //     labels: [
                        //     'Red',
                        //     'Blue',
                        //     'Yellow'
                        // ],
                        datasets: [
                            {
                                label: "Invoice",
                                data: [
                                    invoiceSummary?.open_invoice_amount,
                                    invoiceSummary?.fully_paid_amount,
                                    invoiceSummary?.overdue_amount,
                                    invoiceSummary?.partially_paid_amount,
                                ],
                                backgroundColor: [
                                    "rgb(13, 26, 79)",
                                    "rgb(1, 191, 113)",
                                    "rgb(255, 0, 0)",
                                    "rgb(159, 232, 253)",
                                ],
                                hoverOffset: 4,
                                borderWidth: 2,
                                cutout: "70%",
                                responsive: true,
                                maintainAspectRatio: true,
                            },
                        ],
                    }}
                />
            </InvoiceChart>
        </InvoiceFilterContainer>
    );
};

export const InvoiceSummary = (props) => {
    const {
        status,
        setStatus,
        month,
        setMonth,
        year,
        setYear,
        property,
        setProperty,
        invoiceSummary,
        properties,
        readError,
    } = props;
    // const [ invoiceSummary, setInvoiceSummary ] = useState()
    const dispatch = useDispatch();

    // const readInvoiceSummary = useSelector(state => state.readInvoiceSummary);
    // const { invoiceSummary } = readInvoiceSummary;

    // const readLandlordInvoiceSummary = useSelector(state => state.readInvoicesSummaryAction)
    // const { landlordInvoiceSummary } = readLandlordInvoiceSummary;

    const updateInvoice = useSelector((state) => state.updateInvoice);
    const { success: successUpdate } = updateInvoice;

    const deleteInvoice = useSelector((state) => state.deleteInvoice);
    const { success: successDelete } = deleteInvoice;

    const Status = () => {
        return (
            <>
                <NgDivider />

                <InvoiceStatusFilter open onClick={() => setStatus("Open")}>
                    <TextInvoiceSummary open cash>
                        Ksh{" "}
                        {commafy(Number(invoiceSummary?.open_invoice_amount))}
                    </TextInvoiceSummary>
                    <TextInvoiceSummary>OPEN INVOICE</TextInvoiceSummary>
                    {status === "Open" && <MdFilterList />}
                </InvoiceStatusFilter>

                <InvoiceStatusFilter
                    overdue
                    onClick={() => setStatus("Overdue")}
                >
                    <>
                        <TextInvoiceSummary overdue cash>
                            Ksh{" "}
                            {commafy(Number(invoiceSummary?.overdue_amount))}
                        </TextInvoiceSummary>
                        <TextInvoiceSummary>OVERDUE</TextInvoiceSummary>
                    </>
                    {status === "Overdue" && <MdFilterList />}
                </InvoiceStatusFilter>

                <NgDivider />

                <InvoiceStatusFilter
                    partially_paid
                    onClick={() => setStatus("Partially Paid")}
                >
                    <TextInvoiceSummary partially_paid cash>
                        Ksh{" "}
                        {commafy(Number(invoiceSummary?.partially_paid_amount))}
                    </TextInvoiceSummary>
                    <TextInvoiceSummary>PARTIALLY PAID</TextInvoiceSummary>
                    {status === "Partially Paid" && <MdFilterList />}
                </InvoiceStatusFilter>

                <NgDivider />

                <InvoiceStatusFilter>
                    <TextInvoiceSummary cash>
                        Ksh {commafy(Number(invoiceSummary?.balance_amount))}
                    </TextInvoiceSummary>
                    <TextInvoiceSummary>BALANCE</TextInvoiceSummary>
                </InvoiceStatusFilter>

                <NgDivider />

                <InvoiceStatusFilter
                    fully_paid
                    onClick={() => setStatus("Fully Paid")}
                >
                    <TextInvoiceSummary fully_paid cash>
                        Ksh {commafy(Number(invoiceSummary?.fully_paid_amount))}
                    </TextInvoiceSummary>
                    <TextInvoiceSummary>FULLY PAID</TextInvoiceSummary>
                    {status === "Fully Paid" && <MdFilterList />}
                </InvoiceStatusFilter>

                <NgDivider />

                <InvoiceStatusFilter>
                    <TextInvoiceSummary cash>
                        Ksh {commafy(Number(invoiceSummary?.total_paid_amount))}
                    </TextInvoiceSummary>
                    <TextInvoiceSummary>TOTAL PAID</TextInvoiceSummary>
                </InvoiceStatusFilter>
                <NgDivider />

                <ClearFilterBtn onClick={() => setStatus("")}>
                    <FcClearFilters /> clear filters
                </ClearFilterBtn>
            </>
        );
    };

    // useEffect(() => {
    //     dispatch(readInvoicesSummaryAction(month, year, property))
    //     // getInvoiceSummary(month, year)
    // }, [successUpdate, successDelete, month, year, property])

    return (
        <InvoiceSummaryContainer>
            <InvoiceInlineContainer>
                <TotalInvoice>
                    Ksh {commafy(Number(invoiceSummary?.total_invoice_amount))}
                </TotalInvoice>
                <p>Total Invoice Amount</p>

                <InvoiceChartSummary
                    properties={properties}
                    readError={readError}
                    invoiceSummary={invoiceSummary}
                    month={month}
                    setMonth={setMonth}
                    year={year}
                    setYear={setYear}
                    property={property}
                    setProperty={setProperty}
                />

                {/* <FilterForm 
                    month={month}
                    setMonth={setMonth}
                    year={year}
                    setYear={setYear}
                    property={property}
                    setProperty={setProperty}
                /> */}

                <Status
                    status={status}
                    setStatus={setStatus}
                    month={month}
                    setMonth={setMonth}
                    year={year}
                    setYear={setYear}
                    property={property}
                    setProperty={setProperty}
                />
            </InvoiceInlineContainer>
        </InvoiceSummaryContainer>
    );
};

// const getInvoiceSummary = async (date_month="", date_year='') => {
//     setLoading(true)
//     await axios.get(
//         `/invoice-summary/?date_month=${date_month}&date_year=${date_year}`, config
//     ).then(res => {
//         setLoading(false)
//         console.log("invoice_summary", res?.data)
//         setInvoiceSummary(res?.data?.data?.payload)
//     }).catch(err => {
//         setError(err.response && err.response.data.detail ?
//             <>
//                 {Object.keys(err.response.data.detail).map(function(s) {
//                 return (
//                     <List>{err.response.data.detail[s]}</List>
//                 )})}
//             </>
//             : err.message)
//         setLoading(false)
//     });
// }
