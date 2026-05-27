// ─── Global Projects Data ─────────────────────────────────────────────────────

export interface ProjectSection {
  title: string;
  items: string[];
  images: [string, string, string];
  description: string;
}

export interface KrioskProject {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  thumbnail: string;
  year: string;
  category: string;
  tags: string[];
  sections: {
    advertising?: ProjectSection;
    brandIdentity?: ProjectSection;
    digital?: ProjectSection;
  };
  nextProject?: string;
}

export const KRIOSK_PROJECTS: KrioskProject[] = [
  // ── 1. Rang Decor ───────────────────────────────────────────────────────────
  {
    id: "rang-decor",
    slug: "rang-decor",
    title: "Rang Decor",
    tagline: "A shade for everyone",
    description:
      "As the brand name suggests, is highly inclined towards magic of colors. Rang is one of the finest companies in Gujarat. Kriosk has always meet clients expectations and has provided creative catalogue designs, attractive packaging designs and a path was constructed to digital marketing and internet presence.",
    thumbnail: `/rang-decor/rang.jpg`,
    year: "2023",
    category: "Branding",
    tags: ["Advertising", "Brand Identity", "Digital"],
    sections: {
      advertising: {
        title: "Advertising",
        items: ["Catalogue Design"],
        images: [
          `/rang-decor/11.jpeg`,
          `/rang-decor/12.png`,
          `/rang-decor/13.png`,
        ],
        description: "Catalogue Design",
      },
      brandIdentity: {
        title: "Brand Identity",
        items: ["Brand Logo", "Brand Association", "Brand Awareness"],
        images: [
          `/rang-decor/14.png`,
          `/rang-decor/15.png`,
          `/rang-decor/16.png`,
        ],
        description: "Brand Logo | Brand Association | Brand Awarness",
      },
      digital: {
        title: "Digital",
        items: ["Social Media", "Website Development"],
        images: [
          `/rang-decor/12.png`,
          `/rang-decor/16.png`,
          `/rang-decor/14.png`,
        ],
        description: "Social Media | Website Development",
      },
    },
    nextProject: "Signaturelam",
  },

  // ── 2. Signaturelam ─────────────────────────────────────────────────────────
  {
    id: "Signaturelam",
    slug: "signaturelam",
    title: "Signaturelam",
    tagline: "A sanctuary of your dreams",
    description:
      "Galaxy Mica is a company that has evolved with time, kriosk has helped them from entering the world of digital marketing to outdoor advertising. The website content is built with a vision to create a methodological conversation between the audience and the brand. We have helped them enliven the brand's message loud and clear.",
    thumbnail: `/signature1.jpeg`,
    year: "2023",
    category: "Branding",
    tags: ["Advertising", "Brand Identity"],
    sections: {
      advertising: {
        title: "Advertising",
        items: ["Social Media Posts", "Festival Creatives"],
        images: [
          `/signature1.jpeg`,
          `/signature2.jpeg`,
          `/signature3.jpeg`,
        ],
        description: "Social Media Posts | Festival Creatives",
      },
      brandIdentity: {
        title: "Brand Identity",
        items: ["Brand Logo", "Brand Association", "Brand Awareness"],
        images: [
          `/signature3.jpeg`,
          `/signature1.jpeg`,
          `/signature2.jpeg`,
        ],
        description: "Brand Logo | Brand Association | Brand Awarness",
      },
      digital: {
        title: "Digital",
        items: ["Social Media", "Instagram Content"],
        images: [
          `/signature2.jpeg`,
          `/signature1.jpeg`,
          `/signature3.jpeg`,
        ],
        description: "Social Media | Instagram Content",
      },
    },
    nextProject: "levin-decor",
  },

  // ── 3. Levin Decor ──────────────────────────────────────────────────────────
  {
    id: "levin-decor",
    slug: "levin-decor",
    title: "Levin Decor",
    tagline: "Elegance in every detail",
    description:
      "Levin Decor is one of the oldest laminate companies in the market that has a business experience of mighty tree , levin's brand strategy reflects strength and clear overview of it's product. Kriosk is consistently serving them creative designs for their catalogues, outdoor advertisements and social media handles.",
    thumbnail: `/levin-decor/levin_banner_1280x600.jpg`,
    year: "2022",
    category: "Graphic Design",
    tags: ["Advertising", "Brand Identity", "Digital"],
    sections: {
      advertising: {
        title: "Advertising",
        items: ["Catalogue Design"],
        images: [
          `/levin-decor/advertising-1.jpg`,
          `/levin-decor/advertising-2.jpg`,
          `/levin-decor/cover.jpg`,
        ],
        description: "Catalogue Design",
      },
      brandIdentity: {
        title: "Brand Identity",
        items: ["Brand Logo", "Brand Association", "Brand Awareness"],
        images: [
          `/levin-decor/brand-1.jpg`,
          `/levin-decor/brand-2.jpg`,
          `/levin-decor/brand-3.jpg`,
        ],
        description: "Brand Logo | Brand Association | Brand Awarness",
      },
      digital: {
        title: "Digital",
        items: ["Social Media", "Website Development"],
        images: [
          `/levin-decor/digital-1.jpg`,
          `/levin-decor/digital-2.jpg`,
          `/levin-decor/digital-3.jpg`,
        ],
        description: "Social Media | Website Development",
      },
    },
    nextProject: "samrat-laminates",
  },

  // ── 4. Samrat Laminates ─────────────────────────────────────────────────────
  {
    id: "samrat-laminates",
    slug: "samrat-laminates",
    title: "Samrat Laminates",
    tagline: "Quality that covers everything",
    description:
      "Samrat Laminates is a leading laminate manufacturer requiring a complete brand refresh. Kriosk Creata developed an integrated brand identity and digital strategy that established Samrat as a premium player in the industry.",
    thumbnail: `/samrat-laminates/Cover-compressed.jpg`,
    year: "2022",
    category: "Branding",
    tags: ["Advertising", "Brand Identity", "Digital"],
    sections: {
      advertising: {
        title: "Advertising",
        items: ["Catalogue Design"],
        images: [
          `/samrat-laminates/1.jpg`,
          `/samrat-laminates/2.jpg`,
          `/samrat-laminates/3.jpg`,
        ],
        description: "Catalogue Design",
      },
      brandIdentity: {
        title: "Brand Identity",
        items: ["Brand Logo", "Brand Association", "Brand Awareness"],
        images: [
          `/samrat-laminates/4.jpg`,
          `/samrat-laminates/5.jpg`,
          `/samrat-laminates/6.png`,
        ],
        description: "Brand Colours | Brand Association",
      },
      digital: {
        title: "Digital",
        items: ["Social Media", "Website Development"],
        images: [
          `/samrat-laminates/4.jpg`,
          `/samrat-laminates/2.jpg`,
          `/samrat-laminates/.jpg`,
        ],
        description: "Social Media",
      },
    },
    nextProject: "galaxy-mica",
  },

  // ── 5. Galaxy Mica ──────────────────────────────────────────────────────────
  {
    id: "galaxy-mica",
    slug: "galaxy-mica",
    title: "Galaxy Mica",
    tagline: "Surface that tells a story",
    description:
      "Galaxy Mica is one of Gujarat's well-known mica manufacturers. Kriosk Creata revamped their advertising presence and built a digital strategy to help them reach new markets while retaining their established client base.",
    thumbnail: `/galaxy-mica/micss_banner_1280x600.jpg`,
    year: "2023",
    category: "Digital Marketing",
    tags: ["Advertising", "Digital"],
    sections: {
      advertising: {
        title: "Advertising",
        items: ["Catalogue Design", "OOH Advertising"],
        images: [
          `/galaxy-mica/advertising-1.jpg`,
          `/galaxy-mica/advertising-2.jpg`,
          `/galaxy-mica/advertising-3.jpg`,
        ],
        description: "Catalogue Design",
      },
      digital: {
        title: "Digital",
        items: ["Social Media", "Digital Campaigns"],
        images: [
          `/galaxy-mica/digital-1.jpg`,
          `/galaxy-mica/digital-2.jpg`,
          `/galaxy-mica/digital-3.jpg`,
        ],
        description: "Social Media | Website Development",
      },
    },
    nextProject: "indus-seeds",
  },

  // ── 6. Indus Seeds ──────────────────────────────────────────────────────────
  

  // ── 7. Komal Health Care ────────────────────────────────────────────────────
  {
    id: "Komal Health care",
    slug: "komal-health-care",
    title: "Komal Health care",
    tagline: "Fashion that speaks for itself",
    description:
      "Bellano is a fashion brand that needed a distinctive identity and advertising presence. Kriosk Creata developed a visual language that captures the brand's sophistication and appeals to the modern fashion-conscious consumer.",
    thumbnail: `/komal-health-care/Cover-H.png`,
    year: "2024",
    category: "Branding",
    tags: ["Advertising", "Brand Identity", "Digital"],
    sections: {
      advertising: {
        title: "Advertising",
        items: ["Brand Advertising", "Packaging Design"],
        images: [
          `/komal-health-care/advertising-1.jpg`,
          `/komal-health-care/advertising-2.jpg`,
          `/komal-health-care/advertising-3.jpg`,
        ],
        description:
          "Bellano's advertising campaign was crafted to convey luxury and style. Through evocative imagery and refined typography, the brand communicates a sense of exclusivity that resonates with their target demographic.",
      },
      brandIdentity: {
        title: "Brand Identity",
        items: ["Brand Logo", "Brand Association", "Brand Awareness"],
        images: [
          `/komal-health-care/1.jpg`,
          `/komal-health-care/2.jpg`,
          `/komal-health-care/3.jpg`,
        ],
        description:
          "The Bellano brand identity was built around contemporary elegance. The logo and visual system were meticulously crafted to communicate fashion-forward thinking while remaining timeless — a balance that positions Bellano for long-term brand equity.",
      },
      digital: {
        title: "Digital",
        items: ["Social Media", "Digital Campaigns"],
        images: [
          `/komal-health-care/4.jpg`,
          `/komal-health-care/5.jpg`,
          `/komal-health-care/6.jpg`,
        ],
        description:
          "Bellano's digital strategy focused on building a community of fashion enthusiasts. Social media content was curated to drive engagement and brand aspirations, while digital campaigns converted awareness into meaningful sales.",
      },
    },
    nextProject: "skylite-industries",
  },

  // ── 8. Skylite Industries ────────────────────────────────────────────────────
  {
    id: "skylite-industries",
    slug: "skylite-industries",
    title: "Skylite Industries",
    tagline: "Lighting up possibilities",
    description:
      "Skylite Industries India Pvt. Ltd. is a prominent industrial company requiring a comprehensive brand overhaul. Kriosk Creata designed a professional identity system and digital presence that reflects their expertise and market leadership.",
    thumbnail: `/skylite-industries/Cover_PuCyxVR.png`,
    year: "2023",
    category: "Branding",
    tags: ["Advertising", "Brand Identity", "Digital"],
    sections: {
      advertising: {
        title: "Advertising",
        items: ["Catalogue Design", "Corporate Advertising"],
        images: [
          `/skylite-industries/100.png`,
          `/skylite-industries/Catlog/Jpge/advertising-2.jpg`,
          `/skylite-industries/Catlog/Jpge/advertising-3.jpg`,
        ],
        description: "Catalogue Design",
      },
      brandIdentity: {
        title: "Brand Identity",
        items: ["Brand Logo", "Brand Association", "Brand Awareness"],
        images: [
          `/skylite-industries/Catlog/Jpge/brand-1.jpg`,
          `/skylite-industries/Catlog/Jpge/brand-2.jpg`,
          `/skylite-industries/Catlog/Jpge/brand-3.jpg`,
        ],
        description: "Brand Logo | Brand Association | Brand Awarness",
      },
      digital: {
        title: "Digital",
        items: ["Social Media", "Website Development"],
        images: [
          `/skylite-industries/digital-1.jpg`,
          `/skylite-industries/Catlog/Jpge/digital-2.jpg`,
          `/skylite-industries/Catlog/Jpge/digital-3.jpg`,
        ],
        description: "Social Media | Website Development",
      },
    },
    nextProject: "eurolam",
  },

  // ── 9. Eurolam ──────────────────────────────────────────────────────────────
  {
    id: "eurolam",
    slug: "eurolam",
    title: "Eurolam",
    tagline: "The center of surfaces",
    description:
      "Hirshita Leggings is a fashion brand specializing in premium legwear. Kriosk Creata developed a vibrant brand identity and advertising campaign that captures the brand's energy and appeal to their fashion-conscious customer base.",
    thumbnail: `/Eurolam/Miyora.jpg`,
    year: "2023",
    category: "Branding",
    tags: ["Advertising", "Brand Identity", "Digital"],
    sections: {
      advertising: {
        title: "Advertising",
        items: ["Catalogue Design", "Product Brochure", "Collection Swatches"],
        images: [
          `/Eurolam/Miyora.jpg`,
          `/Eurolam/2.jpg`,
          `/Eurolam/3.jpg`,
        ],
        description: "Catalogue Design | Product Brochure | Collection Swatches",
      },
      brandIdentity: {
        title: "Brand Identity",
        items: ["Brand Logo", "Brand Association", "Brand Awareness"],
        images: [
          `/Eurolam/Miyora.jpg`,
          `/Eurolam/2.jpg`,
          `/Eurolam/3.jpg`,
        ],
        description: "Brand Logo | Brand Association | Brand Awarness",
      },
      digital: {
        title: "Digital",
        items: ["Social Media", "Digital Campaigns"],
        images: [
          `/Eurolam/Miyora.jpg`,
          `/Eurolam/2.jpg`,
          `/Eurolam/3.jpg`,
        ],
        description: "Social Media | Digital Campaigns",
      },
    },
    nextProject: "laminate-hub",
  },


  {
    id: "indus-seedss",
    slug: "indus-seeds",
    title: "Indus Seeds",
    tagline: "Sowing the seeds of success",
    description:
      "Indus Seeds is an agricultural brand that required packaging design and advertising materials to differentiate themselves in a competitive market. Kriosk Creata brought the brand to life with earthy, trustworthy visuals.",
    thumbnail: `/indus-seeds/Cover-compressed_apz1KX9.jpg`,
    year: "2022",
    category: "Graphic Design",
    tags: ["Advertising"],
    sections: {
      advertising: {
        title: "Advertising",
        items: ["Packaging Design", "Print Advertising"],
        images: [
          `/indus-seeds/advertising-1.jpg`,
          `/indus-seeds/Tennisball-.jpg`,
          `/indus-seeds/advertising-3.jpg`,
        ],
        description: "Packaging",
      },
    },
    nextProject: "Komal Health care",
  },

  // ── 10. Laminate Hub ────────────────────────────────────────────────────────
  {
    id: "laminate-hub",
    slug: "laminate-hub",
    title: "Laminate Hub",
    tagline: "The center of surfaces",
    description:
      "Laminate Hub is a one-stop destination for premium laminates requiring a complete brand identity and market presence. Kriosk Creata developed a cohesive visual system and digital strategy that positions them as an industry leader.",
    thumbnail: `/laminate-hub/Cover1.png`,
    year: "2023",
    category: "Branding",
    tags: ["Advertising", "Brand Identity", "Digital"],
    sections: {
      advertising: {
        title: "Advertising",
        items: ["Catalogue Design", "Corporate Advertising"],
        images: [
          `/laminate-hub/advertising-1.jpg`,
          `/laminate-hub/advertising-2.jpg`,
          `/laminate-hub/advertising-3.jpg`,
        ],
        description: "Catalogue Design",
      },
      brandIdentity: {
        title: "Brand Identity",
        items: ["Brand Logo", "Brand Association", "Brand Awareness"],
        images: [
          `/laminate-hub/brand-1.jpg`,
          `/laminate-hub/brand-2.jpg`,
          `/laminate-hub/brand-3.jpg`,
        ],
        description: "Brand Logo | Brand Association | Brand Awarness",
      },
      digital: {
        title: "Digital",
        items: ["Social Media", "Website Development"],
        images: [
          `/laminate-hub/digital-1.jpg`,
          `/laminate-hub/digital-2.jpg`,
          `/laminate-hub/digital-3.jpg`,
        ],
        description: "Social Media | Website Development",
      },
    },
    nextProject: "rang-decor",
  },
];

// Helper: get project by slug
export function getProject(slug: string): KrioskProject | undefined {
  return KRIOSK_PROJECTS.find((p) => p.slug === slug);
}

// Helper: get next project
export function getNextProject(slug: string): KrioskProject | undefined {
  const project = getProject(slug);
  if (!project?.nextProject) return undefined;
  return getProject(project.nextProject);
}

// Helper: first available section key for a project
export function getFirstSectionKey(
  project: KrioskProject
): "advertising" | "brandIdentity" | "digital" {
  if (project.sections.advertising) return "advertising";
  if (project.sections.brandIdentity) return "brandIdentity";
  return "digital";
}