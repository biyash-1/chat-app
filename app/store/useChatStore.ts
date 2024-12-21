import axios from "axios";
import { create } from "zustand";

interface User {
  _id: string;
  username: string;
  fullName: string;
  profilePicture?: string;
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
  sendMessage: (messageData: any) => Promise<void>;
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
      const response = await fetch(`http://localhost:3001/api/message/${userId}` ,{
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      set({ messages: data });
      console.log("data is", data);
    } catch (error) {
      console.error(`Failed to fetch messages for user ${userId}:`, error);
      // Optionally, you can add error state management here.
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData: any) => {
    set({ isMessagesLoading: true });
    const { selectedUser, messages } = useChatStore.getState();
  
    try {
      const response = await fetch(`http://localhost:3001/api/message/send/${selectedUser?._id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",  // Make sure the body is sent as JSON
        },
        body: JSON.stringify(messageData), // Properly stringify the messageData
      });
  
      const data = await response.json();
      console.log("data is", data);
      set({ messages: [...messages, data] });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isMessagesLoading: false });
    }
  }
  
  ,
  setSelectedUser :(selectedUser:any) => set({ selectedUser }),
}));
