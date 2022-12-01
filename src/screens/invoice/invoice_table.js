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

import { Button, TableBody, TableCell, TableRow } from "@mui/material";

import {
    MdDeleteOutline,
    MdModeEditOutline,
    MdOutlinePictureAsPdf,
} from "react-icons/md";

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
    getPdf,
    readInvoicesAction,
    readInvoicesSummaryAction,
    updateInvoiceAction,
} from "./actions";
import { ActionButtonWrapper } from "../../components/controls/Button";
import { TableTop } from "../../components/useTable/elements";
import ConfirmDialog from "../../components/display/dialog";
import InvoiceEditForm from "./form";
import Modal from "../../components/display/modal";
import moment from "moment";

import NotFound from "../../components/display/notFound";
import { FiFileText, FiFilter } from "react-icons/fi";
import { InvoiceButton, InvoiceContainer, InvoiceStatus } from "./elements";
import { InvoiceSummary } from "./summary";
import LeftSidebar from "../../components/display/leftSidebar";
import { Hide } from "../user.elements";
import DataTable from "../../components/useTable/dataTable";

import { FaFileInvoiceDollar } from "react-icons/fa";



const InvoiceTable = ({ invoices, loading, error, count, hide }) => {
    TabTitle("Invoices");

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

    const updateInvoice = useSelector((state) => state.updateInvoice);
    const {
        success: successUpdate,
        message: successUpdateMessage,
        loading: loadingUpdate,
    } = updateInvoice;

    const deleteInvoice = useSelector((state) => state.deleteInvoice);
    const { success: successDelete, message: successDeleteMessage } = deleteInvoice;

    const [openModal, setOpenModal] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);

    const [recordForEdit, setRecordForEdit] = useState(null);

    const [confirmDialog, setConfirmDialog] = useState({
        open: false,
        title: "",
        subTitle: "",
    });

 
    const newEntry = (invoice, handleResetForm) => {
        dispatch(createInvoiceAction(invoice));
        // if (successCreate) {
        //     handleResetForm()
        // setOpenModal(false);
        // }
    };

    const editEntry = (invoice, handleResetForm) => {
        dispatch(updateInvoiceAction(invoice));
        // setOpenPopup(false);
        // handleResetForm()
    };

    const editHandler = (invoice) => {
        setRecordForEdit(invoice);
        setOpenPopup(true);
    };

    const deleteHandler = (id) => {
        setConfirmDialog({
            ...confirmDialog,
            open: false,
        });
        dispatch(deleteInvoiceAction(id));
    };
    
    
    
    const columns = [
        { 
            field: 'invoice_id', 
            headerName: 'Invoice ID', 
            minWidth: 100, 
            flex: 1,
            renderCell: params => 
                <NgLink
                    to={`/invoice/${params.value}`}
                >
                    {params?.value}
                </NgLink>
        },

        {
            field: 'due_on',
            headerName: 'Due On',
            minWidth: 250,
            type: 'date',
            valueFormatter: params => {
            // first converts to JS Date, then to locale option through date-fns
                return moment(params.value).format('MM-DD-YY')
            },
            // valueGetter for filtering
            valueGetter: params => {
                return moment(params.value).format('MM-DD-YY')
            },
            renderCell: params => moment(params?.value).format('LL')
        },
        {
            field: 'paid_on',
            headerName: 'Paid On',
            minWidth: 250,
            type: 'date',
            valueFormatter: params => {
            // first converts to JS Date, then to locale option through date-fns
                return params?.value && moment(params.value).format('MM-DD-YY')
            },
            // valueGetter for filtering
            valueGetter: params => {
                return params?.value && moment(params.value).format('MM-DD-YY')
            },
            renderCell: params => params?.value ? moment(params?.value).format('LLLL') : "-"
        },

        { 
            field: 'status', 
            headerName: 'Status', 
            minWidth: 150, 
            flex: 1,
            renderCell: 
                params =>  
                <InvoiceStatus
                    overdue={params?.value === "Overdue"}
                    fully_paid={params?.value === "Fully Paid"}
                    partially_paid={params?.value === "Partially Paid"}
                    open={params?.value === "Open"}
                >
                    {params?.value}
                </InvoiceStatus>
        },
        
        {
            field: 'tenant',
            headerName: 'Tenant',
            minWidth: 200,
            flex: 1,
            renderCell: params => params?.row?.tenant?.full_name,
            
            valueFormatter: params => {
                return params?.value
            },
            valueGetter: params => {
                return params?.value?.full_name
            },
        },

        {
            field: 'total_amount',
            headerName: 'Amount',
            minWidth: 100,
            flex: 1,
            type: 'number'
        },

        {
            field: 'amount_paid',
            headerName: 'Paid',
            minWidth: 100,
            flex: 1,
            type: 'number'
        },

        {
            field: 'balance',
            headerName: 'Balance',
            minWidth: 100,
            flex: 1,
            type: 'number'
        },
        
        
        {
            field: 'action',
            headerName: 'Action',
            minWidth: 100,
            flex: 1,
            filterable: false,
            sortable: false,
            renderCell: 
                params => 
                <ActionButtonWrapper>
                    <Controls.ActionButton
                        title="edit"
                        onClick={() => editHandler(params?.row)}
                        edit
                    >
                        <MdModeEditOutline />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                        title="delete"
                        onClick={() => {setConfirmDialog({
                                    open: true,
                                    title: "Are you sure you want to delete this Lease?",
                                    subTitle:"You can't undo this operation",
                                    onConfirm:() => {deleteHandler(params?.row?.invoice_id);},
                                }
                            );
                        }}
                    >
                        <MdDeleteOutline />
                    </Controls.ActionButton>
                </ActionButtonWrapper>
        },
    ];

    return (
        <NgPageContainer>
            {error ? (
                <ToastAlert severity="error">{error}</ToastAlert>
            ) : (
                <>
                    <NgPaper>
                        {loading ? (
                            <Loader />
                        ) : count > 0 ? (
                            <div>
                                <DataTable 
                                    rows={invoices} 
                                    columns={columns}
                                    loading={!count}
                                />
                               
                            </div>
                        ) : (
                            <>
                                <NotFound text="No Invoices found">
                                    <FiFileText />
                                </NotFound>
                            </>
                        )}
                    </NgPaper>
                </>
            )}

            {/* <LeftSidebar
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
            </LeftSidebar> */}

            <Modal
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Update Invoice"
                icon={<FaFileInvoiceDollar />}
            >
                <InvoiceEditForm
                    recordForEdit={recordForEdit}
                    editEntry={editEntry}
                />
            </Modal>

            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </NgPageContainer>
    );
};

export default InvoiceTable;
