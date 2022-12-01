import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";

import { TabTitle, toTitleCase } from "../../utils/globalFunc";
import {
    createLandlordAction,
    deleteLandlordAction,
    readLandlordsAction,
    updateLandlordAction,
} from "./actions";

import LandlordForm from "./form";
import LandlordEditForm from "./editform";

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
import { FcManager } from "react-icons/fc";
import {
    ProfileContainer,
    ProfileInfoWrapper,
    UserName,
    UserRole,
} from "../../components/navbar/navbarElements";
import { Avatar } from "@mui/material";
import CustomAvatar from "../../components/display/CustomAvatar";
import DataTable from "../../components/useTable/dataTable";
import { RiUser2Line } from "react-icons/ri";


function LandlordReadScreen({ history }) {

    TabTitle("Landlords");

    const dispatch = useDispatch();

    const [message, setMessage] = useState(null);

    const [openModal, setOpenModal] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState({
        open: false,
        title: "",
        subTitle: "",
    });

    const [recordForEdit, setRecordForEdit] = useState(null);

    const createLandlord = useSelector((state) => state.createLandlord);
    const { success: successCreate } = createLandlord;

    const readLandlords = useSelector((state) => state.readLandlords);
    const { loading, error, landlords, count } = readLandlords;

    const updateLandlord = useSelector((state) => state.updateLandlord);
    const { success: successUpdate } = updateLandlord;

    const deleteLandlord = useSelector((state) => state.deleteLandlord);
    const { success: successDelete, error: errorDelete } = deleteLandlord;

    const signInUser = useSelector((state) => state.signInUser);
    const { userInfo } = signInUser;

    const newEntry = (landlord, handleResetForm) => {
        dispatch(createLandlordAction(landlord));
        if (successCreate) {
            handleResetForm();
            setOpenModal(false);
        }
    };

    const editEntry = (landlord, handleResetForm) => {
        dispatch(updateLandlordAction(landlord));
        // setOpenPopup(false);
        // handleResetForm()
    };

    const editHandler = (landlord) => {
        setRecordForEdit(landlord);
        setOpenPopup(true);
    };

    const deleteHandler = (id) => {
        setConfirmDialog({
            ...confirmDialog,
            open: false,
        });
        dispatch(deleteLandlordAction(id));
    };

    useEffect(() => {
        dispatch(readLandlordsAction());
        if (successCreate) {
            setMessage("Landlord Added Successfully");
        }
    }, [
        dispatch,
        successCreate,
        successUpdate,
        successDelete,
        userInfo,
        history,
    ]);

    const columns = [
        { 
            field: 'full_name', 
            headerName: 'Full Name', 
            minWidth: 200, 
            flex: 1,
            renderCell: params => 
            <NgLink
                to={`/landlord/${params?.row?.slug}`}
            >
                <ProfileContainer>
                    {params?.row?.profile
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
            minWidth: 70,
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
            
            {error ? <ToastAlert severity="error">{error}</ToastAlert>
                :
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
                                    rows={landlords} 
                                    columns={columns}
                                    loading={!count}
                                />
                            </>
                        ) : (
                            <NotFound text="No Landlords Found">
                                <FcManager />
                            </NotFound>
                        )}
                    </NgPaper>

                    <Modal
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        title="Create Landlord"
                        icon={<RiUser2Line />}
                    >
                        <LandlordForm newEntry={newEntry} />
                    </Modal>

                    <Modal
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                        title="Edit Landlord"
                        icon={<RiUser2Line />}
                    >
                        <LandlordEditForm
                            recordForEdit={recordForEdit}
                            editEntry={editEntry}
                        />
                    </Modal>

                    <ConfirmDialog
                        confirmDialog={confirmDialog}
                        setConfirmDialog={setConfirmDialog}
                    />
                </>

            }
            </NgPageContainer>
    );
}

export default LandlordReadScreen;
