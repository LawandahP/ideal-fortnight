import axios from "axios";
import { toast } from "react-toastify";
import { List } from "../../components/display/elements";

import { errorToast } from "../../utils/globalFunc";

import {
    LANDLORD_CREATE_REQUEST,
    LANDLORD_CREATE_SUCCESS,
    LANDLORD_CREATE_FAIL,
    LANDLORD_CREATE_RESET,
    LANDLORD_READ_REQUEST,
    LANDLORD_READ_SUCCESS,
    LANDLORD_READ_FAIL,
    LANDLORD_READ_RESET,
    LANDLORD_UPDATE_REQUEST,
    LANDLORD_UPDATE_SUCCESS,
    LANDLORD_UPDATE_FAIL,
    LANDLORD_UPDATE_RESET,
    LANDLORD_DELETE_REQUEST,
    LANDLORD_DELETE_SUCCESS,
    LANDLORD_DELETE_FAIL,
    LANDLORD_DETAILS_REQUEST,
    LANDLORD_DETAILS_SUCCESS,
    LANDLORD_DETAILS_FAIL,
    LANDLORD_DETAILS_RESET,
} from "./constants";

const config = { withCredentials: true };

export const createLandlordAction =
    (landlord) => async (dispatch, getState) => {
        try {
            dispatch({
                type: LANDLORD_CREATE_REQUEST,
            });

            const { data } = await axios.post(`/api/v1/landlords/`, landlord, config);

            dispatch({
                type: LANDLORD_CREATE_SUCCESS,
                payload: data,
            });
            toast.success(data?.data?.success);
        } catch (error) {
            dispatch({
                type: LANDLORD_CREATE_FAIL,
            });
            errorToast(error);
        }
    };

// Object.values(error.response.data.detail)
export const readLandlordsAction = () => async (dispatch) => {
    try {
        dispatch({ type: LANDLORD_READ_REQUEST });
        const { data } = await axios.get(`/api/v1/landlords/`, config);

        dispatch({
            type: LANDLORD_READ_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: LANDLORD_READ_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const updateLandlordAction = (landlord) => async (dispatch) => {
    try {
        dispatch({
            type: LANDLORD_UPDATE_REQUEST,
        });

        const { data } = await axios.put(
            `/api/v1/landlords/${landlord.slug}`,
            landlord,
            config
        );
        dispatch({ type: LANDLORD_UPDATE_SUCCESS });

        toast.success(data?.data?.success);

        dispatch({
            type: LANDLORD_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: LANDLORD_UPDATE_FAIL,
        });
        errorToast(error);
    }
};

export const landlordDetailsAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: LANDLORD_DETAILS_REQUEST,
        });

        const { data } = await axios.get(`/api/v1/landlords/${id}`, config);

        dispatch({
            type: LANDLORD_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: LANDLORD_DETAILS_FAIL,
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

export const deleteLandlordAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: LANDLORD_DELETE_REQUEST,
        });

        const { data } = await axios.delete(`/api/v1/landlords/${id}`, config);
        dispatch({
            type: LANDLORD_DELETE_SUCCESS,
        });
        toast.success(data?.data?.success);
    } catch (error) {
        dispatch({
            type: LANDLORD_DELETE_FAIL,
        });
        errorToast(error);
    }
};
