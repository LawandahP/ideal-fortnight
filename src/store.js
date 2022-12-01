import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { resetPasswordWithEmailReducer, userSignInReducer, userSignUpReducer } from './auth/users/reducers';
import {
    tenantCreateReducer, tenantDeleteReducer,
    tenantReadReducer, tenantUpdateReducer,
    tenantDetailsReducer
} from './screens/tenants/reducers';

import {
    landlordCreateReducer, landlordDeleteReducer,
    landlordReadReducer, landlordUpdateReducer,
    landlordDetailsReducer
} from './screens/landlords/reducers';

import {
    unitCreateReducer, unitDeleteReducer,
    unitReadReducer, unitUpdateReducer,
    unitDetailsReducer
} from './screens/units/reducers';

import {
    propertyCreateReducer, propertyDeleteReducer,
    propertyReadReducer, propertyUpdateReducer,
    propertyDetailsReducer, propertyTypeReadReducer, landlordPropertyReadReducer
} from './screens/properties/reducers';

import {
    maintenanceRequestCreateReducer, maintenanceReadReducer, 
    maintenanceUpdateReducer, maintenanceDeleteReducer, maintenanceDetailsReducer,
} from './screens/maintenance/reducers';

import {
    leaseRequestCreateReducer, leaseReadReducer, 
    leaseUpdateReducer, leaseDeleteReducer,
} from './screens/lease/reducers';

import {
    invoiceRequestCreateReducer, invoiceReadReducer, 
    invoiceUpdateReducer, invoiceDeleteReducer, 
    invoiceSummaryReadReducer, invoiceDetailsReducer, 
    landlordInvoiceSummaryReadReducer,
    landlordInvoiceReadReducer
} from './screens/invoice/reducers';

import {
    billRequestCreateReducer, billReadReducer, 
    billUpdateReducer, billDeleteReducer, billDetailsReducer
} from './screens/bills/reducers';

import {accountUpdateReducer, accountDeleteReducer, accountDetailsReducer} from './screens/account/reducers';


import {
    profileReadReducer, profileUpdateReducer,
} from './screens/profile/reducers';
import { paymentCreateReducer, paymentDeleteReducer, paymentReadReducer, paymentUpdateReducer } from './screens/payments/reducers';
import { readTenantInvoicesAction } from './screens/invoice/actions';


const reducers = combineReducers({

    signUpUser: userSignUpReducer,
    signInUser: userSignInReducer,

    emailPasswordReset:resetPasswordWithEmailReducer,

    readProfile: profileReadReducer,
    updateProfile: profileUpdateReducer,

    readAccountDetails: accountDetailsReducer,
    updateAccount: accountUpdateReducer,
    deleteAccount: accountDeleteReducer,

    createMaintenance: maintenanceRequestCreateReducer,
    readMaintenance: maintenanceReadReducer,
    readMaintenanceDetails: maintenanceDetailsReducer,
    updateMaintenance: maintenanceUpdateReducer,
    deleteMaintenance: maintenanceDeleteReducer,

    createInvoice: invoiceRequestCreateReducer,
    readInvoice: invoiceReadReducer,
    readInvoiceDetails: invoiceDetailsReducer,
    readInvoiceSummary: invoiceSummaryReadReducer,
    readLandlordInvoiceSummary: landlordInvoiceSummaryReadReducer,
    readLandlordInvoice: landlordInvoiceReadReducer,
    updateInvoice: invoiceUpdateReducer,
    deleteInvoice: invoiceDeleteReducer,

    createPayment: paymentCreateReducer,
    readPayments: paymentReadReducer,
    updatePayment: paymentUpdateReducer,
    deletePayment: paymentDeleteReducer,

 
    createBill: billRequestCreateReducer,
    readBill: billReadReducer,
    readBillDetails: billDetailsReducer,
    updateBill: billUpdateReducer,
    deleteBill: billDeleteReducer,

    createLease: leaseRequestCreateReducer,
    readLease: leaseReadReducer,
    updateLease: leaseUpdateReducer,
    deleteLease: leaseDeleteReducer,

    readTenants: tenantReadReducer,
    createTenant: tenantCreateReducer,
    updateTenant: tenantUpdateReducer,
    deleteTenant: tenantDeleteReducer,
    tenantDetails: tenantDetailsReducer,

    readLandlords: landlordReadReducer,
    createLandlord: landlordCreateReducer,
    updateLandlord: landlordUpdateReducer,
    deleteLandlord: landlordDeleteReducer,
    landlordDetails: landlordDetailsReducer,

    readProperties: propertyReadReducer,
    readLandlordProperties: landlordPropertyReadReducer,
    createProperty: propertyCreateReducer,
    updateProperty: propertyUpdateReducer,
    deleteProperty: propertyDeleteReducer,
    propertyDetails: propertyDetailsReducer,

    readPropertyTypes: propertyTypeReadReducer,

    readUnits: unitReadReducer,
    createUnit: unitCreateReducer,
    updateUnit: unitUpdateReducer,
    deleteUnit: unitDeleteReducer,
    unitDetails: unitDetailsReducer,
})

// const schoolInfoFromStorage = sessionStorage.getItem('schoolInfo') ?
//     JSON.parse(sessionStorage.getItem('schoolInfo')) : null

const userInfoFromStorage = sessionStorage.getItem('userInfo') ?
    JSON.parse(sessionStorage.getItem('userInfo')) : null


const initialState = {
    signInUser: { userInfo: userInfoFromStorage },
}


const middleware = [thunk]

const store = createStore(reducers, initialState,
    composeWithDevTools(applyMiddleware(...middleware)));

export default store;