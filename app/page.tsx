"use client"

import { Button } from "@/components/ui/button";
import {useRouter} from "next/navigation";
import { useAuthStore } from "../app/store/useAuthStore";
import { useEffect } from "react";
export default function Home() {

  const {checkAuth,authUser} = useAuthStore();
  const router = useRouter();


  const handleLogin= () =>{
     router.push("/login");
  }
  useEffect(()=>{
checkAuth();
console.log(authUser);

  },[authUser])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     
      <h1 className="text-4xl ">Im buidling a chat app</h1>
      <Button onClick={handleLogin}>Login to Chat</Button>
    </div>
  );
}
