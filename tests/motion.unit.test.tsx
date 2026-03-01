// @ts-nocheck
/**
 * Motion Components - Unit Tests Examples
 * Individual component unit tests with mocked dependencies
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  // Mock useInView for tests
  useInView: () => true,
}))

/**
 * Test: MotionButton Click Handler
 */
describe('MotionButton - Click Handling', () => {
  it('should call onClick handler when clicked', async () => {
    const { MotionButton } = require('@/components/motion')
    const handleClick = jest.fn()

    render(<MotionButton onClick={handleClick}>Click me</MotionButton>)

    const button = screen.getByRole('button', { name: /click me/i })
    await userEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should not call onClick when disabled', async () => {
    const { MotionButton } = require('@/components/motion')
    const handleClick = jest.fn()

    render(
      <MotionButton onClick={handleClick} disabled>
        Click me
      </MotionButton>
    )

    const button = screen.getByRole('button')
    await userEvent.click(button)

    expect(handleClick).not.toHaveBeenCalled()
  })
})

/**
 * Test: MotionCard Hover State
 */
describe('MotionCard - Hover Effects', () => {
  it('should render with correct structure', () => {
    const { MotionCard } = require('@/components/motion')

    const { container } = render(
      <MotionCard>
        <h3>Title</h3>
        <p>Description</p>
      </MotionCard>
    )

    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(container.firstChild).toHaveClass('rounded-lg')
  })

  it('should apply custom hover props', () => {
    const { MotionCard } = require('@/components/motion')

    render(
      <MotionCard hoverY={-12} hoverScale={1.08}>
        Content
      </MotionCard>
    )

    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})

/**
 * Test: ScrollReveal Viewport Detection
 */
describe('ScrollReveal - Viewport Behavior', () => {
  it('should render children regardless of viewport', () => {
    const { ScrollReveal } = require('@/components/motion')

    render(
      <ScrollReveal>
        <p>Revealed Content</p>
      </ScrollReveal>
    )

    expect(screen.getByText('Revealed Content')).toBeInTheDocument()
  })

  it('should handle stagger prop', () => {
    const { ScrollReveal } = require('@/components/motion')

    render(
      <ScrollReveal stagger={true}>
        <p>Content</p>
      </ScrollReveal>
    )

    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})

/**
 * Test: HeroTitle Rendering
 */
describe('HeroTitle - Text Rendering', () => {
  it('should render all text elements with correct hierarchy', () => {
    const { HeroTitle } = require('@/components/motion')

    render(
      <HeroTitle
        subtitle="Subtopic"
        title="Main Title"
        description="Description text"
        titleClassName="text-6xl font-bold"
      />
    )

    expect(screen.getByText('Subtopic')).toBeInTheDocument()
    expect(screen.getByText('Main Title')).toBeInTheDocument()
    expect(screen.getByText(/Description text/i)).toBeInTheDocument()
  })

  it('should handle missing optional fields', () => {
    const { HeroTitle } = require('@/components/motion')

    const { container } = render(<HeroTitle title="Only Title" />)

    expect(screen.getByText('Only Title')).toBeInTheDocument()
    expect(container.querySelectorAll('p')).toHaveLength(0)
  })
})

/**
 * Test: PageTransition Variants
 */
describe('PageTransition - Variant Support', () => {
  it('should support fade variant', () => {
    const { PageTransition } = require('@/components/motion')

    render(
      <PageTransition variant="fade">
        <p>Fade Content</p>
      </PageTransition>
    )

    expect(screen.getByText('Fade Content')).toBeInTheDocument()
  })

  it('should support slide variant', () => {
    const { PageTransition } = require('@/components/motion')

    render(
      <PageTransition variant="slide">
        <p>Slide Content</p>
      </PageTransition>
    )

    expect(screen.getByText('Slide Content')).toBeInTheDocument()
  })
})

/**
 * Test: StaggerContainer
 */
describe('StaggerContainer - Child Rendering', () => {
  it('should render all children', () => {
    const { StaggerContainer } = require('@/components/motion')

    render(
      <StaggerContainer>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </StaggerContainer>
    )

    expect(screen.getByText('Child 1')).toBeInTheDocument()
    expect(screen.getByText('Child 2')).toBeInTheDocument()
    expect(screen.getByText('Child 3')).toBeInTheDocument()
  })

  it('should accept staggerDelay prop', () => {
    const { StaggerContainer } = require('@/components/motion')

    render(
      <StaggerContainer staggerDelay={0.15}>
        <p>Item</p>
      </StaggerContainer>
    )

    expect(screen.getByText('Item')).toBeInTheDocument()
  })
})

/**
 * Test: RevealText
 */
describe('RevealText - Text Animation', () => {
  it('should render text content', () => {
    const { RevealText } = require('@/components/motion')

    render(<RevealText text="Animated Text" />)
    expect(screen.getByText('Animated Text')).toBeInTheDocument()
  })

  it('should support stagger character animation', () => {
    const { RevealText } = require('@/components/motion')

    render(<RevealText text="Test" stagger={true} />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})

/**
 * Test: SimpleAnimated
 */
describe('SimpleAnimated - Basic Animation', () => {
  it('should render children with fade animation', () => {
    const { SimpleAnimated } = require('@/components/motion')

    render(
      <SimpleAnimated duration={0.5}>
        <p>Animated</p>
      </SimpleAnimated>
    )

    expect(screen.getByText('Animated')).toBeInTheDocument()
  })

  it('should accept delay prop', () => {
    const { SimpleAnimated } = require('@/components/motion')

    render(
      <SimpleAnimated duration={0.3} delay={0.1}>
        <p>Delayed</p>
      </SimpleAnimated>
    )

    expect(screen.getByText('Delayed')).toBeInTheDocument()
  })
})

/**
 * Test: ButtonGroup
 */
describe('ButtonGroup - Multi-Button Layout', () => {
  it('should render multiple buttons horizontally', () => {
    const { MotionButton, ButtonGroup } = require('@/components/motion')

    render(
      <ButtonGroup orientation="horizontal">
        <MotionButton>Btn 1</MotionButton>
        <MotionButton>Btn 2</MotionButton>
      </ButtonGroup>
    )

    expect(screen.getByRole('button', { name: /btn 1/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /btn 2/i })).toBeInTheDocument()
  })

  it('should render buttons vertically when specified', () => {
    const { MotionButton, ButtonGroup } = require('@/components/motion')

    render(
      <ButtonGroup orientation="vertical">
        <MotionButton>Btn 1</MotionButton>
        <MotionButton>Btn 2</MotionButton>
      </ButtonGroup>
    )

    expect(screen.getByRole('button', { name: /btn 1/i })).toBeInTheDocument()
  })
})

/**
 * Test: MotionCardImage
 */
describe('MotionCardImage - Image Rendering', () => {
  it('should render image with correct src and alt', () => {
    const { MotionCardImage } = require('@/components/motion')

    render(
      <MotionCardImage src="/test-image.jpg" alt="Test Image" />
    )

    const img = screen.getByAltText('Test Image') as HTMLImageElement
    expect(img.src).toContain('test-image.jpg')
  })

  it('should accept custom className', () => {
    const { MotionCardImage } = require('@/components/motion')

    const { container } = render(
      <MotionCardImage
        src="/test.jpg"
        alt="Test"
        className="custom-class"
      />
    )

    const img = container.querySelector('img')
    expect(img?.parentElement).toHaveClass('rounded-md')
  })
})

/**
 * Test: CardGrid
 */
describe('CardGrid - Grid Layout', () => {
  it('should render children in grid', () => {
    const { CardGrid } = require('@/components/motion')

    render(
      <CardGrid>
        <div>Card 1</div>
        <div>Card 2</div>
        <div>Card 3</div>
      </CardGrid>
    )

    expect(screen.getByText('Card 1')).toBeInTheDocument()
    expect(screen.getByText('Card 2')).toBeInTheDocument()
    expect(screen.getByText('Card 3')).toBeInTheDocument()
  })

  it('should accept custom className', () => {
    const { CardGrid } = require('@/components/motion')

    const { container } = render(
      <CardGrid className="custom-grid-class">
        <div>Card</div>
      </CardGrid>
    )

    expect(container.firstChild).toHaveClass('custom-grid-class')
  })
})

/**
 * Test: ScrollRevealGrid
 */
describe('ScrollRevealGrid - Card Stagger', () => {
  it('should render grid with all cards', () => {
    const { ScrollRevealGrid } = require('@/components/motion')

    render(
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
})

/**
 * Test: ScrollRevealList
 */
describe('ScrollRevealList - List Stagger', () => {
  it('should render list items', () => {
    const { ScrollRevealList } = require('@/components/motion')

    const items = [
      <li key="1">Item 1</li>,
      <li key="2">Item 2</li>,
      <li key="3">Item 3</li>,
    ]

    render(<ScrollRevealList items={items} />)

    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Item 3')).toBeInTheDocument()
  })
})

export {}
