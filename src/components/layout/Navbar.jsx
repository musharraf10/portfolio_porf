import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { FiDownload, FiX } from "react-icons/fi";

import { useScrollNavbar } from "../../hooks/useScrollNavbar";
import { NAV_LINKS, SITE } from "../../data/constants";

export function Navbar() {
  const { scrolled, progress } = useScrollNavbar();

  const [open, setOpen] = useState(false);

  const [showProfile, setShowProfile] = useState(false);

  // controls whether the navbar is visible (hides on scroll down, shows on scroll up)
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  // controls the "this name is clickable" hint — shown until the user discovers it
  const [showNameHint, setShowNameHint] = useState(true);

  const location = useLocation();

  const isHome = location.pathname === "/";

  const getHref = (href) => {
    if (href.startsWith("/#")) return isHome ? href.slice(1) : href;

    return href;
  };

  const handleNav = (e, href) => {
    // If it's a hash link on the home page, handle scroll manually
    if (href.startsWith("#") || href.startsWith("/#")) {
      e.preventDefault(); // Stop default jump behavior
      setOpen(false);     // Close the mobile menu

      // Extract the pure ID selector (e.g., "#about")
      const targetId = href.replace("/", "");
      const element = document.querySelector(targetId);

      if (element) {
        // Small timeout allows the menu animation to start/complete so coordinates match up
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      }
    } else {
      // Normal navigation for external links
      setOpen(false);
    }
  };

  // Hide navbar on scroll down, reveal on scroll up
  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;

      // ignore tiny jitters; only react past a small threshold
      if (Math.abs(diff) < 4) return;

      // always show navbar near the top of the page
      if (currentY < 80) {
        setNavVisible(true);
      } else if (diff > 0) {
        // scrolling down
        setNavVisible(false);
        // also close mobile menu if it was open
        setOpen(false);
      } else {
        // scrolling up
        setNavVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dismiss the "clickable name" hint automatically after a while, or once clicked/profile opened
  useEffect(() => {
    const timer = setTimeout(() => setShowNameHint(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showProfile) setShowNameHint(false);
  }, [showProfile]);

  return (
    <>
      {/* PROGRESS BAR — always visible, independent of navbar hide/show */}
      <div className="fixed top-0 z-[60] h-1 w-full overflow-hidden bg-border">
        <div
          className="
            h-full
            bg-accent
            transition-all
            duration-200
            ease-out
          "
          style={{ width: `${progress}%` }}
        />
      </div>

      <motion.header
        animate={{
          y: navVisible ? 0 : "-100%",
          opacity: navVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`
          fixed
          top-1
          z-50
          w-full
          transition-colors
          duration-300
          ${scrolled ? "glass-nav" : "bg-transparent"}
        `}
      >
        {/* NAVBAR */}
        <nav
          className="
            section-container
            flex
            h-14
            items-center
            justify-between
            lg:h-16
          "
        >

          {/* LOGO */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfile(true);
                setShowNameHint(false);
              }}
              className="
                relative
                flex
                gap-1
                text-xl
                font-bold
                tracking-tight
                text-text-primary
              "
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

                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}

              {/* clickable hint: pulsing dot */}
              <AnimatePresence>
                {showNameHint && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute -right-2.5 -top-1 flex h-2.5 w-2.5"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inline-flex h-full w-full rounded-full bg-accent"
                    />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* clickable hint: tooltip bubble */}
            <AnimatePresence>
              {showNameHint && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="
                    absolute
                    left-1/2
                    top-full
                    z-20
                    mt-2
                    -translate-x-1/2
                    whitespace-nowrap
                    rounded-full
                    bg-slate-900
                    px-3
                    py-1.5
                    text-[11px]
                    font-medium
                    text-white
                    shadow-lg
                  "
                >
                  Tap to view profile
                  <span
                    className="
                      absolute
                      -top-1
                      left-1/2
                      h-2
                      w-2
                      -translate-x-1/2
                      rotate-45
                      bg-slate-900
                    "
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden items-center gap-8 lg:flex">

            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={getHref(link.href)}
                className="
                  text-sm
                  font-medium
                  text-text-secondary
                  transition-colors
                  hover:text-accent
                "
              >
                {link.label}
              </a>
            ))}

            <a
              href={SITE.resume}
              className="btn-primary !px-4 !py-2.5 text-xs"
            >
              <FiDownload className="h-4 w-4" />

              Resume
            </a>
          </div>

          {/* MOBILE MENU */}
          <button
            type="button"
            className="
              rounded-lg
              p-2
              text-text-primary
              lg:hidden
            "
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <HiX className="h-6 w-6" />
            ) : (
              <HiMenu className="h-6 w-6" />
            )}
          </button>
        </nav>

        {/* MOBILE DROPDOWN */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="
                border-t
                border-border
                bg-white
                lg:hidden
              "
            >
              <motion.div
                className="
                  section-container
                  grid
                  grid-cols-2
                  gap-3
                  py-6
                "
              >

                {/* NAV LINKS */}
                {/* NAV LINKS inside Mobile Dropdown */}
                {NAV_LINKS.map((link) => {
                  const computedHref = getHref(link.href);
                  return (
                    <a
                      key={link.label}
                      href={computedHref}
                      onClick={(e) => handleNav(e, computedHref)} // <-- Updated this line
                      className="
        flex
        items-center
        justify-center
        rounded-2xl
        border
        border-slate-200/70
        bg-slate-50
        px-4
        py-4
        text-sm
        font-medium
        text-text-primary
        transition-all
        duration-300
        hover:border-accent/20
        hover:bg-blue-50/50
      "
                    >
                      {link.label}
                    </a>
                  );
                })}

                {/* GITHUB */}
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    col-span-2
                    flex
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-slate-200/70
                    bg-white
                    px-4
                    py-4
                    text-sm
                    font-medium
                    text-text-primary
                    shadow-sm
                    transition-all
                    duration-300
                    hover:border-accent/20
                    hover:bg-blue-50/30
                  "
                >
                  GitHub Profile
                </a>

                {/* RESUME */}
                <a
                  href={SITE.resume}
                  onClick={handleNav}
                  className="
                    btn-primary
                    col-span-2
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    py-4
                  "
                >
                  <FiDownload />

                  Download Resume
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* PROFILE REVEAL */}
      <AnimatePresence>
        {showProfile && (
          <>
            {/* overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="
                fixed
                inset-0
                z-[100]
                bg-black/50
                backdrop-blur-sm
              "
              onClick={() => setShowProfile(false)}
            />

            {/* MOBILE IMAGE REVEAL */}
            <motion.div
              initial={{
                y: "-100%",
              }}

              animate={{
                y: 0,
              }}

              exit={{
                y: "-100%",
              }}

              transition={{
                type: "spring",
                stiffness: 70,
                damping: 18,
              }}

              className="
                fixed
                inset-x-0
                top-0
                z-[110]
                overflow-hidden
                rounded-b-[2.5rem]
                bg-white
                shadow-2xl
                lg:hidden
              "
            >

              {/* close */}
              <button
                onClick={() => setShowProfile(false)}
                className="
                  absolute
                  right-5
                  top-5
                  z-10
                  rounded-full
                  bg-white/80
                  p-2
                  backdrop-blur-md
                "
              >
                <FiX className="h-5 w-5" />
              </button>

              {/* image */}
              <motion.img
                initial={{
                  scale: 1.1,
                  opacity: 0,
                }}

                animate={{
                  scale: 1,
                  opacity: 1,
                }}

                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}

                src="./svg/myposter.jpeg"
                alt="Portfolio of Shaik Musharaf, showcasing projects, skills, and experience in web development, React, Java, and problem solving."

                className="
                  h-[75vh]
                  w-full
                  object-cover
                "
              />
            </motion.div>

            {/* DESKTOP MODAL */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.92,
                y: 30,
              }}

              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}

              exit={{
                opacity: 0,
                scale: 0.92,
                y: 20,
              }}

              transition={{
                type: "spring",
                stiffness: 90,
                damping: 18,
              }}

              className="
                fixed
                left-1/2
                top-1/2
                z-[120]
                hidden
                w-[420px]
                -translate-x-1/2
                -translate-y-1/2
                overflow-hidden
                rounded-[2.5rem]
                border
                border-white/20
                bg-white
                shadow-[0_40px_120px_rgba(0,0,0,0.25)]
                lg:block
              "
            >

              {/* close */}
              <button
                onClick={() => setShowProfile(false)}
                className="
                  absolute
                  right-5
                  top-5
                  z-10
                  rounded-full
                  bg-white/80
                  p-2
                  backdrop-blur-md
                "
              >
                <FiX className="h-5 w-5" />
              </button>

              {/* image */}
              <motion.img
                initial={{
                  scale: 1.08,
                }}

                animate={{
                  scale: 1,
                }}

                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}

                src="./svg/myposter.jpeg"
                alt="Profile"

                className="
                  h-[620px]
                  w-full
                  object-cover
                "
              />

              {/* bottom content */}
              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  bg-gradient-to-t
                  from-black/80
                  via-black/30
                  to-transparent
                  p-8
                  text-white
                "
              >

                <p className="text-sm uppercase tracking-[0.3em] text-white/70">
                  Full Stack Developer
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  Shaik Musharaf
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  MERN Stack developer focused on building modern,
                  scalable, and premium web experiences.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}