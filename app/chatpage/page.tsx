"use client";

import { useAuthStore } from "../store/useAuthStore";
import withAuth from "@/lib/withAuth";
import { useChatStore } from "../store/useChatStore";
import NoChatSelected from "@/components/NoChatSelected";
import ChatContainer from "@/components/ChatContainer";
import Sidebar from "@/components/Sidebar";

const Page = () => {
  const { authUser,onlineUsers } = useAuthStore();
  console.log("auth status of chat page", authUser);
  console.log("online users", onlineUsers);
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen">
      <div className="flex items-center justify-center pt-10">
        <div className="bg-slate-900 rounded-lg w-full max-w-6xl h-[calc(100vh-4rem)] px-4">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {selectedUser ? <ChatContainer /> : <NoChatSelected />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Page);