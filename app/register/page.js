"use client";

import { useState } from "react";
import Link from "next/link";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6),
});

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = registerSchema.safeParse({ email, password });

    if (!result.success) {
      alert(result.error.issues[0].message);
      return;
    }

    alert("Register ready");
  };

  return (
    <div className="container">
      <form className="card" onSubmit={handleSubmit}>
        
        <h2 className="title">Register</h2>

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

        <button className="button">Register</button>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
  Already have an account?{" "}
  <Link href="/login" className="link">
    Login
  </Link>
</p>

      </form>
    </div>
  );
}