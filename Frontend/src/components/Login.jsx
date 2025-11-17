import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("username", res.data.username);

      setMessage("Login successful!");
      setForm({ email: "", password: "" });
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data || "❌ Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#3B060A] px-4">
      <div className="w-full max-w-md bg-gradient-to-br from-[#FFF8DE] to-[#FBEBAA] text-[#3B060A] rounded-3xl shadow-lg shadow-[#F9CB43]/40 p-8">
        <h2 className="text-3xl font-bold text-center text-[#F9CB43] mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-1 text-[#3B060A] font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 pr-12 rounded-xl bg-[#3B060A] text-[#F9CB43] border border-[#F9CB43] focus:outline-none focus:ring-2 focus:ring-[#F9CB43] placeholder-[#F9CB43]/50"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block mb-1 text-[#3B060A] font-semibold">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 pr-12 rounded-xl bg-[#3B060A] text-[#F9CB43] border border-[#F9CB43] focus:outline-none focus:ring-2 focus:ring-[#F9CB43] placeholder-[#F9CB43]/50"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 translate-y-0 cursor-pointer text-yellow-800"
    style={{ top: "50%", transform: "translateY(30%)" }} 
            >
            
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>

          <div className="text-right">
            <Link
              to="/forget-password"
              className="text-sm text-[#8A0000] hover:text-yellow-300 transition"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-[#F9CB43] text-black font-bold py-2 rounded-xl hover:scale-105 transition-all"
          >
            Login
          </button>
        </form>

        {message && <p className="text-center text-yellow-400 mt-4">{message}</p>}

        <p className="text-center text-gray-600 mt-5">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#8A0000] hover:text-yellow-400 font-medium transition-all"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
