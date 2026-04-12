"use client";

import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const sendOtp = async () => {
    await fetch("https://auth-app-zg5k.onrender.com/api/auth/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    setStep(2);
  };

  const resetPassword = async () => {
    const res = await fetch("https://auth-app-zg5k.onrender.com/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp, password }),
    });

    const data = await res.json();
    alert(data.message || "Done");
  };

  return (
    <div className="container">
      <div className="card">

        <h2 className="title">Reset Password</h2>

        {step === 1 && (
          <>
            <input
              className="input"
              placeholder="Enter email"
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
