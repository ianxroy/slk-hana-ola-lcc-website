
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function RegistrationPendingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex flex-1 items-center justify-center bg-gray-50 py-12 md:py-24">
        <Card className="w-full max-w-lg text-center shadow-lg animate-fade-in-up">
          <CardHeader className="items-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <CardTitle className="font-headline text-3xl font-bold text-primary">Registration Submitted</CardTitle>
            <CardDescription className="text-lg text-muted-foreground pt-2">
              Thank you for creating an account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 px-8 pb-8">
            <p className="text-base text-foreground/90">
              Your account is now pending approval from an administrator. You will be unable to log in until your account has been approved.
            </p>
            <div className="text-left bg-secondary/10 p-4 rounded-lg space-y-3">
                 <h4 className="font-semibold text-secondary">What happens next?</h4>
                 <p className="text-sm text-foreground/80">
                    Our administrative team will review your registration details. Once approved, you will be able to log in with the credentials you provided. This process is usually completed within 1-2 business days.
                 </p>
                 <p className="text-sm text-foreground/80">
                    If you have any urgent questions, please feel free to contact us.
                 </p>
            </div>
            <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground border-t pt-6">
               <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:808-772-4756" className="hover:underline text-primary font-semibold">808-772-4756</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:slkhanaola@gmail.com" className="hover:underline text-primary font-semibold">slkhanaola@gmail.com</a>
              </div>
            </div>
             <Button asChild className="mt-4">
                <Link href="/">Return to Homepage</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
