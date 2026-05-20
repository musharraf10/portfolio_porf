import { FiCalendar, FiFolder, FiAward, FiTarget } from "react-icons/fi";
import { SectionHeader } from "../ui/SectionHeader";
import { StaggerContainer, StaggerItem } from "../ui/FadeUp";
import { AboutIllustration } from "../illustrations/AboutIllustration";
import { STATS } from "../../data/constants";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const iconMap = {
  calendar: FiCalendar,
  folder: FiFolder,
  award: FiAward,
  target: FiTarget,
};

export function About() {
  const [activeStat, setActiveStat] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setActiveStat((prev) => (prev + 1) % STATS.length);
        setIsAnimating(false);
      }, 600); // animation duration

    }, 5600); // 5s visible + 0.6s transition

    return () => clearInterval(interval);
  }, []);


  return (
    <section
      id="about"
      className="flex min-h-screen items-center bg-bg-secondary py-15"
    >
      <div className="section-container grid items-start gap-16 lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="flex flex-col gap-8 lg:order-1">

          {/* Illustration */}
          <div className="flex justify-center lg:-mt-10">
            <AboutIllustration />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[0, 1].map((offset) => {
              const stat = STATS[(activeStat + offset) % STATS.length];
              const Icon = iconMap[stat.icon];

              return (
                <div
                  key={offset}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 p-4 sm:p-5 shadow-sm backdrop-blur-sm"
                >
                  {/* subtle glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative flex items-start gap-3 sm:gap-4">

                    {/* icon */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 sm:h-12 sm:w-12">
                      <Icon className="h-4 w-4 text-blue-500 sm:h-5 sm:w-5" />
                    </div>

                    {/* animated content */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={stat.id}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="min-w-0"
                      >
                        <p className="text-2xl font-bold tracking-tight text-text-primary">
                          {stat.title}
                        </p>

                        <p className="mt-1 text-sm font-medium text-text-primary">
                          {stat.subtitle}
                        </p>

                        <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                          {stat.description}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* bottom accent */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-500 transition-all duration-500 group-hover:w-full" />
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:order-2">
          <SectionHeader
            badge="About Me"
            title="Engineering with purpose and precision."
            description="I'm Shaik Musharaf, a MERN Stack developer focused on creating modern web applications with practical functionality and thoughtful user experiences."
          />

          <div className="mt-8 space-y-3 leading-relaxed text-text-secondary">
            <p>
              I completed my B.Tech in Information Technology in 2024 and started my journey into full stack development through the MERN stack.
              While building projects, I explored concepts like authentication, payment integration, WebSockets, and scalable backend architecture.
              Every project helped me improve both technically and creatively.
            </p>

            <p>
              I also learned Java and Data Structures & Algorithms, which strengthened my problem-solving skills and understanding of core programming concepts.
              Currently, I’m working as a freelance AI data labeler at Scale AI while continuing to build projects and improve my backend development skills with Node.js.
            </p>

            <p>
              Although I don’t have formal industry experience yet, I enjoy building real-world applications, learning deeply, and growing consistently as a developer.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}