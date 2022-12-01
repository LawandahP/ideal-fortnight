import { Avatar } from '@mui/material';
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import React, { useEffect } from 'react';
import { FiImage, FiUsers } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import SimpleSlider from '../../components/carousel/SimpleSlider';
import ControlledAccordion from '../../components/display/accordion';
import CustomAvatar from '../../components/display/CustomAvatar';
import { NgLink, NgPageContainer, NgPaper } from '../../components/display/elements';
import Gallery from '../../components/display/gallery';
import Loading from '../../components/display/Loader';
import NotFound from '../../components/display/notFound';
import PageHeader from '../../components/display/pageHeader';
import PaperHeader from '../../components/display/paperHeader';
import ToastAlert from '../../components/display/ToastAlert';
import { 
    ProfileContainer,
    ProfileInfoWrapper,
    UserName,
    UserRole
} from '../../components/navbar/navbarElements';
import ProfileCard from '../../components/profileCard';
import { TableComponent } from '../../components/useTable';
import { Chip } from '../../components/useTable/elements';
import { TabTitle, toTitleCase } from '../../utils/globalFunc';
import { TwoGrid } from '../elements';
import { InlineWrapper } from '../user.elements';

import { unitDetailsAction } from './actions';





const headCells = [
    { id: "full_name", label: "", minWidth: 170 },
    { id: "phone_number", label: "Contact", minWidth: 170 },
    { id: "is_active", label: "Status", maxWidth: 10 },
];

const UnitDetailsScreen = () => {
    const match = { params: useParams() }
    const dispatch = useDispatch()

    const unitDetails = useSelector(state => state.unitDetails)
    const { loading, error, unit } = unitDetails

    const previous_tenants = unit?.previous_tenants
    const count = unit?.previous_tenants?.length

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
    } = TableComponent(previous_tenants, headCells);

    TabTitle(unit?.unit_no);

    useEffect(() => {
        dispatch(unitDetailsAction(match.params.id))
    }, [])

    return (

        <NgPageContainer>
            {error && <ToastAlert severity="error">{error}</ToastAlert>}
            { loading 
                ? <Loading />
                :
            <>
                <PageHeader 
                    heading="Unit Details" 
                    name={unit?.unit_no}
                    text={unit?.property?.name}
                />

                <ControlledAccordion
                    heading={unit?.images?.length > 0 ? "Show Images" : "No Images Available"}
                    icon={<FiImage />}
                >
                    <Gallery data={unit?.images} />
                </ControlledAccordion>

                <TwoGrid>
                    
                    <InlineWrapper>
                        
                        <ProfileCard 
                            name={unit?.tenant?.full_name}
                            image={unit?.tenant?.profile?.profile_pic?.file_url}
                            affiliation="Current Tenant"
                            phone_number={unit?.tenant?.phone_number}
                        />
                    </InlineWrapper>
            

                    <InlineWrapper>
                        {/* <NgPaper>
                            {error && <ToastAlert severity="error">{error}</ToastAlert>}
                            {loading ? (
                                <Loading />
                            ) : (
                                <>
                                    <UnitsList
                                        loadingRead={loading}
                                        errorRead={error}
                                        units={units}
                                        count={units?.length}
                                    />
                                </>
                            )}
                        </NgPaper> */}

                        {/* <NgPaper>
                            <h3>Amenities</h3>
                            {
                                unit?.amenities?.length > 0 ?
                                unit?.amenities?.map((amenity) => (
                                    <AmenitiesList key={amenity}>
                                        <MdArrowRight /> <p>{amenity}</p>
                                    </AmenitiesList>
                                ))
                                : <NotFound text="No Amenities Found">
                                    
                                </NotFound>
                        
                            }
                        </NgPaper> */}

                        <NgPaper padded>
                            <PaperHeader heading="Previous Occupants">
                                <FiUsers />
                            </PaperHeader>
                            { count > 0 ? 
                                <>
                                    <TblContainer>
                                        <TblHead />

                                        <TableBody>
                                            {previous_tenants?.map((tenant) => (
                                                    <TableRow key={tenant.id}>
                                                        <TableCell>
                                                            <NgLink to={`/tenant/${tenant.slug}`}>
                                                                <ProfileContainer>
                                                                    {
                                                                        tenant?.profile
                                                                        ?.profile_pic
                                                                        ?.file_url 
                                                                        ? <Avatar src={tenant?.profile?.profile_pic?.file_url} />
                                                                        : <Avatar {...CustomAvatar(tenant?.full_name)} />
                                                                    }
                                                                    <ProfileInfoWrapper>
                                                                        <UserName>{toTitleCase(tenant?.full_name)}</UserName>
                                                                        <UserRole>{tenant?.email}</UserRole>
                                                                    </ProfileInfoWrapper>
                                                                </ProfileContainer>
                                                            </NgLink>
                                                        </TableCell>

                                                        <TableCell>{tenant.phone_number}</TableCell>
                                                        <TableCell>
                                                            {
                                                                tenant.is_active === true 
                                                                ? <Chip active>active</Chip>
                                                                :<Chip>inactive</Chip>
                                                            }
                                                        </TableCell>
                                                        
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>
                                    </TblContainer>

                                    <TblPagination />
                                </>
                            : 
                                <NotFound text="This unit has no Previous Tenants">
                                    <FiUsers />
                                </NotFound>
                            }
                        </NgPaper>

                        <NgPaper />
                    </InlineWrapper>

                    
                </TwoGrid>
            </>
        }
        </NgPageContainer>
    )
}

export default UnitDetailsScreen;
