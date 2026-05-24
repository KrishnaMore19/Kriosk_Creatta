"use client";
import * as React from "react";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Types ────────────────────────────────────────────────────────────────────

interface FeatureItem {
  text: string;
  href?: string;
}

interface FeatureCategory {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  items: FeatureItem[];
}

export interface FeatureGridProps {
  label?: string;
  title: React.ReactNode;
  subtitle: string;
  categories: FeatureCategory[];
  buttonText: string;
  buttonHref: string;
  className?: string;
}

// ── Animation Variants ───────────────────────────────────────────────────────

const springEase = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: springEase, delay },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 16 },
  },
};

// ── Category Card ────────────────────────────────────────────────────────────

function CategoryCard({
  category,
  index,
}: {
  category: FeatureCategory;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      variants={cardVariant}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden cursor-default"
      style={{ backgroundColor: "var(--brand-cream)" }}
    >
      {/* Sliding green fill */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 bg-brand-green"
        initial={{ y: "101%" }}
        animate={{ y: hovered ? "0%" : "101%" }}
        transition={{ duration: 0.52, ease: springEase }}
        style={{ zIndex: 0 }}
      />

      {/* Large watermark */}
      <span
        aria-hidden="true"
        className="absolute -bottom-2 -right-1 font-display text-[7rem] font-black leading-none select-none pointer-events-none"
        style={{
          zIndex: 1,
          color: hovered ? "rgba(255,255,255,0.06)" : "rgba(30,30,20,0.04)",
          transition: "color 0.4s",
        }}
      >
        {num}
      </span>

      {/* Card body */}
      <div className="relative p-8 flex flex-col h-full min-h-[220px]" style={{ zIndex: 2 }}>

        {/* Top row */}
        <div className="flex items-start justify-between mb-5">
          <span
            className="text-[10px] font-body font-bold tracking-[0.16em] uppercase transition-colors duration-300"
            style={{ color: hovered ? "rgba(255,255,255,0.55)" : "var(--brand-green)" }}
          >
            {num}
          </span>
          {category.icon && (
            <span
              className="transition-colors duration-300"
              style={{
                color: hovered ? "rgba(255,255,255,0.45)" : "rgba(30,30,20,0.22)",
              }}
            >
              {category.icon}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className="font-display text-xl font-bold leading-tight mb-3 transition-colors duration-300"
          style={{ color: hovered ? "#ffffff" : "var(--brand-charcoal)" }}
        >
          {category.title}
        </h3>

        {/* Animated rule */}
        <div
          className="relative mb-5 overflow-hidden"
          style={{ height: "1.5px", backgroundColor: "rgba(30,30,20,0.08)" }}
        >
          <motion.span
            className="absolute inset-y-0 left-0"
            style={{ backgroundColor: hovered ? "rgba(255,255,255,0.35)" : "var(--brand-green)" }}
            animate={{ width: hovered ? "100%" : "28px" }}
            transition={{ duration: 0.5, ease: springEase }}
          />
        </div>

        {/* Optional description */}
        {category.description && (
          <p
            className="font-body text-[12px] leading-relaxed mb-4 transition-colors duration-300"
            style={{ color: hovered ? "rgba(255,255,255,0.65)" : "var(--brand-muted)" }}
          >
            {category.description}
          </p>
        )}

        {/* Items */}
        <ul className="space-y-[7px] mt-auto">
          {category.items.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-2 font-body text-[12.5px] transition-colors duration-300"
              style={{ color: hovered ? "rgba(255,255,255,0.78)" : "var(--brand-muted)" }}
            >
              <span
                className="flex-shrink-0 w-[5px] h-[5px] rounded-full transition-colors duration-300"
                style={{ backgroundColor: hovered ? "rgba(255,255,255,0.45)" : "var(--brand-green)" }}
              />
              {item.href ? (
                <a href={item.href} className="hover:underline underline-offset-2">
                  {item.text}
                </a>
              ) : (
                <span>{item.text}</span>
              )}
            </li>
          ))}
        </ul>

        {/* Explore hint */}
        <p
          className="mt-5 text-[9px] font-body font-semibold tracking-[0.14em] uppercase transition-colors duration-300"
          style={{ color: hovered ? "rgba(255,255,255,0.35)" : "rgba(30,30,20,0.2)" }}
        >
          Explore →
        </p>
      </div>
    </motion.div>
  );
}

// ── Ticker Strip ─────────────────────────────────────────────────────────────

function TickerStrip({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div
      className="w-full overflow-hidden border-y"
      style={{
        borderColor: "rgba(30,30,20,0.08)",
        backgroundColor: "var(--brand-cream)",
      }}
    >
      <motion.div
        className="flex items-center gap-0 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 px-8 py-3 font-body text-[10px] font-semibold tracking-[0.16em] uppercase"
            style={{ color: "var(--brand-muted)" }}
          >
            {item}
            <span
              className="inline-block w-1 h-1 rounded-full"
              style={{ backgroundColor: "var(--brand-green)" }}
            />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

export const FeatureGrid = React.forwardRef<HTMLElement, FeatureGridProps>(
  (
    {
      label = "Use Cases",
      title,
      subtitle,
      categories,
      buttonText,
      buttonHref,
      className,
    },
    ref
  ) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const inView = useInView(sectionRef, { once: true, margin: "-80px" });

    const tickerItems = categories.map((c) => c.title);

    return (
      <section
        ref={ref}
        className={cn("section-padding bg-[var(--brand-cream)]", className)}
        aria-label="Feature categories"
      >
        <div ref={sectionRef} className="max-w-7xl mx-auto">

          {/* ── Header ── */}
          <div className="px-6 mb-14">
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <div className="flex items-center gap-3 mb-5">
                <motion.span
                  className="h-px bg-brand-green"
                  initial={{ width: 0 }}
                  animate={inView ? { width: 28 } : {}}
                  transition={{ duration: 0.6, delay: 0.25 }}
                />
                <span className="text-brand-green font-body text-[11px] font-semibold tracking-widest uppercase">
                  {label}
                </span>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-charcoal leading-[1.1]">
                  {title}
                </h2>
                <p className="font-body text-brand-muted text-sm leading-relaxed max-w-sm lg:text-right lg:pb-1">
                  {subtitle}
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── Ticker ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-[1px]"
          >
            <TickerStrip items={tickerItems} />
          </motion.div>

          {/* ── Grid ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            style={{
              gap: "1px",
              backgroundColor: "rgba(30,30,20,0.08)",
            }}
          >
            {categories.map((category, index) => (
              <CategoryCard key={index} category={category} index={index} />
            ))}
          </motion.div>

          {/* ── Bottom strip with CTA ── */}
          <motion.div
            variants={fadeUp}
            custom={0.5}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="px-6 mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
          >
            {/* Count indicator */}
            <div className="flex items-center gap-4">
              <span
                className="font-display text-5xl font-black leading-none"
                style={{ color: "var(--brand-green)" }}
              >
                {String(categories.length).padStart(2, "0")}
              </span>
              <span
                className="font-body text-[11px] font-semibold tracking-widest uppercase leading-tight"
                style={{ color: "rgba(30,30,20,0.35)" }}
              >
                Specialised
                <br />
                Services
              </span>
            </div>

            {/* CTA */}
            <a
              href={buttonHref}
              className="inline-flex items-center gap-3 px-8 py-4 bg-brand-green text-white font-body font-semibold text-sm tracking-wide hover:bg-brand-greenDark transition-all duration-300 group/btn"
              style={{ borderRadius: "9999px" }}
            >
              {buttonText}
              <span
                className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/20 group-hover/btn:bg-white/30 transition-colors duration-300"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </span>
            </a>
          </motion.div>
        </div>
      </section>
    );
  }
);

FeatureGrid.displayName = "FeatureGrid";