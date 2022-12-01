import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import {
    MdDeleteOutline,
    MdModeEditOutline,
    MdOutlineBathtub,
    MdOutlineKingBed,
} from "react-icons/md";

import { toTitleCase } from "../../utils/globalFunc";
import {
    createUnitAction,
    deleteUnitAction,
    readUnitsAction,
    updateUnitAction,
} from "./actions";

import UnitForm from "./form";
import UnitEditForm from "./editform";

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
    NgPaper,
    List,
    NgPageContainer,
} from "../../components/display/elements";

import { UnitPropertiesContext } from "../../context";
import NotFound from "../../components/display/notFound";
import { RiHome4Line } from "react-icons/ri";
import { Icon, IconLetter } from "./elements";
import DataTable from "../../components/useTable/dataTable";

const headCells = [
    { id: "unit_no", label: "Name", minWidth: 70 },
    { id: "square_feet", label: "Sq Ft", minWidth: 170 },
    { id: "bathrooms", label: "Bath/Bed", maxWidth: 10 },

    { id: "building", label: "Building", minWidth: 50, filterable: true },
    { id: "tenant", label: "Tenant", minWidth: 50 },
    { id: "actions", label: "Actions", minWidth: 30, disableSorting: true },
];

function UnitsList({ loadingRead, errorRead, units, count }) {
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

    const createUnit = useSelector((state) => state.createUnit);
    const { success: successCreate } = createUnit;

    const readProfile = useSelector((state) => state.readProfile);
    const { profile } = readProfile;

    const roles = profile?.groups;

    const updateUnit = useSelector((state) => state.updateUnit);
    const { success: successUpdate } = updateUnit;

    const deleteUnit = useSelector((state) => state.deleteUnit);
    const { success: successDelete } = deleteUnit;

    const [tenants, setTenants] = useState();
    const [properties, setProperties] = useState();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const newEntry = (unit, handleResetForm) => {
        dispatch(createUnitAction(unit));
        if (successCreate) {
            handleResetForm();
            setOpenModal(false);
        }
    };

    const editEntry = (unit, handleResetForm) => {
        dispatch(updateUnitAction(unit));
        // setOpenPopup(false);
        // handleResetForm()
    };

    const editHandler = (unit) => {
        setRecordForEdit({
            _id: unit?._id,
            unit_no: unit?.unit_no,
            square_feet: unit?.square_feet,
            bedrooms: unit?.bedrooms,
            bathrooms: unit?.bathrooms,
            property: unit?.property?.id,
            tenant: unit?.tenant?.id,
        });
        setOpenPopup(true);
    };

    const deleteHandler = (id) => {
        setConfirmDialog({
            ...confirmDialog,
            open: false,
        });
        dispatch(deleteUnitAction(id));
    };

    const unitProperties = async () => {
        await axios
            .get(`/api/v1/unit_properties/`)
            .then((res) => {
                setLoading(false);
                setTenants(res.data.data.payload.tenants);
                setProperties(res.data.data.payload.properties);
            })
            .catch((err) => {
                setError(
                    err.response && err.response.data.detail ? (
                        <>
                            {Object.keys(err.response.data.detail).map(
                                function (s) {
                                    return (
                                        <List>
                                            {err.response.data.detail[s]}
                                        </List>
                                    );
                                }
                            )}
                        </>
                    ) : (
                        err.message
                    )
                );
                setLoading(false);
            });
    };

    useEffect(() => {
        dispatch(readUnitsAction());
    }, [successCreate, successUpdate, successDelete]);

    useEffect(() => {
        unitProperties();
    }, []);

    const columns = [
        {
            field: "unit_no",
            headerName: "Unit",
            minWidth: 30,
            // flex: 1,
            renderCell: (params) => (
                <NgLink to={`/unit/${params?.row?._id}`}>{params.value}</NgLink>
            ),
        },
        {
            field: "square_feet",
            headerName: "Sq Feet",
            minWidth: 150,
            flex: 1,
            type: "number",
        },
        {
            field: "bathrooms",
            headerName: "Bathrooms",
            minWidth: 100,
            flex: 1,
            type: "number",
        },
        {
            field: "bedrooms",
            headerName: "Bedrooms",
            minWidth: 100,
            flex: 1,
            type: "number",
        },
        {
            field: "property",
            headerName: "Property",
            minWidth: 200,
            flex: 1,
            renderCell: (params) => params?.value?.name,
            valueFormatter: (params) => {
                return params?.value?.name;
            },
            valueGetter: (params) => {
                return params?.value?.name;
            },
        },
        {
            field: "tenant",
            headerName: "Tenant",
            minWidth: 200,
            flex: 1,
            renderCell: (params) =>
                params?.row?.tenant?.full_name ? (
                    params?.row?.tenant?.full_name
                ) : params?.row?.tenant?.full_name === "" ||
                  params?.row?.tenant?.full_name == null ? (
                    <Chip>vacant</Chip>
                ) : (
                    <Chip>vacant</Chip>
                ),
            valueFormatter: (params) => { return params?.value;},
            valueGetter: (params) => {
                return params?.value?.full_name;
            },
        },
        {
            field: "action",
            headerName: "Action",
            minWidth: 20,
            flex: 1,
            filterable: false,
            sortable: false,
            renderCell: (params) => (
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
                        onClick={() => {
                            setConfirmDialog({
                                open: true,
                                title: "Are you sure you want to delete this Tenant?",
                                subTitle: "You can't undo this operation",
                                onConfirm: () => {
                                    deleteHandler(params?.row?._id);
                                },
                            });
                        }}
                    >
                        <MdDeleteOutline />
                    </Controls.ActionButton>
                </ActionButtonWrapper>
            ),
        },
    ];

    return (
        <NgPageContainer>
            {errorRead ? (
                <ToastAlert severity="error">{errorRead}</ToastAlert>
            ) : (
                <>
                    <TableTop>
                        <Controls.AddButton
                            onClick={() => setOpenModal(true)}
                        />
                    </TableTop>

                    <NgPaper>
                        {loadingRead ? (
                            <Loading />
                        ) : count > 0 ? (
                            <>
                                <DataTable
                                    rows={units}
                                    columns={columns}
                                    loading={!count}
                                />
                            </>
                        ) : (
                            <>
                                <NotFound text="No Units found">
                                    <RiHome4Line />
                                </NotFound>
                            </>
                        )}
                    </NgPaper>
                </>
            )}

            <UnitPropertiesContext.Provider
                value={{
                    tenants,
                    setTenants,
                    properties,
                    setProperties,
                    loading,
                    setLoading,
                    error,
                    setError,
                }}
            >
                <Modal
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    title="Create Unit"
                    icon={<RiHome4Line />}
                >
                    <UnitForm newEntry={newEntry} />
                </Modal>

                <Modal
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    title="Edit Unit"
                    icon={<RiHome4Line />}
                >
                    <UnitEditForm
                        recordForEdit={recordForEdit}
                        editEntry={editEntry}
                    />
                </Modal>
            </UnitPropertiesContext.Provider>

            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </NgPageContainer>
    );
}

export default UnitsList;
