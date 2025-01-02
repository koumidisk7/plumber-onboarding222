import { UserProvider } from '@auth0/nextjs-auth0/client'
import './globals.css'

export const metadata = {
  title: 'Plumber Onboarding',
  description: 'Onboarding platform for plumbers',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://example.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
      </head>
      <UserProvider>
        <body>{children}</body>
      </UserProvider>
    </html>
  )
}

