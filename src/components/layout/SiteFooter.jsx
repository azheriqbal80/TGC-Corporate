const LOCATION = "Dubai · UAE";

/**
 * The site-wide editorial closure.
 *
 * Every route renders this component in the same place: page level, after
 * `main`, outside any section. Structure, placement, layout, type and spacing
 * are identical everywhere. Only `tone`, which sets the surface and text
 * colour pairing, and the two text slots may differ.
 */
export function SiteFooter({ tone = "dark", location = LOCATION }) {
  return (
    <footer className={`site-footer site-footer--${tone}`}>
      <div className="site-footer-bar">
        <span>© {new Date().getFullYear()} The Game Company</span>
        <span>{location}</span>
        <div>
          <a href="#top">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
