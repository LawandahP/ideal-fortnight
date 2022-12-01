import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { NgPageContainer } from "../../components/display/elements";
import { readLeasesAction } from "./actions";

import LeaseList from "./list";
import TenantLeaseScreen from "./tenant";

const LeaseIndex = () => {
    const readLease = useSelector((state) => state.readLease);
    const { loading, error, leases, count } = readLease;

    const readProfile = useSelector(state => state.readProfile)
    const { error: errorProfile, loading: loadingProfile, profile } = readProfile

    const roles = profile?.groups

    return (
        <NgPageContainer>
            { roles?.includes('TENANT') ?
                <TenantLeaseScreen />
                :  <LeaseList 
                        leases={leases}
                        loading={loading}
                        error={error}
                        count={count}
                    />
            }
        </NgPageContainer>
    );
};

export default LeaseIndex;
