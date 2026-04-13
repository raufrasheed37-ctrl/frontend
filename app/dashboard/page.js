"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import useAuthStore from "@/store/authStore";
import api from "@/utils/api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    api.get("/users/profile")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        router.push("/login");
      });

  }, [isAuthenticated]);

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <div className="dashboard-card">
          <h1 className="dashboard-title">Dashboard</h1>

          {user && (
            <div className="user-box">
              <p className="greeting">Welcome back 👋</p>
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
