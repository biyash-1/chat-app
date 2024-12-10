"use client";
import { useEffect } from "react";
import { useAuthStore } from "../app/store/useAuthStore";
import { useRouter } from "next/navigation";

export const withAuth = (Component: React.ComponentType<any>) => {
  const Wrapper = (props: any) => {
    const { authUser, checkAuth } = useAuthStore();
    const router = useRouter();

    // Run the authentication check when the component mounts
    useEffect(() => {
      checkAuth();
    }, [checkAuth]);

    // Redirect to the login page if not authenticated
    useEffect(() => {
      if (authUser === null) {
        router.push("/login");
      }
    }, [authUser, router]);

    // Show a loading indicator while authentication is being checked
    if (authUser === null) {
      return <div>Loading...</div>;
    }

    // Render the wrapped component if authenticated
    return <Component {...props} />;
  };

  return Wrapper;
};
