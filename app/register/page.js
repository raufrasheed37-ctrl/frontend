"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { z } from "zod";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = registerSchema.safeParse({ email, password });

    if (!result.success) {
      alert(result.error.issues[0].message);
      return;
    }

    try {
      await api.post("/auth/register", { email, password });

      alert("Registered successfully");
      router.push("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <>
      <Navbar />

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
    </>
  );
}
