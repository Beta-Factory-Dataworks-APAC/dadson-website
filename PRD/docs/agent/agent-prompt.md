# Custom Instructions for Dadson Logistics Website Development

## CORE DIRECTIVE
Your primary responsibility is to develop the Dadson Logistics website with PIXEL-PERFECT FIDELITY to the Figma design (`mcp_figma_developer_mcp_get_figma_data` tool or reference PNGs like `@contact.png`) and the specifications in `PRD/assets/design-assets-svg.md`, while applying appropriate UX best practices and common sense to the implementation. Ensure visual consistency and professional implementation without blindly following specs that may contradict usability standards.

## PROJECT DOCUMENTATION & WORKFLOW
- **Implementation Guide:** Follow the workflow detailed in `PRD/docs/project/implementation_guide.md`.
- **Project Status:** Update `PRD/docs/project/project_status.md` after completing major steps or sections.
- **Asset Library:** Refer to `PRD/assets/design-assets-svg.md` for all SVG assets, color palettes, typography, and implementation examples.
- **Agent Prompt:** This file (`PRD/docs/agent/agent-prompt.md`).

## DESIGN INTERPRETATION PRINCIPLES
- Apply common web design patterns and best practices even when not explicitly shown in Figma
- Ensure proper active states for navigation (only highlight current page)
- Maintain appropriate proportions for logos and icons (adjust sizes if they appear disproportionate)
- Center-align navigation items when appropriate for better visual balance
- Ensure proper z-index and layout handling to prevent content from appearing behind fixed elements
- Apply appropriate spacing and responsive behavior even if not detailed in the design

## TECHNOLOGY REQUIREMENTS
- Use ONLY the specified technologies and libraries:
  - Next.js (App Router) for framework
  - Tailwind CSS for styling (no other CSS libraries)
  - React Bits EXCLUSIVELY for ALL animations (not Framer Motion)
  - SendGrid for contact form submissions

## TYPOGRAPHY SYSTEM
- Font families must be loaded from local project files:
  - **Clash Display**: Use for headlines, buttons, and key statements (specs in `PRD/assets/design-assets-svg.md` and this file)
    - Headlines: 500 weight, UPPERCASE, 80px size, 1.125 line height (Verify exact usage in Figma/Assets Doc)
    - Section headers: 500 weight, UPPERCASE, 42px size, 1.19 line height (Verify exact usage in Figma/Assets Doc)
    - Buttons: 600 weight, 18px size, 1.78 line height (Verify exact usage in Figma/Assets Doc)
  - **Satoshi**: Use for body text, navigation, and form elements (specs in `PRD/assets/design-assets-svg.md` and this file)
    - Navigation: 500 weight, 18px size, 1.78 line height (Verify exact usage in Figma/Assets Doc)
    - Body text: 500 weight, 18px size, 1.33 line height (Verify exact usage in Figma/Assets Doc)
    - Secondary headings: 500 weight, 24px size, 1.35 line height (Verify exact usage in Figma/Assets Doc)
    - Footer text: 400 weight, 16px size, 1.35 line height (Verify exact usage in Figma/Assets Doc)

## COLOR SYSTEM
- Use EXACT hex/rgba values specified in `PRD/assets/design-assets-svg.md`. Key colors:
  - Blue: `#00B4E1`
  - Dark Navy: `#03033D`
  - Dark Gray Text: `#101B21`
  - White: `#FFFFFF`
  - Placeholder Gray: `#8B8991`
  - Border Gray: `#E3E3E3`
  - Footer Dark: `#030709`
  - Button Primary BG: `rgba(0, 180, 225, 0.9)`
  - Button Secondary BG: `rgba(255, 255, 255, 0.1)`
  - Nav Active BG: `rgba(255, 255, 255, 0.05)`
  - Nav Inactive BG: `rgba(0, 0, 0, 0.05)`

## FIGMA ACCESS & ASSETS
- Always prefer using `mcp_figma_developer_mcp_get_figma_data` to access the design directly. Extract exact measurements, colors, and assets without approximation.
  - **Primary Figma File:** `https://www.figma.com/design/4067LuRdI4GYa8qCTNmUlP/Dadson-Website` (Key: `4067LuRdI4GYa8qCTNmUlP`)
  - **Homepage Specific Link:** `@dadsonHomeNew` (URL: `https://www.figma.com/design/2K3tHskMbje4kTJ7SVOLpn/Dadson-Website--Copy-?node-id=218-2686`) - *Currently inaccessible (403 Error)*
  - **About Page Specific Link:** `@aboutDadson` (URL needed) - *Assume inaccessible until verified*
  - **Contact Page Specific Link:** `@contactDadson` (URL: `https://www.figma.com/design/4067LuRdI4GYa8qCTNmUlP/Dadson-Website?node-id=133-2259`) - *Currently inaccessible (403 Error)*
  - **Dev Mode Link:** `@dadsonDevmode` (URL: `https://www.figma.com/design/2K3tHskMbje4kTJ7SVOLpn/Dadson-Website--Copy-?node-id=31-538&m=dev`) - *Currently inaccessible (403 Error)*
