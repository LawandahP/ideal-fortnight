import React from "react";
import { NgPaper } from '../../components/display/elements'
import Slider from "react-slick";
import './SimpleSlider.css'

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const SimpleSlider = ({images, description}) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
    };
    return (
        <NgPaper padded>
            <Slider {...settings}>
                {images?.map((image) => (
                    <>
                        <div className="image-container">
                            <div>
                                <img src={image?.file_url} />
                            </div>  
                            {
                            image?.description ? 
                            <>
                                <h3>Description</h3>
                                <p>{image?.description}</p>
                            </>
                            :
                            ""
                        }
                        </div>
                        
                    </>
                ))}
            </Slider>
            {
                description ? 
                <>
                    <h3>Description</h3>
                    <p>{description}</p>
                </>
                :
                ""
            }
            
      </NgPaper>
    )
}

export default SimpleSlider




