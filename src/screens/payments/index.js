import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import { FiUsers } from "react-icons/fi";

import { config, TabTitle, toTitleCase } from "../../utils/globalFunc";
import {
    createPaymentAction,
    deletePaymentAction,
    readPaymentsAction,
    updatePaymentAction,
} from "./actions";

import {
    List,
    NgLink,
    NgPageContainer,
    NgPaper,
} from "../../components/display/elements";
import NotFound from "../../components/display/notFound";

import ToastAlert from "../../components/display/ToastAlert";
import PaymentListScreen from "./list";


function PaymentIndexScreen() {
    TabTitle("Payments");

    const dispatch = useDispatch();

    const readPayments = useSelector((state) => state.readPayments);
    const { loading, error, payments, count } = readPayments;

    const createPayment = useSelector((state) => state.createPayment);
    const { success: successCreate } = createPayment;

    const updatePayment = useSelector((state) => state.updatePayment);
    const { success: successUpdate } = updatePayment;

    const deletePayment = useSelector((state) => state.deletePayment);
    const { success: successDelete } = deletePayment;

    useEffect(() => {
        dispatch(readPaymentsAction());
    }, [dispatch, successCreate, successUpdate, successDelete]);

    return (
        <NgPageContainer>
            <PaymentListScreen
                loading={loading}
                error={error}
                payments={payments}
                count={count}
            />
        </NgPageContainer>
    );
}

export default PaymentIndexScreen;
