import { create } from "zustand";
import { persist,createJSONStorage  } from "zustand/middleware";



interface AuthState {
  authUser: any; // You might want to replace `any` with a more specific type
  checkAuth: () => Promise<void>;
  login: (user: any) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      authUser: null, // Holds the authenticated user data

      checkAuth: async () => {
        try {
          const response = await fetch("http://localhost:3001/api/user/checkAuth", {
            method: "GET",
            credentials: "include",
          });

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

      login: (user) => {
        set({ authUser: user });
      },

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
    }),
    {
      name: "auth-storage", // Key for localStorage/sessionStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage to persist state
    }
  )
);
