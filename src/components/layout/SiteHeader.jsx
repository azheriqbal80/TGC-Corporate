import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { AppIcon } from "../ui/AppIcon";
import { Arrow } from "../actions/Arrow";
import { navGroups } from "../../content/navigation";

export function SiteHeader({ active = "", lazyLogo = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState(
    ["platform", "technology", "company", "leadership"].includes(active)
      ? active
      : null,
  );
  const menuButtonRef = useRef(null);
  const navRef = useRef(null);
  const previousFocusRef = useRef(null);
  const closeMenu = () => setMenuOpen(false);
  const toggleGroup = (group) =>
    setExpandedGroup((current) => (current === group ? null : group));
  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    if (!menuOpen) return () => document.body.classList.remove("menu-is-open");

    previousFocusRef.current = document.activeElement;
    const main = document.querySelector("main");
    main?.setAttribute("inert", "");
    main?.setAttribute("aria-hidden", "true");
    const focusFrame = requestAnimationFrame(() =>
      navRef.current?.querySelector("a, button")?.focus(),
    );
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = [
        ...(navRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? []),
      ].filter((element) => !element.closest('[aria-hidden="true"]'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("menu-is-open");
      main?.removeAttribute("inert");
      main?.removeAttribute("aria-hidden");
      if (
        previousFocusRef.current instanceof HTMLElement &&
        previousFocusRef.current.isConnected
      ) {
        previousFocusRef.current.focus();
      }
    };
  }, [menuOpen]);
  const headerClassName = [
    "site-header",
    menuOpen && "site-header--open",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div
        className={
          menuOpen ? "nav-backdrop nav-backdrop--open" : "nav-backdrop"
        }
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <header className={headerClassName}>
        <div className="nav-capsule-head">
          <a href="/" className="brand" aria-label="The Game Company home">
            <img
              src="/brand/tgc-white.svg"
              alt=""
              width="2935"
              height="1309"
              loading={lazyLogo ? "lazy" : undefined}
              decoding="async"
            />
          </a>
          <button
            ref={menuButtonRef}
            className="menu-button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls="primary-menu"
            aria-label={menuOpen ? "Close" : "Menu"}
          >
            <span className="menu-label menu-label--closed" aria-hidden="true">
              Menu
            </span>
            <span className="menu-label menu-label--open" aria-hidden="true">
              Close
            </span>
          </button>
          <a className="header-contact" href="/contact">
            Contact <Arrow diagonal />
          </a>
        </div>
        <nav
          ref={navRef}
          id="primary-menu"
          className={menuOpen ? "nav nav--open" : "nav"}
          aria-label="Primary navigation"
          aria-hidden={!menuOpen}
          inert={!menuOpen}
        >
          <a className="nav-direct" href="/" onClick={closeMenu}>
            <span>Home</span>
            <Arrow diagonal />
          </a>
          {navGroups.map((group) => {
            const expanded = expandedGroup === group.key;
            return (
              <div
                className={`nav-group ${expanded ? "nav-group--expanded" : ""} ${active === group.key ? "active" : ""}`}
                key={group.key}
              >
                <div className="nav-group-row">
                  <a href={group.href} onClick={closeMenu}>
                    {group.label}
                  </a>
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.key)}
                    aria-expanded={expanded}
                    aria-controls={`${group.key}-sections`}
                    aria-label={`${expanded ? "Hide" : "Show"} ${group.label} sections`}
                  >
                    <AppIcon icon={Plus} size="md" className="nav-group-icon" />
                  </button>
                </div>
                <div
                  className="nav-submenu"
                  id={`${group.key}-sections`}
                  aria-hidden={!expanded}
                >
                  <div>
                    {group.links.map(([label, href]) => (
                      <a
                        href={href}
                        onClick={closeMenu}
                        key={href}
                        tabIndex={menuOpen && expanded ? undefined : -1}
                      >
                        <span>{label}</span>
                        <Arrow diagonal />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
          <a
            className={`nav-direct ${active === "contact" ? "active" : ""}`}
            href="/contact"
            onClick={closeMenu}
          >
            <span>Contact</span>
            <Arrow diagonal />
          </a>
          <a className="nav-primary-action" href="/contact" onClick={closeMenu}>
            Start a conversation <Arrow />
          </a>
        </nav>
      </header>
    </>
  );
}
