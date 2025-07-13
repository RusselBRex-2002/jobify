import React from 'react'
import Link from 'next/link'

type Course = {
  id: number
  title: string
  thumbnail: string
  instructor: string
  rating: number
}

const sampleCourses: Course[] = [
  {
    id: 1,
    title: 'Introduction to React',
    thumbnail: '/images/course-react.jpg',
    instructor: 'Jane Doe',
    rating: 4.7,
  },
  {
    id: 2,
    title: 'Data Science with Python',
    thumbnail: '/images/course-python.jpg',
    instructor: 'John Smith',
    rating: 4.8,
  },
  {
    id: 3,
    title: 'Digital Marketing Basics',
    thumbnail: '/images/course-marketing.jpg',
    instructor: 'Emily Clark',
    rating: 4.5,
  },
  {
    id: 4,
    title: 'UI/UX Design Fundamentals',
    thumbnail: '/images/course-ux.jpg',
    instructor: 'Michael Lee',
    rating: 4.6,
  },
]

export default function CoursesPreview() {
  return (
    <section className="py-5 bg-light">
      <div className="container text-center mb-4">
        <h2 className="fw-bold">Explore Our Courses</h2>
        <p className="text-muted">Start learning today with top-rated courses.</p>
      </div>

      <div className="container">
        <div className="row g-4">
          {sampleCourses.map((course) => (
            <div className="col-12 col-sm-6 col-lg-3" key={course.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={course.thumbnail}
                  className="card-img-top"
                  alt={course.title}
                  style={{ height: '160px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{course.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {course.instructor}
                  </h6>
                  <div className="mb-3 text-warning">
                    {'★'.repeat(Math.floor(course.rating))}
                    <small className="text-muted"> ({course.rating})</small>
                  </div>
                  <Link
                    href={`/courses/${course.id}`}
                    className="mt-auto btn btn-primary"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <Link href="/courses" className="btn btn-outline-primary">
            View All Courses
          </Link>
        </div>
      </div>
    </section>
  )
}
