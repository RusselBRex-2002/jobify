import React from 'react'
import Link from 'next/link'

type Feature = {
  title: string
  icon: string
  description: string
}

const features: Feature[] = [
  {
    title: 'For Students',
    icon: '/icons/student.svg',
    description: 'Access courses, connect with recruiters, and apply for jobs.',
  },
  {
    title: 'For Recruiters',
    icon: '/icons/recruiter.svg',
    description: 'Post job opportunities, host recruitment events, and hire top talent.',
  },
  {
    title: 'For Universities',
    icon: '/icons/university.svg',
    description: 'Track placements, manage recruitment events, and connect with companies.',
  },
  {
    title: 'For Instructors',
    icon: '/icons/instructor.svg',
    description: 'Create and sell courses, interact with students, and gain exposure.',
  },
]

export default function Features() {
  return (
    <section className="py-5 bg-white">
      <div className="container text-center mb-5">
        <h2 className="fw-bold">What We Offer</h2>
        <p className="text-muted">Four tailored experiences to suit every user role.</p>
      </div>

      <div className="container">
        <div className="row g-4">
          {features.map((feature) => (
            <div className="col-12 col-md-6 col-lg-3" key={feature.title}>
              <div className="card h-100 border shadow-sm">
                <div className="card-body text-center">
                  <img
                    src={feature.icon}
                    alt={`${feature.title} icon`}
                    className="mb-3"
                    style={{ width: 48, height: 48 }}
                  />
                  <h5 className="card-title">{feature.title}</h5>
                  <p className="card-text text-muted">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link href="/signup" className="btn btn-primary btn-lg">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  )
}
