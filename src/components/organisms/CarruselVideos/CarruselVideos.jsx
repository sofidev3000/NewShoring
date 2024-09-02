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


  return (

    <Swiper
      modules={[ Navigation, Pagination]}

      slidesPerView={2}
      centeredSlides={true}
      spaceBetween={10}
      loop={true}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        944: {
          slidesPerView: 3,
          spaceBetween: 40,
        }
      }}
      navigation={true}

      className="max-w-[1300px] self-center flex flex-col items-center justify-start"
    >

      {carouselItems.map((item, index) => (
        <SwiperSlide key={index} className="h-[342px] w-[404px] self-center">
          <a href="/" className=" h-[342px] w-[404px] flex flex-col relative group   overflow-hidden">

            <img
              className=" h-[342px] w-[404px] object-cover  group-hover:scale-125 transition-transform duration-[.5s] ease-in-out"
              src={item.src}
              alt={item.title}
            />

            <div className="absolute w-14 top-[9rem] bottom-0 left-[50%] translate-x-[-50%] z-[100] fill-[#f1f1f1]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/></svg>
            </div>
            <div className="card-video flex flex-col translate-y-[-100%] top-[87%] left-5 absolute *:text-white *:text-left overflow-hidden  " >
              <h5 className="text-normal text-sm bg-[--background-glass] max-w-20 px-3 py-1 flex justify-center items-center ">{item.category}</h5>
              <h3 className="">{item.title}</h3>
            </div>
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
