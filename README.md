# Hand Vision IA — Palm Reader AI

Hand Vision IA is a complete, mobile-first Next.js application for creating fun AI-style palm readings from a palm photo. The first production-ready MVP uses a browser-safe mock analysis engine, so it works without OpenAI Vision or any server dependency.

> Entertainment-only disclaimer: Palm Reader AI is for fun and self-reflection. It does not predict the future and should not be used for medical, legal, financial, safety, or life-critical decisions.

## Features

- Modern mystical landing page with premium dark gradients and clear calls to action.
- Browser camera flow with permission handling, live preview, rear-camera preference on mobile, and stream cleanup.
- Palm photo capture, retake, and image upload fallback for blocked or unavailable cameras.
- Mock AI-style palm analysis with varied randomized readings across:
  - Overall aura and summary
  - Personality
  - Love
  - Career
  - Money
  - Luck
  - Final advice sentence
- Result page with captured image preview, category cards, restart flow, and Web Share API support.
- Clipboard fallback when Web Share API is unavailable.
- Local-only state using `localStorage`; no backend is required for this version.
- OpenAI Vision-ready service structure in `lib/palm-reading/`.
- Vercel-ready Next.js App Router project.

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- App Router
- Tailwind CSS
- ESLint flat config
- lucide-react icons

## Project Structure

```txt
app/
  camera/page.tsx       # Camera, upload fallback, and analysis flow
  result/page.tsx       # Reading display and share/restart actions
  layout.tsx            # Metadata, viewport, and global styles
  page.tsx              # Landing page
components/             # Reusable shell, card, button, and link components
lib/
  palm-reading/         # Mock service, shared types, future OpenAI interface
  share.ts              # Share text formatting
  storage.ts            # Browser localStorage helpers
public/                 # Static assets
styles/globals.css      # Tailwind entry and global styles
```

## Installation

```bash
npm install
```

## Local Development

```bash
npm run dev
```

Open the local URL printed by Next.js, usually <http://localhost:3000>.

## Build

```bash
npm run build
```

## Other Checks

```bash
npm run lint
npm run typecheck
```

## Environment Variables

Copy `.env.example` to `.env.local` when adding environment-specific values:

```bash
cp .env.example .env.local
```

Current MVP variables:

| Variable | Required now | Purpose |
| --- | --- | --- |
| `OPENAI_API_KEY` | No | Reserved for a future server-side OpenAI Vision integration. |

## How the Flow Works

1. The user opens the landing page and selects **Start Palm Reading**.
2. `/camera` requests camera permission and prefers the rear camera on mobile when available.
3. The user captures a palm photo or uploads one as a fallback.
4. The mock service generates a varied entertainment-only reading.
5. The photo and result are stored locally in `localStorage`.
6. `/result` displays the reading and allows sharing or starting again.

## Future OpenAI Vision Integration Notes

The current app intentionally does not call OpenAI Vision. To add Vision later:

1. Keep the `PalmAnalysisInput`, `PalmReading`, and `PalmAnalysisService` types in `lib/palm-reading/types.ts` as the shared contract.
2. Implement a server-side route such as `app/api/palm-reading/route.ts` so the browser never exposes `OPENAI_API_KEY`.
3. Use the interface shown in `lib/palm-reading/futureOpenAIService.ts` as the expected return shape.
4. Replace the client call to `generateMockPalmReading` with a fetch to your server route.
5. Validate and sanitize the model output so every result remains entertainment-only and avoids medical, legal, financial, dangerous, or certainty-based claims.

## Deploying on Vercel

1. Push this repository to GitHub.
2. Import the repository into Vercel.
3. Use the default Next.js framework settings.
4. Leave `OPENAI_API_KEY` empty for the mock version, or add it only after implementing a secure server-side Vision route.
5. Deploy.

## Browser Notes

- Camera access generally requires HTTPS in production. Localhost is supported for development by most modern browsers.
- If camera permission is blocked, users can still upload a palm image.
- The app stops active camera tracks when leaving or retaking the camera flow.
