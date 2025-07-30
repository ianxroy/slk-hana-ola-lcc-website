import { type NextRequest, NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase-admin';
import { z } from 'zod';

const UserDataSchema = z.object({
  uid: z.string(),
  email: z.string().email(),
  fullName: z.string(),
  phone: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    // 1. Verify the user's token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.split('Bearer ')[1];
    
    const decodedToken = await adminAuth.verifyIdToken(token);
    const uid = decodedToken.uid;
    
    // 2. Validate the request body
    const body = await req.json();
    const parsedData = UserDataSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json({ message: 'Invalid input', errors: parsedData.error.errors }, { status: 400 });
    }
    
    // Security check: ensure the UID in the body matches the token
    if (parsedData.data.uid !== uid) {
         return NextResponse.json({ message: 'UID mismatch' }, { status: 403 });
    }

    // 3. Logic to determine role and status
    const usersCollectionRef = adminDb.collection('users');
    const snapshot = await usersCollectionRef.limit(1).get();
    const isFirstUser = snapshot.empty;

    const role = isFirstUser ? 'admin' : 'employee';
    const status = isFirstUser ? 'approved' : 'pending';

    // 4. Create the user document in Firestore
    await adminDb.collection('users').doc(uid).set({
      uid: uid,
      email: parsedData.data.email,
      fullName: parsedData.data.fullName,
      phone: parsedData.data.phone,
      role: role,
      status: status,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: 'User document created successfully', status: status }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating user document:', error);
    if (error.code === 'auth/id-token-expired') {
        return NextResponse.json({ message: 'Authentication token has expired. Please log in again.' }, { status: 401 });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}