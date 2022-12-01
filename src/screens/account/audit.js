import React, { useState, useEffect } from "react";
import { Avatar, TableBody, TableCell, TableRow } from "@mui/material";
import CustomAvatar from "../../components/display/CustomAvatar";
import {
    List,
    NgLink,
    NgPageContainer,
    NgPaper,
} from "../../components/display/elements";
import { TableComponent } from "../../components/useTable";
import { TableTop } from "../../components/useTable/elements";
import { config, TabTitle, toTitleCase } from "../../utils/globalFunc";
import axios from "axios";
import Controls from "../../components/controls/Controls";
import {
    ProfileContainer,
    ProfileInfoWrapper,
    UserRole,
} from "../../components/navbar/navbarElements";
import { UserName } from "../user.elements";
import NotFound from "../../components/display/notFound";

import { AiOutlineAudit } from "react-icons/ai";
import Loader from "../../components/display/Loader";
import ToastAlert from "../../components/display/ToastAlert";

import moment from "moment";

import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/useTable/dataTable";

const headCells = [
    { id: "user", label: "Action By", minWidth: 100 },
    { id: "action_flag", label: "Action", minWidth: 180 },
    { id: "created_at", label: "Date", minWidth: 100 },
];

const AuditScreen = () => {
    TabTitle("Audit");

    const [audits, setAudits] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);

    const getAuditLog = async () => {
        setLoading(true);
        await axios
            .get(`/audit/`, config)
            .then((res) => {
                setAudits(res?.data?.data?.payload);
                setCount(res?.data?.data?.count);
                setLoading(false);
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

    const columns = [
        {
            field: "user",
            headerName: "Action By",
            minWidth: 250,
            renderCell: (params) => (
                <UserName>{toTitleCase(params?.row?.user?.full_name)}</UserName>
            ),
            valueFormatter: (params) => {
                return params.value;
            },
            valueGetter: (params) => {
                return params.value.full_name;
            },
        },
        {
            field: "action_flag",
            headerName: "Action",
            minWidth: 500,
        },
        {
            field: "created_at",
            headerName: "Date",
            minWidth: 300,
            type: "date",
            valueFormatter: (params) => {
                // first converts to JS Date, then to locale option through date-fns
                return moment(params.value).format("MM-DD-YY");
            },
            // valueGetter for filtering
            valueGetter: (params) => {
                return moment(params.value).format("MM-DD-YY");
            },
            renderCell: (params) =>
                moment(params.row.created_at).format("LLLL"),
        },
    ];

    useEffect(() => {
        getAuditLog();
    }, []);

    return (
        <NgPageContainer>
            <NgPaper>
                <DataTable rows={audits} columns={columns} loading={!count} />
            </NgPaper>
        </NgPageContainer>
    );
};

export default AuditScreen;
