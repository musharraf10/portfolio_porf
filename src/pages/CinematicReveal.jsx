/**
 * CinematicReveal.jsx
 * ─────────────────────────────────────────────────────────────
 * A premium, curtain-reveal animation system for a portfolio hero.
 *
 * Architecture:
 *   <CinematicReveal>          – orchestrator; owns all animation state
 *     <CurtainLayer>           – the white matte cloth that slides up
 *       <RatScene>             – rat + thread; lives on the curtain
 *     </CurtainLayer>
 *     {children}               – YOUR real hero section (rendered beneath)
 *   </CinematicReveal>
 *
 * Usage:
 *   <CinematicReveal>
 *     <HeroSection />           ← your actual hero
 *   </CinematicReveal>
 *
 * Framer Motion peer dep: ^11
 * ─────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useState } from "react";
import {
    motion,
    useAnimation,
    useMotionValue,
    useSpring,
    useTransform,
    AnimatePresence,
} from "framer-motion";

/* ─────────────────────────────────────────────────
   TOKENS
───────────────────────────────────────────────── */
const TIMING = {
    ratWalkStart: 150,
    ratWalkDuration: 2000,   // 0 → 1.5s
    threadTensionAt: 2500,   // 1.5s
    threadTensionDur: 500,   // 1.5 → 2s
    curtainLiftAt: 2000,     // 2s
    curtainLiftDur: 1100,    // 2 → 3.1s
    heroRevealAt: 2200,      // stagger inside curtain lift
    revealDoneAt: 3200,      // curtain fully gone; interactive
};

const SPRING = {
    thread: { type: "spring", stiffness: 420, damping: 18, mass: 0.6 },
    curtain: { type: "spring", stiffness: 55, damping: 22, mass: 1.4 },
    gentle: { type: "spring", stiffness: 80, damping: 20 },
    float: { type: "spring", stiffness: 30, damping: 12 },
};

/* ─────────────────────────────────────────────────
   RAT SVG — minimal silhouette, facing right
───────────────────────────────────────────────── */
function RatSVG({ legPhase = 0 }) {
    // legPhase 0 or 1 → simple stride cycle
    const leg1Y = legPhase === 0 ? 0 : -3;
    const leg2Y = legPhase === 0 ? -3 : 0;

    return (
        <svg
            viewBox="0 0 60 34"
            width="60"
            height="34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: "visible" }}
        >
            {/* tail */}
            <path
                d="M4 22 Q-4 18 -8 10"
                stroke="#1a1a1a"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
            />
            {/* body */}
            <ellipse cx="26" cy="20" rx="18" ry="10" fill="#1a1a1a" />
            {/* head */}
            <ellipse cx="46" cy="16" rx="10" ry="8.5" fill="#1a1a1a" />
            {/* snout */}
            <ellipse cx="56" cy="17" rx="3.5" ry="2.5" fill="#2a2a2a" />
            {/* ear */}
            <ellipse cx="44" cy="9" rx="4.5" ry="5" fill="#2a2a2a" />
            <ellipse cx="44" cy="9.5" rx="2.5" ry="3" fill="#3d3d3d" />
            {/* eye */}
            <circle cx="50" cy="13" r="1.4" fill="#f5f5f5" />
            <circle cx="50.4" cy="13" r="0.7" fill="#1a1a1a" />
            {/* front legs */}
            <line
                x1="38" y1="28"
                x2={`${38 + leg1Y}`} y2="34"
                stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round"
            />
            <line
                x1="33" y1="29"
                x2={`${33 + leg2Y}`} y2="35"
                stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round"
            />
            {/* hind legs */}
            <line
                x1="16" y1="29"
                x2={`${16 - leg1Y}`} y2="35"
                stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round"
            />
            <line
                x1="10" y1="27"
                x2={`${10 - leg2Y}`} y2="33"
                stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round"
            />
            {/* whiskers */}
            <line x1="55" y1="15" x2="62" y2="13" stroke="#555" strokeWidth="0.8" strokeLinecap="round" />
            <line x1="55" y1="17" x2="62" y2="17" stroke="#555" strokeWidth="0.8" strokeLinecap="round" />
            <line x1="55" y1="19" x2="62" y2="21" stroke="#555" strokeWidth="0.8" strokeLinecap="round" />
        </svg>
    );
}

