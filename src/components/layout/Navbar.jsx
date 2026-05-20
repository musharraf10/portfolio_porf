import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { FiDownload } from "react-icons/fi";
import { useScrollNavbar } from "../../hooks/useScrollNavbar";
import { NAV_LINKS, SITE } from "../../data/constants";

export function Navbar() {
  const { scrolled, progress } = useScrollNavbar();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const getHref = (href) => {
    if (href.startsWith("/#")) return isHome ? href.slice(1) : href;
    return href;
  };

  const handleNav = () => setOpen(false);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? "glass-nav" : "bg-transparent"
        }`}
    >
      <div className="h-1 overflow-hidden bg-border">
        <div
          className="h-full bg-accent transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
      </div>
      <nav className="section-container flex h-14 items-center justify-between lg:h-16">
        <Link
          to="/"
          className="flex gap-1 text-xl font-bold tracking-tight text-text-primary"
          onClick={handleNav}
        >
          {SITE.logo.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{
                y: -20,
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                y: [0, -3, 0],
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.08,
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.1,
                },
              }}
              className="inline-block underline decoration-wavy decoration-2 underline-offset-4 decoration-teal-500"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={getHref(link.href)}
              className="text-sm font-medium text-text-secondary transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-text-secondary transition-colors hover:text-accent"
          >
            GitHub
          </a>
          <a href={SITE.resume} className="btn-primary !py-2.5 !px-4 text-xs">
            <FiDownload className="h-4 w-4" />
            Resume
          </a>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-text-primary lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-nav border-t border-border lg:hidden"
          >
            <motion.div className="section-container flex flex-col gap-4 py-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={getHref(link.href)}
                  className="text-base font-medium text-text-primary"
                  onClick={handleNav}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-medium text-text-primary"
              >
                GitHub Profile
              </a>
              <a href={SITE.resume} className="btn-primary w-fit" onClick={handleNav}>
                <FiDownload />
                Download Resume
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
