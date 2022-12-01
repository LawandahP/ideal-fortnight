import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import "./invoice.css";
// import { commafy } from "../../utils/globalFunc";

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
import { deleteBillAction, updateBillAction } from "../bills/actions";
import BillEditForm from "../bills/editForm";
import Modal from "../../components/display/modal";
import NotFound from "../../components/display/notFound";
import { commafy } from "../../utils/globalFunc";
import ToastAlert from "../../components/display/ToastAlert";

function InvoiceBills({ invoice }) {
    const dispatch = useDispatch();

    const [recordForEdit, setRecordForEdit] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);

    const [confirmDialog, setConfirmDialog] = useState({
        open: false,
        title: "",
        subTitle: "",
    });

    const editHandler = (bill) => {
        setRecordForEdit(bill);
        setOpenPopup(true);
    };

    const editEntry = (bill, handleResetForm) => {
        dispatch(updateBillAction(bill));
        // setOpenPopup(false);
        // handleResetForm()
    };

    const deleteHandler = (id) => {
        setConfirmDialog({
            ...confirmDialog,
            open: false,
        });
        dispatch(deleteBillAction(id));
    };

    return (
        // <>
        //     <main>
        //         <table>
        //             <thead>
        //                 <tr>
        //                     <th class="service">Title</th>
        //                     <th class="desc">Description</th>
        //                     <th>Qty</th>
        //                     <th>Unit Price</th>
        //                     <th>Total</th>
        //                 </tr>
        //             </thead>
        //             {invoice?.bills?.length > 0 ? 
        //                 <tbody>
        //                     {invoice.bills.map((bill) => (
        //                         <tr>
        //                             <td class="service">{bill?.item}</td>
        //                             <td class="desc">{bill?.description}</td>
        //                             <td class="qty">{bill?.quantity}</td>
        //                             <td class="unit">{bill?.rate}</td>
        //                             <td class="total">{bill?.amount}</td>
        //                         </tr>
        //                     ))}
                            
        //                     <tr>
        //                         <td colspan="4">SUBTOTAL</td>
        //                         <td class="total">{invoice.total_amount}</td>
        //                     </tr>
        //                     <tr>
        //                         <td colspan="4">PAID</td>
        //                         <td class="total">{invoice.amount_paid}</td>
        //                     </tr>

        //                     <tr>
        //                         <td colspan="4" class="grand total">BALANCE</td>
        //                         <td class="grand total">{invoice.balance}</td>
        //                     </tr>
                         
        //                     <tr>
        //                         <td colspan="4" class="grand total">TOTAL</td>
        //                         <td class="grand total">{invoice.total_amount}</td>
        //                     </tr>
        //                 </tbody>
        //                 : (
        //                     <NotFound text="No Bills found">
        //                         <MdOutlineMoneyOff />
        //                     </NotFound>
        //                 )}
        //         </table>
        //         <div id="notices">
        //             <div>NOTICE:</div>
        //             <div class="notice">A finance charge of 1.5% will be made on unpaid balances after 30 days.</div>
        //         </div>
        //     </main>
        <>
            <InvoiceTableContainer>
                <Table>
                    <thead>
                        <tr>
                            <Th className="data-label">Item</Th>
                            <Th>Description</Th>
                            <Th>Quantity</Th>
                            <Th>Rate</Th>
                            <Th>Amount</Th>
                            <Th></Th>
                        </tr>
                    </thead>

                    {invoice?.bills?.length > 0 ? (
                        <tbody>
                            {invoice?.bills?.map((bill) => (
                                <tr key={bill?.id}>
                                    <Td className="title">{bill?.item}</Td>
                                    <Td className="desc">{bill?.description}</Td>
                                    <Td className="qty">{bill?.quantity}</Td>
                                    <Td className="unit">{commafy(Number(bill?.rate))}</Td>
                                    <Td className="total">{commafy(Number(bill?.amount))}</Td>
                                    <Td>
                                        <ActionButtonWrapper>
                                            <Controls.ActionButton
                                                title="edit"
                                                onClick={() => editHandler(bill)}
                                                edit
                                            >
                                                <MdModeEditOutline />
                                            </Controls.ActionButton>

                                            <Controls.ActionButton
                                                title="delete"
                                                onClick={() => {
                                                    setConfirmDialog({
                                                        open: true,
                                                        title: `Are you sure you want to delete this Invoice Bill ${bill.id}?`,
                                                        subTitle:
                                                            "You can't undo this operation",
                                                        onConfirm: () => {
                                                            deleteHandler(
                                                                bill?.id
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

                        
                        <tr className="total">
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                        </tr>

                        <tr className="total">
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                        </tr>

                        <tr className="total">
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td info>SubTotal: </Td>
                            <Td info>{commafy(Number(invoice?.total_amount))}</Td>
                        </tr>
                        <tr className="total">
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td info>Paid: </Td>
                            <Td info paid>{commafy(Number(invoice?.amount_paid))}</Td>
                        </tr>
                        <tr>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td info>Balance: </Td>
                            <Td balance info>{commafy(Number(invoice?.balance))}</Td>
                        </tr>     
                    
                        </tbody>
                    ) : (
                        <ToastAlert severity="info">No Bills Found</ToastAlert>
                    )}
                </Table>
            </InvoiceTableContainer>

            {/* Modals and Popups */}

            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />

            <Modal
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Edit Bill"
            >
                <BillEditForm
                    recordForEdit={recordForEdit}
                    editEntry={editEntry}
                />
            </Modal>
        </>
    );
}

export default InvoiceBills;
