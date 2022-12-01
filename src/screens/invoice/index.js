import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TableComponent } from "../../components/useTable";
import ToastAlert from "../../components/display/ToastAlert";
import Loader from "../../components/display/Loader";
import Controls from "../../components/controls/Controls";

import {
    NgLink,
    NgPageContainer,
    NgPaper,
} from "../../components/display/elements";

import {
    commafy,
    TabTitle,
    toTitleCase,
    toMonthName,
    getInvoiceFilterValues,
} from "../../utils/globalFunc";
import {
    createInvoiceAction,
    deleteInvoiceAction,
    readInvoicesAction,
    readInvoicesSummaryAction,
    updateInvoiceAction,
} from "./actions";
import { ActionButtonWrapper } from "../../components/controls/Button";
import { TableTop } from "../../components/useTable/elements";

import { FiFilter } from "react-icons/fi";
import { InvoiceButton } from "./elements";
import { InvoiceSummary } from "./summary";
import LeftSidebar from "../../components/display/leftSidebar";
import InvoiceTable from "./invoice_table";
import { readPropertiesAction } from "../properties/actions";

const InvoiceList = () => {

    const dispatch = useDispatch();
    const [isOpened, setIsOpened] = useState(true);

    const [status, setStatus] = useState(() => {
        return getInvoiceFilterValues("status");
    });

    const [month, setMonth] = useState(() => {
        return getInvoiceFilterValues("date_month");
    });

    const [year, setYear] = useState(new Date().getFullYear());
    const [property, setProperty] = useState(
        getInvoiceFilterValues("property")
    );

    const readInvoiceSummary = useSelector((state) => state.readInvoiceSummary);
    const { invoiceSummary } = readInvoiceSummary;

    const readProperties = useSelector((state) => state.readProperties);
    const {
        loading: readLoading,
        error: readError,
        properties,
    } = readProperties;

    const createInvoice = useSelector((state) => state.createInvoice);
    const { success: successCreate } = createInvoice;

    const readInvoice = useSelector((state) => state.readInvoice);
    const { loading, error, invoices, count } = readInvoice;

    const updateInvoice = useSelector((state) => state.updateInvoice);
    const {
        success: successUpdate,
        message: successUpdateMessage,
        loading: loadingUpdate,
    } = updateInvoice;

    const deleteInvoice = useSelector((state) => state.deleteInvoice);
    const { success: successDelete, message: successDeleteMessage } =
        deleteInvoice;


    const newEntry = (invoice, handleResetForm) => {
        dispatch(createInvoiceAction(invoice));
        // if (successCreate) {
        //     handleResetForm()
        // setOpenModal(false);
        // }
    };
    console.log(error);

    useEffect(() => {
        dispatch(readInvoicesAction(status, month, year, property));
        dispatch(readInvoicesSummaryAction(month, year, property));
    }, [
        dispatch,
        successDelete,
        successCreate,
        successUpdate,
        status,
        month,
        year,
        property,
    ]);

    return (
        <>  
            <TableTop>
                <InvoiceButton
                    primary
                    onClick={() => setIsOpened(!isOpened)}
                >
                    <FiFilter />
                    filter: {status && <p>{status}</p>}{" "}
                    {month && <p>{toMonthName(month)}</p>}{" "}
                    {year && <p>{year}</p>} {property?.name}
                </InvoiceButton> 
            </TableTop>
             
            
            <InvoiceTable
                invoices={invoices}
                count={count}
                error={error}
                loading={loading}
            />
            
            <LeftSidebar
                tall
                heading="Invoice Summary"
                isOpened={isOpened}
                setIsOpened={setIsOpened}
            >
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
            </LeftSidebar>
        </>
    );
};

export default InvoiceList;
