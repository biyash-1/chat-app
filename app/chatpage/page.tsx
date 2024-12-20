"use client";
import { useAuthStore } from "../store/useAuthStore";
import withAuth from "@/lib/withAuth";

const Page = () => {
  const { authUser } = useAuthStore();
  console.log("auth status of chat page", authUser);

  return (
    <div className="mx-auto p-9 items-center h-screen flex justify-between">
      <div className="sidebar w-[25%]  border-r h-full ">
         <h1>sidebar section</h1>
        </div>
        <div>
         <h1>chat section</h1>
      </div>
    </div>
  );
};

export default withAuth(Page);
