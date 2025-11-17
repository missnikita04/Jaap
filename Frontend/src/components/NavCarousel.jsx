import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { japData } from "../assets/assets";

const NavCarousel = ({ onImageSelect }) => {
const settings = {
  dots: false,
  infinite: true,
  speed: 400, // faster speed
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: "0px",
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        centerMode: true,
        centerPadding: "0px",
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        centerMode: true,
        centerPadding: "0px",
      },
    },
  ],
};
  return (
    <div className="w-full bg-transparent pt-16 text-white overflow-x-hidden">
      <div className="max-w-[99vw] mx-auto  pb-0 overflow-hidden">
        <Slider {...settings}>
          {japData.map((god, index) => (
            <div
              key={index}
              className="flex flex-col items-center transform transition-transform duration-300 hover:scale-110"
            >
              <img
                src={god.src}
                alt={god.name}
                onClick={() => onImageSelect(god)}
                className="object-cover rounded-full  w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 border-white shadow-lg mx-auto transition duration-300 hover:scale-105 !important"
              />
              <p className="mt-2 text-center text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg opacity-80 hover:opacity-100 transition-opacity duration-300 !important">
                {god.name}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default NavCarousel;
