import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { List, NgPageContainer } from '../../components/display/elements'
import { config } from '../../utils/globalFunc'
import PaymentListScreen from './list'

const TenantPaymentsScreen = () => {

    const [payments, setPayments] = useState([])
    const [count, setCount ] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    const getTenantPayments = async () => {
        setLoading(true)
        await axios.get(
            `/tenant-payments/`, config
        ).then(res => {
            setLoading(false)
            setPayments(res?.data?.data?.payload)
            setCount(res?.data?.data?.count)
        }).catch(err => {
            setError(err.response && err.response.data.detail ?
                <>
                    {Object.keys(err.response.data.detail).map(function(s) {
                    return (
                        <List>{err.response.data.detail[s]}</List>
                    )})}
                </> 
                : err.message)
        });
    }

    useEffect(() => {
        getTenantPayments()
    }, [])

    return (
        <NgPageContainer>
            {/* {successDelete && (<ToastAlert severity="success">{message}</ToastAlert>)} */}
            <PaymentListScreen
                loading={loading}
                error={error}
                payments={payments}
                count={count}
            />
        </NgPageContainer>
    )
}

export default TenantPaymentsScreen