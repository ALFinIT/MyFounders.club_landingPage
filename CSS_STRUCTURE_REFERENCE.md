# 🎨 CSS Structure Quick Reference

## Background Layer Architecture

```mermaid
graph TB
    subgraph "Z-Index Stack"
        A["z: -10<br/>background-wrapper<br/>(fixed, contains all)"]
        B["z: 1<br/>background-overlay<br/>(static grid)"]
        C["z: 2<br/>background-comets<br/>(animations)"]
        D["z: 3<br/>app-content<br/>(everything else)"]
        E["z: 10+<br/>Components<br/>(buttons, modals)"]
    end
    
    A --> B & C
    D --> E
    
    style A fill:#333,stroke:#f60,color:#fff
    style B fill:#555,stroke:#f60,color:#fff
    style C fill:#777,stroke:#f60,color:#fff
    style D fill:#999,stroke:#0f0,color:#000
    style E fill:#bbb,stroke:#0f0,color:#000
```

## CSS Classes Hierarchy

```
html (dir="rtl" or dir="ltr")
  └─ body (dir="rtl" or dir="ltr")
       ├─ div.background-wrapper
       │  ├─ div.background-overlay (z-index: 1)
       │  └─ div.background-comets (z-index: 2)
       │     ├─ ::before (vertical falling comets)
       │     └─ ::after (horizontal sliding comets)
       │
       └─ div.app-content (z-index: 3)
          ├─ GridBackground (shared component)
          ├─ NextIntlClientProvider
          │  ├─ AuthProvider
          │  ├─ ProfileProvider
          │  ├─ MotionProvider
          │  └─ SmoothScrollProvider
          │     └─ Main page content
```

## Animation Timings

```
┌─────────────────────────────────────────────┐
│ Vertical Comets (fall animation)            │
├─────────────────────────────────────────────┤
│ Duration: 7.5 seconds                       │
│ Easing: linear (constant speed)             │
│ Movement: translateY(120vh)                 │
│ Background-size: 2px × 160px (vertical)     │
│ Infinite loop, staggered starts             │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ Horizontal Comets (slide animation)         │
├─────────────────────────────────────────────┤
│ Duration: 9.2 seconds                       │
│ Easing: linear (constant speed)             │
│ Movement: translateX(120vw)                 │
│ Background-size: 160px × 2px (horizontal)   │
│ Infinite loop, staggered starts             │
└─────────────────────────────────────────────┘
```

## Grid Overlay Pattern

```css
.background-overlay {
  background-image:
    /* Horizontal lines */
    linear-gradient(rgba(255, 106, 0, 0.12) 2px, transparent 2px),
    /* Vertical lines */
    linear-gradient(90deg, rgba(255, 106, 0, 0.12) 2px, transparent 2px);
  
  background-size: 100px 100px;  /* Grid cells */
  background-position: -2px -2px; /* Offset for alignment */
}

/* Result: Orange grid background with 0.12 opacity */
/* Grid size: 100px × 100px squares */
```

## Comet Gradient Effect

```
Vertical Comet Gradient:
├─ 0%:   transparent
├─ 40%:  rgba(255, 106, 0, 0.08)    [faint orange]
├─ 70%:  rgba(255, 106, 0, 0.35)    [medium orange]
├─ 90%:  #ff6a00                     [solid orange]
├─ 96%:  #ffae00                     [light orange]
└─ 100%: #ffffff                     [white head]

Horizontal Comet Gradient:
└─ Same gradient applied left-to-right

Creates: Glowing comet head with fading tail
```

## RTL Implementation

```
English (LTR):
┌──────────────────────────┐
│ Logo        Nav    Button│
│ Content flows →          │
│ ← Back                   │
└──────────────────────────┘

Arabic (RTL):
┌──────────────────────────┐
││Button    Nav        Logo│
│          ← Content flows  │
│                  Back →  │
└──────────────────────────┘

HTML changes:
<html dir="ltr"> → <html dir="rtl">
<body dir="ltr"> → <body dir="rtl">
CSS: flex-direction reverses automatically
```

## Mobile Optimization

```
Desktop (1200px+):
┌─────────────────────────────────────┐
│ ┌─ Background Overlay (100px grid)  │
│ └─ Comet Effects (2-160px gradient) │
│ ┌─ Navbar with full nav items       │
│ └─ Main content area                │
└─────────────────────────────────────┘
Performance: 60 FPS average

Tablet (768px-1199px):
┌──────────────────────────┐
│ ┌─ Same effects, scaled  │
│ ├─ Navbar responsive     │
│ └─ Content optimized     │
└──────────────────────────┘
Performance: 55-60 FPS

Mobile (< 768px):
┌────────────────────┐
│ ┌─ Effects scale  │
│ ├─ Hamburger menu │
│ └─ Touch friendly │
└────────────────────┘
Performance: 45-60 FPS (varies)
```

