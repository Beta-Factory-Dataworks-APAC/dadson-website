# Dadson Website - Complete SVG Asset Collection

This document provides a comprehensive collection of all SVG assets needed for the Dadson website implementation, organized by category and page for easy reference.

## Table of Contents
1. [Brand Identity](#1-brand-identity)
2. [UI Elements & Navigation](#2-ui-elements--navigation)
3. [Icons](#3-icons)
4. [Page-Specific Assets](#4-page-specific-assets)
5. [Implementation Guide](#5-implementation-guide)

---

## 1. Brand Identity

### 1.1 Full Logo with Text

```svg
<!-- dadson_full_logo.svg -->
<svg width="600" height="150" viewBox="0 0 600 150" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- "S" Road Logo Part -->
  <g>
    <path d="M115 25C85 25 65 60 35 60C15 60 0 45 0 25V125C0 105 15 90 35 90C65 90 85 125 115 125C135 125 150 110 150 90V25C150 45 135 60 115 60C95 60 80 45 80 25" fill="white" stroke="#1A1533" stroke-width="4"/>
    <!-- Road markings -->
    <path d="M18 38L24 44M32 52L38 58M48 66L54 72M65 82L71 88M82 96L88 102M98 108L104 114" stroke="white" stroke-width="4" stroke-linecap="round" stroke-dasharray="6 12"/>
  </g>
  
  <!-- Text "DADSON" -->
  <path d="M180 50H210C230 50 245 65 245 85C245 105 230 120 210 120H180V50ZM210 100C220 100 225 95 225 85C225 75 220 70 210 70H200V100H210Z" fill="white"/>
  <path d="M255 50H285C305 50 320 65 320 85C320 105 305 120 285 120H255V50ZM285 100C295 100 300 95 300 85C300 75 295 70 285 70H275V100H285Z" fill="white"/>
  <path d="M330 50H390C410 50 420 60 420 75C420 85 415 92 405 95C415 97 420 105 420 115V120H400V115C400 105 395 100 385 100H350V120H330V50ZM385 80C390 80 395 77 395 72C395 67 390 65 385 65H350V80H385Z" fill="white"/>
  <path d="M430 50H490C510 50 520 60 520 75C520 85 515 92 505 95C515 97 520 105 520 115V120H500V115C500 105 495 100 485 100H450V120H430V50ZM485 80C490 80 495 77 495 72C495 67 490 65 485 65H450V80H485Z" fill="white"/>
  <path d="M530 50H590C600 50 600 60 600 70V120H580V100H550V120H530V50ZM580 80V70H550V80H580Z" fill="white"/>
  <path d="M380 130H390C405 130 415 140 415 150H405C405 145 400 140 390 140H380V130Z" fill="white"/>
  
  <!-- Text "LOGISTICS" -->
  <g transform="translate(155, 140)" fill="white">
    <path d="M0 0H15V30H0V0Z"/>
    <path d="M25 0H65V10H40V12H65V20H40V22H65V30H25V0Z"/>
    <path d="M75 0H115C125 0 130 5 130 15C130 25 125 30 115 30H75V0ZM115 20C118 20 120 18 120 15C120 12 118 10 115 10H90V20H115Z"/>
    <path d="M140 0H155V30H140V0Z"/>
    <path d="M165 0H180V20H205V30H165V0Z"/>
    <path d="M215 0H230V30H215V0Z"/>
    <path d="M240 0H280C290 0 295 5 295 15C295 25 290 30 280 30H240V0ZM280 20C283 20 285 18 285 15C285 12 283 10 280 10H255V20H280Z"/>
    <path d="M305 0H320V30H305V0Z"/>
    <path d="M330 0H345V20H370V30H330V0Z"/>
    <path d="M380 0H420C430 0 435 5 435 15C435 25 430 30 420 30H380V0ZM420 20C423 20 425 18 425 15C425 12 423 10 420 10H395V20H420Z"/>
  </g>
</svg>
```

### 1.2 Logo Mark Only (Standard)

```svg
<!-- dadson_logo_mark.svg -->
<svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M115 25C85 25 65 60 35 60C15 60 0 45 0 25V125C0 105 15 90 35 90C65 90 85 125 115 125C135 125 150 110 150 90V25C150 45 135 60 115 60C95 60 80 45 80 25" fill="#00B4E1"/>
  <!-- Road markings -->
  <path d="M18 38L24 44M32 52L38 58M48 66L54 72M65 82L71 88M82 96L88 102M98 108L104 114" stroke="white" stroke-width="4" stroke-linecap="round" stroke-dasharray="6 12"/>
</svg>
```

### 1.3 Logo Mark (Gradient Version)

```svg
<!-- dadson_gradient_mark.svg -->
<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="paint0_linear" x1="0" y1="100" x2="200" y2="100" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#2CD9FF"/>
      <stop offset="0.5" stop-color="#9D4EDD"/>
      <stop offset="1" stop-color="#FF6B35"/>
    </linearGradient>
  </defs>
  <path d="M100 25C70 25 50 60 20 60C0 60 0 40 0 25V175C0 160 0 140 20 140C50 140 70 175 100 175C130 175 150 155 150 135V25C150 45 130 65 100 65C70 65 50 45 50 25" fill="url(#paint0_linear)"/>
</svg>
```

### 1.4 Dashboard Logo Version

```svg
<!-- dadson_dashboard_logo.svg -->
<svg width="600" height="300" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background with gradient -->
  <rect width="600" height="300" rx="20" fill="#121212"/>
  <path d="M0 20C0.00 8.95 8.95 0 20 0H580C591.05 0 600 8.95 600 20V280C600 291.05 591.05 300 580 300H20C8.95 300 0 291.05 0 280V20Z" fill="url(#bg_gradient)"/>
  <defs>
    <linearGradient id="bg_gradient" x1="0" y1="0" x2="600" y2="300" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#121212"/>
      <stop offset="0.4" stop-color="#1D0B33"/>
      <stop offset="0.8" stop-color="#2A0645"/>
      <stop offset="1" stop-color="#3A074E"/>
    </linearGradient>
  </defs>
  
  <!-- Logo -->
  <g transform="translate(150, 120)">
    <path d="M50 10C35 10 25 25 15 25C5 25 0 20 0 10V50C0 40 5 35 15 35C25 35 35 50 50 50C60 50 65 45 65 35V10C65 20 60 25 50 25C40 25 35 20 35 10" fill="#00B4E1" stroke="#00B4E1" stroke-width="2"/>
    <!-- Road markings -->
    <path d="M8 15L10 17M14 20L16 22M20 25L22 27M26 30L28 32M32 35L34 37M38 40L40 42" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="2 4"/>
  </g>
  
  <!-- Text "DADSON" -->
  <path d="M230 100H300" stroke="#FFFFFF" stroke-width="20" stroke-linecap="round"/>
  <text x="230" y="120" font-family="Arial" font-weight="bold" font-size="40" fill="white">DADSON</text>
  
  <!-- Text "LOGISTICS" -->
  <text x="230" y="150" font-family="Arial" font-size="20" fill="white" letter-spacing="5">LOGISTICS</text>
  
  <!-- Button -->
  <rect x="350" y="100" width="80" height="30" rx="5" fill="#00B4E1"/>
  <text x="365" y="120" font-family="Arial" font-size="14" fill="white">Sign in</text>
</svg>
```

### 1.5 Color Palette

```svg
<!-- color_palette.svg -->
<svg width="600" height="80" viewBox="0 0 600 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Primary Blue -->
  <rect x="0" y="0" width="100" height="80" rx="5" fill="#00B4E1"/>
  <text x="50" y="50" font-family="Arial" font-size="10" fill="white" text-anchor="middle">#00B4E1</text>
  
  <!-- Navy Blue -->
  <rect x="100" y="0" width="100" height="80" rx="5" fill="#03033D"/>
  <text x="150" y="50" font-family="Arial" font-size="10" fill="white" text-anchor="middle">#03033D</text>
  
  <!-- Dark Text -->
  <rect x="200" y="0" width="100" height="80" rx="5" fill="#101B21"/>
  <text x="250" y="50" font-family="Arial" font-size="10" fill="white" text-anchor="middle">#101B21</text>
  
  <!-- Gray Text -->
  <rect x="300" y="0" width="100" height="80" rx="5" fill="#707C83"/>
  <text x="350" y="50" font-family="Arial" font-size="10" fill="white" text-anchor="middle">#707C83</text>
  
  <!-- Light Gray -->
  <rect x="400" y="0" width="100" height="80" rx="5" fill="#8B8991"/>
  <text x="450" y="50" font-family="Arial" font-size="10" fill="white" text-anchor="middle">#8B8991</text>
  
  <!-- White -->
  <rect x="500" y="0" width="100" height="80" rx="5" fill="#FFFFFF" stroke="#E0E0E0"/>
  <text x="550" y="50" font-family="Arial" font-size="10" fill="#101B21" text-anchor="middle">#FFFFFF</text>
</svg>
```

---

## 2. UI Elements & Navigation

### 2.1 Navigation Pills

```svg
<!-- nav_pill_active.svg -->
<svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="120" height="40" rx="20" fill="rgba(0, 0, 0, 0.05)"/>
</svg>

<!-- nav_pill_inactive.svg -->
<svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="120" height="40" rx="20" fill="rgba(255, 255, 255, 0.05)"/>
</svg>
```

### 2.2 Button Components

```svg
<!-- button_primary.svg -->
<svg width="216" height="48" viewBox="0 0 216 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="216" height="48" rx="6" fill="rgba(0, 180, 225, 0.9)"/>
</svg>

<!-- button_secondary.svg -->
<svg width="216" height="48" viewBox="0 0 216 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="216" height="48" rx="6" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(247, 247, 247, 0.1)"/>
</svg>
```

### 2.3 Form Elements

```svg
<!-- form_input.svg -->
<svg width="100%" height="48" viewBox="0 0 456 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="456" height="48" rx="6" fill="transparent" stroke="#E3E3E3"/>
</svg>

<!-- form_input_with_icon.svg -->
<svg width="100%" height="48" viewBox="0 0 456 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="456" height="48" rx="6" fill="transparent" stroke="#E3E3E3"/>
  <g transform="translate(24, 12)">
    <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#8B8991" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M3 7L12 13L21 7" stroke="#8B8991" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>

<!-- submit_button.svg -->
<svg width="100%" height="48" viewBox="0 0 456 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="456" height="48" rx="6" fill="rgba(0, 180, 225, 0.9)"/>
</svg>
```

### 2.4 Decorative Elements

```svg
<!-- vector_11.svg (Hero gradient) -->
<svg width="100%" height="100%" viewBox="0 0 1564 475" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 0H1564V400C1564 441.421 1530.42 475 1489 475H75C33.5786 475 0 441.421 0 400V0Z" fill="url(#paint0_linear)"/>
  <defs>
    <linearGradient id="paint0_linear" x1="704" y1="668" x2="268" y2="3" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#DC4D00"/>
      <stop offset="0.580534" stop-color="#7200DC"/>
      <stop offset="1" stop-color="#00B4E1"/>
    </linearGradient>
  </defs>
</svg>

<!-- vector_1.svg (Decorative background) -->
<svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 0H100V80C100 91.0457 91.0457 100 80 100H20C8.95431 100 0 91.0457 0 80V0Z" fill="#00B4E1"/>
</svg>

<!-- footer_background.svg -->
<svg width="100%" height="100%" viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1440" height="400" fill="#03033D"/>
  <path d="M0 0H1440V300C1440 355.23 1395.23 400 1340 400H100C44.77 400 0 355.23 0 300V0Z" fill="url(#footer_gradient)"/>
  
  <!-- Add subtle gradient logo shape as overlay -->
  <g opacity="0.1" transform="translate(620, 50) scale(1.5)">
    <path d="M100 25C70 25 50 60 20 60C0 60 0 40 0 25V175C0 160 0 140 20 140C50 140 70 175 100 175C130 175 150 155 150 135V25C150 45 130 65 100 65C70 65 50 45 50 25" fill="url(#logo_gradient)"/>
  </g>
  
  <defs>
    <linearGradient id="footer_gradient" x1="720" y1="0" x2="720" y2="400" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#050222"/>
      <stop offset="0.5" stop-color="#03033D"/>
      <stop offset="0.8" stop-color="#05052A"/>
      <stop offset="1" stop-color="#030709"/>
    </linearGradient>
    
    <linearGradient id="logo_gradient" x1="0" y1="100" x2="200" y2="100" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#2CD9FF"/>
      <stop offset="0.5" stop-color="#9D4EDD"/>
      <stop offset="1" stop-color="#FF6B35"/>
    </linearGradient>
  </defs>
</svg>
```

### 2.5 Dropdown Elements

```svg
<!-- dropdown_arrow.svg -->
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 6L8 10L12 6" stroke="#8B8991" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

---

## 3. Icons

### 3.1 Contact Icons

```svg
<!-- email_icon.svg -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3 18V12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12V18" stroke="#333638" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M21 19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H18C17.4696 21 16.9609 20.7893 16.5858 20.4142C16.2107 20.0391 16 19.5304 16 19V16C16 15.4696 16.2107 14.9609 16.5858 14.5858C16.9609 14.2107 17.4696 14 18 14H21V19ZM3 19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H6C6.53043 21 7.03914 20.7893 7.41421 20.4142C7.78929 20.0391 8 19.5304 8 19V16C8 15.4696 7.78929 14.9609 7.41421 14.5858C7.03914 14.2107 6.53043 14 6 14H3V19Z" stroke="#333638" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

<!-- ghost_icon.svg -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2C9.87827 2 7.84344 2.84285 6.34315 4.34315C4.84285 5.84344 4 7.87827 4 10V21.5C4 21.8978 4.15804 22.2794 4.43934 22.5607C4.72064 22.842 5.10218 23 5.5 23C5.89782 23 6.27936 22.842 6.56066 22.5607C6.84196 22.2794 7 21.8978 7 21.5V20H17V21.5C17 21.8978 17.158 22.2794 17.4393 22.5607C17.7206 22.842 18.1022 23 18.5 23C18.8978 23 19.2794 22.842 19.5607 22.5607C19.842 22.2794 20 21.8978 20 21.5V10C20 7.87827 19.1571 5.84344 17.6569 4.34315C16.1566 2.84285 14.1217 2 12 2Z" stroke="#333638" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 10H10.01" stroke="#333638" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M14 10H14.01" stroke="#333638" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 15.5C10 15.7652 10.1054 16.0196 10.2929 16.2071C10.4804 16.3946 10.7348 16.5 11 16.5H13C13.2652 16.5 13.5196 16.3946 13.7071 16.2071C13.8946 16.0196 14 15.7652 14 15.5C14 15.2348 13.8946 14.9804 13.7071 14.7929C13.5196 14.6054 13.2652 14.5 13 14.5H11C10.7348 14.5 10.4804 14.6054 10.2929 14.7929C10.1054 14.9804 10 15.2348 10 15.5Z" stroke="#333638" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

<!-- flag_icon.svg -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 15C4 15 5 14 8 14C11 14 13 16 16 16C19 16 20 15 20 15V3C20 3 19 4 16 4C13 4 11 2 8 2C5 2 4 3 4 3V15Z" stroke="#333638" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M4 22V15" stroke="#333638" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

<!-- puzzle_icon.svg -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 7H8C9.06087 7 10.0783 6.57857 10.8284 5.82843C11.5786 5.07828 12 4.06087 12 3V7C12 8.06087 12.4214 9.07828 13.1716 9.82843C13.9217 10.5786 14.9391 11 16 11H20M16 21V17C16 15.9391 16.4214 14.9217 17.1716 14.1716C17.9217 13.4214 18.9391 13 20 13H16C14.9391 13 13.9217 13.4214 13.1716 14.1716C12.4214 14.9217 12 15.9391 12 17V21M12 17H8C6.93913 17 5.92172 16.5786 5.17157 15.8284C4.42143 15.0783 4 14.0609 4 13V17C4 18.0609 3.57857 19.0783 2.82843 19.8284C2.07828 20.5786 1.06087 21 0 21H12" stroke="#333638" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

<!-- heart_icon.svg -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6054C22.3095 9.93793 22.4518 9.22252 22.4518 8.5C22.4518 7.77748 22.3095 7.06206 22.0329 6.39464C21.7563 5.7272 21.351 5.12076 20.84 4.61V4.61Z" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

### 3.4 Service Cards Icons

```svg
<!-- load_to_ride_icon.svg -->
<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.5 25H22.5C23.88 25 25 23.88 25 22.5V12.5L20 7.5H7.5C6.12 7.5 5 8.62 5 10V22.5C5 23.88 6.12 25 7.5 25Z" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M20 7.5V12.5H25" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 16.25H20" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 20H15" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

<!-- intermodal_icon.svg -->
<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.5 7.5H27.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5 7.5V25C5 25.663 5.26339 26.2989 5.73223 26.7678C6.20107 27.2366 6.83696 27.5 7.5 27.5H22.5C23.163 27.5 23.7989 27.2366 24.2678 26.7678C24.7366 26.2989 25 25.663 25 25V7.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12.5 7.5V2.5H17.5V7.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11.875 16.875L15 20L18.125 16.875" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 12.5V20" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

---

## 4. Page-Specific Assets

### 4.1 Homepage

#### Hero Section
```svg
<!-- hero_gradient_overlay.svg -->
<svg width="100%" height="100%" viewBox="0 0 1564 475" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 0H1564V400C1564 441.421 1530.42 475 1489 475H75C33.5786 475 0 441.421 0 400V0Z" fill="url(#hero_gradient)"/>
  <defs>
    <linearGradient id="hero_gradient" x1="780" y1="0" x2="780" y2="475" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#000000" stop-opacity="0.8"/>
      <stop offset="0.5" stop-color="#000000" stop-opacity="0.5"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0.9"/>
    </linearGradient>
  </defs>
</svg>
```

#### Statistic Elements
```svg
<!-- stat_bg.svg -->
<svg width="100%" height="60" viewBox="0 0 300 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="200" height="60" rx="30" fill="url(#paint0_linear)"/>
  <defs>
    <linearGradient id="paint0_linear" x1="0" y1="30" x2="200" y2="30" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#E7E7E7"/>
      <stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/>
    </linearGradient>
  </defs>
</svg>
```

### 4.2 About Us Page

#### Mission & Values Section
```svg
<!-- about_section_bg.svg -->
<svg width="100%" height="100%" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="600" rx="20" fill="#F9F9F9"/>
</svg>

<!-- operating_model_card.svg -->
<svg width="297" height="212" viewBox="0 0 297 212" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="297" height="212" rx="60" ry="60" fill="#FFFFFF" stroke="#D6DBDC"/>
</svg>
```

### 4.3 Contact Us Page

#### Form Section Background
```svg
<!-- contact_form_bg.svg -->
<svg width="614" height="400" viewBox="0 0 614 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="614" height="400" rx="20" fill="#FFFFFF" stroke="#D6DBDC"/>
</svg>
```

---

## 5. Implementation Guide

### 5.1 Folder Structure

For optimal organization of these SVG assets, use the following folder structure:

```
/assets
  /svg
    /brand
      dadson_full_logo.svg
      dadson_logo_mark.svg  
      dadson_gradient_mark.svg
      dadson_dashboard_logo.svg
      color_palette.svg
    /ui
      /buttons
        button_primary.svg
        button_secondary.svg
        submit_button.svg
      /navigation
        nav_pill_active.svg
        nav_pill_inactive.svg
        dropdown_arrow.svg
      /forms
        form_input.svg
        form_input_with_icon.svg
      /backgrounds
        hero_gradient_overlay.svg
        vector_1.svg
        footer_background.svg
        about_section_bg.svg
        operating_model_card.svg
        contact_form_bg.svg
    /icons
      /contact
        email_icon.svg
        email_icon_color.svg
        phone_icon.svg
        mail_icon.svg
      /social
        linkedin_icon.svg
        twitter_icon.svg
        facebook_icon.svg
      /features
        truck_fast.svg
        headphones_icon.svg
        ghost_icon.svg
        puzzle_icon.svg
        flag_icon.svg
        heart_icon.svg
      /services
        load_to_ride_icon.svg
        intermodal_icon.svg
    /decorative
      stat_bg.svg
```

### 5.2 CSS Implementation Examples

Here's how you can effectively implement these SVGs in your CSS:

```css
/* Logo Implementation */
.logo {
  display: block;
  width: 150px;
  height: 40px;
  background-image: url('../assets/svg/brand/dadson_full_logo.svg');
  background-repeat: no-repeat;
  background-size: contain;
}

/* Using SVG as background */
.hero-section {
  position: relative;
  background-image: url('../assets/svg/ui/backgrounds/hero_gradient_overlay.svg');
  background-size: cover;
  background-position: center;
}

/* Styling SVG directly with CSS */
.social-icon {
  fill: none;
  stroke: #FFFFFF;
  stroke-width: 1.5;
  transition: stroke 0.3s ease;
}

.social-icon:hover {
  stroke: #00B4E1;
}

/* Button styling with SVG background */
.btn-primary {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  background-color: rgba(0, 180, 225, 0.9);
  border-radius: 6px;
  color: #FFFFFF;
  font-family: 'Clash Display', sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 1.778em;
  backdrop-filter: blur(44px);
  box-shadow: 0px 4px 34px 0px rgba(0, 180, 225, 0.15);
}
```

### 5.3 HTML Implementation Examples

Here's how to implement these SVGs in your HTML:

```html
<!-- Basic logo usage -->
<a href="/" class="logo">
  <img src="assets/svg/brand/dadson_full_logo.svg" alt="Dadson Logistics" width="150" height="40">
</a>

<!-- Inline SVG for social icons (better for styling/interaction) -->
<div class="social-links">
  <a href="https://linkedin.com/company/dadson" aria-label="LinkedIn">
    <svg width="24" height="24" viewBox="0 0 24 24" class="social-icon">
      <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 9H2V21H6V9Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </a>
  <!-- Add other social icons similarly -->
</div>

<!-- Feature icon with text -->
<div class="feature">
  <div class="feature-icon">
    <img src="assets/svg/icons/features/truck_fast.svg" alt="" width="24" height="24">
  </div>
  <h3>Carrier-First Culture</h3>
  <p>Loyal carriers mean dependable coverage for your shipments.</p>
</div>

<!-- Form with icon -->
<form class="contact-form">
  <div class="input-group">
    <img src="assets/svg/icons/contact/email_icon.svg" alt="" class="input-icon">
    <input type="email" placeholder="Your email address">
  </div>
  <!-- Other form elements -->
  <button type="submit" class="btn-primary">Submit</button>
</form>
```

### 5.4 SVG Animation Examples

You can add subtle animations to the SVGs for enhanced user experience:

```css
/* Animate the road markings in the logo */
.logo-road-markings {
  stroke-dasharray: 6 12;
  animation: dash 2s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: 36;
  }
}

/* Pulse effect for feature icons */
.feature-icon svg {
  transform-origin: center;
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
```

### 5.5 Responsive Considerations

When implementing these SVGs, consider:

1. Use `viewBox` attributes without fixed width/height for responsive scaling
2. For complex SVGs, consider using `<use>` elements to reference symbols
3. Implement responsive breakpoints for logos and decorative elements
4. Ensure adequate contrast between SVG elements and backgrounds

```css
/* Responsive logo sizing example */
.logo {
  width: 120px;
  height: 32px;
}

@media (min-width: 768px) {
  .logo {
    width: 150px;
    height: 40px;
  }
}

@media (min-width: 1200px) {
  .logo {
    width: 180px;
    height: 48px;
  }
}
```

### 5.6 Performance Optimization

For optimal performance with SVGs:

1. Consider using SVG sprites for icons that appear multiple times
2. Remove unnecessary attributes and optimize SVG code with tools like SVGO
3. Use CSS for animations rather than SMIL when possible
4. For complex decorative SVGs, consider using WebP alternatives for older browsers
5. Inline critical SVGs (like logos) to reduce HTTP requests

### 5.7 Accessibility Considerations

When implementing SVGs, ensure they are accessible:

1. Always include `role="img"` and `aria-label` attributes for meaningful SVGs
2. Use `<title>` and `<desc>` elements within SVGs for screen readers
3. Ensure sufficient color contrast between SVG elements and backgrounds
4. If using SVGs for interactive elements, ensure they are keyboard accessible
5. Provide text alternatives for complex informational graphics

```html
<!-- Accessible SVG implementation -->
<svg role="img" aria-label="Dadson Logistics" width="150" height="40" viewBox="0 0 600 150">
  <title>Dadson Logistics</title>
  <desc>The Dadson Logistics company logo featuring an "S" shaped road design</desc>
  <!-- SVG content -->
</svg>
```

This ensures screen readers properly identify and communicate the purpose of these icons to users with visual impairments.

## 6. Browser Compatibility

These SVG assets are compatible with all modern browsers. For IE11 support, consider the following:

1. Use the `svgxuse` polyfill for SVG `<use>` elements
2. Avoid CSS variables within SVGs for IE11
3. Provide PNG fallbacks for complex gradient SVGs
4. Use explicit width/height attributes alongside viewBox
5. Test animations in older browsers and provide graceful degradation

```html
<!-- Legacy browser support -->
<picture>
  <source srcset="assets/svg/brand/dadson_full_logo.svg" type="image/svg+xml">
  <img src="assets/png/dadson_full_logo.png" alt="Dadson Logistics" width="150" height="40">
</picture>
```

## 7. Conclusion

This document provides a comprehensive collection of all SVG assets needed for the Dadson website implementation. By following the organization structure and implementation guidelines, you can ensure consistent, high-quality presentation of the Dadson brand across all pages of the website.

For versioning and maintenance, consider:

1. Keeping a master copy of all SVGs in a design system repository
2. Using semantic versioning for the asset library
3. Documenting any changes to critical brand elements
4. Testing SVG rendering across multiple devices and screen sizes

For any future assets or modifications, maintain the same naming conventions and structure to ensure consistency throughout the project.

</rewritten_file> 