import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Check } from 'lucide-react'

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  buttonText: string
  onSelect: () => void
  highlighted?: boolean
}

export function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  onSelect,
  highlighted = false,
}: PricingCardProps) {
  return (
    <Card className={`w-full max-w-sm ${highlighted ? 'border-blue-500 border-2' : ''}`}>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold mb-4">{price}</div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onSelect}>
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}

