# TruckAnimation Component

A specialized animation component for realistic truck slide-in with braking effect, designed for the Dadson Logistics website.

## Overview

The `TruckAnimation` component creates a realistic animation of a truck sliding into view with a smooth braking effect. This animation is specifically designed to give the impression of a truck driving in from off-screen, gradually slowing down, and coming to a stop with a subtle bounce - similar to how a real truck would brake.

## Implementation Details

This component:
- Uses a two-phase animation approach for realistic physics
- First phase: Rapid entry with momentum
- Second phase: Gradual deceleration with a spring-based brake effect
- Adapts to both desktop and mobile viewports
- Maintains responsive behavior across screen sizes

## Usage Example

```tsx
import TruckAnimation from '@/lib/react-bits/TruckAnimation';

// Basic usage
<TruckAnimation
  src="/truck.png"
  alt="Logistics Truck"
  width={1000}
  height={500}
  className="absolute left-[-60%] bottom-[-30px] w-[160%]"
  priority
  delay={0.5}
/>

// With onComplete callback
<TruckAnimation
  src="/truck.png"
  alt="Logistics Truck"
  width={600}
  height={300}
  className="absolute left-[-20%] top-[0px] w-[140%]"
  priority
  delay={0.3}
  onComplete={() => console.log('Animation completed!')}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | Required | The image source URL for the truck |
| `alt` | `string` | Required | Alt text for the truck image |
| `width` | `number` | Required | Width of the image (for Next.js Image component) |
| `height` | `number` | Required | Height of the image (for Next.js Image component) |
| `className` | `string` | `''` | Additional CSS classes for positioning and styling |
| `priority` | `boolean` | `false` | Whether to prioritize image loading |
| `delay` | `number` | `0.3` | Delay before animation starts (in seconds) |
| `onComplete` | `() => void` | `undefined` | Callback function to execute when animation completes |

## Animation Parameters

The animation uses specific physics parameters:

- **Phase 1 (Entry):**
  - Duration: 0.6s
  - Easing: easeOut
  - Distance: 60% of total travel

- **Phase 2 (Braking):**
  - Type: spring physics
  - Stiffness: 50 (controls bounce strength)
  - Damping: 12 (controls oscillation)
  - Mass: 1.5 (simulates weight of the truck)
  - Duration: 0.9s

## Accessibility Considerations

- Animation respects user preferences for reduced motion when enabled
- Images have appropriate alt text
- Animation doesn't interfere with page usability or content consumption

## Performance Notes

- Uses Framer Motion for optimized animation performance
- Implements efficient re-rendering via React hooks
- Image is optimized through Next.js Image component
- Animation only triggers when component enters viewport 