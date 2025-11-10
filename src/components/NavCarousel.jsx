import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {japData} from '../assets/assets';

const NavCarousel = ({ onImageSelect }) => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2300,
     responsive: [
    {
      breakpoint: 1024, // large screens
      settings: { slidesToShow: 6 },
    },
    {
      breakpoint: 768, // tablets
      settings: { slidesToShow: 4 },
    },
    {
      breakpoint: 480, // mobile
      settings: { slidesToShow: 2 },
    },
  ],

    // 
    
  };
  const god=japData;

  return (
<div className="w-full bg-transparent pt-16 text-white overflow-x-hidden">
  <div className="max-w-[95vw] mx-auto pt-5 pb-0 overflow-hidden">        <Slider {...settings}>
          {god.map((god, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={god.src}
                alt={god.name}
                onClick={() => {
                  onImageSelect(god);
                }}
                className=" object-cover rounded-full w-24 h-24 object-cover border-white shadow-lg mx-auto transition-transition duration-300 hover:scale-105 "
              />
              <div>
              <p className="mt-2 text-center text-white font-semibold text-lg
                           opacity-80 hover:opacity-100 transition-opacity duration-300" >{god.name}</p>
                           </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default NavCarousel;
