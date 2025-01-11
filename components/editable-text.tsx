'use client'

import { useState, useRef } from 'react'
import { useFormStore } from '../store/formStore'

interface EditableTextProps {
  initialText: string
  fieldName: string
  className?: string
  style?: React.CSSProperties
}

export function EditableText({ initialText, className = '', style = {},fieldName='companyName' }: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(initialText)
  const inputRef = useRef<HTMLInputElement>(null)
  const { formData, updateFormData } = useFormStore()

  const handleClick = () => {
    setIsEditing(true)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
    var data = {}  
    data[fieldName] = e.target.value
    updateFormData(  data    )
  }

  const handleBlur = () => {
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur()
    }
  }

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
        style={style}
      />
    )
  }

  return (
    <span onClick={handleClick} className={`cursor-pointer hover:bg-gray-100 ${className}`} style={style}>
      {text}
    </span>
  )
}

