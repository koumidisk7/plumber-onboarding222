'use client'

import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover'
import { Button } from '../components/ui/button'

interface ColorPickerProps {
  onChange: (color: string) => void
}

export function ColorPicker({ onChange }: ColorPickerProps) {
  const [color, setColor] = useState('#ffffff')

  const handleColorChange = (newColor: string) => {
    setColor(newColor)
    onChange(newColor)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-10 h-10 p-0">
          <div
            className="w-full h-full rounded"
            style={{ backgroundColor: color }}
          />
          <span className="sr-only">Pick a color</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Pick a color</h4>
            <p className="text-sm text-muted-foreground">
              Choose a color for the header text.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-5 gap-2">
              {['#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'].map((c) => (
                <Button
                  key={c}
                  variant="outline"
                  className="w-8 h-8 p-0"
                  style={{ backgroundColor: c }}
                  onClick={() => handleColorChange(c)}
                />
              ))}
            </div>
            <input
              type="color"
              value={color}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

