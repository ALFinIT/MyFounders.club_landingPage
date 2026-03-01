# Premium Motion Design System - Implementation Guide

## Overview

This document provides a complete guide to using the premium motion design system implemented in your Next.js project. The system is inspired by modern SaaS platforms like Stripe, Linear, and Vercel.

## Architecture

### 1. Motion Configuration (`lib/motion-configs.ts`)

Core animation configurations with consistent timing and easing:

```typescript
import { TIMING, EASING, heroTypographyVariants } from '@/lib/motion-configs'
```

**Available Timing Values:**
- `TIMING.FAST` (0.2s) - Quick micro-interactions
- `TIMING.NORMAL` (0.3s) - Standard button/card hovers
- `TIMING.MEDIUM` (0.5s) - Hero typography, scroll reveals
- `TIMING.SLOW` (0.8s) - Page transitions
- `TIMING.EXTRA_SLOW` (1.2s) - Lazy load animations

**Easing Functions:**
- `EASE_OUT_CUBIC` - Smooth natural exit
- `EASE_OUT_EXPO` - Bouncy, playful exit
- `EASE_IN_OUT_CUBIC` - Smooth bidirectional motion
- `EASE_IN_OUT_BACK` - Playful back-and-forth
- `EASE_OUT_BACK` - Bouncy scale effects

---

## Components

### 1. HeroTitle - Kinetic Typography

Creates premium hero sections with staggered text animations.

```typescript
import { HeroTitle } from '@/components/motion'

export default function Hero() {
  return (
    <HeroTitle
      subtitle="Welcome to"
      title="MyFounders.club"
      description="Connect, collaborate, and build your network"
      titleClassName="text-6xl font-bold text-gray-900"
      descriptionClassName="text-lg text-gray-600"
    />
  )
}
```

**Props:**
- `title` (string) - Main heading
- `subtitle` (string, optional) - Overline text
- `description` (string, optional) - Supporting text
- `className` - Container wrapper classes
- `titleClassName` - Custom title styling
- `subtitleClassName` - Custom subtitle styling
- `descriptionClassName` - Custom description styling

**Features:**
- Automatic stagger animation between elements
- Each element fades in and slides up with a 100ms delay
- Uses premium easing for natural motion

---

### 2. ScrollReveal - Viewport-Triggered Animations

Triggers animations when elements enter the viewport.

```typescript
import { ScrollReveal, ScrollRevealGrid, ScrollRevealList } from '@/components/motion'

// Basic component reveal
<ScrollReveal>
  <div className="bg-white p-6 rounded-lg">
    Premium content appears when you scroll
  </div>
</ScrollReveal>

// Grid of cards with staggered reveals
<ScrollRevealGrid columnClassName="p-4">
  <Card>Feature 1</Card>
  <Card>Feature 2</Card>
  <Card>Feature 3</Card>
</ScrollRevealGrid>

// List with staggered reveals
<ScrollRevealList
  items={[
    <p>Step 1: Create account</p>,
    <p>Step 2: Complete profile</p>,
    <p>Step 3: Start networking</p>,
  ]}
/>
```

**ScrollReveal Props:**
- `children` - Content to reveal
- `className` - Wrapper classes
- `stagger` - Enable staggered animation for children
- `delay` - Additional delay before animation

**Features:**
- Viewport detection with 100px margin for early triggering
- "once: true" - animations only play once
- Smooth fade-in + upward motion (50px)
- Perfect for landing page sections

---

### 3. MotionCard - Hoverable Cards with Elevation

Premium cards that lift and scale on hover.

```typescript
import { MotionCard, CardGrid, MotionCardImage } from '@/components/motion'

<CardGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <MotionCard hoverY={-8} hoverScale={1.02}>
    <MotionCardImage
      src="/feature-1.jpg"
      alt="Feature 1"
    />
    <h3 className="text-lg font-semibold">Feature Name</h3>
    <p className="text-gray-600">Feature description</p>
  </MotionCard>
</CardGrid>
```

**MotionCard Props:**
- `children` - Card content
- `className` - Custom card styling
- `hoverY` - Vertical lift amount (default: -8px)
- `hoverScale` - Scale multiplier on hover (default: 1.02)
- `onClick` - Click handler

