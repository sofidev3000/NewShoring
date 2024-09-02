import React, { useState } from "react";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./carrusel-videos.css";
const carouselItems = [
  {
    title: "Mexico impulsa Nearshoring a través de financiamiento",
    category: "Economía",
    src: "https://content.kaspersky-labs.com/fm/press-releases/ae/ae8b263f851d40ea5042895d1b9e6dfb/processed/web-img-14-q75.jpg",
  },
  {
    title: "Mexico impulsa Nearshoring a través de financiamiento",
    category: "Economía",
    src: "https://content.kaspersky-labs.com/fm/press-releases/ae/ae8b263f851d40ea5042895d1b9e6dfb/processed/web-img-14-q75.jpg",
  },
  {
    title: "Mexico impulsa Nearshoring a través de financiamiento",
    category: "Economía",
    src: "https://content.kaspersky-labs.com/fm/press-releases/ae/ae8b263f851d40ea5042895d1b9e6dfb/processed/web-img-14-q75.jpg",
  },
  {
    title: "Mexico impulsa Nearshoring a través de financiamiento",
    category: "Economía",
    src: "https://content.kaspersky-labs.com/fm/press-releases/ae/ae8b263f851d40ea5042895d1b9e6dfb/processed/web-img-14-q75.jpg",
  },
  // Agrega más items aquí si es necesario
];

export default function CarruselVideos() {
  const [swiperRef, setSwiperRef] = useState(null);

  return (
    <Swiper
      modules={[Virtual, Navigation, Pagination]}
      onSwiper={setSwiperRef}
      slidesPerView={3}
      centeredSlides={true}
      spaceBetween={10}
      loop={true}
      pagination={{
        type: "fraction",
      }}
      navigation={true}
      virtual
    >
      {carouselItems.map((item, index) => (
        <SwiperSlide key={index} virtualIndex={index}>
          <div className=" h-[342px] w-[404px] relative group transition duration-[2s] ease-in-out overflow-hidden">
            <img
              className="w-full h-full object-cover overflow-hidden group-hover:scale-125"
              src={item.src}
              alt={item.title}
            />
          </div>
          <div className="card-video flex flex-col">
            <h5>{item.category}</h5>
            <h3>{item.title}</h3>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
