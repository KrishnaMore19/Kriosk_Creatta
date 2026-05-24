"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import {
  KrioskProject,
  getProject,
  getNextProject,
  getFirstSectionKey,
} from "@/data/projectsData";

// ─── Types ────────────────────────────────────────────────────────────────────
type SectionKey = "advertising" | "brandIdentity" | "digital";

const SECTION_LABELS: Record<SectionKey, string> = {
  brandIdentity: "Brand Identity",
  advertising: "Advertising",
  digital: "Digital",
};

const SECTION_ORDER: SectionKey[] = ["brandIdentity", "advertising", "digital"];

const SECTION_META: Record<SectionKey, { icon: string }> = {
  brandIdentity: { icon: "◈" },
  advertising: { icon: "◉" },
  digital: { icon: "⬡" },
};

const E = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";

const ANIM_CSS = `
  @keyframes imgFadeIn {
    from { opacity: 0; transform: scale(1.02); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes progressBar {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes lineGrow {
    from { width: 0; opacity: 0; }
    to   { width: 32px; opacity: 1; }
  }
  @keyframes dividerExpand {
    from { transform: scaleX(0); opacity: 0; }
    to   { transform: scaleX(1); opacity: 1; }
  }
  @keyframes chipIn {
    from { opacity: 0; transform: scale(0.78) translateY(6px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes counterPop {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

function StyleInjector() {
  useEffect(() => {
    const id = "kriosk-split-anim";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.textContent = ANIM_CSS;
      document.head.appendChild(s);
    }
  }, []);
  return null;
}

// ─── Left Image Slider ────────────────────────────────────────────────────────
function ImageSlider({
  project,
  images,
}: {
  project: KrioskProject;
  images: string[];
}) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => { setCurrent(0); }, [images]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (images.length <= 1) return;
    timerRef.current = setInterval(
      () => setCurrent((p) => (p + 1) % images.length),
      4500
    );
  }, [images.length]);

  const go = useCallback(
    (idx: number) => {
      setCurrent(((idx % images.length) + images.length) % images.length);
      startTimer();
    },
    [images.length, startTimer]
  );

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  if (!images.length) return null;

  return (
    // ✅ FIX: Changed from "sticky top-16 h-[calc(100vh-64px)]"
    //         to "sticky top-0 h-screen"
    //         because <main> now has pt-16, so no need to offset here
    <div className="sticky top-0 w-full h-screen overflow-hidden">

      {/* Blurred background */}
      <img
        key={`bg-${images[current]}-${current}`}
        src={images[current]}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover scale-110"
        style={{ filter: "blur(28px) brightness(0.45) saturate(1.2)" }}
        draggable={false}
      />

      {/* Progress bar */}
      {images.length > 1 && (
        <div className="absolute top-0 left-0 right-0 z-20 h-[2px] bg-white/10">
          <div
            key={`${current}-${images[0]}`}
            className="h-full bg-brand-green origin-left"
            style={{ animation: "progressBar 4.5s linear both", transformOrigin: "left" }}
          />
        </div>
      )}

      {/* Foreground image */}
      <img
        key={`${images[current]}-${current}`}
        src={images[current]}
        alt={`${project.title} — ${current + 1}`}
        className="absolute inset-0 w-full h-full object-contain z-10"
        style={{ animation: `imgFadeIn 0.8s ${E} both` }}
        draggable={false}
      />

      {/* Counter */}
      {images.length > 1 && (
        <div
          key={current}
          className="absolute top-5 right-5 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10"
          style={{ animation: `counterPop 0.4s ${E} both` }}
        >
          <span className="font-body text-white text-xs tracking-widest font-medium">
            {String(current + 1).padStart(2, "0")}
          </span>
          <span className="text-white/30 text-xs">/</span>
          <span className="font-body text-white/50 text-xs tracking-widest">
            {String(images.length).padStart(2, "0")}
          </span>
        </div>
      )}

      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => go(current - 1)}
            aria-label="Previous"
            className="absolute left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/10 hover:bg-brand-green backdrop-blur-sm border border-white/15 hover:border-brand-green flex items-center justify-center text-white transition-all duration-400 hover:scale-110 active:scale-90 group"
          >
            <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
          </button>
          <button
            onClick={() => go(current + 1)}
            aria-label="Next"
            className="absolute right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/10 hover:bg-brand-green backdrop-blur-sm border border-white/15 hover:border-brand-green flex items-center justify-center text-white transition-all duration-400 hover:scale-110 active:scale-90 group"
          >
            <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-8 left-0 right-0 z-30 flex gap-2 items-center justify-center">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`rounded-full transition-all duration-500 ${
                i === current
                  ? "w-7 h-1.5 bg-brand-green shadow-sm shadow-brand-green/60"
                  : "w-1.5 h-1.5 bg-white/35 hover:bg-white/65"
              }`}
            />
          ))}
        </div>
      )}

      {/* Watermark */}
      <div className="absolute bottom-6 left-6 z-30">
        <p className="font-body text-white/35 text-[10px] tracking-[0.22em] uppercase">
          {project.category} · {project.year}
        </p>
      </div>
    </div>
  );
}

// ─── Back Button ──────────────────────────────────────────────────────────────
function BackButton() {
  return (
    <Link
      href="/projects"
      className="inline-flex items-center gap-2.5 group flex-shrink-0"
    >
      <span className="w-9 h-9 rounded-full border border-brand-green/30 bg-transparent flex items-center justify-center transition-all duration-500 group-hover:bg-brand-green group-hover:border-brand-green group-hover:shadow-lg group-hover:shadow-brand-green/25 group-hover:-translate-x-0.5">
        <ArrowLeft className="w-4 h-4 text-brand-green transition-colors duration-400 group-hover:text-white" />
      </span>
      <span className="font-body text-sm text-brand-muted group-hover:text-brand-green transition-colors duration-400 tracking-wide">
        All Projects
      </span>
    </Link>
  );
}

// ─── Tab Button ───────────────────────────────────────────────────────────────
function TabButton({
  sectionKey,
  isActive,
  onClick,
  index,
}: {
  sectionKey: SectionKey;
  isActive: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      className={`px-5 py-2 rounded-full font-body text-xs font-medium cursor-pointer relative overflow-hidden transition-all duration-400 ${
        isActive
          ? "bg-brand-green text-white shadow-lg shadow-brand-green/30 scale-105"
          : "bg-transparent border border-brand-green/20 text-brand-muted hover:border-brand-green/50 hover:text-brand-green"
      }`}
    >
      {isActive && (
        <span
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.16) 0%, transparent 65%)",
          }}
        />
      )}
      <span className="relative z-10 flex items-center gap-1.5">
        <span className="opacity-50 text-[11px]">{SECTION_META[sectionKey].icon}</span>
        {SECTION_LABELS[sectionKey]}
      </span>
    </button>
  );
}

// ─── Right Info Panel ─────────────────────────────────────────────────────────
function InfoPanel({
  project,
  availableSections,
  activeSection,
  onSectionChange,
  nextProject,
}: {
  project: KrioskProject;
  availableSections: SectionKey[];
  activeSection: SectionKey;
  onSectionChange: (key: SectionKey) => void;
  nextProject: KrioskProject | null;
}) {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Main content */}
      <div className="flex-1 px-10 xl:px-16 pt-20 pb-12">

        {/* Back + Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-12">
          <BackButton />
          <div className="hidden sm:block h-4 w-px bg-brand-green/15 mx-1" />
          <div className="flex flex-wrap gap-2" role="tablist">
            {availableSections.map((key, i) => (
              <TabButton
                key={key}
                sectionKey={key}
                isActive={activeSection === key}
                onClick={() => onSectionChange(key)}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* Eyebrow */}
        <div
          className="flex items-center gap-3 mb-3"
          style={{ animation: `fadeUp 0.7s ${E} 0.3s both` }}
        >
          <span
            className="h-px bg-brand-green flex-shrink-0"
            style={{ animation: `lineGrow 0.8s ${E} 0.4s both`, width: 0 }}
          />
          <p className="font-body text-brand-green text-[10px] tracking-[0.22em] uppercase">
            · {project.tagline} ·
          </p>
        </div>

        {/* Title */}
        <h1
          className="font-display text-4xl xl:text-5xl font-bold text-brand-charcoal leading-[1.08] mb-5"
          style={{ animation: `fadeUp 0.85s ${E} 0.35s both` }}
        >
          {project.title}
        </h1>

        {/* Divider */}
        <div
          className="h-px bg-gradient-to-r from-brand-green/25 via-brand-green/10 to-transparent mb-7"
          style={{ animation: `dividerExpand 1s ${E} 0.5s both`, transformOrigin: "left" }}
        />

        {/* Description */}
        <p
          className="font-body text-brand-muted leading-[1.9] text-sm mb-10"
          style={{ animation: `fadeUp 0.8s ${E} 0.45s both` }}
        >
          {project.description}
        </p>

        {/* Section rows */}
        <div className="divide-y divide-brand-green/8">
          {availableSections.map((key, i) => {
            const sec = project.sections[key];
            if (!sec) return null;
            return (
              <div
                key={key}
                className="py-5 group"
                style={{ animation: `fadeUp 0.7s ${E} ${0.55 + i * 0.1}s both` }}
              >
                <p className="font-body font-semibold text-brand-charcoal text-sm mb-2 group-hover:text-brand-green transition-colors duration-400">
                  {SECTION_LABELS[key]}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {sec.items.map((item, j) => (
                    <span
                      key={j}
                      className="inline-block px-3 py-0.5 rounded-full border border-brand-green/12 bg-brand-green/5 font-body text-[11px] text-brand-muted group-hover:border-brand-green/25 group-hover:bg-brand-green/10 transition-all duration-400"
                      style={{ animation: `chipIn 0.5s ${SPRING} ${0.6 + i * 0.1 + j * 0.04}s both` }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Next Project strip */}
      {nextProject && (
        <div
          className="border-t border-brand-green/10 bg-white/40"
          style={{ animation: `fadeIn 0.8s ${E} 1s both` }}
        >
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group flex items-center justify-between px-10 xl:px-16 py-6 hover:bg-white/60 transition-all duration-400"
          >
            <div>
              <p className="font-body text-[9px] tracking-[0.2em] uppercase text-brand-muted/50 mb-1">
                Next Project
              </p>
              <h3 className="font-display text-lg font-bold text-brand-charcoal group-hover:text-brand-green transition-colors duration-400">
                {nextProject.title}
              </h3>
              <p className="font-body text-brand-muted text-xs italic mt-0.5">
                {nextProject.tagline}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-brand-green/10 group-hover:ring-brand-green/30 transition-all duration-500">
                <img
                  src={nextProject.thumbnail}
                  alt={nextProject.title}
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
                />
              </div>
              <div className="w-9 h-9 rounded-full bg-brand-green flex items-center justify-center shadow-md shadow-brand-green/20 transition-all duration-500 group-hover:translate-x-1.5 group-hover:shadow-brand-green/40">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

// ─── Project Detail ───────────────────────────────────────────────────────────
function ProjectDetail({
  project,
  nextProject,
}: {
  project: KrioskProject;
  nextProject: KrioskProject | null;
}) {
  const firstKey = getFirstSectionKey(project) as SectionKey;
  const [activeSection, setActiveSection] = useState<SectionKey>(firstKey);

  useEffect(() => {
    setActiveSection(getFirstSectionKey(project) as SectionKey);
  }, [project]);

  const handleSection = (key: SectionKey) => {
    if (key === activeSection) return;
    setActiveSection(key);
  };

  const availableSections = SECTION_ORDER.filter(
    (key) => !!project.sections[key]
  );

  const heroImages: string[] = project.sections[activeSection]?.images ?? [];

  return (
    // ✅ FIX: Added "pt-16" so content starts BELOW the fixed navbar (64px height)
    //         Previously there was no pt-16, so navbar was overlapping the top of the page
    <main className="min-h-screen bg-brand-cream pt-16">

      {/* Split Layout */}
      <div className="flex flex-col lg:flex-row">

        {/* LEFT — sticky image slider */}
        <div className="w-full lg:w-1/2 lg:flex-shrink-0">
          <ImageSlider project={project} images={heroImages} />
        </div>

        {/* RIGHT — scrollable info */}
        <div className="w-full lg:w-1/2 bg-brand-cream overflow-y-auto">
          <InfoPanel
            project={project}
            availableSections={availableSections}
            activeSection={activeSection}
            onSectionChange={handleSection}
            nextProject={nextProject}
          />
        </div>
      </div>

      {/* CTA */}
      <section className="relative bg-brand-charcoal py-24 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg,#4a7c59 0,#4a7c59 1px,transparent 0,transparent 50%)",
            backgroundSize: "22px 22px",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.07]"
          style={{ background: "radial-gradient(circle,#4a7c59 0%,transparent 65%)" }}
        />
        <div className="relative max-w-xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-10 bg-brand-green" />
            <span className="text-brand-green font-body text-[10px] tracking-[0.25em] uppercase">
              Let's Collaborate
            </span>
            <span className="h-px w-10 bg-brand-green" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Got a project?
          </h2>
          <p className="font-body text-white/40 mb-10 text-sm leading-relaxed">
            A hub that wishes to serve you the best awaits your arrival.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-brand-green text-white font-body font-medium text-sm hover:bg-brand-green/90 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-green/35 hover:-translate-y-1 active:scale-95"
          >
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProjectDetailPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const project = getProject(slug);

  const nextProjectRaw = getNextProject(slug);
  const nextProject: KrioskProject | null =
    nextProjectRaw != null ? (nextProjectRaw as KrioskProject) : null;

  if (process.env.NODE_ENV === "development") {
    console.log("[ProjectDetailPage] slug:", slug);
    console.log("[ProjectDetailPage] nextProject:", nextProject);
  }

  if (!project) {
    return (
      <>
        <StyleInjector />
        <Navbar />
        <main className="min-h-screen bg-brand-cream pt-16 flex items-center justify-center">
          <div className="text-center" style={{ animation: `fadeUp 0.9s ${E} both` }}>
            <h1 className="font-display text-4xl font-bold text-brand-charcoal mb-4">
              Project not found
            </h1>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-brand-green font-body hover:underline"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Projects
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <StyleInjector />
      <Navbar />
      <ProjectDetail project={project} nextProject={nextProject} />
      <Footer />
    </>
  );
}