import React, { useState } from "react";
import TranslateText from "@src/customs/TranslateText.tsx";
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
      spaceBetween={1}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}

      className="max-w-[1300px] self-center flex flex-col items-center justify-center"
    >

      {carouselItems.map((item, index) => (
        <SwiperSlide key={index} className="h-[342px] w-[404px] self-centers">
          <div className=" h-[342px] w-[404px] flex flex-col relative group transition duration-[2s] ease-in-out overflow-hidden">
            <img
              className=" h-[342px] w-[404px] object-cover  group-hover:scale-125"
              src={item.src}
              alt={item.title}
            />
            <div className="card-video flex flex-col translate-y-[-100%] top-[87%] left-5 absolute *:text-white *:text-left overflow-hidden  " >
              <h5>
                {/* {item.category} */}
              <TranslateText client:load text={item.category} />
              </h5>
              <h3>
                {/* {item.title} */}
                <TranslateText client:load text={item.title} />
                </h3>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
