"use client";
import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

// ── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    number: "01",
    title: "Branding",
    description:
      "A brand's visual identity reflects the brand's vision and personality for the audience. The visual identity comprises a brand logo, colour scheme, web design, etc. It consists of the overall appearance of the brand. The brand must maintain the selected tone and personality throughout its marketing.",
    shortDescription:
      "A brand's visual identity reflects the brand's vision and personality for the audience. The visual identity comprises a brand logo, colour scheme, web design, etc.",
    tags: ["Logo Design", "Brand Identity", "Style Guide", "Naming"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Graphic Design",
    description:
      "Graphic design transforms ideas into visually engaging creatives that communicate a brand's message effectively. It includes designs for social media, advertisements, packaging, illustrations, and marketing materials that create a strong visual impact.",
    shortDescription:
      "Graphic design transforms ideas into visually engaging creatives that communicate a brand's message effectively across all media.",
    tags: ["Print", "Packaging", "Advertising", "Illustrations"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Web Development",
    description:
      "Our website design services are carefully curated to communicate your business to your audience and help generate more leads. We make your website visually appealing with an enhanced, user-friendly experience and a consistent brand identity.",
    shortDescription:
      "Our website design services communicate your business effectively, generating leads with visually appealing, user-friendly experiences.",
    tags: ["Frontend", "Backend", "E-commerce", "CMS"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "App Development",
    description:
      "App development is creating an app for digital devices like smartphones and tablets to use different brand services at the tip of your fingers. Creating an app requires meticulous coordination between developers, designers, and testers.",
    shortDescription:
      "App development brings your brand services to smartphones and tablets through meticulous coordination between developers, designers, and testers.",
    tags: ["iOS", "Android", "React Native", "UI Design"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Digital Marketing",
    description:
      "We provide result-driven digital marketing solutions through SEO, PPC, email marketing, and social media strategies that help businesses grow online. Our expert campaigns increase brand visibility and generate quality leads.",
    shortDescription:
      "Result-driven digital marketing through SEO, PPC, and social media strategies that increase brand visibility and generate quality leads.",
    tags: ["SEO", "Paid Ads", "Social Media", "Email"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "Content Marketing",
    description:
      "We create engaging blog content and SEO copywriting that captures attention and connects with your audience effectively. Our creative writers craft compelling, user-focused content and impactful marketing copies.",
    shortDescription:
      "Engaging blog content and SEO copywriting that captures attention, crafted by creative writers for maximum impact.",
    tags: ["Copywriting", "Video", "Blogs", "PR & Influencer"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
      </svg>
    ),
  },
];

const springEase = [0.22, 1, 0.36, 1] as const;

// ── Lock body scroll when drawer is open ─────────────────────────────────────
// FIX: Use a ref to store scrollY BEFORE the body is locked so we can
//      reliably restore it on close — instead of trying to parse it back
//      from body.style.top which caused the page to jump to the top.

function useBodyScrollLock(locked: boolean) {
  const savedScrollY = useRef(0); // ← stores the scroll position at lock time

  useEffect(() => {
    if (locked) {
      // Capture scroll position BEFORE we fix the body
      savedScrollY.current = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${savedScrollY.current}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      // Restore styles first, then scroll — order matters
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      // Restore to exact saved position from ref (never mis-parsed)
      window.scrollTo(0, savedScrollY.current);
    }

    return () => {
      // Cleanup in case component unmounts while drawer is open
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [locked]);
}

// ── Ticker ────────────────────────────────────────────────────────────────────

function TickerStrip() {
  const items = [...SERVICES, ...SERVICES].map((s) => s.title);
  return (
    <div
      className="w-full overflow-hidden border-y"
      style={{ borderColor: "rgba(30,30,20,0.08)" }}
    >
      <motion.div
        className="flex items-center whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 px-8 py-3 font-body text-[10px] font-semibold tracking-[0.16em] uppercase"
            style={{ color: "var(--brand-muted)" }}
          >
            {item}
            <span
              className="inline-block w-1 h-1 rounded-full flex-shrink-0"
              style={{ backgroundColor: "var(--brand-green)" }}
            />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ── Desktop Service Panel ─────────────────────────────────────────────────────

function ServicePanel({
  service,
  index,
  isActive,
  onClick,
}: {
  service: (typeof SERVICES)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-50, 50], [3, -3]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-50, 50], [-3, 3]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const active = isActive || hovered;

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
        backgroundColor: "var(--brand-cream)",
      }}
      initial={{ opacity: 0, y: 36, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: springEase }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden"
    >
      {/* Green fill — slides up from bottom */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 bg-brand-green"
        initial={{ y: "101%" }}
        animate={{ y: active ? "0%" : "101%" }}
        transition={{ duration: 0.48, ease: springEase }}
        style={{ zIndex: 0 }}
      />

      {/* Active left bar */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 z-20"
        animate={{ width: isActive ? "3px" : "0px" }}
        transition={{ duration: 0.3, ease: springEase }}
        style={{ backgroundColor: "white" }}
      />

      {/* Content */}
      <div className="relative p-6 sm:p-8 flex flex-col min-h-[240px] sm:min-h-[270px]" style={{ zIndex: 2 }}>

        {/* Icon row */}
        <div className="flex items-center justify-between mb-5">
          <motion.div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            animate={{
              backgroundColor: active ? "rgba(255,255,255,0.18)" : "rgba(59,109,17,0.1)",
              color: active ? "#ffffff" : "var(--brand-green)",
            }}
            transition={{ duration: 0.28 }}
          >
            {service.icon}
          </motion.div>

          <motion.div
            animate={{
              opacity: active ? 1 : 0,
              x: active ? 0 : 6,
              color: "rgba(255,255,255,0.6)",
            }}
            transition={{ duration: 0.3, ease: springEase }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </motion.div>
        </div>

        {/* Title */}
        <motion.h3
          className="font-display text-base sm:text-lg font-bold leading-tight mb-3"
          animate={{ color: active ? "#ffffff" : "var(--brand-charcoal)" }}
          transition={{ duration: 0.28 }}
        >
          {service.title}
        </motion.h3>

        {/* Animated divider */}
        <div
          className="relative mb-4 overflow-hidden"
          style={{ height: "1.5px", backgroundColor: "rgba(30,30,20,0.08)" }}
        >
          <motion.span
            className="absolute inset-y-0 left-0"
            animate={{
              width: active ? "100%" : "24px",
              backgroundColor: active ? "rgba(255,255,255,0.4)" : "var(--brand-green)",
            }}
            transition={{ duration: 0.48, ease: springEase }}
          />
        </div>

        {/* Short description */}
        <div className="relative overflow-hidden mb-5" style={{ minHeight: "52px" }}>
          <motion.p
            className="font-body text-[11px] sm:text-[12px] leading-[1.65] absolute inset-0"
            animate={{
              opacity: active ? 1 : 0,
              y: active ? 0 : 8,
              color: "rgba(255,255,255,0.82)",
            }}
            transition={{ duration: 0.38, ease: springEase, delay: active ? 0.06 : 0 }}
          >
            {service.shortDescription}
          </motion.p>
          <motion.p
            className="font-body text-[11px] sm:text-[12px] leading-[1.65]"
            animate={{
              opacity: active ? 0 : 1,
              y: active ? -8 : 0,
              color: "var(--brand-muted)",
            }}
            transition={{ duration: 0.3, ease: springEase }}
          >
            {service.shortDescription}
          </motion.p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-[6px] mt-auto">
          {service.tags.map((tag, ti) => (
            <motion.span
              key={tag}
              className="px-2.5 py-[3px] text-[10px] font-body font-medium tracking-wide border"
              initial={{ opacity: 0, y: 6 }}
              animate={
                inView
                  ? {
                      opacity: 1,
                      y: 0,
                      borderColor: active ? "rgba(255,255,255,0.35)" : "rgba(30,30,20,0.14)",
                      color: active ? "rgba(255,255,255,0.85)" : "var(--brand-muted)",
                    }
                  : {}
              }
              transition={{ duration: 0.28, delay: index * 0.08 + ti * 0.04 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Learn more button */}
        <button
          onClick={onClick}
          className="mt-4 flex items-center gap-1.5 group/btn"
          aria-label={`Learn more about ${service.title}`}
        >
          <motion.span
            className="text-[9px] font-body font-semibold tracking-[0.14em] uppercase"
            animate={{ color: active ? "rgba(255,255,255,0.7)" : "var(--brand-green)" }}
            transition={{ duration: 0.28 }}
          >
            {isActive ? "Viewing →" : "Learn more"}
          </motion.span>
          <motion.svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-3 h-3 transition-transform duration-200 group-hover/btn:translate-x-0.5"
            animate={{ color: active ? "rgba(255,255,255,0.7)" : "var(--brand-green)" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </motion.svg>
        </button>
      </div>
    </motion.div>
  );
}

// ── Mobile Card ───────────────────────────────────────────────────────────────

function MobileCard({
  service,
  index,
  onClick,
}: {
  service: (typeof SERVICES)[0];
  index: number;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, x: 28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.48, delay: index * 0.07, ease: springEase }}
      onClick={onClick}
      className="flex-shrink-0 w-[72vw] max-w-[270px] text-left relative overflow-hidden"
      style={{ backgroundColor: "var(--brand-cream)", borderRadius: "2px" }}
      aria-label={`Learn more about ${service.title}`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-5">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(59,109,17,0.1)", color: "var(--brand-green)" }}
          >
            {service.icon}
          </div>
          <span
            className="text-[9px] font-body font-semibold tracking-widest uppercase"
            style={{ color: "rgba(30,30,20,0.25)" }}
          >
            Tap →
          </span>
        </div>

        <h3
          className="font-display text-base font-bold mb-2"
          style={{ color: "var(--brand-charcoal)" }}
        >
          {service.title}
        </h3>

        <div
          className="mb-3"
          style={{ height: "1.5px", width: "24px", backgroundColor: "rgba(30,30,20,0.15)" }}
        />

        <p
          className="font-body text-[11px] leading-[1.6] mb-4"
          style={{ color: "var(--brand-muted)" }}
        >
          {service.shortDescription}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[9px] font-body font-medium tracking-wide border"
              style={{
                borderColor: "rgba(30,30,20,0.14)",
                color: "var(--brand-muted)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}

// ── Drawer ────────────────────────────────────────────────────────────────────

function ServiceDrawer({
  service,
  onClose,
}: {
  service: (typeof SERVICES)[0] | null;
  onClose: () => void;
}) {
  // ✅ FIX APPLIED HERE — scroll lock now uses a ref to save/restore position
  useBodyScrollLock(!!service);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {service && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0"
            style={{ zIndex: 9998, backgroundColor: "rgba(0,0,0,0.5)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.div
            className="fixed top-0 right-0 h-full overflow-y-auto"
            style={{
              zIndex: 9999,
              backgroundColor: "var(--brand-cream)",
              width: "min(100vw, 440px)",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: springEase }}
            role="dialog"
            aria-modal="true"
            aria-label={`${service.title} details`}
          >
            {/* Green top strip */}
            <div className="h-1 w-full bg-brand-green flex-shrink-0" />

            <div className="p-6 sm:p-8 md:p-10">
              {/* Close button */}
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 font-body text-xs tracking-widest uppercase transition-colors duration-200 hover:opacity-60"
                  style={{ color: "var(--brand-muted)" }}
                  aria-label="Close drawer"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                  Close
                </button>

                <span
                  className="text-[10px] font-body font-bold tracking-[0.16em] uppercase"
                  style={{ color: "var(--brand-green)" }}
                >
                  {service.number}
                </span>
              </div>

              {/* Icon + Title */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(59,109,17,0.1)", color: "var(--brand-green)" }}
                >
                  {service.icon}
                </div>
                <h2
                  className="font-display text-2xl sm:text-3xl font-bold leading-tight"
                  style={{ color: "var(--brand-charcoal)" }}
                >
                  {service.title}
                </h2>
              </div>

              {/* Divider */}
              <div
                className="mb-6"
                style={{ height: "1.5px", width: "40px", backgroundColor: "var(--brand-green)" }}
              />

              {/* Description */}
              <p
                className="font-body text-sm leading-relaxed mb-8"
                style={{ color: "var(--brand-muted)" }}
              >
                {service.description}
              </p>

              {/* Tags */}
              <div className="mb-10">
                <p
                  className="text-[10px] font-body font-bold tracking-[0.16em] uppercase mb-3"
                  style={{ color: "rgba(30,30,20,0.35)" }}
                >
                  What's Included
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-[11px] font-body font-medium tracking-wide border"
                      style={{
                        borderColor: "rgba(30,30,20,0.15)",
                        color: "var(--brand-charcoal)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <a
                href="#contact"
                onClick={onClose}
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-brand-green text-white font-body font-semibold text-sm tracking-wide hover:bg-brand-greenDark transition-all duration-300"
                style={{ borderRadius: "9999px" }}
              >
                Start a Project
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────

export default function ServicesSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-100px" });

  const [activeService, setActiveService] = useState<(typeof SERVICES)[0] | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openDrawer = (service: (typeof SERVICES)[0], index: number) => {
    setActiveService(service);
    setActiveIndex(index);
  };

  const closeDrawer = () => {
    setActiveService(null);
    setActiveIndex(null);
  };

  return (
    <>
      <section
        id="services"
        className="section-padding bg-[var(--brand-cream)]"
        aria-label="Our services"
      >
        <div className="max-w-7xl mx-auto overflow-hidden">

          {/* ── Header ── */}
          <div className="px-4 sm:px-6 mb-10 sm:mb-14">
            <motion.div
              ref={headerRef}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: springEase }}
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.span
                  className="h-px bg-brand-green"
                  initial={{ width: 0 }}
                  animate={inView ? { width: 28 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                />
                <span
                  className="font-body text-[11px] font-semibold tracking-widest uppercase"
                  style={{ color: "var(--brand-green)" }}
                >
                  What We Do
                </span>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6">
                <h2
                  className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1]"
                  style={{ color: "var(--brand-charcoal)" }}
                >
                  The Key to Our
                  <br />
                  <em className="not-italic" style={{ color: "var(--brand-green)" }}>
                    Pandora Box
                  </em>
                </h2>
                <p
                  className="font-body text-sm leading-relaxed max-w-sm lg:text-right lg:pb-1"
                  style={{ color: "var(--brand-muted)" }}
                >
                  Six specialised services. One seamless creative partner.
                  <br className="hidden sm:block" />
                  From the first sketch to the final pixel.
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
            <TickerStrip />
          </motion.div>

          {/* ── Desktop Grid (md+) ── */}
          <motion.div
            className="hidden md:grid md:grid-cols-2 lg:grid-cols-3"
            style={{ gap: "1px", backgroundColor: "rgba(30,30,20,0.08)" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            {SERVICES.map((service, i) => (
              <ServicePanel
                key={service.number}
                service={service}
                index={i}
                isActive={activeIndex === i}
                onClick={() => openDrawer(service, i)}
              />
            ))}
          </motion.div>

          {/* ── Mobile Horizontal Scroll (< md) ── */}
          <div className="md:hidden px-4 sm:px-6">
            <div
              className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
            >
              {SERVICES.map((service, i) => (
                <div key={service.number} className="snap-start flex-shrink-0">
                  <MobileCard
                    service={service}
                    index={i}
                    onClick={() => openDrawer(service, i)}
                  />
                </div>
              ))}
              {/* Trailing padding spacer */}
              <div className="flex-shrink-0 w-4 sm:w-6" aria-hidden="true" />
            </div>
            <p
              className="text-center text-[10px] font-body font-semibold tracking-widest uppercase mt-3"
              style={{ color: "rgba(30,30,20,0.25)" }}
            >
              Scroll to explore →
            </p>
          </div>

        </div>
      </section>

      {/* ── Drawer (portal-level z-index, above navbar) ── */}
      <ServiceDrawer service={activeService} onClose={closeDrawer} />
    </>
  );
}