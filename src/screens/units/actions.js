import axios from "axios";
import { toast } from "react-toastify";
import { List } from "../../components/display/elements";

import { config, errorToast } from "../../utils/globalFunc";

import {
    UNIT_CREATE_REQUEST,
    UNIT_CREATE_SUCCESS,
    UNIT_CREATE_FAIL,
    UNIT_CREATE_RESET,
    UNIT_READ_REQUEST,
    UNIT_READ_SUCCESS,
    UNIT_READ_FAIL,
    UNIT_READ_RESET,
    UNIT_UPDATE_REQUEST,
    UNIT_UPDATE_SUCCESS,
    UNIT_UPDATE_FAIL,
    UNIT_UPDATE_RESET,
    UNIT_DELETE_REQUEST,
    UNIT_DELETE_SUCCESS,
    UNIT_DELETE_FAIL,
    UNIT_DETAILS_REQUEST,
    UNIT_DETAILS_SUCCESS,
    UNIT_DETAILS_FAIL,
    UNIT_DETAILS_RESET,
    UNIT_TYPE_READ_REQUEST,
    UNIT_TYPE_READ_SUCCESS,
    UNIT_TYPE_READ_FAIL,
} from "./constants";

export const createUnitAction = (unit) => async (dispatch, getState) => {
    try {
        dispatch({ type: UNIT_CREATE_REQUEST });

        const { data } = await axios.post(`/api/v1/units/`, unit, config);

        dispatch({
            type: UNIT_CREATE_SUCCESS,
            payload: data,
        });
        toast.success(data?.data?.success);
    } catch (error) {
        dispatch({
            type: UNIT_CREATE_FAIL,
        });
        errorToast(error);
    }
};

// Object.values(error.response.data.detail)
export const readUnitsAction =
    (property = "") =>
    async (dispatch) => {
        try {
            dispatch({ type: UNIT_READ_REQUEST });
            const { data } = await axios.get(
                `/api/v1/units/?property=${property}`,
                config
            );

            dispatch({
                type: UNIT_READ_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: UNIT_READ_FAIL,
                payload:
                    error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
            });
        }
    };

export const updateUnitAction = (unit) => async (dispatch) => {
    try {
        dispatch({
            type: UNIT_UPDATE_REQUEST,
        });

        const { data } = await axios.put(`/api/v1/units/${unit._id}`, unit, config);
        dispatch({
            type: UNIT_UPDATE_SUCCESS,
        });
        toast.success(data?.data?.success);
        dispatch({
            type: UNIT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: UNIT_UPDATE_FAIL,
        });
        errorToast(error);
    }
};

export const unitDetailsAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UNIT_DETAILS_REQUEST,
        });

        const { data } = await axios.get(`/api/v1/units/${id}`, config);

        dispatch({
            type: UNIT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: UNIT_DETAILS_FAIL,
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

export const deleteUnitAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UNIT_DELETE_REQUEST,
        });

        const { data } = await axios.delete(`/api/v1/units/${id}`, config);

        dispatch({
            type: UNIT_DELETE_SUCCESS,
        });
        toast.success(data?.data?.success);
    } catch (error) {
        dispatch({
            type: UNIT_DELETE_FAIL,
        });
        errorToast(error);
    }
};

// Unit Types

export const readUnitTypesAction = () => async (dispatch) => {
    try {
        dispatch({ type: UNIT_TYPE_READ_REQUEST });
        const { data } = await axios.get(`/api/v1/unit_types/`, config);

        dispatch({
            type: UNIT_TYPE_READ_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: UNIT_TYPE_READ_FAIL,
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
