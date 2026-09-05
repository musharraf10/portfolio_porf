import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

import {
  FiArrowUpRight,
  FiDownload,
} from "react-icons/fi";

import { SectionHeader } from "../ui/SectionHeader";
import { FadeUp } from "../ui/FadeUp";
import { ContactIllustration } from "../illustrations/ContactIllustration";
import { SITE } from "../../data/constants";

const links = [
  {
    icon: FaEnvelope,
    label: "Email",
    href: `mailto:${SITE.email}`,
    text: SITE.email,
    color: "from-blue-50 to-indigo-50",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: SITE.linkedin,
    text: "Connect professionally",
    color: "from-sky-50 to-cyan-50",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    href: SITE.github,
    text: "@musharraf10",
    color: "from-slate-50 to-gray-100",
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="
        relative
        overflow-hidden
        bg-gradient-to-b
        from-bg-secondary
        via-white
        to-bg-secondary
        py-24
      "
    >
      {/* background glow */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-100/30 blur-3xl" />

      <div className="section-container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center">
          {/* Text content - spans 2 cols */}
          <div className="sm:col-span-2 max-w-[680px]">
            <SectionHeader
              badge="Contact"
              title="Let’s build something meaningful."
              description="Open to backend opportunities, freelance collaborations, and innovative product development."
            />
            <div className="mt-8 h-1 w-16 rounded-full bg-accent" />
          </div>

          {/* Profile image - 1 col */}
          <div className="flex justify-center sm:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
              whileHover={{ scale: 1.06, rotate: 2 }}
              whileTap={{ scale: 0.96 }}
              transition={{
                opacity: { duration: 0.6 },
                scale: { duration: 0.6 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
              }}
              className="
      group
      relative
      h-32
      w-32
      sm:h-36
      sm:w-36
      cursor-pointer
      rounded-full
    "
            >
              {/* rotating gradient ring - speeds up on hover */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                whileHover={{ transition: { duration: 1.5, repeat: Infinity, ease: "linear" } }}
                className="
        absolute
        -inset-1
        rounded-full
        bg-[conic-gradient(from_0deg,theme(colors.accent),transparent_60%,theme(colors.accent))]
        opacity-0
        blur-[2px]
        transition-opacity
        duration-300
        group-hover:opacity-70
      "
              />

              {/* image container */}
              <div
                className="
        relative
        h-full
        w-full
        overflow-hidden
        rounded-full
        border-4
        border-white
        shadow-lg
        ring-1
        ring-slate-200/70
        transition-shadow
        duration-300
        group-hover:shadow-2xl
      "
              >
                <img
                  src="./svg/shaik-musharaf.png"
                  alt="Shaik Musharaf"
                  className="
          h-full
          w-full
          object-cover
          transition-transform
          duration-500
          group-hover:scale-110
        "
                />
              </div>

              {/* subtle pulsing ring */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border-2 border-accent/40 pointer-events-none"
              />

              {/* online status dot */}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="
        absolute
        bottom-1
        right-1
        h-4
        w-4
        rounded-full
        border-2
        border-white
        bg-emerald-500
        shadow-sm
      "
              />
            </motion.div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_420px] items-start">

          {/* LEFT CONTENT CONTAINER */}
          <div className="flex flex-col gap-6">

            {/* CONTACT CARDS GRID */}
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              {links.map((link, i) => {
                const Icon = link.icon;

                return (
                  <FadeUp key={link.label} delay={i * 0.08} className="h-full">
                    <motion.a
                      href={link.href}
                      target={link.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.25 }}
                      className="
                        group
                        relative
                        flex
                        h-full
                        flex-col
                        justify-between
                        overflow-hidden
                        rounded-[1.8rem]
                        border
                        border-slate-200/70
                        bg-white
                        p-6
                        shadow-sm
                        transition-all
                        duration-300
                        hover:shadow-xl
                      "
                    >
                      {/* hover overlay */}
                      <div
                        className={`
                          absolute
                          inset-0
                          bg-gradient-to-br
                          ${link.color}
                          opacity-0
                          transition-opacity
                          duration-300
                          group-hover:opacity-100
                        `}
                      />

                      <div className="relative z-10 flex h-full flex-col justify-between">
                        <div>
                          {/* icon */}
                          <div
                            className="
                              flex
                              h-12
                              w-12
                              items-center
                              justify-center
                              rounded-xl
                              bg-blue-50
                              text-accent
                            "
                          >
                            <Icon className="h-5 w-5" />
                          </div>

                          {/* content */}
                          <div className="mt-5">
                            <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary opacity-70">
                              {link.label}
                            </p>
                            <h3 className="mt-2 text-base font-semibold text-text-primary break-all">
                              {link.text}
                            </h3>
                          </div>
                        </div>

                        {/* button */}
                        <motion.div
                          whileHover={{ x: 4 }}
                          className="
                            mt-6
                            inline-flex
                            items-center
                            gap-2
                            text-sm
                            font-semibold
                            text-accent
                          "
                        >
                          Open Link
                          <FiArrowUpRight className="h-4 w-4" />
                        </motion.div>
                      </div>
                    </motion.a>
                  </FadeUp>
                );
              })}
            </div>

            {/* RESUME CARD */}
            <FadeUp delay={0.3}>
              <motion.a
                href={SITE.resume}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.25 }}
                className="
                  group
                  relative
                  block
                  overflow-hidden
                  rounded-[1.8rem]
                  border
                  border-accent/20
                  bg-white
                  p-6
                  shadow-sm
                  transition-all
                  duration-300
                  hover:shadow-xl
                "
              >
                {/* overlay */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-br
                    from-blue-50/70
                    via-transparent
                    to-violet-50/40
                    opacity-0
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                  "
                />

                <div
                  className="
                    relative
                    z-10
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    justify-between
                    gap-6
                  "
                >
                  {/* LEFT */}
                  <div className="flex items-start sm:items-center gap-5">
                    <div
                      className="
                        flex
                        h-14
                        w-14
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        bg-accent-light
                        text-accent
                      "
                    >
                      <FiDownload className="h-6 w-6" />
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary opacity-70">
                        Resume
                      </p>
                      <h3 className="mt-1 text-xl font-bold text-text-primary">
                        Download CV
                      </h3>
                      <p className="mt-1 text-sm text-text-secondary">
                        Backend-focused MERN developer portfolio resume.
                      </p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="
                      inline-flex
                      self-start
                      sm:self-auto
                      items-center
                      gap-2
                      rounded-xl
                      bg-slate-50
                      group-hover:bg-white
                      px-5
                      py-3
                      text-sm
                      font-semibold
                      text-accent
                      shadow-sm
                      transition-colors
                    "
                  >
                    Download
                    <FiArrowUpRight className="h-4 w-4" />
                  </motion.div>
                </div>
              </motion.a>
            </FadeUp>
          </div>

          {/* RIGHT SVG/ILLUSTRATION CONTAINER */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              relative
              hidden
              h-full
              min-h-[400px]
              flex-col
              items-center
              justify-between
              overflow-hidden
              p-6
              lg:flex
            "
          >
            {/* status badge */}
            <div className="flex w-full justify-end">
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-white
                  px-4
                  py-1.5
                  text-xs
                  font-medium
                  text-slate-700
                  shadow-sm
                  border
                  border-slate-100
                "
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Available for Work
              </motion.div>
            </div>

            {/* illustration */}
            <div className="w-full max-w-[280px] my-4">
              <img
                src="/svg/contact.svg"
                alt="Contact Illustration"
                className="scale-105 object-contain mx-auto"
              />
            </div>

            <div class="badge-base LI-profile-badge" data-locale="en_US" data-size="large" data-theme="light" data-type="VERTICAL" data-vanity="skmusharaf01" data-version="v1"><a class="badge-base__link LI-simple-link" href="https://in.linkedin.com/in/skmusharaf01?trk=profile-badge"></a></div>
              

            {/* bottom content */}
            <div
              className="
                w-full
                rounded-2xl
                border
                border-white/60
                bg-white/80
                p-4
                text-center
                text-sm
                font-medium
                text-slate-600
                shadow-sm
                backdrop-blur-md
              "
            >
              Thanks for Visiting 🙏
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
