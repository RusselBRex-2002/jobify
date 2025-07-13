'use client'

import React from 'react'
import Link from 'next/link'
import { useAuth } from '../components/AuthProvider'

export default function Hero() {
  const { user } = useAuth()

  return (
    <section className="py-5 text-center bg-light">
      <div className="container">
        <h1 className="display-4 fw-bold">Unlock Your Career Potential</h1>
        <p className="lead text-secondary">
          Discover top courses, internships, and job opportunities worldwide.
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          {!user && (
            <Link href="/signup" className="btn btn-lg btn-primary px-4">
              Sign Up Now
            </Link>
          )}
          <Link href="/courses" className="btn btn-lg btn-outline-primary px-4">
            Browse Courses
          </Link>
          <Link href="/jobs" className="btn btn-lg btn-outline-primary px-4">
            Browse Jobs
          </Link>
        </div>
      </div>
    </section>
  )
}
