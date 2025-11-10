import React, { useState } from "react";
import axios from "axios";

const SignupForm = () => {
    const [message, setMessage] = useState("");
  const [form, setFormData] = useState({
    
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log("Signup data:", form);
    // Here you can call your API to register the user

    try{
await axios.post("http://localhost:5000/api/auth/signup", form);
        setMessage("signup succesfully you can now login");
    }catch(err){
        setMessage(err.response?.data?.error || "Error")
        
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#3B060A] px-4">
      <div className="w-full max-w-md bg-[#8A0000] rounded-3xl shadow-lg shadow-[#F9CB43]/40 p-8 text-white">
        <h2 className="text-3xl font-bold text-center text-[#F9CB43] mb-6 drop-shadow-[0_0_10px_rgba(255,200,0,0.8)]">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block mb-1 font-semibold" htmlFor="username">
              Username
            </label>
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

          {/* Password */}
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

          {/* Forgot Password */}
          <div className="text-right">
            <a
              href="/forgot-password"
              className="text-[#F9CB43] hover:text-yellow-400 text-sm transition-all"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#F9CB43] text-black font-bold py-2 rounded-xl hover:scale-105 transition-all"
          >
            Sign Up
          </button>
        </form>

        {/* Already have account */}
        <p className="text-center text-gray-300 mt-5">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#F9CB43] hover:text-yellow-400 font-medium transition-all"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
