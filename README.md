# Artistify – Eventful India Marketing Service

## 👤 Author

- **Name:** [Shivank Tripathi]
- **Role:** [Frontend Developer]
- **Gmail:** [er.shivank@gmail.com]
- **LinkedIn:** [https://www.linkedin.com/in/your-linkedin/](https://www.linkedin.com/in/shivanktripathi)

A modern web platform for discovering, booking, and managing performing artists. Built with Next.js, TypeScript, Tailwind CSS, and ShadCN UI.

## 📄 Pages Overview

### 1. Homepage (`/`)
- **Hero Section:** Platform introduction, call-to-action to explore artists.
- **Category Cards:** Quick links to artist categories (Singer, Dancer, Speaker, DJ).
- **Footer CTA:** Prompt for artists/managers to onboard.
- **UI:** Clean, responsive layout with interactive cards.

### 2. Artist Listing (`/artists`)
- **Grid of Artists:** Displays artists with name, category, location, fee, and bio.
- **Filters:** Filter by category, location, fee range, and sort by price.
- **Live Search:** Filters update the URL and results instantly.
- **Animations:** Cards animate in for a lively experience.
- **Loading/Error States:** User feedback for data fetching.

### 3. Artist Onboarding (`/onboard`)
- **Multi-section Form:** Collects artist details (name, bio, categories, languages, fee, location).
- **Validation:** Uses React Hook Form and Yup for robust validation.
- **Multi-select:** Categories and languages with checkboxes.
- **Submission:** Sends data to the API and shows success feedback.

### 4. Manager Dashboard (`/dashboard`)
- **Submissions Table:** Lists all artist submissions with details.
- **Status Management:** Approve/Reject actions for each submission (in-memory update).
- **Responsive Table:** Scrollable and mobile-friendly.
- **Loading/Error States:** User feedback for data fetching.

## 🛠️ Getting Started

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to use the app.

## 🧩 Tech Stack
- Next.js (App Router, TypeScript)
- Tailwind CSS
- ShadCN UI
- React Hook Form + Yup
- Framer Motion (for animations)

## �� Project Structure

```
Artistify - Eventful India Marketing Service/
├── app/
│   ├── api/
│   │   ├── artists/
│   │   │   └── route.ts         # API route for artist data (GET, POST)
│   │   └── submissions/
│   │       └── route.ts         # API route for submissions (GET)
│   ├── artists/
│   │   └── page.tsx             # Artists listing page with filters and animations
│   ├── dashboard/
│   │   └── page.tsx             # Manager dashboard with submissions table
│   ├── onboard/
│   │   └── page.tsx             # Artist onboarding form with validation
│   ├── favicon.ico              # App favicon
│   ├── globals.css              # Global styles (Tailwind)
│   ├── layout.tsx               # Root layout and theme provider
│   └── page.tsx                 # Homepage (hero, categories, CTA)
├── components/
│   ├── NavBar.tsx               # Main navigation bar
│   ├── ThemeToggle.tsx          # Light/dark mode toggle
│   └── ui/
│       ├── avatar.tsx           # Avatar UI component
│       ├── button.tsx           # Button UI component
│       ├── card.tsx             # Card UI component
│       ├── dropdown-menu.tsx    # Dropdown menu UI component
│       ├── form.tsx             # Form wrapper and helpers
│       ├── input.tsx            # Input field UI component
│       ├── label.tsx            # Label UI component
│       ├── select.tsx           # Select/dropdown UI component
│       ├── switch.tsx           # Switch/toggle UI component
│       └── table.tsx            # Table UI component
├── constants/
│   └── index.ts                 # Static data (categories, etc.)
├── lib/
│   └── utils.ts                 # Utility functions
├── public/
│   ├── file.svg                 # SVG asset
│   ├── globe.svg                # SVG asset
│   ├── next.svg                 # SVG asset
│   ├── vercel.svg               # SVG asset
│   └── window.svg               # SVG asset
├── components.json              # ShadCN UI config
├── package.json                 # Project dependencies and scripts
├── package-lock.json            # Dependency lock file
├── tsconfig.json                # TypeScript config
├── next.config.ts               # Next.js config
├── postcss.config.mjs           # PostCSS config
├── eslint.config.mjs            # ESLint config
└── README.md                    # Project documentation
```

- All main pages are in `app/` (with subfolders for each route).
- UI components are modular and reusable, found in `components/`.
- API routes for mock data are in `app/api/`.
- Static data/constants are in `constants/`.
- Utility functions are in `lib/`.
- Public assets (SVGs, favicon) are in `public/`.

## ✨ Features
- Fully responsive and mobile-friendly
- Modern UI with smooth animations
- Robust form validation and user feedback
- Mock API endpoints for artists and submissions
- Clean, maintainable codebase

---

**Artistify – Eventful India Marketing Service**
