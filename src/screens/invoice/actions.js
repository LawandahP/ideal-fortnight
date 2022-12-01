import axios from "axios";

import { List } from "../../components/display/elements";

import { toast } from "react-toastify";

import {
    INVOICE_CREATE_REQUEST,
    INVOICE_CREATE_SUCCESS,
    INVOICE_CREATE_FAIL,
    INVOICE_READ_REQUEST,
    INVOICE_READ_SUCCESS,
    INVOICE_READ_FAIL,
    INVOICE_UPDATE_REQUEST,
    INVOICE_UPDATE_SUCCESS,
    INVOICE_UPDATE_FAIL,
    INVOICE_DETAILS_REQUEST,
    INVOICE_DETAILS_SUCCESS,
    INVOICE_DETAILS_FAIL,
    INVOICE_DELETE_REQUEST,
    INVOICE_DELETE_SUCCESS,
    INVOICE_DELETE_FAIL,
    INVOICE_READ_SUMMARY_REQUEST,
    INVOICE_READ_SUMMARY_SUCCESS,
    INVOICE_READ_SUMMARY_FAIL,
    LANDLORD_INVOICE_READ_REQUEST,
    LANDLORD_INVOICE_READ_SUCCESS,
    LANDLORD_INVOICE_READ_FAIL,
} from "./constants";
import { errorToast, fileDownload } from "../../utils/globalFunc";

const config = {
    withCredentials: true,
    // headers: {
    //     'Content-type':'multipart/form-data'
    // }
};

export const createInvoiceAction = (invoice) => async (dispatch, getState) => {
    try {
        dispatch({
            type: INVOICE_CREATE_REQUEST,
        });

        const { data } = await axios.post(`/api/v1/invoices/`, invoice, config);

        dispatch({
            type: INVOICE_CREATE_SUCCESS,
            payload: data,
        });
        toast.success(data?.data?.success);
    } catch (error) {
        dispatch({
            type: INVOICE_CREATE_FAIL,
        });
        errorToast(error);
    }
};

// Object.values(error.response.data.detail)
export const readInvoicesAction =
    (status = "", date_month = "", date_year = "", property = "") =>
    async (dispatch) => {
        try {
            dispatch({ type: INVOICE_READ_REQUEST });
            const { data } = await axios.get(
                `/api/v1/invoices/?status=${status}&date_month=${date_month}&date_year=${date_year}&property=${property}`,
                config
            );

            dispatch({
                type: INVOICE_READ_SUCCESS,
                payload: data,
            });

            localStorage.setItem(
                "invoice_filter",
                JSON.stringify({
                    status: status,
                    date_month: date_month,
                    date_year: date_year,
                    property: property,
                })
            );
        } catch (error) {
            dispatch({
                type: INVOICE_READ_FAIL,
                payload:
                    error.response && error.response.data.detail ? (
                        <>
                            {Object.keys(error.response.data.detail).map(
                                function (s) {
                                    return (
                                        <List>
                                            {error.response.data.detail[s]}
                                        </List>
                                    );
                                }
                            )}
                        </>
                    ) : (
                        error.message
                    ),
            });
        }
    };

export const updateInvoiceAction = (invoice) => async (dispatch) => {
    try {
        dispatch({
            type: INVOICE_UPDATE_REQUEST,
        });

        const configure = {
            withCredentials: true,
        };

        const { data } = await axios.patch(
            `/api/v1/invoice/${invoice.invoice_id}`,
            invoice,
            configure
        );

        dispatch({
            type: INVOICE_UPDATE_SUCCESS,
            payload: data,
        });
        toast.success(data?.data?.success);
    } catch (error) {
        dispatch({
            type: INVOICE_UPDATE_FAIL,
        });
        errorToast(error);
    }
};

export const deleteInvoiceAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: INVOICE_DELETE_REQUEST,
        });

        const { data } = await axios.delete(`/api/v1/invoice/${id}`, config);

        dispatch({
            type: INVOICE_DELETE_SUCCESS,
        });
        toast.success(data?.data?.success);
    } catch (error) {
        dispatch({
            type: INVOICE_DELETE_FAIL,
        });
        errorToast(error);
    }
};

