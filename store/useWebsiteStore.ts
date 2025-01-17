import { create } from 'zustand'

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

export const useWebsiteStore = create<WebsiteState>((set) => ({
  editableTextClasses: {
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
  },
  heroLayout: 'centered',
  servicesLayout: 'grid',
  aboutLayout: 'single-column',
  contactLayout: 'centered',
  headerTextColor: '#ffffff',
  headerLogo: null,
  setHeroLayout: (layout) => set({ heroLayout: layout }),
  setServicesLayout: (layout) => set({ servicesLayout: layout }),
  setAboutLayout: (layout) => set({ aboutLayout: layout }),
  setContactLayout: (layout) => set({ contactLayout: layout }),
  setHeaderTextColor: (color) => set({ headerTextColor: color }),
  setHeaderLogo: (logo) => set({ headerLogo: logo }),
}))

