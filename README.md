# TGVIS — The Green Valley International School

TGVIS is a static, multi-page school website for The Green Valley International
School in Bihta, Bihar. It is intentionally built with plain HTML, CSS, and
vanilla JavaScript so the school team can edit pages without learning a
framework or running a build pipeline.

## Run the website

The project uses the dependency-free Node.js server already included in the
repository:

```bash
npm start
```

The server listens on `0.0.0.0:5000`, which is the port used by the Replit
preview. Open `/` for the homepage. Nested page URLs are served directly, for
example:

```text
/pages/admissions/admissions.html
/pages/contact/contact.html
/pages/whatsapp-groups/whatsapp-groups.html
```

## Project structure

```text
index.html                 Homepage markup
home.css / home.js         Homepage-only styles and interactions
pages/<section>/           Each school section with its own HTML/CSS/JS
assets/css/                Shared design tokens, components, and animations
assets/js/                 Shared navigation, accessibility, and utilities
assets/images/             Logo, hero artwork, and campus imagery
server.js                  Small static server for local and Replit previews
```

Most pages use the shared `navbar.js` component. The page-specific files stay
beside their HTML so content and behavior are easy to find and maintain.
Comments in the files explain the purpose of each major section and the
important browser behavior.

## Contact and enquiry behavior

The supplied school office number is used for telephone and WhatsApp actions:
`+91 89359 01010`. The contact form validates the enquiry in the browser and
opens a pre-filled WhatsApp message; it does not pretend that an email or
database service is connected.

Class WhatsApp invite URLs were not supplied. Each class card therefore
requests the current, approved link from the school office instead of exposing
invented private group links.

## Before publishing

Confirm the official public domain, school email address, academic session,
board/affiliation wording, fee figures, results, and any statistics before
using them as permanent public claims. Replace the supplied emblem-style
artwork with approved campus, classroom, sports, and student photography when
those assets are available.