/* ─────────────────────────────────────────────────
   THREAD / ROPE
───────────────────────────────────────────────── */
function Thread({ pullY = 0 }) {
    // pullY: how many px the rat has pulled it down (0 → 28)
    const normalLength = 80;
    const stretchedLength = normalLength + pullY;

    return (
        <svg
            width="10"
            height={stretchedLength + 10}
            viewBox={`0 0 10 ${stretchedLength + 10}`}
            style={{ overflow: "visible" }}
        >
            {/* anchor dot at top */}
            <circle cx="5" cy="3" r="3" fill="#c0c0c0" />
            {/* thread line */}
            <line
                x1="5" y1="6"
                x2="5" y2={stretchedLength}
                stroke="#d4d4d4"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="2 3"
            />
            {/* knot/end at bottom */}
            <circle cx="5" cy={stretchedLength + 4} r="3" fill="#b0b0b0" />
        </svg>
    );
}

/* ─────────────────────────────────────────────────
   RAT SCENE (lives on the curtain surface)
───────────────────────────────────────────────── */
function RatScene({ phase }) {
    // phase: "walking" | "pulling" | "done"
    const [legPhase, setLegPhase] = useState(0);

    // Leg stride interval
    useEffect(() => {
        if (phase !== "walking") return;
        const id = setInterval(() => setLegPhase((p) => (p === 0 ? 1 : 0)), 220);
        return () => clearInterval(id);
    }, [phase]);

    // Thread pull amount
    const pullAmount = useMotionValue(0);
    const springPull = useSpring(pullAmount, SPRING.thread);

    useEffect(() => {
        if (phase === "pulling") {
            pullAmount.set(26);
        } else if (phase === "done" || phase === "walking") {
            pullAmount.set(0);
        }
    }, [phase, pullAmount]);

    const threadPullPx = useTransform(springPull, (v) => v);

    return (
        <div
            style={{
                position: "absolute",
                // thread hangs from top-center of curtain
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                pointerEvents: "none",
                zIndex: 2,
            }}
        >
            {/* Thread */}
            <motion.div style={{ y: 0 }}>
                <motion.div
                    style={{
                        y: useTransform(springPull, (v) => v * 0.12), // slight top anchor bob
                    }}
                >
                    <Thread pullY={0} />
                </motion.div>
            </motion.div>

            {/* Rat — animates from far left to thread */}
            <motion.div
                style={{
                    position: "absolute",
                    top: 88, // sits just below thread end (thread length ~80 + anchor)
                    x: phase === "done" ? 0 : undefined,
                }}
                initial={{ x: "-46vw" }}
                animate={
                    phase === "walking"
                        ? { x: -34 } // stop just left of thread (offset by rat width)
                        : phase === "pulling" || phase === "done"
                            ? { x: -34 }
                            : { x: "-46vw" }
                }
                transition={
                    phase === "walking"
                        ? {
                            duration: TIMING.ratWalkDuration,
                            ease: [0.25, 0.1, 0.25, 1],
                        }
                        : { duration: 0 }
                }
            >
                {/* Rat body with subtle vertical bob while walking */}
                <motion.div
                    animate={
                        phase === "walking"
                            ? { y: [0, -2, 0, -1.5, 0] }
                            : { y: phase === "pulling" ? [0, 3, 6, 8, 6] : 0 }
                    }
                    transition={
                        phase === "walking"
                            ? { duration: 0.44, repeat: Infinity, ease: "easeInOut" }
                            : phase === "pulling"
                                ? { duration: 0.5, ease: "easeOut" }
                                : {}
                    }
                >
                    <RatSVG legPhase={legPhase} />
                </motion.div>
            </motion.div>
        </div>
    );
}

