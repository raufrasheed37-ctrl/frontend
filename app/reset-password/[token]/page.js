"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter, useParams } from "next/navigation";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const router = useRouter();
  const params = useParams();

  const token = params.token;

  const handleReset = async () => {
    try {
      const res = await fetch("https://auth-app-zg5k.onrender.com/api/auth/reset-password/" + token, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Password reset successful");
        router.push("/login");
      } else {
        alert(data.message || "Error");
      }

    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <>
    <Navbar/>
    <div className="container">
      <div className="card">

        <h2 className="title">Set New Password</h2>

        <input
          type="password"
          className="input"
          placeholder="New Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="button" onClick={handleReset}>
          Reset Password
        </button>

      </div>
    </div>
    </>
  );
}
