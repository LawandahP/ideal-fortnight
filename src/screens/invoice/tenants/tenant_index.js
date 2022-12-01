import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { readTenantInvoicesAction } from '../actions';

const TenantInvoiceScreen = () => {
    const dispatch = useDispatch()
    const readInvoice = useSelector((state) => state.readInvoice);
    const { loading, error, invoices, count } = readInvoice;

    useEffect(() => {
        dispatch(readTenantInvoicesAction())
    },[])
    return (
        <>
            
        </>
    )
}
export default TenantInvoiceScreen