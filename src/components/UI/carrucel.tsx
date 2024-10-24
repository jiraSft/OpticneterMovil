import React from "react";
import { Swiper, SwiperSlide } from "swiper/react"; 
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/autoplay';  // Asegúrate de tener este import

import logo from '../../assets/an.png';
import anuncio from '../../assets/anuncioOpti.jpg';

const ImageCarousel: React.FC = () => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{ delay: 3000 }}
      className="mySwiper p-2"
    >
      <SwiperSlide>
        <img
          src={anuncio}
          alt="Descriptive alt text for Image 1"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={logo}
          alt="Descriptive alt text for Image 2"
        />
      </SwiperSlide>
      {/* Agregar más imágenes si es necesario */}
      <SwiperSlide>
        <img
          src={logo}
          alt="Descriptive alt text for Image 3"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default ImageCarousel;
