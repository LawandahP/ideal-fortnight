import { 
    UNIT_CREATE_REQUEST,
    UNIT_CREATE_SUCCESS,
    UNIT_CREATE_FAIL,
    UNIT_CREATE_RESET,

    UNIT_READ_REQUEST,
    UNIT_READ_SUCCESS,
    UNIT_READ_FAIL,
    UNIT_READ_RESET,

    UNIT_UPDATE_REQUEST,
    UNIT_UPDATE_SUCCESS,
    UNIT_UPDATE_FAIL,
    UNIT_UPDATE_RESET,

    UNIT_DELETE_REQUEST,
    UNIT_DELETE_SUCCESS,
    UNIT_DELETE_FAIL,
    
    UNIT_DETAILS_REQUEST,
    UNIT_DETAILS_SUCCESS,
    UNIT_DETAILS_FAIL,
    UNIT_DETAILS_RESET,

    UNIT_TYPE_READ_REQUEST,
    UNIT_TYPE_READ_SUCCESS,
    UNIT_TYPE_READ_FAIL

} from './constants';


export const unitCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case UNIT_CREATE_REQUEST:
            return {loading: true}
        
        case UNIT_CREATE_SUCCESS:
            return {loading: false, success: true, message: action.success, units: action.payload}
        
        case UNIT_CREATE_FAIL:
            return {loading: false, error: action.payload}
        
        case UNIT_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const unitReadReducer = (state = { units:[] }, action) =>{
    switch(action.type) {
        case UNIT_READ_REQUEST:
            return {loading: true, units:[]}
        
        case UNIT_READ_SUCCESS:
            return {
                        loading: false,
                        success: true,
                        units: action.payload.data.payload,
                        count: action.payload.data.count
                    }
        
        case UNIT_READ_FAIL:
            return {loading: false, error: action.payload}
        
        case UNIT_READ_RESET:
            return { units: [] }
        
        default:
            return state
    }
}

export const unitDetailsReducer = (state = { unit: {} }, action) => {
    switch(action.type) {
        case UNIT_DETAILS_REQUEST:
            return {loading: true, ...state}
        
        case UNIT_DETAILS_SUCCESS:
            return {loading: false, unit: action.payload.data.payload}
        
        case UNIT_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        
        case UNIT_DETAILS_RESET:
            return {unit: {} }
        
        default:
            return state
    }
}

export const unitUpdateReducer = (state = { unit:{} }, action) => {
    switch(action.type) {
        case UNIT_UPDATE_REQUEST:
            return { loading: true }
        
        case UNIT_UPDATE_SUCCESS:
            return { loading: false, success: true, message: action.success }
        
        case UNIT_UPDATE_FAIL:
            return { loading: false, error: action.payload }  
        
        case UNIT_UPDATE_RESET:
            return { unit:{} }
             
        default:
            return state
    }
}

export const unitDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case UNIT_DELETE_REQUEST:
            return { loading: true }
        
        case UNIT_DELETE_SUCCESS:
            return { loading: false, success: true }
        
        case UNIT_DELETE_FAIL:
            return { loading: false, error: action.payload }  
             
        default:
            return state
    }
}

// Unit types Reducer
export const unitTypeReadReducer = (state = { unit_types:[] }, action) =>{
    switch(action.type) {
        case UNIT_TYPE_READ_REQUEST:
            return {loading: true, unit_types:[]}
        
        case UNIT_READ_SUCCESS:
            return {
                        loading: false,
                        unit_types: action.payload.data.payload,
                        count: action.payload.data.count
                    }
        
        case UNIT_READ_FAIL:
            return {loading: false, error: action.payload}
        
        case UNIT_READ_RESET:
            return { unit_types: [] }
        
        default:
            return state
    }
}