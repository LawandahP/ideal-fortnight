import { 
    TENANT_CREATE_REQUEST,
    TENANT_CREATE_SUCCESS,
    TENANT_CREATE_FAIL,
    TENANT_CREATE_RESET,

    TENANT_READ_REQUEST,
    TENANT_READ_SUCCESS,
    TENANT_READ_FAIL,
    TENANT_READ_RESET,

    TENANT_UPDATE_REQUEST,
    TENANT_UPDATE_SUCCESS,
    TENANT_UPDATE_FAIL,
    TENANT_UPDATE_RESET,

    TENANT_DELETE_REQUEST,
    TENANT_DELETE_SUCCESS,
    TENANT_DELETE_FAIL,
    
    TENANT_DETAILS_REQUEST,
    TENANT_DETAILS_SUCCESS,
    TENANT_DETAILS_FAIL,
    TENANT_DETAILS_RESET,

} from './constants';


export const tenantCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case TENANT_CREATE_REQUEST:
            return {loading: true}
        
        case TENANT_CREATE_SUCCESS:
            return {loading: false, success: true, message: action.payload.data.message, tenants: action.payload}
        
        case TENANT_CREATE_FAIL:
            return {loading: false, error: action.payload}
        
        case TENANT_CREATE_RESET:
            return {}
        default:
            return state
    }
}


export const tenantReadReducer = (state = { tenants:[] }, action) =>{
    switch(action.type) {
        case TENANT_READ_REQUEST:
            return {loading: true, tenants:[]}
        
        case TENANT_READ_SUCCESS:
            return {
                        loading: false,
                        tenants: action.payload.data.payload,
                        count: action.payload.data.count
                    }
        
        case TENANT_READ_FAIL:
            return {loading: false, error: action.payload}
        
        case TENANT_READ_RESET:
            return { users: [] }
        
        default:
            return state
    }
}


export const tenantDetailsReducer = (state = { tenant: {} }, action) => {
    switch(action.type) {
        case TENANT_DETAILS_REQUEST:
            return {loading: true, ...state}
        
        case TENANT_DETAILS_SUCCESS:
            return {
                        loading: false, 
                        tenant: action.payload.data.payload, 
                        extra: action?.payload?.data?.extra,

                        unit: action?.payload?.data?.extra?.unit,
                        leases: action?.payload?.data?.extra?.lease,
                        property: action?.payload?.data?.extra?.property,
                        maintenances: action?.payload?.data?.extra?.maintenances
                    }
        
        case TENANT_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        
        case TENANT_DETAILS_RESET:
            return {tenant: {} }
        
        default:
            return state
    }
}


export const tenantUpdateReducer = (state = { tenant:{} }, action) => {
    switch(action.type) {
        case TENANT_UPDATE_REQUEST:
            return { loading: true }
        
        case TENANT_UPDATE_SUCCESS:
            return { loading: false, success: true, message: action?.payload?.data?.message }
        
        case TENANT_UPDATE_FAIL:
            return { loading: false, error: action.payload }  
        
        case TENANT_UPDATE_RESET:
            return { tenant:{} }
             
        default:
            return state
    }
}


export const tenantDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case TENANT_DELETE_REQUEST:
            return { loading: true }
        
        case TENANT_DELETE_SUCCESS:
            return { loading: false, success: true, message: action?.payload?.data?.message }
        
        case TENANT_DELETE_FAIL:
            return { loading: false, error: action.payload }  
             
        default:
            return state
    }
}

