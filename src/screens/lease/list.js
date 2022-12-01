import React, { useState, useEffect } from "react";
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
import { TableBody, TableCell, TableRow } from "@mui/material";

import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";

import { TabTitle, toTitleCase } from "../../utils/globalFunc";
import {
    createLeaseAction,
    deleteLeaseAction,
    readLeasesAction,
    updateLeaseAction,
} from "./actions";
import { ActionButtonWrapper } from "../../components/controls/Button";
import { TableTop } from "../../components/useTable/elements";
import ConfirmDialog from "../../components/display/dialog";
import LeaseForm from "./form";
import Modal from "../../components/display/modal";
import moment from "moment";

import NotFound from "../../components/display/notFound";
import { FiFileText } from "react-icons/fi";
import { LeaseStatus } from "./elements";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import DataTable from "../../components/useTable/dataTable";

import { FaFileSignature } from 'react-icons/fa';



const LeaseList = ({ loading, error, leases, count }) => {
    TabTitle("Leases");
    const dispatch = useDispatch();

    const createLease = useSelector((state) => state.createLease);
    const { success: successCreate, message } = createLease;

    // const readLease = useSelector((state) => state.readLease);
    // const { loading, error, leases, count } = readLease;

    const deleteLease = useSelector((state) => state.deleteLease);
    const { success: successDelete, message: successDeleteMessage } =
        deleteLease;

    const [search, setSearch] = useState({
        fn: (items) => {
            return items;
        },
    });

    const [openModal, setOpenModal] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);

    const [confirmDialog, setConfirmDialog] = useState({
        open: false,
        title: "",
        subTitle: "",
    });

    const newEntry = (lease, handleResetForm) => {
        dispatch(createLeaseAction(lease));
        if (successCreate) return setOpenModal(false);
    };

    const editEntry = (lease, handleResetForm) => {
        dispatch(updateLeaseAction(lease));
        // setOpenPopup(false);
        // handleResetForm()
    };

    const editHandler = (lease) => {
        setRecordForEdit(lease);
        setOpenPopup(true);
    };

    const deleteHandler = (id) => {
        setConfirmDialog({
            ...confirmDialog,
            open: false,
        });
        dispatch(deleteLeaseAction(id));
    };

    useEffect(() => {
        dispatch(readLeasesAction());
    }, [dispatch, successDelete, successCreate]);

    const columns = [
        { 
            field: 'status', 
            headerName: 'Status', 
            minWidth: 100, 
            flex: 1,
            renderCell: 
                params =>  
                <LeaseStatus 
                    Open={params?.value === "Open"}
                    Active={params?.value === "Active"}
                    Expired={params?.value === "Expired"}
                >
                    {params?.value}
                </LeaseStatus>
        },
        {
            field: 'property',
            headerName: 'Property',
            minWidth: 200,
            flex: 1,
            renderCell: params => params?.row?.property?.name,
            valueFormatter: params => {
                return params.value
            },
            valueGetter: params => {
                return params?.value?.name
            },
        },
        {
            field: 'tenant',
            headerName: 'Tenant',
            minWidth: 250,
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
            field: 'lease_start',
            headerName: 'Start',
            minWidth: 100,
            type: 'date',
            valueFormatter: params => {
            // first converts to JS Date, then to locale option through date-fns
                return moment(params.value).format('MM-DD-YY')
            },
            // valueGetter for filtering
            valueGetter: params => {
                return moment(params.value).format('MM-DD-YY')
            },
            renderCell: params => moment(params?.row?.lease_start).format('ll')
        },
        {
            field: 'lease_end',
            headerName: 'End',
            minWidth: 100,
            type: 'date',
            valueFormatter: params => {
            // first converts to JS Date, then to locale option through date-fns
                return moment(params.value).format('MM-DD-YY')
            },
            // valueGetter for filtering
            valueGetter: params => {
                return moment(params.value).format('MM-DD-YY')
            },
            renderCell: params => moment(params?.row?.lease_end).format('ll')
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
                                    onConfirm:() => {deleteHandler(params?.row?._id);},
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
        <>
            <TableTop>
                {/* <Link to="/lease/add">
                    <Controls.AddButton></Controls.AddButton>
                </Link> */}
                <Controls.AddButton
                    onClick = {() => setOpenModal(true)}
                    >
                </Controls.AddButton>  
            </TableTop>

            <NgPaper>
                {/* {successCreate && toast.success(`${message}`)}  
                {successDelete && toast.error(`${successDeleteMessage}`)} */}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <ToastAlert severity="error">{error}</ToastAlert>
                ) : count > 0 ? (
                    <div>
                        <DataTable 
                            rows={leases} 
                            columns={columns}
                            loading={!count}
                        />
                    </div>
                ) : (
                    <>
                        <NotFound text="No Leases found">
                            <FiFileText />
                        </NotFound>
                    </>
                )}
            </NgPaper>

            <Modal
                fullScreen
                openModal={openModal}
                setOpenModal={setOpenModal}
                title="Create Lease"
                icon={<FaFileSignature />}

            >
                <LeaseForm newEntry={newEntry} />
            </Modal>

            {/* <Modal
                openPopup = {openPopup}
                setOpenPopup = {setOpenPopup}
                title="Update Lease Status"
            >
                <LeaseEditForm
                    recordForEdit = {recordForEdit}
                    editEntry = {editEntry}
                />
            </Modal>  */}

            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    );
};

export default LeaseList;
