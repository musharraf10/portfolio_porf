import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

export function ProjectCard({ project, className = "" }) {
  return (
    <motion.article
      className={`card-premium group relative overflow-hidden ${className}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative h-48 overflow-hidden md:h-56"
        style={{ background: project.image }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "rgba(255,255,255,0.7)" }}
        >
          <motion.div className="flex gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-soft border border-border text-text-primary hover:text-accent"
              aria-label="GitHub"
            >
              <FiGithub className="h-5 w-5" />
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white shadow-soft"
              aria-label="Live demo"
            >
              <FiExternalLink className="h-5 w-5" />
            </a>
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute bottom-4 left-4 h-12 w-12 rounded-xl border border-border bg-white/90 shadow-soft flex items-center justify-center"
          style={{ color: project.accent }}
        >
          <span className="text-lg font-bold">{project.title.charAt(0)}</span>
        </motion.div>
      </motion.div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-text-primary">{project.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-secondary">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="badge text-xs">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
