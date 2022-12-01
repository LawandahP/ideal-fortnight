import React, { useEffect, useState } from "react";
import axios from "axios";

import { LandlordDetailContext } from "../../context";
import {
    List,
    NgPageContainer,
    NgPaper,
} from "../../components/display/elements";
import LandlordCards from "../landlords/landlord.dashboard";
import { config, getInvoiceFilterValues } from "../../utils/globalFunc";

import MaintenanceDashboard from "../maintenance/maintenance_dashboard";
import { NgDivider } from "../maintenance/elements";
import { InvoiceSummary } from "../invoice/summary";
import { useDispatch, useSelector } from "react-redux";
import { readLandlordInvoicesSummaryAction } from "../invoice/actions";
import { readLandlordPropertiesAction } from "../properties/actions";
import { LandlordDashboardContainer } from "./elements";
import Loader from "../../components/display/Loader";

const LandlordDashboard = () => {
    const dispatch = useDispatch();
    const readLandlordInvoice = useSelector(
        (state) => state.readLandlordInvoice
    );
    const { landlordInvoices, count } = readLandlordInvoice;

    const readLandlordInvoiceSummary = useSelector(
        (state) => state.readLandlordInvoiceSummary
    );
    const { landlordInvoiceSummary } = readLandlordInvoiceSummary;

    const readProperties = useSelector((state) => state.readProperties);
    const {
        loading: readLoading,
        error: readError,
        properties,
    } = readProperties;

    const [status, setStatus] = useState(() => {
        return getInvoiceFilterValues("status");
    });

    const [month, setMonth] = useState(() => {
        return getInvoiceFilterValues("date_month");
    });

    const [year, setYear] = useState(new Date().getFullYear());
    const [property, setProperty] = useState(
        getInvoiceFilterValues("property")
    );

    const [error, setError] = useState();
    const [properties_count, setPropertiesCount] = useState();
    const [unit_count, setUnitCount] = useState();
    const [tenant_count, setTenantCount] = useState();
    const [unresolved_maintenances, setUnresolvedMaintenances] = useState();
    const [unresolved_maintenances_count, setUnresolvedMaintenancesCount] =
        useState();

    const [loading, setLoading] = useState(false);

    const landlordDashboard = async () => {
        setLoading(true);
        await axios
            .get(`/landlord_dashboard/`, config)
            .then((res) => {
                setPropertiesCount(res?.data?.data?.extra?.properties_count);
                setUnitCount(res?.data?.data?.extra?.unit_count);
                setTenantCount(res?.data?.data?.extra?.tenant_count);
                setUnresolvedMaintenances(
                    res?.data?.data?.extra?.unresolved_maintenances
                );
                setUnresolvedMaintenancesCount(
                    res?.data?.data?.extra?.unresolved_maintenances_count
                );
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
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
        landlordDashboard();
    }, []);

    useEffect(() => {
        dispatch(readLandlordInvoicesSummaryAction(month, year, property));
        dispatch(readLandlordPropertiesAction());
    }, [month, year, property]);

    return (
        <NgPageContainer>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <LandlordDetailContext.Provider
                        value={{
                            properties_count,
                            unit_count,
                            tenant_count,
                            // vacant_units,
                            unresolved_maintenances_count,
                        }}
                    >
                        <LandlordCards />
                    </LandlordDetailContext.Provider>

                    <LandlordDashboardContainer>
                        <div className="inline-flex">
                            <MaintenanceDashboard
                                unresolved_maintenances={
                                    unresolved_maintenances
                                }
                            />
                        </div>
                        <NgPaper padded>
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
                        </NgPaper>
                    </LandlordDashboardContainer>
                </>
            )}
        </NgPageContainer>
    );
};

export default LandlordDashboard;
