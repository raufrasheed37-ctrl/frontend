"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [active, setActive] = useState(0);
  const pathname = usePathname();

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  let links = [];

  if (pathname === "/") {
    links = [
      { name: "Login", href: "/login" },
      { name: "Register", href: "/register" },
      { name: "Dashboard", href: "/dashboard" },
    ];
  }

  if (pathname === "/login") {
    links = [
      { name: "Home", href: "/" },
      { name: "Register", href: "/register" },
    ];
  }

  if (pathname === "/register") {
    links = [
      { name: "Home", href: "/" },
      { name: "Login", href: "/login" },
    ];
  }

  if (pathname === "/dashboard") {
    links = [
      { name: "Home", href: "/" },
      { name: "Logout", action: logout },
    ];
  }

  return (
    <nav className="nav">
      {links.map((item, index) =>
        item.action ? (
          <button
            key={index}
            className="nav-item"
            onMouseEnter={() => setActive(index)}
            onClick={item.action}
          >
            {item.name}
          </button>
        ) : (
          <Link
            key={index}
            href={item.href}
            className="nav-item"
            onMouseEnter={() => setActive(index)}
          >
            {item.name}
          </Link>
        )
      )}

      <span
        className="nav-indicator"
        style={{
          width: `${100 / links.length}%`,
          transform: `translateX(${active * 100}%)`,
        }}
      ></span>
    </nav>
  );
}
