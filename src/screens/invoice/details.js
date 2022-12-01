import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";

import {
    deleteInvoiceAction,
    getPdf,
    invoiceDetailsAction,
    updateInvoiceAction,
} from "./actions";
import {
    IconButton,
    InvoiceActionContainer,
    InvoiceActionWrapper,
    InvoiceButton,
    InvoiceDetailStatus,
    InvoiceHeader,
} from "./elements";

import { NgDivider } from "../../components/sidebar/sidebarElements";

import { NgPageContainer } from "../../components/display/elements";
import ConfirmDialog from "../../components/display/dialog";

import Modal from "../../components/display/modal";
import BillEditForm from "../bills/editForm";
import { createBillAction, updateBillAction } from "../bills/actions";
import InvoiceBills from "./invoice_bills";

import ToastAlert from "../../components/display/ToastAlert";
import BillForm from "../bills/form";
import LeftSidebar from "../../components/display/leftSidebar";
import {
    DetailsWrapper,
    FlexWrapper,
    Icon,
    IconText,
    InfoWrapper,
    ProfilePicture,
    Status,
    UserCard,
    UserInfoWrapper,
    UserName,
} from "../user.elements";
import {
    RiCommunityLine,
    RiHome4Line,
    RiMailSendLine,
    RiPhoneLine,
} from "react-icons/ri";
import { FcButtingIn } from "react-icons/fc";
import {
    MdAccessTime,
    MdEvent,
    MdOutlineAttachEmail,
    MdPersonOutline,
} from "react-icons/md";
import ManualPaymentForm from "../payments/manualPaymentForm";
import { Avatar } from "@mui/material";
import InvoiceEditForm from "./form";
import InvoicePayments from "./invoice_payments";
import { FiPrinter } from "react-icons/fi";
import { send_email_reminder } from "../notifications/email_reminders";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { TabTitle } from "../../utils/globalFunc";

