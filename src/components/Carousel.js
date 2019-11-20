import React from 'react';
import Slider from 'infinite-react-carousel';

export const SimpleSlider = ({ images }) => (
    <Slider
        dots
        arrowsBlock={false}
        arrows={true}
        prevArrow={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/></svg>}
        nextArrow={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/></svg>}
    >
        {images && images.map(image => <div><img src={image} style={{ width: '100%', height: window.innerWidth, objectFit: 'cover' }} /></div>)}
    </Slider>
);