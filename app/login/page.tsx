'use client';
import React, { useState } from 'react';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/useAuthStore';

const Page: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const {login} = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user)
        
        router.push('/chatpage');
      } else {
    
        alert(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  return (
    <div className="flex items-center justify-center mx-auto p-20">
      <Card className="p-4 flex flex-col items-start justify-center gap-4 w-1/4">
        <CardHeader className="text-3xl font-bold text-center mx-auto">
          Login
        </CardHeader>

        <Label htmlFor="email">Email:</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <Label htmlFor="password">Password:</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <CardFooter className="flex flex-col">
          <div className="flex flex-col justify-between gap-4">
            <Button onClick={handleLogin} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <Button onClick={handleSignup}>Signup</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
