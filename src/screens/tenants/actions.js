import axios from "axios";
import { toast } from "react-toastify";
import { List } from "../../components/display/elements";

import { config, errorToast } from "../../utils/globalFunc";

import {
    TENANT_CREATE_REQUEST,
    TENANT_CREATE_SUCCESS,
    TENANT_CREATE_FAIL,
    TENANT_CREATE_RESET,
    TENANT_READ_REQUEST,
    TENANT_READ_SUCCESS,
    TENANT_READ_FAIL,
    TENANT_READ_RESET,
    TENANT_UPDATE_REQUEST,
    TENANT_UPDATE_SUCCESS,
    TENANT_UPDATE_FAIL,
    TENANT_UPDATE_RESET,
    TENANT_DELETE_REQUEST,
    TENANT_DELETE_SUCCESS,
    TENANT_DELETE_FAIL,
    TENANT_DETAILS_REQUEST,
    TENANT_DETAILS_SUCCESS,
    TENANT_DETAILS_FAIL,
    TENANT_DETAILS_RESET,
} from "./constants";

export const createTenantAction = (tenant) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TENANT_CREATE_REQUEST,
        });

        const { data } = await axios.post(`/api/v1/tenants/`, tenant, config);

        dispatch({
            type: TENANT_CREATE_SUCCESS,
            payload: data,
        });
        toast.success(data?.data?.message);
    } catch (error) {
        dispatch({
            type: TENANT_CREATE_FAIL,
        });
        errorToast(error);
    }
};

// Object.values(error.response.data.detail)
export const readTenantsAction = () => async (dispatch) => {
    try {
        dispatch({ type: TENANT_READ_REQUEST });
        const { data } = await axios.get(`/api/v1/tenants/`, config);

        dispatch({
            type: TENANT_READ_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: TENANT_READ_FAIL,
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

export const updateTenantAction = (tenant) => async (dispatch) => {
    try {
        dispatch({
            type: TENANT_UPDATE_REQUEST,
        });

        const { data } = await axios.put(
            `/api/v1/tenants/${tenant.slug}`,
            tenant,
            config
        );
        dispatch({ type: TENANT_UPDATE_SUCCESS });
        toast.success(data?.data?.message);
        // dispatch({
        //     type: TENANT_DETAILS_SUCCESS,
        //     payload: data
        // })
    } catch (error) {
        dispatch({ type: TENANT_UPDATE_FAIL });
        errorToast(error);
    }
};

export const tenantDetailsAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TENANT_DETAILS_REQUEST,
        });

        const { data } = await axios.get(`/api/v1/tenants/${id}`, config);

        dispatch({
            type: TENANT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: TENANT_DETAILS_FAIL,
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

export const deleteTenantAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TENANT_DELETE_REQUEST,
        });

        const { data } = await axios.delete(`/api/v1/tenants/${id}`, config);

        dispatch({ type: TENANT_DELETE_SUCCESS });
        toast.success(data?.data?.message);
    } catch (error) {
        dispatch({ type: TENANT_DELETE_FAIL });
        errorToast(error);
    }
};
