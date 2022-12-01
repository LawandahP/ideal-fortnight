import {
    MAINTENANCE_CREATE_REQUEST,
    MAINTENANCE_CREATE_SUCCESS,
    MAINTENANCE_CREATE_FAIL,

    MAINTENANCE_READ_REQUEST,
    MAINTENANCE_READ_SUCCESS,
    MAINTENANCE_READ_FAIL,

    MAINTENANCE_UPDATE_REQUEST,
    MAINTENANCE_UPDATE_SUCCESS,
    MAINTENANCE_UPDATE_FAIL,

    MAINTENANCE_DELETE_REQUEST,
    MAINTENANCE_DELETE_SUCCESS,
    MAINTENANCE_DELETE_FAIL,
    
    MAINTENANCE_DETAILS_REQUEST,
    MAINTENANCE_DETAILS_SUCCESS,
    MAINTENANCE_DETAILS_FAIL,
    MAINTENANCE_DETAILS_RESET,

    

} from './constants';


export const maintenanceRequestCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case MAINTENANCE_CREATE_REQUEST:
            return {loading: true}
        
        case MAINTENANCE_CREATE_SUCCESS:
            return {loading: false, success: true, message: action.payload.data.success, maintenances: action.payload}

        
        case MAINTENANCE_CREATE_FAIL:
            return {loading: false, error: action.payload}
        
        // case MAINTENANCE_CREATE_RESET:
        //     return {}
        default:
            return state
    }
}


export const maintenanceReadReducer = (state = { maintenances:[] }, action) =>{
    switch(action.type) {
        case MAINTENANCE_READ_REQUEST:
            return {loading: true, maintenances:[]}
        
        case MAINTENANCE_READ_SUCCESS:
            return {
                        loading: false,
                        maintenances: action.payload.data.payload,
                        count: action.payload.data.count
                    }
        
        case MAINTENANCE_READ_FAIL:
            return {loading: false, error: action.payload}
        
        // case MAINTENANCE_READ_RESET:
        //     return { users: [] }
        
        default:
            return state
    }
}


export const maintenanceDetailsReducer = (state = { maintenance: {} }, action) => {
    switch(action.type) {
        case MAINTENANCE_DETAILS_REQUEST:
            return {loading: true, ...state}
        
        case MAINTENANCE_DETAILS_SUCCESS:
            return {loading: false, maintenance: action.payload.data.payload}
        
        case MAINTENANCE_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        
        case MAINTENANCE_DETAILS_RESET:
            return {maintenance: {} }
        
        default:
            return state
    }
}


export const maintenanceUpdateReducer = (state = { maintenance:{} }, action) => {
    switch(action.type) {
        case MAINTENANCE_UPDATE_REQUEST:
            return { loading: true }
        
        case MAINTENANCE_UPDATE_SUCCESS:
            return { loading: false, success: true, message: action?.payload?.data?.message }
        
        case MAINTENANCE_UPDATE_FAIL:
            return { loading: false, error: action.payload }  
        
        // case MAINTENANCE_UPDATE_RESET:
        //     return { maintenance:{} }
             
        default:
            return state
    }
}



export const maintenanceDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case MAINTENANCE_DELETE_REQUEST:
            return { loading: true }
        
        case MAINTENANCE_DELETE_SUCCESS:
            return { loading: false, success: true, message: action?.payload?.data?.success }
        
        case MAINTENANCE_DELETE_FAIL:
            return { loading: false, error: action.payload }  
             
        default:
            return state
    }
}

