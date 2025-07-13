import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <div className="row gy-4">
          {/* Company */}
          <div className="col-12 col-md-3">
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li>
                <Link href="/about" className="text-light text-decoration-none">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-light text-decoration-none">
                  Blog/Resources
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-light text-decoration-none">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-light text-decoration-none">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-12 col-md-3">
            <h5>Legal</h5>
            <ul className="list-unstyled">
              <li>
                <Link href="/privacy" className="text-light text-decoration-none">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-light text-decoration-none">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="col-12 col-md-3">
            <h5>Connect</h5>
            <div className="d-flex gap-3">
              <a href="#" className="text-light fs-4">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-light fs-4">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-light fs-4">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="col-12 col-md-3">
            <h5>Newsletter</h5>
            <form className="d-flex flex-column gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="form-control"
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <p className="text-center mb-0">&copy; 2025 Jobify. All rights reserved.</p>
      </div>
    </footer>
  )
}
