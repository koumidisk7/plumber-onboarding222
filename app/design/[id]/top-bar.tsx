'use client'

import { Button } from "../../../components/ui/button"
import { useFormStore } from '../../../store/formStore'
import { useWebsiteStore, SerializableWebsiteState } from '../../../store/useWebsiteStore'
import { submitDesignData } from '../../actions'
import { useEffect, useState } from 'react'
import { toast } from "../../../components/ui/use-toast"

export default function TopBar() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const websiteState = useWebsiteStore()

 const { formData } = useFormStore()
  
 
   useEffect(() => {
     
     console.log(formData)
 
  
   }, [ formData]);
   
  const handleSubmit = async () => {
    setIsSubmitting(true)
    console.log('formData.companyRegistrationNumber00');
    console.log(formData.companyRegistrationNumber);
    try {
        const serializableWebsiteState: SerializableWebsiteState = {
            editableTextClasses: websiteState.editableTextClasses,
            heroLayout: websiteState.heroLayout,
            servicesLayout: websiteState.servicesLayout,
            aboutLayout: websiteState.aboutLayout,
            contactLayout: websiteState.contactLayout,
            headerTextColor: websiteState.headerTextColor,
            headerLogo: websiteState.headerLogo,
          }
          
    console.log('formData.companyRegistrationNumber11');
    console.log(formData.companyRegistrationNumber);
      const result = await submitDesignData(formData,serializableWebsiteState,formData.companyRegistrationNumber)
      if (result.success) {
        toast({
          title: "Success",
          description: "Your changes have been saved.",
        })
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error('Error saving form data:', error)
      toast({
        title: "Error",
        description: "There was a problem saving your changes. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Website Editor</h1>
      <Button 
        onClick={handleSubmit} 
        disabled={isSubmitting}
        className="bg-primary text-white"
      >
        {isSubmitting ? 'Saving...' : 'Save Changes'}
      </Button>
    </div>
  )
}

