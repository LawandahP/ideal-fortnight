import React, { useContext } from 'react'
import { LandlordDetailContext } from '../../context'

import { MdDomain, MdPeopleOutline, MdPersonOutline, MdOutlineHouse, MdOutlineDoorBack } from 'react-icons/md'


import {
    NgDashboardCard,
    NgDashboardCardText,
    NgDashboardCardIcon,
    NgCardDivider,
    CardDataWrapper,
    NgDashboardCardWrapper
} from '../dashboard/dashboardElements'
import { NgPageContainer } from '../../components/display/elements'

const LandlordCards = () => {
    const { unit_count, tenant_count, vacant_units,
            properties_count, unresolved_maintenances_count
    } = useContext(LandlordDetailContext)

    return (

        <NgPageContainer>
            <NgDashboardCardWrapper>
                <NgDashboardCard>
                    <NgDashboardCardIcon><MdDomain /></NgDashboardCardIcon>
                    <NgCardDivider />
                    <CardDataWrapper>
                        <NgDashboardCardText>Properties</NgDashboardCardText>
                        <NgDashboardCardText>
                            {/* {properties?.length ? properties?.length : "0"} */}
                            {properties_count}
                        </NgDashboardCardText>
                    </CardDataWrapper>
                </NgDashboardCard>

                <NgDashboardCard>
                    <NgDashboardCardIcon><MdPeopleOutline /></NgDashboardCardIcon>
                    <NgCardDivider />
                    <CardDataWrapper>
                        <NgDashboardCardText>Tenants</NgDashboardCardText>
                        <NgDashboardCardText>{tenant_count ? tenant_count : "0"}</NgDashboardCardText>
                    </CardDataWrapper>
                </NgDashboardCard>

                <NgDashboardCard>
                    <NgDashboardCardIcon><MdOutlineHouse /></NgDashboardCardIcon>
                    <NgCardDivider />
                    <CardDataWrapper>
                        <NgDashboardCardText>Total units</NgDashboardCardText>
                        <NgDashboardCardText>{unit_count ? unit_count : "0"}</NgDashboardCardText>
                    </CardDataWrapper>
                </NgDashboardCard>

                <NgDashboardCard>
                    <NgDashboardCardIcon><MdOutlineDoorBack /></NgDashboardCardIcon>
                    <NgCardDivider />
                    <CardDataWrapper>
                        <NgDashboardCardText>Vacant units</NgDashboardCardText>
                        <NgDashboardCardText>{unit_count - tenant_count}</NgDashboardCardText>
                    </CardDataWrapper>
                </NgDashboardCard>

                {
                    unresolved_maintenances_count &&
                    <NgDashboardCard>
                        <NgDashboardCardIcon><MdOutlineDoorBack /></NgDashboardCardIcon>
                        <NgCardDivider />
                        <CardDataWrapper>
                            <NgDashboardCardText>Pending Maintenances</NgDashboardCardText>
                            <NgDashboardCardText>{unresolved_maintenances_count ? unresolved_maintenances_count : "0"}</NgDashboardCardText>
                        </CardDataWrapper>
                    </NgDashboardCard>
                }
        
            </NgDashboardCardWrapper>
        </NgPageContainer>
    )
}

export default LandlordCards