import React, { useState } from "react";
import { useSelector } from "react-redux";

import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { TableContainer, TableSortLabel } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { TCell, THead, TRow } from "./elements";
import { NgPageContainer } from "../display/elements";

const useStyles = makeStyles((theme) => ({
    table: {
        // tableLayout: 'fixed',
        width: "100%",
        marginTop: "0px",
        "& thead th": {
            fontWeight: 600,
            color: "#fff",
            backgroundColor: "#0057D9",
            // backgroundColor: 'none',
        },
        "& td": {
            fontWeight: 300,
            fontSize: "12px",
            fontFamily: "Nunito",
            color: "#808080",
        },
        // maxWidth: '1100px'
        "& tbody tr:hover": {
            // backgroundColor: '#fffbf2',
            cursor: "pointer",
        },
    },

    tableContainer: {
        maxHeight: "70vh",
        // borderRadius: 15
    },

    tableHeaderCell: {
        fontWeight: "bold",
        // backgroundColor: '#0057D9'
    },

    pagination: {
        color: "#808080",
    },
}));

export function TableComponent(records, headCells, search) {
    const classes = useStyles();

    const [order, setOrder] = useState();
    const [orderBy, setOrderBy] = useState();

    const TblContainer = ({ children }) => (
        <TableContainer className={classes.tableContainer}>
            <Table
                stickyHeader
                size="small"
                aria-label="sticky table"
                className={classes.table}
            >
                {children}
            </Table>
        </TableContainer>
    );

    const TblHead = () => {
        const handleSortRequest = (cellId) => {
            // check whether current sorting is ascending or not
            const isAsc = orderBy === cellId && order === "asc";
            setOrder(isAsc ? "desc" : "asc");
            setOrderBy(cellId);
        };

        return (
            <TableHead className={classes.tableHeaderCell}>
                <TableRow>
                    {headCells &&
                        headCells.map((headCell) => (
                            <TableCell
                                key={headCell.id}
                                align={headCell.align}
                                style={{ minWidth: headCell.minWidth }}
                            >
                                {headCell.disableSorting ? (
                                    headCell.label
                                ) : (
                                    <TableSortLabel
                                        active={orderBy === headCell.id}
                                        direction={
                                            orderBy === headCell.id
                                                ? order
                                                : "asc"
                                        }
                                        onClick={() => {
                                            handleSortRequest(headCell.id);
                                        }}
                                    >
                                        {headCell.label}
                                    </TableSortLabel>
                                )}
                            </TableCell>
                        ))}
                </TableRow>
            </TableHead>
        );
    };

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function getComparator(order, orderBy) {
        return order === "desc"
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    // Handles record change
    const recordsAfterPagingAndSorting = () => {
        // return stableSort(search.fn(records), getComparator(order, orderBy))
        return stableSort(
            search.fn(records),
            getComparator(order, orderBy)
        ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    };

    const pages = [10, 20, 50, 100];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    const TblPagination = ({ ...other }) => {
        return (
            <TablePagination
                className={classes.pagination}
                rowsPerPageOptions={pages}
                component="div"
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                count={records.length}
                {...other}
            />
        );
    };

    return {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        page,
        rowsPerPage,
    };
}

export function CustomTableComponent(headCells) {
    const TblContainer = ({ children }) => (
        <NgPageContainer>
            <Table>{children}</Table>
        </NgPageContainer>
    );

    const TableHead = () => {
        // const handleSortRequest = cellId => {
        //     // check whether current sorting is ascending or not
        //     const isAsc = orderBy === cellId && order === "asc";
        //     setOrder(isAsc ? 'desc' : 'asc')
        //     setOrderBy(cellId)
        // }

        return (
            <THead>
                <TRow>
                    {headCells?.map((headCell) => (
                        <TCell
                            key={headCell.id}
                            // align={headCell.align}
                            // style={{minWidth: headCell.minWidth}}
                        >
                            {/* { headCell.disableSorting ? headCell.label :
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={() => { handleSortRequest(headCell.id)}}>
                                    {headCell.label}
                                </TableSortLabel>
                            } */}
                            {headCell?.label}
                        </TCell>
                    ))}
                </TRow>
            </THead>
        );
    };
    return {
        TblContainer,
        TableHead,
        // TRow,
        // TCell
    };
}
