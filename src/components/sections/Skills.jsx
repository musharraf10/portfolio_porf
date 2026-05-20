import { motion } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader";
import { StaggerContainer, StaggerItem } from "../ui/FadeUp";
import { SkillsIllustration } from "../illustrations/SkillsIllustration";
import { SkillsIllustration2 } from "../illustrations/SkillsIllustration2";
import { SkillsIllustrationHeader } from "../illustrations/SkillsIllustrationheader"
import { SKILL_CATEGORIES, LEVEL_LABELS } from "../../data/skills";

const cardColors = {
  frontend: "from-blue-50 to-blue-100/40 text-blue-500",
  backend: "from-emerald-50 to-emerald-100/40 text-emerald-500",
  database: "from-violet-50 to-violet-100/40 text-violet-500",
  tools: "from-pink-50 to-pink-100/40 text-pink-500",
  learning: "from-amber-50 to-amber-100/40 text-amber-500",
};

export function Skills() {
  return (
    <section id="skills" className="bg-white py-18">
      <div className="section-container">
        {/* HEADER */}
        <div className="relative">

          <div className="max-w-2xl">
            <SectionHeader
              badge="Skills"
              title="Skills I work with daily."
              description="From frontend to backend — the technologies I work with daily."
            />
          </div>

          {/* floating header illustration */}
          <motion.div
            className="pointer-events-none absolute right-0 top-[-40px] hidden w-[260px] opacity-90 lg:block"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <SkillsIllustrationHeader />
          </motion.div>

        </div>

        {/* MAIN GRID */}
        <div className="mt-16 grid gap-5 lg:grid-cols-12">
          {/* LEFT ILLUSTRATIONS */}
          <div className="space-y-5 lg:col-span-4">
            <div className="card-premium overflow-hidden rounded-[2rem] p-6">
              <SkillsIllustration />
            </div>

            <div className="card-premium overflow-hidden rounded-[2rem] p-6">
              <SkillsIllustration2 />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="grid gap-5 lg:col-span-8 lg:grid-cols-3">
            {SKILL_CATEGORIES.map((cat) => {
              const colorClass = cardColors[cat.id];
              const gradient = colorClass?.split(" text-")[0] || "";
              const textColor = colorClass?.split(" ").pop() || "";

              // Get first skill's icon
              const HeaderIcon = cat.skills[0]?.icon;

              return (
                <StaggerItem
                  key={cat.id}
                  className={`group relative overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                  ${cat.id === "tools" ? "lg:col-span-2" : ""}
                `}
                >
                  {/* subtle glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* header */}
                  <div className="relative flex items-start gap-4">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient}`}
                    >
                      {HeaderIcon && <HeaderIcon className={`h-5 w-5 ${textColor}`} />}
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight text-text-primary">
                        {cat.title}
                      </h3>

                      <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                        {cat.id === "frontend" && "Building responsive and beautiful user interfaces"}
                        {cat.id === "backend" && "Server-side logic and API development"}
                        {cat.id === "database" && "Storing and managing application data"}
                        {cat.id === "tools" && "Essential tools for development and deployment"}
                        {cat.id === "learning" && "Technologies I'm exploring and mastering"}
                      </p>
                    </div>
                  </div>

                  {/* divider */}
                  <div className="my-5 h-px bg-slate-100" />

                  {/* skills list */}
                  <ul className="space-y-4">
                    {cat.skills.map((skill) => {
                      const Icon = skill.icon;
                      const level = LEVEL_LABELS[skill.level];

                      return (
                        <motion.li
                          key={skill.name}
                          whileHover={{ x: 4 }}
                          className="flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="h-5 w-5 text-text-primary" />
                            <span className="font-medium text-text-primary">
                              {skill.name}
                            </span>
                          </div>

                          <div className="flex gap-1.5">
                            {[1, 2, 3, 4, 5].map((dot) => (
                              <span
                                key={dot}
                                className={`h-2 w-2 rounded-full transition-all duration-300 ${dot <= (level?.dots ?? 0) ? "bg-blue-500" : "bg-slate-200"
                                  }`}
                              />
                            ))}
                          </div>
                        </motion.li>
                      );
                    })}
                  </ul>
                </StaggerItem>
              );
            })}
          </div>
        </div>

        {/* FOOTER LEGEND */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-text-secondary">
          <div className="flex items-center gap-3">
            <span>Proficiency Level:</span>
          </div>

          {Object.values(LEVEL_LABELS).map((level) => (
            <div key={level.label} className="flex items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((dot) => (
                  <span
                    key={dot}
                    className={`h-2 w-2 rounded-full ${dot <= level.dots ? "bg-blue-500" : "bg-slate-200"
                      }`}
                  />
                ))}
              </div>
              <span>{level.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}