
"use client"
import React from 'react'
import { useChatStore } from "../app/store/useChatStore";
import ChatHeader  from "@/components/ChatHeader";
import MessageInput from "@/components/MessageInput";
import { useEffect } from "react";
const chatContainer = () => {
    const {messages, getMessages,isMessagesLoading,selectedUser} = useChatStore();
   
 

  useEffect(() =>{
    getMessages(selectedUser?._id)
  },[selectedUser?._id])
    return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>
      <p>Messages</p>
      <MessageInput/>
    </div>
  )
}

export default chatContainer
