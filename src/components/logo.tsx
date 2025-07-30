import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
       <Image 
            src="/logo.svg"
            alt="SLK Hana Ola Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
        />
      <h1 className="font-headline text-xl font-bold tracking-tight text-primary-foreground">
        SLK Hana Ola
      </h1>
    </div>
  );
}
