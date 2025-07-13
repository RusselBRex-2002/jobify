import React from 'react'
import Link from 'next/link'

type Job = {
  id: number
  title: string
  company: string
  location: string
  salary?: string
}

const sampleJobs: Job[] = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'Remote',
    salary: '$60k-$80k',
  },
  {
    id: 2,
    title: 'Data Analyst Intern',
    company: 'DataWorks',
    location: 'New York, NY',
  },
  {
    id: 3,
    title: 'Digital Marketing Specialist',
    company: 'Marketify',
    location: 'San Francisco, CA',
    salary: '$50k-$70k',
  },
  {
    id: 4,
    title: 'UX/UI Designer',
    company: 'DesignHub',
    location: 'London, UK',
    salary: '£40k-£55k',
  },
  {
    id: 5,
    title: 'Machine Learning Engineer',
    company: 'AI Labs',
    location: 'Bangalore, India',
    salary: '₹8L-₹12L',
  },
]

export default function JobBoardPreview() {
  return (
    <section className="py-5 bg-white">
      {/* Section header */}
      <div className="container text-center mb-4">
        <h2 className="fw-bold">Find Your Dream Job</h2>
        <p className="text-muted">Browse the latest opportunities.</p>
      </div>

      {/* Job list */}
      <div className="container">
        <ul className="list-group list-group-flush mb-4">
          {sampleJobs.map((job) => (
            <li
              key={job.id}
              className="list-group-item d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center py-3"
            >
              {/* Job info */}
              <div>
                <h5 className="mb-1">{job.title}</h5>
                <small className="text-muted">
                  {job.company} · {job.location}
                </small>
              </div>

              {/* Salary & CTA */}
              <div className="mt-2 mt-sm-0">
                {job.salary && (
                  <span className="text-success me-3">{job.salary}</span>
                )}
                <Link
                  href={`/jobs/${job.id}`}
                  className="btn btn-primary btn-sm"
                >
                  Apply Now
                </Link>
              </div>
            </li>
          ))}
        </ul>

        {/* View all */}
        <div className="text-center">
          <Link href="/jobs" className="btn btn-outline-primary">
            View All Jobs
          </Link>
        </div>
      </div>
    </section>
  )
}
