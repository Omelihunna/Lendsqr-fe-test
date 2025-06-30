# Lendsqr Admin Dashboard (Frontend)

A modern, responsive admin dashboard inspired by the Lendsqr Admin console. Built with React, TypeScript, Vite, Redux Toolkit, RTK Query, and SCSS modules.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [File Structure](#file-structure)
- [Setup Instructions](#setup-instructions)
- [Design Decisions & Comparison](#design-decisions--comparison)
- [Contribution Guidelines](#contribution-guidelines)
- [License](#license)
- [App Path & Links](#app-path--links)

---

## Overview

This project is a feature-rich admin dashboard for user management, modeled after the Lendsqr Admin console. It demonstrates best practices in React development, state management, API integration, and responsive design.

---

## Features
- **Authentication:** Login form with validation (Formik + Yup)
- **Dashboard:** Responsive layout with sidebar and top navigation
- **User Management:**
  - User statistics cards (total users, active, with loans, with savings)
  - Users table with filtering, sorting, and pagination
  - User details page with full profile, account info, and actions (activate/blacklist)
- **State Management:** Redux Toolkit and RTK Query for efficient, scalable state and API data
- **API Integration:** Configurable base URL and token via `src/config/config.ts`
- **Caching:** User details cached in localStorage for performance
- **Styling:** Modular SCSS, responsive design, custom fonts
- **Error Handling:** Graceful error and loading states for API calls

---

## Tech Stack
- **React 19 + TypeScript:** Modern, type-safe, component-based UI
- **Vite:** Fast dev server and build tool for React
- **Redux Toolkit + RTK Query:** Scalable state management and efficient data fetching/caching
- **Formik + Yup:** Robust form handling and validation
- **SCSS Modules:** Scoped, maintainable, and responsive styles
- **React Router v7:** Declarative routing for SPA navigation
- **React Spinners, Moment.js, React Paginate:** For loading states, date formatting, and pagination UI

---

## File Structure

```
Lendsqr-fe-test/
├── public/
│   └── images/                # All static images and SVG icons
├── src/
│   ├── assets/                # Fonts and static assets
│   │   ├── components/            # Reusable React components
│   │   │   ├── dashboard/         # Dashboard-specific components (Sidebar, TopNav, UsersTable, etc.)
│   │   │   ├── global/            # Global/shared components (e.g., Loader)
│   │   │   └── userDetails/       # User details page components
│   │   ├── config/                # App configuration (API URLs, tokens)
│   │   ├── constants/             # App-wide constants and TypeScript interfaces
│   │   ├── layouts/               # Layout components (e.g., DashboardLayout)
│   │   ├── pages/                 # Page-level components (Login, Users, UserDetails)
│   │   ├── schemas/               # Form validation schemas (Yup)
│   │   ├── store/                 # Redux store, slices, and API logic
│   │   │   └── user/              # User-related Redux logic (slice, API)
│   │   ├── styles/                # SCSS modules for components, layouts, and pages
│   │   ├── utils/                 # Utility/helper functions (e.g., caching)
│   │   └── main.tsx               # App entry point
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── tsconfig*.json
│   └── vite.config.ts
└── README.md
```

---

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
```bash
git clone https://github.com/Omelihunna/Lendsqr-fe-test.git
cd Lendsqr-fe-test
npm install
# or
yarn install
```

### Running the App (Development)
```bash
npm run dev
# or
yarn dev
```
- The app will be available at [http://localhost:5173](http://localhost:5173)

### Building for Production
```bash
npm run build
# or
yarn build
```

### Linting
```bash
npm run lint
# or
yarn lint
```

### Preview Production Build
```bash
npm run preview
# or
yarn preview
```

---

## Design Decisions & Comparison
- **Componentization:** The app is broken into small, reusable components for maintainability.
- **State & Data:** RTK Query is used for API calls and caching, reducing boilerplate and improving performance.
- **Styling:** SCSS modules ensure styles are scoped and responsive, closely matching the Lendsqr Admin look and feel.
- **User Experience:** Features like filtering, pagination, and loading spinners enhance usability.
- **Deviations:** Some features (e.g., actual authentication, real API endpoints, or advanced admin features) may be stubbed or simplified for demo purposes.
- **Extensibility:** The structure allows for easy addition of new features (e.g., more dashboard widgets, user actions, or business logic).

---

## Contribution Guidelines
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.

---

## App Path & Links
- **Local:** Run `npm run dev` and visit [http://localhost:5173](http://localhost:5173)
- **GitHub Repo:** [https://github.com/Omelihunna/Lendsqr-fe-test](https://github.com/Omelihunna/Lendsqr-fe-test)
- **(Optional) Deployed URL:** _Add your deployed URL here if available_
- **(Optional) Documentation:** _Add your Google Doc/Notion link here if available_

---

## Credits

Developed by Omelihunna Iheanacho.
