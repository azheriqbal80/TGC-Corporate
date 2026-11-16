import { SiteHeader } from "../../components/layout/SiteHeader";
import { LinkButton } from "../../components/actions/LinkButton";
import { SiteFooter } from "../../components/layout/SiteFooter";

export function NotFoundPage() {
  return (
    <div className="site-shell not-found-page" id="top">
      <SiteHeader />
      <main id="main-content">
        <section>
          <h1>Page not found.</h1>
          <p>The page you requested may have moved or no longer exists.</p>
          <LinkButton href="/">Return home</LinkButton>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
