# All Power Cleaning Services

## Project Description
Professional website for All Power Cleaning Services, a family-owned power washing company based in Alpharetta, GA. Founded by Derrick Guillory. Client of 1865 Free Money.

## Tech Stack
- Static HTML/CSS/JS site
- Hosted on Netlify (with Netlify Forms)
- Design system: Dark theme with #5CE1E6 cyan accents
- Fonts: Bebas Neue (headings), Barlow (body), Barlow Condensed (labels)

## Project Structure
```
all-power-cleaning/
  public/
    index.html              # Main single-page site
    404.html                # Custom 404 page
    robots.txt              # Search engine directives
    sitemap.xml             # XML sitemap
    site.webmanifest        # PWA manifest
    favicon.ico             # Favicons (multiple sizes)
    css/
      design-system.css     # Design tokens, utilities, base styles
      styles.css            # Component & section styles
    js/
      main.js               # Interactivity (menu, FAQ accordion, animations, form)
    images/
      logo.png              # Company logo
      og-hero.jpg           # Open Graph image
      gallery/              # Before/after project photos (9 images)
  CONTENT.md                # Content reference doc
  SEO_PLAN.md               # SEO strategy doc
  STRATEGY.md               # Business strategy doc
  package.json              # Project metadata
```

## Business Information (NAP - must be identical everywhere)
- **Business Name:** All Power Cleaning Services
- **Owner/Founder:** Derrick Guillory
- **Address:** 9925 Haynes Bridge Rd, Suite 200, Alpharetta, GA 30022
- **Phone:** 678.485.2303
- **Email:** Derrick@allpowercleaningservices.com
- **Website:** https://allpowercleaningservices.com
- **Social:** @allpowercleaning (Facebook, Instagram)
- **Licensed & Insured:** Yes
- **Years in Business:** 5+

## Services (7)
1. Concrete Cleaning
2. House Wash
3. Deck Cleaning
4. Fence Cleaning
5. Window Cleaning
6. Gutter Cleaning
7. Commercial Cleaning (HOA, restaurants, office buildings)

## Service Areas (13 cities)
Alpharetta (HQ), Milton, Johns Creek, Suwanee, Duluth, Buford, Lawrenceville, Dacula, Snellville, Loganville, Auburn, Braselton, Bethlehem

## Site Sections (single-page)
1. Announcement Bar (bundle deal promo)
2. Header/Nav (sticky, glassmorphism)
3. Hero (badge, headline, form, stats)
4. Problem/Solution (3 benefit cards)
5. Services (7 service cards in 3-col grid)
6. Promo Strip Banner (House Wash + Driveway Package)
7. About Us / Why Choose Us (4 differentiators + founder quote)
8. Gallery (9 before/after photos with filter)
9. Testimonials (6 reviews + Google Review CTA)
10. Service Area (13 cities + map embed)
11. FAQ (8 accordion items with FAQPage schema)
12. CTA / Contact Section
13. Footer (4-column: brand, links, services, contact)
14. Sticky Mobile CTA Bar
15. Back to Top Button

## Schema Markup (JSON-LD)
- LocalBusiness (with founder, 13 areaServed cities, 7 services)
- WebSite (for Google site name)
- FAQPage (8 questions)
- Service (7 individual service schemas)
- Offer (House Wash + Driveway Package bundle)

## SEO Keywords (Primary)
- "power washing Alpharetta GA"
- "pressure washing near me"
- "power washing Atlanta"
- "family-owned power washing Alpharetta"
- "licensed insured power washing North Atlanta"

## Build & Deploy
- No build step required (static files)
- Deploy: Push to Netlify via git
- Forms: Netlify Forms (name="quote")

## Design System
- Primary: #5CE1E6 (cyan)
- Background: #0B1215 (dark)
- Surface: #111B20
- Card: #162025
- Text: #FFFFFF (primary), #C8D6DA (secondary), #8A9EA5 (muted)
- Star rating: #FBBF24
- 8px spacing grid
- Border radius: 4px-24px scale

## Conventions
- NAP data must be 100% identical in nav, hero, contact, footer, and schema
- All images lazy-loaded except hero LCP image
- Scroll-triggered animations via `.animate-on-scroll` + `.is-visible`
- Netlify Forms with honeypot spam protection
- Footer credit: "Website by 1865 Free Money - Digital Excellence - Atlanta, GA"
