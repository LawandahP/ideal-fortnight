import axios from 'axios';
import { config, errorToast } from '../../utils/globalFunc'

import { 
    USER_SIGN_UP_REQUEST, 
    USER_SIGN_UP_SUCCESS, 
    USER_SIGN_UP_FAIL,

    USER_SIGN_IN_REQUEST,
    USER_SIGN_IN_SUCCESS,
    USER_SIGN_IN_FAIL,

    USER_LOGOUT,

    PASSWORD_RESET_REQUEST,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_REQUEST,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    
} from './constants';

import { List } from '../../components/display/elements';
import { deleteCookie } from './cookies';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export const signInUserAction = (user) => async (dispatch) => {
    try {
        dispatch({
            type: USER_SIGN_IN_REQUEST
        })

        const { data } = await axios.post(
            `/auth/login/`,
            user,
        )
        dispatch({
            type: USER_SIGN_IN_SUCCESS,
            payload: data
        })


        localStorage.setItem('theme', "")
        localStorage.setItem(
            "invoice_filter", 
            JSON.stringify({"status": "", "date_month": new Date().getMonth() + 1, "date_year": new Date().getFullYear(), "property": ""})
        )
        

    } catch(error) {
        dispatch({
            type: USER_SIGN_IN_FAIL,
            payload: error.response && error.response.data.detail
                ?   <>
                    {Object.keys(error.response.data.detail).map(function(s) {
                        return (
                            <List>{error.response.data.detail[s]}</List>
                        )})}
                    </> 
                : error.message
        })
    }
}

export const signUpUserAction = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_SIGN_UP_REQUEST
        })
        const { data } = await axios.post(
            `/auth/signup/`,
            user,
        )
        dispatch({
            type: USER_SIGN_UP_SUCCESS,
            success: true,
            payload: data
        })
        toast.success(data?.data?.success)
        localStorage.setItem(
            "invoice_filter", 
            JSON.stringify({"status": "", "date_month": new Date().getMonth() + 1, "date_year": new Date().getFullYear(), "property": ""})
        )
    } catch(error) {
        dispatch({
            type: USER_SIGN_UP_FAIL
        })
        errorToast(error)

    }
}




export const logout = () => (dispatch) => {
    // localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    deleteCookie("access_token")   
}



// export const getCurrentUserAction = () => async (dispatch, getState) => {
//     try {
//         dispatch({ type: GET_CURRENT_USER_REQUEST})
//         const {data} = axios.get('me/', config)

//         dispatch({ type: GET_CURRENT_USER_SUCCESS, payload: data })

//     } catch(error) {
//         dispatch({
//             type: GET_CURRENT_USER_FAIL,
//             payload: error.response && error.response.data.detail
//                 ?   <>
//                         { Object.keys(error.response.data.detail).map(function(s) {
//                             return(
//                                 <List>{error.response.data.detail[s]}</List>
//                             )
//                         })}
//                     </>
//                 : error.message
//         })
//     }
// }



export const resetPasswordWithEmailAction = (email) => async (dispatch) => {
    try {
        dispatch({
            type: PASSWORD_RESET_REQUEST
        })
        const { data } = await axios.post(
            `/api/v1/auth/reset_password_email/`,
            email,
            config
        )
        dispatch({
            type: PASSWORD_RESET_SUCCESS,
            success: true,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: PASSWORD_RESET_FAIL,
            payload: error.response && error.response.data.detail
                ?   <>
                    {Object.keys(error.response.data.detail).map(function(s) {
                        return (
                            <List>{error.response.data.detail[s]}</List>
                        )})}
                    </> 
                : error.message
        })

    }
}

export const resetPasswordConfirmAction = (token) => async (dispatch) => {
    try {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_REQUEST
        })
        const { data } = await axios.post(
            `/api/v1/auth/reset_password_email/`,
            token,
            config
        )

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS,
            success: true,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL,
            payload: error.response && error.response.data.detail
                ?   <>
                    {Object.keys(error.response.data.detail).map(function(s) {
                        return (
                            <List>{error.response.data.detail[s]}</List>
                        )})}
                    </> 
                : error.message
        })

    }
}