import axios from "axios";
import { List } from "../../components/display/elements";
import { config, errorToast, multipart_config } from "../../utils/globalFunc";

import {
    BUILDING_CREATE_REQUEST,
    BUILDING_CREATE_SUCCESS,
    BUILDING_CREATE_FAIL,
    BUILDING_CREATE_RESET,
    BUILDING_READ_REQUEST,
    BUILDING_READ_SUCCESS,
    BUILDING_READ_FAIL,
    BUILDING_READ_RESET,
    BUILDING_UPDATE_REQUEST,
    BUILDING_UPDATE_SUCCESS,
    BUILDING_UPDATE_FAIL,
    BUILDING_UPDATE_RESET,
    BUILDING_DELETE_REQUEST,
    BUILDING_DELETE_SUCCESS,
    BUILDING_DELETE_FAIL,
    BUILDING_DETAILS_REQUEST,
    BUILDING_DETAILS_SUCCESS,
    BUILDING_DETAILS_FAIL,
    BUILDING_DETAILS_RESET,
    BUILDING_TYPE_READ_REQUEST,
    BUILDING_TYPE_READ_SUCCESS,
    BUILDING_TYPE_READ_FAIL,
} from "./constants";
import { toast } from "react-toastify";

export const createPropertyAction =
    (property) => async (dispatch, getState) => {
        try {
            dispatch({
                type: BUILDING_CREATE_REQUEST,
            });

            const { data } = await axios.post(
                `/api/v1/properties/`,
                property,
                multipart_config
            );

            dispatch({
                type: BUILDING_CREATE_SUCCESS,
                payload: data,
            });
            toast.success(data?.data?.success);
        } catch (error) {
            dispatch({
                type: BUILDING_CREATE_FAIL,
            });
            errorToast(error);
        }
    };

// Object.values(error.response.data.detail)
export const readPropertiesAction = () => async (dispatch) => {
    try {
        dispatch({ type: BUILDING_READ_REQUEST });
        const { data } = await axios.get(`/api/v1/properties/`, config);

        dispatch({
            type: BUILDING_READ_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: BUILDING_READ_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const updatePropertyAction = (property) => async (dispatch) => {
    try {
        dispatch({
            type: BUILDING_UPDATE_REQUEST,
        });

        const { data } = await axios.put(
            `/api/v1/properties/${property.slug}`,
            property,
            config
        );
        dispatch({
            type: BUILDING_UPDATE_SUCCESS,
        });
        toast.success(data?.data?.success);
        dispatch({
            type: BUILDING_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: BUILDING_UPDATE_FAIL,
        });
        errorToast(error);
    }
};

export const propertyDetailsAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BUILDING_DETAILS_REQUEST,
        });

        const { data } = await axios.get(`/api/v1/properties/${id}`, config);

        dispatch({
            type: BUILDING_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: BUILDING_DETAILS_FAIL,
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

export const deletePropertyAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BUILDING_DELETE_REQUEST,
        });

        const { data } = await axios.delete(`/api/v1/properties/${id}`, config);

        dispatch({
            type: BUILDING_DELETE_SUCCESS,
        });

        toast.success(data?.data?.success);
    } catch (error) {
        dispatch({
            type: BUILDING_DELETE_FAIL,
        });
        errorToast(error);
    }
};

// Property Types

export const readPropertyTypesAction = () => async (dispatch) => {
    try {
        dispatch({ type: BUILDING_TYPE_READ_REQUEST });
        const { data } = await axios.get(`/api/v1/property_types/`, config);

        dispatch({
            type: BUILDING_TYPE_READ_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: BUILDING_TYPE_READ_FAIL,
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

// Landlords

export const readLandlordPropertiesAction = () => async (dispatch) => {
    try {
        dispatch({ type: BUILDING_READ_REQUEST });
        const { data } = await axios.get(`/api/v1/my_properties/`, config);

        dispatch({
            type: BUILDING_READ_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: BUILDING_READ_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};
