import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { SITE } from "../../data/constants";

const socials = [
  { icon: FaGithub, href: SITE.github, label: "GitHub" },
  { icon: FaLinkedin, href: SITE.linkedin, label: "LinkedIn" },
  { icon: FaEnvelope, href: `mailto:${SITE.email}`, label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-secondary py-12">
      <div className="section-container flex flex-col items-center justify-between gap-6 md:flex-row">
        <p className="text-sm text-text-secondary">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-text-secondary transition-all hover:border-accent hover:text-accent"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
        <p className="text-sm text-text-secondary">Built with React & Tailwind</p>
      </div>
    </footer>
  );
}