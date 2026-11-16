import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePageMotion } from "../../motion/usePageMotion";
import { SiteHeader } from "../../components/layout/SiteHeader";
import { PageHero } from "../../components/layout/PageHero";
import { SiteFooter } from "../../components/layout/SiteFooter";
import { ClosingSection } from "../../components/layout/ClosingSection";
import { Arrow } from "../../components/actions/Arrow";
import { LazyPicture } from "../../components/ui/LazyPicture";
import {
  future100Data,
  menaAwardData,
  publicDemonstrations,
} from "../../content/achievements";

export function AchievementsPage() {
  const rootRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressFillRef = useRef(null);

  useEffect(() => {
    const bar = progressBarRef.current;
    const fill = progressFillRef.current;
    if (!bar || !fill) return;

    let frameId = 0;
    const updateProgress = () => {
      frameId = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const raw = scrollable > 0 ? window.scrollY / scrollable : 0;
      const clamped = Math.min(1, Math.max(0, raw));
      fill.style.transform = `scaleX(${clamped})`;
      bar.setAttribute("aria-valuenow", String(Math.round(clamped * 100)));
    };

    const scheduleUpdate = () => {
      if (frameId) return;
      frameId = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  usePageMotion(rootRef, () => {
    gsap.from("[data-achievements-line]", {
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
    gsap.utils.toArray("[data-achievements-reveal]").forEach((element) => {
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
  });

  return (
    <div ref={rootRef} className="site-shell achievements-page">
      <div
        ref={progressBarRef}
        className="achievements-progress"
        role="progressbar"
        aria-label="Reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
      >
        <span ref={progressFillRef} className="achievements-progress-fill" />
      </div>
      <SiteHeader active="company" lazyLogo />
      <main id="main-content">
        <PageHero
          lazy
          line="data-achievements-line"
          lines={[
            "Built, tested, and",
            <>
              recognised <em>publicly.</em>
            </>,
          ]}
          copy="National programme selection, independent gaming industry recognition, and live public demonstrations across regional and global technology events."
          action={{ label: "About the company", href: "/company" }}
          link={{ label: "Meet the leadership", href: "/leadership" }}
          media={{
            name: "achievements-hero",
            alt: "Live cloud gaming demonstration kiosk inside a dark exhibition pavilion with visitors testing gameplay on a thin laptop",
            width: 1376,
            height: 768,
            sizes: "(max-width: 900px) 100vw, 57vw",
            label: "TGC live public demonstrations and industry recognition",
            caption: "Representative live demonstration showcase.",
          }}
          foot={[
            "Future 100 UAE",
            "MENA Games Awards",
            "Public demonstrations",
          ]}
        />

        <section
          className="achievements-future100"
          id="future-100"
          aria-labelledby="future-100-heading"
        >
          <div className="achievements-section-meta">
            <span className="achievements-section-label">
              {future100Data.eyebrow}
            </span>
            <a
              className="achievements-verify-link"
              href={future100Data.verifyUrl}
              target="_blank"
              rel="noreferrer"
            >
              {future100Data.verifyLabel} <Arrow diagonal />
            </a>
          </div>

          <div className="achievements-future100-grid">
            <div
              className="achievements-future100-body"
              data-achievements-reveal
            >
              <h2 id="future-100-heading">{future100Data.heading}</h2>
              <div className="achievements-prose">
                {future100Data.paragraphs.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
              <dl className="achievements-ledger">
                {future100Data.ledger.map(([term, detail]) => (
                  <div className="achievements-ledger-row" key={term}>
                    <dt>{term}</dt>
                    <dd>{detail}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <figure
              className="achievements-trophy-frame"
              data-achievements-reveal
            >
              <LazyPicture
                variant="editorial"
                sources={[
                  {
                    type: "image/avif",
                    srcSet: "/images/achievements/future-100-trophy.avif",
                  },
                  {
                    type: "image/webp",
                    srcSet: "/images/achievements/future-100-trophy.webp",
                  },
                ]}
                src="/images/achievements/future-100-trophy.png"
                alt="Future 100 UAE national programme trophy engraved with riyada and Future 100 emblems"
                width="760"
                height="1288"
                loading="lazy"
                decoding="async"
              />
              <figcaption>{future100Data.trophyCaption}</figcaption>
            </figure>
          </div>

          <div
            className="achievements-endorsement"
            data-achievements-reveal
            aria-label="Future 100 institutional programme partners"
          >
            <div className="achievements-endorsement-header">
              <span>{future100Data.institutionsLabel}</span>
            </div>
            <div className="achievements-endorsement-logos">
              <div className="achievements-endorsement-strip">
                <LazyPicture
                  variant="contain"
                  sources={[
                    {
                      type: "image/avif",
                      srcSet:
                        "/images/achievements/future-100-institutions.avif",
                    },
                    {
                      type: "image/webp",
                      srcSet:
                        "/images/achievements/future-100-institutions.webp",
                    },
                  ]}
                  src="/images/achievements/future-100-institutions.png"
                  alt="Future 100, UAE Ministry of Economy and Tourism, riyada National Entrepreneurship Ecosystem, and Minister of State for Government Development and the Future logos"
                  width="1002"
                  height="154"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          className="achievements-award"
          id="mena-awards"
          aria-labelledby="mena-awards-heading"
        >
          <div className="achievements-award-head">
            <span className="achievements-section-label">
              {menaAwardData.eyebrow}
            </span>
            <a
              className="achievements-award-link"
              href={menaAwardData.verifyUrl}
              target="_blank"
              rel="noreferrer"
            >
              {menaAwardData.verifyLabel} <Arrow diagonal />
            </a>
          </div>

          <div className="achievements-award-grid">
            <figure
              className="achievements-award-frame"
              data-achievements-reveal
            >
              <LazyPicture
                variant="editorial"
                sources={[
                  {
                    type: "image/avif",
                    srcSet: "/images/achievements/mena-games-award.avif",
                  },
                  {
                    type: "image/webp",
                    srcSet: "/images/achievements/mena-games-award.webp",
                  },
                ]}
                src="/images/achievements/mena-games-award.png"
                alt="MENA Games Industry Awards 2025 trophy for Best Web3 Gaming, sponsored by BlockchainGamer.biz"
                width="926"
                height="1152"
                loading="lazy"
                decoding="async"
              />
              <figcaption>{menaAwardData.caption}</figcaption>
            </figure>

            <div className="achievements-award-body" data-achievements-reveal>
              <span className="achievements-award-kicker">
                {menaAwardData.kicker}
              </span>
              <h2 id="mena-awards-heading">{menaAwardData.heading}</h2>
              <p className="achievements-award-summary">
                {menaAwardData.summary}
              </p>
              <dl className="achievements-ledger achievements-ledger--dark">
                {menaAwardData.ledger.map(([term, detail]) => (
                  <div className="achievements-ledger-row" key={term}>
                    <dt>{term}</dt>
                    <dd>{detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section
          className="achievements-demos"
          id="demonstrations"
          aria-labelledby="demonstrations-heading"
        >
          <div className="achievements-demos-intro" data-achievements-reveal>
            <div>
              <span className="achievements-section-label">
                03 · Public Demonstrations
              </span>
              <p className="achievements-demos-region">
                Infrastructure testing across 33 regions
              </p>
            </div>
            <div>
              <h2 id="demonstrations-heading">
                Live demonstrations tested in real conditions.
              </h2>
              <p className="achievements-demos-lead">
                Alongside technical testing across cloud regions, TGC has
                demonstrated live gameplay on standard consumer hardware and
                shared event networks at public industry gatherings.
              </p>
            </div>
          </div>

          <div className="achievements-demos-list">
            {publicDemonstrations.map(([venue, title, copy], index) => (
              <article key={venue} data-achievements-reveal>
                <span className="achievements-demo-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="achievements-demo-heading">
                  <span className="achievements-demo-venue">{venue}</span>
                  <h3>{title}</h3>
                </div>
                <p>{copy}</p>
                <i aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <ClosingSection
          tone="dark"
          eyebrow="Corporate enquiries"
          heading="Verify our credentials or start a conversation."
          body="Contact The Game Company regarding official recognition, technology demonstrations, infrastructure partnerships, or media enquiries."
          reveal="data-achievements-reveal"
        />
      </main>
      <SiteFooter tone="dark" />
    </div>
  );
}
