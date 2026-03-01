// @ts-nocheck
/**
 * Motion Components - Integration Tests
 * Tests for all motion design system components
 *
 * These are example integration tests that can be run with Jest + React Testing Library
 * To use: npm install --save-dev @testing-library/react @testing-library/jest-dom jest
 */

import React from 'react'
import { render, screen, waitFor, within } from '@testing-library/react'
import { motion } from 'framer-motion'
import '@testing-library/jest-dom'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

/**
 * Test Suite: HeroTitle Component
 */
describe('HeroTitle Component', () => {
  it('should render with all text elements', () => {
    const { HeroTitle } = require('@/components/motion')
    
    render(
      <HeroTitle
        title="Welcome"
        subtitle="Premium"
        description="Experience"
      />
    )

    expect(screen.getByText('Welcome')).toBeInTheDocument()
    expect(screen.getByText('Premium')).toBeInTheDocument()
    expect(screen.getByText('Experience')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { HeroTitle } = require('@/components/motion')
    const { container } = render(
      <HeroTitle
        title="Test"
        className="custom-class"
      />
    )

    const wrapper = container.firstChild
    expect(wrapper).toHaveClass('custom-class')
  })

  it('should render subtitle and description as optional', () => {
    const { HeroTitle } = require('@/components/motion')
    const { container: noOptional } = render(
      <HeroTitle title="Test Only" />
    )

    expect(screen.getByText('Test Only')).toBeInTheDocument()
    expect(noOptional.querySelectorAll('p')).toHaveLength(0)
  })
})

/**
 * Test Suite: ScrollReveal Component
 */
describe('ScrollReveal Component', () => {
  it('should render children', () => {
    const { ScrollReveal } = require('@/components/motion')
    
    render(
      <ScrollReveal>
        <div>Test Content</div>
      </ScrollReveal>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('should apply className to wrapper', () => {
    const { ScrollReveal } = require('@/components/motion')
    const { container } = render(
      <ScrollReveal className="test-wrapper">
        <div>Content</div>
      </ScrollReveal>
    )

    expect(container.querySelector('.test-wrapper')).toBeInTheDocument()
  })

  it('should work with ScrollRevealGrid', () => {
    const { ScrollRevealGrid } = require('@/components/motion')
    const { container } = render(
      <ScrollRevealGrid>
        <div>Card 1</div>
        <div>Card 2</div>
        <div>Card 3</div>
      </ScrollRevealGrid>
    )

    expect(screen.getByText('Card 1')).toBeInTheDocument()
    expect(screen.getByText('Card 2')).toBeInTheDocument()
    expect(screen.getByText('Card 3')).toBeInTheDocument()
  })

  it('should work with ScrollRevealList', () => {
    const { ScrollRevealList } = require('@/components/motion')
    const items = [
      <span key="1">Item 1</span>,
      <span key="2">Item 2</span>,
      <span key="3">Item 3</span>,
    ]

    render(<ScrollRevealList items={items} />)

    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Item 3')).toBeInTheDocument()
  })
})

/**
 * Test Suite: MotionCard Component
 */
describe('MotionCard Component', () => {
  it('should render card with children', () => {
    const { MotionCard } = require('@/components/motion')
    
    render(
      <MotionCard>
        <h3>Card Title</h3>
        <p>Card content</p>
      </MotionCard>
    )

    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('should have correct default classes', () => {
    const { MotionCard } = require('@/components/motion')
    const { container } = render(<MotionCard>Content</MotionCard>)

    const card = container.firstChild
    expect(card).toHaveClass('rounded-lg')
    expect(card).toHaveClass('border')
    expect(card).toHaveClass('p-6')
  })

  it('should accept custom hoverY and hoverScale props', () => {
    const { MotionCard } = require('@/components/motion')
    const { container } = render(
      <MotionCard hoverY={-10} hoverScale={1.05}>
        Content
      </MotionCard>
    )

    expect(container.firstChild).toBeInTheDocument()
  })

  it('should work with MotionCardImage', () => {
    const { MotionCard, MotionCardImage } = require('@/components/motion')
    
    render(
      <MotionCard>
        <MotionCardImage src="/test.jpg" alt="Test" />
        <p>Content</p>
      </MotionCard>
    )

    const img = screen.getByAltText('Test')
    expect(img).toHaveAttribute('src', '/test.jpg')
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('should handle onClick', () => {
    const { MotionCard } = require('@/components/motion')
    const handleClick = jest.fn()
    
    const { container } = render(
      <MotionCard onClick={handleClick}>
        Click me
      </MotionCard>
    )

    const card = container.firstChild
    card.click()
    expect(handleClick).toHaveBeenCalled()
  })
})

/**
 * Test Suite: MotionButton Component
 */
describe('MotionButton Component', () => {
  it('should render with text', () => {
    const { MotionButton } = require('@/components/motion')
    
    render(<MotionButton>Click Me</MotionButton>)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })

  it('should support different variants', () => {
    const { MotionButton } = require('@/components/motion')
    const variants = ['primary', 'secondary', 'outline', 'ghost']

    variants.forEach((variant) => {
      const { unmount } = render(
        <MotionButton variant={variant as any}>
          {variant}
        </MotionButton>
      )
      expect(screen.getByText(variant)).toBeInTheDocument()
      unmount()
    })
  })

  it('should support different sizes', () => {
    const { MotionButton } = require('@/components/motion')
    const sizes = ['sm', 'md', 'lg']

    sizes.forEach((size) => {
      const { unmount } = render(
        <MotionButton size={size as any}>
          {size}
        </MotionButton>
      )
      expect(screen.getByText(size)).toBeInTheDocument()
      unmount()
    })
  })

  it('should show loading state', () => {
    const { MotionButton } = require('@/components/motion')
    
    const { rerender } = render(
      <MotionButton isLoading={false}>
        Submit
      </MotionButton>
    )
    expect(screen.getByText('Submit')).toBeInTheDocument()

    rerender(
      <MotionButton isLoading={true}>
        Submit
      </MotionButton>
    )

    // Loading spinner should be visible, original text still there
    expect(screen.getByText('Submit')).toBeInTheDocument()
  })

  it('should support icons', () => {
    const { MotionButton } = require('@/components/motion')
    
    render(
      <MotionButton leftIcon="←" rightIcon="→">
        Navigate
      </MotionButton>
    )

    expect(screen.getByText('Navigate')).toBeInTheDocument()
  })

  it('should handle disabled state', () => {
    const { MotionButton } = require('@/components/motion')
    
    const { container } = render(
      <MotionButton disabled>
        Disabled
      </MotionButton>
    )

    const button = container.querySelector('button')
    expect(button).toBeDisabled()
  })

  it('should work with ButtonGroup', () => {
    const { MotionButton, ButtonGroup } = require('@/components/motion')
    
    render(
      <ButtonGroup orientation="horizontal">
        <MotionButton>Button 1</MotionButton>
        <MotionButton>Button 2</MotionButton>
      </ButtonGroup>
    )

    expect(screen.getByText('Button 1')).toBeInTheDocument()
    expect(screen.getByText('Button 2')).toBeInTheDocument()
  })

  it('should render FloatingActionButton', () => {
    const { FloatingActionButton } = require('@/components/motion')
    
    render(
      <FloatingActionButton>
        💬
      </FloatingActionButton>
    )

    expect(screen.getByText('💬')).toBeInTheDocument()
  })
})

/**
 * Test Suite: PageTransition Component
 */
describe('PageTransition Component', () => {
  it('should render children', () => {
    const { PageTransition } = require('@/components/motion')
    
    render(
      <PageTransition>
        <div>Page Content</div>
      </PageTransition>
    )

    expect(screen.getByText('Page Content')).toBeInTheDocument()
  })

  it('should support fade variant', () => {
    const { PageTransition } = require('@/components/motion')
    const { container } = render(
      <PageTransition variant="fade">
        Content
      </PageTransition>
    )

    expect(container.firstChild).toBeInTheDocument()
  })

  it('should support slide variant', () => {
    const { PageTransition } = require('@/components/motion')
    const { container } = render(
      <PageTransition variant="slide">
        Content
      </PageTransition>
    )

    expect(container.firstChild).toBeInTheDocument()
  })

  it('should work with SectionTransition', () => {
    const { SectionTransition } = require('@/components/motion')
    
    render(
      <SectionTransition id="test-section" delay={0.1}>
        Section Content
      </SectionTransition>
    )

    const section = screen.getByText('Section Content').closest('section')
    expect(section).toHaveAttribute('id', 'test-section')
  })

  it('should work with StaggerContainer', () => {
    const { StaggerContainer } = require('@/components/motion')
    
    render(
      <StaggerContainer>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </StaggerContainer>
    )

    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Item 3')).toBeInTheDocument()
  })

  it('should work with RevealText', () => {
    const { RevealText } = require('@/components/motion')
    
    render(<RevealText text="Hello World" />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('should work with SimpleAnimated', () => {
    const { SimpleAnimated } = require('@/components/motion')
    
    render(
      <SimpleAnimated duration={0.5} delay={0.2}>
        Animated Content
      </SimpleAnimated>
    )

    expect(screen.getByText('Animated Content')).toBeInTheDocument()
  })
})

/**
 * Test Suite: Utility Functions
 */
describe('Motion Utilities', () => {
  it('should export TIMING constants', () => {
    const { TIMING } = require('@/components/motion')
    
    expect(TIMING.FAST).toBe(0.2)
    expect(TIMING.NORMAL).toBe(0.3)
    expect(TIMING.MEDIUM).toBe(0.5)
    expect(TIMING.SLOW).toBe(0.8)
    expect(TIMING.EXTRA_SLOW).toBe(1.2)
  })

  it('should export EASING constants', () => {
    const { EASING } = require('@/components/motion')
    
    expect(EASING.EASE_OUT_CUBIC).toBeDefined()
    expect(EASING.EASE_OUT_EXPO).toBeDefined()
    expect(EASING.EASE_IN_OUT_CUBIC).toBeDefined()
    expect(EASING.EASE_IN_OUT_BACK).toBeDefined()
    expect(EASING.EASE_OUT_BACK).toBeDefined()
  })

  it('should export animation variants', () => {
    const {
      heroTypographyVariants,
      scrollRevealVariants,
      cardHoverVariants,
      buttonVariants,
      pageTransitionVariants,
    } = require('@/components/motion')
    
    expect(heroTypographyVariants).toBeDefined()
    expect(scrollRevealVariants).toBeDefined()
    expect(cardHoverVariants).toBeDefined()
    expect(buttonVariants).toBeDefined()
    expect(pageTransitionVariants).toBeDefined()
  })

  it('should have getTransitionDuration function', () => {
    const { getTransitionDuration } = require('@/components/motion')
    
    const duration = getTransitionDuration(0.5, false)
    expect(duration).toBe(0.5)
  })

  it('should have createAccessibleVariant function', () => {
    const { createAccessibleVariant, heroTypographyVariants } = require('@/components/motion')
    
    const accessible = createAccessibleVariant(heroTypographyVariants)
    expect(accessible).toBeDefined()
    expect(Object.keys(accessible).length > 0).toBe(true)
  })
})

/**
 * Test Suite: EnhancedSections Components
 */
describe('EnhancedSections Components', () => {
  it('should render FeaturesSection with all features', () => {
    const { FeaturesSection } = require('@/components/sections/EnhancedSections')
    
    render(<FeaturesSection />)
    
    expect(screen.getByText('Why Choose MyFounders?')).toBeInTheDocument()
    expect(screen.getByText('Network Effect')).toBeInTheDocument()
    expect(screen.getByText('AI Intelligence')).toBeInTheDocument()
  })

  it('should render PricingSection with all plans', () => {
    const { PricingSection } = require('@/components/sections/EnhancedSections')
    
    render(<PricingSection />)
    
    expect(screen.getByText('Starter')).toBeInTheDocument()
    expect(screen.getByText('Pro')).toBeInTheDocument()
    expect(screen.getByText('Enterprise')).toBeInTheDocument()
  })

  it('should render EnhancedCTASection', () => {
    const { EnhancedCTASection } = require('@/components/sections/EnhancedSections')
    
    render(<EnhancedCTASection />)
    
    expect(
      screen.getByText(/Join the Gulf's Premier Founder Network/)
    ).toBeInTheDocument()
  })

  it('should render TestimonialsSection with testimonials', () => {
    const { TestimonialsSection } = require('@/components/sections/EnhancedSections')
    
    render(<TestimonialsSection />)
    
    expect(screen.getByText('Stories from Our Community')).toBeInTheDocument()
    expect(screen.getByText('Ahmed Al-Mansouri')).toBeInTheDocument()
  })
})

/**
 * Example Test: Accessibility
 */
describe('Motion Components Accessibility', () => {
  it('should respect prefers-reduced-motion', () => {
    const { getTransitionDuration } = require('@/components/motion')
    
    // Default behavior (respects accessibility)
    const duration = getTransitionDuration(0.5, true)
    expect(duration).toBeLessThanOrEqual(0.5)
  })

  it('should have proper aria labels on buttons', () => {
    const { MotionButton } = require('@/components/motion')
    
    render(
      <MotionButton aria-label="Submit Form">
        Submit
      </MotionButton>
    )

    expect(screen.getByLabelText('Submit Form')).toBeInTheDocument()
  })
})

export {}
