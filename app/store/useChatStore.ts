import axios from "axios";
import { create } from "zustand";

interface User {
  _id: string;
  username: string;
  fullName: string;
  profilePic?: string;
  isOnline: boolean;
}


interface ChatStoreState {
  
  messages: any[]; // Replace `any` with the actual type of a message
  users: any[]; // Replace `any` with the actual type of a user
  selectedUser: User | null;
  isUserLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  setSelectedUser: (selectedUser: any) => void;
}

export const useChatStore = create<ChatStoreState>((set) => ({
  messages: [],
  users: [],
  selectedUser:null,
  isUserLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const response = await fetch("http://localhost:3001/api/message/getUsers", {
        method: "GET",
        credentials: "include", // Correct way to send credentials
      });
      const data = await response.json();
      set({ users:data });
    } catch (error) {
      console.error("Failed to fetch users:", error);
      // Optionally, you can add error state management here.
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const response = await axios.get(`http://localhost:8000/message/${userId}`);
      set({ messages: response.data });
    } catch (error) {
      console.error(`Failed to fetch messages for user ${userId}:`, error);
      // Optionally, you can add error state management here.
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  setSelectedUser :(selectedUser:any) => set({ selectedUser }),
}));
