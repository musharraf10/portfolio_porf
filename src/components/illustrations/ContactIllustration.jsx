import { motion } from "framer-motion";
import { FloatingElement } from "../ui/FadeUp";

export function ContactIllustration() {
  return (
    <FloatingElement duration={5} className="w-full">
      <svg viewBox="0 0 440 400" className="h-full w-full max-w-md">
        <rect x="60" y="80" width="320" height="200" rx="16" fill="#F8FAFC" stroke="#EAEAEA" />
        <rect x="80" y="100" width="120" height="12" rx="6" fill="#EEF0FF" />
        <rect x="80" y="130" width="280" height="40" rx="8" fill="#FFFFFF" stroke="#EAEAEA" />
        <rect x="80" y="182" width="280" height="40" rx="8" fill="#FFFFFF" stroke="#EAEAEA" />
        <rect x="80" y="234" width="280" height="28" rx="8" fill="#FFFFFF" stroke="#EAEAEA" />
        <motion.g
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M340 60 L380 40 L360 90 Z"
            fill="#5B5BF7"
            opacity="0.2"
          />
          <path
            d="M360 50 L400 35 L385 75 L360 50Z"
            fill="#FFFFFF"
            stroke="#5B5BF7"
            strokeWidth="1.5"
          />
          <line x1="360" y1="50" x2="400" y2="35" stroke="#5B5BF7" strokeWidth="1.5" />
        </motion.g>
        <circle cx="120" cy="320" r="28" fill="#EEF0FF" />
        <circle cx="200" cy="320" r="28" fill="#EEF0FF" />
        <circle cx="280" cy="320" r="28" fill="#EEF0FF" />
        <rect x="100" y="310" width="40" height="20" rx="4" fill="#5B5BF7" opacity="0.3" />
      </svg>
    </FloatingElement>
  );
}
