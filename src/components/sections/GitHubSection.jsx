import { motion } from "framer-motion";
import { FiStar, FiGitBranch } from "react-icons/fi";
import { SectionHeader } from "../ui/SectionHeader";
import { StaggerContainer, StaggerItem, FadeUp } from "../ui/FadeUp";
import { GitHubIllustration } from "../illustrations/GitHubIllustration";
import { useGitHubRepos, formatDate, inferTechStack } from "../../hooks/useGitHubRepos";
import { TOP_LANGUAGES, SITE } from "../../data/constants";

function ContributionGraph() {
  const weeks = 26;
  const days = 7;
  const levels = [0, 1, 2, 3, 4];

  const cells = Array.from({ length: weeks * days }, (_, i) => {
    const level = levels[(i * 7 + (i % 5)) % levels.length];
    const opacity = [0.08, 0.2, 0.4, 0.65, 1][level];
    return { i, opacity };
  });

  return (
    <div className="overflow-x-auto">
      <div
        className="inline-grid gap-1"
        style={{ gridTemplateColumns: `repeat(${weeks}, 12px)`, gridTemplateRows: `repeat(7, 12px)` }}
      >
        {cells.map(({ i, opacity }) => (
          <motion.div
            key={i}
            className="h-3 w-3 rounded-sm bg-accent"
            style={{ opacity }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 20) * 0.01, duration: 0.2 }}
          />
        ))}
      </div>
      <p className="mt-3 text-xs text-text-secondary">Contribution activity (visual overview)</p>
    </div>
  );
}

export function GitHubSection() {
  const { repos, loading, error } = useGitHubRepos();
  const pinned = repos.slice(0, 6);

  return (
    <section id="github" className="relative flex min-h-screen items-center overflow-hidden bg-bg-secondary py-24">
      <div className="pointer-events-none absolute right-0 top-1/4 opacity-30">
        <GitHubIllustration />
      </div>

      <div className="section-container relative z-10">
        <SectionHeader
          badge="GitHub"
          title="Open source & continuous building."
          description="Live data from my public repositories — explore what I'm shipping and maintaining."
        />

        <motion.div className="mt-12 grid gap-6 lg:grid-cols-3">
          <FadeUp className="card-premium p-6 lg:col-span-2">
            <h3 className="mb-4 text-sm font-semibold text-text-primary">Contribution Graph</h3>
            <ContributionGraph />
          </FadeUp>

          <FadeUp delay={0.1} className="card-premium p-6">
            <h3 className="mb-4 text-sm font-semibold text-text-primary">Top Languages</h3>
            <ul className="space-y-4">
              {TOP_LANGUAGES.map((lang) => (
                <li key={lang.name}>
                  <motion.div className="flex justify-between text-sm mb-1.5">
                    <span className="text-text-primary">{lang.name}</span>
                    <span className="text-text-secondary">{lang.percent}%</span>
                  </motion.div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-bg-secondary">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: lang.color, width: `${lang.percent}%` }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </FadeUp>
        </motion.div>

        <motion.div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Public Repos", value: loading ? "—" : repos.length },
            { label: "Total Stars", value: loading ? "—" : repos.reduce((s, r) => s + r.stargazers_count, 0) },
            { label: "Profile", value: "@musharraf10" },
          ].map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.05} className="card-premium p-5 text-center">
              <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
              <p className="mt-1 text-sm text-text-secondary">{stat.label}</p>
            </FadeUp>
          ))}
        </motion.div>

        <div className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-text-primary">Pinned Repositories</h3>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent hover:opacity-80"
            >
              View profile →
            </a>
          </div>

          {loading && (
            <p className="text-text-secondary">Loading repositories...</p>
          )}
          {error && (
            <p className="text-text-secondary">
              Unable to load repos.{" "}
              <a href={SITE.github} className="text-accent underline">
                Visit GitHub
              </a>
            </p>
          )}

          <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pinned.map((repo) => (
              <StaggerItem key={repo.id}>
                <motion.a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-premium block h-full p-5 transition-colors hover:border-accent/30"
                  whileHover={{ y: -3 }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <FiGitBranch className="h-4 w-4 shrink-0 text-accent" />
                    <span className="flex items-center gap-1 text-xs text-text-secondary">
                      <FiStar className="h-3 w-3" />
                      {repo.stargazers_count}
                    </span>
                  </div>
                  <h4 className="mt-3 font-semibold text-text-primary">{repo.name}</h4>
                  <p className="mt-2 line-clamp-2 text-sm text-text-secondary">
                    {repo.description || "No description provided."}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {inferTechStack(repo).map((t) => (
                      <span key={t} className="badge text-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-text-secondary">
                    Updated {formatDate(repo.updated_at)}
                  </p>
                </motion.a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
