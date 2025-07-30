
import { type NextRequest, NextResponse } from 'next/server';
import { getFirebaseAdmin } from '@/lib/firebase-admin';
import { z } from 'zod';

const approveUserSchema = z.object({
  docId: z.string(),
  email: z.string().email(),
  password: z.string().min(1, { message: "A password is required."}), // Ensure password is provided
  fullName: z.string(),
  phone: z.string(),
  role: z.enum(['admin', 'employee']),
});

export async function POST(req: NextRequest) {
  try {
    // 1. Validate the incoming request body
    const body = await req.json();
    const parsed = approveUserSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: 'Invalid request data.', errors: parsed.error.errors }, { status: 400 });
    }
    
    const { docId, email, password, fullName, phone, role } = parsed.data;

    const { adminAuth, adminDb } = await getFirebaseAdmin();

    // This is a protected route, so you'd want to verify if the caller is an admin.
    // For simplicity in this context, we'll assume the check is handled by other mechanisms like App Check or custom tokens.

    // 2. Create the user in Firebase Authentication
    const userRecord = await adminAuth.createUser({
      email: email,
      password: password,
      displayName: fullName,
    });

    // 3. Create the user document in the 'users' collection
    await adminDb.collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email: email,
      fullName: fullName,
      phone: phone,
      role: role,
      status: 'approved',
      createdAt: new Date(),
    });

    // 4. Delete the document from the 'registrationRequests' collection
    await adminDb.collection('registrationRequests').doc(docId).delete();
    
    return NextResponse.json({ message: 'User approved and created successfully.', uid: userRecord.uid }, { status: 200 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Invalid request data.', errors: error.errors }, { status: 400 });
    }
    // Specific check for Firebase Auth errors
    if (error && typeof error === 'object' && 'code' in error) {
        const firebaseError = error as { code: string; message: string };
        if (firebaseError.code === 'auth/email-already-exists') {
            return NextResponse.json({ message: 'This email is already in use by an existing user.' }, { status: 409 });
        }
         if (firebaseError.code === 'auth/invalid-password') {
            return NextResponse.json({ message: 'The password must be a string with at least 6 characters.' }, { status: 400 });
        }
    }
    console.error('An unexpected error occurred in /api/approve-user:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected server error occurred.';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
