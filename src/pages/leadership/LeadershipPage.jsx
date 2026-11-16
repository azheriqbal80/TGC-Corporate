import { useRef, useState } from "react";
import gsap from "gsap";
import { usePageMotion } from "../../motion/usePageMotion";
import { SiteHeader } from "../../components/layout/SiteHeader";
import { PageHero } from "../../components/layout/PageHero";
import { advisoryTeam, coreTeam } from "../../content/leadership";
import { PersonRow } from "./PersonRow";
import { SiteFooter } from "../../components/layout/SiteFooter";
import { ClosingSection } from "../../components/layout/ClosingSection";
import { LazyPicture } from "../../components/ui/LazyPicture";

function TeamActiveIdentity({ person, index, group }) {
  const [name, role, , portrait] = person;
  const initials = name
    .replace("Dr. ", "")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="team-active-title" aria-hidden="true">
      <span className="team-active-index">
        {group}.{String(index + 1).padStart(2, "0")}
      </span>
      <div
        className={
          portrait
            ? "person-portrait person-portrait--photo team-active-portrait"
            : "person-portrait team-active-portrait"
        }
      >
        {portrait ? (
          <LazyPicture
            key={portrait}
            variant="portrait"
            sources={[
              {
                type: "image/avif",
                srcSet: `/images/team/${portrait}.avif`,
              },
              {
                type: "image/webp",
                srcSet: `/images/team/${portrait}.webp`,
              },
            ]}
            src={`/images/team/${portrait}.png`}
            alt=""
            width="236"
            height="300"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <>
            <span>{initials}</span>
            <i />
          </>
        )}
      </div>
      <h3 key={name}>{name}</h3>
      <p>{role}</p>
    </div>
  );
}

