# React Bits Components

This directory contains the animation components for the Dadson Logistics website. The components are currently implemented using a compatibility layer that uses Framer Motion under the hood, but will eventually be migrated to use React Bits.

## Current Implementation

We're using a compatibility layer (`AnimationWrapper.tsx`) that uses Framer Motion while we transition to React Bits. This approach allows us to:

1. Maintain consistent animation patterns across the site
2. Gradually replace Framer Motion with React Bits
3. Keep a single API for animations throughout the codebase

## Available Animation Types

The `AnimationWrapper` component supports these animation types:

- `fade`: Simple fade-in effect
- `slide`: Slide from a direction (up, down, left, right)
- `zoom`: Zoom in from slightly smaller size
- `bounce`: Bouncy entrance with spring physics
- `carousel`: Specialized animation for carousel components

## Usage Example

```tsx
import AnimationWrapper from '@/lib/react-bits/AnimationWrapper';

// Basic fade animation
<AnimationWrapper type="fade">
  <YourComponent />
</AnimationWrapper>

// Slide animation from the left with custom duration
<AnimationWrapper 
  type="slide" 
  direction="left" 
  duration={0.8}
  delay={0.2}
  className="your-custom-class"
>
  <YourComponent />
</AnimationWrapper>
```

## Animation Properties

The `AnimationWrapper` component accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'fade' \| 'slide' \| 'zoom' \| 'bounce' \| 'carousel'` | Required | The type of animation to apply |
| `children` | `React.ReactNode` | Required | The content to animate |
| `direction` | `'up' \| 'down' \| 'left' \| 'right'` | `'up'` | The direction for slide animations |
| `duration` | `number` | `0.5` | Animation duration in seconds |
| `delay` | `number` | `0` | Delay before animation starts in seconds |
| `className` | `string` | `''` | Additional CSS classes |

## Higher-Level Components

We've created higher-level components to standardize animations across the site:

1. **AnimatedSection**: A section wrapper with animation capabilities
2. **AnimatedHeading**: A heading component with animation and typography styling

Example usage:

```tsx
// Animated section with slide animation
<AnimatedSection 
  animationType="slide" 
  direction="left"
  className="p-4 bg-white rounded"
>
  <p>Your content here</p>
</AnimatedSection>

// Animated heading with fade animation
<AnimatedHeading 
  size="h2" 
  animationType="fade"
  className="mb-4"
>
  Section Title
</AnimatedHeading>
```

## Future Implementation with jsrepo

Once React Bits is properly installed via jsrepo, we will:

1. Replace the Framer Motion implementation in AnimationWrapper
2. Add specific React Bits components for specialized animations
3. Maintain the same API to ensure backward compatibility

## Demo Page

A demonstration of all animation types is available at the `/animation-demo` route.

## Installation Guide

To install new React Bits components:

1. Visit [ReactBits.dev](https://reactbits.dev)
2. Find the desired animation component
3. Install using jsrepo CLI:
   ```
   jsrepo add @react-bits/[component-name]
   ```
4. Import and use in your code

## Carousel Component

For the image carousel, we will create a specialized React Bits implementation that maintains the current functionality while using React Bits animation principles. 