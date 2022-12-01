import * as React from 'react';
import { useState, useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { NgPageContainer, NgPaper } from '../../components/display/elements';
import { maintenanceDetailsAction } from './actions';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCoverflow, Lazy, Zoom} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import 'swiper/css/lazy';
import 'swiper/css/zoom';

import '../../styles/swiper.css';
import { ImageList, ImageListItem } from '@mui/material';
import Gallery from '../../components/display/gallery';

const MaintenanceDetailsScreen = () => {
    const match = { params: useParams() };
    const dispatch = useDispatch();

    const readMaintenanceDetails = useSelector((state) => state.readMaintenanceDetails);
    const { loading, success, error, maintenance } = readMaintenanceDetails;

    useEffect(() => {
        dispatch(maintenanceDetailsAction(match.params.id));
    }, [dispatch, success]);
    return (
        <NgPageContainer>
            {/* <ImageList variant="masonry" cols={3} gap={8}>
                {maintenance?.images?.map((image) => (
                    <ImageListItem key={image.id}>
                        <img
                        src={`${image?.file_url}?w=248&fit=crop&auto=format`}
                        srcSet={`${image?.file_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        // alt={item.title}
                        loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList> */}
            {/* <NgPaper>
            <Swiper
                modules={[Navigation, Autoplay, Lazy, Zoom]}
                centeredSlides
                slidesPerView={2}
                grabCursor
                navigation
                autoplay
                lazy
                zoom
                effect='coverflow'
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: 2
                }}>
                    
                {maintenance?.images?.map((image) => (
                    <SwiperSlide key={image}>
                        <div className='swiper-zoom-container'>
                            <img id={image.id} src={image.file_url} />
                        </div>
                    </SwiperSlide>
               
                ))}
            </Swiper>
            </NgPaper> */}
            <Gallery data={maintenance?.images} />

        </NgPageContainer>
    )
}

export default MaintenanceDetailsScreen