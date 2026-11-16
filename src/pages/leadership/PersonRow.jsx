import { LazyPicture } from "../../components/ui/LazyPicture";

export function PersonRow({ person, index, group }) {
  const [name, role, bio, portrait] = person;
  const initials = name
    .replace("Dr. ", "")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
  return (
    <article className="person-row" data-leadership-reveal>
      <div className="person-index">
        {group}.{String(index + 1).padStart(2, "0")}
      </div>
      <div
        className={
          portrait
            ? "person-portrait person-portrait--photo"
            : "person-portrait"
        }
        aria-hidden="true"
      >
        {portrait ? (
          <LazyPicture
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
      <div className="person-identity">
        <h3>{name}</h3>
        <p>{role}</p>
      </div>
      <p className="person-bio">{bio}</p>
    </article>
  );
}
