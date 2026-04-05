# Finance Dashboard Pro

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=180&section=header&text=Finance+Dashboard+Pro&fontSize=50&fontColor=fff&animation=twinkling&fontAlignY=35&desc=Track+•+Manage+•+Analyze&descAlignY=55&descSize=20" width="100%" />

<br />

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=28&pause=1000&color=00D9FF&center=true&vCenter=true&width=600&lines=Modern+Financial+Dashboard+UI;Real-time+Budget+Tracking;Clean+Charts+and+Insights;Role-based+Simulation+with+React" alt="Typing SVG" />

<br />

<p>
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</p>
<p>
  <img src="https://img.shields.io/badge/Zustand-764ABC?style=for-the-badge&logo=zustand&logoColor=white" alt="Zustand" />
  <img src="https://img.shields.io/badge/Recharts-8884d8?style=for-the-badge&logo=apollographql&logoColor=white" alt="Recharts" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Lucide_React-000000?style=for-the-badge&logo=react&logoColor=white" alt="Lucide React" />
</p>

<br />

[Live Demo](https://fin-track-kappa-five.vercel.app/) · [GitHub Repo](https://github.com/sumancoder-cloud/FinTrack)

---

## Overview

**Finance Dashboard Pro** is a clean, interactive frontend dashboard designed to visualize personal finance data in an easy-to-read way. The app showcases summary cards, trend charts, spending breakdowns, transactions management, and a simulated role-based UI for Viewer and Admin experiences.

## What Makes It Great

- **Clean dashboard layout** with summary cards, charts, and insights
- **Interactive chart views** for time-based balance trends and category breakdowns
- **Transaction table** with date, category, amount, and type
- **Search and filter** features for quick transaction discovery
- **Simulated role-based UI**: Viewer view and Admin editing options
- **Responsive design** optimized for desktop and mobile

## Features

### 📊 Dashboard Overview
- Total Balance, Income, and Expense summary cards
- Balance trend line chart for monthly movement
- Category spending breakdown chart for quick insight

### 💼 Transactions
- Transaction list with key details
- Search or sort transactions by category, type, or date
- Simple filter controls for income vs expense

### 🔐 Role-Based UI
- **Viewer** mode for data-only exploration
- **Admin** mode for adding and editing transactions
- UI changes dynamically based on selected role

### 💡 Insights
- Highest spending category highlight
- Monthly comparison insights
- Useful observations from mock financial data

## Tech Stack

- **React 19** for component-based UI
- **TypeScript** for stronger typing and safer development
- **Vite** for fast builds and hot reload
- **Tailwind CSS** for responsive styling
- **Zustand** for application state management
- **Recharts** for visual charts
- **Framer Motion** for smooth animations
- **Lucide React** for crisp icons

## Setup Instructions

### Prerequisites
- Node.js 18 or higher
- pnpm package manager

### Install & Run

```bash
git clone https://github.com/sumancoder-cloud/FinTrack.git
cd FinTrack
pnpm install
pnpm --filter @workspace/finance-dashboard dev
```

Then open `http://localhost:5173` in your browser.

## Test Accounts

- **Admin**: `admin` / `admin123`
- **Viewer**: `viewer` / `viewer123`

## Project Structure

```text
finance-dashboard-pro/
├── api-server/          # backend utilities or API server (if any)
├── finance-dashboard/   # main frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── lib/                 # shared libraries or generated API clients
├── db/                  # schema and database config code
├── scripts/             # helper scripts
├── package.json
└── pnpm-workspace.yaml
```

## Notes

- This dashboard is intentionally frontend-focused and uses mock data.
- It is designed for assignment evaluation with clear UX, responsive layout, and role-based behavior.
- Future enhancements can include dark mode, export options, and backend integration.

---

**Live Demo:** https://fin-track-kappa-five.vercel.app/

**Repository:** https://github.com/sumancoder-cloud/FinTrack
