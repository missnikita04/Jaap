import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const navigate = useNavigate();

  // Step 1 - Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email first");
    try {
      setIsSendingOtp(true);
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );
      setMsg(res.data.msg || "OTP sent to your email");
      setStep(2);
    } catch (err) {
      setMsg(err.response?.data?.msg || "Something went wrong");
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Step 2 - Verify OTP & Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email || !otp || !newPassword)
      return alert("Please fill all fields!");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        { email, otp, newPassword }
      );
      setMsg(res.data.msg || "Password reset successful!");
      setSuccess(true);
      setEmail("");
      setOtp("");
      setNewPassword("");

      // redirect
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMsg(err.response?.data?.msg || "Something went wrong");
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF8DE] px-4">
      <div className="relative w-full max-w-md bg-[#8A0000]/90 backdrop-blur-md border border-[#F9CB43]/40 rounded-3xl shadow-lg shadow-[#F9CB43]/30 p-8 text-white">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F9CB43] text-[#3B060A] px-5 py-1 rounded-full text-sm font-bold shadow-md">
          Forget Password
        </div>

        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-[#FFF8DE] mt-6 mb-4 ">
          {success ? "🎉 Password Reset Successful!" : "Reset Your Password"}
        </h2>

        {/* Step 1: Email */}
        {!success && step === 1 && (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <label className="block font-semibold">Registered Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-xl bg-[#3B060A] border border-[#F9CB43] focus:outline-none focus:ring-2 focus:ring-[#FFF8DE]"
            />

            <button
              type="submit"
              disabled={isSendingOtp}
              className={`w-full py-2 font-bold rounded-xl transition-all ${
                isSendingOtp
                  ? "bg-gray-500 text-white"
                  : "bg-[#F9CB43] text-[#3B060A] hover:scale-105"
              }`}
            >
              {isSendingOtp ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* Step 2: OTP + New Password */}
        {!success && step === 2 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <label className="block font-semibold">Enter OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-xl bg-[#3B060A] border border-[#F9CB43] focus:outline-none focus:ring-2 focus:ring-[#F9CB43]"
            />

            <label className="block font-semibold">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-xl bg-[#3B060A] border border-[#F9CB43] focus:outline-none focus:ring-2 focus:ring-[#F9CB43]"
            />

            <button
              type="submit"
              className="w-full bg-[#F9CB43] text-[#3B060A] font-bold py-2 rounded-xl hover:scale-105 transition-all"
            >
              Reset Password
            </button>
          </form>
        )}

        {/* ✅ Success Message */}
        {success && (
          <div className="text-center text-green-400 font-medium mt-6 animate-pulse">
            Password successfully reset! Redirecting to login...
          </div>
        )}

        {/* Message */}
        {!success && msg && (
          <p className="text-center text-yellow-400 mt-4">{msg}</p>
        )}

        {/* Back to login */}
        {!success && (
          <p className="text-center text-gray-300 mt-6">
            Remember your password?{" "}
            <span
              className="text-[#F9CB43] hover:text-yellow-300 font-semibold cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Go to Login
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
