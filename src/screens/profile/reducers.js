import { 
    PROFILE_READ_REQUEST,
    PROFILE_READ_SUCCESS,
    PROFILE_READ_FAIL,
    PROFILE_READ_RESET,

    PROFILE_UPDATE_REQUEST,
    PROFILE_UPDATE_SUCCESS,
    PROFILE_UPDATE_FAIL,
    PROFILE_UPDATE_RESET,

} from './constants';

export const profileReadReducer = (state = { profile:{} }, action) =>{
    switch(action.type) {
        case PROFILE_READ_REQUEST:
            return {loading: true, profile:{}}
        
        case PROFILE_READ_SUCCESS:
            return {
                        loading: false,
                        profile: action.payload.data.payload,
                        user_profile: action?.payload?.data?.payload?.profile
                    }
        case PROFILE_READ_FAIL:
            return {loading: false, error: action.payload}
        
        case PROFILE_READ_RESET:
            return { profile: {} }
        
        default:
            return state
    }
}


export const profileUpdateReducer = (state = { profile:{} }, action) => {
    switch(action.type) {
        case PROFILE_UPDATE_REQUEST:
            return { loading: true }
        
        case PROFILE_UPDATE_SUCCESS:
            return { loading: false, success: true }
        
        case PROFILE_UPDATE_FAIL:
            return { loading: false, error: action.payload }  
        
        case PROFILE_UPDATE_RESET:
            return { profile:{} }
             
        default:
            return state
    }
}