**MotionCardImage Props:**
- `src` - Image URL
- `alt` - Alt text
- `className` - Custom image styling

**Features:**
- Smooth elevation effect on hover
- Scales slightly for emphasis
- Dynamic shadow that expands
- Image scales independently for parallax effect

---

### 4. MotionButton - Interactive Buttons

Multi-variant buttons with micro-interactions.

```typescript
import { MotionButton, FloatingActionButton, ButtonGroup } from '@/components/motion'

// Primary button
<MotionButton variant="primary" size="lg">
  Get Started
</MotionButton>

// Secondary
<MotionButton variant="secondary">
  Learn More
</MotionButton>

// Outline
<MotionButton variant="outline">
  View Pricing
</MotionButton>

// Ghost
<MotionButton variant="ghost">
  Dismiss
</MotionButton>

// Button group
<ButtonGroup orientation="horizontal">
  <MotionButton variant="primary">Sign Up</MotionButton>
  <MotionButton variant="outline">Learn More</MotionButton>
</ButtonGroup>

// Floating action button with pulse
<FloatingActionButton>
  💬
</FloatingActionButton>
```

**MotionButton Props:**
- `variant` - "primary" | "secondary" | "outline" | "ghost"
- `size` - "sm" | "md" | "lg"
- `isLoading` - Shows loading spinner
- `leftIcon` / `rightIcon` - Icon elements
- `disabled` - Disabled state
- `onClick` - Click handler

**Features:**
- Scale on hover (1.05x)
- Press down on click (0.95x)
- Smooth 200ms transitions
- Loading state with spinner animation
- Automatic icon placement

---

### 5. PageTransition - Route Animations

Smooth transitions between pages.

```typescript
import { PageTransition, SectionTransition } from '@/components/motion'

// Wrap entire page content
export default function Page() {
  return (
    <PageTransition variant="fade">
      <div>
        Page content
      </div>
    </PageTransition>
  )
}

// Individual sections with delayed entry
<SectionTransition id="hero" delay={0.1}>
  Hero content
</SectionTransition>

<SectionTransition id="features" delay={0.2}>
  Features content
</SectionTransition>
```

**PageTransition Props:**
- `variant` - "fade" | "slide" (default: "fade")
- `children` - Page content
- `className` - Wrapper classes

**SectionTransition Props:**
- `id` - Section ID
- `delay` - Animation delay
- `className` - Section wrapper classes
- `children` - Section content

**Features:**
- Prevents layout shift during transitions
- "AnimatePresence mode='wait'" for smooth handoff
- Fade mode: simple opacity fade
- Slide mode: combined fade + upward slide

---

### 6. Additional Components

#### StaggerContainer - Child Stagger Effect

```typescript
import { StaggerContainer } from '@/components/motion'

<StaggerContainer staggerDelay={0.1}>
  <div>Child 1 - animates with 100ms delay</div>
  <div>Child 2 - animates with 200ms delay</div>
  <div>Child 3 - animates with 300ms delay</div>
</StaggerContainer>
```

#### RevealText - Character-by-Character Reveal

```typescript
import { RevealText } from '@/components/motion'

<RevealText text="Premium Text Reveal" stagger={true} />
```

#### SimpleAnimated - Basic Fade-In

```typescript
import { SimpleAnimated } from '@/components/motion'

<SimpleAnimated duration={0.5} delay={0.2}>
  Content fades in after 200ms
</SimpleAnimated>
```

---

## Integration Examples

### Example 1: Landing Page Hero

```typescript
import { HeroTitle, ScrollReveal, MotionCard, MotionButton } from '@/components/motion'

export default function LandingPage() {
  const features = [
    { title: 'Easy Setup', desc: 'Get started in minutes' },
    { title: 'Secure', desc: 'Enterprise-grade security' },
    { title: '24/7 Support', desc: 'Always here to help' },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20">
        <HeroTitle
          title="Welcome to MyFounders"
          subtitle="Premium Founder Network"
          description="Join thousands of founders building the next generation of startups"
        />
        
        <div className="mt-8 flex gap-4">
          <MotionButton variant="primary" size="lg">
            Join Community
          </MotionButton>
          <MotionButton variant="outline" size="lg">
            Learn More
          </MotionButton>
        </div>
      </section>

      {/* Features Section */}
      <ScrollReveal>
        <section className="py-20 bg-gray-50">
          <h2 className="text-4xl font-bold mb-12">Why Choose Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <MotionCard key={feature.title}>
                <h3 className="text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </MotionCard>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </main>
  )
}
```

