"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; // ✅ Import Next.js Image
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { KRIOSK_PROJECTS, KrioskProject } from "@/data/projectsData";

// ── Single project card ────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: KrioskProject; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: (index % 2) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block relative overflow-hidden rounded-3xl bg-brand-charcoal"
        aria-label={`View ${project.title} project`}
      >
        {/* ── Image ── */}
        <div className="relative h-72 overflow-hidden">
          {/* ✅ Use Next.js Image instead of <img> */}
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            loading={index < 2 ? "eager" : "lazy"} // ✅ Eager-load first 2 visible cards
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          {/* Year badge */}
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
            <span className="font-body text-white/70 text-xs">{project.year}</span>
          </div>

          {/* Arrow icon on hover */}
          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </div>
        </div>

        {/* ── Info ── */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/70 text-xs font-body backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="font-display text-xl font-bold text-white">{project.title}</h3>
          <p className="font-body text-white/50 text-sm mt-1 italic">{project.tagline}</p>

          {/* Reveal on hover */}
          <p className="font-body text-white/55 text-xs mt-2 line-clamp-2 max-h-0 overflow-hidden group-hover:max-h-10 transition-all duration-300">
            {project.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Projects Page ──────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? KRIOSK_PROJECTS
      : KRIOSK_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-brand-cream pt-24">

        {/* ── Header ── */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-green transition-colors font-body text-sm mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-12 bg-brand-green" />
              <span className="text-brand-green font-body text-sm font-medium tracking-widest uppercase">
                Portfolio
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-brand-charcoal leading-tight">
                Our<br />
                <em className="text-brand-green not-italic">Projects</em>
              </h1>
              <p className="font-body text-brand-muted max-w-xs text-sm leading-relaxed">
                10 hand-picked highlights from over 8,000 projects delivered
                across branding, design, digital, and development.
              </p>
            </div>
          </motion.div>
        </section>

        {/* ── Filter Bar ── */}
        <section className="max-w-7xl mx-auto px-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-wrap gap-3"
            role="tablist"
            aria-label="Filter projects by category"
          >
          </motion.div>
        </section>

        {/* ── Grid ── */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-24 text-brand-muted font-body">
              No projects found in this category.
            </div>
          )}

          {/* Source note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-brand-muted/50 text-xs mt-12 font-body"
          >
            Showing {filtered.length} of 8,000+ projects delivered since 2001 ·{" "}
            <a
              href="https://krioskcreata.com/portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-brand-green transition-colors"
            >
              View full portfolio
            </a>
          </motion.p>
        </section>
      </main>
      <Footer />
    </>
  );
}