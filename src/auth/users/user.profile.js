import axios from 'axios';
import React from 'react'

const Profile = () => {
    
    const getCurrentUser = async () => {
        await axios.post(
            '/auth/login/', values,
            { headers: { 'Content-Type': 'application/json'}}
        ).then(res => {

        }).catch(err => {
            setError(err.response && err.response.data.detail ?
                <>
                    {Object.keys(err.response.data.detail).map(function(s) {
                    return (
                        <List>{err.response.data.detail[s]}</List>
                    )})}
                </> 
                : err.message)
            setLoading(false)
        });
    }

    useEffect(() => {
        getCurrentUser();
    }, [])
    return (
        <>
            
        </>
    )
}

export default Profile