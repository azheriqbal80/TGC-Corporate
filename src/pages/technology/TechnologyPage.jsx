import { useRef } from "react";
import gsap from "gsap";
import { usePageMotion } from "../../motion/usePageMotion";
import { SiteHeader } from "../../components/layout/SiteHeader";
import { PageHero } from "../../components/layout/PageHero";
import { technologyFocusAreas } from "../../content/technology";
import { SiteFooter } from "../../components/layout/SiteFooter";
import { ClosingSection } from "../../components/layout/ClosingSection";
import { TechnicalFaq } from "../../components/faq/TechnicalFaq";

export function TechnologyPage() {
  const rootRef = useRef(null);

  usePageMotion(rootRef, ({ registerCleanup }) => {
    gsap.from("[data-tech-line]", {
      yPercent: 112,
      duration: 1.1,
      stagger: 0.1,
      ease: "expo.out",
    });
    gsap.from(
      ".page-hero-copy, .page-hero-actions, .page-hero-media, .page-hero-foot span",
      {
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.1,
        delay: 0.25,
        ease: "power3.out",
      },
    );

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".technology-approach",
          start: "top 86%",
          once: true,
        },
      })
      .fromTo(
        ".technology-approach-copy",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "expo.out" },
      )
      .fromTo(
        ".technology-conditions",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "expo.out" },
        "-=0.78",
      );

    gsap.fromTo(
      ".technology-development-heading",
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".technology-development",
          start: "top 86%",
          once: true,
        },
      },
    );

    const horizontalMotion = gsap.matchMedia();
    horizontalMotion.add(
      "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
      () => {
        const viewport = rootRef.current?.querySelector(
          ".technology-focus-viewport",
        );
        const track = rootRef.current?.querySelector(".technology-focus-track");
        if (!viewport || !track) return;

        const distance = () =>
          Math.max(0, track.scrollWidth - viewport.clientWidth);
        const scrollLength = () => Math.max(1, distance());
        const scrollTrigger = {
          trigger: ".technology-development",
          start: "top top",
          end: () => `+=${scrollLength()}`,
          pin: ".technology-development-stage",
          pinSpacing: true,
          scrub: 0.55,
          invalidateOnRefresh: true,
          snap: {
            snapTo: (progress) => Math.round(progress * 2) / 2,
            duration: { min: 0.18, max: 0.38 },
            delay: 0.025,
            ease: "power1.inOut",
          },
        };

        const progressFill = rootRef.current?.querySelector(
          ".technology-focus-progress-fill",
        );
        if (progressFill) {
          gsap.set(progressFill, { scaleX: 0, transformOrigin: "left center" });
        }

        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          onUpdate: function () {
            progressFill?.style.setProperty(
              "transform",
              `scaleX(${this.progress()})`,
            );
          },
          scrollTrigger,
        });
      },
    );
    registerCleanup(() => horizontalMotion.revert());

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".technology-partner",
          start: "top 86%",
          once: true,
        },
      })
      .fromTo(
        ".technology-partner-heading",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "expo.out" },
      )
      .fromTo(
        ".technology-partner-detail",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "expo.out",
        },
        "-=0.65",
      );

    gsap.fromTo(
      "#contact .closing-section-meta span, #contact > h2, #contact > p, #contact > .contact-action",
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: "#contact",
          start: "top 86%",
          once: true,
        },
      },
    );
  });

  return (
    <div ref={rootRef} className="site-shell technology-page">
      <SiteHeader active="technology" />
      <main id="main-content">
        <PageHero
          line="data-tech-line"
          lines={[
            "Cloud gaming, designed",
            <>
              for <em>changing conditions.</em>
            </>,
          ]}
          copy="TGC has developed AI-powered cloud gaming infrastructure focused on game execution, GPU rendering, and video delivery across different devices and network conditions."
          action={{ label: "Discuss the technology", href: "/contact" }}
          link={{ label: "Explore the platform", href: "/platform" }}
          media={{
            name: "technology-infrastructure",
            alt: "Server racks in a data centre, shown as representative infrastructure",
            width: 2069,
            height: 760,
            sizes: "(max-width: 900px) 100vw, 57vw",
            label: "Representative data-centre infrastructure",
            caption: "AI driven multicloud data-centre infrastructure.",
          }}
          foot={["Game execution", "GPU rendering", "Stream delivery"]}
        />

        <section className="technology-approach" id="approach">
          <div className="technology-approach-copy">
            <h2>Every session depends on more than a GPU.</h2>
            <p>
              Cloud gaming brings game execution, graphics processing, and video
              delivery together in one experience. TGC is developing
              infrastructure to coordinate these parts across different devices,
              network conditions, and available computing resources.
            </p>
          </div>
          <div className="technology-conditions">
            <span>Conditions the system must account for</span>
            <p>
              Network congestion <i /> Device capability <i /> Geographic
              distance <i /> Infrastructure availability
            </p>
          </div>
        </section>

        <section className="technology-development" id="development">
          <div className="technology-development-stage">
            <div className="technology-development-heading">
              <h2>Three areas shape the current engineering work.</h2>
            </div>
            <div className="technology-focus-viewport">
              <div className="technology-focus-track">
                {technologyFocusAreas.map(({ number, title, copy }) => (
                  <article className="technology-focus-panel" key={title}>
                    <span className="technology-focus-number">{number}</span>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="technology-focus-progress" aria-hidden="true">
              <span>01</span>
              <div>
                <i className="technology-focus-progress-fill" />
              </div>
              <span>03</span>
            </div>
          </div>
        </section>

        <section className="technology-partner" id="integration">
          <div className="technology-partner-heading">
            <h2>
              Every integration starts with the conditions a session must meet.
            </h2>
            <p>
              TGC assesses infrastructure options by geography, capacity,
              availability, and delivery requirements. Performance evidence
              should be read with the conditions under which it was gathered.
            </p>
          </div>
          <div className="technology-partner-details">
            <article className="technology-partner-detail">
              <span>Infrastructure assessment</span>
              <p>
                Region, available GPU capacity, infrastructure availability, and
                delivery requirements.
              </p>
            </article>
            <article className="technology-partner-detail">
              <span>Performance context</span>
              <p>
                Device, network conditions, resolution, frame rate, latency,
                location, test date, and methodology.
              </p>
            </article>
          </div>
        </section>

        <TechnicalFaq />

        <ClosingSection
          tone="signal"
          eyebrow="Technology enquiries"
          heading="Let’s discuss the infrastructure behind the experience."
          body="Contact TGC about cloud infrastructure, game publishing, or technology integration."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
