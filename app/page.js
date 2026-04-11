"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import useAuthStore from "@/store/authStore";

export default function Home() {
  const [active, setActive] = useState(0);
  const { isAuthenticated, hydrate } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, []);

  return (
    <div className="home-container">

      {/* NAVBAR */}
      <nav className="nav">

        <Link
          href="/login"
          className="nav-item"
          onMouseEnter={() => setActive(0)}
        >
          Login
        </Link>

        <Link
          href="/register"
          className="nav-item"
          onMouseEnter={() => setActive(1)}
        >
          Register
        </Link>

        <Link
          href="/dashboard"
          className="nav-item"
          onMouseEnter={() => setActive(2)}
        >
          Dashboard
        </Link>

        <span
          className="nav-indicator"
          style={{
            transform: `translateX(${active * 100}%)`
          }}
        ></span>

      </nav>

      {/* HERO */}
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