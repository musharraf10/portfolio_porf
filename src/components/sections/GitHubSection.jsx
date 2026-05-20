import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiGitBranch,
  FiStar,
} from "react-icons/fi";

import { SectionHeader } from "../ui/SectionHeader";
import {
  StaggerContainer,
  StaggerItem,
} from "../ui/FadeUp";

import {
  useGitHubRepos,
  formatDate,
  inferTechStack,
} from "../../hooks/useGitHubRepos";

import { SITE } from "../../data/constants";

export function GitHubSection() {
  const { repos, loading, error } = useGitHubRepos();

  const pinnedRepos = repos.slice(0, 3);

  const recentRepos = [...repos]
    .sort(
      (a, b) =>
        new Date(b.updated_at) -
        new Date(a.updated_at)
    )
    .slice(0, 4);

  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );

  const totalForks = repos.reduce(
    (sum, repo) => sum + repo.forks_count,
    0
  );

  return (
    <section
      id="github"
      className="
        relative
        overflow-hidden
        bg-gradient-to-b
        from-white
        via-slate-50/40
        to-white
        py-24
      "
    >
      {/* glow bg */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-100/30 blur-3xl" />


      <div className="section-container relative z-10">

        {/* HEADER */}
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_420px]">

          <div>
            <SectionHeader
              badge="GitHub"
              title="Open source & continuous building."
              description="Real-time GitHub repositories, technologies, and project activity directly fetched from my public profile."
            />

          </div>

          {/* SVG */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="hidden lg:block"
          >

            <div
              className="
                overflow-hidden
                rounded-[2rem]
                border
                border-none
                bg-gradient-to-br
                from-blue-50
                via-white
                to-violet-50
                p-5
                opacity-90
              "
            >
              <img
                src="/svg/github.svg"
                alt="GitHub"
                className="scale-110 object-contain"
              />
            </div>
          </motion.div>
        </div>

        {/* PINNED REPOS */}
        <div className="mt-5">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-accent">Featured Work</p>
              <h3 className="mt-1 text-3xl font-bold tracking-tight text-text-primary">
                Pinned Repositories
              </h3>
            </div>

            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 text-sm font-semibold text-accent hover:opacity-80 sm:flex"
            >
              Visit GitHub <FiArrowUpRight />
            </a>
          </div>

          {loading && <p className="text-text-secondary">Loading repositories...</p>}
          {error && <p className="text-text-secondary">Failed to load repositories.</p>}

          <StaggerContainer className="grid gap-6 lg:grid-cols-3">
            {pinnedRepos.map((repo, index) => (
              <StaggerItem key={repo.id}>
                <motion.a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.25 }}
                  className="
                    group
                    relative
                    block
                    overflow-hidden
                    rounded-[2rem]
                    border 
                    border-slate-200
                    bg-white                  /* ← Fixed: Stronger background */
                    p-6
                    shadow-md                  /* ← Better shadow */
                    transition-all duration-300
                    hover:shadow-2xl
                    hover:-translate-y-1
                  "
                >

                  {/* hover bg */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative">

                    {/* top */}
                    <div className="flex items-start justify-between">

                      <div
                        className={`
                          flex
                          h-14
                          w-14
                          items-center
                          justify-center
                          rounded-2xl
                          text-white
                          ${index === 0
                            ? "bg-slate-900"
                            : index === 1
                              ? "bg-violet-500"
                              : "bg-blue-500"
                          }
                        `}
                      >
                        {repo.name.charAt(0).toUpperCase()}
                      </div>

                      <FiArrowUpRight className="text-slate-400 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </div>

                    {/* title */}
                    <h4 className="mt-5 text-2xl font-bold tracking-tight text-text-primary">
                      {repo.name}
                    </h4>

                    {/* desc */}
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                      {repo.description ||
                        "No description available."}
                    </p>

                    {/* tech stack */}
                    <div className="mt-6 flex flex-wrap gap-2">

                      {inferTechStack(repo)
                        .slice(0, 4)
                        .map((tech) => (
                          <span
                            key={tech}
                            className="
                              rounded-full
                              bg-slate-100
                              px-3
                              py-1
                              text-xs
                              font-medium
                              text-slate-700
                            "
                          >
                            {tech}
                          </span>
                        ))}
                    </div>

                    {/* bottom */}
                    <div className="mt-8 flex items-center justify-between text-sm text-slate-400">

                      <div className="flex items-center gap-5">

                        <span className="flex items-center gap-1">
                          <FiStar className="h-4 w-4" />
                          {repo.stargazers_count}
                        </span>

                        <span className="flex items-center gap-1">
                          <FiGitBranch className="h-4 w-4" />
                          {repo.forks_count}
                        </span>
                      </div>

                      <span>
                        {formatDate(repo.updated_at)}
                      </span>
                    </div>
                  </div>
                </motion.a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="mt-20">

          <div className="mb-8">
            <p className="text-sm font-medium text-accent">
              Latest Updates
            </p>

            <h3 className="mt-1 text-3xl font-bold tracking-tight text-text-primary">
              Recently Updated
            </h3>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">

            {recentRepos.map((repo) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="
                  group
                  rounded-[2rem]
                  border
                  border-slate-200/70
                  bg-white/80
                  p-6
                  shadow-sm
                  transition-all
                  duration-300
                  hover:shadow-lg
                "
              >

                <div className="flex items-start justify-between gap-4">

                  <div className="min-w-0">

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          h-3
                          w-3
                          rounded-full
                          bg-emerald-500
                        "
                      />

                      <p className="truncate text-lg font-semibold text-text-primary">
                        {repo.name}
                      </p>
                    </div>

                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-secondary">
                      {repo.description ||
                        "No description available."}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">

                      {inferTechStack(repo)
                        .slice(0, 3)
                        .map((tech) => (
                          <span
                            key={tech}
                            className="
                              rounded-full
                              bg-slate-100
                              px-3
                              py-1
                              text-xs
                              font-medium
                              text-slate-600
                            "
                          >
                            {tech}
                          </span>
                        ))}
                    </div>
                  </div>

                  <FiArrowUpRight className="shrink-0 text-slate-400 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-slate-400">

                  <div className="flex items-center gap-5">

                    <span className="flex items-center gap-1">
                      <FiStar className="h-4 w-4" />
                      {repo.stargazers_count}
                    </span>

                    <span className="flex items-center gap-1">
                      <FiGitBranch className="h-4 w-4" />
                      {repo.forks_count}
                    </span>
                  </div>

                  <span>
                    Updated {formatDate(repo.updated_at)}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          whileHover={{ y: -2 }}
          className="
            mt-10
            overflow-hidden
            rounded-[2.5rem]
            border
            border-slate-200/70
            bg-gradient-to-r
            from-white
            via-blue-50/40
            to-violet-50/40
            p-8
            shadow-sm
          "
        >

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-center gap-5">

              <div
                className="
                  flex
                  h-14
                  w-16
                  items-center
                  justify-center
                  rounded-xl
                  bg-white
                  text-3xl
                "
              >
                🚀
              </div>

              <div>
                <h3 className="text-2xl font-bold text-text-primary">
                  Explore More Projects
                </h3>

                <p className="mt-1 text-text-secondary">
                  Visit my GitHub profile to explore all repositories and ongoing work.
                </p>
              </div>
            </div>

            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                items-center
                justify-center
                gap-3
                rounded-2xl
                bg-[#4F6BFF]
                px-8
                py-4
                text-sm
                font-semibold
                text-white
                shadow-lg
                transition-all
                duration-300
                hover:scale-[1.02]
              "
            >
              Open GitHub
              <FiArrowUpRight />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}