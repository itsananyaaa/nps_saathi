# NPS Saathi - UI Design Specification

## AI-Powered Pension Advisory Platform

---

## 1. Executive Summary

NPS Saathi is a comprehensive AI-powered pension advisory platform designed to help Indian citizens plan, simulate, and optimize their retirement savings through the National Pension System (NPS) and Unified Pension Scheme (UPS).

### Design Philosophy
- **Clean & Trustworthy**: Professional fintech aesthetic with calming colors
- **Accessible**: Multilingual support with voice interaction
- **Data-Driven**: Rich visualizations for complex financial data
- **Guided**: AI-assisted journey through pension planning

---

## 2. Design System

### 2.1 Color Palette

```css
/* Primary Colors */
--primary-900: #1e3a5f;    /* Deep Navy - Headers, primary actions */
--primary-700: #2d5a87;    /* Navy Blue - Secondary headers */
--primary-500: #3b82f6;    /* Bright Blue - Interactive elements */
--primary-300: #93c5fd;    /* Light Blue - Hover states */
--primary-100: #dbeafe;    /* Pale Blue - Backgrounds */

/* Secondary Colors */
--secondary-500: #10b981;  /* Emerald Green - Success, positive trends */
--secondary-300: #6ee7b7;  /* Light Green - Secondary success */
--secondary-100: #d1fae5;  /* Pale Green - Success backgrounds */

/* Accent Colors */
--accent-500: #f59e0b;     /* Amber - Warnings, attention */
--accent-300: #fcd34d;     /* Light Amber - Highlights */
--accent-100: #fef3c7;     /* Pale Amber - Warning backgrounds */

/* Semantic Colors */
--success: #22c55e;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;

/* Neutral Colors */
--neutral-900: #111827;    /* Primary text */
--neutral-700: #374151;    /* Secondary text */
--neutral-500: #6b7280;    /* Tertiary text, labels */
--neutral-300: #d1d5db;    /* Borders, dividers */
--neutral-200: #e5e7eb;    /* Light borders */
--neutral-100: #f3f4f6;    /* Backgrounds */
--neutral-50: #f9fafb;     /* Card backgrounds */
--white: #ffffff;
```

### 2.2 Typography

```css
/* Font Family */
--font-primary: 'Inter', system-ui, -apple-system, sans-serif;
--font-hindi: 'Noto Sans Devanagari', sans-serif;
--font-tamil: 'Noto Sans Tamil', sans-serif;

/* Font Sizes */
--text-xs: 0.75rem;      /* 12px - Captions, tags */
--text-sm: 0.875rem;     /* 14px - Secondary text */
--text-base: 1rem;       /* 16px - Body text */
--text-lg: 1.125rem;     /* 18px - Lead text */
--text-xl: 1.25rem;      /* 20px - Card titles */
--text-2xl: 1.5rem;      /* 24px - Section headers */
--text-3xl: 1.875rem;    /* 30px - Page titles */
--text-4xl: 2.25rem;     /* 36px - Hero titles */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
```

### 2.3 Spacing System

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### 2.4 Border Radius

```css
--radius-sm: 0.25rem;   /* 4px - Small elements */
--radius-md: 0.5rem;    /* 8px - Buttons, inputs */
--radius-lg: 0.75rem;   /* 12px - Cards */
--radius-xl: 1rem;      /* 16px - Large cards */
--radius-2xl: 1.5rem;   /* 24px - Modals */
--radius-full: 9999px;  /* Pills, avatars */
```

### 2.5 Shadows

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
--shadow-card: 0 2px 8px rgba(0, 0, 0, 0.08);
--shadow-hover: 0 8px 24px rgba(0, 0, 0, 0.12);
```

---

## 3. Application Architecture

### 3.1 Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER (64px height)                                            │
│ ┌────────┬────────────────────────────────┬────────────┐       │
│ │ Logo   │         (empty)                │ Lang │ 👤 │       │
│ └────────┴────────────────────────────────┴────────────┘       │
├──────────┬──────────────────────────────────────────────────────┤
│          │                                                      │
│ SIDEBAR  │              MAIN CONTENT AREA                       │
│ (240px)  │              (fluid width)                           │
│          │                                                      │
│ • Dashboard│                                                      │
│ • AI Chat  │                                                      │
│ • Simulator│                                                      │
│ • Forecast │                                                      │
│ • Advice   │                                                      │
│ • Policy   │                                                      │
│ • Account  │                                                      │
│          │                                                      │
└──────────┴──────────────────────────────────────────────────────┘
```

### 3.2 Responsive Breakpoints

```css
/* Mobile First Approach */
--breakpoint-sm: 640px;   /* Small tablets */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Small desktops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Large screens */
```

### 3.3 Responsive Behavior

| Breakpoint | Sidebar | Header |
|------------|---------|--------|
| < 768px | Collapsible (hamburger menu) | Simplified |
| 768px - 1024px | Collapsed (icons only) | Full |
| > 1024px | Expanded (full) | Full |

---

## 4. Component Library

### 4.1 Header Components

