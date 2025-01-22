import { create } from "zustand"

type LayoutType =
  | "centered"
  | "left-aligned"
  | "with-image"
  | "grid"
  | "list"
  | "carousel"
  | "single-column"
  | "two-column"
  | "split"
  | "full-width"

export interface SerializableWebsiteState {
  companyNameStyle: React.CSSProperties
  navItemStyle: React.CSSProperties
  heroTitleStyle: React.CSSProperties
  heroDescriptionStyle: React.CSSProperties
  heroButtonStyle: React.CSSProperties
  sectionTitleStyle: React.CSSProperties
  servicesTitleStyle: React.CSSProperties
  aboutTitleStyle: React.CSSProperties
  serviceTitleStyle: React.CSSProperties
  serviceDescriptionStyle: React.CSSProperties
  aboutParagraphStyle: React.CSSProperties
  contactTitleStyle: React.CSSProperties
  contactParagraphStyle: React.CSSProperties
  contactInfoStyle: React.CSSProperties
  footerTextStyle: React.CSSProperties
  heroLayout: LayoutType
  servicesLayout: LayoutType
  aboutLayout: LayoutType
  contactLayout: LayoutType
  headerTextColor: string
  headerLogo: string | null
}

interface WebsiteState extends SerializableWebsiteState {
  setCompanyNameStyle: (style: React.CSSProperties) => void
  setNavItemStyle: (style: React.CSSProperties) => void
  setHeroTitleStyle: (style: React.CSSProperties) => void
  setHeroDescriptionStyle: (style: React.CSSProperties) => void
  setHeroButtonStyle: (style: React.CSSProperties) => void
  setSectionTitleStyle: (style: React.CSSProperties) => void
  setServiceTitleStyle: (style: React.CSSProperties) => void
  setServiceDescriptionStyle: (style: React.CSSProperties) => void
  setAboutParagraphStyle: (style: React.CSSProperties) => void
  setServicesTitleStyle: (style: React.CSSProperties) => void
  setAboutTitleStyle: (style: React.CSSProperties) => void
  setContactTitleStyle: (style: React.CSSProperties) => void
  setContactParagraphStyle: (style: React.CSSProperties) => void
  setContactInfoStyle: (style: React.CSSProperties) => void
  setFooterTextStyle: (style: React.CSSProperties) => void
  setHeroLayout: (layout: LayoutType) => void
  setServicesLayout: (layout: LayoutType) => void
  setAboutLayout: (layout: LayoutType) => void
  setContactLayout: (layout: LayoutType) => void
  setHeaderTextColor: (color: string) => void
  setHeaderLogo: (logo: string | null) => void
  updateWebsiteState: (data: Partial<SerializableWebsiteState>) => void
  resetWebsiteState: () => void
  setWebsiteState: (state: SerializableWebsiteState) => void
}

export const INITIAL_WEBSITE_STATE: SerializableWebsiteState = {
  companyNameStyle: { fontSize: "1.5rem", fontWeight: "bold" },
  navItemStyle: { fontSize: "0.875rem" },
  heroTitleStyle: { fontSize: "2.25rem", fontWeight: "bold", marginBottom: "1rem" },
  heroDescriptionStyle: { fontSize: "1.125rem", marginBottom: "2rem" },
  heroButtonStyle: { color: "white" },
  sectionTitleStyle: { fontSize: "1.875rem", fontWeight: "bold", marginBottom: "2rem", textAlign: "center" },
  servicesTitleStyle: { fontSize: "1.875rem", fontWeight: "bold", marginBottom: "2rem", textAlign: "center" },
  aboutTitleStyle: { fontSize: "1.875rem", fontWeight: "bold", marginBottom: "2rem", textAlign: "center" },
  serviceTitleStyle: { fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" },
  serviceDescriptionStyle: { fontSize: "1rem" },
  aboutParagraphStyle: { fontSize: "1.125rem", marginBottom: "1rem" },
  contactTitleStyle: { fontSize: "1.875rem", fontWeight: "bold", marginBottom: "2rem", textAlign: "center" },
  contactParagraphStyle: { textAlign: "center", marginBottom: "1rem" },
  contactInfoStyle: { fontSize: "1rem" },
  footerTextStyle: { fontSize: "0.875rem" },
  heroLayout: "centered",
  servicesLayout: "grid",
  aboutLayout: "single-column",
  contactLayout: "centered",
  headerTextColor: "#ffffff",
  headerLogo: null,
}

export const useWebsiteStore = create<WebsiteState>((set) => ({
  ...INITIAL_WEBSITE_STATE,
  setCompanyNameStyle: (style) => set((state) => ({ companyNameStyle: { ...state.companyNameStyle, ...style } })),
  setNavItemStyle: (style) => set((state) => ({ navItemStyle: { ...state.navItemStyle, ...style } })),
  setHeroTitleStyle: (style) => set((state) => ({ heroTitleStyle: { ...state.heroTitleStyle, ...style } })),
  setHeroDescriptionStyle: (style) =>
    set((state) => ({ heroDescriptionStyle: { ...state.heroDescriptionStyle, ...style } })),
  setHeroButtonStyle: (style) => set((state) => ({ heroButtonStyle: { ...state.heroButtonStyle, ...style } })),
  setSectionTitleStyle: (style) => set((state) => ({ sectionTitleStyle: { ...state.sectionTitleStyle, ...style } })),
  setServiceTitleStyle: (style) => set((state) => ({ serviceTitleStyle: { ...state.serviceTitleStyle, ...style } })),
  setServiceDescriptionStyle: (style) =>
    set((state) => ({ serviceDescriptionStyle: { ...state.serviceDescriptionStyle, ...style } })),
  setAboutParagraphStyle: (style) =>
    set((state) => ({ aboutParagraphStyle: { ...state.aboutParagraphStyle, ...style } })),
  setContactTitleStyle: (style) => set((state) => ({ contactTitleStyle: { ...state.contactTitleStyle, ...style } })),
  setContactParagraphStyle: (style) =>
    set((state) => ({ contactParagraphStyle: { ...state.contactParagraphStyle, ...style } })),
  setContactInfoStyle: (style) => set((state) => ({ contactInfoStyle: { ...state.contactInfoStyle, ...style } })),
  setFooterTextStyle: (style) => set((state) => ({ footerTextStyle: { ...state.footerTextStyle, ...style } })),
  setHeroLayout: (layout) => set({ heroLayout: layout }),
  setServicesLayout: (layout) => set({ servicesLayout: layout }),
  setServicesTitleStyle: (style) =>
    set((state) => ({ servicesTitleStyle: { ...state.servicesTitleStyle, ...style } })),
  setAboutTitleStyle: (style) =>
    set((state) => ({ aboutTitleStyle: { ...state.aboutTitleStyle, ...style } })),
  setAboutLayout: (layout) => set({ aboutLayout: layout }),
  setContactLayout: (layout) => set({ contactLayout: layout }),
  setHeaderTextColor: (color) => set({ headerTextColor: color }),
  setHeaderLogo: (logo) => set({ headerLogo: logo }),
  updateWebsiteState: (data) => set((state) => ({ ...state, ...data })),
  resetWebsiteState: () => set(INITIAL_WEBSITE_STATE),
  setWebsiteState: (state) => set(state),
}))

