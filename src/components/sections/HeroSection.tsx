"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// --- Counting animation hook ---
function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);

  return count;
}

// --- Individual animated stat ---
function AnimatedStat({
  num,
  label,
  started,
}: {
  num: string;
  label: string;
  started: boolean;
}) {
  const match = num.match(/^(\d+)(.*)$/);
  const numericTarget = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const count = useCountUp(numericTarget, 1800, started);

  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-brand-green">
        {started ? `${count}${suffix}` : num}
      </span>
      <span className="font-body text-[10px] sm:text-xs text-brand-muted mt-1 tracking-wide">
        {label}
      </span>
    </div>
  );
}

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = React.useState(true);
  const interacted = useRef(false);

  const statsRef = useRef<HTMLDivElement>(null);
  const [statsStarted, setStatsStarted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().catch(() => {});

    const handleInteraction = () => {
      if (interacted.current) return;
      interacted.current = true;
      video.muted = false;
      setMuted(false);
    };

    // FIX: Scope listeners to #home section only, NOT document.
    // Previously, clicks on "View Our Work" / "Our Story" buttons bubbled up
    // to document and triggered unmute even when navigating away from this section.
    const section = document.querySelector("#home");
    if (section) {
      section.addEventListener("click", handleInteraction, { once: true });
      section.addEventListener("touchstart", handleInteraction, { once: true });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Section back in view — resume playing (stays muted until user interacts)
          video.play().catch(() => {});
        } else {
          // Section out of view — mute audio only, do NOT pause
          video.muted = true;
          interacted.current = false;
          setMuted(true);
        }
      },
      { threshold: 0.2 }
    );

    if (section) observer.observe(section);

    // FIX: Mute video when user switches to another browser tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // User left the tab — mute immediately and reset interaction state
        video.muted = true;
        interacted.current = false;
        setMuted(true);
      }
      // NOTE: We intentionally do NOT unmute on "visible" —
      // the user should have to click the button again to restore audio.
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      if (section) {
        section.removeEventListener("click", handleInteraction);
        section.removeEventListener("touchstart", handleInteraction);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Observe stats section to trigger count-up
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statsStarted) {
          setStatsStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [statsStarted]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    interacted.current = !video.muted;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };
  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const stats = [
    { num: "8000+", label: "Projects Delivered" },
    { num: "25+",   label: "Consistent Clients"  },
    { num: "23+",   label: "Years of Excellence" },
    { num: "6",     label: "Core Services"       },
  ];

  return (
    <motion.section
      id="home"
      className="w-full bg-[var(--brand-cream)] text-[var(--brand-charcoal)]"
      style={{ minHeight: "100vh" }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      aria-label="Hero section"
    >
      <div
        className="flex flex-col items-center justify-center md:flex-row md:items-center md:justify-center w-full"
        style={{ minHeight: "100vh", paddingTop: "80px" }}
      >
        {/* LEFT: Text */}
        <div className="flex flex-col justify-center items-center px-6 py-8 sm:p-8 md:p-12 lg:p-16 w-full md:w-[55%] self-center">

          <motion.div
            className="flex items-center gap-3 mb-6 sm:mb-8 justify-center"
            variants={itemVariants}
          >
            <span className="h-px w-10 sm:w-12 bg-brand-green" />
            <span className="text-brand-green font-body text-[10px] sm:text-xs font-medium tracking-widest uppercase">
              Est. 2001 · Ahmedabad
            </span>
          </motion.div>

          <motion.h1
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-charcoal leading-[1.05] tracking-tight mb-5 sm:mb-6 text-center"
            variants={itemVariants}
          >
            Crafting Brands<br />
            <em className="text-brand-green not-italic">That Leave</em><br />
            A Mark.
          </motion.h1>

          <motion.div
            className="mb-5 sm:mb-6 h-1 w-16 sm:w-20 bg-brand-green mx-auto"
            variants={itemVariants}
          />

          <motion.p
            className="mb-7 sm:mb-8 max-w-md font-body text-sm sm:text-base md:text-lg text-brand-muted leading-relaxed text-center"
            variants={itemVariants}
          >
            We are a full-service creative agency delivering impactful design,
            digital, and brand experiences. Over 8,000 projects. Over two decades of trust.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3 sm:gap-4 mb-10 sm:mb-12 justify-center"
            variants={itemVariants}
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-brand-green text-white font-body text-sm font-medium hover:bg-brand-greenDark transition-all duration-300 hover:shadow-xl hover:shadow-brand-green/30 hover:-translate-y-0.5"
            >
              View Our Work
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full border border-brand-green/30 text-brand-green font-body text-sm font-medium hover:bg-brand-green/5 transition-all duration-300"
            >
              Our Story
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="w-full">
            <div
              ref={statsRef}
              className="grid grid-cols-2 gap-y-5 gap-x-4 sm:grid-cols-4 w-full text-center"
            >
              {stats.map((stat) => (
                <AnimatedStat
                  key={stat.label}
                  num={stat.num}
                  label={stat.label}
                  started={statsStarted}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT: Video */}
        {/* RIGHT: Video */}
<motion.div
  className="flex md:w-[45%] w-full items-center justify-center py-6 md:py-0 self-center"
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 1.0, delay: 0.3 }}
>
  <div
  style={{
    width: "min(300px, 72vw)",
    aspectRatio: "9 / 14",                     // original
    position: "relative",
    borderRadius: "12px 80px 12px 80px",       // original
    overflow: "hidden",
    background: "#000",                        // NEW: fills the empty space around the video
    boxShadow:
      "0 32px 80px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.10)",
  }}
>
  <video
    ref={videoRef}
    muted
    autoPlay
    loop
    playsInline
    preload="auto"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "contain",                    // CHANGED (was "cover")
      objectPosition: "center center",
      transform: "scale(0.9)",                 // NEW: pulls the video away from the curved corners
    }}
  >
    <source src="/videos/Branding_Video_2.mp4" type="video/mp4" />
  </video>

    {/* Gradient overlay */}
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "80px",
        background: "linear-gradient(to top, rgba(0,0,0,0.35), transparent)",
        pointerEvents: "none",
      }}
    />

    {/* Mute toggle button */}
    <button
      onClick={toggleMute}
      aria-label={muted ? "Unmute video" : "Mute video"}
      style={{
        position: "absolute",
        bottom: "16px",
        right: "20px",
        zIndex: 10,
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(6px)",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }}
    >
      {muted ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )}
    </button>
  </div>
</motion.div>
      </div>
    </motion.section>
  );
}