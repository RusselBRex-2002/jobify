import 'bootstrap/dist/css/bootstrap.min.css'
import Script from 'next/script'
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
      <head>
        {/* load the bundle before React hydrates */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          strategy="beforeInteractive"
        />
      </head>
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
