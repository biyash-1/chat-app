"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "../app/store/useAuthStore"; // Adjust the import path based on your project structure
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const Navbar: React.FC = () => {
  const { authUser, checkAuth, logout } = useAuthStore();
  const router = useRouter();

 

  const handleLogout = async () => {
    await logout(); // Call the logout function from Zustand
    router.push("/"); // Redirect to the home page
  };

  const handleLogin = () => {
    router.push("/login"); // Redirect to the login page
  };

  const toggleMode = () => {
    console.log("Toggling mode...");
  };

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white">
      {/* Logo */}
      <div className="text-lg font-bold cursor-pointer" onClick={() => router.push("/")}>
        MyApp<span className="text-red-500">beta</span>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-4">
        <button onClick={() => router.push("/")} className="hover:underline hover:text-gray-300">
          Home
        </button>
        <button onClick={() => router.push("/about")} className="hover:underline hover:text-gray-300">
          About
        </button>
        <button onClick={() => router.push("/chatpage")} className="hover:underline hover:text-gray-300">
          Messenger
        </button>
        {authUser && (
          <button onClick={() => router.push("/profile")} className="hover:underline hover:text-gray-300">
            Profile
          </button>
          
        )}
      </div>

      {/* Login/Logout and Mode Toggle */}
      <div className="flex items-center space-x-4">
        {authUser ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        ) : (
          <Button onClick={handleLogin} className="px-4 py-2 rounded">
            Login
          </Button>
        )}
        <button onClick={toggleMode} className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-full">
          🌓
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
