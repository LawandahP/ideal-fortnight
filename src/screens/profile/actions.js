import axios from "axios";
import { List } from "../../components/display/elements";

import { config } from "../../utils/globalFunc";

import {
    PROFILE_READ_REQUEST,
    PROFILE_READ_SUCCESS,
    PROFILE_READ_FAIL,
    PROFILE_READ_RESET,
    PROFILE_UPDATE_REQUEST,
    PROFILE_UPDATE_SUCCESS,
    PROFILE_UPDATE_FAIL,
    PROFILE_UPDATE_RESET,
} from "./constants";

// Object.values(error.response.data.detail)
export const readProfileAction = () => async (dispatch) => {
    try {
        dispatch({ type: PROFILE_READ_REQUEST });
        const { data } = await axios.get(`/api/v1/me/`, config);

        dispatch({
            type: PROFILE_READ_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PROFILE_READ_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const updateProfileAction = (profile) => async (dispatch) => {
    try {
        dispatch({
            type: PROFILE_UPDATE_REQUEST,
        });

        const { data } = await axios.put(`/api/v1/me/`, profile, config);
        dispatch({
            type: PROFILE_UPDATE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: PROFILE_UPDATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? Object.values(error.response.data.detail)
                    : error.message,
        });
    }
};
