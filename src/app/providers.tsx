"use client";

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export function Providers({ children }: { children: React.ReactNode }) {
    const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    if (!recaptchaKey) {
        // You can render a fallback or null if the key is not available
        return <>{children}</>;
    }

    return (
        <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
            {children}
        </GoogleReCaptchaProvider>
    );
}
