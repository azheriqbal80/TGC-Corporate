import { useId, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { AppIcon } from "../ui/AppIcon";
import { technologyFaqs } from "../../content/technology";

const ALL_CATEGORY = "All";

export function TechnicalFaq({
  id = "faq",
  eyebrow = "Technical FAQ",
  metaRight = "Infrastructure & Cloud-Agnostic Architecture",
  heading = "Questions on architecture, capacity, and delivery.",
  intro = "How TGC approaches multi-cloud assessment, active engineering work, and session conditions.",
  items = technologyFaqs,
}) {
  const baseId = useId();
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [expandedIds, setExpandedIds] = useState(() =>
    items.length > 0 ? [items[0].id] : [],
  );

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(items.map((item) => item.category).filter(Boolean)),
    );
    return [ALL_CATEGORY, ...unique];
  }, [items]);

  const visibleItems = useMemo(() => {
    if (activeCategory === ALL_CATEGORY) return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  const allVisibleExpanded =
    visibleItems.length > 0 &&
    visibleItems.every((item) => expandedIds.includes(item.id));

  const toggleItem = (itemId) => {
    setExpandedIds((prev) =>
      prev.includes(itemId)
        ? prev.filter((idValue) => idValue !== itemId)
        : [...prev, itemId],
    );
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    const nextVisible =
      category === ALL_CATEGORY
        ? items
        : items.filter((item) => item.category === category);
    if (nextVisible.length === 0) return;

    setExpandedIds((prev) => {
      const hasOpenVisible = nextVisible.some((item) => prev.includes(item.id));
      return hasOpenVisible ? prev : [nextVisible[0].id];
    });
  };

  const handleToggleAll = () => {
    const visibleIds = visibleItems.map((item) => item.id);
    if (allVisibleExpanded) {
      setExpandedIds((prev) =>
        prev.filter((idValue) => !visibleIds.includes(idValue)),
      );
      return;
    }

    setExpandedIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
  };

  const countLabel =
    visibleItems.length === items.length
      ? `${String(items.length).padStart(2, "0")} entries`
      : `${String(visibleItems.length).padStart(2, "0")} of ${String(items.length).padStart(2, "0")} entries`;

  return (
    <section className="tech-faq" id={id} aria-labelledby={`${baseId}-heading`}>
      <div className="tech-faq-meta">
        <span>{eyebrow}</span>
        <span>{metaRight}</span>
      </div>

      <header className="tech-faq-header">
        <h2 id={`${baseId}-heading`}>{heading}</h2>
        <p>{intro}</p>
      </header>

      <div className="tech-faq-toolbar">
        {categories.length > 2 ? (
          <div
            className="tech-faq-filters"
            role="group"
            aria-label="Filter technical questions by topic"
          >
            {categories.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  className={`tech-faq-filter${isSelected ? " is-active" : ""}`}
                  aria-pressed={isSelected}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              );
            })}
          </div>
        ) : (
          <span className="tech-faq-topic-label">{metaRight}</span>
        )}

        <div className="tech-faq-utilities">
          <span className="tech-faq-count">{countLabel}</span>
          <button
            type="button"
            className="tech-faq-toggle-all"
            onClick={handleToggleAll}
          >
            {allVisibleExpanded ? "Collapse all" : "Expand all"}
          </button>
        </div>
      </div>

      <div className="tech-faq-list">
        {visibleItems.map((item) => {
          const isOpen = expandedIds.includes(item.id);
          const triggerId = `${baseId}-trigger-${item.id}`;
          const panelId = `${baseId}-panel-${item.id}`;

          return (
            <article
              key={item.id}
              className={`tech-faq-item${isOpen ? " is-open" : ""}`}
            >
              <h3 className="tech-faq-question-heading">
                <button
                  type="button"
                  id={triggerId}
                  className="tech-faq-trigger"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleItem(item.id)}
                >
                  <span className="tech-faq-index">
                    <span className="tech-faq-node" aria-hidden="true" />
                    <span className="tech-faq-number">{item.number}</span>
                  </span>

                  <span className="tech-faq-question-group">
                    {item.category ? (
                      <span className="tech-faq-category">{item.category}</span>
                    ) : null}
                    <span className="tech-faq-question">{item.question}</span>
                  </span>

                  <span className="tech-faq-icon" aria-hidden="true">
                    <AppIcon icon={Plus} size="sm" />
                  </span>
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                aria-hidden={!isOpen}
                className="tech-faq-panel"
                data-open={isOpen ? "true" : "false"}
              >
                <div className="tech-faq-panel-inner">
                  <div className="tech-faq-answer-wrap">
                    <p className="tech-faq-answer">{item.answer}</p>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
