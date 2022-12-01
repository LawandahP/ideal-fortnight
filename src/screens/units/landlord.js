import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { List, NgPageContainer, NgPaper } from '../../components/display/elements'
import { config, TabTitle } from '../../utils/globalFunc'
import UnitsList from './list'

const LandlordUnitsScreen = () => {
    TabTitle("KgHomes - My Units🏠");

    const [units, setUnits] = useState([])
    const [count, setCount ] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()


    const getLandlordUnits = async () => {
        setLoading(true)
        await axios.get(
            `/my-units/`, config
        ).then(res => {
            setLoading(false)
            setUnits(res?.data?.data?.payload)
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
        getLandlordUnits()
    }, [])

    return (
        <NgPageContainer>
            <UnitsList
                loadingRead={loading} 
                errorRead={error} 
                units={units}
                count={count}
            />
        </NgPageContainer>
        
    )
}

export default LandlordUnitsScreen