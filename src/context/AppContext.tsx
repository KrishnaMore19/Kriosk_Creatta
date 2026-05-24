"use client";
import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
export interface Project {
  id: number;
  title: string;
  category: string;
  tags: string[];
  thumbnail: string;
  description: string;
  year: string;
}

export interface MediaItem {
  id: number;
  type: "video" | "image";
  title: string;
  desc: string;
  url: string;
  span: string;
}

interface AppState {
  isNavOpen: boolean;
  activeSection: string;
  selectedProject: Project | null;
  isProjectModalOpen: boolean;
  projects: Project[];
  galleryItems: MediaItem[];
}

interface AppContextValue extends AppState {
  setNavOpen: (open: boolean) => void;
  setActiveSection: (section: string) => void;
  openProjectModal: (project: Project) => void;
  closeProjectModal: () => void;
}

// ── Default Data ───────────────────────────────────────────────────────────
const DEFAULT_PROJECTS: Project[] = [
  { id: 1, title: "Rang Decor", category: "Branding", tags: ["Advertising", "Brand Identity", "Digital"], thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", description: "Complete brand identity and advertising campaign for Rang Decor, a premium home décor brand.", year: "2023" },
  { id: 2, title: "Maitri Nest", category: "Branding", tags: ["Advertising", "Brand Identity"], thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80", description: "Luxury real estate branding for Maitri Nest — 3 BHK villa project in Ahmedabad.", year: "2023" },
  { id: 3, title: "Levin Pro", category: "Graphic Design", tags: ["Logo", "Print", "Packaging"], thumbnail: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80", description: "Professional brand system and packaging design for Levin Pro.", year: "2022" },
  { id: 4, title: "Milkman", category: "Digital Marketing", tags: ["Social Media", "Content", "Digital"], thumbnail: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&q=80", description: "End-to-end digital marketing campaign for a dairy startup.", year: "2023" },
  { id: 5, title: "Smash Studios", category: "Web Development", tags: ["Website", "UI/UX", "Development"], thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", description: "Custom website design and development for Smash Studios.", year: "2024" },
  { id: 6, title: "Euromatt", category: "Branding", tags: ["Brand Identity", "Print"], thumbnail: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80", description: "Corporate brand identity for Euromatt, a flooring solutions company.", year: "2022" },
  { id: 7, title: "Galaxy Group", category: "Graphic Design", tags: ["Advertising", "OOH", "Print"], thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80", description: "Large-scale advertising and OOH campaign for Galaxy Group.", year: "2023" },
  { id: 8, title: "Samrat Exports", category: "Branding", tags: ["Brand Identity", "Packaging"], thumbnail: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80", description: "Export-grade packaging and brand identity for Samrat Exports.", year: "2021" },
  { id: 9, title: "Airolam", category: "Digital Marketing", tags: ["Social Media", "Video", "Content"], thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", description: "Social media and video content strategy for Airolam.", year: "2023" },
  { id: 10, title: "Bellano", category: "Branding", tags: ["Brand Identity", "Packaging", "Digital"], thumbnail: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80", description: "Premium fashion brand identity and digital presence for Bellano.", year: "2024" },
  { id: 11, title: "Decora Interiors", category: "Graphic Design", tags: ["Brochure", "Print", "Advertising"], thumbnail: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80", description: "Luxury interior design company brochure and advertising collateral.", year: "2022" },
  { id: 12, title: "Zorby Tech", category: "Web Development", tags: ["Website", "UI/UX", "App"], thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80", description: "Modern website and mobile app UI for Zorby Tech.", year: "2024" },
  { id: 13, title: "Noble Realty", category: "Branding", tags: ["Brand Identity", "Advertising"], thumbnail: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80", description: "Complete real estate brand identity and advertising campaign.", year: "2023" },
  { id: 14, title: "Poppins Bakery", category: "Branding", tags: ["Logo", "Packaging", "Social Media"], thumbnail: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80", description: "Playful bakery brand with packaging design and social media presence.", year: "2023" },
  { id: 15, title: "Indus Seeds", category: "Graphic Design", tags: ["Packaging", "Print", "Brand"], thumbnail: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80", description: "Agricultural brand packaging and identity for Indus Seeds.", year: "2022" },
  { id: 16, title: "Skylam", category: "Digital Marketing", tags: ["Social Media", "Content", "SEO"], thumbnail: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80", description: "Digital marketing and SEO strategy for Skylam.", year: "2024" },
  { id: 17, title: "Aditya Group", category: "Branding", tags: ["Corporate Identity", "Print"], thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80", description: "Corporate identity system for Aditya Group.", year: "2021" },
  { id: 18, title: "Hirshita", category: "Graphic Design", tags: ["Advertising", "Social Media"], thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", description: "Creative advertising and social media design for Hirshita.", year: "2023" },
  { id: 19, title: "Chat Chauraha", category: "Branding", tags: ["Logo", "Menu Design", "Packaging"], thumbnail: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", description: "Restaurant branding with logo, menu design, and packaging.", year: "2022" },
  { id: 20, title: "Surfica", category: "Web Development", tags: ["Website", "E-commerce", "UI/UX"], thumbnail: "https://images.unsplash.com/photo-1533854775446-95c4609da544?w=800&q=80", description: "Surf lifestyle e-commerce website design and development.", year: "2024" },
  { id: 21, title: "AeroJet", category: "Branding", tags: ["Corporate Identity", "Print", "Digital"], thumbnail: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80", description: "Aviation brand identity and corporate communications.", year: "2023" },
  { id: 22, title: "Durian Furniture", category: "Digital Marketing", tags: ["Social Media", "Video", "Ads"], thumbnail: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80", description: "Furniture brand digital marketing with video ads and social campaigns.", year: "2024" },
  { id: 23, title: "Golden Enclave", category: "Branding", tags: ["Real Estate", "Advertising", "Digital"], thumbnail: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80", description: "Premium real estate project branding for Golden Enclave.", year: "2023" },
  { id: 24, title: "Eurolam", category: "Graphic Design", tags: ["Catalogue", "Print", "Branding"], thumbnail: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80", description: "Product catalogue design and brand collateral for Eurolam.", year: "2022" },
];

const DEFAULT_GALLERY_ITEMS: MediaItem[] = [
  { id: 1, type: "video", title: "Brand Storytelling", desc: "Bringing brands to life through motion", url: "https://cdn.pixabay.com/video/2024/07/24/222837_large.mp4", span: "md:col-span-2 md:row-span-3 sm:col-span-2 sm:row-span-2" },
  { id: 2, type: "video", title: "Visual Identity", desc: "Crafting identities that resonate", url: "https://cdn.pixabay.com/video/2020/07/30/46026-447087782_large.mp4", span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2" },
  { id: 3, type: "video", title: "Digital Campaigns", desc: "Reaching audiences that matter", url: "https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4", span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2" },
  { id: 4, type: "video", title: "Product Design", desc: "Packaging that tells your story", url: "https://cdn.pixabay.com/video/2024/07/24/222837_large.mp4", span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2" },
  { id: 5, type: "video", title: "Motion Graphics", desc: "Animation that captivates", url: "https://cdn.pixabay.com/video/2020/07/30/46026-447087782_large.mp4", span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2" },
  { id: 6, type: "video", title: "Web Experiences", desc: "Digital spaces built to impress", url: "https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4", span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2" },
];

// ── Context ────────────────────────────────────────────────────────────────
const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const setNavOpen = useCallback((open: boolean) => setIsNavOpen(open), []);

  const openProjectModal = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeProjectModal = useCallback(() => {
    setIsProjectModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = "";
  }, []);

  return (
    <AppContext.Provider
      value={{
        isNavOpen,
        activeSection,
        selectedProject,
        isProjectModalOpen,
        projects: DEFAULT_PROJECTS,
        galleryItems: DEFAULT_GALLERY_ITEMS,
        setNavOpen,
        setActiveSection,
        openProjectModal,
        closeProjectModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
