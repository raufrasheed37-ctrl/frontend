"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        "https://auth-app-zg5k.onrender.com/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      // ✅ AUTO REDIRECT (FIXED)
      if (data.resetUrl) {
        window.location.href = data.resetUrl;
      } else {
        alert(data.message || "Request sent");
      }

    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="card">
          <h2 className="title">Forgot Password</h2>

          <input
            className="input"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="button" onClick={handleSubmit}>
            Send Reset Link
          </button>
        </div>
      </div>
    </>
  );
}
