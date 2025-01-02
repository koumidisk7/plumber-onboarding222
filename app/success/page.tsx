import Link from 'next/link'
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"

export default function AuthorizedPage() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Success</CardTitle>
          <CardDescription>Success continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            To submit your plumber onboarding information, you need to be logged in. This ensures the security and privacy of your data.
          </p>
          <div className="flex justify-center">
    
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

