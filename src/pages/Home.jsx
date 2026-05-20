import { Hero } from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { Skills } from "../components/sections/Skills";
import { Experience } from "../components/sections/Experience";
import { FeaturedProjects } from "../components/sections/FeaturedProjects";
import { GitHubSection } from "../components/sections/GitHubSection";
import { Certificates } from "../components/sections/Certificates";
import { Contact } from "../components/sections/Contact";

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <FeaturedProjects />
      <GitHubSection />
      <Certificates />
      <Contact />
    </>
  );
}
