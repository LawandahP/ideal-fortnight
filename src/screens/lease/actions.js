import axios from "axios";
import { toast } from "react-toastify";
import { List } from "../../components/display/elements";

import { errorToast } from "../../utils/globalFunc";

import {
    LEASE_CREATE_REQUEST,
    LEASE_CREATE_SUCCESS,
    LEASE_CREATE_FAIL,
    LEASE_READ_REQUEST,
    LEASE_READ_SUCCESS,
    LEASE_READ_FAIL,
    LEASE_UPDATE_REQUEST,
    LEASE_UPDATE_SUCCESS,
    LEASE_UPDATE_FAIL,
    LEASE_DELETE_REQUEST,
    LEASE_DELETE_SUCCESS,
    LEASE_DELETE_FAIL,
    LEASE_CREATE_RESET,
} from "./constants";

const config = {
    withCredentials: true,
    // headers: {
    //     'Content-type':'multipart/form-data'
    // }
};

export const createLeaseAction =
    (lease, total_invoices) => async (dispatch, getState) => {
        try {
            dispatch({
                type: LEASE_CREATE_REQUEST,
            });

            const { data } = await axios.post(
                `/api/v1/lease/?total_invoices=${total_invoices}`,
                lease,
                config
            );
            toast.success(data?.data?.success);

            dispatch({
                type: LEASE_CREATE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: LEASE_CREATE_FAIL,
            });
            errorToast(error);
        }
    };

// Object.values(error.response.data.detail)
export const readLeasesAction = () => async (dispatch) => {
    try {
        dispatch({ type: LEASE_READ_REQUEST });
        const { data } = await axios.get(`/api/v1/lease/`, config);

        dispatch({
            type: LEASE_READ_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: LEASE_READ_FAIL,
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

export const updateLeaseAction = (lease) => async (dispatch) => {
    try {
        dispatch({
            type: LEASE_UPDATE_REQUEST,
        });

        const configure = {
            withCredentials: true,
        };

        const { data } = await axios.patch(
            `/api/v1/lease/${lease.id}`,
            lease,
            configure
        );

        dispatch({
            type: LEASE_UPDATE_SUCCESS,
            payload: data,
        });
        toast.success(data?.data?.success);
    } catch (error) {
        dispatch({
            type: LEASE_UPDATE_FAIL,
        });
        errorToast(error);
    }
};

export const deleteLeaseAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: LEASE_DELETE_REQUEST,
        });

        const { data } = await axios.delete(`/api/v1/lease/${id}`, config);

        dispatch({
            type: LEASE_DELETE_SUCCESS,
        });
        toast.success(data?.data?.success);
    } catch (error) {
        dispatch({
            type: LEASE_DELETE_FAIL,
        });
        errorToast(error);
    }
};

// export const leaseDetailsAction = (id) => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: LEASE_DETAILS_REQUEST
//         })

//         const { data } = await axios.get(
//             `/leases/${id}`,
//             config
//         )

//         dispatch({
//             type: LEASE_DETAILS_SUCCESS,
//             payload: data
//         })

//     } catch (error) {
//         dispatch({
//             type: LEASE_DETAILS_FAIL,
//             payload: error.response && error.response.data.detail
//                 <>
//                     {Object.keys(error.response.data.detail).map(function (s) {
//                         return (
//                             <List>{error.response.data.detail[s]}</List>
//                         )
//                     })}
//                 </>
//                 : error.message
//         })

//     }
// }
