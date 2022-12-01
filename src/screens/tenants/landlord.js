import axios from "axios";
import React, { useEffect, useState } from "react";
import { List, NgPageContainer } from "../../components/display/elements";
import ToastAlert from "../../components/display/ToastAlert";

import { config } from "../../utils/globalFunc";
import TenantListScreen from "./tenant_list";

const LandlordTenantsScreen = () => {
    const [tenants, setTenants] = useState([]);
    const [count, setCount] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const getLandlordTenants = async () => {
        setLoading(true);
        await axios
            .get(`/my_tenants/`, config)
            .then((res) => {
                setLoading(false);
                setTenants(res?.data?.data?.payload);
                setCount(res?.data?.data?.count);
            })
            .catch((err) => {
                setError(
                    err.response && err.response.data.detail ? (
                        <>
                            {Object.keys(err.response.data.detail).map(
                                function (s) {
                                    return (
                                        <List>
                                            {err.response.data.detail[s]}
                                        </List>
                                    );
                                }
                            )}
                        </>
                    ) : (
                        err.message
                    )
                );
            });
    };

    useEffect(() => {
        getLandlordTenants();
    }, []);

    return (
        <NgPageContainer>
            {/* {error ? <ToastAlert severity="error">{error}</ToastAlert> : ""} */}
            <TenantListScreen
                loading={loading}
                error={error}
                tenants={tenants}
                count={count}
            />
        </NgPageContainer>
    );
};

export default LandlordTenantsScreen;
