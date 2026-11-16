# Technology Page Content

Status: Revised baseline; engineering claims remain subject to the checks below.

## Public page copy

### 1. Hero

Headline: **Cloud gaming, designed for changing conditions.**

> TGC has developed AI-powered cloud gaming infrastructure focused on game execution, GPU rendering, and video delivery across different devices and network conditions.

Primary action: **Discuss the technology**

Secondary action: **Explore the platform**

Image: representative data-centre infrastructure; it does not depict TGC's own facility or staff.

### 2. Delivery context

Heading: **Every session depends on more than a GPU.**

> Cloud gaming brings game execution, graphics processing, and video delivery together in one experience. TGC is developing infrastructure to coordinate these parts across different devices, network conditions, and available computing resources.

Conditions: **Network congestion · Device capability · Geographic distance · Infrastructure availability**

### 3. Engineering focus

Heading: **Three areas shape the current engineering work.**

**Predictive buffering**  
TGC machine learning algos predicts how selected game data might be prepared ahead of need.

**GPU utilisation**  
TGC proprietary AI algo decides how optimally GPU resources can support game rendering and related computation.

**Cloud-agnostic integration**  
Assessing infrastructure options by geography, capacity, availability, and delivery requirements.

### 4. Infrastructure and evidence context

Heading: **Every integration starts with the conditions a session must meet.**

> TGC assesses infrastructure options by geography, capacity, availability, and delivery requirements. Performance evidence should be read with the conditions under which it was gathered.

**Infrastructure assessment**  
Region, available GPU capacity, infrastructure availability, and delivery requirements.

**Performance context**  
Device, network conditions, resolution, frame rate, latency, location, test date, and methodology.

### 5. Contact close

Headline: **Let's discuss the infrastructure behind the experience.**

> Contact TGC about cloud infrastructure, game publishing, or technology integration.

Primary action: **Contact TGC**

## Claims requiring verification

- Technical sequence and terminology
- Predictive buffering behaviour and production status
- GPU capability and production status
- Meaning and implementation of cloud-agnostic integration
- AV1 implementation and performance (the source deck mentions AV1; implementation and results remain unapproved for public claims)
- Demonstration regions and methodology
- Device, bandwidth, resolution, frame-rate, and latency results

Do not render this section on the website.

## Held until approved

The following source-deck claims are not public copy. Each needs test conditions, methodology, date, environment, and approval before publication.

- `[APPROVAL]` 68% bitrate reduction against open standards (slide 13/27)
- `[APPROVAL]` 720p streamed at 1MB/s (slide 13/27)
- `[APPROVAL]` 4K at 8Mbps against a 25Mbps standard requirement (slide 13/27)
- `[APPROVAL]` H.264 / VP9 / TGC AV1 visual comparison at ~235kbps (slide 13/27)
- `[APPROVAL]` Patent status and jurisdiction for the codec work (slides 10/27 and 13/27); legal counsel must confirm before the word "patented" is used publicly
- `[VERIFY]` Naming large streaming platforms that have adopted AV1 (slide 13/27)
- `[VERIFY]` Any separate input-handling capability; the source deck names three technology areas and does not describe a separate input path

## Editorial notes

- Keep the visible page concise: hero, delivery context, three engineering focus areas, infrastructure and evidence context, and contact close.
- Keep all technology areas clearly described as research, work, or assessment in progress; do not imply shipped capabilities.
- Keep performance figures, AV1 implementation claims, demonstrations, and input-handling claims off the public page until verified and approved.
- Describe infrastructure criteria as assessment factors; do not imply a provider selection, partner, or deployment commitment.
- Present measurement fields as the context required for future results, not as an empty dashboard or an implied test result.
- Technology owns architecture, engineering focus, and test evidence. Do not repeat audience benefits already explained on Platform.
- Attach evidence to each performance claim before publication.

## Visual and motion direction

- Use the representative infrastructure photograph in the hero as the page's only image.
- Use text and rules for below-the-fold explanation; do not add technical diagrams or figure cards.
- On desktop, present the three engineering focus areas as a pinned, full-height horizontal sequence: one text panel at a time, advanced by vertical scrolling. Release the pin after the third panel.
- On mobile and when `prefers-reduced-motion` is enabled, show all three focus areas in a vertical reading order without pinning or horizontal movement.
- Keep the sequence text-led with subtle transitions; do not add technical diagrams or figure cards. Respect `prefers-reduced-motion` for all motion.

## Excluded material

- Slides 19 through 23
- Proprietary algorithms or architecture details
- Security-sensitive infrastructure information
- Unverified patents and provider partnerships
- Unsupported latency or bandwidth guarantees
- R&D concepts presented as shipped capabilities

## Metadata

Page title: **Cloud Gaming Technology | The Game Company**
