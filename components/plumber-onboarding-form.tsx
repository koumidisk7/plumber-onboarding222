'use client'

import { useState, useEffect } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Label } from "../components/ui/label"
import { Card, CardContent } from "../components/ui/card"
import { Switch } from "../components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { submitPlumberOnboarding } from '../app/actions'
import { OpeningHours } from './opening-hours'
import { translations, Language } from '../utils/translations'
import { useFormStore } from '../store/formStore'
import { useRouter } from 'next/navigation'
import { Checkbox } from "../components/ui/checkbox"
function generateGUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default function PlumberOnboardingForm() {
  const [step, setStep] = useState(0)
  const { formData, updateFormData } = useFormStore()
  const router = useRouter()

  useEffect(() => {
    if (!formData.id) {
      updateFormData({ id: generateGUID() })
    }
  }, [formData.id, updateFormData])

  const nextStep = () => setStep(s => s + 1)
  const prevStep = () => setStep(s => s - 1)

  const t = translations[formData.language]

  const steps = [
    <CompanyInfo key="company" {...formData} updateFields={updateFormData} t={t} />,
    <SocialMedia key="social" {...formData} updateFields={updateFormData} t={t} />,
    <OpeningHours key="hours" openingHours={formData.openingHours} updateFields={updateFormData} t={t} />,
  ]

  const isLastStep = step === steps.length - 1

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLastStep) {
      return nextStep()
    }
    try {
      await submitPlumberOnboarding(formData)
    } catch (error) {
      console.error('Error submitting form:', error)
      // Handle error (e.g., show error message to user)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <header className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{t.title}</h1>
            <div className="flex items-center space-x-2">
              <span>EN</span>
              <Switch
                checked={formData.language === 'gr'}
                onCheckedChange={() => updateFormData({ language: formData.language === 'en' ? 'gr' : 'en' })}
              />
              <span>GR</span>
            </div>
          </header>
          <nav className="mb-4 flex justify-between" aria-label="Form progress">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-full ${
                  index <= step ? 'bg-blue-500' : 'bg-gray-300'
                } ${index !== steps.length - 1 ? 'mr-1' : ''}`}
              />
            ))}
          </nav>
          <section>{steps[step]}</section>
          <footer className="mt-6 flex justify-between">
            {step > 0 && (
              <Button type="button" variant="outline" onClick={prevStep} className="px-8 py-3 text-lg">
                {t.back}
              </Button>
            )}
            <Button type="submit" className="ml-auto px-8 py-3 text-lg">
              {isLastStep ? t.submit : t.next}
            </Button>
          </footer>
        </CardContent>
      </Card>
    </form>
  )
}

function CompanyInfo({
  companyName,
  companyType,
  yearEstablished,
  description,
  logo,
  services,
  updateFields,
  t,
}: ReturnType<typeof useFormStore>['formData'] & { updateFields: (fields: Partial<ReturnType<typeof useFormStore>['formData']>) => void, t: typeof translations.en }) {
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
  const [newService, setNewService] = useState('');

  const descriptionPlaceholder = "Example: We are a family-owned plumbing business with expertise in residential and commercial plumbing. Our services include pipe repair, drain cleaning, water heater installation, and emergency plumbing. We pride ourselves on our 24/7 availability and our commitment to using eco-friendly plumbing solutions.";

  const addService = () => {
    if (newService.trim() !== '') {
      updateFields({ services: [...services, newService.trim()] });
      setNewService('');
    }
  };

  const removeService = (index: number) => {
    const updatedServices = [...services];
    updatedServices.splice(index, 1);
    updateFields({ services: updatedServices });
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await convertToBase64(file);
      updateFields({ logo: base64 });
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{t.companyInfo}</h2>
      <div>
        <Label htmlFor="companyName">{t.companyName}</Label>
        <Input
          id="companyName"
          value={companyName}
          onChange={e => updateFields({ companyName: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="companyType">{t.companyType}</Label>
        <Select
          value={companyType}
          onValueChange={(value) => updateFields({ companyType: value })}
        >
          <SelectTrigger id="companyType">
            <SelectValue placeholder={t.selectCompanyType} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sole_proprietorship">{t.soleProprietorship}</SelectItem>
            <SelectItem value="partnership">{t.partnership}</SelectItem>
            <SelectItem value="corporation">{t.corporation}</SelectItem>
            <SelectItem value="llc">{t.llc}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="yearEstablished">{t.yearEstablished}</Label>
        <Input
          id="yearEstablished"
          type="number"
          min="1800"
          max={new Date().getFullYear()}
          value={yearEstablished}
          onChange={e => updateFields({ yearEstablished: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">{t.description}</Label>
        <Textarea
          id="description"
          value={description}
          onChange={e => {
            updateFields({ description: e.target.value });
            setIsDescriptionFocused(true);
          }}
          onFocus={() => setIsDescriptionFocused(true)}
          onBlur={() => setIsDescriptionFocused(description !== '')}
          placeholder={isDescriptionFocused ? '' : descriptionPlaceholder}
          className="min-h-[150px]"
          required
        />
      </div>
      <div>
        <Label htmlFor="logo">{t.logo}</Label>
        <Input
          id="logo"
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
        />
        {logo && (
          <img src={logo} alt="Company Logo" className="mt-2 w-24 h-24 object-contain" />
        )}
      </div>
      <div>
        <Label>{t.services}</Label>
        <div className="flex space-x-2">
          <Input
            value={newService}
            onChange={e => setNewService(e.target.value)}
            placeholder={t.addServicePlaceholder}
          />
          <Button type="button" onClick={addService}>
            {t.addService}
          </Button>
        </div>
        <ul className="list-disc pl-5 mt-2">
          {services.map((service, index) => (
            <li key={index} className="flex items-center justify-between">
              <span>{service}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeService(index)}
                aria-label={`${t.removeService} ${service}`}
              >
                {t.remove}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function SocialMedia({
  facebook,
  twitter,
  instagram,
  updateFields,
  t,
}: ReturnType<typeof useFormStore>['formData'] & { updateFields: (fields: Partial<ReturnType<typeof useFormStore>['formData']>) => void, t: typeof translations.en }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{t.socialMedia}</h2>
      <div>
        <Label htmlFor="facebook">{t.facebook}</Label>
        <Input
          id="facebook"
          value={facebook}
          onChange={e => updateFields({ facebook: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="twitter">{t.twitter}</Label>
        <Input
          id="twitter"
          value={twitter}
          onChange={e => updateFields({ twitter: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="instagram">{t.instagram}</Label>
        <Input
          id="instagram"
          value={instagram}
          onChange={e => updateFields({ instagram: e.target.value })}
        />
      </div>
    </div>
  )
}

