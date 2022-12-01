import { Avatar } from "@mui/material";
import React, { useEffect } from "react";
import { FcDownLeft, FcDownRight, FcHome, FcRight } from "react-icons/fc";
import { MdTaskAlt, MdStickyNote2, MdAccessibilityNew, MdDeleteOutline } from "react-icons/md";
import { RiHome4Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ImageSelector from "../../components/carousel/ImageSelector";
import ImageSlider from "../../components/carousel/ImageSlider";
import SimpleSlider from "../../components/carousel/SimpleSlider";
import ControlledAccordion from "../../components/display/accordion";
import CustomAvatar from "../../components/display/CustomAvatar";
import { NgLink, NgPageContainer, NgPaper } from "../../components/display/elements";
import Gallery from "../../components/display/gallery";
import Loading from "../../components/display/Loader";
import NotFound from "../../components/display/notFound";
import PageHeader from "../../components/display/pageHeader";
import ToastAlert from "../../components/display/ToastAlert";
import { ProfileContainer, ProfileInfoWrapper, UserName, UserRole } from "../../components/navbar/navbarElements";
import ProfileCard from "../../components/profileCard";
import DataTable from "../../components/useTable/dataTable";
import { Chip } from "../../components/useTable/elements";
import { TabTitle } from "../../utils/globalFunc";
import { TwoGrid } from "../elements";

import UnitsList from "../units/list";
import { InlineWrapper } from "../user.elements";

import { propertyDetailsAction } from "./actions";
import { AmenitiesList, AmenityIcon } from "./elements";

import { FiImage } from 'react-icons/fi';
import PaperHeader from "../../components/display/paperHeader";


const PropertyDetailsScreen = () => {
    const match = { params: useParams() };
    const dispatch = useDispatch();

    const propertyDetails = useSelector((state) => state.propertyDetails);
    const { loading, error, property, units } = propertyDetails;

    const createUnit = useSelector((state) => state.createUnit);
    const { success } = createUnit;

    useEffect(() => {
        dispatch(propertyDetailsAction(match.params.id));
    }, [dispatch, success]);

    const columns = [
        { 
            field: 'unit_no', 
            headerName: 'Unit', 
            minWidth: 30, 
            // flex: 1,
            renderCell: 
                params => <NgLink
                                to={`/unit/${params?.row?._id}`}
                            >
                            {params.value}
                        </NgLink>
        },
        {
            field: 'square_feet',
            headerName: 'Sq Feet',
            minWidth: 150,
            flex: 1,
            type: 'number'
        },
        {
            field: 'bathrooms',
            headerName: 'Bathrooms',
            minWidth: 100,
            flex: 1,
            type: 'number'
        },
        {
            field: 'bedrooms',
            headerName: 'Bedrooms',
            minWidth: 100,
            flex: 1,
            type: 'number'
        },
        {
            field: 'tenant',
            headerName: 'Tenant',
            minWidth: 200,
            flex: 1,
            renderCell: 
                params => 
            
                    params?.row?.tenant?.full_name 
                    ? params?.row?.tenant?.full_name
                    : params?.row?.tenant?.full_name === "" || params?.row?.tenant?.full_name == null 
                    ? <Chip>vacant</Chip>
                    : <Chip>vacant</Chip>
                ,
            
            valueFormatter: params => {
                return params?.value
            },
            valueGetter: params => {
                return params?.value?.full_name
            },
        },
        
    ];

    TabTitle(`${property?.name} | Details`);

    return (
        <NgPageContainer>
            {error && <ToastAlert severity="error">{error}</ToastAlert>}
            {
                loading 
                ? <Loading /> 
                :
            <>       
                <PageHeader 
                    heading="Property Details" 
                    name={property?.name}
                    text={property?.property_type?.property_model}> 
                </PageHeader>
            

                <ControlledAccordion
                    heading={property?.images?.length > 0 ? "Show Images" : "No Images Available"}
                    icon={<FiImage />}
                >
                    <Gallery data={property?.images} />
                </ControlledAccordion>

                <TwoGrid>
                    <InlineWrapper>
                        <ProfileCard 
                            name={property?.owner?.full_name}
                            image={property?.owner?.profile?.profile_pic}
                            affiliation="Owner"
                            phone_number={property?.owner?.phone_number}
                        />
                    </InlineWrapper>

                    <InlineWrapper>
                        <NgPaper padded>
                        <PaperHeader heading="Units">
                            {<RiHome4Line />}
                        </PaperHeader>
                            {
                                loading ? <Loading /> : units?.length > 0 ? 
                                <>
                                    <DataTable 
                                        rows={units} 
                                        columns={columns}
                                        loading={!units.length}
                                    />
                                </>
                            : 
                                <>
                                    <NotFound text="No Units found">
                                        <RiHome4Line />
                                    </NotFound>
                                </>
                            }
                        </NgPaper>

                        <NgPaper padded>
                            <PaperHeader heading="Amenities">
                                {<MdTaskAlt />}
                            </PaperHeader>
                            {
                                property?.amenities?.length > 0 ?
                                property?.amenities?.map((amenity) => (
                                    <AmenitiesList key={amenity}>
                                        <AmenityIcon /> <p>{amenity}</p>
                                    </AmenitiesList>
                                ))
                                : <NotFound text="No Amenities Found">
                                    <MdAccessibilityNew />
                                </NotFound>
                        
                            }
                        </NgPaper>
                    </InlineWrapper>

                    
                </TwoGrid>
            </>
            }
        </NgPageContainer>
    );
};

export default PropertyDetailsScreen;
