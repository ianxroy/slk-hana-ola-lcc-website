'use server';
/**
 * @fileOverview A flow for creating a user document in Firestore after registration.
 *
 * - createUserDocument - A function that handles creating the user document.
 * - CreateUserDocumentInput - The input type for the createUserDocument function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';


// Initialize Firebase Admin SDK if not already initialized
let adminApp: App;
if (!getApps().length) {
  adminApp = initializeApp({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
} else {
  adminApp = getApps()[0];
}

const db = getFirestore(adminApp);
const auth = getAuth(adminApp);

export const CreateUserDocumentInputSchema = z.object({
  uid: z.string().describe('The user ID from Firebase Auth.'),
  email: z.string().email().describe('The email of the user.'),
  fullName: z.string().describe('The full name of the user.'),
  phone: z.string().describe('The phone number of the user.'),
});

export type CreateUserDocumentInput = z.infer<
  typeof CreateUserDocumentInputSchema
>;

const createUserDocumentFlow = ai.defineFlow(
  {
    name: 'createUserDocumentFlow',
    inputSchema: CreateUserDocumentInputSchema,
    outputSchema: z.object({ success: z.boolean(), message: z.string() }),
  },
  async (input) => {
    try {
      const usersCollectionRef = db.collection('users');
      const allUsers = await auth.listUsers();
      const isFirstUser = allUsers.users.length <= 1; // Check if it's the first or only user

      const role = isFirstUser ? 'admin' : 'employee';
      const status = isFirstUser ? 'approved' : 'pending';

      // Create a user document in Firestore
      await db.collection('users').doc(input.uid).set({
        uid: input.uid,
        email: input.email,
        fullName: input.fullName,
        phone: input.phone,
        role: role,
        status: status,
        createdAt: new Date(),
      });

      return {
        success: true,
        message: `User document created successfully with role: ${role} and status: ${status}`,
      };
    } catch (error: any) {
      console.error('Error in createUserDocumentFlow:', error);
      return {
        success: false,
        message: 'Failed to create user document: ' + error.message,
      };
    }
  }
);

export async function createUserDocument(
  input: CreateUserDocumentInput
): Promise<{ success: boolean; message: string }> {
  return createUserDocumentFlow(input);
}
