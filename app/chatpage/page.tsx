
"use client"
import React , {useEffect} from 'react'
import { withAuth } from '@/lib/withAuth'
import { useAuthStore } from '../store/useAuthStore';

const page = () => {
    const {authUser} = useAuthStore();

    console.log(authUser);
   
    
    
  return (
    <div>
      <h1>hello this is chat page</h1>
    </div>
  )
}

export default withAuth(page)
