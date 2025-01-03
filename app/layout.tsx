import { UserProvider } from '@auth0/nextjs-auth0/client'
import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Plumber Digital Presence',
  description: 'Boost your plumbing business with a strong digital presence',
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
        <body>
          <nav className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold">PlumberBoost</Link>
              <div>
                <Link href="/onboarding" className="mr-4 hover:underline">Onboarding</Link>
                <Link href="/api/auth/login" className="hover:underline">Login</Link>
              </div>
            </div>
          </nav>
          {children}
        </body>
      </UserProvider>
    </html>
  )
}

