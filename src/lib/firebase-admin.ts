
import * as admin from 'firebase-admin';

let adminApp: admin.app.App | null = null;

function initializeAdminApp() {
  if (admin.apps.length > 0) {
    adminApp = admin.app();
    return;
  }

  const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountString) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set.');
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountString);
    adminApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error: any) {
    console.error('Firebase Admin initialization error:', error.stack);
    throw new Error('Failed to initialize Firebase Admin SDK. Please check your FIREBASE_SERVICE_ACCOUNT_KEY.');
  }
}

async function getFirebaseAdmin() {
    if (!adminApp) {
        initializeAdminApp();
    }
    if (!adminApp) {
        // This should not happen if initializeAdminApp works correctly.
        throw new Error("Firebase Admin SDK is not initialized.");
    }
    return {
        adminDb: admin.firestore(adminApp),
        adminAuth: admin.auth(adminApp),
    };
}

// Export the getter function
export { getFirebaseAdmin };

// For direct use in older files if needed, though getFirebaseAdmin is preferred
try {
  if (!adminApp) {
    initializeAdminApp();
  }
} catch (e) {
  // Log error during initial load but don't re-throw, allow getFirebaseAdmin to handle it.
  console.error("Initial Firebase Admin SDK load failed:", e);
}

// Note: Direct exports might not be fully initialized on cold boot.
// It's safer to use the async `getFirebaseAdmin` function in API routes.
export const adminDb = adminApp ? admin.firestore(adminApp) : admin.firestore();
export const adminAuth = adminApp ? admin.auth(adminApp) : admin.auth();
