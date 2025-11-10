import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", res.data.token); // Save JWT token
      setMessage("Login successful!");
      setTimeout(() => navigate("/dashboard"), []); // Redirect after success
    } catch (err) {
      setMessage(err.response?.data?.error || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#3B060A] px-4">
      <div className="w-full max-w-md bg-[#8A0000] rounded-3xl shadow-lg shadow-[#F9CB43]/40 p-8 text-white">
        <h2 className="text-3xl font-bold text-center text-[#F9CB43] mb-6 drop-shadow-[0_0_10px_rgba(255,200,0,0.8)]">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-semibold" htmlFor="email">
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

          <div>
            <label className="block mb-1 font-semibold" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-xl bg-[#3B060A] border border-[#F9CB43] focus:outline-none focus:ring-2 focus:ring-[#F9CB43] placeholder-gray-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#F9CB43] text-black font-bold py-2 rounded-xl hover:scale-105 transition-all"
          >
            Login
          </button>
        </form>

        {message && <p className="text-center text-yellow-400 mt-4">{message}</p>}

        <p className="text-center text-gray-300 mt-5">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-[#F9CB43] hover:text-yellow-400 font-medium transition-all"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
