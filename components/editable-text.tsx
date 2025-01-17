'use client'

import { useState, useRef } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'

interface EditableTextProps {
  initialText: string
  className?: string
  style?: React.CSSProperties
  onStyleChange?: (style: React.CSSProperties) => void
}

export function EditableText({ initialText, className = '', style = {}, onStyleChange }: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(initialText)
  const [textStyle, setTextStyle] = useState<React.CSSProperties>(style)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    setIsEditing(true)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const handleBlur = () => {
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur()
    }
  }

  const handleStyleChange = (newStyle: Partial<React.CSSProperties>) => {
    const updatedStyle = { ...textStyle, ...newStyle }
    setTextStyle(updatedStyle)
    if (onStyleChange) {
      onStyleChange(updatedStyle)
    }
  }

  const fontFamilies = [
    'Arial, sans-serif',
    'Helvetica, sans-serif',
    'Georgia, serif',
    'Times New Roman, serif',
    'Courier New, monospace',
  ]

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`bg-transparent border-b border-gray-300 focus:outline-none focus:border-primary ${className}`}
        style={textStyle}
      />
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <span className={`cursor-pointer hover:bg-gray-100 ${className}`} style={textStyle}>
          {text}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="font-color">Font Color</Label>
            <Input
              id="font-color"
              type="color"
              value={textStyle.color as string}
              onChange={(e) => handleStyleChange({ color: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="font-size">Font Size</Label>
            <Input
              id="font-size"
              type="number"
              value={parseInt(textStyle.fontSize as string) || 16}
              onChange={(e) => handleStyleChange({ fontSize: `${e.target.value}px` })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="font-family">Font Family</Label>
            <Select
              onValueChange={(value) => handleStyleChange({ fontFamily: value })}
              defaultValue={textStyle.fontFamily as string}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select font family" />
              </SelectTrigger>
              <SelectContent>
                {fontFamilies.map((font) => (
                  <SelectItem key={font} value={font}>
                    {font.split(',')[0]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleClick}>Edit Text</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

