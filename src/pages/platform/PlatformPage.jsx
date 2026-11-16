import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePageMotion } from "../../motion/usePageMotion";
import { SiteHeader } from "../../components/layout/SiteHeader";
import { PageHero } from "../../components/layout/PageHero";
import { Arrow } from "../../components/actions/Arrow";
import { ecosystemAudiences, journeySteps } from "../../content/platform";
import { SiteFooter } from "../../components/layout/SiteFooter";
import { ClosingSection } from "../../components/layout/ClosingSection";

export function PlatformPage() {
  const rootRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [activeAudience, setActiveAudience] = useState(0);

  usePageMotion(rootRef, ({ registerCleanup }) => {
    gsap.from("[data-platform-line]", {
      yPercent: 112,
      duration: 1.1,
      stagger: 0.09,
      ease: "expo.out",
    });
    gsap.from(".page-hero-copy, .page-hero-actions, .page-hero-media", {
      opacity: 0,
      y: 24,
      duration: 0.9,
      stagger: 0.1,
      delay: 0.25,
      ease: "power3.out",
    });
    gsap.utils.toArray("[data-platform-reveal]").forEach((element) => {
      gsap.fromTo(
        element,
        { y: 38, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "expo.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        },
      );
    });
    const capabilityLayers =
      rootRef.current?.querySelector(".capability-stack");
    if (capabilityLayers) {
      gsap.fromTo(
        capabilityLayers.querySelectorAll(".capability-layer"),
        { y: 24, opacity: 0.25 },
        {
          y: 0,
          opacity: 1,
          duration: 0.72,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: capabilityLayers,
            start: "top 82%",
            once: true,
          },
        },
      );
    }
    gsap.utils.toArray(".journey-copy article").forEach((element, index) => {
      ScrollTrigger.create({
        trigger: element,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveStep(index),
        onEnterBack: () => setActiveStep(index),
      });
    });
    gsap.fromTo(
      ".journey-route-fill",
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".journey",
          start: "top 55%",
          end: "bottom 65%",
          scrub: 0.5,
        },
      },
    );

    const audienceMotion = gsap.matchMedia();
    audienceMotion.add(
      "(min-width: 901px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)",
      () => {
        const section = rootRef.current?.querySelector(".ecosystem");
        const viewport = section?.querySelector(".ecosystem-panels-viewport");
        const track = section?.querySelector(".ecosystem-panels-track");
        const progressFill = section?.querySelector(".ecosystem-progress-fill");
        if (!section || !viewport || !track) return;

        section.dataset.ecosystemMotion = "enabled";
        setActiveAudience(0);
        if (progressFill) {
          gsap.set(progressFill, { scaleX: 0, transformOrigin: "left center" });
        }
        let currentIndex = -1;
        const distance = () =>
          Math.max(0, track.scrollHeight - viewport.clientHeight);

        gsap.to(track, {
          y: () => -distance(),
          ease: "none",
          onUpdate: function () {
            const nextIndex = Math.min(
              ecosystemAudiences.length - 1,
              Math.round(this.progress() * (ecosystemAudiences.length - 1)),
            );
            if (nextIndex !== currentIndex) {
              currentIndex = nextIndex;
              setActiveAudience(nextIndex);
            }
            progressFill?.style.setProperty(
              "transform",
              `scaleX(${this.progress()})`,
            );
          },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.max(1, distance())}`,
            pin: ".ecosystem-stage",
            pinSpacing: true,
            scrub: 0.55,
            invalidateOnRefresh: true,
            snap: {
              snapTo: (progress) =>
                Math.round(progress * (ecosystemAudiences.length - 1)) /
                (ecosystemAudiences.length - 1),
              duration: { min: 0.18, max: 0.38 },
              delay: 0.025,
              ease: "power1.inOut",
            },
          },
        });

        return () => {
          delete section.dataset.ecosystemMotion;
        };
      },
    );
    registerCleanup(() => audienceMotion.revert());
  });

  return (
    <div ref={rootRef} className="site-shell platform-page">
      <SiteHeader active="platform" />
      <main id="main-content">
        <PageHero
          line="data-platform-line"
          lines={[
            "High-performance gaming",
            <>
              beyond the <em>hardware barrier.</em>
            </>,
          ]}
          copy="TGC is developing an AI-powered cloud gaming platform designed to bring demanding games to everyday devices across a wider range of network conditions."
          action={{ label: "Contact TGC", href: "/contact" }}
          link={{ label: "Explore the technology", href: "/technology" }}
          media={{
            name: "platform-anywhere",
            alt: "Player using a tablet and controller in a modern transit lounge",
            width: 1942,
            height: 809,
            sizes: "(max-width: 900px) 100vw, 57vw",
            label: "Cloud gaming in an everyday setting",
            caption:
              "High-performance experiences, beyond dedicated gaming hardware.",
          }}
          foot={["Player", "Network", "Cloud"]}
        />

        <section className="access-shift">
          <div className="access-heading" data-platform-reveal>
            <h2>Access should not depend on what you own or where you live.</h2>
            <p>
              Modern games can require expensive hardware, substantial storage,
              lengthy downloads, and consistently fast connectivity. TGC moves
              demanding computing workloads into cloud infrastructure so
              supported devices can receive the game as an interactive stream.
            </p>
          </div>
          <div className="access-comparison" data-platform-reveal>
            <div>
              <span>Before</span>
              <ul>
                <li>Specialised local hardware</li>
                <li>Large downloads and updates</li>
                <li>Device-specific limitations</li>
              </ul>
            </div>
            <div>
              <span>With cloud delivery</span>
              <ul>
                <li>More supported devices</li>
                <li>Reduced local processing requirements</li>
                <li>Faster access to the experience</li>
              </ul>
            </div>
          </div>
        </section>

        <section
          className="journey"
          id="journey"
          aria-labelledby="journey-title"
        >
          <div className="journey-sticky">
            <h2 id="journey-title">
              From connection
              <br />
              to gameplay.
            </h2>
            <div className="journey-map" aria-hidden="true">
              <div className="journey-route">
                <div className="journey-route-fill" />
              </div>
              {journeySteps.map(([title], index) => (
                <div
                  key={title}
                  className={
                    index === activeStep
                      ? "journey-node active"
                      : "journey-node"
                  }
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <i />
                  <strong>{title}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="journey-copy">
            {journeySteps.map(([title, copy], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="capability-layers"
          id="capabilities"
          aria-labelledby="capability-layers-title"
        >
          <div className="capability-heading" data-platform-reveal>
            <h2 id="capability-layers-title">
              One platform,
              <br />
              three layers of value.
            </h2>
          </div>
          <div className="capability-stack">
            <article className="capability-layer">
              <span>ACCESS</span>
              <div className="capability-layer-copy">
                <h3>Accessible delivery</h3>
                <p>
                  Bring demanding gaming experiences to devices that would not
                  normally run them locally.
                </p>
              </div>
            </article>
            <article className="capability-layer">
              <span>INFRASTRUCTURE</span>
              <div className="capability-layer-copy">
                <h3>Adaptive infrastructure</h3>
                <p>
                  Operate across cloud environments and account for geography,
                  availability, and network conditions.
                </p>
              </div>
            </article>
            <article className="capability-layer">
              <span>EXPERIENCE</span>
              <div className="capability-layer-copy">
                <h3>Responsive experience</h3>
                <p>
                  Use intelligent optimisation and responsive input handling to
                  support interaction between player and game.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section
          className="ecosystem"
          id="ecosystem"
          aria-labelledby="ecosystem-title"
        >
          <div className="ecosystem-stage">
            <h2 id="ecosystem-title" data-platform-reveal>
              Designed for more than one side of gaming.
            </h2>
            <div className="ecosystem-sequence">
              <div className="ecosystem-audience-rail" aria-hidden="true">
                <span>
                  {String(activeAudience + 1).padStart(2, "0")} /{" "}
                  {String(ecosystemAudiences.length).padStart(2, "0")}
                </span>
                <h3
                  key={ecosystemAudiences[activeAudience].title}
                  data-audience-index={activeAudience}
                >
                  {activeAudience === 0 ? (
                    <>
                      For
                      <br />
                      Players
                    </>
                  ) : (
                    ecosystemAudiences[activeAudience].title
                  )}
                </h3>
              </div>
              <div className="ecosystem-panels-viewport">
                <div className="ecosystem-panels-track">
                  {ecosystemAudiences.map(({ title, points }) => (
                    <article className="ecosystem-panel" key={title}>
                      <h3>{title}</h3>
                      <ul>
                        {points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>
            </div>
            <div className="ecosystem-progress" aria-hidden="true">
              <span>01</span>
              <div>
                <i className="ecosystem-progress-fill" />
              </div>
              <span>{String(ecosystemAudiences.length).padStart(2, "0")}</span>
            </div>
          </div>
        </section>

        <section className="technology-handoff">
          <div className="technology-handoff-heading" data-platform-reveal>
            <span className="technology-handoff-label">
              Platform / Delivery model
            </span>
            <h2>
              Under the platform, every interaction becomes a delivery problem.
            </h2>
          </div>
          <div className="technology-handoff-detail" data-platform-reveal>
            <p>
              Predictive delivery, cloud orchestration, GPU utilisation, video
              compression, and responsive input handling work together beneath
              the platform experience.
            </p>
            <a href="/technology">
              <span>Discover the technology</span>
              <Arrow diagonal />
            </a>
          </div>
        </section>

        <ClosingSection
          tone="signal"
          eyebrow="Platform enquiries"
          heading="Bring your games, infrastructure, or market to the conversation."
          body="Contact TGC to discuss platform access, publishing opportunities, infrastructure partnerships, and technology collaboration."
          reveal="data-platform-reveal"
        />
      </main>

      <SiteFooter />
    </div>
  );
}
