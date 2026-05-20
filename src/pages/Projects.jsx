import { useState, useMemo } from "react";
import { FiSearch } from "react-icons/fi";
import { SectionHeader } from "../components/ui/SectionHeader";
import { FadeUp, StaggerContainer, StaggerItem } from "../components/ui/FadeUp";
import { ProjectCard } from "../components/ui/ProjectCard";
import { PROJECTS, PROJECT_CATEGORIES } from "../data/projects";

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchCat =
        activeCategory === "All" ||
        p.category === activeCategory ||
        (activeCategory === "Experimental" && p.category === "Frontend");
      const matchSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <main className="min-h-screen bg-white pt-28 pb-24">
      <div className="section-container">
        <SectionHeader
          badge="Portfolio"
          title="All projects."
          description="Explore full-stack applications, backend APIs, and frontend experiments — filter by stack or search by name."
        />

        <FadeUp className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-accent sm:w-64"
            />
          </div>
        </FadeUp>

        <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <StaggerItem
              key={project.id}
              className={i === 0 && filtered.length > 2 ? "sm:col-span-2 lg:row-span-1" : ""}
            >
              <ProjectCard project={project} className="h-full" />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-text-secondary">No projects match your filters.</p>
        )}
      </div>
    </main>
  );
}



// import { createFileRoute, Link } from "@tanstack/react-router";
// import { useEffect, useMemo, useState } from "react";
// import { motion } from "framer-motion";
// import { ArrowLeft, Github, Search, Star, ExternalLink } from "lucide-react";
// import { Reveal } from "@/components/site/Section";
// import { FEATURED } from "@/components/site/Sections";

// export const Route = createFileRoute("/projects")({
//   head: () => ({
//     meta: [
//       { title: "Projects — Shaik Musharaf" },
//       { name: "description", content: "All projects by Shaik Musharaf — MERN, Backend, Frontend, Java and experimental work." },
//     ],
//   }),
//   component: ProjectsPage,
// });

// const TABS = ["All", "MERN", "Backend", "Frontend", "Java", "Experimental"] as const;
// type Tab = (typeof TABS)[number];

// type Repo = {
//   id: number; name: string; html_url: string; description: string | null;
//   stargazers_count: number; updated_at: string; language: string | null;
//   homepage: string | null; topics?: string[];
// };

// function categorize(r: Repo): Tab {
//   const t = (r.topics || []).map((x) => x.toLowerCase());
//   const lang = (r.language || "").toLowerCase();
//   if (t.includes("mern") || (t.includes("react") && (t.includes("node") || t.includes("express") || t.includes("mongodb")))) return "MERN";
//   if (lang === "java") return "Java";
//   if (["typescript", "javascript"].includes(lang) && (t.includes("react") || t.includes("frontend"))) return "Frontend";
//   if (["node", "express"].some((k) => t.includes(k)) || ["go", "python", "ruby"].includes(lang)) return "Backend";
//   return "Experimental";
// }

// function ProjectsPage() {
//   const [tab, setTab] = useState < Tab > ("All");
//   const [q, setQ] = useState("");
//   const [repos, setRepos] = useState < Repo[] > ([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("https://api.github.com/users/musharraf10/repos?per_page=100&sort=updated")
//       .then((r) => (r.ok ? r.json() : []))
//       .then((d: Repo[]) => setRepos(Array.isArray(d) ? d : []))
//       .finally(() => setLoading(false));
//   }, []);

//   const filtered = useMemo(() => {
//     return repos.filter((r) => {
//       const cat = categorize(r);
//       const matchTab = tab === "All" || cat === tab;
//       const matchQ = !q || r.name.toLowerCase().includes(q.toLowerCase()) || (r.description || "").toLowerCase().includes(q.toLowerCase());
//       return matchTab && matchQ;
//     });
//   }, [repos, tab, q]);

//   return (
//     <div className="pt-32 md:pt-36 pb-24">
//       <div className="mx-auto max-w-7xl px-6 md:px-10">
//         <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
//           <ArrowLeft className="h-4 w-4" /> Back to home
//         </Link>

