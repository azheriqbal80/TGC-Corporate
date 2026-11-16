import { cloneElement, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Check } from "lucide-react";
import { usePageMotion } from "../../motion/usePageMotion";
import { SiteHeader } from "../../components/layout/SiteHeader";
import { Arrow } from "../../components/actions/Arrow";
import { AppIcon } from "../../components/ui/AppIcon";
import { enquiryOptions, officeLocation } from "../../content/contact";
import { SiteFooter } from "../../components/layout/SiteFooter";

const DISPATCH_FRAMES = 5;
const FRAME_INTERVAL_MS = 75;

export function ContactPage() {
  const rootRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    organisation: "",
    topic: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [submitPhase, setSubmitPhase] = useState("idle");
  const [dispatchFrame, setDispatchFrame] = useState(0);
  const frameTimerRef = useRef(null);

  const clearDispatchTimer = () => {
    if (frameTimerRef.current !== null) {
      window.clearInterval(frameTimerRef.current);
      frameTimerRef.current = null;
    }
  };

  useEffect(() => () => clearDispatchTimer(), []);

  const update = ({ target }) => {
    clearDispatchTimer();
    setForm((value) => ({
      ...value,
      [target.name]: target.type === "checkbox" ? target.checked : target.value,
    }));
    setErrors((value) => ({ ...value, [target.name]: "" }));
    setStatus("");
    setSubmitPhase("idle");
    setDispatchFrame(0);
  };
  const submit = (event) => {
    event.preventDefault();
    if (submitPhase === "dispatching") return;
    const next = {};
    if (!form.name.trim()) next.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      next.email = "Enter a valid work email.";
    if (!form.organisation.trim())
      next.organisation = "Enter your company or organisation.";
    if (!form.topic) next.topic = "Choose an enquiry type.";
    if (form.message.trim().length < 20)
      next.message =
        "Add at least 20 characters so the team has enough context.";
    if (!form.consent)
      next.consent = "Confirm that TGC may use these details to respond.";
    setErrors(next);
    if (Object.keys(next).length) {
      clearDispatchTimer();
      setStatus("invalid");
      setSubmitPhase("idle");
      setDispatchFrame(0);
      requestAnimationFrame(() =>
        document.querySelector(".contact-form [aria-invalid='true']")?.focus(),
      );
      return;
    }
    setStatus("pending");
    clearDispatchTimer();
    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setDispatchFrame(DISPATCH_FRAMES);
      setSubmitPhase("success");
      return;
    }
    setSubmitPhase("dispatching");
    setDispatchFrame(1);
    let step = 1;
    frameTimerRef.current = window.setInterval(() => {
      step += 1;
      if (step <= DISPATCH_FRAMES) {
        setDispatchFrame(step);
      } else {
        clearDispatchTimer();
        setSubmitPhase("success");
      }
    }, FRAME_INTERVAL_MS);
  };
  usePageMotion(rootRef, () => {
    gsap.from(".contact-intro > *, .contact-form-shell", {
      y: 34,
      opacity: 0.15,
      duration: 0.9,
      stagger: 0.08,
      ease: "expo.out",
    });
  });
  const field = (name, label, control) => {
    const errorId = `${name}-error`;
    return (
      <label className={name === "name" || name === "email" ? "" : "form-wide"}>
        <span>
          {label} <b aria-hidden="true">*</b>
          <span className="sr-only"> required</span>
        </span>
        {cloneElement(control, {
          required: true,
          "aria-describedby": errors[name] ? errorId : undefined,
        })}
        {errors[name] && <small id={errorId}>{errors[name]}</small>}
      </label>
    );
  };
  return (
    <div ref={rootRef} className="site-shell contact-page" id="top">
      <SiteHeader active="contact" />
      <main className="contact-main" id="main-content">
        <div className="contact-opening">
          <section className="contact-intro">
            <div className="contact-intro-mark" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <h1>
              Start the
              <br />
              <em>conversation.</em>
            </h1>
            <p>
              Contact The Game Company about the platform, technology,
              infrastructure partnerships, publishing opportunities, media
              requests, or other corporate enquiries.
            </p>
            <div className="contact-location">
              <span>{officeLocation.organisation}</span>
              <strong>
                {officeLocation.addressLine1},
                <br />
                {officeLocation.addressLine2}
              </strong>
            </div>
          </section>
          <section
            className="contact-form-shell"
            aria-labelledby="contact-form-title"
          >
            <div className="contact-form-heading">
              <h2 id="contact-form-title">How can we help?</h2>
              <p>
                Share a few details and your enquiry will be directed to the
                appropriate TGC team.
              </p>
            </div>
            <form className="contact-form" onSubmit={submit} noValidate>
              {field(
                "name",
                "Full name",
                <input
                  name="name"
                  value={form.name}
                  onChange={update}
                  aria-invalid={Boolean(errors.name)}
                  autoComplete="name"
                  maxLength="100"
                />,
              )}
              {field(
                "email",
                "Work email",
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={update}
                  aria-invalid={Boolean(errors.email)}
                  autoComplete="email"
                  maxLength="254"
                />,
              )}
              {field(
                "organisation",
                "Company or organisation",
                <input
                  name="organisation"
                  value={form.organisation}
                  onChange={update}
                  aria-invalid={Boolean(errors.organisation)}
                  autoComplete="organization"
                  maxLength="150"
                />,
              )}
              {field(
                "topic",
                "What would you like to discuss?",
                <select
                  name="topic"
                  value={form.topic}
                  onChange={update}
                  aria-invalid={Boolean(errors.topic)}
                >
                  <option value="">Select an enquiry type</option>
                  {enquiryOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>,
              )}
              {field(
                "message",
                "Tell us about your enquiry",
                <textarea
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={update}
                  aria-invalid={Boolean(errors.message)}
                  minLength="20"
                  maxLength="2000"
                />,
              )}
              <label className="consent form-wide">
                <input
                  name="consent"
                  type="checkbox"
                  checked={form.consent}
                  onChange={update}
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={
                    errors.consent ? "consent-error" : undefined
                  }
                  required
                />
                <span>
                  I understand that TGC will use the information provided to
                  review and respond to this enquiry.{" "}
                  <b aria-hidden="true">*</b>
                  <span className="sr-only"> required</span>
                </span>
                {errors.consent && (
                  <small id="consent-error">{errors.consent}</small>
                )}
              </label>
              {status === "invalid" && (
                <div
                  className="form-status form-status--error form-wide"
                  role="alert"
                >
                  <strong>Check the highlighted fields.</strong>
                  <span>Your information has not been submitted.</span>
                </div>
              )}
              {status === "pending" && (
                <div className="form-status form-wide" role="status">
                  <strong>Submission routing is being configured.</strong>
                  <span>
                    Your details have not been sent. TGC must approve a secure
                    recipient or endpoint before this form can go live.
                  </span>
                </div>
              )}
              <button
                className="contact-submit form-wide"
                type="submit"
                data-submit-state={submitPhase}
                aria-busy={submitPhase === "dispatching"}
                aria-disabled={submitPhase === "dispatching"}
              >
                <span className="contact-submit-label">
                  {submitPhase === "success" && (
                    <i className="contact-submit-node" aria-hidden="true" />
                  )}
                  <span>
                    {submitPhase === "dispatching"
                      ? "Validating enquiry"
                      : submitPhase === "success"
                        ? "Enquiry validated"
                        : "Send enquiry"}
                  </span>
                </span>
                <span className="contact-submit-indicator" aria-hidden="true">
                  {submitPhase === "dispatching" ? (
                    <span className="contact-submit-frames">
                      {[1, 2, 3, 4, 5].map((frameIndex) => (
                        <i
                          key={frameIndex}
                          className={
                            dispatchFrame >= frameIndex
                              ? "is-active"
                              : undefined
                          }
                        />
                      ))}
                    </span>
                  ) : submitPhase === "success" ? (
                    <AppIcon
                      icon={Check}
                      size="md"
                      className="contact-submit-check"
                    />
                  ) : (
                    <Arrow diagonal />
                  )}
                </span>
                <span
                  className="contact-submit-rail"
                  aria-hidden="true"
                  style={{
                    transform: `scaleX(${
                      submitPhase === "success"
                        ? 1
                        : submitPhase === "dispatching"
                          ? dispatchFrame / DISPATCH_FRAMES
                          : 0
                    })`,
                  }}
                />
              </button>
            </form>
          </section>
        </div>
        <section className="contact-guidance">
          <h2>The right context helps us respond.</h2>
          <div>
            <article>
              <span>Platform and publishing</span>
              <p>
                Include the intended market, game catalogue, audience, platform,
                or distribution opportunity.
              </p>
            </article>
            <article>
              <span>Technology and infrastructure</span>
              <p>
                Include the relevant cloud environment, region, integration
                need, or technical objective.
              </p>
            </article>
            <article>
              <span>Media and press</span>
              <p>
                Include the publication, topic, deadline, and preferred contact
                method.
              </p>
            </article>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
