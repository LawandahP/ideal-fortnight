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
    
} from './constants';



export const accountDetailsReducer = (state = { account: {} }, action) => {
    switch(action.type) {
        case ACCOUNT_DETAILS_REQUEST:
            return {loading: true, ...state}
        
        case ACCOUNT_DETAILS_SUCCESS:
            return {loading: false, success: true, account: action.payload.data.payload}
        
        case ACCOUNT_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        
        // case ACCOUNT_DETAILS_RESET:
        //     return {account: {} }
        
        default:
            return state
    }
}


export const accountUpdateReducer = (state = { account:{} }, action) => {
    switch(action.type) {
        case ACCOUNT_UPDATE_REQUEST:
            return { loading: true }
        
        case ACCOUNT_UPDATE_SUCCESS:
            return { loading: false, success: true, message: "Account Updated Successfully" }
        
        case ACCOUNT_UPDATE_FAIL:
            return { loading: false, error: action.payload }  
        
        // case ACCOUNT_UPDATE_RESET:
        //     return { account:{} }
             
        default:
            return state
    }
}



export const accountDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case ACCOUNT_DELETE_REQUEST:
            return { loading: true }
        
        case ACCOUNT_DELETE_SUCCESS:
            return { 
                loading: false, 
                success: true, 
                message: "Account Deleted Successfully",
            }
        
        case ACCOUNT_DELETE_FAIL:
            return { loading: false, error: action.payload }  
             
        default:
            return state
    }
}
