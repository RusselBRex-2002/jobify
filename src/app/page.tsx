import Hero from './components/Hero'
import Features from './components/Features'
import CoursesPreview from './components/CoursesPreview'
import JobBoardPreview from './components/JobBoardPreview'
import UniversitiesPreview from './components/UniversitiesPreview'
import Testimonials from './components/Testimonials'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <CoursesPreview />
      <JobBoardPreview />
      <UniversitiesPreview />
      <Testimonials />
    </>
  )
}
