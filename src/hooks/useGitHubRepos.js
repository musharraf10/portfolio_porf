import { useState, useEffect } from "react";
import { SITE } from "../data/constants";

export function useGitHubRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchRepos() {
      try {
        const res = await fetch(`${SITE.githubApi}/repos?sort=updated&per_page=12`);
        if (!res.ok) throw new Error("Failed to fetch repositories");
        const data = await res.json();
        if (!cancelled) {
          setRepos(
            data
              .filter((r) => !r.fork)
              .sort((a, b) => b.stargazers_count - a.stargazers_count)
          );
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRepos();
    return () => {
      cancelled = true;
    };
  }, []);

  return { repos, loading, error };
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function inferTechStack(repo) {
  const lang = repo.language;
  const topics = repo.topics || [];
  const stack = lang ? [lang, ...topics] : topics;
  return stack.slice(0, 4);
}
