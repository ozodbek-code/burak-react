import React from "react";
import { Container, Stack, Box, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Thumbs } from "swiper/modules";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Divider from "../../components/divider";
import Rating from "@mui/material/Rating";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

export default function ChosenProduct() {
  const images = ["/img/cutlet.webp", "/img/kebab-fresh.webp"];

  return (
    <div className="chosen-product">
      <Box className="title">Product Detail</Box>

      <Container className="product-container">
        <Stack className="chosen-product-slider">
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiper-area"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  className="slider-image"
                  src={image}
                  alt={`Product ${index + 1}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Stack>

        <Stack className="chosen-product-info">
          <Box className="info-box">
            <strong className="product-name">Kebab</strong>
            <span className="resto-name">Burak</span>

            <Box className="rating-box">
              <Rating
                name="half-rating"
                defaultValue={2.5}
                precision={0.5}
              />

              <div className="evaluation-box">
                <div className="product-view">
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>20</span>
                </div>
              </div>
            </Box>

            <p className="product-desc">Our best product</p>

            <Divider height="1" width="100%" bg="#000000" />

            <div className="product-price">
              <span>Price:</span>
              <span>$12</span>
            </div>

            <div className="button-box">
              <Button variant="contained">Add To Basket</Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}