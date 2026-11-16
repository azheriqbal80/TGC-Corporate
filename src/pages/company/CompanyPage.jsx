import { useRef } from "react";
import gsap from "gsap";
import { usePageMotion } from "../../motion/usePageMotion";
import { SiteHeader } from "../../components/layout/SiteHeader";
import { PageHero } from "../../components/layout/PageHero";
import { Arrow } from "../../components/actions/Arrow";
import { companyPrinciples } from "../../content/company";
import { SiteFooter } from "../../components/layout/SiteFooter";
import { ClosingSection } from "../../components/layout/ClosingSection";

export function CompanyPage() {
  const rootRef = useRef(null);

  usePageMotion(rootRef, () => {
    gsap.from("[data-company-line]", {
      yPercent: 112,
      duration: 1.1,
      stagger: 0.1,
      ease: "expo.out",
    });
    gsap.from(".page-hero-copy, .page-hero-actions, .page-hero-media", {
      opacity: 0,
      y: 26,
      duration: 0.9,
      stagger: 0.1,
      delay: 0.28,
      ease: "power3.out",
    });
    gsap.utils.toArray("[data-company-reveal]").forEach((element) => {
      const row = element.tagName === "ARTICLE";
      gsap.fromTo(
        element,
        row ? { x: 34, opacity: 0.15 } : { y: 42, opacity: 0.15 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        },
      );
    });
    gsap.fromTo(
      ".company-axis-fill",
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: {
          trigger: ".company-story",
          start: "top 65%",
          end: "bottom 70%",
          scrub: 0.5,
        },
      },
    );
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".company-leadership",
          start: "top 78%",
          once: true,
        },
      })
      .fromTo(
        ".company-leadership-heading",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: "expo.out" },
      )
      .fromTo(
        ".company-leadership-role",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: "expo.out",
        },
        "-=0.55",
      );
  });

  return (
    <div ref={rootRef} className="site-shell company-page">
      <SiteHeader active="company" lazyLogo />
      <main id="main-content">
        <PageHero
          lazy
          line="data-company-line"
          lines={[
            "Expanding where",
            <>
              high-performance games <em>can run.</em>
            </>,
          ]}
          copy="The Game Company is building AI-powered cloud gaming infrastructure designed to make demanding games accessible across more devices, networks, and markets."
          action={{ label: "Contact TGC", href: "/contact" }}
          link={{ label: "Explore the platform", href: "/platform" }}
          media={{
            name: "company-dubai",
            alt: "TGC's Dubai base represented by a contemporary workspace overlooking the city",
            width: 2043,
            height: 770,
            sizes: "(max-width: 900px) 100vw, 57vw",
            label: "TGC's base in Dubai",
            caption: "Dubai · United Arab Emirates",
          }}
          foot={["Purpose", "Principles", "People"]}
        />

        <section className="company-mission" id="mission">
          <span className="company-section-label">01 · Purpose</span>
          <div data-company-reveal>
            <h2>
              Access to advanced gaming should extend beyond local hardware.
            </h2>
            <p>
              High-performance games can demand specialised devices, large
              amounts of storage, and consistently strong connectivity. TGC is
              working to reduce those barriers through cloud delivery,
              intelligent optimisation, and infrastructure designed for
              different regions and operating conditions.
            </p>
            <p>
              The objective is not simply to move a game into the cloud. It is
              to build an infrastructure layer capable of adapting delivery to
              the player, device, network, and available resources.
            </p>
          </div>
        </section>

        <section className="company-story" id="story">
          <div className="company-story-axis" aria-hidden="true">
            <i className="company-axis-fill" />
            <span>Dubai</span>
            <b />
            <span>Global outlook</span>
          </div>
          <div className="company-story-copy" data-company-reveal>
            <span className="company-section-label">02 · Origin</span>
            <h2>Built from Dubai with a global outlook.</h2>
            <p>
              TGC is based in Dubai, United Arab Emirates, and brings together
              experience across gaming, artificial intelligence, cloud
              infrastructure, telecommunications, enterprise technology,
              operations, law, finance, and emerging digital systems.
            </p>
          </div>
          <div className="company-story-note" data-company-reveal>
            <span>Operating perspective</span>
            <p>
              A regional base connected to global infrastructure, technology,
              and gaming ecosystems.
            </p>
          </div>
        </section>

        <section className="company-principles" id="principles">
          <div className="company-principles-title" data-company-reveal>
            <span className="company-section-label">03 · Principles</span>
            <h2>How TGC approaches the work.</h2>
          </div>
          <div className="company-principles-list">
            {companyPrinciples.map(([title, copy], index) => (
              <article key={title} data-company-reveal>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <i />
              </article>
            ))}
          </div>
        </section>

        <section
          className="company-leadership"
          aria-labelledby="company-leadership-title"
        >
          <div className="company-leadership-heading">
            <h2 className="company-section-label" id="company-leadership-title">
              04 · Leadership
            </h2>
            <a className="company-leadership-link" href="/leadership">
              Meet the leadership <Arrow diagonal />
            </a>
          </div>
          <div className="company-leadership-roles">
            <article className="company-leadership-role">
              <span>Core team</span>
              <h3>Core operators.</h3>
              <p>
                The Core Team leads TGC’s strategy, technology, operations,
                commercial development, legal affairs, and engineering.
              </p>
            </article>
            <article className="company-leadership-role">
              <span>Advisory team</span>
              <h3>
                <em>Experienced advisers.</em>
              </h3>
              <p>
                The Advisory Team contributes external experience across
                artificial intelligence, gaming, investment, sustainability,
                policy, and digital systems.
              </p>
            </article>
          </div>
        </section>

        <ClosingSection
          tone="signal"
          eyebrow="Corporate enquiries"
          heading="Start a conversation with TGC."
          body="Contact the company about the platform, infrastructure partnerships, publishing opportunities, media requests, or other corporate enquiries."
          reveal="data-company-reveal"
        />
      </main>

      <SiteFooter />
    </div>
  );
}
