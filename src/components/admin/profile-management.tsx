
'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { useUpdateProfile } from 'react-firebase-hooks/auth';
import { auth, storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, UserCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ProfileManagement() {
  const { user } = useAuth();
  const [updateProfile, updating, error] = useUpdateProfile(auth);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please select an image file to upload.' });
      return;
    }
    if (!user) {
        toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to update your profile.' });
        return;
    }

    setIsUploading(true);
    try {
      // 1. Upload image to Firebase Storage
      const storageRef = ref(storage, `profile-pictures/${user.uid}/${imageFile.name}`);
      const snapshot = await uploadBytes(storageRef, imageFile);
      const photoURL = await getDownloadURL(snapshot.ref);

      // 2. Update user's profile in Firebase Auth
      const success = await updateProfile({ photoURL });

      if (success) {
        toast({ title: 'Success', description: 'Profile picture updated successfully!' });
        setImageFile(null); // Clear the file input
      } else {
         throw new Error("Failed to update profile.");
      }
    } catch (e: any) {
      console.error(e);
      toast({ variant: 'destructive', title: 'Error', description: e.message || 'An error occurred during the update.' });
    } finally {
        setIsUploading(false);
    }
  };
  
  if (error) {
    toast({ variant: 'destructive', title: 'Update Error', description: error.message });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Profile</CardTitle>
        <CardDescription>Manage your personal information and profile picture.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
           <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
                <AvatarImage src={user?.photoURL || undefined} alt="Profile Picture" />
                <AvatarFallback>
                    <UserCircle className="h-16 w-16" />
                </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
                 <Label htmlFor="profile-picture">Profile Picture</Label>
                 <Input id="profile-picture" type="file" onChange={handleFileChange} accept="image/*" />
            </div>
           </div>
           <Button type="submit" disabled={isUploading || updating}>
             {(isUploading || updating) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
             Save Changes
           </Button>
        </form>
      </CardContent>
    </Card>
  );
}
