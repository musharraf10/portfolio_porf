import { motion } from "framer-motion";
import { FiArrowUpRight, FiAward, FiCalendar } from "react-icons/fi";
import { SectionHeader } from "../ui/SectionHeader";
import { FadeUp } from "../ui/FadeUp";
import { CERTIFICATES } from "../../data/constants";

export function Certificates() {
  return (
    <section
      id="certificates"
      className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/[0.12] to-white py-24"
    >
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-100/30 blur-3xl" />

      <div className="section-container relative z-10">

        {/* ── HEADER + NEW SVG ── */}
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_420px] mb-16">

          {/* Left - Header */}
          <div>
            <SectionHeader
              badge="Certificates"
              title="Learning. Improving. Growing."
              description="A collection of my certifications and achievements that reflect my dedication to continuous learning."
            />
            <div className="mt-6 h-[3px] w-16 rounded-full bg-accent" />
          </div>

          {/* Right - New SVG (Header Illustration) */}
          <motion.div
            className="hidden lg:block"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative overflow-hidden">
              <img
                src="/svg/certificates.svg"   // ← Change this path if needed
                alt="Certificates Header Illustration"
                className="h-auto w-full max-h-[260px] object-contain"
              />
            </div>
          </motion.div>
        </div>

        {/* ── MAIN LAYOUT: 2×2 Small Cards + SVG ── */}
        <div className="grid gap-8 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px]">

          {/* LEFT: Small Certificates Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {CERTIFICATES.slice(0, 4).map((cert, i) => (
              <FadeUp key={cert.id} delay={i * 0.08}>
                <motion.a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="group relative flex overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
                >
                  {/* Top Accent Bar */}
                  <div
                    className="absolute left-0 top-0 z-10 h-[3px] w-full"
                    style={{ background: cert.color }}
                  />

                  {/* IMAGE - Small Square */}
                  <div className="relative m-4 h-[150px] w-[150px] min-w-[150px] shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="flex flex-1 flex-col justify-between py-5 pr-5 pl-1">
                    <div>
                      <h3 className="text-[1.05rem] font-bold leading-snug tracking-tight text-text-primary">
                        {cert.title}
                      </h3>

                      <div className="mt-3 space-y-[6px]">
                        <div className="flex items-center gap-2 text-text-secondary">
                          <FiAward className="h-[13px] w-[13px] shrink-0 text-slate-400" />
                          <span className="text-[0.8rem] font-medium">{cert.issuer}</span>
                        </div>
                        <div className="flex items-center gap-2 text-text-secondary">
                          <FiCalendar className="h-[13px] w-[13px] shrink-0 text-slate-400" />
                          <span className="text-[0.8rem] font-medium">{cert.year}</span>
                        </div>
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ x: 3 }}
                      className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-[6px] text-[0.78rem] font-semibold text-accent transition-colors duration-300 group-hover:border-blue-200 group-hover:bg-blue-50"
                    >
                      View Certificate
                      <FiArrowUpRight className="h-3.5 w-3.5" />
                    </motion.div>
                  </div>
                </motion.a>
              </FadeUp>
            ))}
          </div>

          {/* RIGHT: Main SVG Illustration */}
          <motion.div
            className="hidden lg:block"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative h-full min-h-[520px] overflow-hidden">

              <div className="absolute inset-0 bg-[radial-gradient(#4F6BFF_0.8px,transparent_1px)] bg-[length:20px_20px] opacity-10" />

              <div className="flex h-full items-center justify-center">
                <img
                  src="/svg/certifications.svg"
                  alt="Certificates Illustration"
                  className="max-h-[420px] w-auto object-contain"
                />
              </div>

              <div className="absolute -right-6 bottom-8 h-40 w-40 rounded-full bg-blue-200/20 blur-3xl" />
              <div className="absolute -left-10 top-12 h-32 w-32 rounded-full bg-violet-200/20 blur-3xl" />
            </div>
          </motion.div>
        </div>

        {/* ── CTA ── */}
        <motion.div whileHover={{ y: -2 }} className="mt-16 flex justify-center">
          <a
            href="https://drive.google.com/drive/folders/1V1jWDM8o8TCy_ZjU_VC0Knf0IDZ9Rncw?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-[1.5rem] border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-accent shadow-sm transition-all hover:border-accent hover:shadow-md"
          >
            <FiAward className="h-5 w-5" />
            View All Certificates
            <FiArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}