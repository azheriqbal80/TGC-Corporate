export const DEFAULT_SITE_URL = "https://the-game-company.example";

export const ROUTES = {
  "/": {
    title: "The Game Company | AI-Powered Cloud Gaming Infrastructure",
    description:
      "The Game Company is building AI-powered cloud gaming infrastructure designed to bring demanding games to more devices, networks, and markets.",
  },
  "/platform": {
    title: "Cloud Gaming Platform | The Game Company",
    description:
      "Explore TGC's cloud gaming platform for accessible delivery, adaptive infrastructure, and responsive player experiences.",
  },
  "/technology": {
    title: "Cloud Gaming Technology | The Game Company",
    description:
      "Learn how TGC combines cloud infrastructure, video delivery, GPU utilisation, input handling, and intelligent optimisation.",
  },
  "/company": {
    title: "About The Game Company | TGC",
    description:
      "Meet The Game Company, a Dubai-based technology company building AI-powered cloud gaming infrastructure for global markets.",
  },
  "/leadership": {
    title: "Leadership | The Game Company",
    description:
      "Meet the core operators and experienced advisers building The Game Company's cloud gaming platform and corporate strategy.",
  },
  "/achievements": {
    title: "Company Achievements | The Game Company",
    description:
      "Explore The Game Company's national UAE Future 100 selection, 2025 MENA Games Industry Award win, and live public demonstrations.",
  },
  "/contact": {
    title: "Contact The Game Company | TGC",
    description:
      "Contact TGC about its platform, technology, infrastructure partnerships, publishing opportunities, media, or corporate enquiries.",
  },
  "/design-guide": {
    title: "TGC Design Guide | The Game Company",
    description:
      "View The Game Company's centralized visual language, interface patterns, responsive rules, and design-system guidance.",
    robots: "noindex, follow",
  },
};

export function normalizePath(pathname = "/") {
  const normalized = pathname.replace(/\/+$/, "");
  return normalized || "/";
}

export function getRouteMeta(pathname) {
  const path = normalizePath(pathname);
  return ROUTES[path]
    ? { path, ...ROUTES[path], found: true }
    : {
        path,
        title: "Page not found | The Game Company",
        description:
          "The requested page could not be found. Return to The Game Company website.",
        found: false,
      };
}

export function applyRouteMeta(pathname, siteUrl = window.location.origin) {
  const meta = getRouteMeta(pathname);
  const canonicalUrl = new URL(meta.found ? meta.path : "/404", siteUrl).href;
  document.title = meta.title;

  const setMeta = (selector, attributes) => {
    let element = document.head.querySelector(selector);
    if (!element) {
      element = document.createElement("meta");
      document.head.appendChild(element);
    }
    Object.entries(attributes).forEach(([name, value]) =>
      element.setAttribute(name, value),
    );
  };
  const setLink = (rel, href) => {
    let element = document.head.querySelector(`link[rel="${rel}"]`);
    if (!element) {
      element = document.createElement("link");
      element.rel = rel;
      document.head.appendChild(element);
    }
    element.href = href;
  };

  setMeta('meta[name="description"]', {
    name: "description",
    content: meta.description,
  });
  setMeta('meta[name="robots"]', {
    name: "robots",
    content: meta.found ? (meta.robots ?? "index, follow") : "noindex, follow",
  });
  setMeta('meta[property="og:title"]', {
    property: "og:title",
    content: meta.title,
  });
  setMeta('meta[property="og:description"]', {
    property: "og:description",
    content: meta.description,
  });
  setMeta('meta[property="og:type"]', {
    property: "og:type",
    content: "website",
  });
  setMeta('meta[property="og:url"]', {
    property: "og:url",
    content: canonicalUrl,
  });
  setMeta('meta[name="twitter:card"]', {
    name: "twitter:card",
    content: "summary_large_image",
  });
  setMeta('meta[name="twitter:title"]', {
    name: "twitter:title",
    content: meta.title,
  });
  setMeta('meta[name="twitter:description"]', {
    name: "twitter:description",
    content: meta.description,
  });
  setLink("canonical", canonicalUrl);

  let structuredData = document.getElementById("tgc-structured-data");
  if (!structuredData) {
    structuredData = document.createElement("script");
    structuredData.type = "application/ld+json";
    structuredData.id = "tgc-structured-data";
    document.head.appendChild(structuredData);
  }
  structuredData.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "The Game Company",
    alternateName: "TGC",
    url: new URL("/", siteUrl).href,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  });

  return meta;
}
