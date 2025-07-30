
'use client';

import * as React from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface RegistrationRequest {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  // password is intentionally not stored or retrieved for security
  role: 'admin' | 'employee';
  status: 'pending' | 'rejected';
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

const TempPasswordDisplay = ({ password }: { password: string }) => {
  const { toast } = useToast();
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast({ title: 'Copied!', description: 'Temporary password copied to clipboard.' });
  };

  return (
    <div className="mt-4">
        <Alert>
            <AlertTitle>User Approved!</AlertTitle>
            <AlertDescription>
                <div className="space-y-2">
                    <p>Please provide the user with their temporary password:</p>
                    <div className="flex items-center gap-2">
                        <code className="font-mono p-2 bg-muted rounded-md text-sm">{password}</code>
                        <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                           <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </AlertDescription>
        </Alert>
    </div>
  );
};


export function UserManagement() {
  const { toast } = useToast();
  const [requests, setRequests] = React.useState<RegistrationRequest[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isProcessing, setIsProcessing] = React.useState<string | null>(null);

  const fetchRequests = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const requestsCollection = collection(db, 'registrationRequests');
      const q = query(requestsCollection, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const requestsData = querySnapshot.docs
        .map((doc) => ({
            id: doc.id,
            ...doc.data(),
            role: 'employee', // Default role
        })) as RegistrationRequest[];
      setRequests(requestsData);
    } catch (error) {
      console.error('Error fetching registration requests:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch registration requests.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  React.useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleRoleChange = (id: string, role: 'admin' | 'employee') => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, role } : req));
  }

  const handleReject = async (id: string) => {
    setIsProcessing(id);
    try {
      await deleteDoc(doc(db, "registrationRequests", id));
      toast({
        title: 'Success',
        description: 'Registration request has been rejected.',
      });
      fetchRequests(); // Refresh list
    } catch (error) {
      console.error('Error rejecting request:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to reject the request.',
      });
    } finally {
        setIsProcessing(null);
    }
  };

  const handleApprove = async (request: RegistrationRequest) => {
    setIsProcessing(request.id);
    // Generate a secure, random temporary password
    const tempPassword = Math.random().toString(36).slice(-8);

    try {
        const response = await fetch('/api/approve-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                docId: request.id,
                email: request.email,
                password: tempPassword, // Use the generated temporary password
                fullName: request.fullName,
                phone: request.phone,
                role: request.role,
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Failed to approve user.');
        }

        toast({
            description: <TempPasswordDisplay password={tempPassword} />,
            duration: 30000, // Give admin time to copy the password
        });
        fetchRequests(); // Refresh the list

    } catch (error: any) {
        console.error('Error approving request:', error);
        toast({
            variant: 'destructive',
            title: 'Approval Failed',
            description: error.message || 'An unexpected error occurred.',
        });
    } finally {
        setIsProcessing(null);
    }
  }
  
  if (isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Requested</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assign Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.length > 0 ? requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.fullName}</TableCell>
              <TableCell>{request.email}</TableCell>
              <TableCell>{request.phone}</TableCell>
              <TableCell>
                {new Date(request.createdAt.seconds * 1000).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge variant={request.status === 'pending' ? 'secondary' : 'destructive'}>
                  {request.status}
                </Badge>
              </TableCell>
              <TableCell>
                 <Select
                  value={request.role}
                  onValueChange={(value) => handleRoleChange(request.id, value as 'admin' | 'employee')}
                  disabled={isProcessing === request.id}
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
              <TableCell className="text-right">
                {request.status === 'pending' && (
                  <div className="flex gap-2 justify-end">
                    <Button
                      size="sm"
                      onClick={() => handleApprove(request)}
                      disabled={isProcessing === request.id}
                    >
                      {isProcessing === request.id && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleReject(request.id)}
                       disabled={isProcessing === request.id}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
                <TableCell colSpan={7} className="text-center h-24">
                    No pending registration requests.
                </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
  );
}
