import React, { useEffect } from 'react';
import moment from 'moment' 
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import Loading from '../../components/display/Loader';
import ToastAlert from '../../components/display/ToastAlert';

import { tenantDetailsAction } from './actions';
import { UserInfoWrapper, ProfilePicture, UserCard, UserName, DetailsWrapper, Status, Icon, IconText, FlexWrapper, InfoWrapper } from '../user.elements';
import { RiCommunityLine, RiHome4Line, RiPhoneLine, RiMailSendLine, RiFileSettingsFill } from 'react-icons/ri';
import ControlledAccordion from '../../components/display/accordion';
import InvoiceTable from '../invoice/invoice_table';

import {
    NgLink,
    NgPageContainer,
    NgPaper,
} from "../../components/display/elements";
import MaintenanceTable from '../maintenance/list';
import { FiClock, FiSettings } from 'react-icons/fi';
import { Avatar } from '@mui/material';
import PaperHeader from '../../components/display/paperHeader';
import { FaFileSignature } from 'react-icons/fa';
import NotFound from '../../components/display/notFound';
import { AiOutlineFileProtect, AiOutlineFileExclamation } from 'react-icons/ai';
import { TabTitle } from '../../utils/globalFunc';


const TenantDetailsScreen = () => {
    const match = { params: useParams() }
    const dispatch = useDispatch()

    const tenantDetails = useSelector(state => state.tenantDetails)
    const { loading, error, tenant, unit, leases, property, maintenances } = tenantDetails

    TabTitle(tenant?.full_name);

    useEffect(() => {
        dispatch(tenantDetailsAction(match.params.id))
    }, [dispatch])

    return (
        <NgPageContainer>
            {error && <ToastAlert severity="error">{error}</ToastAlert>}
            {
                loading ? <Loading />
                    :
                    <>
                        <UserCard>
                            <UserInfoWrapper>
                                <Avatar 
                                    src={tenant?.profile?.profile_pic}
                                    variant="rounded" 
                                    sx={{width: "120px", height: "120px", marginRight: "20px"}}
                                />
                                <DetailsWrapper>
                                    <UserName>{tenant?.full_name}</UserName>
                                    {tenant?.is_active === true ? <Status active>active</Status> : <Status>inactive</Status>}

                                    <FlexWrapper>
                                        <Icon><RiCommunityLine /></Icon>
                                        <IconText>{property?.name ? property?.name : "-"}</IconText>
                                    </FlexWrapper>
                                </DetailsWrapper>
                            </UserInfoWrapper>

                            <InfoWrapper>
                                <FlexWrapper>
                                    <Icon><RiHome4Line /></Icon>
                                    <IconText>{unit?.unit_no ? unit?.unit_no : "-"}</IconText>
                                </FlexWrapper>
                                <FlexWrapper>
                                    <Icon><RiPhoneLine /></Icon>
                                    <IconText>{tenant?.phone_number}</IconText>
                                </FlexWrapper>
                                <FlexWrapper>
                                    <Icon><RiMailSendLine /></Icon>
                                    <IconText>{tenant?.email}</IconText>
                                    {/* <a href={`mailto:${tenant?.email}`}>{tenant?.email}</a> */}
                                </FlexWrapper>
                            </InfoWrapper>

                            <FlexWrapper>
                                <Icon><FiClock /></Icon>
                                <IconText><p>Joined {moment(tenant?.profile?.created_at).format("LLLL")}</p></IconText>
                            </FlexWrapper>
                        </UserCard>
                
                        <NgPaper padded>
                            <PaperHeader heading="Lease History">
                                <AiOutlineFileProtect />
                            </PaperHeader>

                            {leases?.length > 0 ? 
                                leases?.map((lease, i) => (
                                    <>
                                        <ControlledAccordion
                                            link={`/lease/${lease?.id}`}
                                            heading={`${moment(lease?.lease_start).format('ll')} - ${moment(lease?.lease_end).format('ll')}`}
                                            i={i}
                                        >
                                                <InvoiceTable
                                                    invoices={lease?.invoices}
                                                    count={lease?.invoices?.length}
                                                />
                                        </ControlledAccordion>
                                        
                                    </>  
                                ))
                                :
                                    <NotFound text="No Leases Found">
                                        <AiOutlineFileExclamation />
                                    </NotFound>                          
                            } 
                        </NgPaper>
                       
                        
                        <NgPaper padded>
                            <PaperHeader heading="Maintenance Requests">
                                <FiSettings />
                            </PaperHeader>
                            <MaintenanceTable 
                                hidden
                                maintenances={maintenances}
                                count={maintenances?.length}
                            />
                        </NgPaper>
                        
            
                    </>


            }

        </NgPageContainer>
    )
}

export default TenantDetailsScreen;
