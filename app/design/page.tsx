'use client'

import { useState, useCallback } from 'react'
import { EditableText } from '../../components/editable-text'
import { LayoutSuggestions } from '../../components/layout-suggestions'
import { Button } from '../../components/ui/button'
import { ColorPicker } from '../../components/color-picker'
import { LogoUploader } from '../../components/logo-uploader'
import { useFormStore } from '../../store/formStore'
import { submitPlumberOnboarding } from '../actions'
import router from 'next/router'

// Define an object to store CSS classes for EditableText components
const editableTextClasses = {
  companyName: "text-2xl font-bold",
  navItem: "text-sm",
  heroTitle: "text-4xl font-bold mb-4",
  heroDescription: "text-xl mb-8",
  heroButton: "text-white",
  sectionTitle: "text-3xl font-bold mb-8 text-center",
  serviceTitle: "text-xl font-semibold mb-4",
  serviceDescription: "text-base",
  aboutParagraph: "text-lg mb-4",
  contactTitle: "text-3xl font-bold mb-8 text-center",
  contactParagraph: "text-center mb-4",
  contactInfo: "text-base",
  footerText: "text-sm",
};
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
  const handleTextChange = useCallback((fieldName: string, text: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: text,
    }));
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-primary py-4 relative">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <LogoUploader logo={formData.logo} onUpload={(file) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                setFormData(prev => ({ ...prev, logo: reader.result as string }));
              };
              reader.readAsDataURL(file);
            }} />
            <EditableText
              initialText={formData.companyName}
              fieldName="companyName"
              className={editableTextClasses.companyName}
              onTextChange={handleTextChange}
            />
          </div>
          <nav className="flex items-center space-x-4">
            <ul className="flex space-x-4">
              <li><EditableText initialText="Home" fieldName="navHome" className={editableTextClasses.navItem} onTextChange={handleTextChange} /></li>
              <li><EditableText initialText="Services" fieldName="navServices" className={editableTextClasses.navItem} onTextChange={handleTextChange} /></li>
              <li><EditableText initialText="About" fieldName="navAbout" className={editableTextClasses.navItem} onTextChange={handleTextChange} /></li>
              <li><EditableText initialText="Contact" fieldName="navContact" className={editableTextClasses.navItem} onTextChange={handleTextChange} /></li>
            </ul>
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
                <h1 className={editableTextClasses.heroTitle}>
                  <EditableText initialText={formData.companyName} fieldName="heroTitle" className={editableTextClasses.heroTitle} onTextChange={handleTextChange} />
                </h1>
                <p className={editableTextClasses.heroDescription}>
                  <EditableText initialText={formData.description} fieldName="heroDescription" className={editableTextClasses.heroDescription} onTextChange={handleTextChange} />
                </p>
                <Button size="lg">
                  <EditableText initialText="Get a Quote" fieldName="heroButton" className={editableTextClasses.heroButton} onTextChange={handleTextChange} />
                </Button>
              </div>
              <div className="md:w-1/2">
                <img src="/placeholder.svg?height=300&width=400" alt="Pumping Services" className="w-full h-auto rounded-lg shadow-md" />
              </div>
            </div>
          ) : (
            <>
              <h1 className={editableTextClasses.heroTitle}>
                <EditableText initialText={formData.companyName} fieldName="heroTitle" className={editableTextClasses.heroTitle} onTextChange={handleTextChange} />
              </h1>
              <p className={editableTextClasses.heroDescription}>
                <EditableText initialText={formData.description} fieldName="heroDescription" className={editableTextClasses.heroDescription} onTextChange={handleTextChange} />
              </p>
              <Button size="lg">
                <EditableText initialText="Get a Quote" fieldName="heroButton" className={editableTextClasses.heroButton} onTextChange={handleTextChange} />
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
          <h2 className={editableTextClasses.sectionTitle}>
            <EditableText initialText="Our Services" fieldName="servicesTitle" className={editableTextClasses.sectionTitle} onTextChange={handleTextChange} />
          </h2>
          {servicesLayout === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {formData.services.map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className={editableTextClasses.serviceTitle}>
                    <EditableText initialText={service} fieldName={`service${index}`} className={editableTextClasses.serviceTitle} onTextChange={handleTextChange} />
                  </h3>
                  <p>
                    <EditableText initialText={`Description for ${service}`} fieldName={`serviceDescription${index}`} className={editableTextClasses.serviceDescription} onTextChange={handleTextChange} />
                  </p>
                </div>
              ))}
            </div>
          )}
          {servicesLayout === 'list' && (
            <div className="space-y-8">
              {formData.services.map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className={editableTextClasses.serviceTitle}>
                    <EditableText initialText={service} fieldName={`service${index}`} className={editableTextClasses.serviceTitle} onTextChange={handleTextChange} />
                  </h3>
                  <p>
                    <EditableText initialText={`Description for ${service}`} fieldName={`serviceDescription${index}`} className={editableTextClasses.serviceDescription} onTextChange={handleTextChange} />
                  </p>
                </div>
              ))}
            </div>
          )}
          {servicesLayout === 'carousel' && (
            <div className="flex overflow-x-auto space-x-6 pb-4">
              {formData.services.map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md min-w-[300px]">
                  <h3 className={editableTextClasses.serviceTitle}>
                    <EditableText initialText={service} fieldName={`service${index}`} className={editableTextClasses.serviceTitle} onTextChange={handleTextChange} />
                  </h3>
                  <p>
                    <EditableText initialText={`Description for ${service}`} fieldName={`serviceDescription${index}`} className={editableTextClasses.serviceDescription} onTextChange={handleTextChange} />
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
          <h2 className={editableTextClasses.sectionTitle}>
            <EditableText initialText="About Us" fieldName="aboutTitle" className={editableTextClasses.sectionTitle} onTextChange={handleTextChange} />
          </h2>
          {aboutLayout === 'single-column' && (
            <div className="max-w-2xl mx-auto">
              <p className={editableTextClasses.aboutParagraph}>
                <EditableText initialText={`${formData.companyName} has been providing top-notch pumping services since ${formData.yearEstablished}. ${formData.description}`} fieldName="aboutParagraph1" className={editableTextClasses.aboutParagraph} onTextChange={handleTextChange} />
              </p>
              <p className={editableTextClasses.aboutParagraph}>
                <EditableText initialText="We pride ourselves on our commitment to customer satisfaction, use of cutting-edge technology, and adherence to the highest industry standards." fieldName="aboutParagraph2" className={editableTextClasses.aboutParagraph} onTextChange={handleTextChange} />
              </p>
            </div>
          )}
          {aboutLayout === 'two-column' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className={editableTextClasses.aboutParagraph}>
                  <EditableText initialText={`${formData.companyName} has been providing top-notch pumping services since ${formData.yearEstablished}. ${formData.description}`} fieldName="aboutParagraph1" className={editableTextClasses.aboutParagraph} onTextChange={handleTextChange} />
                </p>
              </div>
              <div>
                <p className={editableTextClasses.aboutParagraph}>
                  <EditableText initialText="We pride ourselves on our commitment to customer satisfaction, use of cutting-edge technology, and adherence to the highest industry standards." fieldName="aboutParagraph2" className={editableTextClasses.aboutParagraph} onTextChange={handleTextChange} />
                </p>
              </div>
            </div>
          )}
          {aboutLayout === 'with-image' && (
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <p className={editableTextClasses.aboutParagraph}>
                  <EditableText initialText={`${formData.companyName} has been providing top-notch pumping services since ${formData.yearEstablished}. ${formData.description}`} fieldName="aboutParagraph1" className={editableTextClasses.aboutParagraph} onTextChange={handleTextChange} />
                </p>
                <p className={editableTextClasses.aboutParagraph}>
                  <EditableText initialText="We pride ourselves on our commitment to customer satisfaction, use of cutting-edge technology, and adherence to the highest industry standards." fieldName="aboutParagraph2" className={editableTextClasses.aboutParagraph} onTextChange={handleTextChange} />
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
          <h2 className={editableTextClasses.contactTitle}>
            <EditableText initialText="Contact Us" fieldName="contactTitle" className={editableTextClasses.contactTitle} onTextChange={handleTextChange} />
          </h2>
          {contactLayout === 'centered' && (
            <div className="max-w-md mx-auto">
              <p className={editableTextClasses.contactParagraph}>
                <EditableText initialText="Get in touch with us for all your pumping needs" fieldName="contactParagraph" className={editableTextClasses.contactParagraph} onTextChange={handleTextChange} />
              </p>
              <div className="space-y-4">
                <p>
                  <strong>Phone:</strong> <EditableText initialText={formData.telephoneNumber} fieldName="contactPhone" className={editableTextClasses.contactInfo} onTextChange={handleTextChange} />
                </p>
                <p>
                  <strong>Email:</strong> <EditableText initialText={`info@${formData.companyName.toLowerCase().replace(' ', '')}.com`} fieldName="contactEmail" className={editableTextClasses.contactInfo} onTextChange={handleTextChange} />
                </p>
                <p>
                  <strong>Address:</strong> <EditableText initialText={formData.address} fieldName="contactAddress" className={editableTextClasses.contactInfo} onTextChange={handleTextChange} />
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
                    <strong>Phone:</strong> <EditableText initialText={formData.telephoneNumber} fieldName="contactPhone" className={editableTextClasses.contactInfo} onTextChange={handleTextChange} />
                  </p>
                  <p>
                    <strong>Email:</strong> <EditableText initialText={`info@${formData.companyName.toLowerCase().replace(' ', '')}.com`} fieldName="contactEmail" className={editableTextClasses.contactInfo} onTextChange={handleTextChange} />
                  </p>
                  <p>
                    <strong>Address:</strong> <EditableText initialText={formData.address} fieldName="contactAddress" className={editableTextClasses.contactInfo} onTextChange={handleTextChange} />
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
              <p className={editableTextClasses.contactParagraph}>
                <EditableText initialText="Get in touch with us for all your pumping needs" fieldName="contactParagraph" className={editableTextClasses.contactParagraph} onTextChange={handleTextChange} />
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
          <EditableText initialText={`© ${new Date().getFullYear()} ${formData.companyName}. All rights reserved.`} fieldName="footerText" className={editableTextClasses.footerText} onTextChange={handleTextChange} />
        </div>
      </footer>
    </div>
  )
}

