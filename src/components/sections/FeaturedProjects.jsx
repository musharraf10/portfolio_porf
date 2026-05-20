import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader";
import { StaggerContainer, StaggerItem } from "../ui/FadeUp";
import { ProjectCard } from "../ui/ProjectCard";
import { getFeaturedProjects } from "../../data/projects";

export function FeaturedProjects() {
  const projects = getFeaturedProjects();

  return (
    <section
      id="projects-preview"
      className="overflow-hidden bg-gradient-to-b from-white via-slate-50/40 to-white py-24"
    >
      <div className="section-container">

        {/* HEADER */}
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

          <SectionHeader
            badge="Featured Work"
            title="Projects that define my craft."
            description="Selected builds showcasing full-stack architecture, polished UI, and real-world problem solving."
          />

          <Link
            to="/projects"
            className="
              inline-flex
              items-center
              gap-3
              self-start
              rounded-full
              border
              border-slate-200
              bg-white
              px-5
              py-3
              text-sm
              font-semibold
              text-accent
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
            "
          >
            View All Projects
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-light">
              <FiArrowRight />
            </span>
          </Link>
        </div>

        {/* MAIN GRID */}
        <StaggerContainer
          className="
            grid
            gap-6
            lg:grid-cols-[1.1fr_1fr]
          "
        >

          {/* LEFT HERO ILLUSTRATION */}
          <StaggerItem
            className="
              relative
              overflow-hidden
              rounded-[2rem]
              border
              border-slate-200/70
              bg-gradient-to-br
              from-blue-50/40
              via-white
              to-slate-50
              p-8
              shadow-sm
              lg:row-span-2
            "
          >

            {/* glow */}
            <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-blue-100/40 blur-3xl" />

            {/* dot pattern */}
            <div className="absolute left-6 top-6 grid grid-cols-6 gap-2 opacity-30">
              {Array.from({ length: 24 }).map((_, i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-blue-300"
                />
              ))}
            </div>

            {/* floating svg */}
            <div className="relative flex h-full flex-col justify-between">

              <motion.img
                src="/svg/projects.svg"
                alt="Project Journey"
                className="
                  mx-auto
                  mt-10
                  w-full
                  max-w-[420px]
                  object-contain
                "
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* bottom text */}
              <div className="mt-10 flex items-end justify-between">

                <div className="max-w-xs">
                  <p className="text-lg font-bold leading-snug text-text-primary">
                    Building digital solutions that create impact and drive results.
                  </p>
                </div>

                <motion.div
                  whileHover={{ scale: 1.08 }}
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-blue-100
                    bg-white
                    shadow-sm
                  "
                >
                  🚀
                </motion.div>
              </div>
            </div>
          </StaggerItem>

          {/* RIGHT PROJECTS */}
          <div className="grid gap-6">

            {projects.slice(0, 2).map((project, index) => (
              <StaggerItem key={project.id}>

                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[2rem]
                    border
                    border-slate-200/70
                    bg-white/90
                    p-6
                    shadow-sm
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:shadow-xl
                  "
                >

                  {/* glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative grid gap-6 lg:grid-cols-[1fr_220px]">

                    {/* LEFT CONTENT */}
                    <div>

                      {/* icon */}
                      <div
                        className={`
                          flex
                          h-14
                          w-14
                          items-center
                          justify-center
                          rounded-2xl
                          ${index === 0
                            ? "bg-blue-50 text-blue-500"
                            : "bg-emerald-50 text-emerald-500"
                          }
                        `}
                      >
                        <span className="text-2xl">
                          {index === 0 ? "🛍️" : "📈"}
                        </span>
                      </div>

                      {/* title */}
                      <h3 className="mt-5 text-3xl font-bold tracking-tight text-text-primary">
                        {project.title}
                      </h3>

                      {/* subtitle */}
                      <p className="mt-1 text-sm font-medium text-text-secondary">
                        {project.subtitle}
                      </p>

                      {/* description */}
                      <p className="mt-5 text-sm leading-relaxed text-text-secondary">
                        {project.description}
                      </p>

                      {/* tech */}
                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.stack?.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className={`
                              rounded-full
                              px-3
                              py-1
                              text-xs
                              font-medium
                              ${index === 0
                                ? "bg-blue-50 text-blue-500"
                                : "bg-emerald-50 text-emerald-500"
                              }
                            `}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="relative hidden overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 lg:block">

                      <img
                        src={project.image}
                        alt={project.title}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-700
                          group-hover:scale-105
                        "
                      />

                      {/* arrow */}
                      <div
                        className={`
                          absolute
                          bottom-4
                          right-4
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-full
                          border
                          bg-white/90
                          shadow-sm
                          ${index === 0
                            ? "border-blue-100 text-blue-500"
                            : "border-emerald-100 text-emerald-500"
                          }
                        `}
                      >
                        <FiArrowRight />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </div>

          {/* LARGE BOTTOM PROJECT */}
          {projects[2] && (
            <StaggerItem className="lg:col-span-2">

              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-slate-200/70
                  bg-gradient-to-r
                  from-violet-50/50
                  via-white
                  to-blue-50/40
                  shadow-sm
                  transition-all
                  duration-300
                  hover:shadow-xl
                "
              >

                <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">

                  {/* LEFT */}
                  <div className="p-8">

                    {/* icon */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-500">
                      🌐
                    </div>

                    {/* title */}
                    <h3 className="mt-6 text-4xl font-bold tracking-tight text-text-primary">
                      {projects[2].title}
                    </h3>

                    {/* subtitle */}
                    <p className="mt-2 text-sm font-medium text-text-secondary">
                      {projects[2].subtitle}
                    </p>

                    {/* desc */}
                    <p className="mt-6 max-w-lg leading-relaxed text-text-secondary">
                      {projects[2].description}
                    </p>

                    {/* stack */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {projects[2].stack?.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="
                            rounded-full
                            bg-violet-50
                            px-3
                            py-1
                            text-xs
                            font-medium
                            text-violet-500
                          "
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* button */}
                    <button
                      className="
                        mt-8
                        inline-flex
                        items-center
                        gap-3
                        text-sm
                        font-semibold
                        text-violet-500
                      "
                    >
                      View Case Study

                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-100 bg-white">
                        <FiArrowRight />
                      </span>
                    </button>
                  </div>

                  {/* RIGHT PREVIEW */}
                  <div className="relative hidden overflow-hidden border-l border-slate-100 lg:block">

                    <img
                      src={projects[2].image}
                      alt={projects[2].title}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-105
                      "
                    />

                    {/* overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          )}
        </StaggerContainer>

        {/* BOTTOM DECORATION */}
        <div className="mt-14 hidden items-center justify-center gap-6 lg:flex">

          <div className="h-px w-40 border-t border-dashed border-blue-200" />

          <motion.div
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-blue-50
              text-xl
            "
          >
            ✨
          </motion.div>

          <p className="max-w-sm text-sm text-text-secondary">
            Each project is a step toward solving real problems and creating meaningful experiences.
          </p>

          <div className="h-px w-40 border-t border-dashed border-blue-200" />
        </div>
      </div>
    </section>
  );
}