import { Arrow } from "./Arrow";

export function LinkButton({ href, children, light = false }) {
  return (
    <a className={light ? "action action--light" : "action"} href={href}>
      <span>{children}</span>
      <Arrow />
    </a>
  );
}
