import { Arrow } from "../actions/Arrow";

const LOCATION = "Dubai, UAE";

/**
 * The closing call to action every route ends with, directly above the footer.
 *
 * Structure, layout, type scale and spacing are identical on every route. Only
 * the text slots and `tone`, which pairs the surface with its text and action
 * colours, may differ. `reveal` names the data attribute the owning page's
 * motion setup animates, so the section joins that page's reveal sequence.
 */
export function ClosingSection({
  tone = "dark",
  eyebrow,
  location = LOCATION,
  heading,
  body,
  action = "Contact TGC",
  href = "/contact",
  reveal = "data-reveal",
}) {
  const revealProps = { [reveal]: "" };
  return (
    <section
      className={`closing-section closing-section--${tone}`}
      id="contact"
    >
      <div className="closing-section-meta">
        <span>{eyebrow}</span>
        <span>{location}</span>
      </div>
      <h2 {...revealProps}>{heading}</h2>
      <p {...revealProps}>{body}</p>
      <a className="contact-action" href={href} {...revealProps}>
        <span>{action}</span>
        <Arrow diagonal />
      </a>
    </section>
  );
}
