
import { type NextRequest, NextResponse } from 'next/server';
import emailjs from '@emailjs/browser';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  interest: z.enum(['services', 'employment']),
  message: z.string(),
  token: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, interest, message, token } = contactFormSchema.parse(body);

    // 1. Verify reCAPTCHA token
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (!recaptchaSecret) {
        console.error("RECAPTCHA_SECRET_KEY is not set.");
        return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
    }

    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${recaptchaSecret}&response=${token}`,
    });

    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
        return NextResponse.json({ message: 'reCAPTCHA verification failed. Are you a robot?' }, { status: 400 });
    }

    // 2. Send email with EmailJS
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    // Note: EmailJS SDK is meant for client-side. A dedicated Node.js SDK is in beta.
    // For server-side, it's often better to use a different email service like Nodemailer or SendGrid.
    // However, to stick with the user's stack, we can make a direct API call to EmailJS.
    
    if (!serviceId || !templateId || !publicKey) {
      return NextResponse.json({ message: 'EmailJS credentials are not configured.' }, { status: 500 });
    }

    const templateParams = {
        from_name: name,
        from_email: email,
        from_phone: phone,
        interest,
        message,
    };

    const emailjsResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey, // The Public Key is used as the user_id here
            template_params: templateParams,
        }),
    });

    if (!emailjsResponse.ok) {
        const errorText = await emailjsResponse.text();
        console.error("EmailJS API Error:", errorText);
        return NextResponse.json({ message: 'Failed to send email.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Form submitted successfully!' }, { status: 200 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Invalid form data.', errors: error.errors }, { status: 400 });
    }
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}
