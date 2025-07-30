import Image from 'next/image';
import { cn } from '@/lib/utils';

type LogoProps = {
    isDark?: boolean;
}

export function Logo({ isDark = false }: LogoProps) {
  return (
    <div className="flex items-center gap-2">
       <Image 
            src="/images/SLKlogo.png"
            alt="SLK Hana Ola Logo"
            width={50}
            height={50}
            className="h-12 w-auto"
            unoptimized
        />
      <h1 className={cn("font-headline text-xl font-bold tracking-tight", isDark ? 'text-foreground' : 'text-primary-foreground')}>
        SLK Hana Ola
      </h1>
    </div>
  );
}
