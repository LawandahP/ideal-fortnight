import React, { useEffect, useState } from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";

import { TabTitle, toTitleCase } from "../../utils/globalFunc";
import {
    createPropertyAction,
    deletePropertyAction,
    readPropertiesAction,
    updatePropertyAction,
} from "./actions";

import PropertyForm from "./form";
import PropertyEditForm from "./editform";

import Controls from "../../components/controls/Controls";
import ToastAlert from "../../components/display/ToastAlert";
import Loading from "../../components/display/Loader";
import { TableComponent } from "../../components/useTable/index";
import { Chip, TableTop } from "../../components/useTable/elements";
import { ActionButtonWrapper } from "../../components/controls/Button";
import ConfirmDialog from "../../components/display/dialog";
import Modal from "../../components/display/modal";
import NotFound from "../../components/display/notFound";

import {
    List,
    NgLink,
    NgPageContainer,
    NgPaper,
} from "../../components/display/elements";

import { PropertyPropertiesContext } from "../../context";
import { RiCommunityLine } from "react-icons/ri";
import DataTable from "../../components/useTable/dataTable";

function PropertyListScreen({ properties, readLoading, readError, count }) {
    TabTitle("Properties");

    const dispatch = useDispatch();

    const [message, setMessage] = useState(null);

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

    const createProperty = useSelector((state) => state.createProperty);
    const { success: successCreate } = createProperty;

    const updateProperty = useSelector((state) => state.updateProperty);
    const { success: successUpdate } = updateProperty;

    const deleteProperty = useSelector((state) => state.deleteProperty);
    const { success: successDelete } = deleteProperty;

    const [types, setTypes] = useState();
    const [landlords, setLandlords] = useState();
    const [amenitiez, setAmenities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const newEntry = (property, handleResetForm) => {
        dispatch(createPropertyAction(property));
        if (successCreate) {
            handleResetForm();
            setOpenModal(false);
        }
    };

    const editEntry = (property, handleResetForm) => {
        dispatch(updatePropertyAction(property));
        if (successUpdate) setOpenPopup(false);
        // handleResetForm()
    };

    const editHandler = (property) => {
        setRecordForEdit({
            id: property?.id,
            slug: property?.slug,
            owner: property?.owner?.id,
            name: property?.name,
            address: property?.address,
            description: property?.description,
            property_type: property?.property_type?.id,
        });
        setOpenPopup(true);
    };

    const deleteHandler = (id) => {
        setConfirmDialog({
            ...confirmDialog,
            open: false,
        });
        dispatch(deletePropertyAction(id));
    };

    const propertyProperties = async () => {
        await axios
            .get(`/api/v1/property_properties/`)
            .then((res) => {
                setLoading(false);
                setTypes(res.data.data.payload.types);
                setLandlords(res.data.data.payload.landlords);
                setAmenities(res.data.data.payload.amenities);
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
        dispatch(readPropertiesAction());
    }, [dispatch, successCreate, successUpdate, successDelete]);

    useEffect(() => {
        propertyProperties();
    }, []);

    const columns = [
        {
            field: "name",
            headerName: "Name",
            minWidth: 200,
            flex: 1,
            renderCell: (params) => (
                <NgLink to={`/property/${params?.row?.slug}`}>
                    {params.value}
                </NgLink>
            ),
        },
        {
            field: "address",
            headerName: "Address",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "property_type",
            headerName: "Type",
            minWidth: 100,
            flex: 1,
            renderCell: (params) => params?.row?.property_type?.property_model,
            valueFormatter: (params) => {
                return params.value;
            },
            valueGetter: (params) => {
                return params?.value?.property_model;
            },
        },
        {
            field: "owner",
            headerName: "Owner",
            minWidth: 100,
            flex: 1,
            renderCell: (params) => params?.row?.owner?.full_name,
            valueFormatter: (params) => {
                return params.value;
            },
            valueGetter: (params) => {
                return params?.value?.full_name;
            },
        },
        {
            field: "action",
            headerName: "Action",
            minWidth: 200,
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
                                    deleteHandler(params?.row?.slug);
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
        <>
            {readError ? (
                <ToastAlert severity="error">{readError}</ToastAlert>
            ) : (
                <>
                    <TableTop>
                        <Controls.AddButton
                            onClick={() => setOpenModal(true)}
                        ></Controls.AddButton>
                    </TableTop>

                    <NgPaper>
                        {readLoading ? (
                            <Loading />
                        ) : readError ? (
                            <ToastAlert severity="error">
                                {readError}
                            </ToastAlert>
                        ) : count > 0 ? (
                            <div>
                                <DataTable
                                    rows={properties}
                                    columns={columns}
                                    loading={!count}
                                />
                            </div>
                        ) : (
                            <NotFound text="No Properties Found">
                                <RiCommunityLine />
                            </NotFound>
                        )}
                    </NgPaper>

                    <PropertyPropertiesContext.Provider
                        value={{
                            types,
                            setTypes,
                            landlords,
                            setLandlords,
                            amenitiez,
                            setAmenities,
                            loading,
                            setLoading,
                            error,
                            setError,
                        }}
                    >
                        <Modal
                            openModal={openModal}
                            setOpenModal={setOpenModal}
                            title="Create Property"
                            icon={<RiCommunityLine />}
                        >
                            <PropertyForm newEntry={newEntry} />
                        </Modal>

                        <Modal
                            openPopup={openPopup}
                            setOpenPopup={setOpenPopup}
                            title="Edit Property"
                            icon={<RiCommunityLine />}
                        >
                            <PropertyEditForm
                                recordForEdit={recordForEdit}
                                editEntry={editEntry}
                            />
                        </Modal>
                    </PropertyPropertiesContext.Provider>

                    <ConfirmDialog
                        confirmDialog={confirmDialog}
                        setConfirmDialog={setConfirmDialog}
                    />
                </>
            )}
        </>
    );
}

export default PropertyListScreen;
