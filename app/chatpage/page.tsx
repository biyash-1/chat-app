"use client";
import { useAuthStore } from "../store/useAuthStore";
import withAuth from "@/lib/withAuth";

const Page = () => {
  const { authUser } = useAuthStore();
  console.log("auth status of chat page", authUser);

  return (
    <div>
      <h1>Hello, this is the chat page</h1>
    </div>
  );
};

export default withAuth(Page);
