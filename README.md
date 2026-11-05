# ApnaOhio2

A simple, mobile-friendly community classifieds website for people across Ohio.

## Sections
- Accommodations: rooms, apartments, roommates and sublets.
- Rides: rides wanted, rides offered and carpools.
- Community Posts: jobs, furniture, services, events, items for sale/free and announcements.

Listings are designed to expire after 30 days. Posting does not require an account. Posters can share email, phone or WhatsApp contact details.

## Files
- index.html — website structure and posting dialog
- styles.css — responsive design
- app.js — search, filters, listing cards, posting and reporting
- config.js — Apps Script endpoint setting
- apps-script/Code.gs — Google Sheets backend
- apps-script/SETUP.md — setup and deployment guide

## Preview
Run a local static web server in this folder, for example: python3 -m http.server 8000, then open http://localhost:8000.

With config.js left blank, the site runs in browser-only demo mode. Listings saved in demo mode are not shared between visitors.

## Publish the website

See [CLOUDFLARE_DEPLOY.md](CLOUDFLARE_DEPLOY.md) for steps to publish the site from this private GitHub repository using Cloudflare Pages.

## Shared listings
Follow apps-script/SETUP.md to connect a private Google Sheet using Google Apps Script. After deploying the web app, paste its URL into config.js. The spreadsheet should remain private; active listings and their contact details are public to site visitors.

## Hosting
This is a static site. A static hosting provider such as Cloudflare Pages can connect to a private GitHub repository; review its current free-tier limits before launch. GitHub Pages on GitHub Free generally requires a public source repository, so do not make this repository public just to enable Pages.

## Launch notes
This is an early community MVP, not a high-volume transactional platform. Basic validation, a honeypot field and short per-contact throttling are starter protections, not enterprise-grade spam prevention. Reports are recorded for manual review. No authentication, identity verification, payment processing or private messaging is included. Provider quotas and free-tier terms may change.
