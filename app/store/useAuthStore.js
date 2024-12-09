import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: null, // Holds the authenticated user data

  // Function to check authentication status
  checkAuth: async () => {
    try {
      const response = await fetch("http://localhost:3001/api/user/checkAuth", {
        method: "GET",
        credentials: "include", // Ensures cookies are sent with the request
      });

      // Parse the response data
      if (response.ok) {
        const data = await response.json();
        set({ authUser: data.user }); // Update the authUser in the state
      } else {
        console.error("Authentication failed or not authorized");
        set({ authUser: null }); // Clear the user on failed auth
      }
    } catch (err) {
      console.error("Error checking authentication:", err);
      set({ authUser: null }); // Clear the user on error
    }
  },

  // Optionally, add a function to log out the user
  logout: async () => {
    try {
      await fetch("http://localhost:3001/api/user/logout", {
        method: "POST",
        credentials: "include",
      });
      set({ authUser: null }); // Clear the user data after logout
    } catch (err) {
      console.error("Error during logout:", err);
    }
  },
}));
