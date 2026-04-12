"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetch("https://auth-app-zg5k.onrender.com/api/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else {
          router.push("/login");
        }
      });
  }, []);

  return (
  <>
    <Navbar />

    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>Dashboard</h1>

        {user ? (
          <>
            <p className="welcome-text">
              Good Day 
            </p>

            <p className="email">
  {user.email.slice(0, 4).toUpperCase()}
</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  </>
);
}