#### Header Bar
```
┌─────────────────────────────────────────────────────────────────┐
│  🏛️  NPS Saathi                              🌐 🎤  👤 ▼        │
│         Logo                                  Lang Voice Profile│
└─────────────────────────────────────────────────────────────────┘
```

**Components:**
- `Logo` - Brand identity with icon
- `LanguageSelector` - Dropdown for language selection
- `VoiceButton` - Microphone icon for voice interaction
- `UserProfileDropdown` - Avatar with menu

### 4.2 Sidebar Components

#### Navigation Sidebar
```
┌─────────────────┐
│  🏠 Dashboard   │ ← Active state
│  🤖 AI Assistant│
│  📊 Simulator   │
│  📈 Forecast    │
│  💡 Advice      │
│  📚 Policy      │
│  ⚙️  Account    │
│                 │
│  ─────────────  │
│  ❓ Help        │
│  🚪 Logout      │
└─────────────────┘
```

**Navigation Items:**
| Icon | Label | Route |
|------|-------|-------|
| 🏠 | Dashboard | `/dashboard` |
| 🤖 | AI Assistant | `/ai-assistant` |
| 📊 | Pension Simulator | `/simulator` |
| 📈 | Retirement Forecast | `/forecast` |
| 💡 | Investment Advice | `/advice` |
| 📚 | Policy Knowledge | `/policy` |
| ⚙️ | Account | `/account` |

### 4.3 Card Components

#### Stat Card
```
┌─────────────────────────┐
│  Icon  Title            │
│  💰    Projected Corpus │
│                         │
│  ₹1,25,00,000           │
│  +12.5% from last year  │
└─────────────────────────┘
```

#### Insight Card
```
┌─────────────────────────┐
│  🤖 AI Insight          │
│  ─────────────────────  │
│  "Based on your age and │
│   contribution pattern, │
│   consider increasing   │
│   your monthly..."      │
│                         │
│  [Read More]            │
└─────────────────────────┘
```

#### Quick Action Card
```
┌─────────────────────────┐
│  [Icon]                 │
│  Run Simulation         │
│  ─────────────────────  │
│  Test different market  │
│  scenarios              │
│         [→]             │
└─────────────────────────┘
```

### 4.4 Form Components

#### Input Field
```
┌─────────────────────────┐
│  Label *                │
│  ┌───────────────────┐  │
│  │ Placeholder      │  │
│  └───────────────────┘  │
│  Helper text            │
└─────────────────────────┘
```

#### Slider Input
```
┌─────────────────────────┐
│  Monthly Contribution   │
│  ┌───────────────────┐  │
│  │══════●═══════════│  │
│  └───────────────────┘  │
│  ₹15,000 / month        │
└─────────────────────────┘
```

#### Risk Selector
```
┌─────────────────────────┐
│  Risk Level             │
│  ┌────┬────┬────┬────┐  │
│  │Low │Med │High│V.Hi│  │
│  └────┴────┴────┴────┘  │
└─────────────────────────┘
```

### 4.5 Chart Components

#### Gauge Chart (Readiness Score)
```
┌─────────────────────────┐
│                         │
│      ╭─────────╮        │
│     ╱    75    ╲       │
│    │   ┌───┐    │      │
│    │   │ 🎯│    │      │
│     ╲  └───┘   ╱       │
│      ╰─────────╯        │
│                         │
│   Retirement Ready      │
│                         │
└─────────────────────────┘
```

#### Line Chart (Corpus Growth)
```
┌─────────────────────────┐
│  Corpus Growth          │
│  ─────────────────────  │
│     │                   │
│    ╱│╲                  │
│   ╱ │ ╲    ╭──╮         │
│  ╱  │  ╲  ╱    ╲        │
│ ╱   │   ╲╱      ╲____   │
│/    │                  ╲│
└─────────────────────────┘
```

#### Donut Chart (Asset Allocation)
```
┌─────────────────────────┐
│      ╭───────╮          │
│     ╱  40%  ╲          │
│    │  Equity  │         │
│    │ ┌─────┐ │         │
│    │ │     │ │         │
│    │ └─────┘ │         │
│     ╲  60%  ╱          │
│      ╰───────╯          │
│    Bonds                │
└─────────────────────────┘
```

---

## 5. Page Wireframes

### 5.1 Dashboard Page

