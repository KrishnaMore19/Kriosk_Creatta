"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaBehance } from "react-icons/fa";

const NAV_LINKS = [
  { label: "Home",     href: "#home"     },
  { label: "About",    href: "#about"    },
  { label: "Services", href: "#services" },
  { label: "Gallery",  href: "#gallery"  },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact"  },
];

const SERVICES = [
  "Branding",
  "Graphic Design",
  "Web Development",
  "App Development",
  "Digital Marketing",
  "Content Marketing",
];

const SOCIALS = [
  { label: "Facebook",  href: "https://www.facebook.com/KrioskCreata12",        Icon: FaFacebookF  },
  { label: "Instagram", href: "https://www.instagram.com/krioskcreata/",         Icon: FaInstagram  },
  { label: "LinkedIn",  href: "https://www.linkedin.com/company/kriosk-creata/", Icon: FaLinkedinIn },
  { label: "Behance",   href: "https://www.behance.net/info20b06e6f",            Icon: FaBehance    },
];

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>, href: string) => {
    // On non-home pages the hash anchors won't work — navigate home first
    if (!isHome) {
      window.location.href = `/${href}`;
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-charcoal text-white" role="contentinfo">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8 sm:pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">

          {/* Brand */}
          <div className="sm:col-span-2">
            {/* Logo — FIX: w-auto + height fixed so aspect ratio is always preserved */}
            <div className="mb-5 sm:mb-6">
              <Image
                src="/logo.svg"
                alt="Kriosk Creata"
                width={180}
                height={40}
                style={{ height: "40px", width: "auto" }}
                className="object-contain"
                priority
              />
            </div>

            <p className="font-body text-white/60 text-sm leading-relaxed max-w-xs mb-5 sm:mb-6">
              A leading creative agency in Ahmedabad crafting brands,
              experiences and digital solutions since 2001. Your success is our
              design.
            </p>

            {/* Socials */}
            <div className="flex gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:border-brand-green hover:text-brand-green transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-body text-xs font-semibold text-white/30 uppercase tracking-widest mb-4 sm:mb-5">
              Navigation
            </p>

            <ul className="space-y-2.5 sm:space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-body text-sm text-white/60 hover:text-brand-greenLight transition-colors duration-200 cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="font-body text-xs font-semibold text-white/30 uppercase tracking-widest mb-4 sm:mb-5">
              Services
            </p>

            <ul className="space-y-2.5 sm:space-y-3">
              {SERVICES.map((s) => (
                <li key={s}>
                  <span className="font-body text-sm text-white/60">{s}</span>
                </li>
              ))}
            </ul>

            {/* Contact Card */}
            <div className="mt-6 sm:mt-8 p-4 rounded-2xl border border-white/10 bg-white/5">
              <p className="font-body text-xs text-white/40 mb-1">
                Start a project
              </p>
              <a
                href="tel:+916359303111"
                className="font-body text-sm font-semibold text-brand-greenLight hover:text-brand-green transition-colors"
              >
                +91 6359303111
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-white/30 text-center sm:text-left">
            © {new Date().getFullYear()} Kriosk Creata Limited Liability
            Partnership. All rights reserved.
          </p>

          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/privacy-policy"
              className="font-body text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </Link>

            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-brand-green hover:text-brand-green transition-all duration-200 cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}