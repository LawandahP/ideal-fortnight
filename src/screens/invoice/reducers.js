import {
    INVOICE_CREATE_REQUEST,
    INVOICE_CREATE_SUCCESS,
    INVOICE_CREATE_FAIL,

    INVOICE_READ_REQUEST,
    INVOICE_READ_SUCCESS,
    INVOICE_READ_FAIL,

    INVOICE_UPDATE_REQUEST,
    INVOICE_UPDATE_SUCCESS,
    INVOICE_UPDATE_FAIL,

    INVOICE_DETAILS_REQUEST,
    INVOICE_DETAILS_SUCCESS,
    INVOICE_DETAILS_FAIL,
    
    INVOICE_DELETE_REQUEST,
    INVOICE_DELETE_SUCCESS,
    INVOICE_DELETE_FAIL,

    INVOICE_READ_SUMMARY_REQUEST,
    INVOICE_READ_SUMMARY_SUCCESS,
    INVOICE_READ_SUMMARY_FAIL,

    LANDLORD_INVOICE_READ_REQUEST,
    LANDLORD_INVOICE_READ_SUCCESS,
    LANDLORD_INVOICE_READ_FAIL

} from './constants';


export const invoiceRequestCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case INVOICE_CREATE_REQUEST:
            return {loading: true}
        
        case INVOICE_CREATE_SUCCESS:
            return {
                        loading: false, 
                        success: action.payload.data.success, 
                        message: action.payload.data.success, 
                        invoices: action.payload
                    }

        
        case INVOICE_CREATE_FAIL:
            return {loading: false, error: action.payload}
        
        // case INVOICE_CREATE_RESET:
        //     return {}
        default:
            return state
    }
}


export const invoiceReadReducer = (state = { invoices:[] }, action) =>{
    switch(action.type) {
        case INVOICE_READ_REQUEST:
            return {loading: true, invoices:[]}
        
        case INVOICE_READ_SUCCESS:
            return {
                        loading: false,
                        invoices: action.payload.data.payload,
                        count: action.payload.data.count
                    }
        
        case INVOICE_READ_FAIL:
            return {loading: false, error: action.payload}
        
        // case INVOICE_READ_RESET:
        //     return { users: [] }
        
        default:
            return state
    }
}


export const invoiceDetailsReducer = (state = { invoice: {} }, action) => {
    switch(action.type) {
        case INVOICE_DETAILS_REQUEST:
            return {loading: true, ...state}
        
        case INVOICE_DETAILS_SUCCESS:
            return {
                loading: false, success: true,
                invoice: action?.payload?.data?.payload,
                unit: action?.payload?.data?.extra?.unit,
                property: action?.payload?.data?.extra?.property,
            }
        
        case INVOICE_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        
        // case INVOICE_DETAILS_RESET:
        //     return {invoice: {} }
        
        default:
            return state
    }
}


export const invoiceUpdateReducer = (state = { invoice:{} }, action) => {
    switch(action.type) {
        case INVOICE_UPDATE_REQUEST:
            return { loading: true }
        
        case INVOICE_UPDATE_SUCCESS:
            return { loading: false, success: true, message: "Invoice Update Successfully" }
        
        case INVOICE_UPDATE_FAIL:
            return { loading: false, error: action.payload }  
        
        // case INVOICE_UPDATE_RESET:
        //     return { invoice:{} }
             
        default:
            return state
    }
}



export const invoiceDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case INVOICE_DELETE_REQUEST:
            return { loading: true }
        
        case INVOICE_DELETE_SUCCESS:
            return { 
                loading: false, 
                success: true, 
                message: "Invoice Deleted Successfully",
            }
        
        case INVOICE_DELETE_FAIL:
            return { loading: false, error: action.payload }  
             
        default:
            return state
    }
}




export const invoiceSummaryReadReducer = (state = { invoiceSummary:{} }, action) =>{
    switch(action.type) {
        case INVOICE_READ_SUMMARY_REQUEST:
            return {loading: true, invoiceSummary: {}}
        
        case INVOICE_READ_SUMMARY_SUCCESS:
            return {
                        loading: false,
                        invoiceSummary: action.payload.data.payload,
                        // count: action.payload.data.count
                    }
        
        case INVOICE_READ_SUMMARY_FAIL:
            return {loading: false, error: action.payload}
        
        // case INVOICE_READ_RESET:
        //     return { users: [] }
        
        default:
            return state
    }
}



// Landlord Invoice Summary

export const landlordInvoiceSummaryReadReducer = (state = { landlordInvoiceSummary:{} }, action) =>{
    switch(action.type) {
        case INVOICE_READ_SUMMARY_REQUEST:
            return {loading: true, landlordInvoiceSummary: {}}
        
        case INVOICE_READ_SUMMARY_SUCCESS:
            return {
                        loading: false,
                        landlordInvoiceSummary: action.payload.data.payload,
                        // count: action.payload.data.count
                    }
        
        case INVOICE_READ_SUMMARY_FAIL:
            return {loading: false, error: action.payload}
        
        // case INVOICE_READ_RESET:
        //     return { users: [] }
        
        default:
            return state
    }
}

export const landlordInvoiceReadReducer = (state = { landlordInvoices: [] }, action) =>{
    switch(action.type) {
        case LANDLORD_INVOICE_READ_REQUEST:
            return {loading: true, landlordInvoices: []}
        
        case LANDLORD_INVOICE_READ_SUCCESS:
            return {
                        loading: false,
                        landlordInvoices: action.payload.data.payload,
                        count: action.payload?.data?.count
                    }
        
        case LANDLORD_INVOICE_READ_FAIL:
            return {loading: false, error: action.payload}
        
        // case INVOICE_READ_RESET:
        //     return { users: [] }
        
        default:
            return state
    }
}



// export const generateInvoiceReducer = (state = { invoicePdf:{} }, action) =>{
//     switch(action.type) {
//         case INVOICE_READ_SUMMARY_REQUEST:
//             return {loading: true, landlordInvoiceSummary: {}}
        
//         case INVOICE_READ_SUMMARY_SUCCESS:
//             return {
//                         loading: false,
//                         landlordInvoiceSummary: action.payload.data.payload,
//                         // count: action.payload.data.count
//                     }
        
//         case INVOICE_READ_SUMMARY_FAIL:
//             return {loading: false, error: action.payload}
        
//         // case INVOICE_READ_RESET:
//         //     return { users: [] }
        
//         default:
//             return state
//     }
// }

