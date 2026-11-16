# Contact Page Content

Status: Implemented baseline; submission endpoint pending

## Public page copy

### 1. Hero and form

Eyebrow: **Contact TGC**

Headline: **Start the conversation.**

> Contact The Game Company about the platform, technology, infrastructure partnerships, publishing opportunities, media requests, or other corporate enquiries.

Form heading: **How can we help?**

Form introduction:

> Share a few details and your enquiry will be directed to the appropriate TGC team.

Fields:

- **Full name**
- **Work email**
- **Company or organisation**
- **What would you like to discuss?**
- **Tell us about your enquiry**

Enquiry types:

- Platform enquiry
- Technology integration
- Cloud infrastructure partnership
- Game publishing or studio partnership
- Commercial partnership
- Media or press
- General corporate enquiry
- Something else

Consent:

> I understand that TGC will use the information provided to review and respond to this enquiry.

Submit action: **Send enquiry**

### 2. Enquiry guidance

Heading: **The right context helps us respond.**

**Platform and publishing**  
Include the intended market, game catalogue, audience, platform, or distribution opportunity.

**Technology and infrastructure**  
Include the relevant cloud environment, region, integration need, or technical objective.

**Media and press**  
Include the publication, topic, deadline, and preferred contact method.

### 3. Company details

Heading: **The Game Company**

Location: **Dubai, United Arab Emirates**

Display the approved corporate address and role-based contact email when confirmed.

## Conditional form copy

### Success

Heading: **Your enquiry has been sent.**

> Thank you for contacting The Game Company. Your message has been received and will be directed to the appropriate team.

### Submission error

Heading: **We could not send your enquiry.**

> Your information has not been submitted. Check your connection and try again.

Action: **Try again**

### Offline

> You appear to be offline. Reconnect before sending your enquiry.

Do not promise a response time until TGC confirms an operational service level.

## Claims and information requiring approval

- General corporate email address
- Internal routing address for each enquiry type
- Legal company name
- Public address
- Telephone or WhatsApp publication decision
- Privacy Policy and data-retention rules

Do not render this section on the website.

## Implementation requirements

- Validate and sanitise input on the server.
- Preserve entered information after validation or connection errors.
- Move focus to the first invalid field and announce form-level errors.
- Add rate limiting and low-friction bot protection.
- Keep private recipients, credentials, and API keys out of the React bundle.
- Use a secure server-side submission endpoint.
- Do not add marketing consent unless an approved marketing workflow exists.

## Editorial notes

- Keep initially visible copy between 180 and 260 words, excluding labels.
- The form is the page's primary action; no extra hero button is needed.
- Enquiry guidance sits beside or directly below the relevant form area.
- Conditional states are not scroll sections.

## Visual and motion direction

- Use Lenis for smooth movement and one restrained GSAP entrance.
- Do not delay form interaction with animation.
- The page does not require Three.js or WebGL.
- Respect `prefers-reduced-motion`.

## Excluded material

- Slides 19 through 23
- Personal executive email, telephone, or WhatsApp details without approval
- Investment or fundraising enquiry categories
- Newsletter subscription without a separate approved workflow
- Mandatory file uploads
- Multiple competing contact forms
- Unverified office details

## Metadata

Page title: **Contact The Game Company | TGC**

Meta description:

> Contact The Game Company about its cloud gaming platform, technology integrations, infrastructure partnerships, publishing opportunities, and corporate enquiries.
