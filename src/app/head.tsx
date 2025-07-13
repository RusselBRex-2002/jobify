import Script from 'next/script'

export default function Head() {
  return (
    <>
      <title>Jobify  Your Career Hub</title>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
        strategy="beforeInteractive"
      />
    </>
  )
}
