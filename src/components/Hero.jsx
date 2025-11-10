import React from "react";
import { Link } from "react-router-dom";
import SplitText from "./SplitText";
const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#3B060A] text-white">
      {/* MAIN CONTENT */}
      <main className="flex-grow flex flex-col items-center">
        {/* Hero Section */}
        <section className="mt-20 relative w-full flex flex-col items-center text-center py-16 px-">
         <SplitText
  text="Welcome to Jap Bhakti"
  className="text-4xl  text-center text-yellow-300 mb-5"
  delay={100}
  duration={0.6}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  rootMargin="-100px"
  textAlign="center"
  // onLetterAnimationComplete={handleAnimationComplete}
/>
          <p className="text-lg text-gray-300 max-w-2xl">
            Chant, Meditate and Connect with the Divine. Track your Bhakti rounds,
            time, and progress every day with peace and devotion.
          </p>
        </section>

        {/* Start Jaap Section */}
        <Link to="/jaap" className="w-fit">
          <section className="flex justify-center gap-20 mt-6 text-[#8A0000] bg-white py-10 px-10 rounded-2xl shadow-md shadow-[#F9CB43]/20 hover:scale-105 transition-all shadow-lg shadow-[#F9CB43]/30 cursor-pointer">
            <div className="items-center">
              <h2 className="text-2xl font-semibold">Start Jaap</h2>
            </div>
          </section>
        </Link>

        {/* Login / Signup */}
        <div className="text-center mt-10 space-y-2">
          <p className="text-lg text-gray-300">
            Log in to save your{" "}
            <span className="text-[#FFF287] font-semibold">Jap Count</span>
            <a
              href="/login"
              className="ml-2 text-[#F9CB43] font-medium hover:underline hover:text-yellow-400 transition-all"
            >
              Login
            </a>
          </p>

          <p className="text-gray-400">
            Don’t have an account?
            <a
              href="/signup"
              className="ml-2 text-[#F9CB43] font-medium hover:underline hover:text-yellow-400 transition-all"
            >
              Sign up
            </a>
          </p>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-4 border-t border-[#F9CB43]/30 w-full text-center text-gray-400 text-sm">
        © 2025 BhaktiTracker • Made with ❤️ and Faith
      </footer>
    </div>
  );
};

export default HomePage;