- If Figma access fails (as is currently the case for specific links), use reference PNGs (e.g., `@contact.png`) and the detailed specifications in `PRD/assets/design-assets-svg.md`.
- Use SVG assets defined in `PRD/assets/design-assets-svg.md`. Implement them as recommended (inline, background, etc.).

## IMPLEMENTATION APPROACH
1. Strictly follow the implementation order specified in `PRD/docs/project/implementation_guide.md`. Current Focus: **Contact Page**.
2. Focus on one page at a time. Temporarily remove or comment out unused page routes/components.
3. Implement section by section, following the **Sequential Thinking** plan developed for the task.
4. For each component/section:
   - Extract exact measurements from Figma/Asset Doc.
   - Implement with perfect Tailwind classes based on the design system.
   - Verify with side-by-side comparison to Figma/@*.png.
   - Implement animations with React Bits only.
   - Test responsive behavior.
   - Apply common design patterns and usability best practices even when not explicitly shown in designs.

## COMPONENT SPECIFICATIONS (Examples - Verify exact specs in Figma/Assets Doc)
- **Buttons**:
  - Primary: `rgba(0, 180, 225, 0.9)` background, white text (`Satoshi`, 600 weight, 18px), 6px radius, 12px/24px padding. Box shadow as per spec.
  - Secondary: `rgba(255, 255, 255, 0.1)` background with blur, dark text (`#101B21`).
  - Outline: Transparent with border (`#E3E3E3`?), dark text.
- **Navigation**:
  - Pills with backdrop blur.
  - Active: `rgba(255, 255, 255, 0.05)` background (only on the current page).
  - Inactive: `rgba(0, 0, 0, 0.05)` background.
  - Text: `Satoshi`, 500 weight, 18px.
  - Proper center alignment of navigation items.
  - Appropriate sizing of logo to maintain balance.
- **Form Elements**:
  - 1px `#E3E3E3` border, 6px border radius.
  - Padding: 16px/32px (Verify exact).
  - Placeholder text: `#8B8991`.
  - Icons: Positioned as per design (e.g., `mail_icon.svg`).
- **Footer**:
  - Background: Dark navy (`#03033D`) potentially using `footer_background.svg`.
  - 120px rounded top corners (Verify).
  - Layout, links, logo (white version), social icons as per design.
  - Text: `Satoshi`, 400 weight, 16px.

## PROHIBITIONS
- DO NOT use any libraries not explicitly approved (Next.js, Tailwind, React Bits, SendGrid ONLY).
- DO NOT substitute React Bits with any other animation library (Framer Motion, etc.).
- DO NOT take creative liberties with the design that conflict with established branding.
- DO NOT modify the implementation priority from `implementation_guide.md`.
- DO NOT implement admin panels or WYSIWYG editors.
- DO NOT use Bootstrap, Material UI, or other component libraries.
- DO NOT use different fonts or weights than specified.
- DO NOT approximate colors - use EXACT hex/rgba values.

## RESPONSE FORMAT
Always structure your responses as follows:
1. **Current Step:** State the specific step from the sequential plan being worked on (e.g., "Implementing Footer Background"). Reference `project_status.md`.
2. **Specifications:** Mention the key Figma/Asset Doc measurements, colors, fonts being used for this step.
3. **Code Implementation:** Provide the code changes (using `edit_file` tool).
4. **Verification:** Describe how fidelity will be/was checked (e.g., "Compared visually to @contact.png", "Ready for Playwright comparison").
5. **Next Step:** State the next planned step.

## QUALITY CONTROL & DESIGN COMPARISON
- Regularly compare output to Figma design/@*.png.
- If design specifications are ambiguous, **ASK FOR CLARIFICATION** rather than making assumptions.
- Implement responsive behavior exactly as shown in the design.
- Ensure all animations match the timing and easing in the design/assets doc.
- Verify font rendering matches Figma exactly.
- Match component spacing to the pixel level.
- Apply common UX patterns and best practices even when not explicitly shown in designs.
- When the user types "**COMPD**" (Compare Design):
  1. Use Playwright to take a screenshot of the current page at **1920px width**.
  2. State you are comparing the screenshot to the Figma design/@*.png side-by-side.
  3. Identify and list ANY discrepancies (layout, spacing, colors, typography, assets).
  4. Propose specific adjustments to perfectly match the design.
  5. Update the relevant code to fix discrepancies.
- Document adjustments made for fidelity in `project_status.md` or responses.
- Adhere to accessibility guidelines in `PRD/assets/design-assets-svg.md`.