//         <div className="mt-8 max-w-3xl">
//           <span className="inline-flex items-center rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
//             Projects
//           </span>
//           <h1 className="mt-5 text-5xl md:text-7xl font-semibold tracking-[-0.03em] text-foreground text-balance">
//             Everything I've been building.
//           </h1>
//           <p className="mt-5 text-lg text-muted-foreground">
//             A collection of featured work, GitHub repositories and experiments — filterable by category.
//           </p>
//         </div>

//         {/* Featured */}
//         <section className="mt-16">
//           <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-5">Featured</div>
//           <div className="grid lg:grid-cols-12 gap-5">
//             {FEATURED.map((p, i) => (
//               <Reveal key={p.name} className={i === 0 ? "lg:col-span-6" : "lg:col-span-3"} delay={i * 0.05}>
//                 <article className="group h-full rounded-3xl border border-border bg-background overflow-hidden shadow-soft hover:shadow-elevated transition flex flex-col">
//                   <div className={`relative aspect-[16/9] bg-gradient-to-br ${p.accent}`}>
//                     <div className="absolute inset-0 grid-dot-bg opacity-60" />
//                     <div className="absolute inset-0 flex items-center justify-center text-2xl md:text-3xl font-semibold tracking-tight text-foreground/90 px-4 text-center">{p.name}</div>
//                   </div>
//                   <div className="p-5">
//                     <div className="text-xs uppercase tracking-[0.16em] text-primary font-semibold">{p.tag}</div>
//                     <h3 className="mt-2 font-semibold text-foreground">{p.name}</h3>
//                     <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{p.desc}</p>
//                   </div>
//                 </article>
//               </Reveal>
//             ))}
//           </div>
//         </section>

//         {/* Filter bar */}
//         <div className="mt-20 flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div className="flex flex-wrap gap-2">
//             {TABS.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${tab === t ? "text-background" : "text-muted-foreground hover:text-foreground"
//                   }`}
//               >
//                 {tab === t && (
//                   <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-foreground -z-10" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
//                 )}
//                 {t}
//               </button>
//             ))}
//           </div>
//           <div className="relative md:w-80">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <input
//               value={q}
//               onChange={(e) => setQ(e.target.value)}
//               placeholder="Search repositories..."
//               className="w-full rounded-full border border-border bg-background pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
//             />
//           </div>
//         </div>

//         {/* Repos grid */}
//         <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
//           {loading && [...Array(6)].map((_, i) => (
//             <div key={i} className="h-44 rounded-2xl border border-border bg-surface animate-pulse" />
//           ))}

//           {!loading && filtered.map((r, i) => (
//             <Reveal key={r.id} delay={Math.min(i, 8) * 0.03}>
//               <a href={r.html_url} target="_blank" rel="noreferrer" className="group block h-full rounded-2xl border border-border bg-background p-6 shadow-soft hover:shadow-elevated hover:border-primary/40 transition">
//                 <div className="flex items-center justify-between gap-3">
//                   <div className="flex items-center gap-2 min-w-0">
//                     <Github className="h-4 w-4 text-muted-foreground flex-shrink-0" />
//                     <span className="font-semibold text-foreground truncate">{r.name}</span>
//                   </div>
//                   <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Star className="h-3.5 w-3.5" />{r.stargazers_count}</span>
//                 </div>
//                 <p className="mt-3 text-sm text-muted-foreground line-clamp-3 min-h-[3.75rem]">{r.description || "No description provided."}</p>
//                 <div className="mt-5 flex items-center justify-between text-xs">
//                   <span className="inline-flex items-center gap-2 text-muted-foreground">
//                     <span className="h-1.5 w-1.5 rounded-full bg-primary" />
//                     {r.language || "Various"}
//                   </span>
//                   <span className="inline-flex items-center gap-1 text-primary font-medium opacity-0 group-hover:opacity-100 transition">
//                     Visit <ExternalLink className="h-3.5 w-3.5" />
//                   </span>
//                 </div>
//               </a>
//             </Reveal>
//           ))}

//           {!loading && filtered.length === 0 && (
//             <div className="col-span-full rounded-2xl border border-dashed border-border bg-surface py-16 text-center text-sm text-muted-foreground">
//               No repositories match this filter.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