/* ─────────────────────────────────────────────────
   CURTAIN LAYER
───────────────────────────────────────────────── */
function CurtainLayer({ phase, onRevealComplete }) {
    const curtainControls = useAnimation();

    useEffect(() => {
        if (phase === "lifting") {
            curtainControls
                .start({
                    y: "-101%",
                    transition: SPRING.curtain,
                })
                .then(() => {
                    onRevealComplete?.();
                });
        }
    }, [phase, curtainControls, onRevealComplete]);

    return (
        <motion.div
            animate={curtainControls}
            style={{
                position: "absolute",
                inset: 0,
                zIndex: 50,
                background: "#fafafa",
                // Subtle bottom shadow to give the curtain physical weight
                boxShadow: "0 8px 48px 0 rgba(0,0,0,0.10)",
                // Very subtle linen texture via repeating gradient
                backgroundImage: `
          repeating-linear-gradient(
            180deg,
            transparent,
            transparent 3px,
            rgba(0,0,0,0.012) 3px,
            rgba(0,0,0,0.012) 4px
          )
        `,
                willChange: "transform",
                // Bottom edge — soft fabric shadow
                borderBottom: "1px solid rgba(0,0,0,0.06)",
            }}
        >
            {/* Soft bottom edge shadow (fabric hem feel) */}
            <div
                style={{
                    position: "absolute",
                    bottom: -12,
                    left: 0,
                    right: 0,
                    height: 12,
                    background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.06) 0%, transparent 100%)",
                    pointerEvents: "none",
                }}
            />

            {/* Brand mark centered on curtain */}
            <motion.div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                    userSelect: "none",
                }}
                animate={
                    phase === "lifting"
                        ? { opacity: 0, y: -8, transition: { duration: 0.3 } }
                        : { opacity: 1 }
                }
            >
                <div
                    style={{
                        fontFamily: "'DM Serif Display', 'Garamond', Georgia, serif",
                        fontSize: "clamp(13px, 1.4vw, 17px)",
                        letterSpacing: "0.38em",
                        color: "#999",
                        fontWeight: 400,
                        textTransform: "uppercase",
                    }}
                >
                    Portfolio
                </div>
                <div
                    style={{
                        width: 32,
                        height: 1,
                        background: "linear-gradient(90deg, transparent, #ccc, transparent)",
                        margin: "10px auto 0",
                    }}
                />
            </motion.div>

            {/* Rat + Thread scene */}
            <RatScene phase={phase === "lifting" || phase === "done" ? "done" : phase} />
        </motion.div>
    );
}

/* ─────────────────────────────────────────────────
   HERO REVEAL WRAPPER
   Wraps each hero child with staggered entrance
───────────────────────────────────────────────── */
function HeroRevealItem({ children, delay = 0, style }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
                delay,
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
            }}
            style={style}
        >
            {children}
        </motion.div>
    );
}

/* ─────────────────────────────────────────────────
   MAIN ORCHESTRATOR
───────────────────────────────────────────────── */
export function CinematicReveal({ children }) {
    // phase state machine
    // idle → walking → pulling → lifting → done
    const [phase, setPhase] = useState("idle");
    const [curtainGone, setCurtainGone] = useState(false);
    const [heroRevealStarted, setHeroRevealStarted] = useState(false);

    useEffect(() => {
        // Kick off sequence after first paint
        const t0 = setTimeout(() => setPhase("walking"), 120);

        const t1 = setTimeout(() => setPhase("pulling"), TIMING.threadTensionAt + 120);

        const t2 = setTimeout(() => {
            setPhase("lifting");
            setHeroRevealStarted(true);
        }, TIMING.curtainLiftAt + 120);

        return () => [t0, t1, t2].forEach(clearTimeout);
    }, []);

    const handleRevealComplete = () => {
        setCurtainGone(true);
        setPhase("done");
    };

    return (
        <div style={{ position: "relative", width: "100%", minHeight: "100vh", overflow: "hidden" }}>
            {/* ── Real hero (always mounted beneath) ── */}
            <div style={{ position: "relative", zIndex: 1 }}>
                {heroRevealStarted ? (
                    <HeroSectionRevealWrapper>{children}</HeroSectionRevealWrapper>
                ) : (
                    // Keep hero in DOM but invisible until reveal starts
                    <div style={{ visibility: "hidden" }}>{children}</div>
                )}
            </div>

            {/* ── Curtain (on top, slides away) ── */}
            <AnimatePresence>
                {!curtainGone && (
                    <CurtainLayer phase={phase} onRevealComplete={handleRevealComplete} />
                )}
            </AnimatePresence>
        </div>
    );
}

/* Wraps hero children and orchestrates their staggered reveal */
function HeroSectionRevealWrapper({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.01 }} // instant mount; children handle their own entrance
        >
            {children}
        </motion.div>
    );
}

