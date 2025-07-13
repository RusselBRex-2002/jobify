'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '../components/AuthProvider'
import { loginWithGoogle, logout, db } from '../../../lib/firebaseClient'
import { doc, getDoc } from 'firebase/firestore'

export default function Header() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
    }
  }

  const handleGetStarted = async () => {
    setLoading(true)
    try {
      // // 1. Sign in with Google
      // const result = await loginWithGoogle()
      // const uid = result.user.uid

      // // 2. Check Firestore for an existing user profile
      // const userRef = doc(db, 'users', uid)
      // const snap = await getDoc(userRef)

      // if (snap.exists()) {
      //   // existing user → go home or dashboard
      //   router.push('/')
      // } else {
      //   // new user → collect extra info
        router.push('/login')
      // }
    } catch (err) {
      console.error('Auth error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm">
      <div className="container">
        <Link href="/" className="navbar-brand">
          Jobify
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          {/* Nav links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {[
              ['/', 'Home'],
              ['/courses', 'Courses'],
              ['/jobs', 'Job Board'],
              ['/universities', 'Universities'],
              ['/pricing', 'Pricing'],
              ['/blog', 'Blog'],
              ['/about', 'About Us'],
              ['/contact', 'Contact Us'],
              ['/faqs', 'FAQs'],
            ].map(([href, label]) => (
              <li className="nav-item" key={href}>
                <Link href={href} className="nav-link">
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Search form */}
          <form
            onSubmit={onSubmit}
            className="d-flex me-3"
            role="search"
          >
            <input
              type="search"
              className="form-control form-control-sm me-2"
              placeholder="Search courses, jobs…"
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-outline-primary"
              disabled={!query.trim()}
            >
              Search
            </button>
          </form>

          {/* Auth buttons */}
          <div className="d-flex align-items-center">
            {user ? (
              <>
                <span className="navbar-text me-3 text-dark">
                  {user.displayName}
                </span>
                <button
                  onClick={() => logout()}
                  className="btn btn-outline-primary btn-md"
                >
                  Log Out
                </button>
              </>
            ) : (
              <button
                onClick={handleGetStarted}
                className="btn btn-primary btn-md"
                disabled={loading}
              >
                {loading ? 'Please wait…' : 'Log In'}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
