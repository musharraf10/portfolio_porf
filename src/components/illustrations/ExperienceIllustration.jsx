import { motion } from "framer-motion";

export function ExperienceIllustration() {
  return (
    <motion.svg
      viewBox="0 0 440 480"
      className="h-full w-full max-w-lg"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <path
        d="M80 400 Q120 320 160 280 T240 200 T320 120 T380 60"
        stroke="#EEF0FF"
        strokeWidth="4"
        fill="none"
        strokeDasharray="8 8"
      />
      <path
        d="M80 400 Q120 320 160 280 T240 200 T320 120 T380 60"
        stroke="#5B5BF7"
        strokeWidth="3"
        fill="none"
        strokeOpacity="0.4"
      />
      {[
        { cx: 80, cy: 400, label: "Start" },
        { cx: 160, cy: 280, label: "" },
        { cx: 240, cy: 200, label: "" },
        { cx: 320, cy: 120, label: "" },
        { cx: 380, cy: 60, label: "Now" },
      ].map((point, i) => (
        <g key={i}>
          <circle cx={point.cx} cy={point.cy} r="12" fill="#FFFFFF" stroke="#5B5BF7" strokeWidth="2" />
          <circle cx={point.cx} cy={point.cy} r="5" fill="#5B5BF7" />
        </g>
      ))}
      <motion.g
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="280" y="240" width="140" height="80" rx="12" fill="#FFFFFF" stroke="#EAEAEA" />
        <rect x="296" y="256" width="80" height="8" rx="4" fill="#EEF0FF" />
        <rect x="296" y="272" width="108" height="6" rx="3" fill="#EAEAEA" />
        <rect x="296" y="286" width="72" height="6" rx="3" fill="#EAEAEA" />
      </motion.g>
      <polygon points="200,160 240,120 280,180 220,200" fill="#EEF0FF" stroke="#EAEAEA" />
      <rect x="40" y="80" width="120" height="100" rx="12" fill="#F8FAFC" stroke="#EAEAEA" />
      <rect x="56" y="96" width="88" height="8" rx="4" fill="#5B5BF7" opacity="0.3" />
      <rect x="56" y="112" width="72" height="6" rx="3" fill="#EAEAEA" />
      <rect x="56" y="126" width="80" height="6" rx="3" fill="#EAEAEA" />
      <rect x="56" y="140" width="64" height="6" rx="3" fill="#EEF0FF" />
    </motion.svg>
  );
}
