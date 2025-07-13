// app/login/page.tsx
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FirebaseError } from 'firebase/app'
import { auth, loginWithGoogle, db } from '../../../lib/firebaseClient'
import { doc, getDoc } from 'firebase/firestore'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loadingEmail, setLoadingEmail] = useState(false)
  const [loadingGoogle, setLoadingGoogle] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoadingEmail(true)

    try {
      const trimmed = email.trim().toLowerCase()
      const cred = await signInWithEmailAndPassword(
        auth,
        trimmed,
        password
      )

      const snap = await getDoc(doc(db, 'users', cred.user.uid))
      router.push(snap.exists() ? '/' : '/signup')

    } catch (err: unknown) {
      console.error('Login error:', err)
      let message = 'Login failed. Please try again.'

      if (err instanceof FirebaseError) {
        switch (err.code) {
          case 'auth/user-not-found':
            message = 'No account found. Please sign up first.'
            break
          case 'auth/wrong-password':
            message = 'Incorrect password. Please try again.'
            break
        }
      }

      setError(message)
    } finally {
      setLoadingEmail(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError('')
    setLoadingGoogle(true)

    try {
      const result = await loginWithGoogle()
      const uid = result.user.uid

      const snap = await getDoc(doc(db, 'users', uid))
      router.push(snap.exists() ? '/' : '/signup')

    } catch (err: unknown) {
      console.error('Google sign-in error:', err)
      let message = 'Google sign-in failed. Please try again.'

      if (err instanceof FirebaseError && err.code === 'auth/popup-closed-by-user') {
        message = 'Google sign-in was cancelled.'
      }

      setError(message)
    } finally {
      setLoadingGoogle(false)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4 bg-white shadow-sm rounded" style={{ width: 360 }}>
        <h2 className="mb-3 text-center">Log in to Jobify</h2>

        {error && <div className="alert alert-warning">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="Your password"
              disabled={loadingEmail}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loadingEmail}
          >
            {loadingEmail ? 'Logging In…' : 'Login'}
          </button>
        </form>

        <div className="text-center my-3 text-muted">or</div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline-secondary w-100"
          disabled={loadingGoogle}
        >
          {loadingGoogle ? 'Signing In…' : 'Sign In with Google'}
        </button>

        <div className="mt-3 text-center">
          <span className="text-muted">New here?</span>{' '}
          <Link href="/signup" className="btn btn-outline-primary btn-sm ms-1">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