export function LeadershipPage() {
  const rootRef = useRef(null);
  const [activeCore, setActiveCore] = useState(0);
  const [activeAdvisory, setActiveAdvisory] = useState(0);

  usePageMotion(rootRef, ({ registerCleanup }) => {
    gsap.from("[data-leadership-line]", {
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
      delay: 0.25,
      ease: "power3.out",
    });
    const pinnedTeamMotion = window.matchMedia(
      "(min-width: 901px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)",
    ).matches;
    gsap.utils
      .toArray("[data-leadership-reveal]")
      .filter(
        (element) =>
          !(
            pinnedTeamMotion &&
            element.matches(
              ".team-section--core .person-row, .team-section--advisory .person-row",
            )
          ),
      )
      .forEach((element) =>
        gsap.fromTo(
          element,
          { y: 36, opacity: 0.18 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          },
        ),
      );

    const setupPinnedVerticalSequence = ({
      sectionSelector,
      count,
      setActiveIndex,
    }) => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 901px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)",
        () => {
          const section = rootRef.current?.querySelector(sectionSelector);
          const stage = section?.querySelector(".team-stage");
          const viewport = section?.querySelector(".team-viewport");
          const track = section?.querySelector(".team-track");
          const progressFill = section?.querySelector(".team-progress-fill");
          if (!section || !stage || !viewport || !track || count < 2) return;

          section.dataset.teamMotion = "enabled";
          setActiveIndex(0);
          let currentIndex = -1;
          const distance = () =>
            Math.max(0, track.scrollHeight - viewport.clientHeight);

          gsap.to(track, {
            y: () => -distance(),
            ease: "none",
            onUpdate: function () {
              const nextIndex = Math.min(
                count - 1,
                Math.round(this.progress() * (count - 1)),
              );
              if (nextIndex !== currentIndex) {
                currentIndex = nextIndex;
                setActiveIndex(nextIndex);
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
              pin: stage,
              pinSpacing: true,
              scrub: 0.55,
              invalidateOnRefresh: true,
              snap: {
                snapTo: (progress) =>
                  Math.round(progress * (count - 1)) / (count - 1),
                duration: { min: 0.18, max: 0.38 },
                delay: 0.025,
                ease: "power1.inOut",
              },
            },
          });

          return () => {
            delete section.dataset.teamMotion;
          };
        },
      );
      registerCleanup(() => mm.revert());
    };

    setupPinnedVerticalSequence({
      sectionSelector: ".team-section--core",
      count: coreTeam.length,
      setActiveIndex: setActiveCore,
    });

    setupPinnedVerticalSequence({
      sectionSelector: ".team-section--advisory",
      count: advisoryTeam.length,
      setActiveIndex: setActiveAdvisory,
    });
  });

  return (
    <div ref={rootRef} className="site-shell leadership-page">
      <SiteHeader active="leadership" lazyLogo />
      <main id="main-content">
        <PageHero
          lazy
          line="data-leadership-line"
          lines={[
            "The people",
            <>
              building <em>TGC.</em>
            </>,
          ]}
          copy="The Core Team operates the company. The Advisory Team contributes external perspective across technology, finance, policy, gaming, and emerging markets."
          action={{ label: "About the company", href: "/company" }}
          link={{ label: "Contact TGC", href: "/contact" }}
          media={{
            name: "leadership-team",
            alt: "Minimalist executive boardroom overlooking the Dubai skyline at dusk with a dark conference table and two facing rows of chairs",
            width: 1376,
            height: 768,
            sizes: "(max-width: 900px) 100vw, 57vw",
            label: "Executive leadership boardroom",
            caption:
              "A powerhouse of global industry leaders, innovators, and strategic advisors with proven expertise in building and scaling businesses.",
          }}
          foot={[
            `Core team ${String(coreTeam.length).padStart(2, "0")}`,
            `Advisory team ${String(advisoryTeam.length).padStart(2, "0")}`,
            "Dubai · UAE",
          ]}
        />

        <section
          className="team-section team-section--core"
          id="core-team"
          aria-labelledby="core-team-title"
          style={{ "--team-count": coreTeam.length }}
        >
          <div className="team-stage">
            <header data-leadership-reveal>
              <span>Core Team</span>
              <h2 id="core-team-title">
                Responsible for building and operating the company.
              </h2>
            </header>
            <div className="team-sequence">
              <TeamActiveIdentity
                person={coreTeam[activeCore]}
                index={activeCore}
                group="C"
              />
              <div className="team-viewport">
                <div className="people-list team-track">
                  {coreTeam.map((person, index) => (
                    <PersonRow
                      key={person[0]}
                      person={person}
                      index={index}
                      group="C"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="team-progress" aria-hidden="true">
              <span className="team-progress-current">
                {String(activeCore + 1).padStart(2, "0")}
              </span>
              <div>
                <i className="team-progress-fill" />
              </div>
              <span>{String(coreTeam.length).padStart(2, "0")}</span>
            </div>
          </div>
        </section>

        <section
          className="team-section team-section--advisory"
          id="advisory-team"
          aria-labelledby="advisory-team-title"
          style={{ "--team-count": advisoryTeam.length }}
        >
          <div className="team-stage">
            <header data-leadership-reveal>
              <span>Advisory Team</span>
              <h2 id="advisory-team-title">
                External perspective across technology, finance, policy, and
                gaming.
              </h2>
            </header>
            <div className="team-sequence">
              <TeamActiveIdentity
                person={advisoryTeam[activeAdvisory]}
                index={activeAdvisory}
                group="A"
              />
              <div className="team-viewport">
                <div className="people-list team-track">
                  {advisoryTeam.map((person, index) => (
                    <PersonRow
                      key={person[0]}
                      person={person}
                      index={index}
                      group="A"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="team-progress" aria-hidden="true">
              <span className="team-progress-current">
                {String(activeAdvisory + 1).padStart(2, "0")}
              </span>
              <div>
                <i className="team-progress-fill" />
              </div>
              <span>{String(advisoryTeam.length).padStart(2, "0")}</span>
            </div>
          </div>
        </section>

        <ClosingSection
          eyebrow="Leadership enquiries"
          heading="Twelve people, two teams, one operating company."
          body="The Core Team runs TGC day to day. The Advisory Team brings outside perspective to the decisions that shape it. Contact the company for partnership, publishing, or media enquiries."
          reveal="data-leadership-reveal"
        />
      </main>

      <SiteFooter />
    </div>
  );
}
