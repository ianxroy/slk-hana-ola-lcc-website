
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '@/context/auth-context';
import { db } from '@/lib/firebase';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface ManagedUser {
  uid: string;
  email: string;
  fullName: string;
  phone: string;
  role: 'admin' | 'employee';
  status: 'pending' | 'approved' | 'rejected';
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [users, setUsers] = React.useState<ManagedUser[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchUsers = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersData = querySnapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      })) as ManagedUser[];
      setUsers(usersData.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds));
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch users.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  React.useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== 'admin') {
        router.push('/login');
      } else {
        fetchUsers();
      }
    }
  }, [user, authLoading, router, fetchUsers]);

  const handleStatusChange = async (uid: string, status: 'approved' | 'rejected') => {
    try {
      const userDocRef = doc(db, 'users', uid);
      await updateDoc(userDocRef, { status });
      toast({
        title: 'Success',
        description: `User status updated to ${status}.`,
      });
      fetchUsers(); // Refresh users list
    } catch (error) {
      console.error('Error updating user status:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update user status.',
      });
    }
  };

  const handleRoleChange = async (uid: string, role: 'admin' | 'employee') => {
    try {
      const userDocRef = doc(db, 'users', uid);
      await updateDoc(userDocRef, { role });
      toast({
        title: 'Success',
        description: `User role updated to ${role}.`,
      });
      fetchUsers(); // Refresh users list
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update user role.',
      });
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <Card>
            <CardHeader>
              <CardTitle>Admin Dashboard</CardTitle>
              <CardDescription>Manage user registrations and roles.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((managedUser) => (
                    <TableRow key={managedUser.uid}>
                      <TableCell>{managedUser.fullName}</TableCell>
                      <TableCell>{managedUser.email}</TableCell>
                      <TableCell>{managedUser.phone}</TableCell>
                      <TableCell>
                        {new Date(managedUser.createdAt.seconds * 1000).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            managedUser.status === 'approved'
                              ? 'default'
                              : managedUser.status === 'pending'
                              ? 'secondary'
                              : 'destructive'
                          }
                          className={
                            managedUser.status === 'approved' ? 'bg-green-500' : ''
                          }
                        >
                          {managedUser.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={managedUser.role}
                          onValueChange={(value) =>
                            handleRoleChange(managedUser.uid, value as 'admin' | 'employee')
                          }
                          disabled={managedUser.uid === user.uid} // Admin can't change their own role
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="employee">Employee</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        {managedUser.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleStatusChange(managedUser.uid, 'approved')}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleStatusChange(managedUser.uid, 'rejected')}
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

  