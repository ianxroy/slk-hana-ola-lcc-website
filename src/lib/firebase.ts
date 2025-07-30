
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "slk-hana-ola-llc",
  appId: "1:118261124609:web:c34d6781c4b90922c3fa00",
  storageBucket: "slk-hana-ola-llc.firebasestorage.app",
  apiKey: "AIzaSyC1-vLUvpU-dEa6H6jQZY7j1IbuupNJwx4",
  authDomain: "slk-hana-ola-llc.firebaseapp.com",
  messagingSenderId: "118261124609",
};

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
