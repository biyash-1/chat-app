
"use client"
import { useAuthStore } from '../store/useAuthStore';
import  withAuth  from '@/lib/withAuth';

const page = () => {
     const {authUser} = useAuthStore();
     console.log("auth status of chat page", authUser);
  return (
    <div>
      <h1>hello this is chat page</h1>
    </div>
  )
}

export default withAuth(page)
