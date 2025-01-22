'use client'
import { create } from 'zustand'

import { useState, useCallback, useEffect } from 'react'
import { EditableText } from './editable-text'
import { LayoutSuggestions } from './layout-suggestions'
import { Button } from './ui/button'
import { ColorPicker } from './color-picker'
import { LogoUploader } from './logo-uploader'
import {  useFormStore } from '../store/formStore'
import { submitPlumberOnboarding } from '../app/actions'

import { useWebsiteStore } from '../store/useWebsiteStore'
import router from 'next/router'

import { heroLayouts, servicesLayouts, aboutLayouts, contactLayouts } from "../lib/layout-options"

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


export default function Home({companyData, resDesign}) {

  const {  updateFormData ,setAllFormData, formData} = useFormStore()


  useEffect(() => {
    
    console.log(companyData?.companyRegistrationNumber)

    if (companyData) {
        setAllFormData(companyData)
        console.log('set companyData.companyRegistrationNumber c')
        console.log(companyData.companyRegistrationNumber)
        console.log('set companyData.companyRegistrationNumber c2')
        console.log(formData.companyRegistrationNumber)

    } 
  }, [ companyData, updateFormData]);
  const websiteStore = useWebsiteStore()
  const handleStyleChange = useCallback(
    (fieldName: string, style: Partial<React.CSSProperties>) => {
      const setter = `set${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Style` as keyof typeof websiteStore
      console.log('typeof websiteStoresetter=>'+`set${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Style`)
      console.log(typeof websiteStore[setter] === "function")
      if (typeof websiteStore[setter] === "function") {
        ;(websiteStore[setter] as (style: React.CSSProperties) => void)(style)
      }
    },
    [websiteStore],
  )


  useEffect(() => {
    
    console.log('resDesign')
    console.log(resDesign)

    if (resDesign) {
      websiteStore.setWebsiteState(resDesign)
    } 
  }, [ resDesign]);  
  //resDesign=resDesign??websiteState
  const handleTextChange = useCallback((fieldName: string, text: string) => {
    updateFormData({ [fieldName]: text });
}, [updateFormData]);

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
                updateFormData({ logo: reader.result as string })
                websiteStore.setHeaderLogo(reader.result as string)
              };
              reader.readAsDataURL(file);
            }} />
            <EditableText
              initialText={formData.companyName || 'Company Name'}
              fieldName="companyName"
              className={websiteStore.companyNameStyle as string}
              onTextChange={handleTextChange}
              onStyleChange={handleStyleChange}
            />
          </div>
          <nav className="flex items-center space-x-4">
            <ul className="flex space-x-4">
              <li><EditableText initialText="Home" fieldName="navHome"
              className={websiteStore.navItemStyle as string}
              onTextChange={handleTextChange}
              onStyleChange={handleStyleChange}
           /></li>
              <li><EditableText initialText="Services" fieldName="navServices"
                  className={websiteStore.navItemStyle as string}
                  onTextChange={handleTextChange}
                  onStyleChange={handleStyleChange} /></li>
              <li><EditableText initialText="About" fieldName="navAbout" 
                  className={websiteStore.navItemStyle as string}
                  onTextChange={handleTextChange}
                  onStyleChange={handleStyleChange} /></li>
              <li><EditableText initialText="Contact" fieldName="navContact"
                    className={websiteStore.navItemStyle as string}
                    onTextChange={handleTextChange}
                    onStyleChange={handleStyleChange} /></li>
            </ul>
            <ColorPicker onChange={websiteStore.setHeaderTextColor} />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className={`py-20 bg-gray-100 relative ${
          websiteStore.heroLayout === "centered"
            ? "text-center"
            : websiteStore.heroLayout === "left-aligned"
              ? "text-left"
              : "flex items-center"
        }`}
      >
  <div className="container mx-auto px-4">
          {websiteStore.heroLayout === "with-image" ? (
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className={websiteStore.heroTitleStyle as string}>
                  <EditableText
                    initialText={formData.heroTitle}
                    fieldName="heroTitle"
                    className={websiteStore.heroTitleStyle as string}
                    onTextChange={handleTextChange}
                    onStyleChange={handleStyleChange}
                  />
                </h1>
                <p className={websiteStore.heroDescriptionStyle as string}>
                  <EditableText
                    initialText={formData.heroDescription}
                    fieldName="heroDescription"
                    className={websiteStore.heroDescriptionStyle as string}
                    onTextChange={handleTextChange}
                    onStyleChange={handleStyleChange}
                  />
                </p>
                <Button size="lg">
                  <EditableText
                    initialText={formData.heroButton}
                    fieldName="heroButton"
                    className={websiteStore.heroButtonStyle as string}
                    onTextChange={handleTextChange}
                    onStyleChange={handleStyleChange}
                  />
                </Button>
              </div>
              <div className="md:w-1/2">
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="Pumping Services"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            </div>
          ) : (
            <>
              <h1 className={websiteStore.heroTitleStyle as string}>
                <EditableText
                  initialText={formData.heroTitle}
                  fieldName="heroTitle"
                  className={websiteStore.heroTitleStyle as string}
                  onTextChange={handleTextChange}
                  onStyleChange={handleStyleChange}
                />
              </h1>
              <p className={websiteStore.heroDescriptionStyle as string}>
                <EditableText
                  initialText={formData.heroDescription}
                  fieldName="heroDescription"
                  className={websiteStore.heroDescriptionStyle as string}
                  onTextChange={handleTextChange}
                  onStyleChange={handleStyleChange}
                />
              </p>
              <Button size="lg">
                <EditableText
                  initialText={formData.heroButton}
                  fieldName="heroButton"
                  className={websiteStore.heroButtonStyle as string}
                  onTextChange={handleTextChange}
                  onStyleChange={handleStyleChange}
                />
              </Button>
            </>
          )}
        </div>
      </section>

      {/* Services Section */}
      
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className={websiteStore.servicesTitleStyle as string}>
            <EditableText
              initialText={formData.servicesTitle}
              fieldName="servicesTitle"
              className={websiteStore.sectionTitleStyle as string}
              onTextChange={handleTextChange}
              onStyleChange={handleStyleChange}
              specificStyleName='serviceTitle'

            />
          </h2>
          {websiteStore.servicesLayout === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {formData.services.map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className={websiteStore.serviceTitleStyle as string}>
                    <EditableText
                      initialText={service}
                      fieldName={`service${index}`}
                      className={websiteStore.serviceTitleStyle as string}
                      onTextChange={handleTextChange}
                      onStyleChange={handleStyleChange}
                      specificStyleName='serviceTitle'
                    />
                  </h3>
                  <p className={websiteStore.serviceDescriptionStyle as string}>
                    <EditableText
                      initialText={`Description for ${service}`}
                      fieldName={`serviceDescription${index}`}
                      className={websiteStore.serviceDescriptionStyle as string}
                      onTextChange={handleTextChange}
                      onStyleChange={handleStyleChange}
                      specificStyleName='serviceDescription'
                    />
                  </p>
                </div>
              ))}
            </div>
          )}
          {websiteStore.servicesLayout === "list" && (
            <div className="space-y-8">
              {formData.services.map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className={websiteStore.serviceTitleStyle as string}>
                    <EditableText
                      initialText={service}
                      fieldName={`service${index}`}
                      className={websiteStore.serviceTitleStyle as string}
                      onTextChange={handleTextChange}
                      onStyleChange={handleStyleChange}
                      specificStyleName='serviceTitle'
                    />
                  </h3>
                  <p className={websiteStore.serviceDescriptionStyle as string}>
                    <EditableText
                      initialText={`Description for ${service}`}
                      fieldName={`serviceDescription${index}`}
                      className={websiteStore.serviceDescriptionStyle as string}
                      onTextChange={handleTextChange}
                      onStyleChange={handleStyleChange}
                      specificStyleName='serviceDescription'
                    />
                  </p>
                </div>
              ))}
            </div>
          )}
          {websiteStore.servicesLayout === "carousel" && (
            <div className="flex overflow-x-auto space-x-6 pb-4">
              {formData.services.map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md min-w-[300px]">
                  <h3 className={websiteStore.serviceTitleStyle as string}>
                    <EditableText
                      initialText={service}
                      fieldName={`service${index}`}
                      className={websiteStore.serviceTitleStyle as string}
                      onTextChange={handleTextChange}
                      onStyleChange={handleStyleChange}
                      specificStyleName='serviceTitle'
                    />
                  </h3>
                  <p className={websiteStore.serviceDescriptionStyle as string}>
                    <EditableText
                      initialText={`Description for ${service}`}
                      fieldName={`serviceDescription${index}`}
                      className={websiteStore.serviceDescriptionStyle as string}
                      onTextChange={handleTextChange}
                      onStyleChange={handleStyleChange}
                      specificStyleName='serviceDescription'
                    />
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-100 relative">
        <div className="container mx-auto px-4">
          <h2 className={websiteStore.aboutTitleStyle as string}>
            <EditableText
              initialText="About Us"
              fieldName="aboutTitle"
              className={websiteStore.aboutTitleStyle as string}
              onTextChange={handleTextChange}
              onStyleChange={handleStyleChange}
            />
          </h2>
          {websiteStore.aboutLayout === "single-column" && (
            <div className="max-w-2xl mx-auto">
              <p className={websiteStore.aboutParagraphStyle as string}>
                <EditableText
                  initialText={formData.aboutParagraph1}
                  fieldName="aboutParagraph1"
                  className={websiteStore.aboutParagraphStyle as string}
                  onTextChange={handleTextChange}
                  onStyleChange={handleStyleChange}
                />
              </p>
              <p className={websiteStore.aboutParagraphStyle as string}>
                <EditableText
                  initialText={formData.aboutParagraph2}
                  fieldName="aboutParagraph2"
                  className={websiteStore.aboutParagraphStyle as string}
                  onTextChange={handleTextChange}
                  onStyleChange={handleStyleChange}
                />
              </p>
            </div>
          )}
          {websiteStore.aboutLayout === "two-column" && (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className={websiteStore.aboutParagraphStyle as string}>
                  <EditableText
                    initialText={formData.aboutParagraph1}
                    fieldName="aboutParagraph1"
                    className={websiteStore.aboutParagraphStyle as string}
                    onTextChange={handleTextChange}
                    onStyleChange={handleStyleChange}
                  />
                </p>
              </div>
              <div>
                <p className={websiteStore.aboutParagraphStyle as string}>
                  <EditableText
                    initialText={formData.aboutParagraph2}
                    fieldName="aboutParagraph2"
                    className={websiteStore.aboutParagraphStyle as string}
                    onTextChange={handleTextChange}
                    onStyleChange={handleStyleChange}
                  />
                </p>
              </div>
            </div>
          )}
          {websiteStore.aboutLayout === "with-image" && (
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <p className={websiteStore.aboutParagraphStyle as string}>
                  <EditableText
                    initialText={formData.aboutParagraph1}
                    fieldName="aboutParagraph1"
                    className={websiteStore.aboutParagraphStyle as string}
                    onTextChange={handleTextChange}
                    onStyleChange={handleStyleChange}
                  />
                </p>
                <p className={websiteStore.aboutParagraphStyle as string}>
                  <EditableText
                    initialText={formData.aboutParagraph2}
                    fieldName="aboutParagraph2"
                    className={websiteStore.aboutParagraphStyle as string}
                    onTextChange={handleTextChange}
                    onStyleChange={handleStyleChange}
                  />
                </p>
              </div>
              <div className="md:w-1/2">
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="About Our Company"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className={websiteStore.contactTitleStyle as string}>
            <EditableText
              initialText={formData.contactTitle}
              fieldName="contactTitle"
              className={websiteStore.contactTitleStyle as string}
              onTextChange={handleTextChange}
              onStyleChange={handleStyleChange}
            />
          </h2>
          {websiteStore.contactLayout === "centered" && (
            <div className="max-w-md mx-auto">
              <p className={websiteStore.contactParagraphStyle as string}>
                <EditableText
                  initialText={formData.contactParagraph}
                  fieldName="contactParagraph"
                  className={websiteStore.contactParagraphStyle as string}
                  onTextChange={handleTextChange}
                  onStyleChange={handleStyleChange}
                />
              </p>
              <div className="space-y-4">
                <p>
                  <strong>Phone:</strong>{" "}
                  <EditableText
                    initialText={formData.contactPhone}
                    fieldName="contactPhone"
                    className={websiteStore.contactInfoStyle as string}
                    onTextChange={handleTextChange}
                    onStyleChange={handleStyleChange}
                  />
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <EditableText
                    initialText={formData.contactEmail}
                    fieldName="contactEmail"
                    className={websiteStore.contactInfoStyle as string}
                    onTextChange={handleTextChange}
                    onStyleChange={handleStyleChange}
                  />
                </p>
                <p>
                  <strong>Address:</strong>{" "}
                  <EditableText
                    initialText={formData.contactAddress}
                    fieldName="contactAddress"
                    className={websiteStore.contactInfoStyle as string}
                    onTextChange={handleTextChange}
                    onStyleChange={handleStyleChange}
                  />
                </p>
              </div>
            </div>
          )}
          {websiteStore.contactLayout === "split" && (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <p>
                    <strong>Phone:</strong>{" "}
                    <EditableText
                      initialText={formData.contactPhone}
                      fieldName="contactPhone"
                      className={websiteStore.contactInfoStyle as string}
                      onTextChange={handleTextChange}
                      onStyleChange={handleStyleChange}
                    />
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    <EditableText
                      initialText={formData.contactEmail}
                      fieldName="contactEmail"
                      className={websiteStore.contactInfoStyle as string}
                      onTextChange={handleTextChange}
                      onStyleChange={handleStyleChange}
                    />
                  </p>
                  <p>
                    <strong>Address:</strong>{" "}
                    <EditableText
                      initialText={formData.contactAddress}
                      fieldName="contactAddress"
                      className={websiteStore.contactInfoStyle as string}
                      onTextChange={handleTextChange}
                      onStyleChange={handleStyleChange}
                    />
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
          {websiteStore.contactLayout === "full-width" && (
            <div className="max-w-2xl mx-auto">
              <p className={websiteStore.contactParagraphStyle as string}>
                <EditableText
                  initialText={formData.contactParagraph}
                  fieldName="contactParagraph"
                  className={websiteStore.contactParagraphStyle as string}
                  onTextChange={handleTextChange}
                  onStyleChange={handleStyleChange}
                />
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
            initialText={formData.footerText}
            fieldName="footerText"
            className={websiteStore.footerTextStyle as string}
            onTextChange={handleTextChange}
            onStyleChange={handleStyleChange}
          />
        </div>
      </footer>
    </div>
  )
}

