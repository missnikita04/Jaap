import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white backdrop-blur-sm shadow-md z-50">
      <div className="flex flex-wrap justify-between items-center px-4 sm:px-6 md:px-10 h-14 sm:h-16">

        {/* Logo / Title */}

        <Link  
        to ='/' 
        className="text-lg sm:text-2xl md:text-3xl text-[#8A0000] font-bold drop-shadow-[0_0_10px_rgba(255,200,0,0.8)]">
          🕉️ Jap Bhakti
        </Link>

        {/* Buttons */}
        <div className="flex gap-2 sm:gap-3 md:gap-4 items-center">
          <Link to="/login">
            <button className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm md:text-base border border-[#F9CB43] rounded-lg hover:bg-[#F9CB43] hover:text-black transition-all">
              Login
            </button>
          </Link>

          <Link to="/signup">
            <button className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm md:text-base bg-[#F9CB43] text-black font-semibold rounded-lg hover:scale-105 transition-all">
              Sign Up
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile divider line for visual polish */}
      <div className="block sm:hidden h-[1px] bg-[#F9CB43]/40 w-full" />
    </nav>
  );
};

export default Navbar;
