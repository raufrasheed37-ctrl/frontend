"use client";

import { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import useAuthStore from "@/store/authStore";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      alert(result.error.issues[0].message);
      return;
    }

    try {
      const res = await fetch("https://auth-app-zg5k.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.token) {
  localStorage.setItem("token", data.token);

  useAuthStore.getState().hydrate();

  router.push("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <>
    <Navbar/>
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
