// lib/firebaseClient.ts
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type User }
  from 'firebase/auth'
import { initializeFirestore, collection, getDocs, type Firestore }
  from 'firebase/firestore'

const firebaseConfig = {
  apiKey:   process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId:   process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket:  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
}

const app: FirebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApps()[0]

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

// Only force long-polling—remove experimentalAutoDetectLongPolling
export const db: Firestore = initializeFirestore(app, {
  experimentalForceLongPolling: true,
})

export function loginWithGoogle() {
  return signInWithPopup(auth, googleProvider)
}

export function logout() {
  return signOut(auth)
}

export function onUserStateChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback)
}

export async function fetchCollection<T>(name: string): Promise<T[]> {
  const snap = await getDocs(collection(db, name))
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as T))
}
