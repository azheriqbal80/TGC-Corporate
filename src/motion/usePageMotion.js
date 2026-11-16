import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const LENIS_OPTIONS = { duration: 1.05, smoothWheel: true };

/**
 * Page-level motion setup shared by every route.
 *
 * Starts Lenis smooth scrolling, scopes a GSAP context to the page root, and
 * tears both down on unmount. Under `prefers-reduced-motion: reduce` no Lenis
 * instance is created and `setup` never runs, so the page renders its final
 * composition immediately.
 *
 * `setup` receives `registerCleanup`, for teardown a page owns itself, such as
 * document listeners, ScrollTrigger instances, or paused figure loops.
 */
export function usePageMotion(rootRef, setup) {
  const setupRef = useRef(setup);

  useEffect(() => {
    setupRef.current = setup;
  });

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const lenis = reduced ? null : new Lenis(LENIS_OPTIONS);
    let rafId;
    const raf = (time) => {
      lenis?.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    if (lenis) rafId = requestAnimationFrame(raf);

    const cleanups = [];
    const registerCleanup = (cleanup) => cleanups.push(cleanup);
    const context = gsap.context(() => {
      if (reduced) return;
      setupRef.current?.({ registerCleanup });
    }, rootRef);

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      cleanups.forEach((cleanup) => cleanup());
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [rootRef]);
}
