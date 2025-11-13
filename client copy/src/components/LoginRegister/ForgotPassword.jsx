import React, { useState } from "react";
import "../../index.css";
import { useContextState } from "../../context/userProvider";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide, Bounce } from "react-toastify";
import logo from "../assets/group7.png";
import image3 from "../assets/image3.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [isLoadingOtp, setIsLoadingOtp] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);
  const { baseURL } = useContextState();
  const navigate = useNavigate();

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    setIsLoadingEmail(true);
    try {
      const response = await fetch(`${baseURL}/api/passwordreset/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(`Password reset link sent to ${email}`);
        setOtpSent(true);
      } else {
        toast.error("There was an error sending the OTP. Please try again.");
      }
    } catch (err) {
      // console.error("Error sending OTP:", err);
      toast.error("There was an error sending the OTP. Please try again.");
    } finally {
      setIsLoadingEmail(false);
    }
  };

  const handleOtpVerification = async (event) => {
    event.preventDefault();
    setIsLoadingOtp(true);
    try {
      const response = await fetch(` ${baseURL}/api/passwordreset/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: otp,
          email: email,
        }),
      });

      if (response.ok) {
        alert("OTP verified successfully");
        setOtpVerified(true);
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      alert("There was an error verifying the OTP. Please try again.");
    } finally {
      setIsLoadingOtp(false);
    }
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    setIsLoadingPassword(true);
    try {
      const response = await fetch(
        `${baseURL}/api/passwordreset/setnewpassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            otp: otp,
            newPassword: newPassword,
          }),
        }
      );

      if (response.ok) {
        alert("Password updated successfully");

        setEmail("");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
        setOtpSent(false);
        setOtpVerified(false);
        navigate("/");
      } else {
        alert("There was an error updating your password. Please try again.");
      }
    } catch (err) {
      console.error("Error setting password:", err);
      alert("There was an error updating your password. Please try again.");
    } finally {
      setIsLoadingPassword(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        limit={2}
        newestOnTop={true}
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <div
        style={{
          backgroundImage: `url(${image3})`,
          backgroundSize: "cover", // Ensures the image fully covers the background
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
        className="p-8 min-h-screen flex items-center justify-center"
      >
        <div className="w-full max-w-md bg-gradient-to-br from-blue-600/40 to-blue-600/40 rounded-3xl shadow-lg p-8 border border-white/20">
          <div className="flex items-center justify-center space-x-4">
            <img
              src={logo}
              alt="Logo"
              className="w-20 h-20 object-contain animate-pulse-grow"
            />
            <div className="text-5xl text-blue-950 font-extrabold drop-shadow-sm animate-fade-in">
              OSP
            </div>
          </div>
          <h2 className="text-4xl font-bold text-black mt-2 mb-6 text-center drop-shadow-sm animate-fade-in">
            Forgot Password
          </h2>

          {!otpSent && !otpVerified && (
            <form onSubmit={handlePasswordReset} className="space-y-6">
              <div className="space-y-2">
                <label className="text-black text-lg">Email</label>
                <input
                  type="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-white backdrop-blur-sm rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-slate-600"
                />
              </div>
              <button
                type="submit"
                disabled={isLoadingEmail}
                className="w-full py-2.5 bg-white backdrop-blur-sm text-black font-semibold rounded-xl shadow-lg hover:bg-white/20 border border-white/20 transition-all duration-300"
              >
                {isLoadingEmail ? "Sending..." : "Send Password Reset Link"}
              </button>
            </form>
          )}

          {otpSent && !otpVerified && (
            <form onSubmit={handleOtpVerification} className="space-y-6">
              <div className="space-y-2">
                <label className="text-black/90">OTP</label>
                <input
                  type="text"
                  placeholder="Enter the OTP sent to your email"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-white backdrop-blur-sm rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-slate-600"
                />
              </div>
              <button
                type="submit"
                disabled={isLoadingOtp}
                className="w-full py-2.5 bg-white backdrop-blur-sm text-black font-semibold rounded-xl shadow-lg hover:bg-white/20 border border-white/20 transition-all duration-300"
              >
                {isLoadingOtp ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}

          {otpVerified && (
            <form onSubmit={handlePasswordChange} className="space-y-6">
              <div className="space-y-2">
                <label className="text-black/90">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-white backdrop-blur-sm rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-slate-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-black/90">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-white backdrop-blur-sm rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-slate-600"
                />
              </div>
              <button
                type="submit"
                disabled={isLoadingPassword}
                className="w-full py-2.5 bg-white backdrop-blur-sm text-black font-semibold rounded-xl shadow-lg hover:bg-white/20 border border-white/20 transition-all duration-300"
              >
                {isLoadingPassword ? "Updating..." : "Reset Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
