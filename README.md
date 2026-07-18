# Wyze Bundle Builder

A responsive React prototype for building a personalized Wyze security system.
It follows the supplied
[Figma design](https://www.figma.com/design/znagN7w2Yw449uF5nHmD4y/Frontend-Test-Figma--Copy-?node-id=74-21629&m=dev)
and includes an Express backend that serves the product catalog from JSON.

## Functionality

- Four-step collapsible bundle builder.
- Data-driven products served from `products.json`.
- Independent quantities for every product variant.
- Synchronized quantity controls in product cards and the review panel.
- Live selected counts, pricing, discounts, savings, and totals.
- Automatic inclusion of Cam Unlimited and the required Sense Hub.
- Review categories only appear when they contain selected products.
- Responsive desktop and mobile layouts.
- Configuration persistence through `localStorage`.
- Accessible animations with reduced-motion support.
- Product detail modal opened through each `Learn More` action, including:
  - Product overview and selected variant artwork.
  - Feature highlights.
  - Technical specifications.
  - Box contents and bundle pricing.

## Run locally

Requirements: Node.js 20 or newer and npm.

```sh
npm install
npm run dev
```

This starts:

- React/Vite: `http://localhost:5173`
- Express API: `http://localhost:3001`
- Catalog endpoint: `GET /api/catalog`
- Health endpoint: `GET /api/health`

## Available commands

```sh
npm run dev       # Start React and Express together
npm run dev:web   # Start only Vite
npm run dev:api   # Start only Express
npm run lint      # Run Oxlint
npm run build     # Type-check and build the application
```

## Production

```sh
npm run build
npm start
```

Express serves both the generated `dist` application and the API. The default
port is `3001`; set `PORT` to override it.

## Decisions and tradeoffs

- The app uses a feature-oriented React structure to keep its components,
  hooks, API access, data, and domain logic together.
- Express provides a lightweight read-only JSON backend instead of a database.

## Not implemented

- Real checkout or payment processing.
- User accounts or server-side saved configurations.
- Automated unit and end-to-end tests.
