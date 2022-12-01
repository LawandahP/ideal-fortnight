import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import { FiUsers } from "react-icons/fi";

import { commafy, TabTitle, toTitleCase } from "../../utils/globalFunc";
import {
    createPaymentAction,
    paymentDeleteAction,
    // deletePaymentAction,
    updatePaymentAction,
} from "./actions";

// import PaymentForm from "./form";
// import PaymentEditForm from "./editform";

import Controls from "../../components/controls/Controls";
import ToastAlert from "../../components/display/ToastAlert";
import Loading from "../../components/display/Loader";
import { TableComponent } from "../../components/useTable/index";
import { Chip, TableTop } from "../../components/useTable/elements";
import { ActionButtonWrapper } from "../../components/controls/Button";
import ConfirmDialog from "../../components/display/dialog";
import Modal from "../../components/display/modal";
import {
    NgLink,
    NgPageContainer,
    NgPaper,
} from "../../components/display/elements";
import NotFound from "../../components/display/notFound";
import {
    ProfileContainer,
    ProfileInfoWrapper,
    UserName,
    UserRole,
} from "../../components/navbar/navbarElements";
import { Avatar } from "@mui/material";
import CustomAvatar from "../../components/display/CustomAvatar";
import ManualPaymentForm from "./manualPaymentForm";
import { FcMoneyTransfer } from "react-icons/fc";
import moment from "moment";
import DataTable from "../../components/useTable/dataTable";
import PaymentEditForm from "./editForm";
import { FaRegMoneyBillAlt } from "react-icons/fa";



function PaymentListScreen({ loading, error, payments, count }) {
    TabTitle("Payments");

    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState({
        open: false,
        title: "",
        subTitle: "",
    });

    const [search, setSearch] = useState({
        fn: (items) => {
            return items;
        },
    });
    const [recordForEdit, setRecordForEdit] = useState(null);


    const newEntry = (payment, handleResetForm) => {
        dispatch(createPaymentAction(payment));
    };

    const editEntry = (payment, handleResetForm) => {
        dispatch(updatePaymentAction(payment));
        // setOpenPopup(false);
        // handleResetForm()
    };

    const editHandler = (payment) => {
        setRecordForEdit(payment);
        setOpenPopup(true);
    };

    const deleteHandler = (id) => {
        setConfirmDialog({
            ...confirmDialog,
            open: false,
        });
        dispatch(paymentDeleteAction(id));
    };

    const columns = [
        { 
            field: 'invoice', 
            headerName: 'Invoice', 
            minWidth: 70, 
            // flex: 1,
            renderCell: params => <NgLink to={`/invoice/${params?.value}`}>{params?.value}</NgLink>,
        },
        {
            field: 'amount_paid',
            headerName: 'Paid',
            minWidth: 100,
            flex: 1,
            type: 'number'
        },
    
        {
            field: 'paid_by',
            headerName: 'Paid By',
            minWidth: 150,
            flex: 1,
            valueGetter: params => {
                return params?.value?.full_name
            },
            renderCell: params => params?.value?.full_name
    
        },
        {
            field: 'submission_date',
            headerName: 'Paid On',
            minWidth: 70,
            flex: 1,
            type: 'date',
            valueFormatter: params => {
            // first converts to JS Date, then to locale option through date-fns
                return moment(params.value).format('MM-DD-YY')
            },
            // valueGetter for filtering
            valueGetter: params => {
                return moment(params.value).format('MM-DD-YY')
            },
            renderCell: params => moment(params?.value).format('l')
        },
        {
            field: 'created_at',
            headerName: 'Submitted On',
            minWidth: 250,
            flex: 1,
            type: 'date',
            valueFormatter: params => {
            // first converts to JS Date, then to locale option through date-fns
                return moment(params?.value).format('LLLL')
            },
            // valueGetter for filtering
            valueGetter: params => {
                return moment(params?.value).format('LLLL')
            },
            renderCell: params => moment(params?.value).format('LLLL')
        },
        {
            field: 'payment_method',
            headerName: 'Payment Method',
            minWidth: 120,
            flex: 1,
        },
        {
            field: 'is_confirmed',
            headerName: 'Confirmed',
            minWidth: 70,
            flex: 1,
            type: 'boolean'
    
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
                                    title: "Are you sure you want to delete this Maintenance?",
                                    subTitle:"You can't undo this operation",
                                    onConfirm:() => {deleteHandler(params?.row?.id);},
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
            {error ? <ToastAlert severity="error">{error} </ToastAlert> :
            <>
                <TableTop>
                    <Controls.AddButton
                        onClick={() => setOpenModal(true)}
                    ></Controls.AddButton>
                </TableTop>

                      
                <NgPaper>   
                    {loading ? <Loading /> : count > 0 ? 
                        <>
                            <DataTable 
                                rows={payments} 
                                columns={columns}
                                loading={!count}
                            />
                        </>
                    : 
                        <NotFound text="No Payments Found">
                            <FcMoneyTransfer />
                        </NotFound>
                    }
                </NgPaper>
            </>
            }

            {/* <Modal
                openModal={openModal}
                setOpenModal={setOpenModal}
                title="Create Payment"
            >
                <ManualPaymentForm newEntry={newEntry} />
            </Modal> */}

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

            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </NgPageContainer>
    );
}

export default PaymentListScreen;




{/* <TblContainer>
    <TblHead />

    <TableBody>
        {recordsAfterPagingAndSorting()?.map(
            (payment) => (
                <TableRow key={payment.id}>
                    <TableCell>
                        <NgLink to={`/invoice/${payment?.invoice}`}>{payment?.invoice}</NgLink>
                    </TableCell>
                    <TableCell>
                        {commafy(
                            Number(
                                payment?.amount_paid
                            )
                        )}
                    </TableCell>
                    <TableCell>{moment(payment?.submission_date).format("ll")}</TableCell>
                    <TableCell>{payment?.payment_method}</TableCell>
                    
                    <TableCell>
                        <ActionButtonWrapper>
                            <Controls.ActionButton
                                title="edit"
                                onClick={() =>
                                    editHandler(
                                        payment
                                    )
                                }
                                edit
                            >
                                <MdModeEditOutline />
                            </Controls.ActionButton>
                        </ActionButtonWrapper>
                    </TableCell>
                </TableRow>
            )
        )}
    </TableBody>
</TblContainer> */}