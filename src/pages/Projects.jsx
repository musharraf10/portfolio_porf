import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiExternalLink, FiGithub, FiSearch, FiStar } from "react-icons/fi";
import { SectionHeader } from "../components/ui/SectionHeader";
import { useGitHubRepos, formatDate, inferTechStack } from "../hooks/useGitHubRepos";

const PROJECT_CATEGORIES = ["All", "MERN", "Backend", "Frontend", "Java", "Experimental"];

function categorizeRepo(repo) {
  const topics = (repo.topics || []).map((topic) => topic.toLowerCase());
  const language = (repo.language || "").toLowerCase();
  const hasTopic = (topic) => topics.includes(topic);

  if (
    hasTopic("mern") ||
    (hasTopic("react") && (hasTopic("node") || hasTopic("express") || hasTopic("mongodb")))
  ) {
    return "MERN";
  }

  if (language === "java") {
    return "Java";
  }

  if (
    ["typescript", "javascript"].includes(language) &&
    (hasTopic("react") || hasTopic("frontend") || repo.name.toLowerCase().includes("react"))
  ) {
    return "Frontend";
  }

  if (
    ["node", "python", "go", "ruby", "rust", "php", "c#", "c++"].includes(language) ||
    hasTopic("backend") ||
    hasTopic("api") ||
    hasTopic("server")
  ) {
    return "Backend";
  }

  return "Experimental";
}

function RepoCard({ repo }) {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-premium block h-full p-6 transition-shadow duration-300 hover:-translate-y-1 hover:shadow-elevated"
      whileHover={{ y: -4 }}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">{repo.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary line-clamp-2">
            {repo.description || "No description available."}
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/10 text-accent">
          <FiGithub className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {inferTechStack(repo).map((tech) => (
          <span key={tech} className="badge text-xs">
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-text-secondary">
        <span className="inline-flex items-center gap-1 rounded-full border border-border/70 px-2 py-1">
          <FiStar className="h-3 w-3" /> {repo.stargazers_count}
        </span>
        <span>{repo.language || "Unknown"}</span>
        <span className="inline-flex items-center gap-1 text-accent">
          <FiExternalLink className="h-3 w-3" /> Open
        </span>
      </div>

      <p className="mt-4 text-xs text-text-secondary">Updated {formatDate(repo.updated_at)}</p>
    </motion.a>
  );
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const { repos, loading, error } = useGitHubRepos();

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return repos.filter((repo) => {
      const category = categorizeRepo(repo);
      const matchesCategory = activeCategory === "All" || category === activeCategory;
      const matchesSearch =
        !query ||
        repo.name.toLowerCase().includes(query) ||
        (repo.description || "").toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, repos, search]);

  return (
    <main className="min-h-screen bg-white pt-28 pb-24">
      <div className="section-container">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary">
            ← Back to home
          </Link>
        </div>

        <SectionHeader
          badge="GitHub"
          title="Live GitHub repositories."
          description="Fetch public repositories from GitHub and explore my latest open-source work with live filtering and search."
        />

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${activeCategory === cat
                  ? "border-accent bg-accent-light text-accent"
                  : "border-border bg-white text-text-secondary hover:border-accent/30"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
            <input
              type="search"
              placeholder="Search repositories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-accent sm:w-64"
            />
          </div>
        </div>

        {error ? (
          <div className="mt-10 rounded-3xl border border-border bg-bg-secondary p-6 text-text-secondary">
            <p className="text-sm">Unable to load GitHub repositories right now.</p>
            <p className="mt-2 text-sm">Please check your connection or visit the GitHub profile directly.</p>
          </div>
        ) : (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(loading ? Array.from({ length: 6 }) : filtered).map((repo, index) => (
              <div
                key={loading ? index : repo.id}
                className={index === 0 && filtered.length > 2 ? "sm:col-span-2 lg:row-span-1" : ""}
              >
                {loading ? (
                  <div className="card-premium h-72 animate-pulse rounded-3xl bg-border" />
                ) : (
                  <RepoCard repo={repo} />
                )}
              </div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && !error && (
          <p className="mt-12 text-center text-text-secondary">No repositories match your filters.</p>
        )}
      </div>
    </main>
  );
}


