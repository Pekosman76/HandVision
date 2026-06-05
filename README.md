# HandVision

HandVision is a complete Next.js starter application for presenting a privacy-first hand tracking and gesture recognition product. It includes a polished landing page, an animated hand-landmark visualizer, reusable TypeScript data models, and a JSON API route for gesture metrics.

## Tech stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- ESLint flat config
- Browser camera API demo with a graceful animated fallback

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Available scripts

```bash
npm run dev       # Start the development server
npm run build     # Create a production build
npm run start     # Serve the production build
npm run lint      # Run ESLint
npm run typecheck # Run TypeScript without emitting files
```

## API route

The app ships with a typed metrics endpoint:

```bash
curl http://localhost:3000/api/metrics
```

The response includes the current app environment, generated gesture metrics, and sample gesture events.

## Environment variables

Copy `.env.example` to `.env.local` if you want to customize optional runtime values:

```bash
cp .env.example .env.local
```

No environment variables are required to run the application locally.

## Project structure

```text
app/                 Next.js pages, layout, icon, and API routes
components/          Reusable UI components
lib/                 Shared TypeScript models and helpers
public/              Static assets
styles/              Global Tailwind CSS entrypoint
```
