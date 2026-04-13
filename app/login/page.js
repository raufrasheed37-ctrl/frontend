"use client";

import { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import api from "@/utils/api";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6),
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
      const res = await api.post("/auth/login", { email, password });
      const data = res.data;

      if (data.token) {
        useAuthStore.getState().login(data.user, data.token);
        router.push("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <>
      <Navbar />

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

          <p style={{ textAlign: "center", marginTop: "10px" }}>
            <Link href="/forgot-password" className="link">
              Forgot password
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
