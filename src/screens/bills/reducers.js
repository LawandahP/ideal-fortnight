import {
    BILL_CREATE_REQUEST,
    BILL_CREATE_SUCCESS,
    BILL_CREATE_FAIL,

    BILL_READ_REQUEST,
    BILL_READ_SUCCESS,
    BILL_READ_FAIL,

    BILL_UPDATE_REQUEST,
    BILL_UPDATE_SUCCESS,
    BILL_UPDATE_FAIL,

    BILL_DETAILS_REQUEST,
    BILL_DETAILS_SUCCESS,
    BILL_DETAILS_FAIL,
    
    BILL_DELETE_REQUEST,
    BILL_DELETE_SUCCESS,
    BILL_DELETE_FAIL,
    
} from './constants';


export const billRequestCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case BILL_CREATE_REQUEST:
            return {loading: true}
        
        case BILL_CREATE_SUCCESS:
            return {
                        loading: false, 
                        success: action.payload.data.success, 
                        message: action.payload.data.success, 
                        bills: action.payload
                    }

        
        case BILL_CREATE_FAIL:
            return {loading: false, error: action.payload}
        
        // case BILL_CREATE_RESET:
        //     return {}
        default:
            return state
    }
}


export const billReadReducer = (state = { bills:[] }, action) =>{
    switch(action.type) {
        case BILL_READ_REQUEST:
            return {loading: true, bills:[]}
        
        case BILL_READ_SUCCESS:
            return {
                        loading: false,
                        bills: action.payload.data.payload,
                        count: action.payload.data.count
                    }
        
        case BILL_READ_FAIL:
            return {loading: false, error: action.payload}
        
        // case BILL_READ_RESET:
        //     return { bills: [] }
        
        default:
            return state
    }
}


export const billDetailsReducer = (state = { bill: {} }, action) => {
    switch(action.type) {
        case BILL_DETAILS_REQUEST:
            return {loading: true, ...state}
        
        case BILL_DETAILS_SUCCESS:
            return {loading: false, success: true, bill: action.payload.data.payload}
        
        case BILL_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        
        // case BILL_DETAILS_RESET:
        //     return {bill: {} }
        
        default:
            return state
    }
}


export const billUpdateReducer = (state = { bill:{} }, action) => {
    switch(action.type) {
        case BILL_UPDATE_REQUEST:
            return { loading: true }
        
        case BILL_UPDATE_SUCCESS:
            return { loading: false, success: true, message: "Bill Update Successfully" }
        
        case BILL_UPDATE_FAIL:
            return { loading: false, error: action.payload }  
        
        // case BILL_UPDATE_RESET:
        //     return { bill:{} }
             
        default:
            return state
    }
}



export const billDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case BILL_DELETE_REQUEST:
            return { loading: true }
        
        case BILL_DELETE_SUCCESS:
            return { 
                loading: false, 
                success: true, 
                message: "Bill Deleted Successfully",
            }
        
        case BILL_DELETE_FAIL:
            return { loading: false, error: action.payload }  
             
        default:
            return state
    }
}
