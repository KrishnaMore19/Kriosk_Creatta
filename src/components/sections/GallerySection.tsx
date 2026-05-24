"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView, type PanInfo, type TargetAndTransition } from "framer-motion";

// ── Project data ───────────────────────────────────────────────────────────
const REELS = [
  { id: 1, src: "/KrioskCreta.video/1.mp4",         poster: "https://picsum.photos/seed/kr1/400/711", title: "Brand Identity",    client: "Reliance Foods",  tag: "Branding"  },
  { id: 2, src: "/KrioskCreta.video/2.mp4", poster: "https://picsum.photos/seed/kr2/400/711", title: "Digital Campaign",  client: "ADA Developers",  tag: "Digital"   },
  { id: 3, src: "/KrioskCreta.video/3.mp4",    poster: "https://picsum.photos/seed/kr3/400/711", title: "Motion Design",     client: "Veda Naturals",   tag: "Motion"    },
  { id: 4, src: "/KrioskCreta.video/4.mp4", poster: "https://picsum.photos/seed/kr4/400/711", title: "Packaging Reveal",  client: "Tatva Hotels",    tag: "Packaging" },
  { id: 5, src: "/KrioskCreta.video/5.mp4",   poster: "https://picsum.photos/seed/kr5/400/711", title: "Social Content",    client: "Zeal Fitness",    tag: "Social"    },
  { id: 6, src: "/KrioskCreta.video/6.mp4",  poster: "https://picsum.photos/seed/kr6/400/711", title: "Event Highlight",   client: "Fusion Events",   tag: "Events"    },
];

