'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '../components/AuthProvider'
import { auth, loginWithGoogle, db } from '../../../lib/firebaseClient'
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'

export default function SignUpPage() {
  const router = useRouter()
  const { user } = useAuth()

  // form state
  const [name, setName] = useState(user?.displayName || '')
  const [email, setEmail] = useState(user?.email || '')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')

  // control flow
  const [googleAuthDone, setGoogleAuthDone] = useState(false)
  const [loadingEmail, setLoadingEmail] = useState(false)
  const [loadingGoogle, setLoadingGoogle] = useState(false)
  const [loadingFinal, setLoadingFinal] = useState(false)

  // error message
  const [error, setError] = useState('')

  // 1️⃣ Email/Password signup
  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!name.trim() || !email.trim() || !password || !status) return

    setLoadingEmail(true)
    try {
      // check if email already registered
      const q = query(
        collection(db, 'users'),
        where('email', '==', email.trim().toLowerCase())
      )
      const snapshot = await getDocs(q)
      if (!snapshot.empty) {
        setError(
          'This email is already registered. Please ' +
          'log in instead.'
        )
        return
      }

      // create user in Auth
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      )
      await updateProfile(userCred.user, {
        displayName: name.trim(),
      })

      // save profile
      await setDoc(doc(db, 'users', userCred.user.uid), {
        uid: userCred.user.uid,
        name: name.trim(),
        email: userCred.user.email,
        status,
        createdAt: new Date().toISOString(),
      })

      router.push('/')
    } catch (err) {
      console.error(err)
      setError('Signup failed. Please try again.')
    } finally {
      setLoadingEmail(false)
    }
  }

  // 2️⃣ Prefill via Google
  const handleGoogleAuth = async () => {
  setError('')
  setLoadingGoogle(true)

  try {
    const result = await loginWithGoogle()
    const gUser = result.user

    // check Firestore, prefill, etc…
    const docSnap = await getDoc(doc(db, 'users', gUser.uid))
    if (docSnap.exists()) {
      router.replace('/')
      return
    }

    setName(gUser.displayName || '')
    setEmail(gUser.email || '')
    setGoogleAuthDone(true)

  } catch (err: any) {
    // specific popup-close handling
    if (err.code === 'auth/popup-closed-by-user') {
      // user cancelled the popup, so just reset loading
      console.log('User closed the Google popup')
    } else {
      // other errors
      setError('Google sign-in failed. Please try again.')
      console.error(err)
    }
  } finally {
    // always turn it off
    setLoadingGoogle(false)
  }
}

  // 3️⃣ Finalize signup after Google
  const handleCompleteSignup = async () => {
    setError('')
    if (!name.trim() || !email.trim() || !status) return

    setLoadingFinal(true)
    try {
      // user should already be auth’d by handleGoogleAuth
      const currentUser = auth.currentUser
      if (!currentUser) {
        setError('Unexpected error. Please sign in again.')
        return
      }

      // save profile
      await setDoc(doc(db, 'users', currentUser.uid), {
        uid: currentUser.uid,
        name: name.trim(),
        email: email.trim(),
        status,
        createdAt: new Date().toISOString(),
      })

      router.push('/')
    } catch (err) {
      console.error(err)
      setError('Could not complete signup. Try again.')
    } finally {
      setLoadingFinal(false)
    }
  }

  return (
    <div className="signup-overlay">
      <div className="signup-panel" style={{ maxWidth: 400 }}>
        <h2 className="mb-4 text-center">Complete Your Profile</h2>

        {error && (
          <div className="alert alert-warning">
            {error}{' '}
            {error.includes('log in') && (
              <Link href="/login" className="alert-link">
                Log in
              </Link>
            )}
          </div>
        )}

        <form onSubmit={handleEmailSignup}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              disabled={googleAuthDone}
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              disabled={googleAuthDone}
            />
          </div>

          {/* Password */}
          {!googleAuthDone && (
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Choose a strong password"
                required
              />
            </div>
          )}

          {/* Role */}
          <div className="mb-4">
            <label className="form-label">I am a</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="" disabled>
                -- Select your role --
              </option>
              <option value="Student">Student</option>
              <option value="Recruiter">Recruiter</option>
              <option value="Instructor">Instructor</option>
              <option value="University">University</option>
            </select>
          </div>

          {/* Actions */}
          <div className="d-grid gap-2">
            {!googleAuthDone && (
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loadingEmail}
              >
                {loadingEmail ? 'Saving…' : 'Save Profile'}
              </button>
            )}
            {!googleAuthDone && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleGoogleAuth}
                disabled={loadingGoogle}
              >
                {loadingGoogle
                  ? 'Processing…'
                  : 'Sign Up with Google'}
              </button>
            )}
            {googleAuthDone && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCompleteSignup}
                disabled={loadingFinal}
              >
                {loadingFinal
                  ? 'Finalizing…'
                  : 'Complete Sign Up'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
