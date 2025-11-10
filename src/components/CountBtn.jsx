import React from "react";
import { useState, useEffect, useRef } from "react";
// import { FaEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa";
import { CiStopwatch } from "react-icons/ci";
import { IoMdFlower } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import axios from "axios";
function CountBtn() {
  const [timer, SetTimer] = useState(0);
  const [count, setCount] = useState(0);
  const [round, setRound] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);
  //   const [Eye, setEye] = useState(false);
  // Example useEffect: run when count changes
  //   useEffect(() => {
  //     console.log(`Button pressed ${count} times`);
  //   }, [count]);

  const handleClick = async() => {
    setCount((prev) => prev + 1);
    if (!isActive) {
      setIsActive(true);
      intervalRef.current = setInterval(() => {
        SetTimer((prev) => prev + 1);
      }, 1000);
    }
  try {
      await axios.post("http://localhost:5000/api/count", { count: 1 });
      console.log("✅ Sent to backend, local count:", count + 1);
    } catch (error) {
      console.error("❌ Error sending count:", error);
    }  };


  // Reset functionality
  const handleReset=()=>{
    //stop  timer
    clearInterval(intervalRef.current);
    intervalRef.current=null;
     // Reset all states
    SetTimer(0);
    setCount(0);
    setRound(0);
    setIsActive(false);
    // Clear saved data
    localStorage.removeItem("count");
    localStorage.removeItem("round");

    console.log("Timer, Count, and Round reset successfully!");


  }
  
//increser round after 108 counts
  useEffect(() => {
    if (count >= 108) {
      setRound((prevRound) => prevRound + 1);
      setCount(0); // reset counter
    }
  }, [count]);

  //   load save count and round form loacal storage
  useEffect(() => {
    const savedCount = localStorage.getItem("count");
    const savedRound = localStorage.getItem("round");

    if (savedCount) setCount(Number(savedCount));
    if (savedRound) setRound(Number(savedRound));
  }, []);

  //save to local storage when count round d change
  useEffect(() => {
    localStorage.setItem("count", count);
    localStorage.setItem("round", round);
  }, [count, round]);

  // Cleanup on unmount
  //   useEffect(() => {
  //     return () => clearInterval(intervalRef.current);
  //   }, []);

  //   Formate time aas HH:MM:SS
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 36000) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <div>
        <div>
          <div className="flex gap-30">
            <div className="flex gap-2 items-center">
              <CiStopwatch className="text-[#F9CB43] w-10 h-10" />
              <h1 className="text-[#F9CB43] text-2xl w-16 text-center">
                {formatTime(timer)}
              </h1>
            </div>{" "}
            {/* reset button */}
            <button
              onClick={handleReset}
              className="group relative flex items-center justify-center gap-2 px-5 py-2 rounded-xl 
             text-xl font-semibold text-[#3B060A] bg-gradient-to-r from-[#FFF287] to-[#FFD54F]
             shadow-[0_0_10px_rgba(249,203,67,0.6)] transition-all duration-300 ease-out
             hover:from-[#8A0000] hover:to-[#E52B2B] hover:text-white hover:shadow-[0_0_25px_rgba(249,203,67,0.9)] 
             active:scale-95 overflow-hidden"
            >
              {/* Subtle glow effect behind on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300"></span>

              {/* Icon and text */}
              <GrPowerReset className="w-6 h-6 text-[#3B060A] group-hover:text-white transition-colors duration-300" />
              <span className="relative z-10">Reset</span>
            </button>
          </div>
          <div className="ml-1 flex items-center gap-20">
            <p className="mt-10 mb-9 text-3xl font-semibold text-white flex items-center">
              Count :&nbsp;
              <span className="inline-block w-16  font-mono">{count}</span>
            </p>

            <p className="mt-10 mb-9 text-3xl font-semibold text-white flex items-center">
              Round :&nbsp;
              <span className="inline-block w-16  font-mono">{round}</span>
            </p>
          </div>
        </div>

        <div className=" pl-30">
          <button
            onClick={handleClick}
            className="w-40 h-40 group relative flex items-center justify-center gap-2 px-5 py-2 rounded-full 
             text-xl font-semibold text-[#3B060A] bg-gradient-to-r from-[#FFF287] to-[#FFD54F]
             shadow-[0_0_10px_rgba(249,203,67,0.6)] transition-all duration-300 ease-out
             hover:from-[#8A0000] hover:to-[#E52B2B] hover:text-white hover:shadow-[0_0_25px_rgba(249,203,67,0.9)] 
             active:scale-95 overflow-hidden"
          >
            {/* Subtle glow effect behind on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300"></span>

            {/* Icon and text */}
            <IoMdFlower className="w-6 h-6 text-[#3B060A] group-hover:text-white transition-colors duration-300" />
            <span className="relative z-10">Count</span>
            <IoMdFlower className="w-6 h-6 text-[#3B060A] group-hover:text-white transition-colors duration-300" />
          </button>

        </div>
      </div>
    </>
  );
}

export default CountBtn;
