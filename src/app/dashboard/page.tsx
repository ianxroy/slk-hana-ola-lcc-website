
"use client";

import * as React from "react";
import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/auth-context";
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TimeClock } from "@/components/employee/time-clock";
import { ProfileManagement } from "@/components/admin/profile-management";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (user && user.role === 'admin') {
      router.push('/admin');
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== 'employee') {
    return null;
  }
  
  return (
     <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-24">
         <div className="container mx-auto px-4 md:px-6">
            <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Employee Dashboard
            </h1>
            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Welcome, {user.fullName || user.email}</CardTitle>
                        <CardDescription>
                            Your role is: <span className="font-bold text-primary">{user.role}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>This is your personal dashboard. Use the time clock to log your hours or update your profile.</p>
                    </CardContent>
                </Card>
                 <ProfileManagement />
                <TimeClock userId={user.uid} />
            </div>
         </div>
      </main>
      <Footer />
    </div>
  );
}
