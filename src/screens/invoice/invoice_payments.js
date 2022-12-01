import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { commafy } from "../../utils/globalFunc";

import {
    MdDeleteOutline,
    MdModeEditOutline,
    MdOutlineMoneyOff,
    MdOutlineMoneyOffCsred,
} from "react-icons/md";

import ConfirmDialog from "../../components/display/dialog";
import { ActionButtonWrapper } from "../../components/controls/Button";
import Controls from "../../components/controls/Controls";

import { InvoiceTableContainer, Table, Td, Th } from "./elements";
// import { deleteBillAction, updateBillAction } from "../payments/actions";
// import BillEditForm from "../payments/editForm";
import Modal from "../../components/display/modal";
import NotFound from "../../components/display/notFound";
import moment from "moment";
import ToastAlert from "../../components/display/ToastAlert";
import { paymentDeleteAction, updatePaymentAction } from "../payments/actions";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import PaymentEditForm from "../payments/editForm";

function InvoicePayments({ invoice }) {
    const dispatch = useDispatch();
    const noPaymentsMessage = "No Payments Received"

    const [recordForEdit, setRecordForEdit] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);

    const [confirmDialog, setConfirmDialog] = useState({
        open: false,
        title: "",
        subTitle: "",
    });

    const editHandler = (payment) => {
        setRecordForEdit(payment);
        setOpenPopup(true);
    };

    const editEntry = (payment, handleResetForm) => {
        dispatch(updatePaymentAction(payment));
        // setOpenPopup(false);
        // handleResetForm()
    };



    const deleteHandler = (id) => {
        setConfirmDialog({
            ...confirmDialog,
            open: false,
        });
        dispatch(paymentDeleteAction(id));
    };

    return (
        <>
            <InvoiceTableContainer>
                <h5>Payments Received</h5>
                {invoice?.invoice_payments?.length > 0 ?
                <Table>
                    <thead>
                        <tr>
                            <Th className="data-label">Paid by</Th>
                            <Th>Submitted On</Th>
                            <Th>Deposited On</Th>
                            <Th>Method</Th>
                            <Th>Amount</Th>
                            <Th></Th>
                        </tr>
                    </thead>

                     
                        <tbody>
                            {invoice?.invoice_payments?.map((payment) => (
                                <tr key={payment?.id}>
                                    <Td>{payment?.paid_by?.full_name}</Td>
                                    <Td>{moment(payment?.submission_date).format('ll')}</Td>
                                    <Td>{moment(payment?.submission_date).format('ll')}</Td>
                                    <Td>{payment?.payment_method}</Td>
                                    <Td>{commafy(Number(payment?.amount_paid))}</Td>
                                    <Td>
                                        <ActionButtonWrapper>
                                            <Controls.ActionButton
                                                title="edit"
                                                onClick={() =>
                                                    editHandler(payment)
                                                }
                                                edit
                                            >
                                                <MdModeEditOutline />
                                            </Controls.ActionButton>

                                            <Controls.ActionButton
                                                title="delete"
                                                onClick={() => {
                                                    setConfirmDialog({
                                                        open: true,
                                                        title: `Are you sure you want to delete this Payment?`,
                                                        subTitle:
                                                            "You can't undo this operation",
                                                        onConfirm: () => {
                                                            deleteHandler(
                                                                payment?.id
                                                            );
                                                        },
                                                    });
                                                }}
                                            >
                                                <MdDeleteOutline />
                                            </Controls.ActionButton>
                                        </ActionButtonWrapper>
                                    </Td>
                                </tr>
                            ))}                                  
                                                     
                        </tbody>
                    </Table> 
                    : 
                    <ToastAlert severity="info">
                        {noPaymentsMessage}
                    </ToastAlert>
                }   
            </InvoiceTableContainer>

            {/* Modals and Popups */}

            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />

            <Modal
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Edit Payment"
                icon={<FaRegMoneyBillAlt />}
            >
                <PaymentEditForm
                    recordForEdit={recordForEdit}
                    editEntry={editEntry}
                />
            </Modal>
            {/* <Modal
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Edit Bill"
            >
                <BillEditForm
                    recordForEdit={recordForEdit}
                    editEntry={editEntry}
                />
            </Modal> */}
        </>
    );
}

export default InvoicePayments;
