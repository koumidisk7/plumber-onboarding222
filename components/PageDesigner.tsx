'use client'

import { useState, useCallback } from 'react'
import { EditableText } from './editable-text'
import { LayoutSuggestions } from './layout-suggestions'
import { Button } from './ui/button'
import { ColorPicker } from './color-picker'
import { LogoUploader } from './logo-uploader'
import { FormData2, useFormStore } from '../store/formStore'
import { submitPlumberOnboarding } from '../app/actions'

import router from 'next/router'
interface PageDesignerProps {
    formData: FormData2;
  }
export default function Home({formData}:PageDesignerProps) {
  const [heroLayout, setHeroLayout] = useState('centered')
  const [servicesLayout, setServicesLayout] = useState('grid')
  const [aboutLayout, setAboutLayout] = useState('single-column')
  const [contactLayout, setContactLayout] = useState('centered')
  const [headerTextColor, setHeaderTextColor] = useState('#ffffff')
  const [headerLogo, setHeaderLogo] = useState<File | null>(null)
  const {  updateFormData } = useFormStore()

  const [textStyles, setTextStyles] = useState<{ [key: string]: React.CSSProperties }>({});

  const handleStyleChange = useCallback((id: string, style: React.CSSProperties) => {
    setTextStyles((prev) => ({ ...prev, [id]: style }));
  }, []);

  const heroLayouts = [
    { name: 'centered', description: 'Content centered on the page' },
    { name: 'left-aligned', description: 'Content aligned to the left' },
    { name: 'with-image', description: 'Text on the left, image on the right' },
  ]

  const servicesLayouts = [
    { name: 'grid', description: '3-column grid layout' },
    { name: 'list', description: 'Vertical list layout' },
    { name: 'carousel', description: 'Horizontal scrolling carousel' },
  ]

  const aboutLayouts = [
    { name: 'single-column', description: 'Text in a single column' },
    { name: 'two-column', description: 'Text split into two columns' },
    { name: 'with-image', description: 'Text on one side, image on the other' },
  ]

  const contactLayouts = [
    { name: 'centered', description: 'Contact info centered on the page' },
    { name: 'split', description: 'Contact form on one side, info on the other' },
    { name: 'full-width', description: 'Full-width contact form' },
  ]
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await submitPlumberOnboarding(formData)
      router.push('/dashboard')
    } catch (error) {
      console.error('Error submitting form:', error)
      // Handle error (e.g., show error message to user)
    }
  }
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-primary py-4 relative">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <LogoUploader logo={formData.logo} onUpload={(file) => {
              // Handle logo upload and update formData
              const reader = new FileReader();
              reader.onloadend = () => {
               // setFormData(prev => ({ ...prev, logo: reader.result as string }));
              };
              reader.readAsDataURL(file);
            }} />
            {formData.logo ? (
              <EditableText
                initialText={formData.companyName}
                className={`text-2xl font-bold`}
                style={textStyles['companyName'] || { color: headerTextColor }}
                onStyleChange={(style) => handleStyleChange('companyName', style)}
                fieldName='companyName'
              />
            ) : (
              <EditableText
                initialText={formData.companyName}
                className={`text-2xl font-bold`}
                style={textStyles['companyName'] || { color: headerTextColor }}
                onStyleChange={(style) => handleStyleChange('companyName', style)}
                fieldName='companyName'
              />
            )}
          </div>
          <nav className="flex items-center space-x-4">
           <Button onClick={handleSubmit}></Button>
            <ColorPicker onChange={setHeaderTextColor} />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`py-20 bg-gray-100 relative ${
        heroLayout === 'centered' ? 'text-center' :
        heroLayout === 'left-aligned' ? 'text-left' :
        'flex items-center'
      }`}>
        <LayoutSuggestions
          sectionName="Hero"
          options={heroLayouts}
          onSelectLayout={setHeroLayout}
        />
        <div className="container mx-auto px-4">
          {heroLayout === 'with-image' ? (
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl font-bold mb-4">
                  <EditableText initialText={formData.companyName}   
                    onChange={() => updateFormData({ companyName: e.target.value })}
                    style={textStyles['heroTitle'] || {}} onStyleChange={(style) => handleStyleChange('heroTitle', style)} />
                </h1>
                <p className="text-xl mb-8">
                  <EditableText initialText={formData.description} fieldName='description'
                   style={textStyles['heroDescription'] || {}} onStyleChange={(style) => handleStyleChange('heroDescription', style)}/>
                </p>
                <Button size="lg">
                  <EditableText initialText="Get a Quote" fieldName=''
                  style={textStyles['heroButton'] || {}} onStyleChange={(style) => handleStyleChange('heroButton', style)} />
                </Button>
              </div>
              <div className="md:w-1/2">
                <img src="/placeholder.svg?height=300&width=400" alt="Pumping Services" className="w-full h-auto rounded-lg shadow-md" />
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-4xl font-bold mb-4">
                <EditableText initialText={formData.companyName} 
                fieldName='companyName' 
                style={textStyles['heroTitle'] || {}} onStyleChange={(style) => handleStyleChange('heroTitle', style)} />
              </h1>
              <p className="text-xl mb-8">
                <EditableText initialText={formData.description} 
                fieldName='description' 
                style={textStyles['heroDescription'] || {}} onStyleChange={(style) => handleStyleChange('heroDescription', style)}/>
              </p>
              <Button size="lg">
                <EditableText initialText="Get a Quote" fieldName=''
                style={textStyles['heroButton'] || {}} onStyleChange={(style) => handleStyleChange('heroButton', style)}
                />
              </Button>
            </>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 relative">
        <LayoutSuggestions
          sectionName="Services"
          options={servicesLayouts}
          onSelectLayout={setServicesLayout}
        />
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <EditableText initialText="Our Services" 
            fieldName=''
            style={textStyles['servicesTitle'] || {}} onStyleChange={(style) => handleStyleChange('servicesTitle', style)}/>
          </h2>
          {servicesLayout === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {formData.services.map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">
                    <EditableText initialText={service} fieldName=''
                     style={textStyles[`service${index}`] || {}} onStyleChange={(style) => handleStyleChange(`service${index}`, style)} />
                  </h3>
                  <p>
                    <EditableText initialText={`Description for ${service}`} fieldName='' 
                    style={textStyles[`serviceDescription${index}`] || {}} onStyleChange={(style) => handleStyleChange(`serviceDescription${index}`, style)} />
                  </p>
                </div>
              ))}
            </div>
          )}
          {servicesLayout === 'list' && (
            <div className="space-y-8">
              {formData.services.map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">
                    <EditableText initialText={service} fieldName='' 
                    style={textStyles[`service${index}`] || {}} onStyleChange={(style) => handleStyleChange(`service${index}`, style)} />
                  </h3>
                  <p>
                    <EditableText initialText={`Description for ${service}`} fieldName=''
                     style={textStyles[`serviceDescription${index}`] || {}} onStyleChange={(style) => handleStyleChange(`serviceDescription${index}`, style)}  />
                  </p>
                </div>
              ))}
            </div>
          )}
          {servicesLayout === 'carousel' && (
            <div className="flex overflow-x-auto space-x-6 pb-4">
              {formData.services.map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md min-w-[300px]">
                  <h3 className="text-xl font-semibold mb-4">
                    <EditableText initialText={service} fieldName=''  
                    style={textStyles[`service${index}`] || {}} onStyleChange={(style) => handleStyleChange(`service${index}`, style)}
                    />
                  </h3>
                  <p>
                    <EditableText initialText={`Description for ${service}`} fieldName=''
                    style={textStyles[`serviceDescription${index}`] || {}} onStyleChange={(style) => handleStyleChange(`serviceDescription${index}`, style)} />
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-100 relative">
        <LayoutSuggestions
          sectionName="About"
          options={aboutLayouts}
          onSelectLayout={setAboutLayout}
        />
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <EditableText initialText="About Us" fieldName=''  />
          </h2>
          {aboutLayout === 'single-column' && (
            <div className="max-w-2xl mx-auto">
              <p className="text-lg mb-4">
                <EditableText initialText={`${formData.companyName} has been providing top-notch pumping services since ${formData.yearEstablished}. ${formData.description}`}
                fieldName='' 
                style={textStyles['aboutTitle'] || {}} onStyleChange={(style) => handleStyleChange('aboutTitle', style)} />
              </p>
              <p className="text-lg">
                <EditableText initialText="We pride ourselves on our commitment to customer satisfaction, use of cutting-edge technology, and adherence to the highest industry standards." 
                fieldName=''
                style={textStyles['aboutParagraph1'] || {}} onStyleChange={(style) => handleStyleChange('aboutParagraph1', style)} />
              </p>
            </div>
          )}
          {aboutLayout === 'two-column' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg">
                  <EditableText initialText={`${formData.companyName} has been providing top-notch pumping services since ${formData.yearEstablished}. ${formData.description}`} 
                  fieldName='' 
                  style={textStyles['aboutParagraph1'] || {}} onStyleChange={(style) => handleStyleChange('aboutParagraph1', style)}/>
                </p>
              </div>
              <div>
                <p className="text-lg">
                  <EditableText initialText="We pride ourselves on our commitment to customer satisfaction, use of cutting-edge technology, and adherence to the highest industry standards." 
                  fieldName=''
                  style={textStyles['aboutParagraph2'] || {}}
                   onStyleChange={(style) => handleStyleChange('aboutParagraph2', style)} />
                </p>
              </div>
            </div>
          )}
          {aboutLayout === 'with-image' && (
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <p className="text-lg mb-4">
                  <EditableText initialText={`${formData.companyName} has been providing top-notch pumping services since ${formData.yearEstablished}. ${formData.description}`}
                  fieldName=''
                  style={textStyles['aboutParagraph1'] || {}} onStyleChange={(style) => handleStyleChange('aboutParagraph1', style)}  />
                </p>
                <p className="text-lg">
                  <EditableText initialText="We pride ourselves on our commitment to customer satisfaction, use of cutting-edge technology, and adherence to the highest industry standards." 
                  fieldName='' 
                  style={textStyles['aboutParagraph2'] || {}} onStyleChange={(style) => handleStyleChange('aboutParagraph2', style)}/>
                </p>
              </div>
              <div className="md:w-1/2">
                <img src="/placeholder.svg?height=300&width=400" alt="About Pumpers Pro" className="w-full h-auto rounded-lg shadow-md" />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 relative">
        <LayoutSuggestions
          sectionName="Contact"
          options={contactLayouts}
          onSelectLayout={setContactLayout}
        />
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <EditableText initialText="Contact Us" fieldName='' 
             style={textStyles['contactTitle'] || {}} onStyleChange={(style) => handleStyleChange('contactTitle', style)}  />
          </h2>
          {contactLayout === 'centered' && (
            <div className="max-w-md mx-auto">
              <p className="text-center mb-4">
                <EditableText initialText="Get in touch with us for all your pumping needs"  fieldName=''
                style={textStyles['contactParagraph'] || {}} onStyleChange={(style) => handleStyleChange('contactParagraph', style)} />
              </p>
              <div className="space-y-4">
                <p>
                  <strong>Phone:</strong> <EditableText initialText={formData.telephoneNumber}  fieldName='telephoneNumber'
                  style={textStyles['contactPhone'] || {}} onStyleChange={(style) => handleStyleChange('contactPhone', style)} />
                </p>
                <p>
                  <strong>Email:</strong> <EditableText initialText={`info@${formData.companyName.toLowerCase().replace(' ', '')}.com`} fieldName='' 
                  style={textStyles['contactAddress'] || {}} onStyleChange={(style) => handleStyleChange('contactAddress', style)}/>
                </p>
                <p>
                  <strong>Address:</strong> <EditableText initialText={formData.address}  fieldName='address'
                  style={textStyles['contactPhone'] || {}} onStyleChange={(style) => handleStyleChange('contactPhone', style)} />
                </p>
              </div>
            </div>
          )}
          {contactLayout === 'split' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <p>
                    <strong>Phone:</strong> <EditableText initialText={formData.telephoneNumber} fieldName='telephoneNumber' 
                    style={textStyles['contactPhone'] || {}} onStyleChange={(style) => handleStyleChange('contactPhone', style)} />
                  </p>
                  <p>
                    <strong>Email:</strong> <EditableText initialText={`info@${formData.companyName.toLowerCase().replace(' ', '')}.com`} fieldName=''
                    style={textStyles['contactEmail'] || {}} onStyleChange={(style) => handleStyleChange('contactEmail', style)} />
                  </p>
                  <p>
                    <strong>Address:</strong> <EditableText initialText={formData.address} fieldName='address' 
                    style={textStyles['contactAddress'] || {}} onStyleChange={(style) => handleStyleChange('contactAddress', style)} />
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Send us a message</h3>
                <form className="space-y-4">
                  <input type="text" placeholder="Name" className="w-full p-2 border rounded" />
                  <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
                  <textarea placeholder="Message" className="w-full p-2 border rounded" rows={4}></textarea>
                  <Button type="submit">Send Message</Button>
                </form>
              </div>
            </div>
          )}
          {contactLayout === 'full-width' && (
            <div className="max-w-2xl mx-auto">
              <p className="text-center mb-4">
                <EditableText initialText="Get in touch with us for all your pumping needs" fieldName='' 
                style={textStyles['contactParagraph'] || {}} onStyleChange={(style) => handleStyleChange('contactParagraph', style)}/>
              </p>
              <form className="space-y-4">
                <input type="text" placeholder="Name" className="w-full p-2 border rounded" />
                <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
                <textarea placeholder="Message" className="w-full p-2 border rounded" rows={4}></textarea>
                <Button type="submit">Send Message</Button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <EditableText initialText={`© ${new Date().getFullYear()} ${formData.companyName}. All rights reserved.`} fieldName='' 
          style={textStyles['footerText'] || {}} onStyleChange={(style) => handleStyleChange('footerText', style)} />
        </div>
      </footer>
    </div>
  )
}

