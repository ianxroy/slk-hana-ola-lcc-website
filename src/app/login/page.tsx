
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc, getDoc, collection, getDocs, query, limit } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { createUserDocument } from '@/ai/flows/createUser-flow';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

const registerSchema = z.object({
  fullName: z.string().min(1, { message: 'Full name is required.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  phone: z.string().min(1, { message: 'Phone number is required.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState('login');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: '', email: '', phone: '', password: '' },
  });

  const handleLogin = async (data: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Check user status in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.status === 'pending') {
          throw new Error('Your account is pending approval. Please contact an administrator.');
        }
        if (userData.status === 'rejected') {
          throw new Error('Your account registration has been rejected. Please contact an administrator.');
        }
        if (userData.status === 'approved') {
          toast({
            title: 'Login Successful',
            description: "Welcome back!",
          });
          
          if (userData.role === 'admin') {
            router.push('/admin');
          } else {
            router.push('/dashboard');
          }
        } else {
            throw new Error('Invalid account status.');
        }
      } else {
        throw new Error("User data not found.");
      }

    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
        // Step 1: Create the user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            data.email,
            data.password
        );
        const user = userCredential.user;

        // Step 2: Call the Genkit flow to create the Firestore document
        const flowResult = await createUserDocument({
            uid: user.uid,
            email: data.email,
            fullName: data.fullName,
            phone: data.phone,
        });

        if (!flowResult.success) {
            // If the flow fails, we should ideally delete the auth user to avoid orphaned accounts.
            // However, that requires admin privileges and is best done in a more complex setup.
            // For now, we'll show an error.
            throw new Error(flowResult.message || "Failed to create user document after registration.");
        }

        // Determine the success message based on the flow's response
        if (flowResult.message.includes('role: admin')) {
            setSuccessMessage('Admin registration successful! You are the first user, so you have been made an admin. You can now log in.');
        } else {
            setSuccessMessage('Registration successful! Please wait for an administrator to approve your account.');
        }

        registerForm.reset();

    } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
            setError('This email address is already in use.');
        } else {
            setError(error.message);
        }
    } finally {
        setIsLoading(false);
    }
};

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex flex-1 items-center justify-center py-12 md:py-24">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                   {error && activeTab === 'login' && (
                     <Alert variant="destructive">
                       <AlertCircle className="h-4 w-4" />
                       <AlertTitle>Error</AlertTitle>
                       <AlertDescription>{error}</AlertDescription>
                     </Alert>
                   )}
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input id="login-email" type="email" placeholder="m@example.com" {...loginForm.register('email')} />
                     {loginForm.formState.errors.email && <p className="text-sm text-destructive">{loginForm.formState.errors.email.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input id="login-password" type="password" {...loginForm.register('password')} />
                     {loginForm.formState.errors.password && <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>}
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Login
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>
                  Create a new account. Your registration will be reviewed by an administrator.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                  {error && activeTab === 'register' && (
                     <Alert variant="destructive">
                       <AlertCircle className="h-4 w-4" />
                       <AlertTitle>Error</AlertTitle>
                       <AlertDescription>{error}</AlertDescription>
                     </Alert>
                   )}
                    {successMessage && activeTab === 'register' && (
                     <Alert variant="default" className="bg-green-100 border-green-400 text-green-700">
                       <AlertCircle className="h-4 w-4" />
                       <AlertTitle>Success</AlertTitle>
                       <AlertDescription>{successMessage}</AlertDescription>
                     </Alert>
                   )}
                   <div className="space-y-2">
                    <Label htmlFor="register-fullName">Full Name</Label>
                    <Input id="register-fullName" type="text" placeholder="John Doe" {...registerForm.register('fullName')} />
                     {registerForm.formState.errors.fullName && <p className="text-sm text-destructive">{registerForm.formState.errors.fullName.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input id="register-email" type="email" placeholder="m@example.com" {...registerForm.register('email')} />
                     {registerForm.formState.errors.email && <p className="text-sm text-destructive">{registerForm.formState.errors.email.message}</p>}
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="register-phone">Phone Number</Label>
                    <Input id="register-phone" type="tel" placeholder="123-456-7890" {...registerForm.register('phone')} />
                     {registerForm.formState.errors.phone && <p className="text-sm text-destructive">{registerForm.formState.errors.phone.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input id="register-password" type="password" {...registerForm.register('password')} />
                    {registerForm.formState.errors.password && <p className="text-sm text-destructive">{registerForm.formState.errors.password.message}</p>}
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Register
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
