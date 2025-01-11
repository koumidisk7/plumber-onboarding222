'use client'

import { useState } from 'react'
import { EditableText } from '../../components/editable-text'
import { LayoutSuggestions } from '../../components/layout-suggestions'
import { Button } from '../../components/ui/button'
import { ColorPicker } from '../../components/color-picker'
import { LogoUploader } from '../../components/logo-uploader'
import { useFormStore } from '../../store/formStore'
import { submitPlumberOnboarding } from '../actions'
import router from 'next/router'

export default function Home() {
  const [heroLayout, setHeroLayout] = useState('centered')
  const [servicesLayout, setServicesLayout] = useState('grid')
  const [aboutLayout, setAboutLayout] = useState('single-column')
  const [contactLayout, setContactLayout] = useState('centered')
  const [headerTextColor, setHeaderTextColor] = useState('#ffffff')
  const [headerLogo, setHeaderLogo] = useState<File | null>(null)
  const { formData, updateFormData } = useFormStore()
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
                style={{ color: headerTextColor }}
                fieldName='companyName'
              />
            ) : (
              <EditableText
                initialText={formData.companyName}
                className={`text-2xl font-bold`}
                style={{ color: headerTextColor }}
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
                  <EditableText initialText={formData.companyName}     onChange={() => updateFormData({ companyName: e.target.value })} />
                </h1>
                <p className="text-xl mb-8">
                  <EditableText initialText={formData.description} fieldName='description'/>
                </p>
                <Button size="lg">
                  <EditableText initialText="Get a Quote" fieldName='' />
                </Button>
              </div>
              <div className="md:w-1/2">
                <img src="/placeholder.svg?height=300&width=400" alt="Pumping Services" className="w-full h-auto rounded-lg shadow-md" />
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-4xl font-bold mb-4">
                <EditableText initialText={formData.companyName} fieldName='companyName' />
              </h1>
              <p className="text-xl mb-8">
                <EditableText initialText={formData.description} fieldName='description' />
              </p>
              <Button size="lg">
                <EditableText initialText="Get a Quote" fieldName=''/>
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
            <EditableText initialText="Our Services" fieldName=''/>
          </h2>
          {servicesLayout === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {formData.services.map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">
                    <EditableText initialText={service} fieldName='' />
                  </h3>
                  <p>
                    <EditableText initialText={`Description for ${service}`} fieldName=''  />
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
                    <EditableText initialText={service}fieldName=''  />
                  </h3>
                  <p>
                    <EditableText initialText={`Description for ${service}`} fieldName=''  />
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
                    <EditableText initialText={service} fieldName=''  />
                  </h3>
                  <p>
                    <EditableText initialText={`Description for ${service}`} fieldName='' />
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
                fieldName=''  />
              </p>
              <p className="text-lg">
                <EditableText initialText="We pride ourselves on our commitment to customer satisfaction, use of cutting-edge technology, and adherence to the highest industry standards." 
                fieldName='' />
              </p>
            </div>
          )}
          {aboutLayout === 'two-column' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg">
                  <EditableText initialText={`${formData.companyName} has been providing top-notch pumping services since ${formData.yearEstablished}. ${formData.description}`} 
                  fieldName='' />
                </p>
              </div>
              <div>
                <p className="text-lg">
                  <EditableText initialText="We pride ourselves on our commitment to customer satisfaction, use of cutting-edge technology, and adherence to the highest industry standards." 
                  fieldName='' />
                </p>
              </div>
            </div>
          )}
          {aboutLayout === 'with-image' && (
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <p className="text-lg mb-4">
                  <EditableText initialText={`${formData.companyName} has been providing top-notch pumping services since ${formData.yearEstablished}. ${formData.description}`}
                  fieldName=''  />
                </p>
                <p className="text-lg">
                  <EditableText initialText="We pride ourselves on our commitment to customer satisfaction, use of cutting-edge technology, and adherence to the highest industry standards." 
                  fieldName='' />
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
            <EditableText initialText="Contact Us" fieldName=''  />
          </h2>
          {contactLayout === 'centered' && (
            <div className="max-w-md mx-auto">
              <p className="text-center mb-4">
                <EditableText initialText="Get in touch with us for all your pumping needs"  fieldName='' />
              </p>
              <div className="space-y-4">
                <p>
                  <strong>Phone:</strong> <EditableText initialText={formData.telephoneNumber}  fieldName='telephoneNumber' />
                </p>
                <p>
                  <strong>Email:</strong> <EditableText initialText={`info@${formData.companyName.toLowerCase().replace(' ', '')}.com`} fieldName='' />
                </p>
                <p>
                  <strong>Address:</strong> <EditableText initialText={formData.address}  fieldName='address' />
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
                    <strong>Phone:</strong> <EditableText initialText={formData.telephoneNumber} fieldName='telephoneNumber'  />
                  </p>
                  <p>
                    <strong>Email:</strong> <EditableText initialText={`info@${formData.companyName.toLowerCase().replace(' ', '')}.com`} fieldName='' />
                  </p>
                  <p>
                    <strong>Address:</strong> <EditableText initialText={formData.address} fieldName='address'  />
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
                <EditableText initialText="Get in touch with us for all your pumping needs" fieldName='' />
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
          <EditableText initialText={`© ${new Date().getFullYear()} ${formData.companyName}. All rights reserved.`} fieldName=''  />
        </div>
      </footer>
    </div>
  )
}

