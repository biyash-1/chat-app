import { create } from "zustand";
import { Socket } from "socket.io-client"; // Ensure you have this installed
import { useAuthStore } from "./useAuthStore";

interface User {
  _id: string;
  username: string;
  fullName: string;
  profilePicture?: string;
  isOnline: boolean;
}

interface Message {
  _id: string;
  sender: string;
  createdAt: string;
  text?: string;
  image?: string;
}

interface ChatStoreState {
  messages: Message[];
  socket: Socket | null;
  users: User[];
  selectedUser: User | null;
  isUserLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  setSelectedUser: (selectedUser: User | null) => void;
  sendMessage: (messageData: any) => Promise<void>;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
}

export const useChatStore = create<ChatStoreState>((set, get) => ({
  messages: [],
  users: [],
  socket: null,
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const response = await fetch("http://localhost:3001/api/message/getUsers", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      set({ users: data });
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const response = await fetch(`http://localhost:3001/api/message/${userId}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      set({ messages: data });
    } catch (error) {
      console.error(`Failed to fetch messages for user ${userId}:`, error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData: any) => {
    set({ isMessagesLoading: true });
    const { selectedUser, messages } = get();
    if (!selectedUser) {
      console.error("No user selected to send a message");
      set({ isMessagesLoading: false });
      return;
    }

    
    try {
      const response = await fetch(`http://localhost:3001/api/message/send/${selectedUser._id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      const data = await response.json();
      set({ messages: [...messages, data] });
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
  
    const  socket  = useAuthStore.getState().socket;
    if (!socket) {
      console.error("Socket is not initialized or not connected");
      return;
    }
  
     // Clear previous listeners to avoid duplicates
     socket.on("newMessage", (newMessage:any) => {
      const isMessageSentFromSelectedUser = newMessage.sender === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },
  

  unsubscribeFromMessages: () => {
    const { socket } = useAuthStore.getState();
    if (socket) {
      socket.off("newMessage");
    } else {
      console.error("Socket is not initialized");
    }
  },

  setSelectedUser: (selectedUser: User | null) => set({ selectedUser }),
}));
