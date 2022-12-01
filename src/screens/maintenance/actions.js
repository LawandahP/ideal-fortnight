import axios from "axios";
import { toast } from "react-toastify";
import { List } from "../../components/display/elements";

import { config, errorToast, multipart_config } from "../../utils/globalFunc";

import {
    MAINTENANCE_CREATE_REQUEST,
    MAINTENANCE_CREATE_SUCCESS,
    MAINTENANCE_CREATE_FAIL,
    MAINTENANCE_READ_REQUEST,
    MAINTENANCE_READ_SUCCESS,
    MAINTENANCE_READ_FAIL,
    MAINTENANCE_UPDATE_REQUEST,
    MAINTENANCE_UPDATE_SUCCESS,
    MAINTENANCE_UPDATE_FAIL,
    MAINTENANCE_DELETE_REQUEST,
    MAINTENANCE_DELETE_SUCCESS,
    MAINTENANCE_DELETE_FAIL,
    MAINTENANCE_DETAILS_REQUEST,
    MAINTENANCE_DETAILS_SUCCESS,
    MAINTENANCE_DETAILS_FAIL,
} from "./constants";

export const createMaintenanceRequestAction =
    (maintenance) => async (dispatch, getState) => {
        try {
            dispatch({
                type: MAINTENANCE_CREATE_REQUEST,
            });

            const { data } = await axios.post(
                `/api/v1/maintenance/`,
                maintenance,
                multipart_config
            );

            dispatch({
                type: MAINTENANCE_CREATE_SUCCESS,
                payload: data,
            });
            toast.success(data?.data?.success);
        } catch (error) {
            dispatch({
                type: MAINTENANCE_CREATE_FAIL,
            });
            errorToast(error);
        }
    };

export const createAdminMaintenanceRequestAction =
    (maintenance) => async (dispatch, getState) => {
        try {
            dispatch({
                type: MAINTENANCE_CREATE_REQUEST,
            });

            const { data } = await axios.post(
                `/api/v1/maintenance_admin/`,
                maintenance,
                multipart_config
            );

            dispatch({
                type: MAINTENANCE_CREATE_SUCCESS,
                payload: data,
            });
            toast.success(data?.data?.success);
        } catch (error) {
            dispatch({
                type: MAINTENANCE_CREATE_FAIL,
            });
            errorToast(error);
        }
    };

// Object.values(error.response.data.detail)
export const readMaintenancesAction = () => async (dispatch) => {
    try {
        dispatch({ type: MAINTENANCE_READ_REQUEST });
        const { data } = await axios.get(`/api/v1/maintenance/`, config);

        dispatch({
            type: MAINTENANCE_READ_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: MAINTENANCE_READ_FAIL,
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

export const updateMaintenanceAction = (maintenance) => async (dispatch) => {
    try {
        dispatch({
            type: MAINTENANCE_UPDATE_REQUEST,
        });

        const { data } = await axios.put(
            `/api/v1/maintenance/${maintenance.id}`,
            maintenance,
            config
        );

        dispatch({
            type: MAINTENANCE_UPDATE_SUCCESS,
            payload: data,
        });
        toast.success(data?.data?.message);
    } catch (error) {
        dispatch({
            type: MAINTENANCE_UPDATE_FAIL,
        });
        errorToast(error);
    }
};

export const deleteMaintenanceAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MAINTENANCE_DELETE_REQUEST,
        });

        const { data } = await axios.delete(`/api/v1/maintenance/${id}`, config);

        dispatch({
            type: MAINTENANCE_DELETE_SUCCESS,
        });
        toast.success(data?.data?.success);
    } catch (error) {
        dispatch({
            type: MAINTENANCE_DELETE_FAIL,
        });
        errorToast(error);
    }
};

export const maintenanceDetailsAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MAINTENANCE_DETAILS_REQUEST,
        });

        const { data } = await axios.get(`/api/v1/maintenance/${id}`, config);

        dispatch({
            type: MAINTENANCE_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: MAINTENANCE_DETAILS_FAIL,
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
