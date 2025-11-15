import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ShowImage = ({ selectedImage }) => {
  return (
    <div className="relative transform transition-transform duration-500 ease-in-out
                    hover:shadow-[0_0_30px_10px_rgba(249,203,67,0.6)] hover:bg-white group p-1 rounded-3xl pt-0">
      <div className="max-w-[90vw] sm:max-w-[300px] md:max-w-[450px] lg:max-w-[500px] w-full mx-auto !important">
        <AnimatePresence mode="wait">
          {selectedImage ? (
            <motion.div
              key={selectedImage.src}
              initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 2 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="bg-[#8A0000] border-2 border-yellow-300 rounded-3xl 
                         shadow-[0_0_30px_10px_rgba(255,215,0,0.6)] overflow-hidden relative"
            >
              <motion.img
                src={selectedImage.src}
                alt={selectedImage.name}
                className="mx-auto rounded-lg 
                           w-[200px] h-[300px] sm:w-[300px] sm:h-[450px] md:w-[350px] md:h-[530px] 
                           object-cover shadow-xl border border-black/50
                           transform transition-transform duration-500 ease-in-out
                           group-hover:scale-105 group-hover:shadow-[0_0_30px_15px_rgba(249,203,67,0.7)] !important"
                whileTap={{ scale: 0.95, rotate: [0, -3, 3, 0] }}
              />

              <motion.h2
                className="pb-4 text-xl sm:text-3xl md:text-4xl font-extrabold text-center mt-6 bg-white bg-clip-text text-transparent 
                           drop-shadow-[0_2px_6px_rgba(255,200,0,0.5)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {selectedImage.name}
              </motion.h2>

              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
            </motion.div>
          ) : (
            <motion.div
              key="no-image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-full"
            >
              <p className="p-2 text-[#8A0000] text-lg sm:text-2xl md:text-3xl text-center italic !important">
                Click an image to view
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ShowImage;
