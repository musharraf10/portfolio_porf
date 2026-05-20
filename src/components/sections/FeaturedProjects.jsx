import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { SectionHeader } from "../ui/SectionHeader";
import { StaggerContainer, StaggerItem } from "../ui/FadeUp";
import { ProjectCard } from "../ui/ProjectCard";
import { getFeaturedProjects } from "../../data/projects";

const gridClasses = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-2",
];

export function FeaturedProjects() {
  const projects = getFeaturedProjects();

  return (
    <section id="projects-preview" className="flex min-h-screen items-center bg-white py-24">
      <div className="section-container">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            badge="Featured Work"
            title="Projects that define my craft."
            description="Selected builds showcasing full-stack architecture, polished UI, and real-world problem solving."
          />
        </div>

        <StaggerContainer className="grid gap-5 md:grid-cols-3 md:grid-rows-2">
          {projects.map((project, i) => (
            <StaggerItem key={project.id} className={gridClasses[i] || ""}>
              <ProjectCard
                project={project}
                className={`h-full ${i === 0 ? "[&_.relative]:md:h-72" : ""}`}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-12 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:opacity-80"
          >
            View All Projects
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
