import React from "react";

const ShowImage = ({ selectedImage }) => {
  return (
    <div className="relative  transform transition-transform duration-500 ease-in-out
                         hover:shadow-2xl hover:shadow-[#F9CB43] hover:bg-white  group p-[4px] rounded-3xl pt-0">
      <div className=" max-w-[90vw] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] w-full">
        {selectedImage ? (
          <div className="bg-[#8A0000] border-2 border-yellow-300 rounded-3xl 
                shadow-[0_0_30px_10px_rgba(255,215,0,0.6)] overflow-hidden">
            <img
              src={selectedImage.src}
              alt="Selected"
              className=" mx-auto px-auto  rounded-lg rounded-2xl  w-[250px] h-[350px] sm:w-[300px] sm:h-[450px] md:w-[350px] md:h-[530px]  object-cover shadow-xl border-1  border-black/50
                         transform transition-transform duration-500 ease-in-out
                         group-hover:scale-105 group-hover:shadow-2xl"
            />

            <h2 className="pb-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mt-6 bg-white bg-clip-text text-transparent drop-shadow-[0_2px_6px_rgba(255,200,0,0.5)]">
              {selectedImage.name}
            </h2>

            {/* Optional: Overlay on hover */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-2xl"></div>
          </div>
        ) : (
         <div className="bg-white rounded-full  ">

          <p className=" p-2 text-[#8A0000] text-xl sm:text-2xl md:text-3xl text-center italic">
            Click an image to view 
          </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowImage;
