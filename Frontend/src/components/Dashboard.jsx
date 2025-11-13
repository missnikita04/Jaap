import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const [total, setTotal] = useState(0);
  const [username, setUsername] = useState("");
  const [rounds, setRounds] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        const res = await axios.get("http://localhost:5000/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(res.data.message);
        setUsername(res.data.username || "");
        setTotal(res.data.count);
        setRounds(res.data.rounds || 0);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF8DE] to-[#FBEBAA] text-[#3B060A] px-4 py-10 relative">
      
      {/* Floating background aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#F9CB43_0%,transparent_60%)] opacity-40"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,#8A0000_0%,transparent_70%)] opacity-20"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-2xl bg-white/90 rounded-3xl shadow-lg shadow-[#8A0000]/20 border border-[#F9CB43]/40 p-8 backdrop-blur-md"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#8A0000]">
            👋 Hi, <span className="text-[#F9CB43]">{username || "Guest"}</span>!
          </h1>
          <button
            onClick={handleLogout}
            className="bg-[#8A0000] text-[#FFF8DE] px-4 py-2 rounded-xl hover:scale-105 transition-all font-semibold"
          >
            Logout
          </button>
        </div>

        {/* Motivational Message */}
        <p className="text-lg text-gray-700 mb-6 italic">
          🌸 {message || "Loading your Jaap Dashboard..."} 🌸
        </p>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[#FFF8DE] border border-[#F9CB43] rounded-2xl text-center p-5 shadow-inner"
          >
            <h2 className="text-3xl font-bold text-[#8A0000]">{total}</h2>
            <p className="text-[#3B060A] font-medium">Total Count</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[#FFF8DE] border border-[#F9CB43] rounded-2xl text-center p-5 shadow-inner"
          >
            <h2 className="text-3xl font-bold text-[#8A0000]">{rounds}</h2>
            <p className="text-[#3B060A] font-medium">Total Rounds</p>
          </motion.div>
        </div>

        {/* Start Button */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link to="/jaap" className="block w-full">
            <section className="flex justify-center items-center bg-[#8A0000] text-[#F9CB43] py-5 rounded-2xl font-semibold text-xl hover:shadow-lg hover:shadow-[#F9CB43]/40 transition-all">
              🌼 Start Jaap
            </section>
          </Link>
        </motion.div>

        {/* Inspirational Quote */}
        <div className="mt-7 text-center text-sm text-gray-600 italic">
          "Every chant brings you closer to peace within."
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
