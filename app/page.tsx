"use client"
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "./store/useAuthStore";
import { useRouter } from "next/navigation";
export default function Home() {
  const { authUser } = useAuthStore();
  const router = useRouter();

  const handleLogin= () =>{
     router.push("/login");
  }
  useEffect(() => {
    console.log("Auth state changed ", { authUser });
  }, [authUser]);
 

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     
      <h1 className="text-4xl ">Im buidling a chat app</h1>
      <div>
        <p className="text-xl"> 
          Be coonected with ur loved ones far from u within seconds.. 
        </p>
      </div>
      <Button onClick={handleLogin}>Login to Chat</Button>
    </div>
  );
}
