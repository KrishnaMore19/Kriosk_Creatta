"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const QUOTIENTS = [
  { abbr: "EQ", label: "Emotional Quotient", desc: "We understand the emotions of our clients before we pitch any idea or content." },
  { abbr: "SQ", label: "Social Quotient", desc: "We reach the right people at the right time through various targeted channels." },
  { abbr: "CQ", label: "Communication Quotient", desc: "We tone it right — sending our message smartly and communicating needs precisely." },
  { abbr: "MQ", label: "Money Quotient", desc: "We invest where it matters, focusing on right marketing and multiplying business." },
  { abbr: "IQ", label: "Intelligence Quotient", desc: "We know whom to trust and where to go for the right work in the market." },
  { abbr: "AQ", label: "Analytical Quotient", desc: "Our calculations are always grounded — aware of market actions and always safe." },
];

function QuotientCard({ item, index }: { item: typeof QUOTIENTS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group p-6 rounded-2xl border border-brand-green/10 bg-white hover:border-brand-green/30 hover:shadow-lg hover:shadow-brand-green/10 transition-all duration-300 cursor-default"
    >
      <div className="flex items-start gap-4">
        <span className="font-display text-3xl font-bold text-brand-green/30 group-hover:text-brand-green transition-colors duration-300 leading-none">
          {item.abbr}
        </span>
        <div>
          <p className="font-body font-semibold text-brand-charcoal text-sm mb-1">{item.label}</p>
          <p className="font-body text-brand-muted text-sm leading-relaxed">{item.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-brand-cream" aria-label="About Kriosk Creata">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — Story */}
          <div ref={ref}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-12 bg-brand-green" />
                <span className="text-brand-green font-body text-sm font-medium tracking-widest uppercase">Our Story</span>
              </div>

              <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-charcoal leading-tight mb-6">
                Heading Towards<br />
                <em className="text-brand-green not-italic">A Quarter Century</em>
              </h2>

              <div className="space-y-4 font-body text-brand-muted leading-relaxed">
                <p>
                  Established on <strong className="text-brand-charcoal">October 26, 2001</strong>, Kriosk Creata Limited Liability Partnership has evolved into one of Ahmedabad's leading creative agencies — transcending our humble beginnings as a designing hub.
                </p>
                <p>
                  We reflect on our accomplishments with pride: years of delivering impactful designs, a diverse portfolio spanning multiple industries, long-standing client relationships built on trust and quality, and a team of talented professionals who embody our creative philosophy.
                </p>
                <p>
                  Today, with <strong className="text-brand-charcoal">8,000+ projects</strong> and over <strong className="text-brand-charcoal">25 consistent clients</strong>, we remain committed to the belief that great design is the intersection of emotion, strategy, and craft.
                </p>
              </div>

              {/* Team highlight */}
              <div className="mt-8 p-6 rounded-2xl bg-brand-warm border border-brand-green/10">
                <p className="font-accent text-lg italic text-brand-charcoal leading-relaxed">
                  &ldquo;At Kriosk Creata, we&apos;re more than just a graphic design company. We are the creative partner your brand deserves.&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-green/20 flex items-center justify-center">
                    <span className="font-display font-bold text-brand-green text-sm">MB</span>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-brand-charcoal text-sm">Mahesh Bhavsar</p>
                    <p className="font-body text-brand-muted text-xs">Managing Director, Kriosk Creata</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — Core Strengths */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8"
            >
              <p className="font-body text-sm text-brand-green font-medium tracking-widest uppercase mb-2">Core Strengths</p>
              <h3 className="font-display text-2xl font-bold text-brand-charcoal">
                The Q&apos;s That Make Us Stand Apart
              </h3>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {QUOTIENTS.map((q, i) => <QuotientCard key={q.abbr} item={q} index={i} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}