'use client'

import { useState, useRef } from 'react'
import { Button } from '../components/ui/button'
import Image from 'next/image'

interface LogoUploaderProps {
  logo: string | undefined;
  onUpload: (file: File) => void;
}

export function LogoUploader({ logo, onUpload }: LogoUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(logo || null);
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
      onUpload(file)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex items-center space-x-4">
      {previewUrl ? (
        <Image src={previewUrl} alt="Uploaded logo" width={40} height={40} className="rounded" />
      ) : (
        <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-gray-500">
          Logo
        </div>
      )}
      <Button onClick={handleButtonClick} variant="outline">
        {previewUrl ? 'Change Logo' : 'Upload Logo'}
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  )
}

