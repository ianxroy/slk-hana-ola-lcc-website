
import { type NextRequest, NextResponse } from 'next/server';
import { getFirebaseAdmin } from '@/lib/firebase-admin';
import { z } from 'zod';

const approveUserSchema = z.object({
  docId: z.string(),
  email: z.string().email(),
  password: z.string().min(6, { message: "Password must be at least 6 characters."}),
  fullName: z.string(),
  phone: z.string(),
  role: z.enum(['admin', 'employee']),
});

export async function POST(req: NextRequest) {
  try {
    const admin = await getFirebaseAdmin();

    // 1. Validate the incoming request body
    const body = await req.json();
    const parsed = approveUserSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: 'Invalid request data.', errors: parsed.error.errors }, { status: 400 });
    }
    
    const { docId, email, password, fullName, phone, role } = parsed.data;

    // This route should be protected to ensure only admins can call it.
    // In a real app, you'd verify an admin auth token here.

    // 2. Create the user in Firebase Authentication
    const userRecord = await admin.adminAuth.createUser({
      email: email,
      password: password,
      displayName: fullName,
      emailVerified: false, // User should verify their email
      disabled: false,
    });

    // 3. Create the user document in the 'users' collection in Firestore
    await admin.adminDb.collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email: email,
      fullName: fullName,
      phone: phone,
      role: role,
      status: 'approved',
      createdAt: new Date(),
    });
    
    // 4. (Optional but recommended) Set custom claims if you use them for role-based access control
    await admin.adminAuth.setCustomUserClaims(userRecord.uid, { role: role });

    // 5. Delete the document from the 'registrationRequests' collection
    await admin.adminDb.collection('registrationRequests').doc(docId).delete();
    
    return NextResponse.json({ message: 'User approved and created successfully.', uid: userRecord.uid }, { status: 200 });

  } catch (error: any) {
    console.error('An unexpected error occurred in /api/approve-user:', error);

    // Specific check for Firebase Auth errors
    if (error.code === 'auth/email-already-exists') {
        return NextResponse.json({ message: 'This email is already in use by an existing user.' }, { status: 409 });
    }
    if (error.code === 'auth/invalid-password') {
        return NextResponse.json({ message: 'The password must be a string with at least 6 characters.' }, { status: 400 });
    }
    
    const errorMessage = error.message || 'An unexpected server error occurred.';
    return NextResponse.json({ message: `Server error: ${errorMessage}` }, { status: 500 });
  }
}
