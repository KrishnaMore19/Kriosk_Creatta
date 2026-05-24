"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { KRIOSK_PROJECTS } from "@/data/projectsData";
import { clipPath } from "framer-motion/client";

// ── Only the first 2 projects are previewed on the homepage ──────────────────
const PREVIEW_COUNT = 2;

export default function ProjectsPreviewSection() {
  const previewProjects = KRIOSK_PROJECTS.slice(0, PREVIEW_COUNT);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="section-padding bg-brand-warm" aria-label="Projects preview">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-12 bg-brand-green" />
              <span className="text-brand-green font-body text-sm font-medium tracking-widest uppercase">
                Portfolio
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-charcoal">
              This Is Not<br />
              <em className="text-brand-green not-italic">Our First Time</em>
            </h2>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-brand-green text-brand-green font-body font-medium hover:bg-brand-green hover:text-white transition-all duration-300 self-start md:self-auto group whitespace-nowrap"
          >
            See All 10+ Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* ── 2-Column Preview Grid ───────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-6">
          {previewProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-3xl bg-brand-charcoal cursor-pointer"
            >
              <Link href={`/projects/${project.slug}`} className="block">
                {/* ── Image ── */}
                <div className="relative h-[380px] md:h-[440px] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Hover icon */}
                  <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <ExternalLink className="w-4 h-4 text-white" />
                  </div>

                  {/* Year badge */}
                  <div className="absolute top-5 left-5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                    <span className="font-body text-white/70 text-xs">{project.year}</span>
                  </div>
                </div>

                {/* ── Info overlay ── */}
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  {/* Tags */}
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

                  {/* Title */}
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight">
                    {project.title}
                  </h3>

                  {/* Tagline */}
                  <p className="font-body text-white/55 text-sm mt-1 italic">{project.tagline}</p>

                  {/* Hover-reveal description */}
                  <p className="font-body text-white/60 text-xs mt-3 leading-relaxed line-clamp-2 max-h-0 overflow-hidden group-hover:max-h-12 transition-all duration-400">
                    {project.description}
                  </p>

                  {/* CTA arrow */}
                  <div className="mt-4 inline-flex items-center gap-2 text-brand-green font-body text-sm font-medium opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    View Project
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="font-body text-brand-muted mb-6">
            Showing <strong className="text-brand-charcoal">2</strong> featured
            projects from our portfolio of{" "}
            <strong className="text-brand-charcoal">8,000+</strong>
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-green text-white font-body font-medium hover:bg-brand-green/90 transition-all duration-300 hover:shadow-xl hover:shadow-brand-green/30 hover:-translate-y-0.5 group"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
 
