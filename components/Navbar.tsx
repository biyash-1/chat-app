"use client";

import { useAuthStore } from "../app/store/useAuthStore"; // Adjust the import path based on your project structure
import { useRouter } from "next/navigation";
import React from "react";

const Navbar: React.FC = () => {
  const { authUser, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout(); // Call the logout function from Zustand
    router.push("/"); // Redirect to login page
  };

  const handleLogin = () => {
    router.push("/login"); // Redirect to login page
  };

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-blue-600 text-white">
      <div className="text-lg font-bold cursor-pointer" onClick={() => router.push("/")}>
        MyApp
      </div>
      <div>
        {authUser ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
