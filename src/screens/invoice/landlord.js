import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { List, NgPageContainer, NgPaper } from '../../components/display/elements'
import LeftSidebar from '../../components/display/leftSidebar'
import { config, getInvoiceFilterValues, TabTitle } from '../../utils/globalFunc'
import { readLandlordPropertiesAction } from '../properties/actions'
import { readLandlordInvoicesSummaryAction, readLandlordsInvoicesAction } from './actions'
import InvoiceTable from './invoice_table'
import { InvoiceSummary } from './summary'

const LandlordInvoicesScreen = () => {
    TabTitle("My Tenants Invoices 💰")

    const dispatch = useDispatch()
    const [ isOpened, setIsOpened ] = useState(true)


    const readLandlordInvoiceSummary = useSelector(state => state.readLandlordInvoiceSummary)
    const { landlordInvoiceSummary } = readLandlordInvoiceSummary;

    const readLandlordInvoice = useSelector(state => state.readLandlordInvoice)
    const { landlordInvoices, count, error, loading } = readLandlordInvoice;

    const readProperties = useSelector((state) => state.readProperties);
    const { loading: readLoading, error: readError, properties } = readProperties;

    const [ status, setStatus ] = useState(() => {
        return getInvoiceFilterValues('status')
    })
    
    const [ month, setMonth ] = useState(() => {
        return getInvoiceFilterValues('date_month')
    })

    const [ year, setYear ] = useState(new Date().getFullYear())
    const [ property, setProperty ] = useState(getInvoiceFilterValues('property'))

    useEffect(() => {
        dispatch(readLandlordsInvoicesAction(status, month, year, property))
        dispatch(readLandlordInvoicesSummaryAction(month, year, property))
        dispatch(readLandlordPropertiesAction())
        // getInvoiceSummary(month, year)
    }, [month, year, property, status])

    return (
        <NgPageContainer>
        
            <InvoiceTable 
                invoices={landlordInvoices}
                loading={loading}
                error={error}
                count={count}
            />

            <LeftSidebar tall heading="Invoice Summary" isOpened={isOpened} setIsOpened={setIsOpened}>
                <InvoiceSummary 
                    invoiceSummary={landlordInvoiceSummary}
                    properties={properties}
                    readError={readError}
                    status={status}
                    setStatus={setStatus}
                    month={month}
                    setMonth={setMonth}
                    year={year}
                    setYear={setYear}
                    property={property}
                    setProperty={setProperty}
                />                
            </LeftSidebar>
        </NgPageContainer>
        
    )
}

export default LandlordInvoicesScreen