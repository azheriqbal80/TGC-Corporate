import { Arrow } from "../actions/Arrow";
import { LinkButton } from "../actions/LinkButton";
import { LazyPicture } from "../ui/LazyPicture";

/**
 * The opening hero every interior route starts with, directly below the header.
 *
 * Structure, layout, type scale and spacing are identical on every route that
 * uses it: a masked headline, a copy column, an action pair, a media plane and
 * a three-part foot strip. Only the text, the media and `tone` may differ.
 * `line` names the data attribute the owning page's motion setup animates on
 * each headline line, so the hero joins that page's own sequence.
 *
 * Home and Contact keep their own heroes; neither uses this component.
 */
export function PageHero({
  tone = "dark",
  lines,
  copy,
  action,
  link,
  media,
  foot,
  line = "data-hero-line",
  lazy = false,
}) {
  const lineProps = { [line]: "" };
  return (
    <section className={`page-hero page-hero--${tone}`} id="top">
      <div className="page-hero-title">
        <h1>
          {lines.map((content, index) => (
            <span className="line-mask" key={index}>
              <span {...lineProps}>{content}</span>
            </span>
          ))}
        </h1>
      </div>

      <p className="page-hero-copy">{copy}</p>

      <div className="page-hero-actions">
        <LinkButton href={action.href}>{action.label}</LinkButton>
        <a className="text-link" href={link.href}>
          {link.label} <Arrow />
        </a>
      </div>

      <HeroMedia media={media} lazy={lazy} />

      <div className="page-hero-foot">
        {foot.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  );
}

function HeroMedia({ media, lazy = false }) {
  const { name, alt, width, height, sizes, label, caption } = media;
  const sources = [
    {
      type: "image/avif",
      srcSet: `/images/${name}-960.avif 960w, /images/${name}-1600.avif 1600w`,
      sizes,
    },
    {
      type: "image/webp",
      srcSet: `/images/${name}-960.webp 960w, /images/${name}-1600.webp 1600w`,
      sizes,
    },
  ];
  return (
    <figure className="page-hero-media section-image" aria-label={label}>
      {lazy ? (
        <LazyPicture
          variant="hero"
          sources={sources}
          src={`/images/${name}.png`}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <picture>
          {sources.map((source) => (
            <source
              key={source.type}
              type={source.type}
              srcSet={source.srcSet}
              sizes={source.sizes}
            />
          ))}
          <img
            src={`/images/${name}.png`}
            alt={alt}
            width={width}
            height={height}
            decoding="async"
            fetchPriority="high"
          />
        </picture>
      )}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
