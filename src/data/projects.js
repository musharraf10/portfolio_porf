export const PROJECTS = [
  {
    id: "focusvault",
    title: "FocusVault",
    description:
      "Productivity app for deep work sessions, task vaults, and distraction-free focus timers with analytics.",
    category: "Frontend",
    featured: true,
    size: "medium",
    tech: ["React", "Framer Motion", "Tailwind"],
    github: "https://github.com/musharraf10",
    live: "#",
    image: "./svg/focusvault.png",
    accent: "#10B981",
  },
  {
    id: "certificate_system",
    title: "Qazi Office Management System",
    description:
      "Digital case and certificate management system for Qazi offices, built to generate Nikah certificates, manage records, preview, print, reprint, and handle supporting documents with a clean office workflow.",
    category: "Full Stack",
    featured: true,
    size: "large",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "Tailwind"],
    github: "https://github.com/musharraf10/certificate_generator",
    live: "https://qazisystem.netlify.app/",
    image: "./svg/certificate-system.png",
    accent: "#6366F1",
  },
  {
    id: "videocall",
    title: "Video Call Application",
    description:
      "Real-time video conferencing with WebRTC, room management, and seamless peer-to-peer communication.",
    category: "MERN",
    featured: true,
    size: "medium",
    tech: ["React", "Node.js", "Socket.io", "WebRTC"],
    github: "https://github.com/musharraf10",
    live: "#",
    image: "./svg/videocall.png",
    accent: "#F59E0B",
  },
  {
    id: "noorfit",
    title: "NoorFit",
    description:
      "Fitness and wellness platform with workout tracking, nutrition insights, and personalized health dashboards.",
    category: "MERN",
    featured: true,
    size: "large",
    tech: ["React", "Node.js", "MongoDB", "Tailwind"],
    github: "https://github.com/musharraf10",
    live: "#",
    image: "./svg/noorfit.png",
    accent: "#5B5BF7",
  },
  {
    id: "task-api",
    title: "REST Task API",
    description:
      "Scalable REST API with JWT authentication, role-based access, and comprehensive API documentation.",
    category: "Backend",
    featured: false,
    size: "small",
    tech: ["Node.js", "Express", "MongoDB"],
    github: "https://github.com/musharraf10",
    live: "#",
    image: "linear-gradient(135deg, #FDF4FF 0%, #F8FAFC 50%, #FAE8FF 100%)",
    accent: "#A855F7",
  },
  {
    id: "java-banking",
    title: "Banking System",
    description:
      "Object-oriented banking application with account management, transactions, and secure data handling.",
    category: "Java",
    featured: false,
    size: "small",
    tech: ["Java", "MySQL", "JDBC"],
    github: "https://github.com/musharraf10",
    live: "#",
    image: "linear-gradient(135deg, #EFF6FF 0%, #F8FAFC 50%, #DBEAFE 100%)",
    accent: "#3B82F6",
  },
  {
    id: "portfolio",
    title: "Developer Portfolio",
    description:
      "Premium minimal portfolio with Framer Motion animations, GitHub integration, and responsive bento layouts.",
    category: "Frontend",
    featured: false,
    size: "medium",
    tech: ["React", "Tailwind", "Framer Motion"],
    github: "https://github.com/musharraf10",
    live: "#",
    image: "linear-gradient(135deg, #EEF0FF 0%, #FFFFFF 50%, #F8FAFC 100%)",
    accent: "#5B5BF7",
  },
];

export const PROJECT_CATEGORIES = [
  "All",
  "MERN",
  "Backend",
  "Frontend",
  "Java",
  "Experimental",
];

export const getFeaturedProjects = () =>
  PROJECTS.filter((p) => p.featured).slice(0, 4);
