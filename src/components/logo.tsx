import { HeartPulse } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <HeartPulse className="h-8 w-8 text-primary-foreground" />
      <h1 className="font-headline text-xl font-bold tracking-tight">
        SLK Hana Ola
      </h1>
    </div>
  );
}
