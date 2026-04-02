# OpsBoard

Internal admin dashboard (CRM-like interface) built with React, TypeScript and Vite.

This project focuses on building a production-like frontend architecture for data-driven applications, similar to internal tools used in real companies.

---

## Tech Stack

* React
* TypeScript (strict)
* Vite
* TanStack Query (React Query)
* CSS Modules
* ESLint + Prettier + Stylelint

---

## Features

* Customer list (with search, filters, sorting, pagination)
* Customer details page
* Overview dashboard with key metrics
* Mock API layer with realistic data flow
* Error / loading / empty states

---

## Getting Started

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build project:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## Architecture

The project follows a modular architecture inspired by Feature-Sliced Design:

* `app` — application setup (providers, routing)
* `pages` — route-level components
* `widgets` — composed UI blocks
* `features` — user interactions and business logic
* `entities` — domain models and API
* `shared` — reusable utilities and UI

---

## Notes

This project is designed as a portfolio piece to demonstrate:

* scalable frontend architecture
* clean separation of concerns
* strong TypeScript usage
* real-world UI patterns