const InvoiceDetails = () => {
    const match = { params: useParams() };
    const dispatch = useDispatch();

    const [ pdfLoading, setPdfLoading ] = useState(false)
    const [ reminderLoading, setReminderLoading ] = useState(false)

    const [isOpened, setIsOpened] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const [confirmDialog, setConfirmDialog] = useState({
        is_open: false,
        title: "",
        subTitle: "",
    });

    const readInvoiceDetails = useSelector((state) => state.readInvoiceDetails);
    const { loading, error, invoice, property, unit } = readInvoiceDetails;

    const updateInvoice = useSelector((state) => state.updateInvoice);
    const {
        success: successUpdate,
        message: successUpdateMessage,
        loading: loadingUpdate,
    } = updateInvoice;

    const createBill = useSelector((state) => state.createBill);
    const { success: successBillCreate } = createBill;

    const updateBill = useSelector((state) => state.updateBill);
    const { success: successBillUpdate } = updateBill;

    const deleteBill = useSelector((state) => state.deleteBill);
    const { success: successBillDelete } = deleteBill;

    const createPayment = useSelector((state) => state.createPayment);
    const { success } = createPayment;

    const updatePayment = useSelector(state => state.updatePayment)
    const { success: successPaymentUpdate } = updatePayment

    const deletePayment = useSelector((state) => state.deletePayment);
    const { success: successPaymentDelete } = deletePayment;

    const editHandler = (invoice) => {
        setRecordForEdit(invoice);
        setOpenPopup(true);
    };

    const editEntry = (invoice, handleResetForm) => {
        dispatch(updateInvoiceAction(invoice));
        // setOpenPopup(false);
        // handleResetForm()
    };

    const addBillEntry = (bill, handleResetForm) => {
        dispatch(createBillAction(bill));
    };

    const deleteHandler = (id) => {
        setConfirmDialog({
            ...confirmDialog,
            open: false,
        });
        dispatch(deleteInvoiceAction(id));
    };

    useEffect(() => {
        dispatch(invoiceDetailsAction(match.params.id));
    }, [
        dispatch,
        success,
        successUpdate,
        successBillCreate,
        successBillUpdate,
        successBillDelete,
        successPaymentUpdate,
        successPaymentDelete

    ]);

    TabTitle(`Invoice ${invoice?.invoice_id}`)

    return (
        <NgPageContainer>
            {error ? (
                <ToastAlert severity="error">{error}</ToastAlert>
            ) : (
                <>
                    <InvoiceHeader
                        overdue={invoice?.status === "Overdue"}
                        fully_paid={invoice?.status === "Fully Paid"}
                        partially_paid={invoice?.status === "Partially Paid"}
                        open={invoice?.status === "Open"}
                    >
                        <UserInfoWrapper>
                            <Avatar
                                src={
                                    invoice?.tenant?.profile?.profile_pic
                                        ?.file_url
                                }
                                variant="rounded"
                                sx={{
                                    width: "120px",
                                    height: "120px",
                                    marginRight: "20px",
                                }}
                            />
                            <DetailsWrapper>
                                <UserName>
                                    INVOICE {invoice?.invoice_id}
                                </UserName>
                                {/* {invoice?.is_active === true ? <Status active>active</Status> : <Status>dormant</Status>} */}
                                <FlexWrapper>
                                    <Icon>
                                        <MdPersonOutline />
                                    </Icon>
                                    <IconText>
                                        {invoice?.tenant?.full_name}
                                    </IconText>
                                </FlexWrapper>

                                <FlexWrapper>
                                    <Icon>
                                        <RiCommunityLine />
                                    </Icon>
                                    <IconText>{property?.name}</IconText>
                                </FlexWrapper>
                            </DetailsWrapper>
                        </UserInfoWrapper>

                        <InfoWrapper>
                            <FlexWrapper>
                                <Icon>
                                    <RiHome4Line />
                                </Icon>
                                <IconText>{unit?.unit_no}</IconText>
                            </FlexWrapper>
                            <FlexWrapper>
                                <Icon>
                                    <RiPhoneLine />
                                </Icon>
                                <IconText>
                                    {invoice?.tenant?.phone_number}
                                </IconText>
                            </FlexWrapper>
                            <FlexWrapper>
                                <Icon>
                                    <RiMailSendLine />
                                </Icon>
                                <IconText>{invoice?.tenant?.email}</IconText>
                                {/* <a href={`mailto:${tenant?.email}`}>{tenant?.email}</a> */}
                            </FlexWrapper>
                        </InfoWrapper>

                        <InfoWrapper>
                            <FlexWrapper>
                                <Icon>
                                    <MdAccessTime />
                                </Icon>
                                <IconText>
                                    Created on{" "}
                                    {moment(invoice?.created_at).format("LLLL")}
                                </IconText>
                            </FlexWrapper>
                            <FlexWrapper>
                                <Icon>
                                    <MdEvent />
                                </Icon>
                                <IconText>
                                    {" "}
                                    Due on{" "}
                                    {moment(invoice?.due_on).format("LL")}
                                </IconText>
                            </FlexWrapper>
                        </InfoWrapper>

                        <InvoiceDetailStatus
                            overdue={invoice?.status === "Overdue"}
                            fully_paid={invoice?.status === "Fully Paid"}
                            partially_paid={
                                invoice?.status === "Partially Paid"
                            }
                            open={invoice?.status === "Open"}
                        >
                            {invoice?.status}
                        </InvoiceDetailStatus>
                    </InvoiceHeader>

                    <InvoiceActionContainer>
                        <InvoiceActionWrapper>
                            <InvoiceButton
                                primary
                                onClick={() => getPdf(invoice?.invoice_id, setPdfLoading)}
                            >
                                {pdfLoading ? "Downloading..." : "Download Invoice"}
                                <IconButton>
                                    <FiPrinter />
                                </IconButton>
                            </InvoiceButton>
                            <InvoiceButton
                                warning
                                onClick={() =>
                                    send_email_reminder(invoice?.invoice_id, setReminderLoading)
                                }
                            >
                                {reminderLoading ? "Sending email..." : "Remind" }
                                <IconButton>
                                    <MdOutlineAttachEmail />
                                </IconButton>
                            </InvoiceButton>
                            <InvoiceButton
                                info
                                onClick={() => setIsOpened(!isOpened)}
                            >
                                Record Payment
                            </InvoiceButton>
                        </InvoiceActionWrapper>

                        <InvoiceActionWrapper>
                            <InvoiceButton
                                info_outline
                                onClick={() => setOpenModal(true)}
                            >
                                Add Bill
                            </InvoiceButton>
                            <InvoiceButton
                                info
                                onClick={() => editHandler(invoice)}
                            >
                                Edit Invoice
                            </InvoiceButton>
                            <InvoiceButton
                                danger
                                onClick={() => {
                                    setConfirmDialog({
                                        open: true,
                                        title: `Are you sure you want to delete Invoice ${invoice?.invoice_id}?`,
                                        subTitle:
                                            "You can't undo this operation",
                                        onConfirm: () => {
                                            deleteHandler(invoice?.invoice_id);
                                        },
                                    });
                                }}
                            >
                                Delete
                            </InvoiceButton>
                        </InvoiceActionWrapper>
                    </InvoiceActionContainer>

                    <NgDivider />

                    {/* Bills and Payments*/}

                    <InvoiceBills invoice={invoice} />
                    <InvoicePayments invoice={invoice} />

                    {/* Modals and Popups */}

                    <ConfirmDialog
                        confirmDialog={confirmDialog}
                        setConfirmDialog={setConfirmDialog}
                    />

                    <Modal
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                        title="Edit Invoice"
                        icon={<FaRegMoneyBillAlt />}
                    >
                        <InvoiceEditForm
                            recordForEdit={recordForEdit}
                            editEntry={editEntry}
                        />
                    </Modal>

                    <Modal
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        title="Add Bill"
                        icon={<FaRegMoneyBillAlt />}
                    >
                        <BillForm
                            invoice={invoice.invoice_id}
                            recordForEdit={recordForEdit}
                            newEntry={addBillEntry}
                        />
                    </Modal>

                    <LeftSidebar
                        large
                        heading={`Record Payment for invoice ${invoice?.invoice_id}`}
                        isOpened={isOpened}
                        setIsOpened={setIsOpened}
                    >
                        <ManualPaymentForm invoice={invoice} />
                    </LeftSidebar>

                </>
            )}
        </NgPageContainer>
    );
};

export default InvoiceDetails;
