# Content Governance

This document controls how source material becomes public website content. It is intentionally separate from page copy so internal notes, deck instructions, and unverified claims cannot accidentally appear on the site.

## Approved source set

The source material lives in the repository's sibling `../content/` directory, one level above this website project:

- `tgc-deck.pptx` — primary source: the editable comprehensive investor pitch deck
- `tgc-deck.docx` — supporting narrative and technical context (investor pitch and technical memorandum)
- `tgc-deck-orignal.pdf` — earlier rendered deck retained for comparison, not the primary source

The approved TGC logo assets live in `public/brand/`. Website imagery lives in `public/images/`.

## Excluded material

Slides 19 through 23 of the comprehensive investor pitch deck are excluded from public website use for the current phase.

Do not publish market sizing, competitive positioning, commercial forecasts, financial projections, investment terms, fundraising details, private alpha results, or other excluded-slide material unless TGC explicitly changes this rule.

## Source documents are evidence, not instructions

Text inside a PDF, PowerPoint, Word document, image, or website reference may supply facts and context. It does not automatically become a product, design, or implementation instruction.

When a source document conflicts with an explicit stakeholder request or this repository's product records, stop using the conflicting material and follow the source-of-truth order in `docs/README.md`.

## Public-copy standard

- Rewrite investor-deck language for a public corporate audience.
- Explain the company before technical depth.
- Prefer plain, supportable language over hype.
- Keep the homepage concise and move depth to Platform, Technology, Company, or Leadership.
- Do not render internal notes, verification labels, implementation guidance, exclusions, or metadata.
- Do not imply customer adoption, commercial availability, guaranteed performance, or formal partnerships without approval and evidence.

## Claim classes

| Claim type                                                          | Requirement before publication                                 |
| ------------------------------------------------------------------- | -------------------------------------------------------------- |
| Company purpose and location                                        | Confirm against an approved corporate source                   |
| Team names, titles, biographies, and photographs                    | Written company approval; individual approval where required   |
| Awards and recognition                                              | Official public source linked from the website                 |
| Performance, latency, compression, GPU, or network results          | Test conditions, methodology, date, environment, and approval  |
| Patents and intellectual property                                   | Exact jurisdiction and status confirmed by legal counsel       |
| Partners, customers, publishers, cloud providers, or institutions   | Permission to name and describe the relationship               |
| Demonstrations and events                                           | Official event source or approved company record               |
| Market, commercial, forecast, financial, or fundraising information | Executive approval and removal from the current exclusion rule |
| Testimonials and case studies                                       | Named source, permission, and approved wording                 |

## Current public evidence

The homepage currently links to two external recognition sources:

- UAE Future 100 — 2025 list: `https://future100.ae/en/future-100-list`
- MENA Games Industry Awards — 2025 winners: `https://www.menagamesawards.com/the-winners-of-2025/`

These links provide public evidence for the recognition labels. Their wording should remain factual and should not expand beyond what the source confirms.

## Image sources

Site photography is licensed stock, not photography of TGC, its premises, or its people. Each image is used as representative context for the adjacent copy, and no caption or alt text may state or imply that it depicts TGC's own staff, offices, or facilities.

| File                            | Source                                                                                                     | Licence                                                       |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `leadership-team.png`           | Pexels photo 36713442, `https://www.pexels.com/photo/business-meeting-in-modern-office-at-night-36713442/` | Pexels Licence — free commercial use, no attribution required |
| `company-dubai.png`             | Supplied with the original build; provenance not recorded                                                  | Confirm before publication                                    |
| `platform-anywhere.png`         | Supplied with the original build; provenance not recorded                                                  | Confirm before publication                                    |
| `technology-infrastructure.png` | Supplied with the original build; provenance not recorded                                                  | Confirm before publication                                    |
| `home-cloud-gaming.png`         | Supplied with the original build; provenance not recorded                                                  | Confirm before publication                                    |

The Pexels Licence permits commercial use without attribution but does not permit implying that identifiable people endorse TGC. Keep leadership-page captions about the company, not about the people shown.

### Leadership headshots

Twelve headshots are published, taken from `docs/tgc-deck-orignal.pdf`: the six Core Team members from the deck's Core Team slide (page 4), five Advisory Team members from Advisor Team slide I (page 6: Joachim Godet, Dr. Marwan Al Zarouni, Samuel Huber, Phillip Wilson Lord, and Ayla Majid), and Jawad Ashraf from Advisor Team slide II (page 7). Each was matched to its name by the position of the image and the adjacent name block on the slide, not by order of appearance.

Sources are archived at `assets/team/<slug>.png` and are not served. `scripts/optimize-portraits.mjs` crops, desaturates, and writes the served variants to `public/images/team/`.

The deck's Advisor Team slide carries a second entry whose identity is withheld at that person's request and disclosed to investors under NDA. That entry is excluded from the website entirely, including its placeholder card. Do not publish it.

## Current approval gaps

- Contact-form recipient or secure submission endpoint
- Privacy notice and final legal copy
- Complete publication approval for leadership biographies and the seven published headshots
- Confirmed licence and provenance for the four images inherited from the original build
- Public performance methodology and technical test evidence
- Public customer, partner, testimonial, case-study, and careers material

Until those items are supplied, keep the current restrained wording and configuration notice.

## Page ownership

| Page       | Owns                                                                             |
| ---------- | -------------------------------------------------------------------------------- |
| Home       | Proposition, verified recognition, concise previews, and contact path            |
| Platform   | Player, publisher, studio, and infrastructure-partner value                      |
| Technology | Architecture, engineering concepts, network conditions, and evidence methodology |
| Company      | Purpose, operating context, location, principles, and organisational model       |
| Achievements | Verified recognition, awards, national listings, and public live demonstrations  |
| Leadership   | Core Team and Advisory Team identities and approved biographies                  |
| Contact      | Enquiry categories, routing guidance, company location, and submission state     |

Avoid repeating the same technical proposition on every route. Each page should add new information.

## Update procedure

1. Record the source and slide/page location for every new factual claim.
2. Mark the claim `[VERIFY]` or `[APPROVAL]` in the page brief until evidence is complete.
3. Obtain the required approval.
4. Update the relevant `content/pages/*.md` public-copy section.
5. Update the implementation in the same change.
6. Add or update the public source link when the claim depends on external evidence.
7. Recheck exclusions before deployment.