/* ─────────────────────────────────────────────────
   HERO SECTION — Example (replace with your own)
   Demonstrates how to use HeroRevealItem for staggered
   entrance of each element as curtain lifts.
───────────────────────────────────────────────── */

function TechPill({ label, delay }) {
    return (
        <HeroRevealItem delay={delay}>
            <motion.span
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "5px 14px",
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: 100,
                    fontSize: 12,
                    letterSpacing: "0.06em",
                    color: "#555",
                    background: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(8px)",
                    fontFamily: "monospace",
                }}
                whileHover={{ scale: 1.04, borderColor: "rgba(0,0,0,0.25)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                {label}
            </motion.span>
        </HeroRevealItem>
    );
}

export function ExampleHeroSection() {
    return (
        <section
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 5vw",
                background: "#f8f8f6",
                fontFamily: "'DM Sans', system-ui, sans-serif",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Background ambient glow */}
            <HeroRevealItem delay={0.6} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                <div
                    style={{
                        position: "absolute",
                        top: "20%",
                        left: "50%",
                        width: "60vw",
                        height: "40vw",
                        transform: "translateX(-50%)",
                        background:
                            "radial-gradient(ellipse, rgba(220,220,210,0.55) 0%, transparent 70%)",
                        pointerEvents: "none",
                    }}
                />
            </HeroRevealItem>

            {/* Eyebrow */}
            <HeroRevealItem delay={0.35}>
                <p
                    style={{
                        fontFamily: "monospace",
                        fontSize: 12,
                        letterSpacing: "0.3em",
                        color: "#888",
                        textTransform: "uppercase",
                        marginBottom: 24,
                    }}
                >
                    Full-Stack Developer
                </p>
            </HeroRevealItem>

            {/* Main heading */}
            <HeroRevealItem delay={0.45}>
                <h1
                    style={{
                        fontFamily: "'DM Serif Display', Georgia, serif",
                        fontSize: "clamp(2.8rem, 8vw, 7rem)",
                        fontWeight: 400,
                        lineHeight: 1.05,
                        letterSpacing: "-0.02em",
                        color: "#111",
                        textAlign: "center",
                        margin: "0 0 16px",
                    }}
                >
                    Crafting Digital
                    <br />
                    <em style={{ fontStyle: "italic", color: "#444" }}>Experiences</em>
                </h1>
            </HeroRevealItem>

            {/* Sub */}
            <HeroRevealItem delay={0.55}>
                <p
                    style={{
                        fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
                        color: "#666",
                        maxWidth: 520,
                        textAlign: "center",
                        lineHeight: 1.7,
                        marginBottom: 40,
                    }}
                >
                    Building elegant, performant web applications with modern stacks.
                    Currently open to full-time opportunities.
                </p>
            </HeroRevealItem>

            {/* Tech pills */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 10,
                    justifyContent: "center",
                    marginBottom: 44,
                }}
            >
                {["React", "TypeScript", "Node.js", "Framer Motion", "MongoDB"].map(
                    (t, i) => (
                        <TechPill key={t} label={t} delay={0.65 + i * 0.06} />
                    )
                )}
            </div>

            {/* CTA buttons */}
            <HeroRevealItem delay={0.95}>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
                    <motion.button
                        style={{
                            padding: "13px 32px",
                            background: "#111",
                            color: "#fff",
                            border: "none",
                            borderRadius: 100,
                            fontSize: 14,
                            letterSpacing: "0.04em",
                            cursor: "pointer",
                            fontFamily: "inherit",
                        }}
                        whileHover={{ scale: 1.04, background: "#000" }}
                        whileTap={{ scale: 0.97 }}
                        transition={SPRING.gentle}
                    >
                        View Projects
                    </motion.button>
                    <motion.button
                        style={{
                            padding: "13px 32px",
                            background: "transparent",
                            color: "#111",
                            border: "1px solid rgba(0,0,0,0.18)",
                            borderRadius: 100,
                            fontSize: 14,
                            letterSpacing: "0.04em",
                            cursor: "pointer",
                            fontFamily: "inherit",
                        }}
                        whileHover={{ scale: 1.04, borderColor: "#111" }}
                        whileTap={{ scale: 0.97 }}
                        transition={SPRING.gentle}
                    >
                        Get in Touch
                    </motion.button>
                </div>
            </HeroRevealItem>
        </section>
    );
}
