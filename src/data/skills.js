import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiTailwindcss,
  SiFramer,
  SiJavascript,
  SiOpenjdk,
  SiGit,
  SiGithub,
  SiPostman,
  SiDocker,
  SiSpringboot,
  SiNextdotjs,
  SiTypescript,
} from "react-icons/si";

export const SKILL_CATEGORIES = [
  {
    id: "frontend",
    title: "Frontend",
    size: "large",
    skills: [
      { name: "React", icon: SiReact, level: "advanced" },
      { name: "Tailwind CSS", icon: SiTailwindcss, level: "advanced" },
      { name: "Framer Motion", icon: SiFramer, level: "intermediate" },
      { name: "JavaScript", icon: SiJavascript, level: "advanced" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    size: "medium",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, level: "advanced" },
      { name: "Express.js", icon: SiExpress, level: "advanced" },
      { name: "Java", icon: SiOpenjdk, level: "intermediate" },
      { name: "Spring Boot", icon: SiSpringboot, level: "learning" },
    ],
  },
  {
    id: "database",
    title: "Database",
    size: "small",
    skills: [
      { name: "MongoDB", icon: SiMongodb, level: "advanced" },
      { name: "MySQL", icon: SiMysql, level: "intermediate" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Platforms",
    size: "medium",
    skills: [
      { name: "Git", icon: SiGit, level: "advanced" },
      { name: "GitHub", icon: SiGithub, level: "advanced" },
      { name: "Postman", icon: SiPostman, level: "advanced" },
      { name: "Docker", icon: SiDocker, level: "learning" },
    ],
  },
  {
    id: "learning",
    title: "Currently Learning",
    size: "small",
    skills: [
      { name: "TypeScript", icon: SiTypescript, level: "learning" },
      { name: "Next.js", icon: SiNextdotjs, level: "learning" },
    ],
  },
];

export const LEVEL_LABELS = {
  advanced: { label: "Proficient", dots: 4 },
  intermediate: { label: "Comfortable", dots: 3 },
  learning: { label: "Learning", dots: 2 },
};
