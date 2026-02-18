# Specification

## Summary
**Goal:** Fix AMP support by adding a valid AMP landing page and proper AMP/canonical discovery so search engines can crawl and validate the AMP page.

**Planned changes:**
- Create a standalone, AMP-valid marketing landing page at `frontend/public/amp/index.html` (AMP runtime/boilerplate, no custom JavaScript, AMP-safe components like `amp-img`, inline CSS within AMP limits) containing equivalent marketing content and links back to the canonical site for interactive actions.
- Add discovery links: add `<link rel="amphtml" href="/amp/index.html">` to `frontend/index.html` (preserving the existing Google site verification meta tag) and add `<link rel="canonical" href="/">` (or appropriate canonical path) to the AMP page.
- Ensure `/amp/index.html` is crawlable by updating/adding `frontend/public/robots.txt` and (if present/added) `frontend/public/sitemap.xml` so `/amp/` is not blocked and the AMP URL is not excluded.
- Update `frontend/DEPLOYMENT_CHECKLIST.md` to include an AMP validation smoke test for `/amp/index.html` and a reminder that the AMP page must not include custom JS/React scripts.

**User-visible outcome:** Visiting `/amp/index.html` serves a valid, crawlable AMP marketing page that passes AMP validation and correctly points to the canonical site (and the canonical site advertises the AMP version).
