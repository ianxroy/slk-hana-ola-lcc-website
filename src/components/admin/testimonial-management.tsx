
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
import { Loader2, PlusCircle, Trash2, Edit, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAuth } from '@/context/auth-context';

interface Testimonial {
  id: string;
  name: string;
  quote: string;
  rating: number;
  image?: string; 
  createdAt: Timestamp;
}

export function TestimonialManagement() {
  const { user } = useAuth();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();

  const fetchTestimonials = useCallback(async () => {
    setIsLoading(true);
    try {
      const testimonialsCollection = collection(db, 'testimonials');
      const q = query(testimonialsCollection, orderBy('createdAt', 'desc'));
      const testimonialSnapshot = await getDocs(q);
      const testimonialsList = testimonialSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial));
      setTestimonials(testimonialsList);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to fetch testimonials.' });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };
  
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTestimonial?.name || !currentTestimonial.quote || !currentTestimonial.rating) {
        toast({ variant: 'destructive', title: 'Error', description: 'Please fill out all required fields.'});
        return;
    }
    if (!user) {
        toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to perform this action.'});
        return;
    }
    setIsSubmitting(true);
    let imageUrl = currentTestimonial?.image;

    try {
      // Only upload if a new file is selected
      if (imageFile) {
        const storageRef = ref(storage, `testimonials/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const dataToSave: any = {
        name: currentTestimonial.name,
        quote: currentTestimonial.quote,
        rating: Number(currentTestimonial.rating),
      };

      if (imageUrl) {
        dataToSave.image = imageUrl;
      } else if (currentTestimonial?.id && !currentTestimonial.image) {
        dataToSave.image = '';
      } else if (!currentTestimonial?.id) {
        dataToSave.image = '';
      }

      if (currentTestimonial?.id) { // Editing existing
        const testimonialDoc = doc(db, 'testimonials', currentTestimonial.id);
        await updateDoc(testimonialDoc, dataToSave);
        toast({ title: 'Success', description: 'Testimonial updated successfully.' });
      } else { // Adding new
        await addDoc(collection(db, 'testimonials'), {
          ...dataToSave,
          createdAt: Timestamp.now(),
        });
        toast({ title: 'Success', description: 'Testimonial added successfully.' });
      }

      await fetchTestimonials();
      setIsDialogOpen(false);
      setCurrentTestimonial(null);
      setImageFile(null);
    } catch (error: any) {
      console.error("Error saving testimonial:", error);
      toast({ variant: 'destructive', title: 'Error', description: error.message || 'Failed to save testimonial.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDelete = async (testimonialId: string) => {
      if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
      try {
          await deleteDoc(doc(db, "testimonials", testimonialId));
          toast({ title: "Success", description: "Testimonial deleted."});
          fetchTestimonials();
      } catch (error) {
          console.error("Error deleting testimonial:", error);
          toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete testimonial.' });
      }
  }

  const openDialog = (testimonial: Partial<Testimonial> | null = null) => {
      setCurrentTestimonial(testimonial ? testimonial : { rating: 5 });
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
          <CardTitle>Manage Testimonials</CardTitle>
          <CardDescription>Add, edit, or delete client testimonials.</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
             <Button onClick={() => openDialog()}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentTestimonial?.id ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
              <DialogDescription>Fill in the details for the testimonial.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
               <div>
                  <Label htmlFor="name">Client Name *</Label>
                  <Input id="name" value={currentTestimonial?.name || ''} onChange={e => setCurrentTestimonial({...currentTestimonial, name: e.target.value})} />
               </div>
               <div>
                  <Label htmlFor="quote">Quote *</Label>
                  <Textarea id="quote" value={currentTestimonial?.quote || ''} onChange={e => setCurrentTestimonial({...currentTestimonial, quote: e.target.value})} />
               </div>
                <div>
                  <Label htmlFor="rating">Rating (1-5) *</Label>
                  <Input id="rating" type="number" min="1" max="5" value={currentTestimonial?.rating || 5} onChange={e => setCurrentTestimonial({...currentTestimonial, rating: parseInt(e.target.value)})} />
               </div>
               <div>
                 <Label htmlFor="image">Client Image (optional)</Label>
                 <Input id="image" type="file" onChange={handleFileChange} accept="image/*" />
                 {currentTestimonial?.image && !imageFile && <Avatar className="mt-2"><AvatarImage src={currentTestimonial.image} /><AvatarFallback>{currentTestimonial.name?.charAt(0)}</AvatarFallback></Avatar>}
               </div>
               <Button type="submit" disabled={isSubmitting}>
                   {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                   {isSubmitting ? 'Saving...' : 'Save Testimonial'}
                </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
            {testimonials.length > 0 ? (
                testimonials.map(testimonial => (
                    <div key={testimonial.id} className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center gap-4">
                             <Avatar>
                                <AvatarImage src={testimonial.image} />
                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                             </Avatar>
                             <div className="flex-1">
                                <p className="font-semibold">{testimonial.name}</p>
                                <p className="text-sm text-muted-foreground truncate max-w-sm">"{testimonial.quote}"</p>
                                <div className="flex items-center gap-0.5">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}/>
                                    ))}
                                </div>
                             </div>
                        </div>
                        <div className="flex items-center gap-2">
                             <Button variant="outline" size="icon" onClick={() => openDialog(testimonial)}><Edit className="h-4 w-4"/></Button>
                             <Button variant="destructive" size="icon" onClick={() => handleDelete(testimonial.id)}><Trash2 className="h-4 w-4"/></Button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-muted-foreground text-center">No testimonials found.</p>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
