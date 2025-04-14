# Dadson Logistics - Implementation Guide

This guide outlines the steps, priorities, and standards for implementing the Dadson Logistics website.

## Table of Contents
1. [Priorities](#1-priorities)
2. [Workflow](#2-workflow)
3. [Standards](#3-standards)
4. [Documentation Links](#4-documentation-links)

---

## 1. Priorities

Implementation MUST follow this order:
1.  **Contact Page (`/contact`)** - Current Focus
2.  Home Page (`/`)
3.  About Page (`/about`)
4.  Services Page (`/services`)
5.  Blog Module (`/blog/*`) - Lower priority

## 2. Workflow

For each page or major component:
1.  **Consult Design Specs:** Refer to `PRD/assets/design-assets-svg.md` and Figma (via tool) for exact measurements, assets, fonts, colors, and spacing.
2.  **Implement Structure:** Build the component/page structure using Next.js and semantic HTML.
3.  **Apply Styling:** Use Tailwind CSS ONLY, adhering strictly to the design system (`PRD/docs/agent/agent-prompt.md` and asset docs).
4.  **Implement Animations:** Use React Bits EXCLUSIVELY for all animations, matching Figma timings/easing.
5.  **Verify Fidelity:** Compare the rendered output side-by-side with the Figma design (`@*.png` reference images if Figma is unavailable). Use Playwright 1920px screenshots for precise comparison when needed (e.g., user command "COMPD").
6.  **Refine:** Make pixel-perfect adjustments based on comparison.
7.  **Update Status:** Document progress and completion in `PRD/docs/project/project_status.md`.

## 3. Standards

-   **Pixel-Perfect Fidelity:** ABSOLUTE highest priority. NO deviations from Figma.
-   **Technology Stack:** Next.js (App Router), Tailwind CSS, React Bits, SendGrid ONLY.
-   **Code Quality:** Clean, readable, well-commented (non-trivial parts) code.
-   **Responsiveness:** Implement responsive design exactly as specified in Figma across all standard breakpoints.
-   **Accessibility:** Follow guidelines in `PRD/assets/design-assets-svg.md` (Section 5.7 & 6).

## 4. Documentation Links

-   **Agent Instructions:** `PRD/docs/agent/agent-prompt.md`
-   **Asset Library & Guide:** `PRD/assets/design-assets-svg.md`
-   **Project Status:** `PRD/docs/project/project_status.md`
-   **Figma (Primary):** `https://www.figma.com/design/4067LuRdI4GYa8qCTNmUlP/Dadson-Website` (Use `mcp_figma_developer_mcp_get_figma_data` tool)
-   **Figma (Page Specific - Prefer if accessible, currently 403 error):**
    -   Home: `@dadsonHomeNew`
    -   About: `@aboutDadson` (URL needed)
    -   Contact: `@contactDadson`
    -   Dev Mode: `@dadsonDevmode`
-   **Reference Images:** `@*.png` files (e.g., `@contact.png`) as fallback when Figma is inaccessible. 