## Performance Settings

```css
/* GPU Acceleration */
.background-comets {
  will-change: transform;  /* Enables GPU rendering */
  position: fixed;         /* Out of document flow */
  pointer-events: none;    /* Doesn't affect clicks */
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .background-comets::before,
  .background-comets::after {
    animation: none;  /* Respects user preference */
  }
}

/* Mobile Optimization */
@media (max-width: 768px) {
  .background-overlay {
    background-size: 60px 60px;  /* Smaller grid on mobile */
  }
}
```

## Translation Key Structure

```
locales/
├─ ar.json
│  ├─ nav: { founders, international, how, cta }
│  ├─ hero: { eyebrow, headline1, headline2, sub, ... }
│  ├─ common: { save, cancel, submit, ... }
│  ├─ validation: { required, invalid_email, ... }
│  ├─ errors: { card_declined, network_error, ... }
│  ├─ auth: { email, password, forgot_password, ... }
│  ├─ payment: { subscription_id, monthly, annual, ... }
│  ├─ dashboard: { welcome, overview, analytics, ... }
│  ├─ admin: { admin_panel, manage_users, ... }
│  ├─ survey: { survey_title, survey_subtitle, ... }
│  └─ settings: { edit_profile, stage, sector, ... }
│
└─ en.json
   └─ (same structure with English translations)

Usage:
const t = useTranslations()
t('nav.founders')        // → "For Founders" or "لمؤسسي الشركات"
t('common.submit')       // → "Submit" or "إرسال"
t('errors.card_declined') // → "Card Declined" or "تم رفض البطاقة"
```

## Browser Compatibility

```
Desktop Browsers:
├─ Chrome 90+   ✓ Full support
├─ Firefox 88+  ✓ Full support
├─ Safari 14+   ✓ Full support (animation may be smoother)
└─ Edge 90+     ✓ Full support

Mobile Browsers:
├─ iOS Safari   ✓ Full support
├─ Chrome Mobile ✓ Full support
├─ Firefox Android ✓ Full support
└─ Samsung Internet ✓ Full support

RTL Support:
├─ All modern browsers ✓ Native RTL awareness
└─ IE 11        ✓ Limited (still works, animations may lag)

Feature Support:
├─ CSS Grid     ✓ ~95% browsers
├─ CSS Animations ✓ ~98% browsers
├─ will-change  ✓ ~90% browsers
└─ prefers-reduced-motion ✓ ~75% browsers
```

## Color Palette

```
Orange Accent:
├─ Primary:    #ff6a00 (RGB: 255, 106, 0)
├─ Light:      #ffae00 (RGB: 255, 174, 0)
├─ Very Light: rgba(255, 174, 0, 0.35)
├─ Faint:      rgba(255, 106, 0, 0.08)
└─ Ultra Faint: rgba(255, 106, 0, 0.12)

Whites & Grays:
├─ White Head:  #ffffff
├─ Text Dark:   #1a1a1a
├─ Text Light:  #ffffff
├─ Gray 300:    #d1d5db
└─ Gray 400:    #9ca3af

Background:
├─ Black:       #000000
├─ Dark Gray:   #0f0f0f
└─ Overlay:     rgba(0, 0, 0, 0.9)
```

## Responsive Breakpoints

```
Default (Mobile First): < 640px
├─ Full width layouts
├─ Stacked navigation
├─ Single column forms

Small (sm):  ≥ 640px
├─ Slightly larger padding
├─ Some sidebars visible

Medium (md):  ≥ 768px
├─ Two column layouts
├─ Horizontal navigation
├─ Improved spacing

Large (lg):   ≥ 1024px
├─ Three column layouts
├─ Full nav bars
├─ Comfortable spacing

XLarge (xl):  ≥ 1280px
├─ Maximum width containers
├─ Optimal text width
├─ Full feature displays

2XLarge (2xl): ≥ 1536px
├─ Premium layouts
├─ Maximum content width
└─ Landscape optimized
```

---

## Quick CSS Snippets

### Add new RTL-aware component
```css
.my-component {
  margin-left: 20px;  /* Default LTR */
}

.rtl .my-component {
  margin-left: 0;
  margin-right: 20px;  /* RTL version */
}
```

### Fix scrollbar in RTL
```css
.rtl ::-webkit-scrollbar {
  position: absolute;
  right: 0;
}
```

### Hide animation on reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none !important;
  }
}
```

---

For more details, see:
- `DEVELOPER_GUIDE_RTL_ARABIC.md`
- `IMPLEMENTATION_VERIFICATION.md`
