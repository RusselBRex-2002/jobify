import React from 'react'
import Link from 'next/link'

type University = {
  id: number
  name: string
  logo: string
  topPrograms: string[]
  placementRate: string
}

const partners: University[] = [
  {
    id: 1,
    name: 'Global Tech University',
    logo: '/logos/gtu.png',
    topPrograms: ['CSE', 'Data Science', 'AI & ML'],
    placementRate: '95%',
  },
  {
    id: 2,
    name: 'Metro Business School',
    logo: '/logos/mbs.png',
    topPrograms: ['Marketing', 'Finance', 'Management'],
    placementRate: '90%',
  },
  {
    id: 3,
    name: 'International Arts College',
    logo: '/logos/iac.png',
    topPrograms: ['Design', 'Media', 'Performing Arts'],
    placementRate: '88%',
  },
  {
    id: 4,
    name: 'Innovate Engineering Institute',
    logo: '/logos/iei.png',
    topPrograms: ['Mechanical', 'Electrical', 'Civil'],
    placementRate: '92%',
  },
]

export default function UniversitiesPreview() {
  return (
    <section className="py-5 bg-light">
      {/* Header */}
      <div className="container text-center mb-4">
        <h2 className="fw-bold">Partner with Top Universities</h2>
        <p className="text-muted">
          Join our network and amplify your placement success.
        </p>
      </div>

      {/* Grid of partner cards */}
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
          {partners.map((uni) => (
            <div className="col" key={uni.id}>
              <div className="card h-100 shadow-sm text-center border-0">
                <div className="card-body d-flex flex-column align-items-center">
                  <img
                    src={uni.logo}
                    alt={`${uni.name} logo`}
                    className="mb-3"
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'contain',
                    }}
                  />
                  <h5 className="card-title">{uni.name}</h5>
                  <small className="text-muted mb-2 d-block">
                    {uni.topPrograms.join(', ')}
                  </small>
                  <span className="text-success fw-semibold mb-3 d-block">
                    Placement Rate: {uni.placementRate}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-4">
          <Link href="/universities" className="btn btn-primary btn-lg">
            Partner with Us
          </Link>
        </div>
      </div>
    </section>
  )
}
