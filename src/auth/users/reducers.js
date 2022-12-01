import { 
    USER_SIGN_UP_REQUEST, 
    USER_SIGN_UP_SUCCESS, 
    USER_SIGN_UP_FAIL,

    USER_SIGN_IN_REQUEST,
    USER_SIGN_IN_SUCCESS,
    USER_SIGN_IN_FAIL,

    GET_CURRENT_USER_REQUEST,
    GET_CURRENT_USER_SUCCESS,
    GET_CURRENT_USER_FAIL,

    PASSWORD_RESET_REQUEST,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,

    PASSWORD_RESET_CONFIRM_REQUEST,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL
    
} from './constants';


export const userSignInReducer = (state = { }, action) =>{
    switch(action.type) {
        case USER_SIGN_IN_REQUEST:
            return {loading: true}
        
        case USER_SIGN_IN_SUCCESS:
            return {loading: false, success: true, userInfo: action.payload}
        
        case USER_SIGN_IN_FAIL:
            return {loading: false, error: action.payload}
        
        // case USER_LOGOUT:
        //     return {}

        default:
            return state
    }
}


export const userSignUpReducer = (state = { }, action) =>{
    switch(action.type) {
        case USER_SIGN_UP_REQUEST:
            return {loading: true}
        
        case USER_SIGN_UP_SUCCESS:  
            return {loading: false, success: true, userInfo: action.payload.data, message: action.payload.data.message}
        
        case USER_SIGN_UP_FAIL:
            return {loading: false, error: action.payload}
        
        // case USER_LOGOUT:
        //     return {}   
             
        default:
            return state
    }
}


// export const getCurrentUserReducer = (state = { currentUser:{} }, action) =>{
//     switch(action.type) {
//         case GET_CURRENT_USER_REQUEST:
//             return {loading: true, currentUser:{}}
        
//         case GET_CURRENT_USER_SUCCESS:
//             return {
//                         loading: false,
//                         currentUser: action.payload.data.payload,
//                     }
        
//         case GET_CURRENT_USER_FAIL:
//             return {loading: false, error: action.payload}
        
//         // case GET_CURRENT_USER_FAIL:
//         //     return { currentUser: {} }
        
//         default:
//             return state
//     }
// }

export const resetPasswordWithEmailReducer = (state = { }, action) =>{
    switch(action.type) {
        case PASSWORD_RESET_REQUEST:
            return {loading: true}
        
        case PASSWORD_RESET_SUCCESS:  
            return {loading: false, success: true, message: action?.payload?.data?.payload?.message}
        
        case PASSWORD_RESET_FAIL:
            return {loading: false, error: action.payload}
        
        // case USER_LOGOUT:
        //     return {}   
             
        default:
            return state
    }
}