# Motion Components Testing Guide

## Overview

This guide covers how to test the premium motion design system components using Jest and React Testing Library.

## Setup

### 1. Install Testing Dependencies

```bash
npm install --save-dev \
  jest \
  @testing-library/react \
  @testing-library/jest-dom \
  @testing-library/user-event \
  jest-environment-jsdom \
  ts-jest \
  identity-obj-proxy
```

### 2. Update package.json Scripts

Add these test scripts to your `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:motion": "jest motion"
  }
}
```

### 3. Configuration Files

Configuration files are already provided in your project:
- `jest.config.js` - Main Jest configuration
- `tests/setup.ts` - Test environment setup

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode (Auto-reload)
```bash
npm run test:watch
```

### Run Motion Component Tests Only
```bash
npm run test:motion
```

### Generate Coverage Report
```bash
npm run test:coverage
```

## Test Files

### Integration Tests
**File:** `tests/motion.integration.test.ts`

Tests the complete functionality of motion components:
- Component rendering
- Props validation
- Child element rendering
- Staggered animations
- Accessibility features

**Run:**
```bash
npm test -- motion.integration
```

### Unit Tests
**File:** `tests/motion.unit.test.ts`

Tests individual component features:
- Click handlers
- Hover states
- Viewport behavior
- Text rendering
- Variant support

**Run:**
```bash
npm test -- motion.unit
```

## Test Coverage

Current test coverage areas:

### Components Tested
- ✅ HeroTitle
- ✅ ScrollReveal (+ Grid, List variants)
- ✅ MotionCard (+ Image, Grid)
- ✅ MotionButton (+ ButtonGroup, FAB)
- ✅ PageTransition (+ SectionTransition, StaggerContainer, RevealText, SimpleAnimated)
- ✅ EnhancedSections (FeaturesSection, PricingSection, etc.)

### Features Tested
- ✅ Component rendering
- ✅ Props passing
- ✅ Custom styling (className)
- ✅ Click/hover handlers
- ✅ Disabled states
- ✅ Icon support
- ✅ Loading states
- ✅ Viewport behavior (mocked)
- ✅ Variant support
- ✅ Staggered animations
- ✅ Accessibility features

## Writing New Tests

### Test Template

```typescript
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Component Name', () => {
  it('should render with default props', () => {
    render(<YourComponent />)
    expect(screen.getByText('expected text')).toBeInTheDocument()
  })

  it('should handle user interaction', async () => {
    render(<YourComponent />)
    const element = screen.getByRole('button')
    await userEvent.click(element)
    // Assert expected behavior
  })

  it('should apply custom styling', () => {
    const { container } = render(
      <YourComponent className="custom-class" />
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })
})
```

### Best Practices

1. **Query Hierarchy** (in order of preference):
   - `getByRole()` - Most accessible
   - `getByLabelText()` - Good for forms
   - `getByPlaceholderText()` - For input fields
   - `getByText()` - For text content
   - `getByTestId()` - Last resort

2. **Async Testing**:
   ```typescript
   it('should update after async operation', async () => {
     render(<Component />)
     const button = screen.getByRole('button')
     await userEvent.click(button)
     await waitFor(() => {
       expect(screen.getByText('new content')).toBeInTheDocument()
     })
   })
   ```

3. **Testing Animations**:
   ```typescript
   // Note: Framer Motion animations are mocked in tests
   // Focus on testing logic, not animation values
   ```

## Common Testing Patterns

### Testing Props

```typescript
it('should accept and use custom props', () => {
  const props = {
    variant: 'primary',
    size: 'lg',
    disabled: false,
  }
  render(<MotionButton {...props}>Click</MotionButton>)
  expect(screen.getByRole('button')).not.toBeDisabled()
})
```

### Testing Callbacks

```typescript
it('should call callback on interaction', async () => {
  const handleClick = jest.fn()
  render(<MotionButton onClick={handleClick}>Click</MotionButton>)
  
  await userEvent.click(screen.getByRole('button'))
  expect(handleClick).toHaveBeenCalledTimes(1)
})
```

### Testing Conditional Rendering

```typescript
it('should conditionally render based on props', () => {
  const { rerender } = render(<MotionButton isLoading={false}>Submit</MotionButton>)
  expect(screen.getByText('Submit')).toBeInTheDocument()
  
  rerender(<MotionButton isLoading={true}>Submit</MotionButton>)
  // Spinner should appear, text should remain
})
```

### Testing Accessibility

```typescript
it('should be keyboard accessible', async () => {
  render(<MotionButton>Click</MotionButton>)
  const button = screen.getByRole('button')
  
  button.focus()
  expect(button).toHaveFocus()
  
  await userEvent.keyboard('{Enter}')
  // Test behavior
})
```

## Debugging Tests

### Debug DOM Output
```typescript
it('should render correctly', () => {
  const { debug } = render(<Component />)
  debug() // Prints DOM to console
})
```

### Screen Queries Debugging
```typescript
it('should find elements', () => {
  render(<Component />)
  screen.logTestingPlaygroundURL() // Prints Testing Playground URL
})
```

### Run Single Test
```bash
npm test -- --testNamePattern="specific test name"
```

## Mocking

### Mock Next.js Hooks
```typescript
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    query: {},
  }),
  usePathname: () => '/',
}))
```

### Mock Framer Motion
```typescript
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
}))
```

## Snapshot Testing

### Create Snapshot
```typescript
it('should match snapshot', () => {
  const { container } = render(<Component />)
  expect(container.firstChild).toMatchSnapshot()
})
```

### Update Snapshots
```bash
npm test -- -u
```

⚠️ **Note:** Use snapshots sparingly. Focus on behavior testing over snapshot testing.

## Performance Considerations

- Tests typically run in < 100ms per test
- Use `test.skip()` to skip slow tests during development
- Use `test.only()` to focus on specific tests

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v2
```

## Troubleshooting

### Test Timeout
Increase timeout for slow tests:
```typescript
it('slow test', async () => {
  // test code
}, 10000) // 10 second timeout
```

### Import Errors
Ensure path mappings in jest.config.js match tsconfig.json:
```js
moduleNameMapper: {
  '^@/(.*)$': '<rootDir>/$1',
}
```

### Async/Await Issues
Always use `await` for async operations:
```typescript
await userEvent.click(button) // Correct
userEvent.click(button) // Wrong
```

## Resources

- [Jest Documentation](https://jestjs.io)
- [React Testing Library Docs](https://testing-library.com/react)
- [Testing Library Queries](https://testing-library.com/query-variants)
- [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Next Steps

1. Run the tests to ensure all components work correctly
2. Add tests for your custom components
3. Integrate tests into your CI/CD pipeline
4. Aim for > 80% code coverage

---

**Last Updated:** February 26, 2026
**Version:** 1.0.0
