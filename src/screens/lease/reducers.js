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
    LEASE_DELETE_FAIL 

} from './constants';


export const leaseRequestCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case LEASE_CREATE_REQUEST:
            return {loading: true}
        
        case LEASE_CREATE_SUCCESS:
            return {
                        loading: false, 
                        success: true, 
                        message: action.payload.data.success, 
                        leases: action.payload
                    }

        
        case LEASE_CREATE_FAIL:
            return {loading: false, error: action.payload}
        
        // case LEASE_CREATE_RESET:
        //     return {}
        default:
            return state
    }
}


export const leaseReadReducer = (state = { leases:[] }, action) =>{
    switch(action.type) {
        case LEASE_READ_REQUEST:
            return {loading: true, leases:[]}
        
        case LEASE_READ_SUCCESS:
            return {
                        loading: false,
                        leases: action.payload.data.payload,
                        count: action.payload.data.count
                    }
        
        case LEASE_READ_FAIL:
            return {loading: false, error: action.payload}
        
        // case LEASE_READ_RESET:
        //     return { users: [] }
        
        default:
            return state
    }
}


// export const leaseDetailsReducer = (state = { lease: {} }, action) => {
//     switch(action.type) {
//         case LEASE_DETAILS_REQUEST:
//             return {loading: true, ...state}
        
//         case LEASE_DETAILS_SUCCESS:
//             return {loading: false, lease: action.payload.data.payload}
        
//         case LEASE_DETAILS_FAIL:
//             return {loading: false, error: action.payload}
        
//         case LEASE_DETAILS_RESET:
//             return {lease: {} }
        
//         default:
//             return state
//     }
// }


export const leaseUpdateReducer = (state = { lease:{} }, action) => {
    switch(action.type) {
        case LEASE_UPDATE_REQUEST:
            return { loading: true }
        
        case LEASE_UPDATE_SUCCESS:
            return { loading: false, success: true, message: action.payload.data.success }
        
        case LEASE_UPDATE_FAIL:
            return { loading: false, error: action.payload }  
        
        // case LEASE_UPDATE_RESET:
        //     return { lease:{} }
             
        default:
            return state
    }
}



export const leaseDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case LEASE_DELETE_REQUEST:
            return { loading: true }
        
        case LEASE_DELETE_SUCCESS:
            return { 
                loading: false, 
                success: true, 
                message: "Lease Deleted Successfully",
            }
        
        case LEASE_DELETE_FAIL:
            return { loading: false, error: action.payload }  
             
        default:
            return state
    }
}

