'use client'

import React, { useState } from 'react'
import Link from 'next/link'

type Testimonial = {
  id: number
  name: string
  role: string
  avatar: string
  content: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Aisha Khan',
    role: 'Student at Global Tech University',
    avatar: '/avatars/aisha.jpg',
    content:
      'Jobify helped me discover the perfect internship last summer. The courses section boosted my skills, and now I have an offer from TechCorp!',
  },
  {
    id: 2,
    name: 'Michael Roberts',
    role: 'Recruiter at DataWorks',
    avatar: '/avatars/michael.jpg',
    content:
      'Posting opportunities and filtering candidates has never been easier. We hired three talented grads in under a month.',
  },
  {
    id: 3,
    name: 'Prof. Emily Zhang',
    role: 'Dean at Metro Business School',
    avatar: '/avatars/emily.jpg',
    content:
      'Partnering through Jobify streamlined our placement events and expanded industry connections. Our placement rate is at an all-time high!',
  },
  {
    id: 4,
    name: 'Carlos Silva',
    role: 'Instructor',
    avatar: '/avatars/carlos.jpg',
    content:
      'Creating and selling my Data Science course on Jobify has doubled my student base. The built-in feedback tools are fantastic.',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const total = testimonials.length

  const prev = () => setCurrent(idx => (idx - 1 + total) % total)
  const next = () => setCurrent(idx => (idx + 1) % total)

  const { name, role, avatar, content } = testimonials[current]

  return (
    <section className="py-5 bg-white">
      {/* Section Header */}
      <div className="container text-center mb-4">
        <h2 className="fw-bold">What Our Users Say</h2>
      </div>

      {/* Testimonial Card with nav buttons */}
      <div
        className="container position-relative mb-4"
        style={{ maxWidth: '600px' }}
      >
        <div className="card p-4 shadow-sm border-0">
          <div className="d-flex align-items-center mb-3">
            <img
              src={avatar}
              alt={name}
              className="rounded-circle me-3"
              style={{ width: '64px', height: '64px', objectFit: 'cover' }}
            />
            <div className="text-start">
              <h5 className="mb-0">{name}</h5>
              <small className="text-muted">{role}</small>
            </div>
          </div>

          {/* Escaped quotes to satisfy react/no-unescaped-entities */}
          <p className="fst-italic text-muted">&ldquo;{content}&rdquo;</p>
        </div>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous testimonial"
          className="btn btn-primary position-absolute top-50 start-0 translate-middle-y"
          style={{ width: '36px', height: '36px', padding: 0 }}
        >
          <span aria-hidden="true">&lsaquo;</span>
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next testimonial"
          className="btn btn-primary position-absolute top-50 end-0 translate-middle-y"
          style={{ width: '36px', height: '36px', padding: 0 }}
        >
          <span aria-hidden="true">&rsaquo;</span>
        </button>
      </div>

      {/* Indicators */}
      <div className="d-flex justify-content-center gap-2 mb-4">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Slide ${idx + 1}`}
            onClick={() => setCurrent(idx)}
            className={`rounded-circle border-0 ${
              idx === current ? 'bg-primary' : 'bg-secondary'
            }`}
            style={{ width: '12px', height: '12px' }}
          />
        ))}
      </div>

      {/* Read More CTA */}
      <div className="text-center">
        <Link href="/testimonials" className="btn btn-outline-primary">
          Read More Success Stories
        </Link>
      </div>
    </section>
  )
}
