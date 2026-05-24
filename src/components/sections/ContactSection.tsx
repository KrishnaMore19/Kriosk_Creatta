"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaBehance, FaWhatsapp } from "react-icons/fa";

const SERVICES_OPTIONS = [
  "Branding", "Graphic Design", "Web Development",
  "App Development", "Digital Marketing", "Content Marketing",
];

const CONTACT_ITEMS = [
  { icon: Phone, label: "Call Us", value: "+91 6359303111 , +91 6359330111", href: "tel:+916359303111" },
  { icon: FaWhatsapp, label: "WhatsApp", value: "+91 6359303111, +91 6359330111", href: "https://wa.me/916359303111" },
  { icon: Mail, label: "Email Us", value: "info@krioskcreatta.com", href: "mailto:info@krioskcreatta.com" },
  { icon: MapPin, label: "Find Us", value: "304, Jeet Complex, Ahmedabad, Gujarat", href: "https://maps.google.com/?q=Ahmedabad+Gujarat" },
];

type FormStatus = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

const INITIAL_FORM: FormData = { name: "", phone: "", email: "", service: "", message: "" };

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status === "loading") return;

    // Basic client-side guard
    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatus("error");
      setStatusMessage("Please fill in your name and phone number.");
      return;
    }

    setStatus("loading");
    setStatusMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json: { success: boolean; message: string } = await res.json();

      if (res.ok && json.success) {
        setStatus("success");
        setStatusMessage(json.message);
        setFormData(INITIAL_FORM);
      } else {
        setStatus("error");
        setStatusMessage(json.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setStatusMessage("Network error. Please check your connection and try again.");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-brand-green/20 bg-brand-cream font-body text-sm text-brand-charcoal placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  const isLoading = status === "loading";

  return (
    <section id="contact" className="section-padding bg-brand-cream" aria-label="Contact us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-12 bg-brand-green" />
            <span className="text-brand-green font-body text-sm font-medium tracking-widest uppercase">Get In Touch</span>
            <span className="h-px w-12 bg-brand-green" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-charcoal mb-4">
            Paint Your<br />
            <em className="text-brand-green not-italic">Questions for Us</em>
          </h2>
          <p className="font-body text-brand-muted max-w-md mx-auto leading-relaxed">
            The market awaits your arrival. Make an impact when you step in — with us.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {CONTACT_ITEMS.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="flex items-start gap-5 p-5 rounded-2xl bg-white border border-brand-green/10 hover:border-brand-green/30 hover:shadow-lg hover:shadow-brand-green/10 transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-green/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-green group-hover:text-white transition-all duration-300 text-brand-green">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-body text-xs text-brand-muted font-medium tracking-wide uppercase mb-0.5">{item.label}</p>
                  <p className="font-body font-semibold text-brand-charcoal">{item.value}</p>
                </div>
              </motion.a>
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="p-5 rounded-2xl bg-brand-warm border border-brand-green/10"
            >
              <p className="font-body text-xs text-brand-muted font-medium tracking-wide uppercase mb-4">Follow Our Work</p>
              <div className="flex gap-3">
                {[
                  { label: "Facebook",  href: "https://www.facebook.com/KrioskCreata12",        Icon: FaFacebookF  },
                  { label: "Instagram", href: "https://www.instagram.com/krioskcreata/",         Icon: FaInstagram  },
                  { label: "LinkedIn",  href: "https://www.linkedin.com/company/kriosk-creata/", Icon: FaLinkedinIn },
                  { label: "Behance",   href: "https://www.behance.net/info20b06e6f",            Icon: FaBehance    },
                ].map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl bg-white border border-brand-green/10 flex items-center justify-center text-brand-green hover:bg-brand-green hover:text-white hover:border-brand-green transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 border border-brand-green/10 shadow-xl shadow-brand-green/5"
          >
            <h3 className="font-display text-2xl font-bold text-brand-charcoal mb-6">Send a Message</h3>

            {/* Status Banner */}
            {(status === "success" || status === "error") && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start gap-3 p-4 rounded-xl mb-5 text-sm font-body ${
                  status === "success"
                    ? "bg-brand-green/10 text-brand-green border border-brand-green/20"
                    : "bg-red-50 text-red-700 border border-red-100"
                }`}
              >
                {status === "success" ? (
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                )}
                <p>{statusMessage}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block font-body text-xs font-medium text-brand-muted uppercase tracking-wide mb-2">
                    Name <span className="text-brand-green">*</span>
                  </label>
                  <input
                    id="name" type="text" required
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block font-body text-xs font-medium text-brand-muted uppercase tracking-wide mb-2">
                    Phone <span className="text-brand-green">*</span>
                  </label>
                  <input
                    id="phone" type="tel" required
                    placeholder="+91 00000 00000"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block font-body text-xs font-medium text-brand-muted uppercase tracking-wide mb-2">Email</label>
                <input
                  id="email" type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="service" className="block font-body text-xs font-medium text-brand-muted uppercase tracking-wide mb-2">Service</label>
                <select
                  id="service"
                  value={formData.service}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="">Select a service...</option>
                  {SERVICES_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block font-body text-xs font-medium text-brand-muted uppercase tracking-wide mb-2">Message</label>
                <textarea
                  id="message" rows={4}
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || status === "success"}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-brand-green text-white font-body font-semibold hover:bg-brand-greenDark transition-all duration-300 hover:shadow-xl hover:shadow-brand-green/30 focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                {isLoading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                ) : status === "success" ? (
                  <><CheckCircle2 className="w-4 h-4" /> Message Sent!</>
                ) : (
                  <><Send className="w-4 h-4" /> Send Message</>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}