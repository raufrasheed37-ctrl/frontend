"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // STEP 1: SEND OTP
  const sendOtp = async () => {
    try {
      const res = await fetch("https://auth-app-zg5k.onrender.com/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("OTP sent to your email");
        setStep(2); // move to next step
      } else {
        alert(data.message || "User not found");
      }
    } catch (err) {
      alert("Error sending OTP");
    }
  };

  // STEP 2: RESET PASSWORD
  const resetPassword = async () => {
    try {
      const res = await fetch("https://auth-app-zg5k.onrender.com/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Password reset successful");
        router.push("/login"); // redirect back
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (err) {
      alert("Error resetting password");
    }
  };

  return (
    <div className="container">
      <div className="card">

        <h2 className="title">Reset Password</h2>

        {step === 1 && (
          <>
            <input
              className="input"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <button className="button" onClick={sendOtp}>
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              className="input"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
            />

            <input
              type="password"
              className="input"
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="button" onClick={resetPassword}>
              Reset Password
            </button>
          </>
        )}

      </div>
    </div>
  );
}
