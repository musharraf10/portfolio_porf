import { FadeUp } from "./FadeUp";

export function SectionHeader({ badge, title, description, align = "left" }) {
  const alignClass =
    align === "center"
      ? "text-center items-center mx-auto"
      : "text-left items-start";

  return (
    <div className={`flex max-w-2xl flex-col gap-2 ${alignClass}`}>
      {badge && (
        <FadeUp delay={0}>
          <span className="badge w-fit border-accent/20 bg-accent-light text-accent">
            {badge}
          </span>
        </FadeUp>
      )}
      <FadeUp delay={0.05}>
        <h2 className="text-4xl font-bold tracking-tight text-text-primary md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
          {title}
        </h2>
      </FadeUp>
      {description && (
        <FadeUp delay={0.1}>
          <p className="text-lg leading-relaxed text-text-secondary">
            {description}
          </p>
        </FadeUp>
      )}
    </div>
  );
}
