import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import { FiUsers } from "react-icons/fi";

import { config, TabTitle, toTitleCase } from "../../utils/globalFunc";
import {
    createTenantAction,
    deleteTenantAction,
    readTenantsAction,
    updateTenantAction,
} from "./actions";

import {
    List,
    NgLink,
    NgPageContainer,
    NgPaper,
} from "../../components/display/elements";
import NotFound from "../../components/display/notFound";
import TenantListScreen from "./tenant_list";
import LandlordTenants from "./landlord";
import axios from "axios";
import ToastAlert from "../../components/display/ToastAlert";
import { CustomTableComponent } from "../../components/useTable";
import { TBody, TCell, Td, TRow } from "../../components/useTable/elements";

const headCells = [
    { id: "full_name", label: "Full Name", minWidth: 170 },
    { id: "email", label: "email", minWidth: 170 },
    { id: "phone_number", label: "Contact", minWidth: 170 },
    { id: "is_active", label: "Status", maxWidth: 10 },
    { id: "action", label: "Action", minWidth: 170 }
];

function TenantIndexScreen() {
    TabTitle("Tenants");

    const dispatch = useDispatch();

    const readTenants = useSelector((state) => state.readTenants);
    const { loading, error, tenants, count } = readTenants;

    const createTenant = useSelector((state) => state.createTenant);
    const { success: successCreate } = createTenant;

    const updateTenant = useSelector((state) => state.updateTenant);
    const { success: successUpdate } = updateTenant;

    const deleteTenant = useSelector((state) => state.deleteTenant);
    const { success: successDelete, message } = deleteTenant;

    const {
        TblContainer,
        TableHead
    } = CustomTableComponent(tenants, headCells);

    useEffect(() => {
        dispatch(readTenantsAction());
    }, [dispatch, successCreate, successDelete, successUpdate]);

    return (
        <NgPageContainer>
            <TenantListScreen
                loading={loading}
                error={error}
                tenants={tenants}
                count={count}
            />
        </NgPageContainer>
    );
}

export default TenantIndexScreen;
