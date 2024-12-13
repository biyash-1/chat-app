"use client";
import { ReactNode } from "react";
import withAuth from "@/lib/withAuth";

const ChatLayout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default withAuth(ChatLayout);
