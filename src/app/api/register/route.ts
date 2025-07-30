
import { type NextRequest, NextResponse } from 'next/server';
import { getFirebaseAdmin } from '@/lib/firebase-admin';
import { z } from 'zod';

const registerSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    const { adminAuth, adminDb } = await getFirebaseAdmin();
    const body = await req.json();
    const { fullName, email, phone, password } = registerSchema.parse(body);

    // Check if user already exists in Auth
    try {
      await adminAuth.getUserByEmail(email);
      return NextResponse.json({ message: 'This email address is already in use by another account.' }, { status: 409 });
    } catch (error: any) {
      if (error.code !== 'auth/user-not-found') {
        throw error; // Re-throw other auth errors
      }
      // This is good, user does not exist, continue.
    }
    
    // Check for pending requests with the same email
    const requestQuery = adminDb.collection('registrationRequests').where('email', '==', email).limit(1);
    const requestSnapshot = await requestQuery.get();
    if (!requestSnapshot.empty) {
        return NextResponse.json({ message: 'A registration request for this email address is already pending approval.' }, { status: 409 });
    }

    // Create user in Firebase Auth
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName: fullName,
    });

    // Create registration request in Firestore
    await adminDb.collection('registrationRequests').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email,
      fullName,
      phone,
      status: 'pending',
      createdAt: new Date(),
    });

    return NextResponse.json({ message: 'Registration successful!' }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Invalid form data.', errors: error.errors }, { status: 400 });
    }
    console.error('Registration API Error:', error);
    return NextResponse.json({ message: 'An unexpected error occurred during registration.' }, { status: 500 });
  }
}
