import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

const SignupForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // show/hide password

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // clear previous message

    try {
      const res = await axios.post(`${API_URL}/api/auth/signup`, form);

      if (res.status === 201 && res.data.userId) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("username", res.data.username);

        alert("Signup successful! Please login now.");
        navigate("/login");

        // clear form
        setForm({ username: "", email: "", password: "" });
      } else {
        setMessage("Signup failed! Please try again.");
      }
    } catch (err) {
      console.error("Signup API error:", err);
      setMessage(err.response?.data?.error || "Signup failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#3B060A] px-4">
      <div className="w-full max-w-md bg-gradient-to-br from-[#FFF8DE] to-[#FBEBAA] text-[#3B060A] rounded-3xl shadow-lg shadow-[#F9CB43]/40 p-8 text-white">
        <h2 className="text-3xl font-bold text-center text-[#F9CB43] mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block mb-1 text-[#3B060A] font-semibold">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full px-4 py-2 rounded-xl bg-[#3B060A] border border-[#F9CB43] focus:outline-none focus:ring-2 focus:ring-[#F9CB43] placeholder-gray-300"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-[#3B060A] font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-xl bg-[#3B060A] border border-[#F9CB43] focus:outline-none focus:ring-2 focus:ring-[#F9CB43] placeholder-gray-300"
              required
            />
          </div>

          {/* Password with Eye */}
          <div className="relative">
            <label className="block mb-1 text-[#3B060A] font-semibold">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 pr-12 rounded-xl bg-[#3B060A] border border-[#F9CB43] focus:outline-none focus:ring-2 focus:ring-[#F9CB43] placeholder-gray-300"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
 className="absolute right-3 top-1/2 translate-y-0 cursor-pointer text-yellow-800"
    style={{ top: "50%", transform: "translateY(20%)" }}             >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>

          {message && (
            <p className="text-center mt-4 text-yellow-400 font-medium">{message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#F9CB43] text-black font-bold py-2 rounded-xl hover:scale-105 transition-all"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-700 mt-5">
          Already have an account?{" "}
          <a href="/login" className="text-[#8A0000] hover:text-yellow-400 font-medium transition-all">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
