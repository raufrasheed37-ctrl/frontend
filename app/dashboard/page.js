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
        
        <h1 className="dashboard-title">Dashboard</h1>

        {user && (
          <div className="user-box">
            <p className="greeting">Good Day</p>
            <p className="username">
              {user.email.slice(0, 4).toUpperCase()}
            </p>
          </div>
        )}

      </div>
    </div>
  </>
);
}
