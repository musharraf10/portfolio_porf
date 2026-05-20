import { useState, useEffect } from "react";

export function useScrollNavbar(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = null;

    const updateProgress = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      setScrolled(scrollTop > threshold);
      setProgress(Math.min(100, Math.max(0, nextProgress)));
      rafId = null;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [threshold]);

  return { scrolled, progress };
}
