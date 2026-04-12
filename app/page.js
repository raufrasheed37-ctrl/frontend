"use client";

import Link from "next/link";
import { useEffect } from "react";
import useAuthStore from "@/store/authStore";
import Navbar from "@/components/Navbar";

export default function Home() {
  const { isAuthenticated, hydrate } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, []);

  return (
    <div className="home-container">

      <Navbar />

      <div className="hero">
        <h1>Welcome Back!!!</h1>

        <p>
          Status: <b>{isAuthenticated ? "Logged In" : "Not Logged In"}</b>
        </p>

        <Link href="/login">
          <button className="login-btn">Login</button>
        </Link>
      </div>

    </div>
  );
}
