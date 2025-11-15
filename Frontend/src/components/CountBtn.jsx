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
  const [clicked, setClicked] = useState(false);
  const intervalRef = useRef(null);

  const handleClick = async () => {
    setCount((prev) => prev + 1);
    setShowPlusOne(true);
    setClicked(true);
    setTimeout(() => setShowPlusOne(false), 600);
    setTimeout(() => setClicked(false), 300);

    if (!isActive) {
      setIsActive(true);
      intervalRef.current = setInterval(() => SetTimer((prev) => prev + 1), 1000);
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_URL}/api/dashboard/count`,
        { count: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCount(res.data.count);
      setRound(res.data.rounds);
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
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      className="sm:scale-90 flex flex-col gap-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Line 1: Timer + Reset */}
      <div className="flex gap-6 items-center bg-[#1b0a0c] p-4 rounded-3xl">
        <div className="flex gap-2 items-center">
          <CiStopwatch className="text-[#F9CB43] w-10 h-10" />
          <h1 className="text-[#F9CB43] text-2xl font-bold w-20 text-center">
            {formatTime(timer)}
          </h1>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 px-5 py-2 rounded-xl
             text-lg font-semibold text-[#3B060A] bg-gradient-to-r from-[#FFF287] to-[#FFD54F]
             transition-all duration-300 ease-out hover:from-[#8A0000] hover:to-[#E52B2B] hover:text-white active:scale-95"
        >
          <GrPowerReset className="w-6 h-6 text-[#3B060A] group-hover:text-white transition-colors duration-300" />
          Reset
        </button>
      </div>

      {/* Line 2: Count + Round */}
      <div className="flex gap-6 sm:gap-10 items-center bg-[#1b0a0c] p-4 rounded-3xl">
        <p className="text-2xl sm:text-3xl font-semibold text-white flex items-center">
          Count :&nbsp;<span className="font-mono text-[#F9CB43]">{count}</span>
        </p>

        <p className="text-2xl sm:text-3xl font-semibold text-white flex items-center">
          Round :&nbsp;<span className="font-mono text-[#F9CB43]">{round}</span>
        </p>
      </div>

      {/* Line 3: Count Button */}
      <div className="relative flex justify-center">
        <motion.button
          onClick={handleClick}
          className={`w-[280px] sm:w-[320px] h-[100px] sm:h-[200px] flex items-center justify-center gap-2
             rounded-xl font-bold text-lg sm:text-xl transition-all duration-300 ease-out
             ${clicked ? "bg-red-600 text-white" : "bg-gradient-to-r from-[#FFF287] to-[#FFD54F]"}
             hover:from-[#F9CB43] hover:to-[#FFD54F]`}
          whileTap={{ scale: 0.95 }}
        >
          <IoMdFlower className="w-6 h-6 sm:w-7 sm:h-7 text-[#3B060A]" />
          Count
          <IoMdFlower className="w-6 h-6 sm:w-7 sm:h-7 text-[#3B060A]" />
        </motion.button>

        {/* +1 Animation */}
        <AnimatePresence>
          {showPlusOne && (
<motion.button
  onClick={handleClick}
  className={`w-[280px] sm:w-[320px] h-[100px] sm:h-[150px] flex items-center justify-center gap-2
    rounded-xl font-bold text-lg sm:text-xl transition-all duration-300 ease-out
    ${clicked ? "bg-red-600 text-white" : "bg-gradient-to-r from-[#FFF287] to-[#FFD54F]"}
    hover:from-[#F9CB43] hover:to-[#FFD54F]`}
  whileTap={{ scale: 0.95 }}
>
  <IoMdFlower className="w-6 h-6 sm:w-7 sm:h-7 text-[#3B060A]" />
  Count
  <IoMdFlower className="w-6 h-6 sm:w-7 sm:h-7 text-[#3B060A]" />
</motion.button>          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default CountBtn;
