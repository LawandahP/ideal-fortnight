import { useContext, useEffect } from "react";
import AuthContext from "./auth.provider";
import { useLocation, Navigate, Outlet } from "react-router-dom";

import { getCookie } from "./users/cookies";
import { readProfileAction } from "../screens/profile/actions";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
    const dispatch = useDispatch()
 
    let user = getCookie('access_token');

    // const readProfile = useSelector(state => state.readProfile)
    // const { error, loading, profile } = readProfile

    // const roles = profile?.groups

    useEffect(() => {
        dispatch(readProfileAction())
    }, [])

    if (user) {
        return true
    } else {
        return false
    }
}

const RequireAuth = (props) => {
    const auth = useAuth();
    const location = useLocation();
    return auth ? <Outlet/> : <Navigate to="/signin" state={{ from: location }} replace />
    
}

export default RequireAuth;



 // const dispatch = useDispatch()
 
    // let user_cookie = getCookie('access_token');

    // const readProfile = useSelector(state => state.readProfile)
    // const { error, loading, profile } = readProfile

    // const roles = profile?.groups

    // useEffect(() => {
    //     dispatch(readProfileAction())
    // }, [])
 
            // roles?.find(role => allowedRoles?.includes(role)) ? <Outlet />
            // // : auth?.checkUser ? <Navigate to="/unauthorized" state={{ from: location }} replace />
            // : !user_cookie ? <Navigate to="/signin" state={{ from: location }} replace /> 
            // : <Outlet />