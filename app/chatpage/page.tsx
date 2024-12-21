"use client";

import { useAuthStore } from "../store/useAuthStore";
import withAuth from "@/lib/withAuth";
import { useChatStore } from "../store/useChatStore";
import NoChatSelected from "@/components/NoChatSelected";
import ChatContainer from "@/components/ChatContainer";
import Sidebar from "@/components/Sidebar";
const Page = () => {
  const { authUser } = useAuthStore();
  console.log("auth status of chat page", authUser);
  const {selectedUser} = useChatStore();

  return (
    <div className="h-screen">
      <div className="flex items-center justify-center pt-20 px-4 ">
        <div className="bg-base-100 rounded-lg w-full max-w-6xl h-[calc(100vh-4rem)]">
         <div className="flex h-full rounded-lg overflow-hidden">
        <Sidebar/>
        {selectedUser ? <ChatContainer/> : <NoChatSelected/>}
         </div>
      </div>
         
        </div>
    </div>
  );
};

export default withAuth(Page);
