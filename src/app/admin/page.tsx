
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Users, FileText, Image as ImageIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserManagement } from '@/components/admin/user-management';
import { PromoManagement } from '@/components/admin/promo-management';
import { TestimonialManagement } from '@/components/admin/testimonial-management';
import { ProfileManagement } from '@/components/admin/profile-management';

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login');
      } else if (user.role !== 'admin') {
        router.push('/dashboard'); // Redirect non-admins
      }
    }
  }, [user, authLoading, router]);

  if (authLoading || !user || user.role !== 'admin') {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto grid gap-8 px-4 md:px-6">
           <div className="grid gap-8 md:grid-cols-2">
             <Card>
                <CardHeader>
                    <CardTitle>Welcome, {user.fullName || user.email}</CardTitle>
                    <CardDescription>
                        Your role is: <span className="font-bold text-primary">{user.role}</span>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Manage your site settings below or update your profile.</p>
                </CardContent>
             </Card>
             <ProfileManagement />
           </div>

          <Card>
            <CardHeader>
              <CardTitle>Admin Dashboard</CardTitle>
              <CardDescription>Manage users, promotions, and testimonials.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="users" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="users">
                    <Users className="mr-2 h-4 w-4" />
                    Users
                  </TabsTrigger>
                  <TabsTrigger value="promos">
                     <ImageIcon className="mr-2 h-4 w-4" />
                    Promotions
                  </TabsTrigger>
                  <TabsTrigger value="testimonials">
                     <FileText className="mr-2 h-4 w-4" />
                    Testimonials
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="users" className="mt-4">
                  <UserManagement />
                </TabsContent>
                <TabsContent value="promos" className="mt-4">
                  <PromoManagement />
                </TabsContent>
                <TabsContent value="testimonials" className="mt-4">
                  <TestimonialManagement />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
