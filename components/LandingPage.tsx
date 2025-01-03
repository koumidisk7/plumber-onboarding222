'use client'
import { redirect } from 'next/navigation';
import { Button } from "./ui/button"
import { useRouter } from 'next/navigation'
import { ArrowRight, Globe, Clock, DollarSign, Star } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { PricingCard } from '../components/PricingCard'
import { getSession } from '@auth0/nextjs-auth0';

export async function LandingPage() {
  const router = useRouter()
  const session = await getSession();

  const handleSelect = () => {
console.log('handleSelect');
redirect('dashboard')
return;  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Boost Your Plumbing Business with a Strong Digital Presence</h1>
          <p className="text-xl text-gray-600">Join our network and take your plumbing services to the next level</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <Globe className="w-12 h-12 text-blue-500 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Expand Your Reach</h2>
              <p className="text-gray-600">Reach more customers online and grow your business beyond traditional boundaries.</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <Clock className="w-12 h-12 text-blue-500 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">24/7 Visibility</h2>
              <p className="text-gray-600">Be discoverable anytime, anywhere. Let customers find you even outside business hours.</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <DollarSign className="w-12 h-12 text-blue-500 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Increase Revenue</h2>
              <p className="text-gray-600">Attract more clients and boost your income with an optimized online presence.</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <Star className="w-12 h-12 text-blue-500 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Build Trust</h2>
              <p className="text-gray-600">Showcase your expertise and customer reviews to establish credibility in the digital world.</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button asChild className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700">
            <Link href="/onboarding">
              Start Your Digital Journey <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      
      
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
                highlighted
                isLogedIn = { typeof session == 'object' && session.user !=null}
              
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
      
      </div>
    </div>
  )
}

