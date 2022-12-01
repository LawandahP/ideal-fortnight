import React, { useEffect, useState } from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

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
import PropertyListScreen from "./list";
import LandlordProperties from "./landlords";

const headCells = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "address", label: "address", minWidth: 170 },
    { id: "type", label: "Type", minWidth: 170 },
    { id: "owner", label: "Owner", minWidth: 100 },
    { id: "action", label: "Action", minWidth: 50, disableSorting: true },
    // { id: 'birth_cert_no', label: 'Birth Cert No', minWidth: 170 },
    // { id: 'date_of_bith', label: 'D.O.B', minWidth: 170 },
    // { id: 'term_admitted', label: 'Term of Admission', minWidth: 170 },
];

function PropertyIndexScreen() {
    TabTitle("Properties");

    const readProperties = useSelector((state) => state.readProperties);
    const {
        loading: readLoading,
        error: readError,
        properties,
        count,
    } = readProperties;

    const readProfile = useSelector((state) => state.readProfile);
    const {
        error: errorProfile,
        loading: loadingProfile,
        profile,
    } = readProfile;

    const roles = profile?.groups;

    return (
        <NgPageContainer>
            {roles?.includes("LANDLORD") ? (
                <LandlordProperties />
            ) : (
                <PropertyListScreen
                    properties={properties}
                    count={count}
                    readLoading={readLoading}
                    readError={readError}
                />
            )}
        </NgPageContainer>
    );
}

export default PropertyIndexScreen;