### Example 2: Dashboard with Transitions

```typescript
import { PageTransition, SectionTransition, MotionCard } from '@/components/motion'

export default function Dashboard() {
  return (
    <PageTransition variant="fade">
      <div className="space-y-8">
        <SectionTransition id="welcome" delay={0.1}>
          <h1 className="text-4xl font-bold">Welcome Back!</h1>
        </SectionTransition>

        <SectionTransition id="stats" delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Stat cards */}
          </div>
        </SectionTransition>

        <SectionTransition id="recent" delay={0.3}>
          <MotionCard>
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
            {/* Activity list */}
          </MotionCard>
        </SectionTransition>
      </div>
    </PageTransition>
  )
}
```

---

## Accessibility

### Respecting prefers-reduced-motion

All components automatically respect the `prefers-reduced-motion` preference for users with accessibility needs:

```typescript
import { getTransitionDuration, createAccessibleVariant } from '@/components/motion'

// Get appropriate duration
const duration = getTransitionDuration(0.5, true) // true = respect accessibility

// Create accessible variant
const accessibleVariant = createAccessibleVariant(heroTypographyVariants)
```

---

## Performance Tips

1. **Use `once: true` in ScrollReveal** - Prevents re-animations on scroll
2. **Limit staggered children** - Max 10-12 items for smooth performance
3. **GPU Acceleration** - Components use `transform` and `opacity` only (best performance)
4. **Lazy load animations** - Use `useInView` hook for deferred animations
5. **Mobile optimization** - Reduce animation durations on mobile if needed

```typescript
import { useMediaQuery } from '@/hooks/use-mobile'

const isMobile = useMediaQuery('(max-width: 768px)')
const duration = isMobile ? TIMING.FAST : TIMING.MEDIUM
```

---

## Customization

### Create Custom Variants

```typescript
import { Variants } from 'framer-motion'
import { TIMING, EASING } from '@/lib/motion-configs'

const customVariant: Variants = {
  hidden: {
    opacity: 0,
    rotate: -5,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      duration: TIMING.MEDIUM,
      ease: EASING.EASE_OUT_CUBIC,
    },
  },
}
```

### Override Default Timing

```typescript
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.5, delay: 0.5 }}
>
  Custom timed content
</motion.div>
```

---

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (requires iOS 13.2+)
- Reduced Motion: ✅ Automatic detection and adaptation

---

## Troubleshooting

### Animation Not Triggering

**Check:**
1. Component is wrapped with `<PageTransition>` (for page transitions)
2. Component is within viewport threshold
3. No `display: none` on parent (breaks scroll detection)

### Animation Jank/Stutter

**Fix:**
1. Reduce number of simultaneous animations
2. Use `will-change: transform` on parent
3. Profile with Chrome DevTools Performance tab
4. Test on lower-end devices

### TypeScript Errors

**Solution:**
Ensure `'use client'` directive at top of component files using motion hooks.

---

## API Reference Quick Look

| Component | Use Case | Key Props |
|-----------|----------|-----------|
| `HeroTitle` | Hero sections | title, subtitle, description |
| `ScrollReveal` | Lazy animations | stagger, delay |
| `MotionCard` | Hover effects | hoverY, hoverScale |
| `MotionButton` | Interactive buttons | variant, size, isLoading |
| `PageTransition` | Route transitions | variant (fade/slide) |
| `SectionTransition` | Section stagger | delay |

---

## Resources

- **Framer Motion**: https://www.framer.com/motion
- **Easing Functions**: https://easings.net
- **Accessibility**: https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions

---

**Last Updated:** February 26, 2026
**Version:** 1.0.0
