# Finance Dashboard Pro

![Finance Dashboard Preview](https://via.placeholder.com/900x400/00D9FF/FFFFFF?text=Finance+Dashboard+Pro+Preview)

[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) ![Visitors](https://api.visitorbadge.io/api/visitors?path=finance-dashboard-pro&label=Visitors&countColor=%2337d67a)

## Overview

Finance Dashboard Pro is a modern financial management web application built with React, TypeScript, Tailwind CSS, and Vite. It helps users track income, monitor expenses, manage transactions, and review financial insights in a clean and responsive interface.

## Approach

This project is built using a modern React architecture with a focus on:

- **Component-based design** for reusable and maintainable UI elements
- **TypeScript** for type safety and developer confidence
- **Zustand** for lightweight state management with persistence
- **Tailwind CSS** for responsive styling and utility-first development
- **Vite** for fast development and production builds
- **Smooth animations** and transitions using Framer Motion

## Features

### Core Features

- **Dashboard Overview**: Balance summary, income, expenses, and trend cards
- **Transaction Management**: Add, edit, delete, and categorize transactions
- **Interactive Charts**: Line and pie charts for balance trends and spending breakdowns
- **Financial Insights**: Automated insights for budget and spending patterns
- **Role-Based Access**: Admin and viewer roles with permission-based UI

### Technical Features

- **Responsive Design**: Works well on desktop, tablet, and mobile screens
- **Local Persistence**: Keeps finance data saved in browser storage
- **Modern UI**: Clean layout with consistent spacing, icons, and animations
- **Fast Performance**: Optimized with Vite and lightweight dependencies

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- Recharts
- Framer Motion
- Lucide React
- pnpm

## Setup Instructions

### Prerequisites

- Node.js 18 or higher
- pnpm package manager

### Installation

1. Clone the repository

`ash
git clone <repository-url>
cd finance-dashboard-pro
`

2. Install dependencies

`ash
pnpm install
`

3. Start development server

`ash
pnpm --filter @workspace/finance-dashboard dev
`

4. Open the app in your browser

Navigate to http://localhost:5173

### Test Accounts

- **Admin**: dmin / dmin123
- **Viewer**: iewer / iewer123

## Usage

1. Open the landing page
2. Login with admin or viewer credentials
3. View the dashboard overview
4. Manage transactions in the transaction page
5. Check spending insights and charts

## Project Structure

`	ext
finance-dashboard-pro/
├── api-server/          # Backend API server and routes
├── finance-dashboard/   # Main frontend application
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
├── lib/                 # Shared utilities and generated API clients
├── db/                  # Database schemas and config
├── scripts/             # Build and utility scripts
├── package.json
└── pnpm-workspace.yaml
`

## Contributing

Contributions are welcome. Feel free to submit a pull request or open an issue for improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
