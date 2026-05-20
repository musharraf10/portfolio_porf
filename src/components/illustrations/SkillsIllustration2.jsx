import { motion } from "framer-motion";

export function SkillsIllustration2() {
    return (
        <motion.img
            src="/svg/skills1.svg"
            alt="Skills Illustration"
            className="h-full w-full object-contain"
            animate={{ y: [0, -10, 0] }}
            transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            draggable={false}
        />
    );
}