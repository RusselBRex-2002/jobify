import 'bootstrap/dist/css/bootstrap.min.css'
import '@/app/globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { AuthProvider } from './components/AuthProvider'

export const metadata = {
  title: 'Jobify - Unlock Your Career Potential',
  description: 'Courses, jobs, and university partnerships.'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="d-flex flex-column min-vh-100">
        <AuthProvider>
          <Header />
          <main className="flex-fill">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
