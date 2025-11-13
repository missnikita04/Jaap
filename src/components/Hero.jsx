import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SplitText from "./SplitText";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFF8DE] to-[#FBEBAA] text-[#3B060A] relative overflow-hidden">
      {/* Subtle background aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#F9CB43_0%,transparent_60%)] opacity-40"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,#8A0000_0%,transparent_70%)] opacity-20"></div>

      {/* MAIN CONTENT */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 z-10">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full flex flex-col items-center py-16"
        >
          <SplitText
            text="Welcome to Jaap Bhakti"
            className="text-5xl sm:text-6xl font-bold text-[#8A0000] mb-6"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-lg text-[#3B060A]/80 max-w-2xl leading-relaxed px-6"
          >
            Chant, meditate, and connect with the Divine. Track your Bhakti
            rounds, time, and progress every day — with peace and devotion 🌸
          </motion.p>
        </motion.section>

        {/* Start Jaap Button */}
        <motion.div
          whileHover={{ scale: 1.08, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="mt-10 z-10"
        >
          <Link to="/jaap">
            <section className="flex justify-center gap-20 text-[#8A0000] bg-white py-8 px-10 rounded-2xl shadow-lg shadow-[#F9CB43]/30 hover:shadow-[#F9CB43]/60 hover:scale-105 transition-all cursor-pointer">
              <div className="items-center">
                <h2 className="text-2xl font-semibold">🌼 Start Jaap</h2>
              </div>
            </section>
          </Link>
        </motion.div>

        {/* Login / Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="text-center mt-10 space-y-3"
        >
          <p className="text-lg text-[#3B060A]/80">
            Log in to save your{" "}
            <span className="text-[#8A0000] font-semibold">Jaap Count</span>
            <Link
              to="/login"
              className="ml-2 text-[#F9CB43] font-medium hover:underline hover:text-[#8A0000] transition-all"
            >
              Login
            </Link>
          </p>

          <p className="text-[#3B060A]/70">
            Don’t have an account?
            <Link
              to="/signup"
              className="ml-2 text-[#F9CB43] font-medium hover:underline hover:text-[#8A0000] transition-all"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </main>

      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="py-4 border-t border-[#F9CB43]/40 w-full text-center text-[#3B060A]/70 text-sm backdrop-blur-md"
      >
        © 2025 <span className="text-[#8A0000] font-semibold">Jaap Bhakti</span> •
        Made with ❤️ and Faith
      </motion.footer>
    </div>
  );
};

export default HomePage;
