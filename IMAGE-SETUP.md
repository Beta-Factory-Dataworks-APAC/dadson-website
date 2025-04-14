# Image Setup for Hero Section

This document outlines the image requirements and setup for the Dadson Logistics website hero section.

## Required Images

1. **Hero Background Image**
   - File path: `/public/images/hero-truck-highway.jpg`
   - Requirements:
     - High-quality aerial image of a white truck on a highway bridge/overpass
     - Mountainous/green landscape in the background
     - Landscape orientation with aspect ratio approximately 16:9
     - Minimum resolution: 1920x1080px (larger is better for retina displays)
     - The image should be properly compressed for web use without losing quality
     - Consider using WebP format with JPG fallback for better performance

## Implementation Notes

1. **Image Optimization**
   - We're using Next.js Image component which automatically handles:
     - Lazy loading
     - Responsive sizing
     - WebP conversion when supported
     - Preventing layout shift with proper aspect ratio

2. **Overlay Effect**
   - The dark overlay is implemented using a gradient div with proper opacity
   - This ensures text readability over any background image

3. **Image Folder Structure**
   - All images should be placed in the `/public/images/` directory
   - Consider organizing by section if you have many images (e.g., `/public/images/hero/`)

4. **Mobile Considerations**
   - The same image works across all screen sizes thanks to `object-cover`
   - Lower resolution versions are automatically served to mobile devices by Next.js

## Adding New Hero Images

If you wish to implement a carousel or switch the hero image:

1. Add additional images to the same directory with descriptive names
2. Ensure consistent dimensions and style across all hero images
3. Use the same overlay technique for text readability
4. Implement a carousel component or image switcher as needed

## Current Image Assets

The following images are currently available in the project:
- `/public/images/hero-truck-highway.jpg` - Main hero image showing a truck on a highway 