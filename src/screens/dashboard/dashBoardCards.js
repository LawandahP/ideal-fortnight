import React, { useContext } from 'react'
import { GetCountContext } from '../../context'

import { MdDomain, MdPeopleOutline, MdPersonOutline, MdOutlineHouse, MdOutlineDoorBack } from 'react-icons/md'


import {
    NgDashboardCard,
    NgDashboardCardText,
    NgDashboardCardIcon,
    NgCardDivider,
    CardDataWrapper
} from './dashboardElements'

const DashboardCards = () => {
    const { count } = useContext(GetCountContext)

    return (
        <>
            <NgDashboardCard>
                <NgDashboardCardIcon><MdDomain /></NgDashboardCardIcon>
                <NgCardDivider />
                <CardDataWrapper>
                    <NgDashboardCardText>Properties</NgDashboardCardText>
                    <NgDashboardCardText>{count?.properties}</NgDashboardCardText>
                </CardDataWrapper>
            </NgDashboardCard>

            <NgDashboardCard>
                <NgDashboardCardIcon><MdPeopleOutline /></NgDashboardCardIcon>
                <NgCardDivider />
                <CardDataWrapper>
                    <NgDashboardCardText>Tenants</NgDashboardCardText>
                    <NgDashboardCardText>{count?.tenants}</NgDashboardCardText>
                </CardDataWrapper>
            </NgDashboardCard>

            <NgDashboardCard>
                <NgDashboardCardIcon><MdPersonOutline /></NgDashboardCardIcon>
                <NgCardDivider />
                <CardDataWrapper>
                    <NgDashboardCardText>Landlords</NgDashboardCardText>
                    <NgDashboardCardText>{count?.landlords}</NgDashboardCardText>
                </CardDataWrapper>
            </NgDashboardCard>

            <NgDashboardCard>
                <NgDashboardCardIcon><MdOutlineHouse /></NgDashboardCardIcon>
                <NgCardDivider />
                <CardDataWrapper>
                    <NgDashboardCardText>Total units</NgDashboardCardText>
                    <NgDashboardCardText>{count?.total_units}</NgDashboardCardText>
                </CardDataWrapper>
            </NgDashboardCard>

            <NgDashboardCard>
                <NgDashboardCardIcon><MdOutlineDoorBack /></NgDashboardCardIcon>
                <NgCardDivider />
                <CardDataWrapper>
                    <NgDashboardCardText>Vacant units</NgDashboardCardText>
                    <NgDashboardCardText>{count?.vacant_units}</NgDashboardCardText>
                </CardDataWrapper>
            </NgDashboardCard>
        </>

    )
}

export default DashboardCards