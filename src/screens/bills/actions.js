import axios from "axios";
import { List } from "../../components/display/elements";
import { config, errorToast } from "../../utils/globalFunc";

import {
    BILL_CREATE_REQUEST,
    BILL_CREATE_SUCCESS,
    BILL_CREATE_FAIL,
    BILL_READ_REQUEST,
    BILL_READ_SUCCESS,
    BILL_READ_FAIL,
    BILL_UPDATE_REQUEST,
    BILL_UPDATE_SUCCESS,
    BILL_UPDATE_FAIL,
    BILL_DETAILS_REQUEST,
    BILL_DETAILS_SUCCESS,
    BILL_DETAILS_FAIL,
    BILL_DELETE_REQUEST,
    BILL_DELETE_SUCCESS,
    BILL_DELETE_FAIL,
} from "./constants";
import { toast } from "react-toastify";

export const createBillAction = (bill) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BILL_CREATE_REQUEST,
        });

        const { data } = await axios.post(`/api/v1/bills/`, bill, config);

        dispatch({
            type: BILL_CREATE_SUCCESS,
            payload: data,
        });
        toast.success(data?.data?.success);
    } catch (error) {
        dispatch({
            type: BILL_CREATE_FAIL,
        });
        errorToast(error);
    }
};

// Object.values(error.response.data.detail)
export const readBillsAction = () => async (dispatch) => {
    try {
        dispatch({ type: BILL_READ_REQUEST });
        const { data } = await axios.get(`/api/v1/bills/`, config);

        dispatch({
            type: BILL_READ_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: BILL_READ_FAIL,
        });
        errorToast(error);
    }
};

export const updateBillAction = (bill) => async (dispatch) => {
    try {
        dispatch({
            type: BILL_UPDATE_REQUEST,
        });

        const { data } = await axios.patch(`/api/v1/bill/${bill.id}`, bill, config);

        dispatch({
            type: BILL_UPDATE_SUCCESS,
            payload: data,
        });

        toast.success(data?.data?.success);
    } catch (error) {
        dispatch({
            type: BILL_UPDATE_FAIL,
        });
        errorToast(error);
    }
};

export const deleteBillAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BILL_DELETE_REQUEST,
        });

        const { data } = await axios.delete(`/api/v1/bill/${id}`, config);

        dispatch({
            type: BILL_DELETE_SUCCESS,
        });
        toast.success(data?.data?.success);
    } catch (error) {
        dispatch({
            type: BILL_DELETE_FAIL,
        });
        errorToast(error);
    }
};

export const billDetailsAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BILL_DETAILS_REQUEST,
        });

        const { data } = await axios.get(`/api/v1/bill/${id}`, config);

        dispatch({
            type: BILL_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: BILL_DETAILS_FAIL,
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
