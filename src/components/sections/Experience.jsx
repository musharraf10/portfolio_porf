import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader";
import { FadeUp } from "../ui/FadeUp";
import { EXPERIENCE } from "../../data/constants";

export function Experience() {
  const tlistRef = useRef(null);
  const rowRefs = useRef([]);

  const [roadHeight, setRoadHeight] = useState(2400);
  const [carY, setCarY] = useState(0);

  useEffect(() => {
    const update = () => {
      if (!tlistRef.current) return;

      const lastRow = tlistRef.current.lastElementChild;

      if (lastRow) {
        const total =
          lastRow.offsetTop +
          lastRow.clientHeight * 0.72;

        setRoadHeight(total);
      }
    };

    const t = setTimeout(update, 200);

    const ro = new ResizeObserver(update);

    if (tlistRef.current) {
      ro.observe(tlistRef.current);
    }

    return () => {
      clearTimeout(t);
      ro.disconnect();
    };
  }, []);

  return (
    <section
      id="experience"
      className="overflow-hidden bg-white py-16 sm:py-24"
    >
      <div className="section-container">

        {/* HEADER */}
        <div className="max-w-2xl">
          <SectionHeader
            badge="Experience & Education"
            title="My Journey"
            description="A timeline of my professional growth and academic journey."
          />
        </div>

        {/* MAIN WRAPPER */}
        <div className="relative mt-12">

          {/* ROAD SVG */}
          <svg
            className="pointer-events-none absolute left-1/2 top-0 z-0 hidden -translate-x-1/2 lg:block"
            style={{ width: 100, height: roadHeight }}
            viewBox={`0 0 120 ${roadHeight}`}
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >

            {/* glow */}
            <rect
              x="35"
              y="0"
              width="50"
              height={roadHeight}
              fill="url(#roadGlow)"
              opacity="0.18"
            />

            <defs>
              <linearGradient id="roadGlow" x1="0" x2="1">
                <stop offset="0%" stopColor="#EEF2FF" />
                <stop offset="100%" stopColor="#F8FAFC" />
              </linearGradient>
            </defs>

            {(() => {
              const cx = 60;
              const h = roadHeight;
              const s = h / 4;

              const d = `
                M${cx},0
                C${cx - 14},${s * 0.6}
                ${cx + 14},${s * 1.4}
                ${cx},${s * 2}

                C${cx - 14},${s * 2.6}
                ${cx + 14},${s * 3.4}
                ${cx},${h}
              `;

              return (
                <>
                  {/* outer road */}
                  <path
                    d={d}
                    stroke="#d6dce8"
                    strokeWidth="52"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* inner road */}
                  <path
                    d={d}
                    stroke="white"
                    strokeWidth="40"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* dashed center */}
                  <path
                    d={d}
                    stroke="#d0d8ea"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="20 16"
                  />
                </>
              );
            })()}

            {/* end circle */}
            <circle
              cx="60"
              cy={roadHeight - 18}
              r="10"
              fill="#ffffff"
              stroke="#cbd5e1"
              strokeWidth="3"
            />
          </svg>

          {/* STICKY CAR */}
          <div className="pointer-events-none sticky top-24 z-30 hidden justify-center lg:flex">

            <motion.div
              animate={{
                y: carY,
              }}
              transition={{
                type: "spring",
                stiffness: 70,
                damping: 18,
              }}
              className="relative"
            >

              {/* shadow */}
              <div className="absolute inset-0 top-3 scale-90 rounded-full bg-black/10 blur-md" />

              {/* floating animation */}
              <motion.img
                src="/svg/realistic-car.png"
                alt="Car"
                className="relative w-14 drop-shadow-xl"
                animate={{
                  rotate: [-4, 4, -4],
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>

          {/* TIMELINE */}
          <div
            ref={tlistRef}
            className="relative z-10 mt-4 flex flex-col gap-14 sm:gap-20"
          >

            {EXPERIENCE.map((item, index) => {
              const isLeft = index % 2 !== 0;

              return (
                <FadeUp
                  key={item.id}
                  delay={index * 0.08}
                >

                  <div
                    ref={(el) => (rowRefs.current[index] = el)}
                    className="
                      timeline-row
                      grid
                      gap-6
                      lg:grid-cols-[1fr_90px_1fr]
                      lg:items-center
                    "
                    onMouseEnter={() => {
                      const row = rowRefs.current[index];

                      if (!row || !tlistRef.current) return;

                      const rowTop = row.offsetTop;
                      const rowHeight = row.clientHeight;

                      setCarY(rowTop + rowHeight / 2 - 120);
                    }}
                  >

                    {/* MOBILE CARD */}
                    <div className="lg:hidden">
                      <JourneyCard item={item} />
                    </div>

                    {/* DESKTOP LEFT */}
                    <div className="hidden lg:block">
                      {isLeft ? (
                        <JourneyCard item={item} />
                      ) : (
                        <JourneyIllustration index={index} />
                      )}
                    </div>

                    {/* CENTER DOT */}
                    <div className="hidden lg:flex justify-center">
                      <div
                        className={`h-3 w-3 rounded-full border-2 border-white shadow-[0_0_0_2px_currentColor] ${item.type === "education"
                          ? "bg-emerald-500 text-emerald-500"
                          : "bg-blue-500 text-blue-500"
                          }`}
                      />
                    </div>

                    {/* DESKTOP RIGHT */}
                    <div className="hidden lg:block">
                      {isLeft ? (
                        <JourneyIllustration index={index} />
                      ) : (
                        <JourneyCard item={item} />
                      )}
                    </div>

                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────── CARD ───────────────── */

function JourneyCard({ item }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="
        group
        relative
        overflow-hidden
        rounded-[1.75rem]
        border
        border-slate-200/70
        bg-white/92
        p-4
        shadow-sm
        backdrop-blur-sm
        transition-all
        duration-300
        hover:shadow-xl
        sm:p-5
      "
    >

      {/* glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* top badges */}
      <div className="relative flex flex-wrap items-center justify-between gap-2">

        <span
          className={`rounded-full px-3 py-1 text-[11px] font-semibold ${item.type === "education"
            ? "bg-emerald-50 text-emerald-600"
            : "bg-blue-50 text-blue-500"
            }`}
        >
          {item.period}
        </span>

        <span
          className={`rounded-full px-3 py-1 text-[10px] font-medium ${item.type === "education"
            ? "bg-emerald-100/60 text-emerald-700"
            : "bg-blue-100/60 text-blue-600"
            }`}
        >
          {item.type.toUpperCase()}
        </span>
      </div>

      {/* icon */}
      {item.icon && (
        <div
          className={`mt-4 flex h-11 w-11 items-center justify-center rounded-full text-xl ${item.type === "education"
            ? "bg-emerald-50"
            : "bg-blue-50"
            }`}
        >
          {item.icon[0]}
        </div>
      )}

      {/* title */}
      <h3 className="relative mt-3 text-lg font-extrabold leading-snug tracking-tight text-gray-900 sm:text-xl">
        {item.role}
      </h3>

      {/* company */}
      <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px] text-slate-500">
        <span>👤</span>

        <span>{item.company}</span>

        {item.location && (
          <>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span>{item.location}</span>
          </>
        )}
      </div>

      {/* divider */}
      <div className="my-4 h-px bg-slate-100" />

      {/* description */}
      <p className="text-[12.5px] leading-relaxed text-slate-500">
        {item.description}
      </p>

      {/* tags */}
      {item.tags?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full px-3 py-1 text-[10.5px] font-medium ${item.type === "education"
                ? "bg-emerald-50 text-emerald-600"
                : "bg-blue-50 text-blue-500"
                }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* bottom line */}
      <div
        className={`absolute bottom-0 left-0 h-[2.5px] w-0 transition-all duration-500 group-hover:w-full ${item.type === "education"
          ? "bg-emerald-500"
          : "bg-blue-500"
          }`}
      />
    </motion.div>
  );
}

/* ───────────────── ILLUSTRATION ───────────────── */

function JourneyIllustration({ index }) {
  const illustrations = [
    "/svg/experience.svg",
    "/svg/experience1.svg",
    "/svg/education.svg",
  ];

  return (
    <motion.img
      src={illustrations[index % illustrations.length]}
      alt=""
      draggable={false}
      className="mx-auto w-full max-w-[240px] object-contain"
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.4,
      }}
    />
  );
}