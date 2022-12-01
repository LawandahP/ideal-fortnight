import { 
    LANDLORD_CREATE_REQUEST,
    LANDLORD_CREATE_SUCCESS,
    LANDLORD_CREATE_FAIL,
    LANDLORD_CREATE_RESET,

    LANDLORD_READ_REQUEST,
    LANDLORD_READ_SUCCESS,
    LANDLORD_READ_FAIL,
    LANDLORD_READ_RESET,

    LANDLORD_UPDATE_REQUEST,
    LANDLORD_UPDATE_SUCCESS,
    LANDLORD_UPDATE_FAIL,
    LANDLORD_UPDATE_RESET,

    LANDLORD_DELETE_REQUEST,
    LANDLORD_DELETE_SUCCESS,
    LANDLORD_DELETE_FAIL,
    
    LANDLORD_DETAILS_REQUEST,
    LANDLORD_DETAILS_SUCCESS,
    LANDLORD_DETAILS_FAIL,
    LANDLORD_DETAILS_RESET,

} from './constants';


export const landlordCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case LANDLORD_CREATE_REQUEST:
            return {loading: true}
        
        case LANDLORD_CREATE_SUCCESS:
            return {loading: false, success: true, message: action.success, landlords: action.payload}
        
        case LANDLORD_CREATE_FAIL:
            return {loading: false, error: action.payload}
        
        case LANDLORD_CREATE_RESET:
            return {}
        default:
            return state
    }
}


export const landlordReadReducer = (state = { landlords:[] }, action) =>{
    switch(action.type) {
        case LANDLORD_READ_REQUEST:
            return {loading: true, landlords:[]}
        
        case LANDLORD_READ_SUCCESS:
            return {
                        loading: false,
                        landlords: action.payload.data.payload,
                        count: action.payload.data.count
                    }
        
        case LANDLORD_READ_FAIL:
            return {loading: false, error: action.payload}
        
        case LANDLORD_READ_RESET:
            return { users: [] }
        
        default:
            return state
    }
}


export const landlordDetailsReducer = (state = { landlord: {} }, action) => {
    switch(action.type) {
        case LANDLORD_DETAILS_REQUEST:
            return {loading: true, ...state}
        
        case LANDLORD_DETAILS_SUCCESS:
            return {
                loading: false,
                landlord: action.payload.data?.payload,
                properties: action.payload.data?.extra?.properties,
                properties_count: action.payload.data?.extra?.properties_count,
                unit_count: action.payload.data?.extra?.unit_count,
                tenant_count: action.payload.data?.extra?.tenant_count
            }
        
        case LANDLORD_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        
        case LANDLORD_DETAILS_RESET:
            return {landlord: {} }
        
        default:
            return state
    }
}


export const landlordUpdateReducer = (state = { landlord:{} }, action) => {
    switch(action.type) {
        case LANDLORD_UPDATE_REQUEST:
            return { loading: true }
        
        case LANDLORD_UPDATE_SUCCESS:
            return { loading: false, success: true, message: action?.payload?.data?.message }
        
        case LANDLORD_UPDATE_FAIL:
            return { loading: false, error: action.payload }  
        
        case LANDLORD_UPDATE_RESET:
            return { landlord:{} }
             
        default:
            return state
    }
}



export const landlordDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case LANDLORD_DELETE_REQUEST:
            return { loading: true }
        
        case LANDLORD_DELETE_SUCCESS:
            return { loading: false, success: true }
        
        case LANDLORD_DELETE_FAIL:
            return { loading: false, error: action.payload }  
             
        default:
            return state
    }
}

