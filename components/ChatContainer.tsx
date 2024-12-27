"use client";
import React, { useEffect } from "react";
import { useChatStore } from "../app/store/useChatStore";
import ChatHeader from "@/components/ChatHeader";
import MessageInput from "@/components/MessageInput";
import MessageSkeleton from "./MessageSkeleton";
import { useAuthStore } from "../app/store/useAuthStore";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();


  console.log("auth user in chat container", authUser);
  console.log("selected user in chat container", selectedUser);
  console.log("messages in chat container", messages);
  console.log("socket in chat container", useAuthStore.getState().socket);
 
  

  // Scroll to the latest message
  const scrollToBottom = () => {
    const container = document.querySelector(".messages-container");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  // Fetch messages and subscribe to new messages when the selected user changes
  useEffect(() => {
    if (selectedUser?._id) {  // Using optional chaining here
      getMessages(selectedUser._id);
      subscribeToMessages();
    }
  
    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messages && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden mb-6">
      <ChatHeader />
      <div className="messages-container h-full overflow-y-auto p-2 space-y-2">
        {messages &&
          Array.isArray(messages) &&
          messages.map((message, index) => (
            <div
              key={message._id || `message-${index}`}
              className={`chat ${
                message.sender === authUser.id ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      message.sender === authUser.id
                        ? authUser?.profilePicture || "avatar.png"
                        : selectedUser?.profilePicture || "avatar.png"
                    }
                    alt="profile picture"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-sm opacity-50 ml-1">{message.createdAt}</time>
              </div>
              <div className="chat-bubble flex flex-col">
                {message.image && (
                  <img
                    src={message.image}
                    alt="image"
                    className="w-[200px] h-auto object-cover"
                  />
                )}
                {message.text && <p className="text-sm text-zinc-300">{message.text}</p>}
              </div>
            </div>
          ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
