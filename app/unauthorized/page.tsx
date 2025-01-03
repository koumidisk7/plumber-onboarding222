'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { PricingCard } from '../../components/PricingCard'

export default function UnauthorizedPage() {
  const router = useRouter()

  const handleSelect = () => {
    router.push('/api/auth/login')
  }

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-4xl mb-8">
        <CardHeader>
          <CardTitle>Choose Your Plan</CardTitle>
          <CardDescription>Select a plan to continue with your plumber onboarding</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <PricingCard
              title="Free Plan"
              price="$0"
              description="Perfect for getting started"
              features={[
                "Up to 6 months usage",
                "Basic digital presence",
                "Limited customer reach"
              ]}
              buttonText="Select Free Plan"
              onSelect={handleSelect}
            />
            <PricingCard
              title="Premium Plan"
              price="$29.99/mo"
              description="For serious plumbing businesses"
              features={[
                "Unlimited usage",
                "Advanced digital presence",
                "Expanded customer reach",
                "Priority support"
              ]}
              buttonText="Select Premium Plan"
              onSelect={handleSelect}
              highlighted
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

