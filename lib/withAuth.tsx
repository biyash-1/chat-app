// src/hoc/withAuth.tsx
import React, { ReactNode, useEffect } from "react";
import { useAuthStore } from "../app/store/useAuthStore"; // Adjust the import path if needed
import { useRouter } from "next/router";

// This is the HOC that checks if the user is authenticated
export const withAuth = (Component: React.ComponentType<any>) => { // Type the Component prop correctly
  const Wrapper = (props: any) => {
    const { authUser, checkAuth } = useAuthStore(); // Get auth state from Zustand
    const router = useRouter();

    useEffect(() => {
      checkAuth(); // Check authentication status when the component mounts
    }, [checkAuth]);

    // If no user is authenticated, redirect to the login page
    if (!authUser) {
      router.push("/login"); // Redirect to the login page if not authenticated
      return null; // Return nothing while redirecting
    }

    return <Component {...props} />; // Render the wrapped component if authenticated
  };

  return Wrapper;
};
