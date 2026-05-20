import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { FadeUp, FloatingElement } from "../ui/FadeUp";
import { HeroIllustration } from "../illustrations/HeroIllustration";

const techPills = ["React", "Node.js", "MongoDB", "Express"];
const trustBadges = ["MERN Stack", "Clean Code", "Scalable APIs"];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-white pt-20"
    >
      <div className="pointer-events-none absolute -right-32 top-32 h-96 w-96 rounded-full bg-accent-light blur-3xl opacity-60" />
      <div className="pointer-events-none absolute -left-20 bottom-20 h-72 w-72 rounded-full bg-bg-secondary blur-3xl" />

      <div className="section-container grid min-h-[calc(100vh-5rem)] items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 flex flex-col gap-8 lg:order-1">
          <FadeUp>
            <span className="badge border-accent/20 bg-accent-light font-semibold uppercase tracking-widest text-accent">
              Developer
            </span>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h1 className="max-w-4xl text-2xl font-bold leading-tight tracking-tight text-text-primary sm:text-3xl md:text-4xl lg:text-[2.5rem]">
              <span className="underline decoration-dashed decoration-2 underline-offset-4 decoration-blue-500">Welcome</span>{" "}
              to my{" "}
              <span className="text-blue-600">Profile</span>{" "}
              showcasing my{" "}
              <span className="text-blue-600">journey</span>,{" "}
              projects, and growth as a{" "}
              <span className="text-blue-600">developer</span>.
            </h1>
          </FadeUp>

          <FadeUp delay={0.2} className="flex flex-wrap gap-3">
            {techPills.map((pill, i) => (
              <motion.span
                key={pill}
                className="rounded-full border border-black-900 bg-white px-4 py-2 text-sm font-medium text-text-secondary shadow-soft"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
              >
                {pill}
              </motion.span>
            ))}
          </FadeUp>

          <FadeUp delay={0.16} className="flex flex-wrap gap-4">
            <Link to="/projects" className="btn-primary">
              View Projects
              <FiArrowRight />
            </Link>
            <a href="#contact" className="btn-secondary">
              Contact Me
            </a>
          </FadeUp>



          <FadeUp delay={0.24} className="flex flex-wrap gap-4 pt-2">
            {trustBadges.map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-2 text-xs font-medium text-text-secondary"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {badge}
              </span>
            ))}
          </FadeUp>
        </div>

        <div className="order-1 flex justify-center lg:order-2">
          <FloatingElement duration={5} className="w-full max-w-lg">
            <HeroIllustration />
          </FloatingElement>
        </div>
      </div>
    </section>
  );
}
