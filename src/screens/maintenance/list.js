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
    createAdminMaintenanceRequestAction,
    createMaintenanceRequestAction,
    deleteMaintenanceAction,
    readMaintenancesAction,
    updateMaintenanceAction,
} from "./actions";
import { ActionButtonWrapper } from "../../components/controls/Button";
import { TableTop } from "../../components/useTable/elements";
import ConfirmDialog from "../../components/display/dialog";
import MaintenanceEditForm from "./editForm";
import Modal from "../../components/display/modal";

import NotFound from "../../components/display/notFound";

import { FcServices } from "react-icons/fc";
import MaintenanceAdminRequestForm from "./form";
import PaperHeader from "../../components/display/paperHeader";
import { FaSimplybuilt } from "react-icons/fa";
import moment from "moment";
import { InvoiceStatus } from "../invoice/elements";
import DataTable from "../../components/useTable/dataTable";
import { FiSettings } from "react-icons/fi";

import { IoIosBuild } from "react-icons/io";

const headCells = [
    { id: "requested_by", label: "Requested By", minWidth: 170 },
    { id: "category", label: "Category", minWidth: 100 },
    { id: "description", label: "Description", minWidth: 270 },
    { id: "grant_entry", label: "Entry", maxWidth: 10 },
    { id: "status", label: "Status", minWidth: 70 },
    { id: "actions", label: "Actions", minWidth: 70 },
];



const MaintenanceTable = ({ loading, error, maintenances, count, hidden }) => {
    const dispatch = useDispatch();

    const createMaintenance = useSelector(state => state.createMaintenance)
    const { success: successCreate, message } = createMaintenance

    const deleteMaintenance = useSelector((state) => state.deleteMaintenance);
    const { success: successDelete, message: deleteMessage } = deleteMaintenance;

    const updateMaintenance = useSelector(state => state.updateMaintenance)
    const { success: successUpdate } = updateMaintenance

    const [openModal, setOpenModal] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);

    const [confirmDialog, setConfirmDialog] = useState({
        open: false,
        title: "",
        subTitle: "",
    });

  

    const newEntry = (maintenance, handleResetForm) => {
        dispatch(createAdminMaintenanceRequestAction(maintenance));
        if (successCreate) {
            handleResetForm()
        }
    };

    const editEntry = (maintenance, handleResetForm) => {
        dispatch(updateMaintenanceAction(maintenance));
        if (successUpdate) {
            handleResetForm()
        }
    };

    const editHandler = (maintenance) => {
        setRecordForEdit(maintenance);
        setOpenPopup(true);
    };

    const deleteHandler = (id) => {
        setConfirmDialog({
            ...confirmDialog,
            open: false,
        });
        dispatch(deleteMaintenanceAction(id));
    };



    useEffect(() => {
        dispatch(readMaintenancesAction());
    }, [successCreate, successDelete, successUpdate]);

    const columns = [
        { 
            field: 'requested_by', 
            headerName: 'Requested By', 
            minWidth: 200, 
            flex: 1,
            renderCell: params => 
                <NgLink
                    to={`/maintenance/${params?.row?.id}`}
                >
                    {params?.row?.requested_by?.full_name}
                </NgLink>,
            valueFormatter: params => {
                return params?.value
            },
            valueGetter: params => {
                return params?.value?.full_name
            },
        },
    
        {
            field: 'category',
            headerName: 'Category',
            minWidth: 100,
        },
        {
            field: 'description',
            headerName: 'Description',
            minWidth: 250,
        },
    
        {
            field: 'grant_entry',
            headerName: 'Entry',
            minWidth: 70,
            flex: 1,
            type: 'boolean',
        },
    
        { 
            field: 'status', 
            headerName: 'Status', 
            minWidth: 100, 
            flex: 1,
            renderCell: 
                params =>  
                <InvoiceStatus
                    overdue={params?.value === "Cancelled"}
                    fully_paid={params?.value === "Resolved"}
                    // partially_paid={params?.value === "Partially Paid"}
                    open={params?.value === "UnResolved"}
                >
                    {params?.value}
                </InvoiceStatus>
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
        <>
            <NgPageContainer>
                <TableTop hidden={hidden}>
                    <Controls.AddButton
                        onClick = {() => setOpenModal(true)}
                        >
                    </Controls.AddButton>  
                </TableTop>
                
                <NgPaper>

                    {error ? <ToastAlert severity="error">{error}</ToastAlert> :
                    
                    loading ? <Loader /> : 
                    count > 0 ? 
                        <>
                            <DataTable 
                                rows={maintenances} 
                                columns={columns}
                                loading={!count}
                            />
                        </>
                        : 
                        <NotFound text="No Maintenance Requests Found">
                            <IoIosBuild />
                        </NotFound>
                    }
                </NgPaper>
        </NgPageContainer>
   
        <Modal
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            title={"Update maintenance request"}
            icon={<FiSettings />}
        >
            <MaintenanceEditForm
                recordForEdit={recordForEdit}
                editEntry={editEntry}
            />
        </Modal>

        <Modal
            openModal={openModal}
            setOpenModal={setOpenModal}
            title={"Raise a new maintenance request"}
            icon={<FiSettings />}
        >
            <MaintenanceAdminRequestForm
                recordForEdit={recordForEdit}
                newEntry={newEntry}
            />
        </Modal>

        <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
        />
    </>
    );
};

export default MaintenanceTable;
