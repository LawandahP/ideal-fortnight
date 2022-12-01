import { Avatar } from '@mui/material'
import React from 'react'
import { green, pink } from '@mui/material/colors'
import { FcSettings } from 'react-icons/fc'

import { FiMapPin, FiTv } from 'react-icons/fi'
import { GiPipes } from 'react-icons/gi'
import { IoIosBuild } from 'react-icons/io'

import { NgPaper } from '../../components/display/elements'
import { TLeaseFlex } from '../lease/elements'
import { FlexWrapper, Icon, IconText } from '../user.elements'
import { DashboardMaintenanceContainer, NgDivider } from './elements'
import moment from 'moment'

const MaintenanceDashboard = ({unresolved_maintenances}) => {
    return (
        <NgPaper padded>
            <TLeaseFlex>
                <FlexWrapper>
                    <Icon>
                        <FcSettings />
                    </Icon>
                    <IconText header>Unresolved Maintenances</IconText>
                </FlexWrapper>
            </TLeaseFlex>

            <NgDivider />

           {unresolved_maintenances?.map((maintenance) => (
                <DashboardMaintenanceContainer>
                    <Avatar variant="rounded" sx={{ bgcolor: green[500] }}>
                        {maintenance?.category == "Plumbing" && <GiPipes />}
                        {maintenance?.category == "Appliance" && <FiTv />}
                        {maintenance?.category == "Other" && <IoIosBuild />}
                    </Avatar>
                    <div className='details'>
                        <p id="category">{maintenance?.category}</p>
                        <span>created on {moment(maintenance?.created_at).format("LL")} by {maintenance?.user?.full_name}</span>
                    </div>
                </DashboardMaintenanceContainer>
           ))} 
        </NgPaper>
    )
}

export default MaintenanceDashboard