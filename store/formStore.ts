import { create } from 'zustand'
import { Language } from '../utils/translations'

type OpeningHours = {
  [key: string]: { open: string; close: string } | null;
}

type FormData = {
  id: string;
  companyName: string;
  companyType: string;
  yearEstablished: string;
  description: string;
  logo?: string;
  services: string[];
  facebook: string;
  twitter: string;
  instagram: string;
  openingHours: OpeningHours;
  language: Language;
}

type FormStore = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  resetFormData: () => void;
}

const INITIAL_DATA: FormData = {
  id: '',
  companyName: '',
  companyType: '',
  yearEstablished: '',
  description: '',
  logo: undefined,
  services: [],
  facebook: '',
  twitter: '',
  instagram: '',
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
}))