```
┌─────────────────────────────────────────────────────────────────┐
│  Dashboard                                      [Last updated]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Welcome back, Rahul! 👋                                │   │
│  │  Here's your retirement overview                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │ 💰 Current  │  │ 📈 Projected│  │ 💵 Monthly  │            │
│  │ Contribution│  │ Corpus      │  │ Pension     │            │
│  │             │  │             │  │             │            │
│  │ ₹15,000/mo  │  │ ₹1.25Cr     │  │ ₹52,000     │            │
│  │ +5% ↑       │  │ at age 60   │  │ estimated   │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
│                                                                 │
│  ┌─────────────────────┐  ┌─────────────────────────────┐      │
│  │  🎯 Readiness Score │  │  🤖 AI Insights             │      │
│  │                     │  │  ─────────────────────────  │      │
│  │      ╭─────╮        │  │  • Increase equity exposure │      │
│  │     ╱  75  ╲       │  │    by 10% for better growth │      │
│  │    │  ┌─┐   │      │  │                             │      │
│  │    │  │🎯│   │      │  │  • Consider NPS Tier II for │      │
│  │     ╲ └─┘  ╱       │  │    additional tax benefits  │      │
│  │      ╰─────╯        │  │                             │      │
│  │                     │  │  • Review at age 45 for     │      │
│  │  Good Progress!     │  │    rebalancing              │      │
│  │                     │  │                             │      │
│  └─────────────────────┘  └─────────────────────────────┘      │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  ⚡ Quick Actions                                       │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  [📊 Run Simulation]  [🤖 Ask AI]  [👤 Update Profile] │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Dashboard Components:**
1. **Welcome Banner** - Personalized greeting
2. **Stat Cards Row** - Key metrics (3 cards)
3. **Readiness Score Card** - Visual gauge
4. **AI Insights Panel** - Personalized recommendations
5. **Quick Actions Bar** - Navigation shortcuts

### 5.2 AI Assistant Page

```
┌─────────────────────────────────────────────────────────────────┐
│  AI Assistant                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  🤖 NPS Saathi AI                                       │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │                                                         │   │
│  │  👤 What happens if I withdraw NPS early?              │   │
│  │                                                         │   │
│  │  🤖 Early withdrawal from NPS is subject to specific   │   │
│  │     rules:                                              │   │
│  │                                                         │   │
│  │     • Before 3 years: Not permitted                     │   │
│  │     • After 3 years: 20% withdrawal allowed for        │   │
│  │       specific purposes (education, medical, etc.)      │   │
│  │     • At 60: 60% lump sum, 40% annuity mandatory        │   │
│  │                                                         │   │
│  │     [Source: PFRDA Circular 2023/12]                    │   │
│  │                                                         │   │
│  │  👤 How much should I contribute monthly?              │   │
│  │                                                         │   │
│  │  🤖 Based on your profile (Age: 32, Income: ₹80k/mo),  │   │
│  │     I recommend:                                        │   │
│  │                                                         │   │
│  │     • Minimum: ₹5,000/month for basic coverage          │   │
│  │     • Recommended: ₹12,000/month for comfortable        │   │
│  │       retirement                                        │   │
│  │     • Optimal: ₹20,000/month with tax benefits          │   │
│  │                                                         │   │
│  │     Would you like me to run a simulation?              │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌────────────────────────────────────┐  ┌─────────────────┐   │
│  │  Type your question...            │  │  🎤  [Send →]  │   │
│  └────────────────────────────────────┘  └─────────────────┘   │
│                                                                 │
│  💡 Suggested Questions:                                        │
│  [What's NPS?] [Tax Benefits] [Withdrawal Rules] [Compare UPS] │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**AI Assistant Components:**
1. **Chat Window** - Scrollable message container
2. **Message Bubbles** - User (right) vs AI (left)
3. **Source Citations** - Reference links
4. **Input Area** - Text input with voice button
5. **Suggested Questions** - Quick-start prompts

### 5.3 Pension Simulator Page

```
┌─────────────────────────────────────────────────────────────────┐
│  Pension Simulator                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────┐  ┌─────────────────────────────┐  │
│  │  📊 Input Parameters    │  │  📈 Simulation Results      │  │
│  │  ─────────────────────  │  │  ─────────────────────────  │  │
│  │                         │  │                             │  │
│  │  Current Age: [32]      │  │  Monte Carlo Simulation     │  │
│  │                         │  │  (10,000 iterations)        │  │
│  │  Retirement Age: [60 ▼] │  │                             │  │
│  │                         │  │  ┌─────────────────────┐   │  │
│  │  Monthly Contribution:  │  │  │  📉 Worst Case      │   │  │
│  │  [══════●══════] ₹15k   │  │  │  ₹45,00,000         │   │  │
│  │                         │  │  └─────────────────────┘   │  │
│  │  Expected Return: [8% ▼]│  │  ┌─────────────────────┐   │  │
│  │                         │  │  │  📊 Median Case     │   │  │
│  │  Risk Level:            │  │  │  ₹1,25,00,000       │   │  │
│  │  [Low|Med|High|V.High]  │  │  └─────────────────────┘   │  │
│  │                         │  │  ┌─────────────────────┐   │  │
│  │  [🚀 Run Simulation]    │  │  │  📈 Best Case       │   │  │
│  │                         │  │  │  ₹2,80,00,000       │   │  │
│  │                         │  │  └─────────────────────┘   │  │
│  └─────────────────────────┘  │                             │  │
│                               │  Probability Distribution   │  │
│                               │  ┌─────────────────────┐   │  │
│                               │  │    📊 Bell Curve    │   │  │
│                               │  │                     │   │  │
│                               │  │    ╱╲               │   │  │
│                               │  │   ╱  ╲              │   │  │
│                               │  │  ╱    ╲___          │   │  │
│                               │  │ ╱           ╲       │   │  │
│                               │  └─────────────────────┘   │  │
│                               │                             │  │
│                               └─────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Simulator Components:**
1. **Input Panel** - Form with sliders and selectors
2. **Results Panel** - Scenario cards (Worst/Median/Best)
3. **Probability Chart** - Distribution visualization
4. **Run Button** - Execute simulation

### 5.4 Retirement Forecast Page

```
┌─────────────────────────────────────────────────────────────────┐
│  Retirement Forecast                                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────┐  ┌─────────────────────────────┐  │
│  │  📋 Your Profile        │  │  🎯 Retirement Projection   │  │
│  │  ─────────────────────  │  │  ─────────────────────────  │  │
│  │                         │  │                             │  │
│  │  Age: 32 years          │  │  Projected Corpus:          │  │
│  │  Monthly Income: ₹80k   │  │  ┌─────────────────────┐   │  │
│  │  Contribution: ₹15k     │  │  │                     │   │  │
│  │  Expected Return: 10%   │  │  │   ₹1,45,67,890      │   │  │
│  │  Retirement Age: 60     │  │  │                     │   │  │
│  │                         │  │  │   at age 60         │   │  │
│  │  [✏️ Edit Profile]      │  │  │                     │   │  │
│  │                         │  │  └─────────────────────┘   │  │
│  └─────────────────────────┘  │                             │  │
│                               │  Corpus Breakdown:          │  │
│                               │  ┌────────────────────────┐ │  │
│                               │  │  Lump Sum (60%)        │ │  │
│                               │  │  ₹87,40,734           │ │  │
│                               │  │  ████████████████████  │ │  │
│                               │  │                        │ │  │
│                               │  │  Annuity (40%)         │ │  │
│                               │  │  ₹58,27,156           │ │  │
│                               │  │  ██████████████        │ │  │
│                               │  └────────────────────────┘ │  │
│                               │                             │  │
│                               │  Estimated Monthly Pension: │  │
│                               │  ┌─────────────────────┐   │  │
│                               │  │  ₹48,500 / month    │   │  │
│                               │  │  (from annuity)     │   │  │
│                               │  └─────────────────────┘   │  │
│                               │                             │  │
│                               └─────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  📈 Corpus Growth Timeline                              │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │                                                         │   │
│  │  ₹                                                      │   │
│  │  1.5M│                              ╭────╮              │   │
│  │  1.2M│                        ╭────╯    │              │   │
│  │  900K│                  ╭────╯         │              │   │
│  │  600K│            ╭────╯              │              │   │
│  │  300K│      ╭────╯                   │              │   │
│  │    0K│ ╭────╯                        │              │   │
│  │      └────────────────────────────────────────────    │   │
│  │         32   40   45   50   55   60                   │   │
│  │                      Age                              │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Forecast Components:**
1. **Profile Summary** - User's current parameters
2. **Projection Card** - Total corpus at retirement
3. **Breakdown Visualization** - Lump sum vs Annuity
4. **Monthly Pension Estimate** - Post-retirement income
5. **Growth Timeline Chart** - Corpus over time

### 5.5 Investment Advice Page

```
┌─────────────────────────────────────────────────────────────────┐
│  Investment Advice                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  💡 Recommended Strategy                                │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │                                                         │   │
│  │  Based on your profile, we recommend:                   │   │
│  │                                                         │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │  🏆 NPS Tier I (Active Choice)                  │   │   │
│  │  │                                                 │   │   │
│  │  │  ✓ Tax benefits under 80C (₹1.5L) & 80CCD(1B)  │   │   │
│  │  │  ✓ Market-linked returns                        │   │   │
│  │  │  ✓ Flexibility in asset allocation              │   │   │
│  │  │                                                 │   │   │
│  │  │  [View Details]  [Apply Now]                    │   │   │
│  │  └─────────────────────────────────────────────────┘   │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────┐  ┌─────────────────────────────┐  │
│  │  📊 Asset Allocation    │  │  📈 Contribution Advice     │  │
│  │  ─────────────────────  │  │  ─────────────────────────  │  │
│  │                         │  │                             │  │
│  │      ╭─────────╮        │  │  Current: ₹15,000/month    │  │
│  │     ╱   50%   ╲       │  │                             │  │
│  │    │  Equity   │       │  │  Recommended: ₹20,000/month│  │
│  │    │  ┌─────┐  │       │  │  (+33% increase)           │  │
│  │    │  │     │  │       │  │                             │  │
│  │     ╲ └─────┘ ╱       │  │  Impact on corpus:          │  │
│  │      ╰─────────╯        │  │  +₹35,00,000 at retirement │  │
│  │   30%    20%            │  │                             │  │
│  │  Corp.Govt              │  │  [Adjust Contribution]      │  │
│  │  Bonds  Bonds           │  │                             │  │
│  │                         │  │                             │  │
│  │  [Rebalance]            │  │                             │  │
│  │                         │  │                             │  │
│  └─────────────────────────┘  └─────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  🎯 Retirement Readiness Score                          │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │                                                         │   │
│  │  ┌──────────┐  ┌────────────────────────────────────┐  │   │
│  │  │          │  │  Your Score: 75/100               │  │   │
│  │  │   ╭──╮   │  │                                    │  │   │
│  │  │  ╱ 75 ╲  │  │  ✅ On track for retirement        │  │   │
│  │  │ │  🎯 │  │  │  ⚠️  Consider increasing equity    │  │   │
│  │  │  ╲    ╱  │  │  ✅ Emergency fund adequate        │  │   │
│  │  │   ╰──╯   │  │                                    │  │   │
│  │  │          │  │  [View Detailed Report]            │  │   │
│  │  └──────────┘  └────────────────────────────────────┘  │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Investment Advice Components:**
1. **Recommendation Card** - Primary scheme suggestion
2. **Asset Allocation Chart** - Donut/pie chart
3. **Contribution Advice** - Optimization suggestions
4. **Readiness Score** - Overall assessment

### 5.6 Policy Knowledge Page

```
┌─────────────────────────────────────────────────────────────────┐
│  Policy Knowledge Base                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  🔍 Search pension rules, circulars, and guidelines...  │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │  [Search Input                              ] [🔍]     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Filter by Topic:                                               │
│  [All] [NPS] [UPS] [Tax] [Withdrawal] [Annuity] [Regulations]  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  📄 Search Results                                      │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │                                                         │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │  NPS Withdrawal Rules (2024)                    │   │   │
│  │  │  📚 PFRDA Circular No. 2024/03                  │   │   │
│  │  │                                                 │   │   │
│  │  │  Summary: Complete guidelines on premature     │   │   │
│  │  │  withdrawal, partial withdrawal, and exit      │   │   │
│  │  │  rules for NPS subscribers...                  │   │   │
│  │  │                                                 │   │   │
│  │  │  [Read More]  [📥 Download PDF]                 │   │   │
│  │  └─────────────────────────────────────────────────┘   │   │
│  │                                                         │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │  Tax Benefits under NPS                         │   │   │
│  │  │  📚 Income Tax Act, Section 80CCD               │   │   │
│  │  │                                                 │   │   │
│  │  │  Summary: Detailed explanation of tax          │   │   │
│  │  │  deductions available under Section 80CCD(1),  │   │   │
│  │  │  80CCD(1B), and 80CCD(2)...                    │   │   │
│  │  │                                                 │   │   │
│  │  │  [Read More]  [📥 Download PDF]                 │   │   │
│  │  └─────────────────────────────────────────────────┘   │   │
│  │                                                         │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │  UPS vs NPS: Comparison Guide                   │   │   │
│  │  │  📚 Ministry of Finance Notification            │   │   │
│  │  │                                                 │   │   │
│  │  │  Summary: Key differences between Unified      │   │   │
│  │  │  Pension Scheme and National Pension System... │   │   │
│  │  │                                                 │   │   │
│  │  │  [Read More]  [📥 Download PDF]                 │   │   │
│  │  └─────────────────────────────────────────────────┘   │   │
│  │                                                         │   │
│  │  [Load More Results...]                                 │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Policy Knowledge Components:**
1. **Search Bar** - Full-text search
2. **Topic Filters** - Category chips
3. **Results List** - Document cards with metadata
4. **Download Actions** - PDF access

### 5.7 Account Page

```
┌─────────────────────────────────────────────────────────────────┐
│  Account Settings                                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  👤 Profile Information                                 │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │                                                         │   │
│  │  ┌─────────┐                                            │   │
│  │  │         │  Name: Rahul Sharma                        │   │
│  │  │  👤     │  Email: rahul.sharma@email.com             │   │
│  │  │         │  Phone: +91 98765 43210                    │   │
│  │  │         │  [Change Photo]                            │   │
│  │  └─────────┘                                            │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────┐  ┌─────────────────────────────┐  │
│  │  📋 Personal Details    │  │  💰 Financial Details       │  │
│  │  ─────────────────────  │  │  ─────────────────────────  │  │
│  │                         │  │                             │  │
│  │  Full Name *            │  │  Monthly Income *           │  │
│  │  ┌───────────────────┐  │  │  ┌───────────────────┐     │  │
│  │  │ Rahul Sharma      │  │  │  │ ₹80,000           │     │  │
│  │  └───────────────────┘  │  │  └───────────────────┘     │  │
│  │                         │  │                             │  │
│  │  Age *                  │  │  Monthly Contribution *     │  │
│  │  ┌───────────────────┐  │  │  ┌───────────────────┐     │  │
│  │  │ 32                │  │  │  │ ₹15,000           │     │  │
│  │  └───────────────────┘  │  │  └───────────────────┘     │  │
│  │                         │  │                             │  │
│  │  Occupation *           │  │  Current NPS Corpus         │  │
│  │  ┌───────────────────┐  │  │  ┌───────────────────┐     │  │
│  │  │ Private Sector ▼  │  │  │  │ ₹3,50,000         │     │  │
│  │  └───────────────────┘  │  │  └───────────────────┘     │  │
│  │                         │  │                             │  │
│  │  Retirement Age *       │  │  Expected Return *          │  │
│  │  ┌───────────────────┐  │  │  ┌───────────────────┐     │  │
│  │  │ 60                │  │  │  │ 10%               │     │  │
│  │  └───────────────────┘  │  │  └───────────────────┘     │  │
│  │                         │  │                             │  │
│  └─────────────────────────┘  │  Risk Appetite *            │  │
│                               │  ┌───────────────────┐     │  │
│                               │  │ Moderate ▼        │     │  │
│                               │  └───────────────────┘     │  │
│                               │                             │  │
│                               │  [Save Changes]             │  │
│                               │                             │  │
│                               └─────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  ⚙️ Preferences                                         │   │
│  │  ─────────────────────────────────────────────────────  │   │
│  │                                                         │   │
│  │  ☑️ Email notifications for market updates              │   │
│  │  ☑️ Monthly retirement summary                          │   │
│  │  ☐ WhatsApp alerts for contribution reminders           │   │
│  │  ☑️ AI-powered personalized insights                    │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Account Page Components:**
1. **Profile Header** - Avatar and basic info
2. **Personal Details Form** - Demographics
3. **Financial Details Form** - Income and contributions
4. **Preferences Section** - Notification settings

---

## 6. Voice Assistant Integration

### 6.1 Voice Button States

```
┌─────────────┐
│  🎤         │  ← Idle (click to start)
│  Ask Voice  │
└─────────────┘

┌─────────────┐
│  🔴 ●●●     │  ← Listening (pulsing animation)
│  Listening..│
└─────────────┘

┌─────────────┐
│  ⚙️  ⟳      │  ← Processing (spinner)
│  Thinking.. │
└─────────────┘

┌─────────────┐
│  🔊 ▶       │  ← Speaking (wave animation)
│  Speaking.. │
└─────────────┘
```

### 6.2 Voice Pipeline Flow

```
┌─────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────┐
│  User   │───→│  Bhashini   │───→│   AI RAG    │───→│ Response│
│ Speech  │    │     STT     │    │   Engine    │    │  Text   │
└─────────┘    └─────────────┘    └─────────────┘    └────┬────┘
                                                          │
┌─────────┐    ┌─────────────┐    ┌───────────────────────┘
│  User   │←───│  Bhashini   │←───│
│  Hears  │    │     TTS     │    │
└─────────┘    └─────────────┘    │
                                  │
                         ┌────────┴────────┐
                         │  Display in UI  │
                         │  + Source Cite  │
                         └─────────────────┘
```

### 6.3 Supported Languages

| Language | Code | STT | TTS |
|----------|------|-----|-----|
| English | `en` | ✅ | ✅ |
| Hindi | `hi` | ✅ | ✅ |
| Tamil | `ta` | ✅ | ✅ |
| Malayalam | `ml` | ✅ | ✅ |
| Bengali | `bn` | ✅ | ✅ |
| Telugu | `te` | ✅ | ✅ |
| Kannada | `kn` | ✅ | ✅ |
| Marathi | `mr` | ✅ | ✅ |
| Gujarati | `gu` | ✅ | ✅ |

---

## 7. Navigation Flow

### 7.1 User Journey Map

```
                    ┌─────────────┐
                    │   Landing   │
                    │    Page     │
                    └──────┬──────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               ▼
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │  Ask AI     │ │ Start       │ │  View       │
    │  Assistant  │ │ Planning    │ │  Policies   │
    └──────┬──────┘ └──────┬──────┘ └──────┬──────┘
           │               │               │
           │               ▼               │
           │        ┌─────────────┐        │
           │        │  Profile    │        │
           │        │   Setup     │        │
           │        └──────┬──────┘        │
           │               │               │
           └───────────────┼───────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  Dashboard  │
                    └──────┬──────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               ▼
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │  Run        │ │   Run       │ │  Get        │
    │  Forecast   │ │ Simulation  │ │  Advice     │
    └──────┬──────┘ └──────┬──────┘ └──────┬──────┘
           │               │               │
           └───────────────┼───────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   Review    │
                    │   Results   │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  Ask AI for │
                    │ Clarification│
                    └─────────────┘
```

### 7.2 Route Structure

```
/                    → Landing Page (Marketing)
/dashboard           → Dashboard (requires auth)
/ai-assistant        → AI Chat Interface
/simulator           → Pension Simulator
/forecast            → Retirement Forecast
/advice              → Investment Advice
/policy              → Policy Knowledge Base
/account             → User Profile & Settings
/login               → Authentication
/signup              → Registration
```

---

## 8. Component Hierarchy

### 8.1 React Component Tree

```
App
├── Layout
│   ├── Header
│   │   ├── Logo
│   │   ├── LanguageSelector
│   │   ├── VoiceButton
│   │   └── UserProfileDropdown
│   ├── Sidebar
│   │   └── NavigationMenu
│   │       └── NavItem[]
│   └── MainContent
│       └── Routes
│           ├── DashboardPage
│           │   ├── WelcomeBanner
│           │   ├── StatCardsRow
│           │   │   └── StatCard[]
│           │   ├── ReadinessScoreCard
│           │   │   └── GaugeChart
│           │   ├── AIInsightsPanel
│           │   │   └── InsightCard[]
│           │   └── QuickActionsBar
│           ├── AIAssistantPage
│           │   ├── ChatContainer
│           │   │   ├── MessageList
│           │   │   │   └── MessageBubble[]
│           │   │   └── TypingIndicator
│           │   ├── ChatInput
│           │   │   ├── TextInput
│           │   │   └── VoiceButton
│           │   └── SuggestedQuestions
│           ├── SimulatorPage
│           │   ├── InputPanel
│           │   │   ├── AgeInput
│           │   │   ├── ContributionSlider
│           │   │   ├── ReturnSelector
│           │   │   └── RiskSelector
│           │   ├── ResultsPanel
│           │   │   └── ScenarioCard[]
│           │   └── ProbabilityChart
│           ├── ForecastPage
│           │   ├── ProfileSummary
│           │   ├── ProjectionCard
│           │   ├── BreakdownVisualization
│           │   ├── PensionEstimate
│           │   └── GrowthTimeline
│           ├── AdvicePage
│           │   ├── RecommendationCard
│           │   ├── AssetAllocationChart
│           │   ├── ContributionAdvice
│           │   └── ReadinessScore
│           ├── PolicyPage
│           │   ├── SearchBar
│           │   ├── TopicFilters
│           │   └── ResultsList
│           │       └── DocumentCard[]
│           └── AccountPage
│               ├── ProfileHeader
│               ├── PersonalDetailsForm
│               ├── FinancialDetailsForm
│               └── PreferencesSection
├── VoiceOverlay
│   ├── VoiceStatusIndicator
│   └── TranscriptDisplay
└── ToastNotifications
```

---

## 9. Recommended Folder Structure

```
nps-saathi/
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   └── locales/
│       ├── en.json
│       ├── hi.json
│       ├── ta.json
│       └── ...
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── slider.tsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Layout.tsx
│   │   │   └── Footer.tsx
│   │   ├── charts/
│   │   │   ├── GaugeChart.tsx
│   │   │   ├── LineChart.tsx
│   │   │   ├── DonutChart.tsx
│   │   │   └── ProbabilityChart.tsx
│   │   ├── chat/
│   │   │   ├── ChatContainer.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   └── SuggestedQuestions.tsx
│   │   └── shared/
│   │       ├── StatCard.tsx
│   │       ├── InsightCard.tsx
│   │       ├── LoadingSpinner.tsx
│   │       └── ErrorBoundary.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useVoice.ts
│   │   ├── useSimulation.ts
│   │   ├── useForecast.ts
│   │   ├── useChat.ts
│   │   └── useLanguage.ts
│   ├── pages/
│   │   ├── DashboardPage.tsx
│   │   ├── AIAssistantPage.tsx
│   │   ├── SimulatorPage.tsx
│   │   ├── ForecastPage.tsx
│   │   ├── AdvicePage.tsx
│   │   ├── PolicyPage.tsx
│   │   ├── AccountPage.tsx
│   │   ├── LoginPage.tsx
│   │   └── LandingPage.tsx
│   ├── services/
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── authApi.ts
│   │   │   ├── forecastApi.ts
│   │   │   ├── simulationApi.ts
│   │   │   ├── chatApi.ts
│   │   │   └── policyApi.ts
│   │   └── voice/
│   │       ├── bhashiniService.ts
│   │       └── speechRecognition.ts
│   ├── store/
│   │   ├── index.ts
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── userSlice.ts
│   │   │   ├── chatSlice.ts
│   │   │   └── uiSlice.ts
│   │   └── middleware/
│   ├── types/
│   │   ├── user.ts
│   │   ├── forecast.ts
│   │   ├── simulation.ts
│   │   ├── chat.ts
│   │   └── policy.ts
│   ├── utils/
│   │   ├── formatters.ts
│   │   ├── calculators.ts
│   │   ├── validators.ts
│   │   └── constants.ts
│   ├── styles/
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── animations.css
│   ├── i18n/
│   │   ├── index.ts
│   │   └── config.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── router.tsx
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env
├── .env.example
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 10. State Management

### 10.1 Redux Store Structure

```typescript
interface RootState {
  auth: {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
  };
  user: {
    profile: UserProfile | null;
    preferences: UserPreferences;
    loading: boolean;
  };
  chat: {
    messages: Message[];
    isTyping: boolean;
    language: string;
    suggestedQuestions: string[];
  };
  forecast: {
    inputs: ForecastInputs;
    results: ForecastResults | null;
    loading: boolean;
  };
  simulation: {
    inputs: SimulationInputs;
    results: SimulationResults | null;
    loading: boolean;
  };
  ui: {
    sidebarOpen: boolean;
    theme: 'light' | 'dark';
    language: string;
    notifications: Notification[];
  };
}
```

---

## 11. API Integration

### 11.1 Backend API Endpoints

```typescript
// Authentication
POST   /api/v1/auth/login
POST   /api/v1/auth/register
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh

// User Profile
GET    /api/v1/users/me
PUT    /api/v1/users/me
PUT    /api/v1/users/preferences

// Forecasting
POST   /api/v1/forecast/calculate
GET    /api/v1/forecast/history

// Simulation
POST   /api/v1/simulate/monte-carlo
GET    /api/v1/simulate/scenarios

// AI Chat
POST   /api/v1/chat/message
GET    /api/v1/chat/history
DELETE /api/v1/chat/history

// Policy Knowledge
GET    /api/v1/policy/search
GET    /api/v1/policy/documents/:id
GET    /api/v1/policy/categories

// Investment Advice
GET    /api/v1/advice/recommendations
GET    /api/v1/advice/asset-allocation

// Voice (Bhashini)
POST   /api/v1/voice/stt    // Speech to Text
POST   /api/v1/voice/tts    // Text to Speech
```

---

## 12. Accessibility Guidelines

### 12.1 WCAG 2.1 AA Compliance

- **Color Contrast**: Minimum 4.5:1 for normal text
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Readers**: ARIA labels on all icons and buttons
- **Focus Indicators**: Visible focus states
- **Text Scaling**: Support up to 200% zoom
- **Reduced Motion**: Respect `prefers-reduced-motion`

### 12.2 ARIA Labels

```tsx
// Example ARIA implementation
<button 
  aria-label="Start voice input"
  aria-pressed={isListening}
  className="voice-button"
>
  <MicrophoneIcon aria-hidden="true" />
</button>

<nav aria-label="Main navigation">
  <ul role="menubar">
    <li role="none">
      <a role="menuitem" href="/dashboard">Dashboard</a>
    </li>
  </ul>
</nav>
```

---

## 13. Performance Considerations

### 13.1 Optimization Strategies

| Strategy | Implementation |
|----------|---------------|
| Code Splitting | Route-based lazy loading |
| Image Optimization | WebP format, lazy loading |
| Chart Rendering | Canvas-based, data virtualization |
| API Caching | React Query with stale-while-revalidate |
| Bundle Size | Tree shaking, dynamic imports |

### 13.2 Target Metrics

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.5s |
| Cumulative Layout Shift | < 0.1 |

---

## 14. Security Considerations

### 14.1 Security Measures

- **Authentication**: JWT with refresh token rotation
- **HTTPS**: All API communications
- **Input Validation**: Sanitize all user inputs
- **XSS Protection**: Content Security Policy headers
- **CSRF Protection**: Token-based validation
- **Rate Limiting**: API endpoint protection

---

## 15. Implementation Checklist

### Phase 1: Foundation
- [ ] Set up React + TypeScript + Vite project
- [ ] Configure Tailwind CSS with custom theme
- [ ] Install and configure shadcn/ui components
- [ ] Set up React Router
- [ ] Configure Redux Toolkit store
- [ ] Set up i18n for multilingual support

### Phase 2: Core Components
- [ ] Build Layout (Header, Sidebar, Footer)
- [ ] Create reusable UI components
- [ ] Implement chart components
- [ ] Build form components with validation

### Phase 3: Pages
- [ ] Dashboard Page
- [ ] AI Assistant Page
- [ ] Simulator Page
- [ ] Forecast Page
- [ ] Advice Page
- [ ] Policy Page
- [ ] Account Page

### Phase 4: Integration
- [ ] Connect to backend APIs
- [ ] Implement authentication flow
- [ ] Integrate Bhashini voice API
- [ ] Add error handling and loading states

### Phase 5: Polish
- [ ] Add animations and transitions
- [ ] Implement responsive design
- [ ] Add accessibility features
- [ ] Performance optimization
- [ ] Testing and bug fixes

---

## Appendix A: Icon Mapping

| Feature | Icon | Library |
|---------|------|---------|
| Dashboard | LayoutDashboard | Lucide |
| AI Assistant | Bot | Lucide |
| Simulator | Calculator | Lucide |
| Forecast | TrendingUp | Lucide |
| Advice | Lightbulb | Lucide |
| Policy | BookOpen | Lucide |
| Account | User | Lucide |
| Voice | Mic | Lucide |
| Language | Globe | Lucide |
| Settings | Settings | Lucide |
| Logout | LogOut | Lucide |
| Search | Search | Lucide |
| Download | Download | Lucide |
| Edit | Pencil | Lucide |
| Save | Save | Lucide |
| Close | X | Lucide |
| Check | Check | Lucide |
| Warning | AlertTriangle | Lucide |
| Error | XCircle | Lucide |
| Success | CheckCircle | Lucide |
| Info | Info | Lucide |

---

## Appendix B: Currency Formatting

```typescript
// Indian Rupee formatting
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Examples:
// formatCurrency(12500000) → "₹1,25,00,000"
// formatCurrency(15000) → "₹15,000"
```

---

## Appendix C: Number Abbreviations

```typescript
// Large number abbreviation (Indian system)
const abbreviateNumber = (num: number): string => {
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
  if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
  return `₹${num}`;
};

// Examples:
// abbreviateNumber(12500000) → "₹1.3Cr"
// abbreviateNumber(125000) → "₹1.3L"
```

---

*Document Version: 1.0*
*Last Updated: March 2025*
*Author: Product Design Team*
