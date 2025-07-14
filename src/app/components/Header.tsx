// app/components/Header.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '../components/AuthProvider'
import { logout } from '../../../lib/firebaseClient'

export default function Header() {
  const { user } = useAuth()
  const router = useRouter()

  const [navOpen, setNavOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 992 && navOpen) {
        setNavOpen(false)
      }
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [navOpen])

  const toggleNav = () => setNavOpen(o => !o)
  const navigate = (href: string) => {
    setNavOpen(false)
    router.push(href)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    setQuery('')
  }

  const handleAuth = () => {
    setLoading(true)
    navigate('/login')
    setLoading(false)
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
          aria-label="Toggle navigation"
          aria-expanded={navOpen}
          onClick={toggleNav}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse${navOpen ? ' show' : ''}`}>
          {/* Left nav */}
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
                <a className="nav-link" onClick={() => navigate(href)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right: responsive search + auth */}
          <div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center ms-auto gap-3">

            {/* Search */}
            <form onSubmit={onSubmit} className="d-flex w-100 w-lg-auto" role="search">
              <input
                type="search"
                className="form-control form-control-sm"
                placeholder="Search courses, jobs…"
                aria-label="Search"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <button
                type="submit"
                disabled={!query.trim()}
                className="btn btn-outline-primary btn-md ms-2 flex-shrink-0 px-lg-3 py-lg-2"
              >
                Search
              </button>
            </form>

            {/* Log In / Out */}
            {user ? (
              <button
                onClick={() => {
                  logout()
                  setNavOpen(false)
                }}
                className="btn btn-outline-primary btn-md flex-shrink-0 px-3 py-2"
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={handleAuth}
                disabled={loading}
                className="btn btn-primary btn-md flex-shrink-0 px-3 py-2"
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
