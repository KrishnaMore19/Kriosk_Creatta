"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home",     href: "/",          anchor: null       },
  { label: "About",    href: "/#about",    anchor: "about"    },
  { label: "Services", href: "/#services", anchor: "services" },
  { label: "Gallery",  href: "/#gallery",  anchor: "gallery"  },
  { label: "Projects", href: "/projects",  anchor: null       },
  { label: "Contact",  href: "/#contact",  anchor: "contact"  },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActive] = useState("home");

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const sections = ["home", "about", "services", "gallery", "projects", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.35 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [isHome]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    anchor: string | null
  ) => {
    if (!isHome || !anchor) return;
    e.preventDefault();
    setMenuOpen(false);
    document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
  };

  const isActive = (link: (typeof NAV_LINKS)[0]) => {
    if (!isHome) {
      return pathname.startsWith(link.href) && link.href !== "/";
    }
    if (link.anchor) return activeSection === link.anchor;
    return activeSection === "home" && link.href === "/";
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled || menuOpen || !isHome
            ? "bg-brand-cream/95 backdrop-blur-md shadow-sm shadow-brand-green/10 border-b border-brand-green/10"
            : "bg-transparent"
        }`}
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center group flex-shrink-0"
            aria-label="Kriosk Creata — Home"
          >
            <Image
              src="/logo.svg"
              alt="Kriosk Creata Logo"
              width={110}
              height={30}
              style={{ height: "auto" }}
              className="w-[90px] sm:w-[110px] object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.anchor)}
                  className={`relative px-3 lg:px-4 py-2 rounded-full font-body text-sm font-medium transition-colors duration-200 ${
                    isActive(link)
                      ? "text-brand-green"
                      : "text-brand-muted hover:text-brand-green"
                  }`}
                >
                  {link.label}
                  {isActive(link) && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-green"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:block flex-shrink-0">
            <Link
              href={isHome ? "#contact" : "/#contact"}
              onClick={(e) => handleNavClick(e, "contact")}
              className="px-4 lg:px-5 py-2.5 rounded-full bg-brand-green text-white font-body text-sm font-medium hover:bg-brand-green/90 transition-all duration-200 hover:shadow-lg hover:shadow-brand-green/25 hover:-translate-y-px whitespace-nowrap"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-brand-green/10 transition-colors text-brand-charcoal flex-shrink-0"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X className="w-5 h-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[98] md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-16 left-3 right-3 sm:left-4 sm:right-4 z-[99] rounded-2xl bg-white border border-brand-green/10 shadow-xl shadow-brand-green/10 overflow-hidden md:hidden"
            >
              <ul className="flex flex-col py-2" role="list">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => {
                        handleNavClick(e, link.anchor);
                        setMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 px-5 py-3.5 font-body text-sm font-medium transition-colors ${
                        isActive(link)
                          ? "text-brand-green bg-brand-green/5"
                          : "text-brand-charcoal hover:text-brand-green hover:bg-brand-green/5"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${
                          isActive(link) ? "bg-brand-green" : "bg-transparent"
                        }`}
                      />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="px-4 pb-4 pt-2 border-t border-brand-green/10">
                <Link
                  href={isHome ? "#contact" : "/#contact"}
                  onClick={(e) => {
                    handleNavClick(e, "contact");
                    setMenuOpen(false);
                  }}
                  className="block w-full text-center py-3 rounded-xl bg-brand-green text-white font-body text-sm font-medium hover:bg-brand-green/90 transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}