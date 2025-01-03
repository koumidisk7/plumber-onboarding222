'use client'

import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import CompanyCard, { CompanyData } from './CompanyCard';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation'
interface DashBoardClientProps {
  mockUserData: CompanyData[];
}
export default async function DashBoardClient({mockUserData}:DashBoardClientProps) {

console.log(mockUserData)
const router = useRouter()
const createQueryString = (name, value) => {
  const params = new URLSearchParams();
  params.set(name, value);

  return params.toString();
};
  const handleEditDetails = (companyRegistrationNumber: string) => {
    // toast({
    //   title: "Edit Details",
    //   description: `Opening editor for company ${companyId}`,
    // });
    console.log('here!!'+companyRegistrationNumber)
    router.push(
       './onboarding'+ "?" + createQueryString("companyRegistrationNumber",companyRegistrationNumber)
      )
    //     redirect(`../onboarding?${companyRegistrationNumber}`);
  };

  const handleEditDesign = (companyId: string) => {
    // toast({
    //   title: "Edit Design",
    //   description: `Opening design editor for company ${companyId}`,
    // });
  };

  const handleAddCompany = () => {
    // toast({
    //   title: "Add Company",
    //   description: "Opening new company form",
    // });
  };



  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 
   
            className="text-3xl font-bold text-gray-900"
          >
            Your Companies
          </h1>
          <p 
          
            className="mt-1 text-gray-500"
          >
            Manage your company listings and their appearance
          </p>
        </div>
        
        <div

        >
          <Button
            onClick={handleAddCompany}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Company
          </Button>
        </div>
      </div>

      <div 
        className="space-y-6"

      >
        {mockUserData.map((company) => (
          <CompanyCard
            key={company.companyRegistrationNumber}
            company={company}
            onEditDetails={handleEditDetails}
            onEditDesign={handleEditDesign}
          />
        ))}
      </div>
    </div>
  </div>
  )
}

