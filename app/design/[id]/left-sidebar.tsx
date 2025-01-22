"use client"

import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { useFormStore } from '../../../store/formStore'
import { useWebsiteStore, type SerializableWebsiteState } from "../../../store/useWebsiteStore"
import { submitDesignData } from '../../actions'
import { toast } from "../../../components/ui/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../components/ui/accordion"
import { ScrollArea } from "../../../components/ui/scroll-area"
import { LayoutSelector } from "../../../components/layout-selector"
import { heroLayouts, servicesLayouts, aboutLayouts, contactLayouts } from "../../../lib/layout-options"

export default function LeftSidebar() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { formData } = useFormStore()
  const {
    companyNameStyle,
  navItemStyle,
  heroTitleStyle,
  heroDescriptionStyle,
  heroButtonStyle,
  sectionTitleStyle,
  serviceTitleStyle,
  serviceDescriptionStyle,
  aboutParagraphStyle,
  contactTitleStyle,
  contactParagraphStyle,
  contactInfoStyle,
  footerTextStyle,
  heroLayout,
  servicesLayout,
  aboutLayout,
  contactLayout,
  headerTextColor,
  headerLogo,
  aboutTitleStyle,
  servicesTitleStyle,
  setHeroLayout,
  setServicesLayout,
  setAboutLayout,
  setContactLayout,
  } = useWebsiteStore()

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const serializableWebsiteState: SerializableWebsiteState = {

        companyNameStyle:companyNameStyle,
        navItemStyle:navItemStyle,
        heroTitleStyle:heroTitleStyle,
        heroDescriptionStyle:heroDescriptionStyle,
        heroButtonStyle:heroButtonStyle,
        sectionTitleStyle:sectionTitleStyle,
        serviceTitleStyle:serviceTitleStyle,
        serviceDescriptionStyle:serviceDescriptionStyle,
        aboutParagraphStyle:aboutParagraphStyle,
        contactTitleStyle:contactTitleStyle,
        contactParagraphStyle:contactParagraphStyle,
        contactInfoStyle:contactInfoStyle,
        footerTextStyle:footerTextStyle,
        heroLayout: heroLayout,
        servicesLayout: servicesLayout,
        aboutLayout: aboutLayout,
        contactLayout: contactLayout,
        headerTextColor: headerTextColor,
        headerLogo: headerLogo,
        aboutTitleStyle:aboutTitleStyle,
        servicesTitleStyle:servicesTitleStyle
      }
      const result = await submitDesignData(formData, serializableWebsiteState,formData.companyRegistrationNumber)
      if (result.success) {
        toast({
          title: "Success",
          description: "Your changes have been saved.",
        })
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error("Error saving data:", error)
      toast({
        title: "Error",
        description: "There was a problem saving your changes. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const pageSections = [
    { title: "Header", description: "Edit company name, logo, and navigation" },
    { title: "Hero", description: "Modify hero title, description, and button" },
    { title: "Services", description: "Update services list and descriptions" },
    { title: "About", description: "Edit about section content" },
    { title: "Contact", description: "Modify contact information and form" },
    { title: "Footer", description: "Update footer text and links" },
  ]

  return (
    <div className="w-64 bg-gray-100 border-r border-gray-200 h-[calc(100vh-64px)] flex flex-col sticky top-16">      <div className="p-4 border-b border-gray-200">
        <h1 className="text-lg font-semibold">Website Editor</h1>
      </div>
      <ScrollArea className="flex-grow overflow-y-auto">
        <div className="p-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="instructions">
              <AccordionTrigger>How to Edit</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-4 space-y-2 text-sm">
                  <li>Click on any text to edit it directly</li>
                  <li>Use the layout buttons to change section layouts</li>
                  <li>Upload a new logo in the header section</li>
                  <li>Modify colors using the color picker</li>
                  <li>Add or remove services in the Services section</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="sections">
              <AccordionTrigger>Page Sections</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Header</h3>
                    <p className="text-sm text-gray-600 mb-2">Edit company name, logo, and navigation</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Hero</h3>
                    <p className="text-sm text-gray-600 mb-2">Modify hero title, description, and button</p>
                    <LayoutSelector
                      sectionName="Hero"
                      currentLayout={heroLayout}
                      layouts={heroLayouts}
                      onSelectLayout={setHeroLayout}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Services</h3>
                    <p className="text-sm text-gray-600 mb-2">Update services list and descriptions</p>
                    <LayoutSelector
                      sectionName="Services"
                      currentLayout={servicesLayout}
                      layouts={servicesLayouts}
                      onSelectLayout={setServicesLayout}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">About</h3>
                    <p className="text-sm text-gray-600 mb-2">Edit about section content</p>
                    <LayoutSelector
                      sectionName="About"
                      currentLayout={aboutLayout}
                      layouts={aboutLayouts}
                      onSelectLayout={setAboutLayout}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Contact</h3>
                    <p className="text-sm text-gray-600 mb-2">Modify contact information and form</p>
                    <LayoutSelector
                      sectionName="Contact"
                      currentLayout={contactLayout}
                      layouts={contactLayouts}
                      onSelectLayout={setContactLayout}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Footer</h3>
                    <p className="text-sm text-gray-600 mb-2">Update footer text and links</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-gray-200">
        <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full bg-primary text-white">
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}

