import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NgPageContainer } from '../../components/display/elements';

import { readLandlordPropertiesAction } from './actions';
import { PropertyCard, BodyContainer, Container, ImageWrapper, PropertyName, Image, AmenityWrapper, Amenity, Text, Link, ImageContainer } from './elements';

import Loading from "../../components/display/Loader";
import ToastAlert from "../../components/display/ToastAlert";
import SimpleSlider from '../../components/carousel/SimpleSlider';
import NotFound from '../../components/display/notFound';
import { FaSimplybuilt } from 'react-icons/fa';


const PropertyCardComponent = ({properties, readError, readLoading, count}) => {
    const dispatch = useDispatch()

    // const readProperties = useSelector((state) => state.readProperties);
    // const { loading: readLoading, error: readError, properties, count } = readProperties;

    useEffect(() => {
        dispatch(readLandlordPropertiesAction());
    }, [dispatch]);

    return (
        <NgPageContainer>
            {count > 0 ?
                <Container>
                    {properties?.map((property) => (
                        <Link to={`/property/${property.slug}`}>
                            <PropertyCard key={property?.id}>
                                <BodyContainer>
                                    <PropertyName>{property?.name}</PropertyName>
                                    <Text>{property?.address}</Text>

                                    <Text header>Amenities</Text>
                                        <AmenityWrapper>
                                            {
                                                property?.amenities?.length > 0 ? 
                                                property?.amenities?.map((amenity) => (
                                                    <Amenity>{amenity}</Amenity>
                                                ))
                                                : <Amenity>N/A</Amenity>
                                            }
                                            
                                        </AmenityWrapper>
                                        
                                    <Text header>Description</Text>
                                    <Text>{property?.description}</Text>
                                </BodyContainer>
                            </PropertyCard>
                        </Link>
                    ))}
                </Container>
                : <NotFound text="No Properties found">
                    <FaSimplybuilt />
                </NotFound> 
            }
        </NgPageContainer>
    )
}

export default PropertyCardComponent
