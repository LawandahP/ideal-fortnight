import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import { FiUserPlus, FiUsers } from "react-icons/fi";

import { TabTitle, toTitleCase } from "../../utils/globalFunc";
import {
    createTenantAction,
    deleteTenantAction,
    updateTenantAction,
} from "./actions";

import TenantForm from "./form";
import TenantEditForm from "./editform";

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
import DataTable from "../../components/useTable/dataTable";
import { toast } from "react-toastify";


function TenantListScreen({ loading, error, tenants, count }) {
    TabTitle("Tenants");

    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState({
        open: false,
        title: "",
        subTitle: "",
    });

    const [recordForEdit, setRecordForEdit] = useState(null);


    const newEntry = (tenant, handleResetForm) => {
        dispatch(createTenantAction(tenant));
    };

    const editEntry = (tenant, handleResetForm) => {
        dispatch(updateTenantAction(tenant));
        // setOpenPopup(false);
    };

    const editHandler = (tenant) => {
        setRecordForEdit(tenant);
        setOpenPopup(true);
    };

    const deleteHandler = (id) => {
        setConfirmDialog({
            ...confirmDialog,
            open: false,
        });
        dispatch(deleteTenantAction(id));
    };

    const columns = [
        { 
            field: 'full_name', 
            headerName: 'Full Name', 
            minWidth: 200, 
            flex: 1,
            renderCell: params => <NgLink
            to={`/tenant/${params?.row?.slug}`}
        >
            <ProfileContainer>
                {params?.profile
                    ?.profile_pic ? (
                    <Avatar src={params?.row?.profile?.profile_pic}/>
                ) : (
                    <Avatar
                        {...CustomAvatar(params?.row?.full_name)}
                    />
                )}
                <ProfileInfoWrapper>
                    <UserName>
                        {toTitleCase(params?.row?.full_name)}
                    </UserName>
                </ProfileInfoWrapper>
            </ProfileContainer>
        </NgLink>,
            // valueFormatter: params => {
            //         return params.value
            //     },
            // valueGetter: params => {
            //     return params.value.full_name
            // },
        },
        {
            field: 'email',
            headerName: 'Email',
            minWidth: 200,
            flex: 1,
        },
        {
            field: 'phone_number',
            headerName: 'Phone Number',
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'is_active',
            headerName: 'Active',
            minWidth: 100,
            flex: 1,
            type: 'boolean',
        },
        {
            field: 'action',
            headerName: 'Action',
            minWidth: 70,
            flex: 1,
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
                                    title: "Are you sure you want to delete this Tenant?",
                                    subTitle:"You can't undo this operation",
                                    onConfirm:() => {deleteHandler(params?.row?.slug);},
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
            {error ? <ToastAlert severity="error">{error} </ToastAlert> : (
                <>
                    <TableTop>
                        <Controls.AddButton
                            onClick={() => setOpenModal(true)}>
                        </Controls.AddButton>
                    </TableTop>

                    <NgPaper>
                        {loading ? (
                            <Loading />
                        ) : count > 0 ? (
                            <>
                                <DataTable 
                                    rows={tenants} 
                                    columns={columns}
                                    loading={!count}
                                />
                            </>
                        ) : (
                            <NotFound text="No Tenants Found">
                                <FiUsers />
                            </NotFound>
                        )}
                    </NgPaper>
                </>
            )}

            <Modal
                openModal={openModal}
                setOpenModal={setOpenModal}
                title="Add New Tenant"
                icon={<FiUserPlus />}
            >
                <TenantForm newEntry={newEntry} />
            </Modal>

            <Modal
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Edit Tenant"
                icon={<FiUserPlus />}
            >
                <TenantEditForm
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

export default TenantListScreen;
