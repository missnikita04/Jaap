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

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle login submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, form);

      // Save token + user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("username", res.data.username);

      setMessage("Login successful!");

      // Clear form
      setForm({ email: "", password: "" });

      // Redirect to dashboard
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

        {/* LOGIN FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label
              className="block mb-1 text-[#3B060A] font-semibold"
              htmlFor="email"
            >
              Email
            </label>
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

          {/* Password Input with Eye */}
          <div className="relative">
            <label
              className="block mb-1 text-[#3B060A] font-semibold"
              htmlFor="password"
            >
              Password
            </label>
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
    style={{ top: "50%", transform: "translateY(30%)" }} 
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link
              to="/forget-password"
              className="text-sm text-[#8A0000] hover:text-yellow-300 transition"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#F9CB43] text-black font-bold py-2 rounded-xl hover:scale-105 transition-all"
          >
            Login
          </button>
        </form>

        {/* Message */}
        {message && (
          <p className="text-center text-yellow-400 mt-4">{message}</p>
        )}

        {/* Sign Up Link */}
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
