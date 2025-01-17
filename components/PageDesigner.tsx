'use client'
import { create } from 'zustand'

import { useState, useCallback } from 'react'
import { EditableText } from './editable-text'
import { LayoutSuggestions } from './layout-suggestions'
import { Button } from './ui/button'
import { ColorPicker } from './color-picker'
import { LogoUploader } from './logo-uploader'
import { FormData2, useFormStore } from '../store/formStore'
import { submitPlumberOnboarding } from '../app/actions'

import { useWebsiteStore } from '../store/useWebsiteStore'
import router from 'next/router'


type LayoutType = 'centered' | 'left-aligned' | 'with-image' | 'grid' | 'list' | 'carousel' | 'single-column' | 'two-column' | 'split' | 'full-width'

interface WebsiteState {
  editableTextClasses: {
    [key: string]: string
  }
  heroLayout: LayoutType
  servicesLayout: LayoutType
  aboutLayout: LayoutType
  contactLayout: LayoutType
  headerTextColor: string
  headerLogo: File | null
  setHeroLayout: (layout: LayoutType) => void
  setServicesLayout: (layout: LayoutType) => void
  setAboutLayout: (layout: LayoutType) => void
  setContactLayout: (layout: LayoutType) => void
  setHeaderTextColor: (color: string) => void
  setHeaderLogo: (logo: File | null) => void
}

interface PageDesignerProps {
    formData: FormData2;
  }
export default function Home({formData}:PageDesignerProps) {

  const {  updateFormData } = useFormStore()
  const {
    editableTextClasses,
    heroLayout,
    servicesLayout,
    aboutLayout,
    contactLayout,
    headerTextColor,
    headerLogo,
    setHeroLayout,
    setServicesLayout,
    setAboutLayout,
    setContactLayout,
    setHeaderTextColor,
    setHeaderLogo,
  } = useWebsiteStore()
  const handleTextChange = useCallback((fieldName: string, text: string) => {
    updateFormData({ [fieldName]: text });
}, [updateFormData]);

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
              const reader = new FileReader();
              reader.onloadend = () => {
                updateFormData({ logo: reader.result as string });
                setHeaderLogo(file);
              };
              reader.readAsDataURL(file);
            }} />
            <EditableText
              initialText={formData.companyName || 'Company Name'}
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
                  <EditableText initialText={formData.companyName || 'Company Name'} fieldName="heroTitle" className={editableTextClasses.heroTitle} onTextChange={handleTextChange} />
                </h1>
                <p className={editableTextClasses.heroDescription}>
                  <EditableText initialText={formData.description || 'Company Description'} fieldName="heroDescription" className={editableTextClasses.heroDescription} onTextChange={handleTextChange} />
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
                <EditableText initialText={formData.companyName || 'Company Name'} fieldName="heroTitle" className={editableTextClasses.heroTitle} onTextChange={handleTextChange} />
              </h1>
              <p className={editableTextClasses.heroDescription}>
                <EditableText initialText={formData.description || 'Company Description'} fieldName="heroDescription" className={editableTextClasses.heroDescription} onTextChange={handleTextChange} />
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
              {(formData.services || []).map((service, index) => (
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
              {(formData.services || []).map((service, index) => (
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
              {(formData.services || []).map((service, index) => (
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
                <EditableText initialText={`${formData.companyName || 'Company Name'} has been providing top-notch pumping services since ${formData.yearEstablished || 'Year'}. ${formData.description || 'Company Description'}`} fieldName="aboutParagraph1" className={editableTextClasses.aboutParagraph} onTextChange={handleTextChange} />
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
                  <EditableText initialText={`${formData.companyName || 'Company Name'} has been providing top-notch pumping services since ${formData.yearEstablished || 'Year'}. ${formData.description || 'Company Description'}`} fieldName="aboutParagraph1" className={editableTextClasses.aboutParagraph} onTextChange={handleTextChange} />
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
                  <EditableText initialText={`${formData.companyName || 'Company Name'} has been providing top-notch pumping services since ${formData.yearEstablished || 'Year'}. ${formData.description || 'Company Description'}`} fieldName="aboutParagraph1" className={editableTextClasses.aboutParagraph} onTextChange={handleTextChange} />
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
                  <strong>Phone:</strong> <EditableText initialText={formData.telephoneNumber || 'Phone Number'} fieldName="contactPhone" className={editableTextClasses.contactInfo} onTextChange={handleTextChange} />
                </p>
                <p>
                  <strong>Email:</strong> <EditableText initialText={`info@${(formData.companyName || 'Company Name').toLowerCase().replace(' ', '')}.com`} fieldName="contactEmail" className={editableTextClasses.contactInfo} onTextChange={handleTextChange} />
                </p>
                <p>
                  <strong>Address:</strong> <EditableText initialText={formData.address || 'Company Address'} fieldName="contactAddress" className={editableTextClasses.contactInfo} onTextChange={handleTextChange} />
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
                    <strong>Phone:</strong> <EditableText initialText={formData.telephoneNumber || 'Phone Number'} fieldName="contactPhone" className={editableTextClasses.contactInfo} onTextChange={handleTextChange} />
                  </p>
                  <p>
                    <strong>Email:</strong> <EditableText initialText={`info@${(formData.companyName || 'Company Name').toLowerCase().replace(' ', '')}.com`} fieldName="contactEmail" className={editableTextClasses.contactInfo} onTextChange={handleTextChange} />
                  </p>
                  <p>
                    <strong>Address:</strong> <EditableText initialText={formData.address || 'Company Address'} fieldName="contactAddress" className={editableTextClasses.contactInfo} onTextChange={handleTextChange} />
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
          <EditableText 
            initialText={`© ${new Date().getFullYear()} ${formData.companyName || 'Company Name'}. All rights reserved.`} 
            fieldName="footerText" 
            className={editableTextClasses.footerText} 
            onTextChange={handleTextChange} 
          />
        </div>
      </footer>
    </div>
  )
}

