import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.css";
import "./style.css";

export const SimpleSlider = ({ images }) =>
  images && images.length > 1 ? (
    <Carousel
      autoPlay={false}
      showStatus={false}
      showThumbs={false}
      useKeyboardArrows={true}
    >
      {images &&
        images.map(image => (
          <div key={image}>
            <img
              src={image}
              alt={image}
              style={{ width: "375px", height: "375px", objectFit: "cover" }}
            />
          </div>
        ))}
    </Carousel>
  ) : (
    <>
      {images && (
        <div
          style={{
            width: "100%",
            background: "black",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <img
            src={images[0]}
            alt="galleryImage"
            style={{ width: "375px", height: "375px", objectFit: "cover" }}
          />
        </div>
      )}
    </>
  );
