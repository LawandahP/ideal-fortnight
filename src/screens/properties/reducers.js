import {
    BUILDING_CREATE_REQUEST,
    BUILDING_CREATE_SUCCESS,
    BUILDING_CREATE_FAIL,
    BUILDING_CREATE_RESET,

    BUILDING_READ_REQUEST,
    BUILDING_READ_SUCCESS,
    BUILDING_READ_FAIL,
    BUILDING_READ_RESET,

    BUILDING_UPDATE_REQUEST,
    BUILDING_UPDATE_SUCCESS,
    BUILDING_UPDATE_FAIL,
    BUILDING_UPDATE_RESET,

    BUILDING_DELETE_REQUEST,
    BUILDING_DELETE_SUCCESS,
    BUILDING_DELETE_FAIL,

    BUILDING_DETAILS_REQUEST,
    BUILDING_DETAILS_SUCCESS,
    BUILDING_DETAILS_FAIL,
    BUILDING_DETAILS_RESET,

    BUILDING_TYPE_READ_REQUEST,
    BUILDING_TYPE_READ_SUCCESS,
    BUILDING_TYPE_READ_FAIL

} from './constants';


export const propertyCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case BUILDING_CREATE_REQUEST:
            return { loading: true }

        case BUILDING_CREATE_SUCCESS:
            return { loading: false, success: true, message: action.success, properties: action.payload?.data?.message }

        case BUILDING_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case BUILDING_CREATE_RESET:
            return {}
        default:
            return state
    }
}


export const propertyReadReducer = (state = { properties: [] }, action) => {
    switch (action.type) {
        case BUILDING_READ_REQUEST:
            return { loading: true, properties: [] }

        case BUILDING_READ_SUCCESS:
            return {
                loading: false,
                success: true,
                properties: action.payload.data.payload,
                count: action.payload.data.count
            }

        case BUILDING_READ_FAIL:
            return { loading: false, error: action.payload }

        case BUILDING_READ_RESET:
            return { properties: [] }

        default:
            return state
    }
}


export const propertyDetailsReducer = (state = { property: {} }, action) => {
    switch (action.type) {
        case BUILDING_DETAILS_REQUEST:
            return { loading: true, ...state }

        case BUILDING_DETAILS_SUCCESS:
            return { loading: false, property: action.payload.data.payload, units: action?.payload?.data?.extra?.units }

        case BUILDING_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        case BUILDING_DETAILS_RESET:
            return { property: {} }

        default:
            return state
    }
}


export const propertyUpdateReducer = (state = { property: {} }, action) => {
    switch (action.type) {
        case BUILDING_UPDATE_REQUEST:
            return { loading: true }

        case BUILDING_UPDATE_SUCCESS:
            return { loading: false, success: true, message: action?.payload?.data?.message}

        case BUILDING_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case BUILDING_UPDATE_RESET:
            return { property: {} }

        default:
            return state
    }
}



export const propertyDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case BUILDING_DELETE_REQUEST:
            return { loading: true }

        case BUILDING_DELETE_SUCCESS:
            return { loading: false, success: true }

        case BUILDING_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


// Property types Reducer

export const propertyTypeReadReducer = (state = { property_types: [] }, action) => {
    switch (action.type) {
        case BUILDING_TYPE_READ_REQUEST:
            return { loading: true, property_types: [] }

        case BUILDING_READ_SUCCESS:
            return {
                loading: false,
                property_types: action.payload.data.payload,
                count: action.payload.data.count
            }

        case BUILDING_READ_FAIL:
            return { loading: false, error: action.payload }

        case BUILDING_READ_RESET:
            return { property_types: [] }

        default:
            return state
    }
}




// Landlords Properties

export const landlordPropertyReadReducer = (state = { properties: [] }, action) => {
    switch (action.type) {
        case BUILDING_READ_REQUEST:
            return { loading: true, landlordProperties: [] }

        case BUILDING_READ_SUCCESS:
            return {
                loading: false,
                success: true,
                properties: action.payload.data.payload,
                count: action.payload.data.count
            }

        case BUILDING_READ_FAIL:
            return { loading: false, error: action.payload }

        case BUILDING_READ_RESET:
            return { properties: [] }

        default:
            return state
    }
}