import { Fragment } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import designMarkdown from "../../../docs/DESIGN.md?raw";
import { AppIcon } from "../../components/ui/AppIcon";
import { SiteFooter } from "../../components/layout/SiteFooter";

const frontmatter = designMarkdown.split("---")[1] ?? "";
const markdownBody = designMarkdown.split("---").slice(2).join("---");

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseColors() {
  const block =
    frontmatter.match(/\ncolors:\n([\s\S]*?)\ntypography:/)?.[1] ?? "";
  return block
    .split("\n")
    .map((line) => line.match(/^\s{2}([\w-]+):\s+["']?(.+?)["']?$/))
    .filter(Boolean)
    .map((match) => ({ name: match[1], value: match[2].replace(/["']$/, "") }));
}

function parseDocument() {
  const lines = markdownBody.split(/\r?\n/);
  const sections = [];
  let section = null;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line || line.startsWith("# ")) continue;

    if (line.startsWith("## ")) {
      const title = line.slice(3).trim();
      section = { title, id: slugify(title), blocks: [] };
      sections.push(section);
      continue;
    }
    if (!section) continue;

    if (line.startsWith("### ")) {
      section.blocks.push({ type: "heading", value: line.slice(4).trim() });
      continue;
    }
    if (line.startsWith("|")) {
      const rows = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        rows.push(
          lines[index]
            .trim()
            .slice(1, -1)
            .split("|")
            .map((cell) => cell.trim()),
        );
        index += 1;
      }
      index -= 1;
      section.blocks.push({
        type: "table",
        rows: rows.filter((_, row) => row !== 1),
      });
      continue;
    }
    if (line.startsWith("- ")) {
      const items = [];
      while (index < lines.length && lines[index].trim().startsWith("- ")) {
        items.push(lines[index].trim().slice(2));
        index += 1;
      }
      index -= 1;
      section.blocks.push({ type: "list", items });
      continue;
    }

    const paragraph = [line];
    while (
      index + 1 < lines.length &&
      lines[index + 1].trim() &&
      !lines[index + 1].trim().startsWith("#") &&
      !lines[index + 1].trim().startsWith("- ") &&
      !lines[index + 1].trim().startsWith("|")
    ) {
      paragraph.push(lines[index + 1].trim());
      index += 1;
    }
    section.blocks.push({ type: "paragraph", value: paragraph.join(" ") });
  }
  return sections;
}

function InlineMarkdown({ value }) {
  const parts = value.split(/(\*\*.*?\*\*|`.*?`|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={`${part}-${index}`}>{part.slice(1, -1)}</code>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a key={`${part}-${index}`} href={link[2]}>
          {link[1]}
        </a>
      );
    }
    return <Fragment key={`${part}-${index}`}>{part}</Fragment>;
  });
}

function ColorPreview() {
  return (
    <div className="dg-colors" aria-label="Design color tokens">
      {parseColors().map(({ name, value }) => (
        <div className="dg-color" key={name}>
          <span style={{ background: value }} aria-hidden="true" />
          <strong>{name.replaceAll("-", " ")}</strong>
          <code>{value}</code>
        </div>
      ))}
    </div>
  );
}

function TypographyPreview() {
  return (
    <div className="dg-type-preview" aria-label="Typography specimens">
      <div>
        <span>Archivo · Display</span>
        <strong>Gaming beyond hardware.</strong>
      </div>
      <div>
        <span>Manrope · Body and interface</span>
        <p>
          A precise editorial voice for technology, infrastructure, leadership,
          and corporate information.
        </p>
      </div>
    </div>
  );
}

function ComponentPreview() {
  return (
    <div
      className="dg-component-preview"
      aria-label="Interface component examples"
    >
      <div className="dg-action-row">
        <a className="action" href="#components">
          Primary action
          <AppIcon icon={ArrowRight} size="md" className="arrow" />
        </a>
        <a className="dg-light-action" href="#components">
          Light action
          <AppIcon icon={ArrowRight} size="md" className="arrow" />
        </a>
        <a className="dg-text-action" href="#components">
          Text route
          <AppIcon icon={ArrowRight} size="md" className="arrow" />
        </a>
      </div>
      <label className="dg-field">
        <span>Work email</span>
        <input type="email" defaultValue="name@company.com" />
      </label>
      <a className="contact-action" href="#components">
        <span>Contact rail</span>
        <AppIcon
          icon={ArrowUpRight}
          size="md"
          className="arrow arrow--diagonal"
        />
      </a>
    </div>
  );
}

function LogoPreview() {
  return (
    <div className="dg-logo-preview" aria-label="Approved TGC logo variants">
      <figure className="dg-logo-paper">
        <img src="/brand/tgc-black.svg" alt="The Game Company black logo" />
        <figcaption>Black · paper and signal fields</figcaption>
      </figure>
      <figure className="dg-logo-ink">
        <img src="/brand/tgc-white.svg" alt="The Game Company white logo" />
        <figcaption>White · operational fields</figcaption>
      </figure>
      <figure className="dg-logo-ink">
        <img src="/brand/tgc-green.svg" alt="The Game Company green logo" />
        <figcaption>Green · deliberate brand moments</figcaption>
      </figure>
    </div>
  );
}

function SectionPreview({ title }) {
  if (title === "Colors") return <ColorPreview />;
  if (title === "Typography") return <TypographyPreview />;
  if (title === "Components") return <ComponentPreview />;
  return null;
}

function MarkdownBlock({ block, sectionId, index }) {
  if (block.type === "heading") {
    const id = `${sectionId}-${slugify(block.value)}`;
    return (
      <h3 id={id}>
        <InlineMarkdown value={block.value} />
      </h3>
    );
  }
  if (block.type === "list") {
    return (
      <ul>
        {block.items.map((item) => (
          <li key={item}>
            <InlineMarkdown value={item} />
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === "table") {
    const [head, ...rows] = block.rows;
    return (
      <div
        className="dg-table-wrap"
        role="region"
        tabIndex={0}
        aria-label={`Table: ${head.join(", ")}`}
      >
        <table>
          <thead>
            <tr>
              {head.map((cell) => (
                <th key={cell} scope="col">
                  <InlineMarkdown value={cell} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.join("-")}>
                {row.map((cell, cellIndex) => (
                  <td key={`${cell}-${cellIndex}`}>
                    <InlineMarkdown value={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <p key={`${sectionId}-${index}`}>
      <InlineMarkdown value={block.value} />
    </p>
  );
}

const sections = parseDocument();

export function DesignGuidePage() {
  return (
    <div className="design-guide-page" id="top">
      <a className="skip-link" href="#main-content">
        Skip to design guide
      </a>
      <header className="dg-header">
        <a href="/" aria-label="The Game Company home">
          <img src="/brand/tgc-black.svg" alt="" />
        </a>
        <span>Design guide</span>
        <a href="/">
          View website
          <AppIcon icon={ArrowUpRight} size="sm" />
        </a>
      </header>

      <main id="main-content">
        <section className="dg-hero">
          <h1>TGC design guide.</h1>
          <p>
            The centralized visual and interaction language for The Game
            Company. This page is rendered directly from <code>DESIGN.md</code>.
          </p>
          <div>
            <span>Source of truth</span>
            <strong>Live dispatch network</strong>
          </div>
        </section>

        <div className="dg-layout">
          <aside>
            <nav aria-label="Design guide sections">
              {sections.map((section) => (
                <a href={`#${section.id}`} key={section.id}>
                  {section.title}
                  <AppIcon icon={ArrowRight} size="sm" />
                </a>
              ))}
            </nav>
            <p>
              Canonical source
              <strong>DESIGN.md</strong>
            </p>
          </aside>

          <article className="dg-document">
            {sections.map((section) => (
              <section id={section.id} key={section.id}>
                <h2>{section.title}</h2>
                <SectionPreview title={section.title} />
                {section.title === "Components" && <LogoPreview />}
                {section.blocks.map((block, index) => (
                  <MarkdownBlock
                    block={block}
                    sectionId={section.id}
                    index={index}
                    key={`${block.type}-${index}`}
                  />
                ))}
              </section>
            ))}
          </article>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

export default DesignGuidePage;
