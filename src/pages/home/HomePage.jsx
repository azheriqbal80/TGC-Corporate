import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePageMotion } from "../../motion/usePageMotion";
import { SiteHeader } from "../../components/layout/SiteHeader";
import { Arrow } from "../../components/actions/Arrow";
import { LinkButton } from "../../components/actions/LinkButton";
import { ShaderMetal } from "../../components/ui/ShaderMetal";
import { AdaptiveDeliveryStack } from "../../components/figures/AdaptiveDeliveryStack";
import { CapabilityFigure } from "../../components/figures/CapabilityFigure";
import { SiteFooter } from "../../components/layout/SiteFooter";
import { ClosingSection } from "../../components/layout/ClosingSection";

export function HomePage() {
  const rootRef = useRef(null);

  usePageMotion(rootRef, ({ registerCleanup }) => {
    gsap.from("[data-hero-line]", {
      yPercent: 110,
      rotate: 1.5,
      duration: 1.15,
      stagger: 0.1,
      ease: "expo.out",
    });
    gsap.from(".hero-copy, .hero-actions, .hero-metal", {
      opacity: 0,
      y: 24,
      duration: 0.9,
      stagger: 0.1,
      delay: 0.25,
      ease: "power3.out",
    });
    gsap.utils.toArray("[data-reveal]").forEach((element) => {
      gsap.fromTo(
        element,
        { y: 42, opacity: 0.15 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        },
      );
    });
    const deliveryStack = document.querySelector("[data-delivery-stack]");
    if (deliveryStack) {
      const inboundPath = deliveryStack.querySelector(
        "[data-delivery-inbound]",
      );
      const outboundPath = deliveryStack.querySelector("[data-delivery-path]");
      const endpoints = deliveryStack.querySelectorAll(
        "[data-delivery-endpoint]",
      );
      endpoints.forEach((endpoint) => {
        endpoint.removeAttribute("transform");
        endpoint.removeAttribute("data-svg-origin");
        endpoint.style.removeProperty("transform");
        endpoint.style.removeProperty("transform-origin");
        endpoint.style.removeProperty("translate");
        endpoint.style.removeProperty("rotate");
        endpoint.style.removeProperty("scale");
      });
      const outboundLength = outboundPath.getTotalLength();
      gsap.set(inboundPath, { opacity: 0 });
      gsap.set(outboundPath, {
        strokeDasharray: outboundLength,
        strokeDashoffset: outboundLength,
      });
      const deliveryTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: deliveryStack,
          start: "top 82%",
          end: "top 8%",
          scrub: true,
        },
      });
      deliveryTimeline
        .fromTo(
          endpoints,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.55,
            stagger: 0.12,
            clearProps: "transform,transformOrigin,translate,rotate,scale",
          },
          0,
        )
        .to(inboundPath, { opacity: 1, duration: 0.35 }, 0.08)
        .fromTo(
          deliveryStack.querySelectorAll("[data-delivery-layer]"),
          { opacity: 0.08, y: 38 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.13 },
          0.34,
        )
        .to(
          outboundPath,
          { strokeDashoffset: 0, duration: 0.65, ease: "none" },
          0.78,
        )
        .fromTo(
          deliveryStack.querySelectorAll("[data-delivery-packet]"),
          { opacity: 0, scale: 0.4, transformOrigin: "center" },
          { opacity: 1, scale: 1, duration: 0.35, stagger: 0.18 },
          0.9,
        )
        .fromTo(
          deliveryStack.querySelector("[data-delivery-caption]"),
          { opacity: 0 },
          { opacity: 1, duration: 0.35 },
          1.02,
        );
    }
    gsap.utils.toArray("[data-capability-figure]").forEach((figure) => {
      const blocks = figure.querySelectorAll("[data-capability-block]");
      const loop = gsap.timeline({
        paused: true,
        repeat: -1,
        repeatDelay: 0.8,
      });
      if (figure.classList.contains("capability-figure--predictive")) {
        const steps = figure.querySelectorAll(
          '[data-capability-motion="predictive-step"]',
        );
        loop
          .to(steps, {
            y: -5,
            duration: 0.55,
            stagger: 0.16,
            ease: "sine.inOut",
          })
          .to(
            steps,
            { y: 0, duration: 0.55, stagger: 0.12, ease: "sine.inOut" },
            ">-0.08",
          );
      } else if (
        figure.classList.contains("capability-figure--orchestration")
      ) {
        const selected = figure.querySelector(
          '[data-capability-motion="selected-resource"]',
        );
        loop
          .to(selected, { y: -5, duration: 1.1, ease: "sine.inOut" })
          .to(selected, { y: 0, duration: 1.1, ease: "sine.inOut" });
      } else {
        const packets = figure.querySelectorAll(
          '[data-capability-motion="input-packet"]',
        );
        const frames = figure.querySelectorAll(
          '[data-capability-motion="video-frame"]',
        );
        loop
          .to(
            packets,
            { y: -6, duration: 0.5, stagger: 0.14, ease: "sine.inOut" },
            0,
          )
          .to(
            packets,
            { y: 0, duration: 0.5, stagger: 0.1, ease: "sine.inOut" },
            0.75,
          )
          .to(
            frames,
            { y: -3, duration: 0.75, stagger: 0.18, ease: "sine.inOut" },
            0.35,
          )
          .to(
            frames,
            { y: 0, duration: 0.75, stagger: 0.14, ease: "sine.inOut" },
            1.2,
          );
      }
      let revealed = false;
      const figureTimeline = gsap.timeline({
        scrollTrigger: { trigger: figure, start: "top 88%", once: true },
      });
      figureTimeline.fromTo(
        blocks,
        { opacity: 0.12, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.62,
          stagger: 0.075,
          ease: "expo.out",
          onComplete: () => {
            revealed = true;
            if (!document.hidden && ScrollTrigger.isInViewport(figure, 0.1))
              loop.play(0);
          },
        },
      );
      const visibilityTrigger = ScrollTrigger.create({
        trigger: figure,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => {
          if (revealed && !document.hidden) loop.resume();
        },
        onEnterBack: () => {
          if (revealed && !document.hidden) loop.resume();
        },
        onLeave: () => loop.pause(),
        onLeaveBack: () => loop.pause(),
      });
      const handleVisibility = () => {
        if (document.hidden) loop.pause();
        else if (revealed && ScrollTrigger.isInViewport(figure, 0.1))
          loop.resume();
      };
      document.addEventListener("visibilitychange", handleVisibility);
      registerCleanup(() => {
        document.removeEventListener("visibilitychange", handleVisibility);
        visibilityTrigger.kill();
        loop.kill();
      });
    });
  });

  return (
    <div ref={rootRef} className="site-shell">
      <SiteHeader />

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero-grid">
            <div className="hero-heading">
              <h1>
                <span className="line-mask">
                  <span data-hero-line>High-performance gaming.</span>
                </span>
                <span className="line-mask">
                  <span data-hero-line>
                    <em>Beyond hardware.</em>
                  </span>
                </span>
              </h1>
            </div>
            <p className="hero-copy">
              AI Cloud infrastructure designed to bring demanding games to more
              devices and markets.
            </p>
            <div className="hero-actions">
              <LinkButton href="/contact">Contact TGC</LinkButton>
              <a className="text-link" href="/platform">
                Explore the platform <Arrow />
              </a>
            </div>
          </div>
          <figure
            className="hero-metal"
            aria-label="Animated metallic network ribbons"
          >
            <ShaderMetal
              className="hero-metal-shader"
              color="#a4ec22"
              speed={0.24}
            />
          </figure>
        </section>

        <section className="proof-strip" aria-label="Recognition">
          <div className="proof-strip-lead">
            <p>Built and recognised.</p>
          </div>
          <div className="proof-items">
            <a href="/achievements#future-100">
              <span>UAE Future 100 — 2025–2026 cycle</span>
              <Arrow diagonal />
            </a>
            <a href="/achievements#mena-awards">
              <span>
                Best Web3 Gaming — 2025 MENA Games Industry Awards winner
              </span>
              <Arrow diagonal />
            </a>
          </div>
        </section>

        <section className="barrier section-light" id="platform">
          <div className="section-mark" aria-hidden="true">
            ACCESS
          </div>
          <div className="section-layout">
            <div className="section-side" data-reveal>
              <span>The opportunity</span>
              <i />
            </div>
            <div className="section-body">
              <h2 data-reveal>
                Gaming should not begin with a hardware barrier.
              </h2>
              <div className="barrier-copy" data-reveal>
                <p>
                  High hardware costs, large downloads, and uneven network
                  infrastructure limit who can access high-quality gaming.
                </p>
                <p>
                  TGC is building a cloud delivery platform intended to move
                  demanding workloads away from the player’s device and reduce
                  those barriers.
                </p>
              </div>
              <div className="principles" data-reveal>
                <div>
                  <span>01</span>
                  <strong>Reach more devices</strong>
                </div>
                <div>
                  <span>02</span>
                  <strong>Adapt across infrastructure environments</strong>
                </div>
                <div>
                  <span>03</span>
                  <strong>Reduce installation and storage friction</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="platform-section" aria-labelledby="platform-title">
          <div className="platform-copy" data-reveal>
            <h2 id="platform-title">
              The game runs in the cloud. The experience reaches the player.
            </h2>
            <p>
              TGC combines remote game execution, intelligent optimisation,
              responsive input handling, and video delivery within one platform.
            </p>
            <LinkButton href="/platform" light>
              Explore the platform
            </LinkButton>
          </div>
          <AdaptiveDeliveryStack />
        </section>

        <section className="technology" id="technology">
          <div className="tech-intro section-layout">
            <div className="section-side section-side--dark" data-reveal>
              <span>Technology</span>
              <i />
            </div>
            <div className="section-body">
              <h2 data-reveal>Engineered around real network conditions.</h2>
              <p className="tech-lead" data-reveal>
                The platform is designed to match each experience to the player,
                device, location, and available cloud resources.
              </p>
            </div>
          </div>
          <div className="tech-list">
            <article data-reveal>
              <span>01</span>
              <h3>Predictive delivery</h3>
              <p>
                Prepare selected game elements before they are immediately
                required.
              </p>
              <CapabilityFigure type="predictive" />
            </article>
            <article data-reveal>
              <span>02</span>
              <h3>Cloud orchestration</h3>
              <p>
                Connect users with suitable infrastructure according to location
                and availability.
              </p>
              <CapabilityFigure type="orchestration" />
            </article>
            <article data-reveal>
              <span>03</span>
              <h3>Responsive input</h3>
              <p>
                Optimise through Artificial Intelligence how player input and
                video delivery are handled.
              </p>
              <CapabilityFigure type="input" />
            </article>
          </div>
          <a className="tech-link" href="/technology">
            Discover the technology <Arrow diagonal />
          </a>
        </section>

        <section className="company section-light" id="company">
          <div className="company-statement" data-reveal>
            <h2>Built by experienced technology operators.</h2>
            <p>
              TGC brings together a Core Team and Advisory Team with experience
              across gaming, artificial intelligence, cloud infrastructure,
              telecommunications, operations, law, finance, and emerging
              technology.
            </p>
          </div>
          <div className="company-footer" data-reveal>
            <div className="team-type">
              <span>Core Team</span>
              <p>Building and operating the platform.</p>
            </div>
            <div className="team-type">
              <span>Advisory Team</span>
              <p>Extending specialist perspective and reach.</p>
            </div>
            <div className="company-actions">
              <a href="/company">
                About TGC <Arrow />
              </a>
              <a href="/leadership">
                Meet the leadership <Arrow />
              </a>
            </div>
          </div>
        </section>

        <ClosingSection
          eyebrow="Start a conversation"
          heading="Let’s talk about what gaming can reach next."
          body="Contact TGC about the platform, technology partnerships, publishing opportunities, media requests, or other corporate enquiries."
        />
      </main>

      <SiteFooter />
    </div>
  );
}
