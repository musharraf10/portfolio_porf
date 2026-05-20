import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { SectionHeader } from "../ui/SectionHeader";
import { FadeUp } from "../ui/FadeUp";
import { ContactIllustration } from "../illustrations/ContactIllustration";
import { SITE } from "../../data/constants";

const links = [
  { icon: FaEnvelope, label: "Email", href: `mailto:${SITE.email}`, text: SITE.email },
  { icon: FaLinkedin, label: "LinkedIn", href: SITE.linkedin, text: "Connect on LinkedIn" },
  { icon: FaGithub, label: "GitHub", href: SITE.github, text: "@musharraf10" },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="flex min-h-screen items-center bg-bg-secondary py-24">
      <div className="section-container grid items-center gap-16 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <ContactIllustration />
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeader
            badge="Contact"
            title="Let's build something great."
            description="Open to collaborations, freelance opportunities, and full-time roles. Reach out anytime."
          />

          <ul className="mt-8 space-y-4">
            {links.map((link) => {
              const Icon = link.icon;
              return (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-border bg-white p-4 transition-colors hover:border-accent/30"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-light text-accent">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-medium text-text-secondary">{link.label}</p>
                    <p className="text-sm font-medium text-text-primary">{link.text}</p>
                  </div>
                </a>
              </li>
            );
            })}
            <li>
              <a
                href={SITE.resume}
                className="flex items-center gap-4 rounded-xl border border-border bg-white p-4 transition-colors hover:border-accent/30"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-light text-accent">
                  <FiDownload className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-medium text-text-secondary">Resume</p>
                  <p className="text-sm font-medium text-text-primary">Download PDF</p>
                </div>
              </a>
            </li>
          </ul>

          <FadeUp className="mt-10">
            <form onSubmit={handleSubmit} className="card-premium space-y-4 p-6">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-text-primary">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-text-primary">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-text-primary">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full resize-none rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
              <AnimatePresence>
                {submitted && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-sm text-accent"
                  >
                    Thanks! Your message has been noted. I'll get back to you soon.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
