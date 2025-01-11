'use client'

import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'

interface LayoutOption {
  name: string
  description: string
}

interface LayoutSuggestionsProps {
  sectionName: string
  options: LayoutOption[]
  onSelectLayout: (layout: string) => void
}

export function LayoutSuggestions({ sectionName, options, onSelectLayout }: LayoutSuggestionsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelectLayout = (layout: string) => {
    onSelectLayout(layout)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="absolute top-2 right-2 z-10">
          Change Layout
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Choose a layout for {sectionName}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => handleSelectLayout(option.name)}
            >
              {option.name}
              <span className="ml-2 text-sm text-muted-foreground">{option.description}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

