# All Power Cleaning Services -- Design Audit Report

**Auditor:** UI/UX Design Agent
**Date:** 2026-04-07
**Scope:** Full single-page site -- design tokens, component styles, HTML structure, accessibility, and section flow

---

## 1. VERDICT

This is a well-built, cohesive dark-themed site for a local power washing company. The design system is thorough and the token architecture is genuinely strong -- CSS custom properties are used consistently, the 8px spacing grid is well-enforced, and the font stack (Bebas Neue / Barlow / Barlow Condensed) is a distinctive, well-considered pairing that avoids the generic Inter/Roboto trap. The dark theme with cyan accents creates a premium, industrial feel that works well for a trade services business targeting homeowners who expect professionalism.

That said, there are meaningful issues across contrast, component consistency, semantic HTML gaps, and a few missed opportunities to push the design from "solid" to "premium."

---

## 2. COLORS

### Token Architecture: Strong

The color system is well-layered with semantic naming:
- 4-level dark background ramp (`--color-dark-bg` through `--color-dark-elevated`) -- good depth progression
- Primary color with proper derivative scale (light, dark, deep, 50, 100, glow) -- covers all use cases
- Semantic colors (success, warning, error, info) are defined but barely used in the page itself
- Text hierarchy with 4 levels (text, text-secondary, text-muted, text-faint) -- well differentiated

### Contrast Issues (WCAG AA)

**Critical finding:** `--color-text-faint: #5A6E75` on `--color-dark-bg: #0B1215` yields roughly 2.8:1 -- **fails AA**. This color is used for:
- `.hero__form-trust` text ("Your info is secure & never shared")
- `.hero__stat-label` text
- `.footer__bottom` text
- `.footer__credit-tagline`

### Hardcoded Color Values

Several places use raw RGBA values instead of tokens:
- `.hero__badge` uses `rgba(92, 225, 230, 0.08)` -- should be `var(--color-primary-50)`
- `.benefit-card__icon--green` uses `rgba(34, 197, 94, 0.1)` -- not derived from `var(--color-success)`

### Recommendation

```css
:root {
  --color-text-faint: #7A8E95; /* bumped from #5A6E75 to hit 4.5:1 on #0B1215 */
}
```

---

## 3. TYPOGRAPHY

### Font Stack: Distinctive and Effective

**Bebas Neue** for headings communicates industrial strength and authority -- exactly right for a power washing company. **Barlow** for body text is a good complement -- geometric, clean, readable. **Barlow Condensed** for labels creates visual hierarchy without introducing a completely unrelated family.

### Type Scale: Well-Executed

The fluid type system using `clamp()` is correct with good ranges and progressive scale.

---

## 4. COMPONENTS

### Buttons: Well-Designed
- Min-height 48px meets touch targets
- `.btn--phone` pulse animation is smart UX
- **Issue:** `.btn--sm` at 40px fails 44px WCAG 2.5.5 target size
- **Missing:** No disabled button style or loading/submitting state

### Cards: Consistent
- **Issue:** `.why-card` redefines card styles instead of extending `.card`

### Forms: Solid
- **Missing:** Error state styling (`.form-input--error`)
- **Missing:** Success/confirmation state after form submission

---

## 5. LAYOUT AND SPACING

### Grid System: Effective
Progressive breakpoints at 640px/768px/1024px work well.

### Spacing Scale: Excellent
The 8px grid is consistently used throughout.

### Issue: Promo Strip Border
The `border-left: 4px` spans viewport width while content is contained -- creates visual inconsistency.

---

## 6. NEW COMPONENTS EVALUATION

### Promo Strip
- Uses design tokens correctly
- Left border extends to viewport edge (should be on inner container)
- No semantic HTML (`<aside>` or `role="complementary"` would be better)
- CTA phone link lacks button affordance

### Why Cards with Number Overlays
- Strong premium editorial look at 30% opacity
- Correctly marked `aria-hidden="true"`
- Should extend base `.card` class instead of redefining

### Blockquote
- Consistent with typography system
- Missing `<figure>` / `<figcaption>` semantic wrapper

---

## 7. SECTION FLOW ANALYSIS

**Current flow:** Hero -> Problem -> Services -> Promo Strip -> About Us -> Gallery -> Testimonials -> Service Area -> FAQ -> CTA -> Footer

Follows AIDA framework well. **Gap identified:** No "How It Works" process section (e.g., "1. Call -> 2. Free Estimate -> 3. We Clean -> 4. You Enjoy"). This is a high-converting pattern for service businesses.

**7-card grid issue:** The 7th service card (Commercial) sits alone on desktop, creating visual imbalance.

---

## 8. ACCESSIBILITY AUDIT

### Working Well
- Skip to content link
- ARIA labels on navigation, forms, buttons, social links
- `aria-expanded` on FAQ and hamburger
- `prefers-reduced-motion` is comprehensive
- Min 48px touch targets on buttons
- Semantic landmarks throughout

### Issues
1. `.btn--sm` at 40px fails 44px target
2. Gallery items not keyboard accessible (div, not button/focusable)
3. Gallery filters missing `aria-pressed` state
4. Footer social links below 44px minimum
5. `#contact` CTA sends users to a section with no form (form is in hero)
6. Inline `style=` attributes bypass the design system

---

## 9. TOP 10 PRIORITY FIXES

### 1. Fix `--color-text-faint` Contrast (Critical)
```css
:root {
  --color-text-faint: #7A8E95; /* passes 4.5:1 on #0B1215 */
}
```

### 2. Make Gallery Items Keyboard Accessible (Critical)
Add `tabindex="0"` and `role="img"` with proper `aria-label`. Show overlay on `:focus-visible`.

### 3. Add Form Error/Success States (High)
```css
.form-input--error {
  border-color: var(--color-error);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}
```

### 4. Increase `.btn--sm` to 44px (High)
```css
.btn--sm { min-height: 44px; }
```

### 5. Fix Promo Strip Border (Medium)
Move `border-left` from outer div to `.promo-strip__inner`.

### 6. Consolidate Why Card with Base Card Class (Medium)
Use `class="card why-card"` instead of redefining styles.

### 7. Add Gallery Filter ARIA State (Medium)
Add `aria-pressed="true/false"` to filter buttons.

### 8. Fix 7-Card Grid Orphan (Medium)
Center the 7th card in the 3-column grid:
```css
.services .grid--3 > .service-card:nth-child(7):last-child {
  grid-column: 2;
}
```

### 9. Remove Inline Styles (Low)
Create `.link--primary` and `.link--inherit` utility classes.

### 10. Increase Footer Social Link Touch Targets (Low)
```css
.footer__social a { width: 44px; height: 44px; }
```

---

## 10. ONE BIG WIN

**Add a "How It Works" 3-step section** between Problem and Services:

> **Step 1: Call or Request a Quote** -> **Step 2: We Assess & Schedule** -> **Step 3: Watch It Transform**

This reduces buyer uncertainty (#1 conversion blocker for service businesses), reinforces trust, and gives prospects a clear mental model. Could measurably improve lead conversion rate.

---

## 11. WHAT IS WORKING WELL

- Token architecture is excellent for a local services site
- Font pairing is distinctive and appropriate
- Dark theme uses proper principles (not pure black, layered surfaces, glow shadows)
- Hero form above fold (2-3x conversion improvement)
- `prefers-reduced-motion` is comprehensive
- Mobile CTA bar follows thumb zone research
- Semantic HTML is mostly correct
- Structured data is comprehensive for local SEO
- Performance considerations (preconnect, lazy loading, display=swap, preload LCP)
