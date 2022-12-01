import { 
    PAYMENT_CREATE_REQUEST,
    PAYMENT_CREATE_SUCCESS,
    PAYMENT_CREATE_FAIL,
    PAYMENT_CREATE_RESET,

    PAYMENT_READ_REQUEST,
    PAYMENT_READ_SUCCESS,
    PAYMENT_READ_FAIL,
    PAYMENT_READ_RESET,

    PAYMENT_UPDATE_REQUEST,
    PAYMENT_UPDATE_SUCCESS,
    PAYMENT_UPDATE_FAIL,
    PAYMENT_UPDATE_RESET,
   
    PAYMENT_DETAILS_REQUEST,
    PAYMENT_DETAILS_SUCCESS,
    PAYMENT_DETAILS_FAIL,
    PAYMENT_DETAILS_RESET,

    PAYMENT_DELETE_REQUEST,
    PAYMENT_DELETE_SUCCESS,
    PAYMENT_DELETE_FAIL,
    PAYMENT_DELETE_RESET,

} from './constants';


export const paymentCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case PAYMENT_CREATE_REQUEST:
            return {loading: true}
        
        case PAYMENT_CREATE_SUCCESS:
            return {loading: false, success: true, message: action?.payload?.data?.message}
        
        case PAYMENT_CREATE_FAIL:
            return {loading: false, error: action.payload}
        
        case PAYMENT_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const paymentReadReducer = (state = { payments:[] }, action) =>{
    switch(action.type) {
        case PAYMENT_READ_REQUEST:
            return {loading: true, payments:[]}
        
        case PAYMENT_READ_SUCCESS:
            return {
                        loading: false,
                        success: true,
                        payments: action.payload.data.payload,
                        count: action.payload.data.count
                    }
        
        case PAYMENT_READ_FAIL:
            return {loading: false, error: action.payload}
        
        case PAYMENT_READ_RESET:
            return { payments: [] }
        
        default:
            return state
    }
}

export const paymentDetailsReducer = (state = { payment: {} }, action) => {
    switch(action.type) {
        case PAYMENT_DETAILS_REQUEST:
            return {loading: true, ...state}
        
        case PAYMENT_DETAILS_SUCCESS:
            return {loading: false, payment: action.payload.data.payload}
        
        case PAYMENT_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        
        case PAYMENT_DETAILS_RESET:
            return {payment: {} }
        
        default:
            return state
    }
}

export const paymentUpdateReducer = (state = { payment:{} }, action) => {
    switch(action.type) {
        case PAYMENT_UPDATE_REQUEST:
            return { loading: true }
        
        case PAYMENT_UPDATE_SUCCESS:
            return { loading: false, success: true }
        
        case PAYMENT_UPDATE_FAIL:
            return { loading: false, error: action.payload }  
        
        case PAYMENT_UPDATE_RESET:
            return { payment:{} }
             
        default:
            return state
    }
}

export const paymentDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case PAYMENT_DELETE_REQUEST:
            return { loading: true }
        
        case PAYMENT_DELETE_SUCCESS:
            return { loading: false, success: true }
        
        case PAYMENT_DELETE_FAIL:
            return { loading: false, error: action.payload }  
             
        default:
            return state
    }
}