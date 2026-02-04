# Project Plan - Bonus Depreciation Calculator

## Overview
**Goal**: Build a "Killer" Bonus Depreciation & Section 179 Calculator that is fully OBBBA-compliant for the 2026 tax year.
**Context**: The current market is filled with outdated calculators using 2025 or pre-OBBBA logic. This tool will feature 100% bonus depreciation defaults (post-Jan 19, 2025), elective reduced rates (40%/60%), and specific support for new eligible assets like sound recordings and Qualified Rural Opportunity Zones (QROZ).
**UVP**: "The only OBBBA-compliant tax-savings engine that optimizes Section 179 and bonus depreciation based on your industry, asset type, future tax bracket and NOL strategy."

## Project Type
**WEB** (Next.js Application)

## Success Criteria
1.  **Regulatory Accuracy**: Correctly applies 2026 Section 179 limit ($2.56M), phase-out ($4.09M), and 100% bonus depreciation.
2.  **Feature Completeness**: Supports asset class selection, QROZ basis step-up, bonus rate elections, and NOL modeling.
3.  **User Deliverable**: Generates a high-value PDF report for users.
4.  **SEO Performance**: Programmatic landing pages for key industries (HVAC, Medical, Sound Recording).

## Tech Stack
-   **Framework**: **Next.js** (App Router) - For SEO, programmatic pages, and server-side PDF generation if needed.
-   **Styling**: **Tailwind CSS** - For rapid, responsive, and premium design "rich aesthetics".
-   **Language**: **TypeScript** - For type safety in complex tax logic.
-   **Components**: **React** - Modular UI for the calculator, charts, and wizards.
-   **PDF Generation**: `jspdf` or `react-pdf` (client-side preferred for simplicity).
-   **Icons**: `lucide-react` or `heroicons`.

## File Structure
```
/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx (Home)
│   │   ├── [industry]/page.tsx (Programmatic SEO)
│   │   └── blog/
│   ├── calculator/
│   │   └── page.tsx (Main Calculator)
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/ (Button, Input, Card, Slider)
│   ├── calculator/ (Inputs, Results, comparison-chart)
│   └── pdf/ (ReportTemplate)
├── lib/
│   ├── logic/ (depreciation-engine.ts, section179.ts)
│   ├── content/ (asset-library.ts, qroz-data.ts)
│   └── utils.ts
└── public/
    └── assets/
```

## Task Breakdown

### Phase 1: Foundation
-   [ ] **Initialize Project**: `npx create-next-app` with TypeScript, Tailwind. `frontend-specialist`
-   [ ] **Setup Design Engine**: Configure fonts, brand colors (no violet), and UI components. `frontend-specialist`
-   [ ] **Setup Testing**: Install Playwright and Jest. `test-engineer`

### Phase 2: Core Logic Engine
-   [ ] **Implement Asset Library**: specialized data structures for 5/7/15-year property, sound recording, QROZ. `backend-specialist`
-   [ ] **Develop 179 & Bonus Logic**: TypeScript functions for the OBBBA rules, 2026 limits, and elections. `backend-specialist`
-   [ ] **Logic Unit Tests**: Verify calculations against known 2026 scenarios. `test-engineer`

### Phase 3: Calculator UI
-   [ ] **Input Components**: Smart forms with "Basic" and "Advanced" modes. `frontend-specialist`
-   [ ] **Interactive Charts**: Visualizations for "Tax Savings vs Cost" and "Deduction Timeline". `frontend-specialist`
-   [ ] **Results Dashboard**: Real-time display of deductions and NOL warnings. `frontend-specialist`

### Phase 4: Advanced Features
-   [ ] **Comparison Module**: Logic and UI to compare 100% vs 40% bonus rate elections. `frontend-specialist`
-   [ ] **QROZ Integration**: Logic for 30% basis step-up and UI feedback. `backend-specialist`
-   [ ] **PDF Generator**: Implementation of the personalized PDF download. `frontend-specialist`

### Phase 5: Content & SEO
-   [ ] **Programmatic Pages**: Dynamic routes for Industry-specific landing pages. `seo-specialist`
-   [ ] **Educational Content**: Implement guides for Sound Recording, QROZ, etc. `frontend-specialist`

### Phase 6: Verification
-   [ ] **Security Scan**: `security_scan.py`
-   [ ] **Lighthouse Audit**: Performance and SEO checks.
-   [ ] **E2E Testing**: Complete user flow validation.

## ✅ Phase X Complete
- Lint: [ ]
- Security: [ ]
- Build: [ ]
- Date: [ ]
