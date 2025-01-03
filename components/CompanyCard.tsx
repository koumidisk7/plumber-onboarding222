import React from 'react';
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { motion } from "framer-motion";
import { Edit, Palette } from "lucide-react";
import { Language } from '../utils/translations';

interface OpeningHours {
  open: string;
  close: string;
}

export interface CompanyData {

  id: string;
  companyName: string;
  companyRegistrationNumber: string;
  yearEstablished: string;
  description: string;
  logo: string;
  services: string[];
  facebook: string;
  twitter: string;
  instagram: string;
  telephoneNumber: string;
  hasViber: boolean;
  hasWhatsApp: boolean;
  address: string;
  openingHours: {
    [key: string]: { open: string; close: string } | null;
  };
  language: Language;
}

interface CompanyCardProps {
  company: CompanyData;
  onEditDetails: (companyId: string) => void;
  onEditDesign: (companyId: string) => void;
}

const CompanyCard = ({ company, onEditDetails, onEditDesign }: CompanyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="p-6 backdrop-blur-sm bg-white/90 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            {company.logo && (
              <img 
                src={company.logo} 
                alt={`${company.companyName} logo`} 
                className="w-16 h-16 object-cover rounded-lg"
              />
            )}
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{company.companyName}</h3>
              <p className="text-sm text-gray-500">{company.companyRegistrationNumber} · Est. {company.yearEstablished}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEditDetails(company.companyRegistrationNumber)}
              className="flex items-center gap-2 hover:bg-gray-100 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit Details
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEditDesign(company.companyRegistrationNumber)}
              className="flex items-center gap-2 hover:bg-gray-100 transition-colors"
            >
              <Palette className="w-4 h-4" />
              Edit Design
            </Button>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4 line-clamp-2">{company.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {company.services.map((service, index) => (
            <span 
              key={index}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
            >
              {service}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Opening Hours</h4>
            <div className="space-y-1">
              {Object.entries(company.openingHours).map(([day, hours]) => (
                <p key={day} className="text-sm text-gray-600">
                  <span className="font-medium">{day}:</span>{' '}
                  {hours ? `${hours.open} - ${hours.close}` : 'Closed'}
                </p>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Social Media</h4>
            <div className="space-y-1">
              {company.facebook && (
                <p className="text-sm text-gray-600">Facebook: {company.facebook}</p>
              )}
              {company.twitter && (
                <p className="text-sm text-gray-600">Twitter: {company.twitter}</p>
              )}
              {company.instagram && (
                <p className="text-sm text-gray-600">Instagram: {company.instagram}</p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default CompanyCard;