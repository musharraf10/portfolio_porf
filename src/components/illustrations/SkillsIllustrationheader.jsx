import { motion } from "framer-motion";

export function SkillsIllustrationHeader() {
    return (
        <motion.svg
            viewBox="0 0 400 360"
            className="h-full w-full"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
            <rect x="20" y="40" width="160" height="120" rx="14" fill="#FFFFFF" stroke="#EAEAEA" />
            <rect x="36" y="56" width="40" height="40" rx="8" fill="#EEF0FF" />
            <rect x="88" y="60" width="72" height="8" rx="4" fill="#EAEAEA" />
            <rect x="88" y="76" width="56" height="6" rx="3" fill="#EEF0FF" />
            <rect x="36" y="108" width="128" height="6" rx="3" fill="#EAEAEA" />
            <rect x="36" y="122" width="100" height="6" rx="3" fill="#EAEAEA" />
            <rect x="200" y="80" width="180" height="140" rx="14" fill="#F8FAFC" stroke="#EAEAEA" />
            <rect x="216" y="96" width="148" height="8" rx="4" fill="#5B5BF7" opacity="0.4" />
            {[0, 1, 2, 3].map((i) => (
                <rect
                    key={i}
                    x={216}
                    y={120 + i * 24}
                    width={120 - i * 15}
                    height="6"
                    rx="3"
                    fill={i % 2 ? "#EAEAEA" : "#EEF0FF"}
                />
            ))}
            <rect x="60" y="200" width="280" height="100" rx="14" fill="#FFFFFF" stroke="#EAEAEA" />
            {[0, 1, 2, 3, 4].map((i) => (
                <rect
                    key={i}
                    x={80 + i * 52}
                    y={230}
                    width={40}
                    height={40}
                    rx="10"
                    fill="#EEF0FF"
                    stroke="#EAEAEA"
                />
            ))}
            <circle cx="340" cy="60" r="24" fill="#EEF0FF" />
            <path d="M328 60 L336 68 L352 52" stroke="#5B5BF7" strokeWidth="2" strokeLinecap="round" />
        </motion.svg>
    );
}

