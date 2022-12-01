import axios from "axios";
import { List } from "../../components/display/elements";
import { config } from "../../utils/globalFunc";

import {
    ACCOUNT_CREATE_REQUEST,
    ACCOUNT_CREATE_SUCCESS,
    ACCOUNT_CREATE_FAIL,
    ACCOUNT_READ_REQUEST,
    ACCOUNT_READ_SUCCESS,
    ACCOUNT_READ_FAIL,
    ACCOUNT_UPDATE_REQUEST,
    ACCOUNT_UPDATE_SUCCESS,
    ACCOUNT_UPDATE_FAIL,
    ACCOUNT_DETAILS_REQUEST,
    ACCOUNT_DETAILS_SUCCESS,
    ACCOUNT_DETAILS_FAIL,
    ACCOUNT_DELETE_REQUEST,
    ACCOUNT_DELETE_SUCCESS,
    ACCOUNT_DELETE_FAIL,
} from "./constants";

export const updateAccountAction = (account) => async (dispatch) => {
    try {
        dispatch({
            type: ACCOUNT_UPDATE_REQUEST,
        });

        const { data } = await axios.put(`/api/v1/account/`, account, config);
        dispatch({
            type: ACCOUNT_UPDATE_SUCCESS,
        });
        dispatch({
            type: ACCOUNT_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ACCOUNT_UPDATE_FAIL,
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

export const accountDetailsAction = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ACCOUNT_DETAILS_REQUEST,
        });

        const { data } = await axios.get(`/api/v1/account/`, config);

        dispatch({
            type: ACCOUNT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ACCOUNT_DETAILS_FAIL,
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

export const deleteAccountAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ACCOUNT_DELETE_REQUEST,
        });

        const { data } = await axios.delete(`/api/v1/account/${id}`, config);

        dispatch({
            type: ACCOUNT_DELETE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: ACCOUNT_DELETE_FAIL,
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
