import React, { useState } from "react";
import NavCarousel from "./NavCarousel";
import ShowImage from "./ShowImage";
import CountBtn from "./CountBtn";

const Jaap = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="w-full min-h-screen bg-[#3B060A] flex flex-col items-center overflow-x-hidden">
      {/* Carousel */}
      <div className="w-full overflow-hidden">
        <NavCarousel onImageSelect={setSelectedImage} />
      </div>

      {/* Main content */}
      <div
        className="
          flex flex-col md:flex-row 
          items-center justify-center 
          gap-8 md:gap-16 
          px-4 sm:px-6 md:px-10 
          py-10 w-full max-w-[1200px] 
          mx-auto
        "
      >
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <ShowImage selectedImage={selectedImage} />
        </div>

        {/* Counter Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <CountBtn />
        </div>
      </div>
    </div>
  );
};

export default Jaap;
