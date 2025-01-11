import { create } from 'zustand'
import { Language } from '../utils/translations'

type OpeningHours = {
  [key: string]: { open: string; close: string } | null;
}

export type FormData2 = {
  id: string;
  companyName: string;
  companyRegistrationNumber: string;
  yearEstablished: string;
  description: string;
  logo?: string;
  services: string[];
  facebook: string;
  twitter: string;
  instagram: string;
  telephoneNumber: string;
  hasViber: boolean;
  hasWhatsApp: boolean;
  address: string;
  openingHours: OpeningHours;
  language: Language;
}

type FormStore = {
  formData: FormData2;
  updateFormData: (data: Partial<FormData2>) => void;
  resetFormData: () => void;
  setAllFormData: (data: FormData2) => void;
}

export const  INITIAL_DATA: FormData2 = {
  id: '',
  companyName: '',
  companyRegistrationNumber: '',
  yearEstablished: '',
  description: '',
  logo: undefined,
  services: [],
  facebook: '',
  twitter: '',
  instagram: '',
  telephoneNumber: '',
  hasViber: false,
  hasWhatsApp: false,
  address: '',
  openingHours: {
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
  },
  language: 'en',
}

export const useFormStore = create<FormStore>((set) => ({
  formData: INITIAL_DATA,
  updateFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
  resetFormData: () => set({ formData: INITIAL_DATA }),
  setAllFormData: (data) => set({ formData: data }),
}))

