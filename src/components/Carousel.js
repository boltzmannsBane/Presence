import React, { useState, useEffect } from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const SimpleSlider = ({ images }) =>
    <Carousel
        autoPlay={false}
        showStatus={false}
        showThumbs={false}
        useKeyboardArrows={true}
    >
        {images && images.map(image =>
            <div key={image}><img src={image} alt={image} style={{ width: '100%', height: window.innerWidth, objectFit: 'cover' }} /></div>)}
        {/* {images && <div><img src={images[0]} alt='img' style={{ width: '100%', height: window.innerWidth, objectFit: 'cover' }} /></div>} */}
    </Carousel>
