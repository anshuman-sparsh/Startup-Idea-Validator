# Startup Idea Validator AI

## 1. Project Overview
**Startup Idea Validator AI** is a premium, investor-grade SaaS dashboard designed to help founders and entrepreneurs validate business concepts in seconds. Leveraging the **Gemini 3.5 Flash API**, the platform analyzes market demand, customer segments, monetization channels, and competitive landscapes to deliver real-time strategic roadmaps and viability evaluations.

## 2. Features
- **Investment Viability Index**: Instant 0–100 viability score dynamically color-coded with strategic feedback.
- **Deep Market & ICP Mapping**: Automated Ideal Customer Profile (ICP) segmentation and demand estimation.
- **SWOT & Competitor Landscape**: Highlights direct competitor vulnerabilities alongside a 2x2 SWOT grid.
- **MVP Timeline Roadmap**: A step-by-step 3-phase implementation roadmap for product launches.
- **PDF Reports & Sharing**: Export clean print layouts as pitch reports, copy markdown summaries, or share parameters instantly.
- **Local Run History**: Automatically cache previously validated ideas locally via browser `localStorage`.

## 3. Tech Stack
- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling & Motion**: Tailwind CSS, Framer Motion, Lucide Icons
- **AI Engine**: Gemini 3.5 Flash API

## 4. Getting Started
```bash
# Install dependencies
npm install

# Set environment variables (.env.local)
GEMINI_API_KEY=your_gemini_api_key

# Run development server
npm run dev
```
