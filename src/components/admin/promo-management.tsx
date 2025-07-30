
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp, orderBy, query } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, PlusCircle, Trash2, Edit } from 'lucide-react';
import Image from 'next/image';

interface Promotion {
  id: string;
  title?: string;
  description?: string;
  imageUrl: string;
  link: string;
  createdAt: Timestamp;
}

export function PromoManagement() {
  const [promos, setPromos] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPromo, setCurrentPromo] = useState<Partial<Promotion> | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();

  const fetchPromos = useCallback(async () => {
    setIsLoading(true);
    try {
      const promosCollection = collection(db, 'promotions');
      const q = query(promosCollection, orderBy('createdAt', 'desc'));
      const promoSnapshot = await getDocs(q);
      const promosList = promoSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Promotion));
      setPromos(promosList);
    } catch (error) {
      console.error("Error fetching promotions:", error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to fetch promotions.' });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchPromos();
  }, [fetchPromos]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    let imageUrl = currentPromo?.imageUrl;

    try {
      // Only upload if a new file is selected
      if (imageFile) {
        const storageRef = ref(storage, `promotions/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      if (!currentPromo?.id && !imageUrl) {
        toast({ variant: 'destructive', title: 'Error', description: 'An image is required for a new promotion.' });
        setIsSubmitting(false);
        return;
      }
      
      const dataToSave: any = {
        title: currentPromo?.title || '',
        description: currentPromo?.description || '',
        link: currentPromo?.link || '#',
      };

      if (imageUrl) {
        dataToSave.imageUrl = imageUrl;
      }

      if (currentPromo?.id) { // Editing existing promo
        const promoDoc = doc(db, 'promotions', currentPromo.id);
        await updateDoc(promoDoc, dataToSave);
        toast({ title: 'Success', description: 'Promotion updated successfully.' });
      } else { // Adding new promo
        await addDoc(collection(db, 'promotions'), {
          ...dataToSave,
          createdAt: Timestamp.now(),
        });
        toast({ title: 'Success', description: 'Promotion added successfully.' });
      }

      await fetchPromos();
      setIsDialogOpen(false);
      setCurrentPromo(null);
      setImageFile(null);
    } catch (error: any) {
      console.error("Error saving promotion:", error);
      toast({ variant: 'destructive', title: 'Error', description: error.message || 'Failed to save promotion.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDelete = async (promoId: string) => {
      if (!window.confirm("Are you sure you want to delete this promotion?")) return;
      try {
          await deleteDoc(doc(db, "promotions", promoId));
          toast({ title: "Success", description: "Promotion deleted."});
          fetchPromos();
      } catch (error) {
          console.error("Error deleting promotion:", error);
          toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete promotion.' });
      }
  }

  const openDialog = (promo: Partial<Promotion> | null = null) => {
      setCurrentPromo(promo);
      setImageFile(null);
      setIsDialogOpen(true);
  }

  if (isLoading) {
    return <div className="flex justify-center items-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Manage Promotions</CardTitle>
          <CardDescription>Add, edit, or delete promotional banners.</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
             <Button onClick={() => openDialog()}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentPromo?.id ? 'Edit Promotion' : 'Add New Promotion'}</DialogTitle>
              <DialogDescription>Fill in the details for the promotion.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
               <div>
                  <Label htmlFor="title">Title (optional)</Label>
                  <Input id="title" value={currentPromo?.title || ''} onChange={e => setCurrentPromo({...currentPromo, title: e.target.value})} />
               </div>
               <div>
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea id="description" value={currentPromo?.description || ''} onChange={e => setCurrentPromo({...currentPromo, description: e.target.value})} />
               </div>
                <div>
                  <Label htmlFor="link">Link</Label>
                  <Input id="link" value={currentPromo?.link || ''} onChange={e => setCurrentPromo({...currentPromo, link: e.target.value})} placeholder="#services" />
               </div>
               <div>
                 <Label htmlFor="image">Image {currentPromo?.id ? '(optional)' : '*'}</Label>
                 <Input id="image" type="file" onChange={handleFileChange} accept="image/*" />
                 {currentPromo?.imageUrl && !imageFile && <Image src={currentPromo.imageUrl} alt="Current promo image" width={100} height={100} className="mt-2 rounded-md" />}
               </div>
               <Button type="submit" disabled={isSubmitting}>
                   {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                   {isSubmitting ? 'Saving...' : 'Save Promotion'}
                </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
            {promos.length > 0 ? (
                promos.map(promo => (
                    <div key={promo.id} className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center gap-4">
                             <Image src={promo.imageUrl} alt={promo.title || 'Promotion'} width={80} height={80} className="rounded-md object-cover"/>
                             <div>
                                <p className="font-semibold">{promo.title || 'No Title'}</p>
                                <p className="text-sm text-muted-foreground">{promo.description || 'No Description'}</p>
                             </div>
                        </div>
                        <div className="flex items-center gap-2">
                             <Button variant="outline" size="icon" onClick={() => openDialog(promo)}><Edit className="h-4 w-4"/></Button>
                             <Button variant="destructive" size="icon" onClick={() => handleDelete(promo.id)}><Trash2 className="h-4 w-4"/></Button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-muted-foreground text-center">No promotions found.</p>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
