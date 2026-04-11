"use client";

import { useState } from "react";
import Link from "next/link";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      alert(result.error.issues[0].message);
      return;
    }

    alert("Login ready (backend next)");
  };

  return (
    <div className="container">
      <form className="card" onSubmit={handleSubmit}>
        
        <h2 className="title">Login</h2>

        <input
          className="input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="button">Login</button>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
  Don’t have an account?{" "}
  <Link href="/register" className="link">
    Register
  </Link>
</p>

      </form>
    </div>
  );
}