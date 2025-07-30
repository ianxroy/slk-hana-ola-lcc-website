
import * as admin from 'firebase-admin';

// Ensure the environment variable is set
const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
if (!serviceAccountString) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. Please add it to your .env.local file.');
}

let serviceAccount;
try {
    serviceAccount = JSON.parse(serviceAccountString);
} catch (error) {
    throw new Error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY. Make sure it is a valid JSON string.');
}


// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error: any) {
    console.error('Firebase Admin initialization error', error.stack);
    throw new Error('Failed to initialize Firebase Admin SDK.');
  }
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
