import { motion } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader";
import { FadeUp } from "../ui/FadeUp";
import { CERTIFICATES } from "../../data/constants";

export function Certificates() {
  return (
    <section id="certificates" className="bg-white py-24">
      <div className="section-container">
        <SectionHeader
          badge="Achievements"
          title="Certificates & recognition."
          description="Milestones from internships, coursework, and institutional appreciation."
          align="center"
        />

        <div className="horizontal-scroll mt-12 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory">
          {CERTIFICATES.map((cert, i) => (
            <FadeUp key={cert.id} delay={i * 0.08} className="snap-center shrink-0">
              <motion.div
                className="card-premium w-[280px] overflow-hidden sm:w-[320px]"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="flex h-36 items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${cert.color}15, #F8FAFC)` }}
                >
                  <svg viewBox="0 0 80 80" className="h-16 w-16 opacity-80">
                    <rect x="10" y="15" width="60" height="50" rx="4" fill="white" stroke={cert.color} strokeWidth="1.5" />
                    <line x1="20" y1="30" x2="60" y2="30" stroke={cert.color} strokeWidth="2" opacity="0.4" />
                    <line x1="20" y1="40" x2="50" y2="40" stroke="#EAEAEA" strokeWidth="2" />
                    <line x1="20" y1="50" x2="55" y2="50" stroke="#EAEAEA" strokeWidth="2" />
                    <circle cx="55" cy="55" r="12" fill={cert.color} opacity="0.2" />
                    <path d="M49 55 L53 59 L61 51" stroke={cert.color} strokeWidth="2" fill="none" />
                  </svg>
                </div>
                <div className="p-6">
                  <p className="text-xs font-medium text-accent">{cert.year}</p>
                  <h3 className="mt-1 text-lg font-semibold text-text-primary">{cert.title}</h3>
                  <p className="mt-1 text-sm text-text-secondary">{cert.issuer}</p>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
