import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CiStopwatch } from "react-icons/ci";
import { IoMdFlower } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

function CountBtn() {
  const [timer, SetTimer] = useState(0);
  const [count, setCount] = useState(0);
  const [round, setRound] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showPlusOne, setShowPlusOne] = useState(false);
  const intervalRef = useRef(null);

  const handleClick = async () => {
    setCount((prev) => prev + 1);
    setShowPlusOne(true);
    setTimeout(() => setShowPlusOne(false), 600);

    if (!isActive) {
      setIsActive(true);
      intervalRef.current = setInterval(() => {
        SetTimer((prev) => prev + 1);
      }, 1000);
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/api/dashboard/count`,
        { count: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("❌ Error sending count:", error);
    }
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    SetTimer(0);
    setCount(0);
    setRound(0);
    setIsActive(false);
    localStorage.removeItem("count");
    localStorage.removeItem("round");
  };

  useEffect(() => {
    if (count >= 108) {
      setRound((prevRound) => prevRound + 1);
      setCount(0);
    }
  }, [count]);

  useEffect(() => {
    const savedCount = localStorage.getItem("count");
    const savedRound = localStorage.getItem("round");
    if (savedCount) setCount(Number(savedCount));
    if (savedRound) setRound(Number(savedRound));
  }, []);

  useEffect(() => {
    localStorage.setItem("count", count);
    localStorage.setItem("round", round);
  }, [count, round]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 36000) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      className=""
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <div>
        <div className="flex gap-30">
          <div className="flex gap-2 items-center">
            <CiStopwatch className="text-[#F9CB43] w-10 h-10" />
            <h1 className="text-[#F9CB43] text-2xl w-16 text-center">
              {formatTime(timer)}
            </h1>
          </div>

          <button
            onClick={handleReset}
            className="group relative flex items-center justify-center gap-2 px-5 py-2 rounded-xl 
             text-xl font-semibold text-[#3B060A] bg-gradient-to-r from-[#FFF287] to-[#FFD54F]
             shadow-[0_0_10px_rgba(249,203,67,0.6)] transition-all duration-300 ease-out
             hover:from-[#8A0000] hover:to-[#E52B2B] hover:text-white hover:shadow-[0_0_25px_rgba(249,203,67,0.9)] 
             active:scale-95 overflow-hidden"
          >
            <GrPowerReset className="w-6 h-6 text-[#3B060A] group-hover:text-white transition-colors duration-300" />
            <span className="relative z-10">Reset</span>
          </button>
        </div>

        <div className="ml-1 flex items-center gap-20">
          <p className="mt-10 mb-9 text-3xl font-semibold text-white flex items-center">
            Count :&nbsp;
            <span className="inline-block w-16 font-mono text-[#F9CB43]">
              {count}
            </span>
          </p>

          <p className="mt-10 mb-9 text-3xl font-semibold text-white flex items-center">
            Round :&nbsp;
            <span className="inline-block w-16 font-mono text-[#F9CB43]">
              {round}
            </span>
          </p>
        </div>
      </div>

      <div className="pl-30 relative">
        <motion.button
          onClick={handleClick}
          className="w-40 h-40 group relative flex items-center justify-center gap-2 px-5 py-2 rounded-full 
             text-xl font-semibold text-[#3B060A] bg-gradient-to-r from-[#FFF287] to-[#FFD54F]
             shadow-[0_0_10px_rgba(249,203,67,0.6)] transition-all duration-300 ease-out
             hover:from-[#8A0000] hover:to-[#E52B2B] hover:text-white hover:shadow-[0_0_25px_rgba(249,203,67,0.9)] 
             active:scale-95 overflow-hidden"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
        >
          <IoMdFlower className="w-6 h-6 text-[#3B060A] group-hover:text-white transition-colors duration-300" />
          <span className="relative z-10">Count</span>
          <IoMdFlower className="w-6 h-6 text-[#3B060A] group-hover:text-white transition-colors duration-300" />
        </motion.button>

        <AnimatePresence>
          {showPlusOne && (
            <motion.div
              key="plusOne"
              className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 text-3xl font-bold text-[#F9CB43]"
              initial={{ opacity: 0, y: 10, scale: 0.5, rotate: -15 }}
              animate={{
                opacity: 1,
                y: -50,
                scale: 1.5,
                rotate: [0, 15, -10, 0],
              }}
              exit={{ opacity: 0, y: -80, scale: 0.5 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              +1 🌸
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default CountBtn;
