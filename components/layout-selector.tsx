"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

interface LayoutOption {
  name: string
  description: string
}

interface LayoutSelectorProps {
  sectionName: string
  currentLayout: string
  layouts: LayoutOption[]
  onSelectLayout: (layout: string) => void
}

export function LayoutSelector({ sectionName, currentLayout, layouts, onSelectLayout }: LayoutSelectorProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={`${sectionName}-layout`} className="text-sm font-medium">
        {sectionName} Layout
      </label>
      <Select onValueChange={onSelectLayout} defaultValue={currentLayout}>
        <SelectTrigger id={`${sectionName}-layout`}>
          <SelectValue placeholder="Select layout" />
        </SelectTrigger>
        <SelectContent>
          {layouts.map((layout) => (
            <SelectItem key={layout.name} value={layout.name}>
              {layout.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

