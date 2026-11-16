import {
  lazy,
  startTransition,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
import { applyRouteMeta, getRouteMeta, normalizePath } from "./siteMeta";

const loadHomePage = () =>
  import("./pages/home/HomePage").then((module) => ({
    default: module.HomePage,
  }));
const loadPlatformPage = () =>
  import("./pages/platform/PlatformPage").then((module) => ({
    default: module.PlatformPage,
  }));
const loadTechnologyPage = () =>
  import("./pages/technology/TechnologyPage").then((module) => ({
    default: module.TechnologyPage,
  }));
const loadCompanyPage = () =>
  import("./pages/company/CompanyPage").then((module) => ({
    default: module.CompanyPage,
  }));
const loadLeadershipPage = () =>
  import("./pages/leadership/LeadershipPage").then((module) => ({
    default: module.LeadershipPage,
  }));
const loadAchievementsPage = () =>
  import("./pages/achievements/AchievementsPage").then((module) => ({
    default: module.AchievementsPage,
  }));
const loadContactPage = () =>
  import("./pages/contact/ContactPage").then((module) => ({
    default: module.ContactPage,
  }));
const loadDesignGuidePage = () =>
  import("./pages/design-guide/DesignGuidePage");
const loadNotFoundPage = () =>
  import("./pages/not-found/NotFoundPage").then((module) => ({
    default: module.NotFoundPage,
  }));

const HomePage = lazy(loadHomePage);
const PlatformPage = lazy(loadPlatformPage);
const TechnologyPage = lazy(loadTechnologyPage);
const CompanyPage = lazy(loadCompanyPage);
const LeadershipPage = lazy(loadLeadershipPage);
const AchievementsPage = lazy(loadAchievementsPage);
const ContactPage = lazy(loadContactPage);
const DesignGuidePage = lazy(loadDesignGuidePage);
const NotFoundPage = lazy(loadNotFoundPage);

const ROUTE_LOADERS = {
  "/": loadHomePage,
  "/platform": loadPlatformPage,
  "/technology": loadTechnologyPage,
  "/company": loadCompanyPage,
  "/leadership": loadLeadershipPage,
  "/achievements": loadAchievementsPage,
  "/contact": loadContactPage,
  "/design-guide": loadDesignGuidePage,
};

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

async function preloadRoute(pathname) {
  const loader = ROUTE_LOADERS[normalizePath(pathname)] ?? loadNotFoundPage;
  try {
    await loader();
  } catch {
    // Allow React Suspense / normal error handling on render
  }
}

function RouteView({ path }) {
  if (path === "/platform") return <PlatformPage />;
  if (path === "/technology") return <TechnologyPage />;
  if (path === "/company") return <CompanyPage />;
  if (path === "/leadership") return <LeadershipPage />;
  if (path === "/achievements") return <AchievementsPage />;
  if (path === "/contact") return <ContactPage />;
  if (path === "/design-guide") return <DesignGuidePage />;
  if (getRouteMeta(path).found) return <HomePage />;
  return <NotFoundPage />;
}

function getCurrentLocation() {
  return {
    pathname: normalizePath(window.location.pathname),
    search: window.location.search,
    hash: window.location.hash,
  };
}

export default function App() {
  const [location, setLocation] = useState(getCurrentLocation);
  const [usedViewTransition, setUsedViewTransition] = useState(false);
  const navTokenRef = useRef(0);
  const path = location.pathname;
  const routeKey = `${location.pathname}${location.search}`;

  // Quietly warm secondary routes during browser idle time so link clicks are instant.
  useEffect(() => {
    const warmRoutes = () => {
      Object.entries(ROUTE_LOADERS).forEach(([routePath, loader]) => {
        if (routePath !== path && routePath !== "/design-guide") {
          void loader();
        }
      });
    };

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(warmRoutes, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = window.setTimeout(warmRoutes, 900);
    return () => window.clearTimeout(timer);
  }, [path]);

  useEffect(() => {
    applyRouteMeta(path);

    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }

    const hash = decodeURIComponent(location.hash.slice(1));
    const tryScroll = () => {
      const target = document.getElementById(hash);
      if (!target) return false;
      requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
      return true;
    };

    if (tryScroll()) return;

    const root = document.getElementById("root");
    if (!root) return;

    const observer = new MutationObserver(() => {
      if (tryScroll()) observer.disconnect();
    });
    observer.observe(root, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [path, location.hash]);

  useEffect(() => {
    const handlePopState = () => {
      navTokenRef.current += 1;
      setUsedViewTransition(false);
      startTransition(() => {
        setLocation(getCurrentLocation());
      });
    };

    const handleLinkHover = (event) => {
      const anchor = event.target?.closest?.("a[href]");
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;
      try {
        const url = new URL(anchor.href, window.location.origin);
        if (url.origin === window.location.origin) {
          void preloadRoute(url.pathname);
        }
      } catch {
        // Ignore malformed URLs
      }
    };

    const handleLinkClick = async (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = event.target?.closest?.("a[href]");
      if (
        !anchor ||
        (anchor.target && anchor.target !== "_self") ||
        anchor.hasAttribute("download")
      ) {
        return;
      }

      let url;
      try {
        url = new URL(anchor.href, window.location.origin);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;

      const targetPath = normalizePath(url.pathname);
      const currentPath = normalizePath(window.location.pathname);

      if (targetPath === currentPath && url.search === window.location.search) {
        if (url.hash) return;
        event.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
        return;
      }

      event.preventDefault();
      const token = ++navTokenRef.current;

      // Keep the current page visible until the destination route module is ready.
      await preloadRoute(targetPath);
      if (token !== navTokenRef.current) return;

      const nextLocation = {
        pathname: targetPath,
        search: url.search,
        hash: url.hash,
      };
      const nextHref = `${url.pathname}${url.search}${url.hash}`;

      if (
        typeof document.startViewTransition === "function" &&
        !prefersReducedMotion()
      ) {
        window.history.pushState(null, "", nextHref);
        document.startViewTransition(() => {
          flushSync(() => {
            setUsedViewTransition(true);
            setLocation(nextLocation);
          });
        });
        return;
      }

      window.history.pushState(null, "", nextHref);
      setUsedViewTransition(false);
      startTransition(() => {
        setLocation(nextLocation);
      });
    };

    document.addEventListener("mouseover", handleLinkHover, { passive: true });
    document.addEventListener("focusin", handleLinkHover, { passive: true });
    document.addEventListener("click", handleLinkClick);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("mouseover", handleLinkHover);
      document.removeEventListener("focusin", handleLinkHover);
      document.removeEventListener("click", handleLinkClick);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <Suspense fallback={null}>
      <div
        key={routeKey}
        className={`route-stage${usedViewTransition ? " route-stage--vt" : ""}`}
      >
        <RouteView path={path} />
      </div>
    </Suspense>
  );
}
