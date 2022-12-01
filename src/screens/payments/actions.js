import axios from "axios";
import { toast } from "react-toastify";
import { List } from "../../components/display/elements";

import { config, errorToast } from "../../utils/globalFunc";

import {
    PAYMENT_CREATE_REQUEST,
    PAYMENT_CREATE_SUCCESS,
    PAYMENT_CREATE_FAIL,
    PAYMENT_CREATE_RESET,
    PAYMENT_READ_REQUEST,
    PAYMENT_READ_SUCCESS,
    PAYMENT_READ_FAIL,
    PAYMENT_READ_RESET,
    PAYMENT_UPDATE_REQUEST,
    PAYMENT_UPDATE_SUCCESS,
    PAYMENT_UPDATE_FAIL,
    PAYMENT_UPDATE_RESET,
    PAYMENT_DETAILS_REQUEST,
    PAYMENT_DETAILS_SUCCESS,
    PAYMENT_DETAILS_FAIL,
    PAYMENT_DETAILS_RESET,
    PAYMENT_DELETE_REQUEST,
    PAYMENT_DELETE_SUCCESS,
    PAYMENT_DELETE_FAIL,
} from "./constants";

export const createPaymentAction =
    (payment, invoice_id) => async (dispatch, getState) => {
        try {
            dispatch({ type: PAYMENT_CREATE_REQUEST });

            const { data } = await axios.post(
                `/api/v1/payments/${invoice_id}`,
                payment,
                config
            );

            dispatch({
                type: PAYMENT_CREATE_SUCCESS,
                payload: data,
            });
            toast.success(data?.data?.success);
        } catch (error) {
            dispatch({
                type: PAYMENT_CREATE_FAIL,
            });
            errorToast(error);
        }
    };

// Object.values(error.response.data.detail)
export const readPaymentsAction =
    (late_payment = "") =>
    async (dispatch) => {
        try {
            dispatch({ type: PAYMENT_READ_REQUEST });
            const { data } = await axios.get(
                `/api/v1/payments/?late_payment=${late_payment}`,
                config
            );

            dispatch({
                type: PAYMENT_READ_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: PAYMENT_READ_FAIL,
                payload:
                    error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
            });
        }
    };

export const updatePaymentAction = (payment) => async (dispatch) => {
    try {
        dispatch({
            type: PAYMENT_UPDATE_REQUEST,
        });

        const { data } = await axios.put(
            `/api/v1/payment/${payment.id}`,
            payment,
            config
        );
        dispatch({
            type: PAYMENT_UPDATE_SUCCESS,
        });
        toast.success(data?.data?.message);
        dispatch({
            type: PAYMENT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PAYMENT_UPDATE_FAIL,
        });
        errorToast(error);
    }
};

export const paymentDetailsAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PAYMENT_DETAILS_REQUEST,
        });

        const { data } = await axios.get(`/api/v1/payments/${id}`, config);

        dispatch({
            type: PAYMENT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PAYMENT_DETAILS_FAIL,
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

export const paymentDeleteAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PAYMENT_DELETE_REQUEST,
        });

        const { data } = await axios.delete(`/api/v1/payment/${id}`, config);

        dispatch({
            type: PAYMENT_DELETE_SUCCESS,
        });
        toast.success(data?.data?.success);
    } catch (error) {
        dispatch({
            type: PAYMENT_DELETE_FAIL,
        });
        errorToast(error);
    }
};
