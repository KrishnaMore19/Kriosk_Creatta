"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Reel {
  id: number;
  src: string;
  poster: string;
  title: string;
  client: string;
  tag: string;
}

const REELS: Reel[] = [
  { id: 1, src: "/KrioskCreta.video/1.mp4", poster: "https://picsum.photos/seed/kr1/400/711", title: "Brand Identity",   client: "Reliance Foods", tag: "Branding"  },
  { id: 2, src: "/KrioskCreta.video/2.mp4", poster: "https://picsum.photos/seed/kr2/400/711", title: "Digital Campaign", client: "ADA Developers",  tag: "Digital"   },
  { id: 3, src: "/KrioskCreta.video/3.mp4", poster: "https://picsum.photos/seed/kr3/400/711", title: "Motion Design",    client: "Veda Naturals",   tag: "Motion"    },
  { id: 4, src: "/KrioskCreta.video/4.mp4", poster: "https://picsum.photos/seed/kr4/400/711", title: "Packaging Reveal", client: "Tatva Hotels",    tag: "Packaging" },
  { id: 5, src: "/KrioskCreta.video/5.mp4", poster: "https://picsum.photos/seed/kr5/400/711", title: "Social Content",   client: "Zeal Fitness",    tag: "Social"    },
  { id: 6, src: "/KrioskCreta.video/6.mp4", poster: "https://picsum.photos/seed/kr6/400/711", title: "Event Highlight",  client: "Fusion Events",   tag: "Events"    },
];

