import { LandingPage } from '../components/LandingPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Plumber Digital Presence | Your Company Name',
  description: 'Boost your plumbing business with a strong digital presence. Join our network and grow your business online.',
  keywords: 'plumber, digital presence, online business, plumbing services',
  openGraph: {
    title: 'Plumber Digital Presence | Your Company Name',
    description: 'Boost your plumbing business with a strong digital presence. Join our network and grow your business online.',
    images: [
      {
        url: 'https://example.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Plumber Digital Presence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plumber Digital Presence | Your Company Name',
    description: 'Boost your plumbing business with a strong digital presence. Join our network and grow your business online.',
    images: ['https://example.com/twitter-image.jpg'],
  },
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Plumber Digital Presence",
            "description": "Boost your plumbing business with a strong digital presence. Join our network and grow your business online.",
            "provider": {
              "@type": "Organization",
              "name": "Your Company Name",
              "url": "https://example.com"
            }
          })
        }}
      />
      <main>
        <LandingPage />
      </main>
    </>
  )
}

