import PlumberOnboardingForm from '../components/plumber-onboarding-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Plumber Onboarding | Your Company Name',
  description: 'Easy onboarding process for professional plumbers. Join our network and grow your business.',
  keywords: 'plumber, onboarding, professional services, plumbing business',
  openGraph: {
    title: 'Plumber Onboarding | Your Company Name',
    description: 'Easy onboarding process for professional plumbers. Join our network and grow your business.',
    images: [
      {
        url: 'https://example.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Plumber Onboarding',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plumber Onboarding | Your Company Name',
    description: 'Easy onboarding process for professional plumbers. Join our network and grow your business.',
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
            "name": "Plumber Onboarding",
            "description": "Easy onboarding process for professional plumbers. Join our network and grow your business.",
            "provider": {
              "@type": "Organization",
              "name": "Your Company Name",
              "url": "https://example.com"
            }
          })
        }}
      />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Plumber Onboarding</h1>
        <PlumberOnboardingForm />
      </main>
    </>
  )
}