/* ── adjust if your navbar height differs ── */
const NAV_H = 64;

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400;1,700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Cormorant+Garamond:ital,wght@1,400;1,600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .gs-scroll-wrapper {
    position: relative;
    height: calc(${REELS.length} * (100vh - ${NAV_H}px));
  }

  /* sticky panel sits just below the navbar */
  .gs-sticky {
    position: sticky;
    top: ${NAV_H}px;
    height: calc(100vh - ${NAV_H}px);
    height: calc(100dvh - ${NAV_H}px);
    overflow: hidden;
    background: #f7f4ef;
  }
  .gs-sticky::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 55% 60% at 0% 0%,    rgba(93,114,97,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 45% 50% at 100% 100%, rgba(93,114,97,0.06) 0%, transparent 55%);
    pointer-events: none;
    z-index: 0;
  }

  .gs-layout {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;
  }

  /* ── LEFT column ── */
  .gs-left {
    flex: 0 0 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 18px;
    padding: 32px 24px 32px 48px;
  }

  /* ── RIGHT column ── */
  .gs-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40px 48px 40px 36px;
    border-left: 1px solid rgba(93,114,97,0.10);
    overflow: hidden;
  }

  /* ── vertical dot nav ── */
  .gs-dots {
    display: flex;
    flex-direction: column;
    gap: 9px;
    align-items: center;
    flex-shrink: 0;
  }
  .gs-dot {
    width: 5px;
    height: 5px;
    border-radius: 100px;
    background: rgba(93,114,97,0.22);
    border: none;
    cursor: pointer;
    padding: 0;
    transition: height 0.35s ease, background 0.35s ease;
  }
  .gs-dot.active           { height: 26px; background: #5d7261; }
  .gs-dot:hover:not(.active) { background: rgba(93,114,97,0.45); }

  /* ── horizontal dot nav (mobile only) ── */
  .gs-dots-h {
    display: none;
    flex-direction: row;
    gap: 9px;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .gs-dots-h .gs-dot        { width: 5px;  height: 5px; }
  .gs-dots-h .gs-dot.active { width: 26px; height: 5px; }

  /* ── reel card ── */
  .gs-card {
    position: relative;
    height: min(82vh, 640px);
    aspect-ratio: 9 / 16;
    border-radius: 20px;
    overflow: hidden;
    background: #111;
    flex-shrink: 0;
    box-shadow:
      0 32px 72px -16px rgba(26,26,26,0.30),
      0 0 0 1px rgba(93,114,97,0.09);
  }

  /* video always fills the card; poster shows until play starts */
  .gs-card-media {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  /* fade-in when video is ready */
  .gs-card-media.ready { animation: gs-fadein 0.4s ease forwards; }
  @keyframes gs-fadein { from { opacity: 0 } to { opacity: 1 } }

  .gs-card-vignette {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0,0,0,0.04) 0%,
      transparent 28%,
      transparent 50%,
      rgba(0,0,0,0.62) 100%
    );
    pointer-events: none;
    z-index: 2;
  }
  .gs-card-badge {
    position: absolute;
    top: 14px; left: 14px;
    z-index: 5;
    font-family: 'DM Sans', sans-serif;
    font-size: 9px; font-weight: 600;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(255,255,255,0.92);
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.2);
    padding: 4px 10px; border-radius: 100px;
  }
  .gs-card-counter {
    position: absolute;
    top: 14px; right: 14px;
    z-index: 5;
    font-family: 'DM Sans', sans-serif;
    font-size: 10px; color: rgba(255,255,255,0.5);
    letter-spacing: 0.06em;
  }
  .gs-card-counter strong { color: #fff; font-weight: 600; }

  /* mute / unmute button */
  .gs-mute {
    position: absolute;
    bottom: 52px; right: 12px;
    z-index: 6;
    width: 32px; height: 32px; border-radius: 50%;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.2);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #fff;
    transition: background 0.2s;
  }
  .gs-mute:hover { background: rgba(255,255,255,0.28); }

  /* unmuted pulse ring so user knows audio is on */
  .gs-mute.unmuted::after {
    content: "";
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 1.5px solid rgba(255,255,255,0.45);
    animation: gs-pulse 1.8s ease-in-out infinite;
  }
  @keyframes gs-pulse {
    0%,100% { transform: scale(1);   opacity: 0.7; }
    50%      { transform: scale(1.2); opacity: 0;   }
  }

  .gs-card-label {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 8px 14px 16px;
    z-index: 5;
    display: flex; flex-direction: column; gap: 2px;
  }
  .gs-card-client {
    font-family: 'DM Sans', sans-serif;
    font-size: 9px; font-weight: 500;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: rgba(255,255,255,0.48);
  }
  .gs-card-title {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 600; color: #fff;
  }

  /* per-reel progress bar at top of card */
  .gs-card-progress {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: rgba(255,255,255,0.14);
    z-index: 7;
  }
  .gs-card-progress-bar {
    height: 100%; background: #fff;
    transition: width 0.2s linear;
  }

  @keyframes nudge-up   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
  @keyframes nudge-down { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)}  }
  .gs-hint-up, .gs-hint-down {
    position: absolute; left: 50%; transform: translateX(-50%);
    z-index: 6; color: rgba(255,255,255,0.35); pointer-events: none;
  }
  .gs-hint-up   { top: 40px; }
  .gs-hint-down { bottom: 40px; }
  .gs-hint-up   svg { animation: nudge-up   1.7s ease-in-out infinite; }
  .gs-hint-down svg { animation: nudge-down 1.7s ease-in-out infinite; }

  /* ── right panel typography ── */
  .gs-eyebrow { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
  .gs-eyebar  { height: 1px; width: 36px; background: #5d7261; flex-shrink: 0; }
  .gs-eyetxt  {
    font-family: 'DM Sans', sans-serif;
    font-size: 10px; font-weight: 500;
    letter-spacing: 0.26em; text-transform: uppercase; color: #5d7261;
  }
  .gs-section-h {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(28px, 3vw, 48px);
    font-weight: 700; color: #1a1a1a;
    line-height: 1.05; letter-spacing: -0.025em;
    margin-bottom: 32px;
  }
  .gs-section-h em { color: #5d7261; font-style: italic; }
  .gs-divider { width: 100%; height: 1px; background: rgba(93,114,97,0.12); margin-bottom: 28px; }

  .gs-detail { display: flex; flex-direction: column; gap: 10px; }
  .gs-detail-num {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 60px; font-weight: 700; line-height: 1;
    color: rgba(93,114,97,0.09); letter-spacing: -0.04em; margin-bottom: -4px;
  }
  .gs-detail-tag {
    display: inline-block;
    font-family: 'DM Sans', sans-serif;
    font-size: 10px; font-weight: 600;
    letter-spacing: 0.2em; text-transform: uppercase; color: #5d7261;
    border: 1px solid rgba(93,114,97,0.38);
    padding: 4px 13px; border-radius: 100px; width: fit-content;
  }
  .gs-detail-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(20px, 2vw, 32px);
    font-weight: 700; color: #1a1a1a; line-height: 1.1; letter-spacing: -0.02em;
  }
  .gs-detail-client {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px; font-weight: 500;
    letter-spacing: 0.16em; text-transform: uppercase; color: #5d7261;
  }
  .gs-detail-body {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; line-height: 1.72; color: #5a5a5a;
  }
  .gs-detail-cta {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 500; letter-spacing: 0.06em;
    color: #5d7261; text-decoration: none;
    padding: 12px 24px; border: 1.5px solid #5d7261;
    border-radius: 100px; width: fit-content;
    position: relative; overflow: hidden; transition: color 0.35s; margin-top: 6px;
  }
  .gs-detail-cta::before {
    content: ""; position: absolute; inset: 0; background: #5d7261; border-radius: 100px;
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.42s cubic-bezier(0.22,1,0.36,1); z-index: -1;
  }
  .gs-detail-cta:hover { color: #fff; }
  .gs-detail-cta:hover::before { transform: scaleX(1); }

  /* progress bar just below the navbar */
  .gs-prog {
    position: fixed;
    top: ${NAV_H}px;
    left: 0; right: 0;
    height: 2px;
    background: rgba(93,114,97,0.12);
    z-index: 100; pointer-events: none;
    opacity: 0; transition: opacity 0.3s;
  }
  .gs-prog.on { opacity: 1; }
  .gs-prog-fill {
    height: 100%;
    background: linear-gradient(90deg, #5d7261, #8aaa8e);
    transition: width 0.12s linear;
  }

  /* footer */
  .gs-footer { background: #f7f4ef; padding: 0 48px; }
  .gs-footer-inner {
    display: flex; align-items: center; gap: 20px;
    padding: 24px 0 32px;
    border-top: 1px solid rgba(93,114,97,0.10);
  }
  .gs-rule { flex: 1; height: 1px; background: rgba(93,114,97,0.12); }
  .gs-tagline {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 14px; font-style: italic; color: #888;
    letter-spacing: 0.02em; white-space: nowrap;
  }

  /* tablet */
  @media (max-width: 900px) {
    .gs-left  { padding: 24px 16px 24px 28px; gap: 14px; flex: 0 0 48%; }
    .gs-right { padding: 28px 28px 28px 24px; }
    .gs-card  { height: min(76vh, 520px); }
    .gs-section-h  { margin-bottom: 20px; }
    .gs-divider    { margin-bottom: 18px; }
    .gs-detail-num { font-size: 48px; }
    .gs-footer { padding: 0 28px; }
  }

  /* mobile — video card only, right panel hidden */
  @media (max-width: 600px) {
    .gs-layout { flex-direction: column; align-items: stretch; }
    .gs-left {
      flex: 1;
      flex-direction: column;
      padding: 20px 20px 16px;
      gap: 14px;
      align-items: center;
      justify-content: center;
    }
    .gs-right  { display: none; }
    .gs-dots   { display: none; }
    .gs-dots-h { display: flex; }
    .gs-card   { height: min(78vh, 560px); border-radius: 20px; }
    .gs-footer { padding: 0 20px; }
    .gs-tagline { white-space: normal; text-align: center; }
    .gs-footer-inner { flex-direction: column; gap: 10px; }
  }
  @media (max-width: 380px) {
    .gs-card { height: min(72vh, 480px); }
  }
`;

/* ─────────────────────────────────────────
   Style injector (client-only to avoid SSR mismatch)
───────────────────────────────────────── */
function Styles(): JSX.Element | null {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <style dangerouslySetInnerHTML={{ __html: CSS }} />;
}

/* ─────────────────────────────────────────
   ReelCard
   KEY FIXES:
   1. Always renders <video> (never swaps to <img>) so there
      is no race between element mount and play().
   2. Resets + plays when reel.src or isActive changes.
   3. Pauses on tab-hide, resumes on tab-show (if still active).
   4. muted state is applied imperatively via ref (React's
      `muted` prop doesn't update after first render).
───────────────────────────────────────── */
interface ReelCardProps {
  reel: Reel;
  index: number;
  total: number;
  isActive: boolean;
  muted: boolean;
  onMuteToggle: () => void;
}

function ReelCard({ reel, index, total, isActive, muted, onMuteToggle }: ReelCardProps) {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const isActiveRef = useRef(isActive); // stable ref for visibility handler
  isActiveRef.current = isActive;

  /* ── 1. Play / pause when section enters or leaves view ── */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive) {
      /* Reset progress bar and play from start */
      setProgress(0);
      v.currentTime = 0;
      const promise = v.play();
      if (promise !== undefined) {
        promise.catch(() => {
          /* Autoplay blocked — happens when not muted.
             Fall back: ensure muted then retry. */
          v.muted = true;
          v.play().catch(() => {});
        });
      }
    } else {
      v.pause();
    }
  }, [isActive]);

  /* ── 2. React when the reel itself changes (scroll advances) ── */
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !isActive) return;
    setProgress(0);
    v.currentTime = 0;
    const promise = v.play();
    if (promise !== undefined) {
      promise.catch(() => {
        v.muted = true;
        v.play().catch(() => {});
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reel.src]);

  /* ── 3. Muted state — must be set imperatively in React ── */
  useEffect(() => {
    const v = videoRef.current;
    if (v) v.muted = muted;
  }, [muted]);

  /* ── 4. Tab visibility — stop audio when user leaves, resume on return ── */
  useEffect(() => {
    const handleVisibility = () => {
      const v = videoRef.current;
      if (!v) return;
      if (document.hidden) {
        v.pause();
      } else if (isActiveRef.current) {
        v.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []); // mount / unmount only — isActiveRef keeps it fresh

  /* ── 5. Progress bar ── */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      if (v.duration) setProgress((v.currentTime / v.duration) * 100);
    };
    v.addEventListener("timeupdate", onTime);
    return () => v.removeEventListener("timeupdate", onTime);
  }, []);

  return (
    <div className="gs-card">
      {/* progress bar */}
      <div className="gs-card-progress">
        <div className="gs-card-progress-bar" style={{ width: `${progress}%` }} />
      </div>

      {/*
        Always render <video> — never swap to <img>.
        The native `poster` attribute shows the thumbnail until the video plays,
        giving the same visual effect without the conditional render race condition.
        `muted` attribute is required for browser autoplay policy.
      */}
      <video
        ref={videoRef}
        key={reel.src}           /* force remount when src changes so poster shows correctly */
        className="gs-card-media"
        src={reel.src}
        poster={reel.poster}
        muted                    /* always start muted for autoplay; toggled imperatively via ref */
        loop
        playsInline
        preload="auto"
        draggable={false}
      />

      <div className="gs-card-vignette" />
      <span className="gs-card-badge">{reel.tag}</span>
      <span className="gs-card-counter">
        <strong>{String(index + 1).padStart(2, "0")}</strong>
        {" / "}
        {String(total).padStart(2, "0")}
      </span>

      {index > 0 && (
        <div className="gs-hint-up">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </div>
      )}
      {index < total - 1 && (
        <div className="gs-hint-down">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      )}

      {/* mute / unmute toggle — pulse ring when audio is on */}
      <button
        className={`gs-mute${!muted ? " unmuted" : ""}`}
        onClick={onMuteToggle}
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted ? (
          /* muted icon */
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          /* unmuted icon */
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </button>

      <div className="gs-card-label">
        <span className="gs-card-client">{reel.client}</span>
        <span className="gs-card-title">{reel.title}</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   ProjectDetail (desktop / tablet only)
───────────────────────────────────────── */
function ProjectDetail({ reel, index }: { reel: Reel; index: number }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={reel.id}
        className="gs-detail"
        initial={{ opacity: 0, y: 14, filter: "blur(3px)" }}
        animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
        exit={{    opacity: 0, y: -10, filter: "blur(2px)" }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: "transform, opacity" }}
      >
        <span className="gs-detail-num">{String(index + 1).padStart(2, "0")}</span>
        <span className="gs-detail-tag">{reel.tag}</span>
        <h3 className="gs-detail-title">{reel.title}</h3>
        <p className="gs-detail-client">Client — {reel.client}</p>
        <p className="gs-detail-body">
          A carefully crafted {reel.tag.toLowerCase()} project that pushed creative
          boundaries and delivered measurable impact for {reel.client}.
        </p>
        <a href="#contact" className="gs-detail-cta">
          View Case Study
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────
   GallerySection — main export
───────────────────────────────────────── */
export default function GallerySection(): JSX.Element {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [muted, setMuted]               = useState(true);  // start muted (browser autoplay requirement)
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isActive, setIsActive]         = useState(false);

  /* ─────────────────────────────────────────
     IntersectionObserver — determines whether
     the gallery section is in view (isActive).
     More reliable than checking rect.top in a
     scroll handler.
  ───────────────────────────────────────── */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        /*
          The section is "active" (video should play) as long as any part
          of the tall scroll wrapper overlaps with the viewport below the nav.
        */
        setIsActive(entry.isIntersecting);
      },
      {
        rootMargin: `-${NAV_H}px 0px 0px 0px`,
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ─────────────────────────────────────────
     Scroll handler — drives currentIndex and
     the page-level progress bar.
  ───────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;

      const rect          = el.getBoundingClientRect();
      const effectiveVH   = window.innerHeight - NAV_H;
      const totalScrollable = el.offsetHeight - effectiveVH;

      /* how far the user has scrolled into this section */
      const scrolledIn = Math.max(0, -(rect.top - NAV_H));
      const progress   = Math.min(1, Math.max(0, scrolledIn / totalScrollable));

      setScrollProgress(progress);

      const step = 1 / REELS.length;
      const idx  = Math.min(REELS.length - 1, Math.floor(progress / step));
      setCurrentIndex(idx);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* scroll to a specific reel when user clicks a dot */
  const scrollToReel = useCallback((idx: number) => {
    const el = wrapperRef.current;
    if (!el) return;
    const effectiveVH     = window.innerHeight - NAV_H;
    const totalScrollable = el.offsetHeight - effectiveVH;
    const step            = 1 / REELS.length;
    const targetProgress  = idx * step + step * 0.1;
    window.scrollTo({ top: el.offsetTop + targetProgress * totalScrollable, behavior: "smooth" });
  }, []);

  /* unmute handler — browser allows audio after a user gesture */
  const handleMuteToggle = useCallback(() => {
    setMuted((m) => !m);
  }, []);

  return (
    <>
      <Styles />

      {/* thin progress bar just below the navbar */}
      <div className={`gs-prog${isActive ? " on" : ""}`}>
        <div className="gs-prog-fill" style={{ width: `${scrollProgress * 100}%` }} />
      </div>

      <div ref={wrapperRef} className="gs-scroll-wrapper">
        <div className="gs-sticky">
          <div className="gs-layout">

            {/* ── LEFT: dots + video card ── */}
            <div className="gs-left">

              {/* vertical dots (desktop / tablet) */}
              <div className="gs-dots">
                {REELS.map((_, i) => (
                  <button
                    key={i}
                    className={`gs-dot${i === currentIndex ? " active" : ""}`}
                    onClick={() => scrollToReel(i)}
                    aria-label={`Project ${i + 1}`}
                  />
                ))}
              </div>

              {/*
                Only ONE ReelCard is ever in the DOM at a time.
                key={currentIndex} forces a full remount when the reel
                changes, so the video element is fresh and poster shows.
              */}
              <ReelCard
                key={currentIndex}
                reel={REELS[currentIndex]}
                index={currentIndex}
                total={REELS.length}
                isActive={isActive}
                muted={muted}
                onMuteToggle={handleMuteToggle}
              />

              {/* horizontal dots (mobile only) */}
              <div className="gs-dots-h">
                {REELS.map((_, i) => (
                  <button
                    key={i}
                    className={`gs-dot${i === currentIndex ? " active" : ""}`}
                    onClick={() => scrollToReel(i)}
                    aria-label={`Project ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* ── RIGHT: header + animated detail (CSS-hidden on mobile) ── */}
            <div className="gs-right">
              <div className="gs-eyebrow">
                <div className="gs-eyebar" />
                <span className="gs-eyetxt">Creative Reel · Gallery</span>
              </div>
              <h2 className="gs-section-h">
                Work That<br /><em>Speaks Louder.</em>
              </h2>
              <div className="gs-divider" />
              <ProjectDetail reel={REELS[currentIndex]} index={currentIndex} />
            </div>

          </div>
        </div>
      </div>

      {/* footer */}
      <div className="gs-footer">
        <div className="gs-footer-inner">
          <div className="gs-rule" />
          <span className="gs-tagline">Where craft meets intention.</span>
          <div className="gs-rule" />
        </div>
      </div>
    </>
  );
}