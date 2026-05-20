import { motion } from "framer-motion";
import { FloatingElement } from "../ui/FadeUp";

export function AboutIllustration() {
  return (
    <FloatingElement duration={6} className="w-full">
      <motion.svg
        viewBox="0 0 520 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <image
          href="/svg/aboutme.svg"
          x="0"
          y="0"
          width="520"
          height="480"
          preserveAspectRatio="xMidYMid meet"
        />
      </motion.svg>
    </FloatingElement>
  );
}