// ── Styles ─────────────────────────────────────────────────────────────────
const GALLERY_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400;1,700&family=DM+Sans:wght@400;500;600&family=Cormorant+Garamond:ital,wght@1,400;1,600&display=swap');

  /* ── Scroll wrapper — creates the scroll "room" ── */
  .g-scroll-wrapper {
    position: relative;
    /* 100vh per reel + 1 extra to let the last reel breathe before release */
    height: calc(${REELS.length + 1} * 100vh);
  }

  /* ── Section shell — sticky pin ── */
  .g-section {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow: hidden;
    background-color: #f7f4ef;
    display: flex;
    align-items: center;
    max-width: 100vw; /* ✅ prevent horizontal overflow */
  }
  .g-section::before {
    content: ""; position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 0; opacity: 0.65;
  }
  .g-section::after {
    content: ""; position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 0% 0%,    rgba(93,114,97,0.08) 0%, transparent 55%),
      radial-gradient(ellipse 50% 40% at 100% 100%, rgba(93,114,97,0.07) 0%, transparent 50%);
    pointer-events: none; z-index: 0;
  }
  .g-inner {
    position: relative; z-index: 1;
    max-width: 1280px; margin: 0 auto; padding: 0 40px;
    width: 100%;
    box-sizing: border-box; /* ✅ ensure padding doesn't add width */
  }
  @media (max-width: 640px) { .g-inner { padding: 0 18px; } }

  /* ── Header ── */
  .g-header {
    display: flex; align-items: flex-end;
    justify-content: space-between; gap: 24px; flex-wrap: wrap;
    margin-bottom: 48px;
  }
  .g-eyebrow { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
  .g-eyebrow-bar { height: 1px; width: 48px; background: #5d7261; }
  .g-eyebrow-txt {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px; font-weight: 500;
    letter-spacing: 0.26em; text-transform: uppercase; color: #5d7261;
  }
  .g-h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(30px, 4vw, 52px);
    font-weight: 700; color: #1a1a1a;
    line-height: 1.0; letter-spacing: -0.02em;
  }
  .g-h2 em { color: #5d7261; font-style: italic; }

  /* ── Scroll progress bar ── */
  .g-scroll-progress {
    position: fixed;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: rgba(93,114,97,0.15);
    z-index: 100;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .g-scroll-progress.visible { opacity: 1; }
  .g-scroll-progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #5d7261, #8aaa8e);
    transition: width 0.15s linear;
  }

  /* ── Main 2-column body ── */
  .g-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: center;
  }
  @media (max-width: 900px) {
    .g-body { grid-template-columns: 1fr; gap: 32px; }
  }
  @media (max-width: 640px) {
    .g-body { gap: 24px; }
  }

  /* ── Vertical Stack wrapper ── */
  .vs-wrapper {
    position: relative;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media (max-width: 640px) {
    .vs-wrapper { height: 420px; }
  }

  /* ── Card stage ── */
  .vs-stage {
    position: relative;
    width: 240px;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media (max-width: 360px) {
    .vs-stage { width: 200px; height: 340px; }
  }

  /* ── Cards ── */
  .vs-card { position: absolute; cursor: grab; }
  .vs-card:active { cursor: grabbing; }
  .vs-card.is-peek { cursor: pointer; }

  .vs-frame {
    position: relative;
    width: 220px;
    height: 390px;
    border-radius: 20px;
    overflow: hidden;
    background: #ede8e0;
  }
  @media (max-width: 360px) {
    .vs-frame { width: 185px; height: 330px; }
  }

  /* ── Video & image fill — shared class ── */
  .vs-media {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
  }

  .vs-sheen {
    position: absolute; inset: 0; z-index: 2;
    background: linear-gradient(160deg, rgba(255,255,255,0.12) 0%, transparent 50%);
    pointer-events: none; border-radius: 20px;
  }
  .vs-badge {
    position: absolute; top: 12px; left: 12px; z-index: 5;
    font-family: 'DM Sans', sans-serif;
    font-size: 9px; font-weight: 600;
    letter-spacing: 0.16em; text-transform: uppercase; color: #5d7261;
    background: rgba(247,244,239,0.92);
    padding: 4px 10px; border-radius: 100px; backdrop-filter: blur(4px);
  }
  .vs-grad {
    position: absolute; inset: 0; z-index: 3;
    background: linear-gradient(to bottom, transparent 55%, rgba(26,26,26,0.78) 100%);
    pointer-events: none;
  }
  .vs-label {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 10px 14px 14px; z-index: 5;
    display: flex; flex-direction: column; gap: 2px;
  }
  .vs-lbl-client {
    font-family: 'DM Sans', sans-serif;
    font-size: 8px; font-weight: 500;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: rgba(247,244,239,0.6);
  }
  .vs-lbl-title {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px; font-weight: 600; color: #f7f4ef;
  }

  /* ── Mute button ── */
  .vs-mute {
    position: absolute; bottom: 46px; right: 12px; z-index: 6;
    width: 28px; height: 28px; border-radius: 50%;
    background: rgba(247,244,239,0.18); backdrop-filter: blur(6px);
    border: 1px solid rgba(247,244,239,0.35);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #f7f4ef;
    transition: background 0.2s;
  }
  .vs-mute:hover { background: rgba(247,244,239,0.30); }

  /* ── Counter ── */
  .vs-counter {
    position: absolute; left: 0; top: 50%; transform: translateY(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 8px;
  }
  .vs-count-cur {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 36px; font-weight: 300; color: #1a1a1a; line-height: 1;
    letter-spacing: -0.02em;
  }
  .vs-count-rule { width: 1px; height: 28px; background: rgba(93,114,97,0.25); }
  .vs-count-tot {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px; color: #6b6b6b;
  }

  /* ── Dots ── */
  .vs-dots {
    position: absolute; right: 0; top: 50%; transform: translateY(-50%);
    display: flex; flex-direction: column; gap: 8px;
  }
  .vs-dot {
    width: 6px; height: 6px; border-radius: 100px;
    background: rgba(93,114,97,0.3);
    border: none; cursor: pointer;
    transition: height 0.3s, background 0.3s;
  }
  .vs-dot.active { height: 22px; background: #5d7261; }
  .vs-dot:hover:not(.active) { background: rgba(93,114,97,0.55); }

  /* ── Scroll hint ── */
  .vs-hint {
    position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 6px;
    color: #6b6b6b;
    font-family: 'DM Sans', sans-serif;
    font-size: 9px; font-weight: 500;
    letter-spacing: 0.2em; text-transform: uppercase;
  }

  /* ── Project detail panel ── */
  .pd-wrap { display: flex; flex-direction: column; gap: 20px; }
  .pd-num {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 80px; font-weight: 700; line-height: 1;
    color: rgba(93,114,97,0.10); letter-spacing: -0.04em;
  }
  .pd-tag {
    display: inline-block;
    font-family: 'DM Sans', sans-serif;
    font-size: 10px; font-weight: 600;
    letter-spacing: 0.22em; text-transform: uppercase; color: #5d7261;
    border: 1px solid rgba(93,114,97,0.4);
    padding: 5px 14px; border-radius: 100px; width: fit-content;
  }
  .pd-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(28px, 3vw, 40px);
    font-weight: 700; color: #1a1a1a;
    line-height: 1.1; letter-spacing: -0.02em; margin: 0;
  }
  .pd-client {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase; color: #5d7261; margin: 0;
  }
  .pd-body {
    font-family: 'DM Sans', sans-serif;
    font-size: 15px; line-height: 1.7; color: #5a5a5a;
    margin: 0; max-width: 420px;
  }
  .pd-cta {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 500; letter-spacing: 0.06em;
    color: #5d7261; text-decoration: none;
    padding: 13px 24px;
    border: 1.5px solid #5d7261; border-radius: 100px;
    width: fit-content; overflow: hidden; position: relative;
    transition: color 0.35s;
  }
  .pd-cta::before {
    content: ""; position: absolute; inset: 0;
    background: #5d7261; border-radius: 100px;
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.42s cubic-bezier(0.22,1,0.36,1); z-index: -1;
  }
  .pd-cta:hover { color: white; }
  .pd-cta:hover::before { transform: scaleX(1); }

  /* ── Footer wrapper — lives outside sticky section in normal flow ── */
  .g-footer-wrap {
    background-color: #f7f4ef;
    padding: 0 40px;
  }
  @media (max-width: 640px) { .g-footer-wrap { padding: 0 18px; } }

  /* ── Footer ── */
  .g-footer {
    display: flex; align-items: center; gap: 20px;
    max-width: 1280px; margin: 0 auto;
    padding: 32px 0 40px;
  }
  .g-rule { flex: 1; height: 1px; background: rgba(93,114,97,0.15); }
  .g-tagline {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 14px; font-style: italic; color: #6b6b6b;
    white-space: nowrap; letter-spacing: 0.02em;
  }

  /* ── Progress bar for video ── */
  .vs-progress {
    position: absolute; bottom: 0; left: 0; right: 0; height: 2px; z-index: 7;
    background: rgba(255,255,255,0.15);
  }
  .vs-progress-bar {
    height: 100%; background: #5d7261;
    transition: width 0.25s linear;
  }

  /* ── Scroll-to-continue nudge ── */
  .g-continue-nudge {
    position: absolute;
    bottom: 24px;
    right: 40px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #5d7261;
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.5s, transform 0.5s;
    pointer-events: none;
  }
  .g-continue-nudge.show {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 640px) {
    .g-tagline { font-size: 12px; white-space: normal; text-align: center; }
    .g-footer  { flex-direction: column; gap: 12px; }
    .g-header  { margin-bottom: 28px; }
    .g-continue-nudge { right: 18px; }
  }
`;

// ── Client-only style injector ─────────────────────────────────────────────
function GalleryStyles() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return <style dangerouslySetInnerHTML={{ __html: GALLERY_CSS }} />;
}

// ── Single card — handles its own video / image logic ─────────────────────
function ReelCard({
  reel,
  isCurrent,
  isHovered,
  muted,
  onMuteToggle,
  onHoverStart,
  onHoverEnd,
  onClick,
  style,
  drag,
  dragConstraints,
  dragElastic,
  onDragEnd,
}: {
  reel: (typeof REELS)[0];
  isCurrent: boolean;
  isHovered: boolean;
  muted: boolean;
  onMuteToggle: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
  style: TargetAndTransition;
  drag: "y" | false;
  dragConstraints: object;
  dragElastic: number;
  onDragEnd: (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isCurrent) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [isCurrent]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !isCurrent) return;
    const onTime = () => {
      if (v.duration) setProgress((v.currentTime / v.duration) * 100);
    };
    v.addEventListener("timeupdate", onTime);
    return () => v.removeEventListener("timeupdate", onTime);
  }, [isCurrent]);

  const shadow = isCurrent || isHovered
    ? "0 28px 56px -12px rgba(26,26,26,0.28), 0 0 0 1px rgba(93,114,97,0.18)"
    : "0 10px 28px -10px rgba(26,26,26,0.12)";

  return (
    <motion.div
      className="vs-card"
      animate={style}
      transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.9 }}
      drag={drag}
      dragConstraints={dragConstraints}
      dragElastic={dragElastic}
      onDragEnd={onDragEnd}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onClick={onClick}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="vs-frame" style={{ boxShadow: shadow, transition: "box-shadow 0.35s ease" }}>
        <div className="vs-sheen" />

        {isCurrent && (
          <video
            ref={videoRef}
            className="vs-media"
            src={reel.src}
            poster={reel.poster}
            muted={muted}
            loop
            playsInline
            preload="auto"
            draggable={false}
          />
        )}

        {!isCurrent && (
          <img
            src={reel.poster}
            alt={reel.title}
            className="vs-media"
            draggable={false}
            loading="lazy"
          />
        )}

        <span className="vs-badge">{reel.tag}</span>
        <div className="vs-grad" />

        <div className="vs-label">
          <span className="vs-lbl-client">{reel.client}</span>
          <span className="vs-lbl-title">{reel.title}</span>
        </div>

        {isCurrent && (
          <button
            className="vs-mute"
            onClick={(e) => { e.stopPropagation(); onMuteToggle(); }}
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
          </button>
        )}

        {isCurrent && (
          <div className="vs-progress">
            <div className="vs-progress-bar" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Vertical Image Stack ───────────────────────────────────────────────────
// NOTE: Wheel handler is intentionally removed — page scroll controls reel index now.
// Drag is kept for mobile/touch users.
function VerticalImageStack({
  currentIndex,
  setCurrentIndex,
}: {
  currentIndex: number;
  setCurrentIndex: (i: number | ((p: number) => number)) => void;
}) {
  const total = REELS.length;
  const [muted, setMuted] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Mobile drag — still lets users swipe cards directly
  const lastNav = useRef(0);
  const COOLDOWN = 400;

  const navigate = useCallback(
    (dir: number) => {
      const now = Date.now();
      if (now - lastNav.current < COOLDOWN) return;
      lastNav.current = now;
      setCurrentIndex((prev) => {
        if (dir > 0) return prev === total - 1 ? prev : prev + 1;
        return prev === 0 ? prev : prev - 1;
      });
    },
    [total, setCurrentIndex],
  );

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y < -50) navigate(1);
    else if (info.offset.y > 50) navigate(-1);
  };

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    if (diff === 0)  return { y: 0,    scale: 1,    opacity: 1,   zIndex: 5, rotateX: 0   };
    if (diff === -1) return { y: -148, scale: 0.84, opacity: 0.6, zIndex: 4, rotateX: 8   };
    if (diff === -2) return { y: -256, scale: 0.72, opacity: 0.3, zIndex: 3, rotateX: 15  };
    if (diff === 1)  return { y: 148,  scale: 0.84, opacity: 0.6, zIndex: 4, rotateX: -8  };
    if (diff === 2)  return { y: 256,  scale: 0.72, opacity: 0.3, zIndex: 3, rotateX: -15 };
    return { y: diff > 0 ? 380 : -380, scale: 0.6, opacity: 0, zIndex: 0, rotateX: diff > 0 ? -20 : 20 };
  };

  const isVisible = (index: number) => Math.abs(index - currentIndex) <= 2;

  return (
    <div className="vs-wrapper">
      {/* Counter — left */}
      <div className="vs-counter">
        <span className="vs-count-cur">{String(currentIndex + 1).padStart(2, "0")}</span>
        <div className="vs-count-rule" />
        <span className="vs-count-tot">{String(total).padStart(2, "0")}</span>
      </div>

      {/* Card stack — centre */}
      <div className="vs-stage" style={{ perspective: "1200px" }}>
        {REELS.map((reel, index) => {
          if (!isVisible(index)) return null;
          const s = getCardStyle(index);
          const isCurrent = index === currentIndex;
          const isHovered = hoveredIndex === index;

          const hoverY       = isCurrent ? s.y       : s.y * 0.55;
          const hoverScale   = isCurrent ? s.scale   : s.scale * 1.10;
          const hoverOpacity = isCurrent ? s.opacity : Math.min(s.opacity + 0.25, 1);
          const hoverZ       = isCurrent ? s.zIndex  : 6;

          return (
            <ReelCard
              key={reel.id}
              reel={reel}
              isCurrent={isCurrent}
              isHovered={isHovered}
              muted={muted}
              onMuteToggle={() => setMuted((m) => !m)}
              style={{
                y:       isHovered ? hoverY       : s.y,
                scale:   isHovered ? hoverScale   : s.scale,
                opacity: isHovered ? hoverOpacity : s.opacity,
                rotateX: isHovered ? 0            : s.rotateX,
                zIndex:  isHovered ? hoverZ       : s.zIndex,
              }}
              drag={isCurrent ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              onHoverStart={() => { if (!isCurrent) setHoveredIndex(index); }}
              onHoverEnd={()   => { if (!isCurrent) setHoveredIndex(null);  }}
              onClick={() => { if (!isCurrent) setCurrentIndex(index); }}
            />
          );
        })}
      </div>

      {/* Dots — right */}
      <div className="vs-dots">
        {REELS.map((_, i) => (
          <button
            key={i}
            className={`vs-dot${i === currentIndex ? " active" : ""}`}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll hint — bottom */}
      <motion.div
        className="vs-hint"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <motion.svg
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </motion.svg>
        <span>Scroll to explore</span>
      </motion.div>
    </div>
  );
}

// ── Project Detail Panel ───────────────────────────────────────────────────
function ProjectDetail({ reel, index }: { reel: (typeof REELS)[0]; index: number }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={reel.id}
        className="pd-wrap"
        initial={{ opacity: 0, x: 28 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="pd-num">{String(index + 1).padStart(2, "0")}</span>
        <span className="pd-tag">{reel.tag}</span>
        <h3 className="pd-title">{reel.title}</h3>
        <p className="pd-client">Client — {reel.client}</p>
        <p className="pd-body">
          A carefully crafted {reel.tag.toLowerCase()} project that pushed creative
          boundaries and delivered measurable impact for {reel.client}.
        </p>
        <a href="#contact" className="pd-cta">
          View Case Study
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────
export default function GallerySection() {
  const hRef    = useRef(null);
  const hInView = useInView(hRef, { once: true, margin: "-80px" });

  // ── Scroll-jacked state ──────────────────────────────────────────────────
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);  // 0–1 within section
  const [isSectionActive, setIsSectionActive] = useState(false);
  const [isLastReel, setIsLastReel] = useState(false);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const wrapper = scrollWrapperRef.current;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      const wrapperHeight = wrapper.offsetHeight;
      const vh = window.innerHeight;

      // How far we've scrolled into the wrapper (px scrolled past its top)
      const scrolledIn = Math.max(0, -rect.top);
      // Total scrollable distance inside wrapper (wrapper height minus one viewport)
      const totalScrollable = wrapperHeight - vh;
      // Normalised 0→1
      const progress = Math.min(1, Math.max(0, scrolledIn / totalScrollable));

      // Section is "active" when it's pinned (not fully above or below viewport)
      const active = rect.top <= 0 && rect.bottom >= vh;
      setIsSectionActive(active);
      setScrollProgress(progress);

      // Map progress to reel index
      // We use (REELS.length) steps in totalScrollable:
      // step size = totalScrollable / REELS.length
      // But the last reel gets the final extra 1vh of breathing room
      const rawIndex = Math.floor(progress * REELS.length);
      const clampedIndex = Math.min(REELS.length - 1, rawIndex);
      setCurrentIndex(clampedIndex);
      setIsLastReel(clampedIndex === REELS.length - 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <GalleryStyles />

      {/* ── Top progress bar ── */}
      <div className={`g-scroll-progress${isSectionActive ? " visible" : ""}`}>
        <div
          className="g-scroll-progress-bar"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* ── Tall scroll wrapper — gives the page enough height to scroll through all reels ── */}
      <div ref={scrollWrapperRef} className="g-scroll-wrapper">

        {/* ── Sticky section ── */}
        <section id="gallery" className="g-section" aria-label="Work gallery">
          <div className="g-inner">

            {/* ── Header ── */}
            <header className="g-header" ref={hRef}>
              <motion.div
                initial={{ opacity: 0, x: -28 }}
                animate={hInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="g-eyebrow">
                  <div className="g-eyebrow-bar" />
                  <span className="g-eyebrow-txt">Creative Reel · Gallery</span>
                </div>
                <h2 className="g-h2">
                  Work That<br />
                  <em>Speaks Louder.</em>
                </h2>
              </motion.div>
            </header>

            {/* ── Body: Stack + Detail ── */}
            <div className="g-body">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                <VerticalImageStack
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectDetail reel={REELS[currentIndex]} index={currentIndex} />
              </motion.div>
            </div>

            {/* ── "Keep scrolling" nudge — appears on last reel ── */}
            <div className={`g-continue-nudge${isLastReel ? " show" : ""}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
              Continue scrolling
            </div>

          </div>
        </section>

      </div>

      {/* ── Footer tagline — outside sticky section so it's never clipped ── */}
  
    </>
  );
}