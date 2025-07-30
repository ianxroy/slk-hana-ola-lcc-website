import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
       <Image 
            src="/images/SLKlogo.png"
            alt="SLK Hana Ola Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
            unoptimized
        />
      <h1 className="font-headline text-xl font-bold tracking-tight text-primary-foreground">
        SLK Hana Ola
      </h1>
    </div>
  );
}
