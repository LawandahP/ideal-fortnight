import React from 'react'
import { Route, Routes as Switch } from 'react-router-dom'
import Dashboard from './screens/dashboard';
import Index from './screens/Home';

import TenantDetailsScreen from './screens/tenants/details';
import TenantIndexScreen from './screens/tenants/index';
import LandlordDetailsScreen from './screens/landlords/details';
import LandlordReadScreen from './screens/landlords/index';

import PropertyDetailsScreen from './screens/properties/details';
import PropertyIndexScreen from './screens/properties/index';

import UnitDetailsScreen from './screens/units/details';
import UnitReadScreen from './screens/units/index';

import MaintenanceRequestForm from './screens/maintenance/tenant/form';
import MaintenanceList from './screens/maintenance/index';

import SignInPage from './auth/users/signin';
import SignUpPage from './auth/users/signup';
import PageNotFound from './auth/pageNotFound';
import Unauthorized from './auth/unauthorized';
import RequireAuth from './auth/use.auth';
import LeaseForm from './screens/lease/form';
import InvoiceList from './screens/invoice';
import InvoiceDetails from './screens/invoice/details';

import LeaseIndex from './screens/lease/index';
import LandlordTenantsScreen from './screens/tenants/landlord';
import LandlordUnitsScreen from './screens/units/landlord';
import LandlordInvoicesScreen from './screens/invoice/landlord';
import PaymentIndexScreen from './screens/payments';
import TenantInvoiceScreen from './screens/invoice/tenants/tenant_index';
import TenantInvoicesScreen from './screens/invoice/tenants/tenant_invoices';
import TenantPaymentsScreen from './screens/payments/tenant_payments';
import TenantDashboard from './screens/dashboard/tenant_dashboard';
import ProfileScreen from './screens/profile';
import SendResetPasswordEmailScreen from './auth/users/resetPassword';

import SettingsScreen from './screens/account/settings'
import MaintenanceDetailsScreen from './screens/maintenance/details';


const roles = {
    'REALTOR': "REALTOR",
    'STAFF': "STAFF",
    'LANDLORD': "LANDLORD",
    'TENANT': "TENANT",
}



const Routes = () => {
        
    return (
        <Switch>
            {/* <Route path='/' element={<Index />} exact /> */}
            {/* <Route path='/dashboard' element={<Dashboard />} /> */}
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/signin' element={<SignInPage />} />
            <Route path='/password_reset' element={<SendResetPasswordEmailScreen />} />
            
            <Route element={<RequireAuth />}>
                <Route path='' element={<Dashboard />} exact />
                <Route path='/tenants/me' element={<TenantDashboard />} exact />
            </Route>

            <Route element={<RequireAuth />}>
                
                <Route path='/profile' element={<ProfileScreen />} />
                
                <Route path='/tenants' element={<TenantIndexScreen />} />
                <Route path='/me/tenants' element={<LandlordTenantsScreen />} />
                <Route path='/tenant/:id' element={<TenantDetailsScreen />} />


                <Route path='/landlords' element={<LandlordReadScreen />} />
                <Route path='/landlord/:id' element={<LandlordDetailsScreen />} />

                <Route path='/properties' element={<PropertyIndexScreen />} />
                <Route path='/property/:id' element={<PropertyDetailsScreen />} />

                <Route path='/units' element={<UnitReadScreen />} />
                <Route path='/me/units/' element={<LandlordUnitsScreen />} />
                <Route path='/unit/:id' element={<UnitDetailsScreen />} />

                <Route path='/maintenance' element={<MaintenanceList />} />
                <Route path='/maintenance/:id' element={<MaintenanceDetailsScreen />} />
                <Route path='/tenants/me/maintenance' element={<MaintenanceRequestForm />} />
                <Route path='/maintenance/list' element={<MaintenanceList />} />

                <Route path='/lease' element={<LeaseIndex />} />
                <Route path='/lease/add' element={<LeaseForm />} exact />
                
                <Route path='/invoices' element={<InvoiceList />} />
                <Route path='/me/invoices/' element={<LandlordInvoicesScreen />} />
                <Route path='/tenants/me/invoices/' element={<TenantInvoicesScreen />} />
                <Route path='/invoice/:id' element={<InvoiceDetails />} />

                <Route path='/tenants/me/payments' element={<TenantPaymentsScreen />} />
                <Route path='/payments' element={<PaymentIndexScreen />} />

                <Route path='/settings' element={<SettingsScreen />} />

            </Route>

            <Route path='*' element={<PageNotFound />} />
            <Route path='/unauthorized' element={<Unauthorized />} />

        </Switch>
    )
}

export default Routes