
'use client'
import React from 'react'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {useRouter} from "next/navigation"
const page = () => {


    const router = useRouter();
  const handleSignup = () =>{
      router.push('/signup')
  }
  return (
    <div className='flex items-center justify-center mx-auto p-20'>

      <Card className='p-4 flex flex-col items-start justify-center gap-4 w-1/4 '>

        <CardHeader className='text-3xl font-bold text-center mx-auto'>
          Login
        </CardHeader>

        <Label>Email:</Label>
        <Input></Input>
        <Label>Password:</Label>
        <Input></Input>
        <CardFooter className='flex flex-col '>

          <div className=
            'flex flex-col justify-between gap-4'>
            <Button>Login </Button>

            <Button onClick={handleSignup}>Signup </Button>
          </div>

        </CardFooter>
      </Card>
    </div>
  )
}

export default page
