import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { io, Socket } from "socket.io-client";
import axios from "axios";

interface AuthState {
  hasHydrated: boolean;
  authUser: any;
  isUpdatingProfile: boolean;
  onlineUsers: any[];

  socket: Socket | null;
  checkAuth: () => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      hasHydrated: false,
      authUser: null,
      onlineUsers: [],
      isUpdatingProfile: false,
      socket: null, // This will be excluded from persistence

      checkAuth: async () => {
        try {
          const response = await fetch("http://localhost:3001/api/user/checkAuth", {
            method: "GET",
            credentials: "include",
          });
          if (response.ok) {
            const data = await response.json();
            set({ authUser: data.user });
            get().connectSocket(); // Connect socket after successful authentication
          } else {
            set({ authUser: null });
          }
        } catch (err) {
          console.error("Error during authentication check:", err);
          set({ authUser: null });
        }
      },

      login: async (data: { email: string; password: string }) => {
        try {
          const response = await fetch("http://localhost:3001/api/user/login", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            const responseData = await response.json();
            set({ authUser: responseData.user });
            get().connectSocket(); // Connect socket after successful login
            console.log("auth user in login function is", get().authUser);
          } else {
            const errorData = await response.json();
            throw new Error(errorData.message || "Invalid credentials");
          }
        } catch (err: any) {
          console.error("Error during login:", err.message);
          throw err;
        }
      },

      logout: async () => {
        try {
          await fetch("http://localhost:3001/api/user/logout", {
            method: "POST",
            credentials: "include",
          });
          set({ authUser: null });
          get().disconnectSocket(); // Disconnect socket after logout
        } catch (err) {
          console.error("Error during logout:", err);
        }
      },

      updateProfile: async (profilepic: any) => {
        set({ isUpdatingProfile: true });
        try {
          const response = await axios.patch(
            "http://localhost:3001/api/user/update-profile",
            { profilepic },
            { withCredentials: true }
          );
          set({ authUser: response.data });
        } catch (err) {
          console.error("Error updating profile:", err);
        } finally {
          set({ isUpdatingProfile: false });
        }
      },

      connectSocket: () => {
        const { authUser } = get();
        console.log("authUser", authUser);

        if (!authUser) return;

        const socket = io("http://localhost:3001", {
          query: {
            userId: authUser.id,
          },
        });
        socket.connect();

        set({ socket: socket });

        console.log("socket from getconnect function is", socket);

        socket.on("getOnlineUsers", (userIds) => {
          console.log("Online users received:", userIds);
          set({ onlineUsers: userIds });
        });
        console.log("onone");
      },

      disconnectSocket: () => {
        const socket = get().socket;
        if (socket && socket.connected) {
          socket.disconnect();
        }
        set({ socket: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        authUser: state.authUser, // Only persist authUser
        // Exclude socket and socket-related methods from persistence
        ...Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !["socket", "connectSocket", "disconnectSocket"].includes(key)
          )
        ),
      }),
    }
  )
);
