
"use client";

import * as React from "react";
import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/auth-context";
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    // You can return a loader here
    return null;
  }
  
  return (
     <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-24">
         <div className="container mx-auto px-4 md:px-6">
            <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Welcome, {user.email}
            </h1>
           <Card className="max-w-4xl mx-auto">
             <CardHeader>
               <CardTitle>Dashboard</CardTitle>
               <CardDescription>
                 This is your dashboard. Your role is: <span className="font-bold text-primary">{user.role}</span>
               </CardDescription>
             </CardHeader>
             <CardContent>
                <p>More content coming soon...</p>
            </CardContent>
           </Card>
         </div>
      </main>
      <Footer />
    </div>
  );
}