export const readInvoicesSummaryAction =
    (date_month = "", date_year = "", property = "") =>
    async (dispatch) => {
        try {
            dispatch({ type: INVOICE_READ_SUMMARY_REQUEST });
            const { data } = await axios.get(
                `/api/v1/invoice-summary/?date_month=${date_month}&date_year=${date_year}&property=${property}`,
                config
            );

            dispatch({
                type: INVOICE_READ_SUMMARY_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: INVOICE_READ_SUMMARY_FAIL,
                payload:
                    error.response && error.response.data.detail ? (
                        <>
                            {Object.keys(error.response.data.detail).map(
                                function (s) {
                                    return (
                                        <List>
                                            {error.response.data.detail[s]}
                                        </List>
                                    );
                                }
                            )}
                        </>
                    ) : (
                        error.message
                    ),
            });
        }
    };

export const invoiceDetailsAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: INVOICE_DETAILS_REQUEST,
        });

        const { data } = await axios.get(`/api/v1/invoice/${id}`, config);

        dispatch({
            type: INVOICE_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: INVOICE_DETAILS_FAIL,
            payload:
                error.response && error.response.data.detail ? (
                    <>
                        {Object.keys(error.response.data.detail).map(function (
                            s
                        ) {
                            return <List>{error.response.data.detail[s]}</List>;
                        })}
                    </>
                ) : (
                    error.message
                ),
        });
    }
};

// Landlord Invoices

export const readLandlordInvoicesSummaryAction =
    (date_month = "", date_year = "", property = "") =>
    async (dispatch) => {
        try {
            dispatch({ type: INVOICE_READ_SUMMARY_REQUEST });
            const { data } = await axios.get(
                `/api/v1/my-invoices-summary/?date_month=${date_month}&date_year=${date_year}&property=${property}`,
                config
            );

            dispatch({
                type: INVOICE_READ_SUMMARY_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: INVOICE_READ_SUMMARY_FAIL,
                payload:
                    error.response && error.response.data.detail ? (
                        <>
                            {Object.keys(error.response.data.detail).map(
                                function (s) {
                                    return (
                                        <List>
                                            {error.response.data.detail[s]}
                                        </List>
                                    );
                                }
                            )}
                        </>
                    ) : (
                        error.message
                    ),
            });
        }
    };

export const readLandlordsInvoicesAction =
    (status = "", date_month = "", date_year = "", property = "") =>
    async (dispatch) => {
        try {
            dispatch({ type: LANDLORD_INVOICE_READ_REQUEST });
            const { data } = await axios.get(
                `/api/v1/my-invoices/?status=${status}&date_month=${date_month}&date_year=${date_year}&property=${property}`,
                config
            );

            dispatch({
                type: LANDLORD_INVOICE_READ_SUCCESS,
                payload: data,
            });

            localStorage.setItem(
                "invoice_filter",
                JSON.stringify({
                    status: status,
                    date_month: date_month,
                    date_year: date_year,
                    property: property,
                })
            );
        } catch (error) {
            dispatch({
                type: LANDLORD_INVOICE_READ_FAIL,
                payload:
                    error.response && error.response.data.detail ? (
                        <>
                            {Object.keys(error.response.data.detail).map(
                                function (s) {
                                    return (
                                        <List>
                                            {error.response.data.detail[s]}
                                        </List>
                                    );
                                }
                            )}
                        </>
                    ) : (
                        error.message
                    ),
            });
        }
    };

// Tenant Invocies

export const readTenantInvoicesAction =
    (status = "", date_month = "", date_year = "") =>
    async (dispatch) => {
        try {
            dispatch({ type: INVOICE_READ_REQUEST });
            const { data } = await axios.get(
                `/api/v1/tenant-invoices/?status=${status}&date_month=${date_month}&date_year=${date_year}`,
                config
            );

            dispatch({
                type: INVOICE_READ_SUCCESS,
                payload: data,
            });

            localStorage.setItem(
                "invoice_filter",
                JSON.stringify({
                    status: status,
                    date_month: date_month,
                    date_year: date_year,
                })
            );
        } catch (error) {
            dispatch({
                type: INVOICE_READ_FAIL,
                payload:
                    error.response && error.response.data.detail ? (
                        <>
                            {Object.keys(error.response.data.detail).map(
                                function (s) {
                                    return (
                                        <List>
                                            {error.response.data.detail[s]}
                                        </List>
                                    );
                                }
                            )}
                        </>
                    ) : (
                        error.message
                    ),
            });
        }
    };

export const getPdf = (invoice_id, setPdfLoading) => {
    setPdfLoading(true);
    axios
        .get(
            `/api/v1/generate_invoice/${invoice_id}`,
            {
                responseType: "blob",
            },
            config
        )
        .then((res) => {
            setPdfLoading(false);
            fileDownload(res.data, `invoice_${invoice_id}.pdf`);
            toast.success("File downloaded Successfully");
        })
        .catch((err) => {
            setPdfLoading(false);
            toast.error(err);
        });
};
